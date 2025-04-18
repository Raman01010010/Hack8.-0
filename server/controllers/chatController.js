const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Julep } = require('@julep/sdk');
const yaml = require('yaml');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Initialize Julep client ONCE
const client = new Julep({
  apiKey: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTAxNzkwNjQsImlhdCI6MTc0NDk5NTA2NCwic3ViIjoiMTVmOTAyOGEtNDBlNy01NjVlLWJjNDktYWFmNTBjNzU2M2M4In0.xuaZCdln38bkzHLkRVSjOwXFjyEf7HbUVFWU8mVuwxsuN1LLx9sLV0Fz1FJ-w_wAijxgQTA8l9YgD58-aS91qQ'
});

// Create agent & task only once when server starts
let taskId;

async function setupAgentAndTask() {
  const agent = await client.agents.create({
    name: "Document Q&A Assistant",
    model: "claude-3.5-sonnet",
    about: "Answers questions based on a provided document."
  });

  const task_definition = `
  name: Document Q&A Assistant
  description: Answer questions based on a given document
  main:
  - prompt:
    - role: system
      content: You are a helpful assistant. Answer the user's question based only on the provided document.
    - role: user
      content: |
        Document:
        """
        {steps[0].input.document}
        """

        Question:
        {steps[0].input.question}

        Answer:
  `;

  const task = await client.tasks.create(agent.id, yaml.parse(task_definition));
  taskId = task.id;
}

// Run this once when the server starts
setupAgentAndTask();

// Endpoint: /ask
const chat= async (req, res) => {
  const { document, question } = req.body;

  if (!document || !question) {
    return res.status(400).json({ error: "Document and question are required" });
  }

  try {
    const execution = await client.executions.create(taskId, {
      input: { document, question }
    });

    let result;
    while (true) {
      result = await client.executions.get(execution.id);
      if (result.status === 'succeeded' || result.status === 'failed') break;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (result.status === 'succeeded') {
      res.json({ answer: result.output.choices[0].message.content });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
}
module.exports={chat}

// Start the server
