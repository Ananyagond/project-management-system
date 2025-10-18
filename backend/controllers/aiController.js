const { GoogleGenerativeAI } = require('@google/generative-ai');
const Task = require('../models/Task');

// Initialize Gemini with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.summarizeTasks = async (req, res) => {
  try {
    console.log('📊 Summarizing tasks...');
    const { projectId } = req.params;
    
    const tasks = await Task.find({ projectId });
    console.log(`Found ${tasks.length} tasks`);

    if (tasks.length === 0) {
      return res.json({ 
        success: true, 
        summary: 'No tasks found in this project. Add some tasks to get started!' 
      });
    }

    const taskList = tasks.map(task => 
      `- ${task.title} (${task.status}): ${task.description}`
    ).join('\n');

    console.log('Sending to Gemini AI...');
    
    // ✅ Use the correct model name from your available models
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const prompt = `Analyze these project tasks and provide a brief summary with insights:

${taskList}

Please provide:
1. Task count by status (To Do, In Progress, Done)
2. Key priorities
3. Brief recommendations

Keep the response concise and actionable.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    console.log('✅ Summary generated successfully');
    res.json({ success: true, summary });
    
  } catch (error) {
    console.error('❌ Summarize error:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to summarize tasks. Please check your API key.',
      error: error.message 
    });
  }
};

exports.askQuestion = async (req, res) => {
  try {
    console.log('💬 Processing question...');
    const { taskId, question } = req.body;
    
    if (!taskId || !question) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please select a task and enter a question' 
      });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    console.log('Sending question to Gemini AI...');
    
    // ✅ Use the correct model name
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const prompt = `Given this task context:

Title: ${task.title}
Description: ${task.description}
Status: ${task.status}

Question: ${question}

Please provide a helpful, concise answer based on the task context.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    console.log('✅ Answer generated successfully');
    res.json({ success: true, answer });
    
  } catch (error) {
    console.error('❌ Ask question error:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get answer. Please check your API key.',
      error: error.message 
    });
  }
};