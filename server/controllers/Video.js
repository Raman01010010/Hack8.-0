// controllers/videoController.js
const { Julep } = require('@julep/sdk');
const yaml = require('yaml');
const fs = require('fs');

const handlevideoprocess = async (req, res) => {
  try {
    const { video_url, public_id, transformation_prompt } = req.body;

    const client = new Julep({
      apiKey: process.env.JULEP_API_KEY, // store this in .env
    });

    const agent = await client.agents.create({
      name: "Julep Video Processing Agent",
      about: "Processes and analyzes videos using Cloudinary and FFmpeg.",
    });

    const taskDefinition = yaml.parse(
      fs.readFileSync('video_processing_task.yaml', 'utf8')
    );

    const task = await client.tasks.create(agent.id, taskDefinition);

    const execution = await client.executions.create(task.id, {
      input: { video_url, public_id, transformation_prompt },
    });

    // poll for result
    let result;
    while (true) {
      result = await client.executions.get(execution.id);
      if (result.status === 'succeeded' || result.status === 'failed') break;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (result.status === 'succeeded') {
      return res.json({ transformed_url: result.output.transformed_video_url });
    } else {
      return res.status(500).json({ error: result.error });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Processing failed' });
  }
};

module.exports = { handlevideoprocess };
