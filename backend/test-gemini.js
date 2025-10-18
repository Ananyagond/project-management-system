const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testGemini() {
  try {
    console.log('Testing Gemini API...');
    console.log('API Key:', process.env.GEMINI_API_KEY ? '✅ Found' : '❌ Not Found');
    
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ No API key found in .env file');
      return;
    }
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Use the correct model from your available models
    console.log('\nTrying model: gemini-2.5-flash...');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    console.log('Sending test prompt...');
    const prompt = 'Say hello and confirm you are working! Keep it brief.';
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('\n✅ SUCCESS! Gemini 2.5 Flash is working!');
    console.log('Response:', text);
    console.log('\n🎉 Your Gemini API is configured correctly!');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Check your API key is correct in .env');
    console.log('2. Make sure API key has no extra spaces');
    console.log('3. Verify the model name matches available models');
  }
}

testGemini();