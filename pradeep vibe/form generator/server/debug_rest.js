
require('dotenv').config();
const https = require('https');

const apiKey = process.env.GEMINI_API_KEY;
const model = 'gemini-pro';

const data = JSON.stringify({
    contents: [{
        parts: [{ text: "Explain how to make a form" }]
    }]
});

const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models/${model}:generateContent?key=${apiKey}`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

console.log(`Testing URL: https://${options.hostname}${options.path.replace(apiKey, 'HIDDEN')}`);

const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        console.log('Body:', body);
    });
});

req.on('error', (e) => {
    console.error(`Problem: ${e.message}`);
});

req.write(data);
req.end();
