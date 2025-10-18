require('dotenv').config();
const https = require('https');

async function listAvailableModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  console.log('Checking available models...\n');
  
  if (!apiKey) {
    console.error('❌ No API key found');
    return;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  const urlObj = new URL(url);
  const options = {
    hostname: urlObj.hostname,
    path: urlObj.pathname + urlObj.search,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      try {
        const response = JSON.parse(body);
        
        if (response.models && response.models.length > 0) {
          console.log('✅ Available models:\n');
          response.models.forEach(model => {
            if (model.supportedGenerationMethods?.includes('generateContent')) {
              console.log(`📦 ${model.name}`);
              console.log(`   Display: ${model.displayName}`);
              console.log(`   Methods: ${model.supportedGenerationMethods.join(', ')}\n`);
            }
          });
        } else {
          console.log('❌ No models available or API key issue');
          console.log('Response:', JSON.stringify(response, null, 2));
        }
      } catch (error) {
        console.error('❌ Error:', error.message);
        console.log('Body:', body);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Request error:', error.message);
  });

  req.end();
}

listAvailableModels();