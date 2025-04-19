import { Julep } from '@julep/sdk';
import yaml from 'yaml';
import fs from 'fs';
import path from 'path';

/**
 * Process a video using Julep SDK and Cloudinary transformations
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const processVideo = async (req, res) => {
  try {
    const { video_url, public_id, transformation_prompt } = req.body;

    if (!video_url || !public_id) {
      return res.status(400).json({ 
        success: false, 
        error: 'Video URL and public ID are required' 
      });
    }

    // Initialize Julep client
    const client = new Julep({
      apiKey: process.env.JULEP_API_KEY || 'your_julep_api_key'
    });

    // Create the agent
    const agent = await client.agents.create({
      name: "Julep Video Processing Agent",
      about: "A Julep agent that can process and analyze videos using Cloudinary and FFmpeg.",
    });

    // Load the task definition
    const taskDefinitionPath = path.resolve(process.cwd(), 'video_processing_task.yaml');
    const taskDefinition = yaml.parse(fs.readFileSync(taskDefinitionPath, 'utf8'));

    // Create the task
    const task = await client.tasks.create(
      agent.id,
      taskDefinition
    );

    // Default transformation prompt if not provided
    const defaultPrompt = `
    1- I want to add an overlay an the following image to the video, and apply a layer apply flag also. Here's the image url:
    https://res.cloudinary.com/demo/image/upload/logos/cloudinary_icon_white.png

    2- I also want you to to blur the video, and add a fade in and fade out effect to the video with a duration of 3 seconds each.
    `;

    // Create the execution
    const execution = await client.executions.create(
      task.id,
      {
        input: { 
          "video_url": video_url,
          "public_id": public_id,
          "transformation_prompt": transformation_prompt || defaultPrompt,
        }
      }
    );

    // Wait for the execution to complete with timeout
    const maxWaitTime = 300000; // 5 minutes
    const startTime = Date.now();
    let result;

    while (true) {
      result = await client.executions.get(execution.id);
      
      if (result.status === 'succeeded' || result.status === 'failed') break;
      
      // Check for timeout
      if (Date.now() - startTime > maxWaitTime) {
        return res.status(408).json({
          success: false,
          error: 'Processing timeout exceeded'
        });
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Return the result
    if (result.status === 'succeeded') {
      return res.status(200).json({
        success: true,
        data: result.output
      });
    } else {
      return res.status(500).json({
        success: false,
        error: result.error || 'Video processing failed'
      });
    }
  } catch (error) {
    console.error('Video processing error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'An error occurred during video processing'
    });
  }
};

/**
 * Get the status of a video processing job
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getProcessingStatus = async (req, res) => {
  try {
    const { executionId } = req.params;
    
    if (!executionId) {
      return res.status(400).json({
        success: false,
        error: 'Execution ID is required'
      });
    }

    const client = new Julep({
      apiKey: process.env.JULEP_API_KEY || 'your_julep_api_key'
    });

    const result = await client.executions.get(executionId);
    
    return res.status(200).json({
      success: true,
      status: result.status,
      data: result.status === 'succeeded' ? result.output : null,
      error: result.status === 'failed' ? result.error : null
    });
  } catch (error) {
    console.error('Error fetching processing status:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch processing status'
    });
  }
};
