
// Test script using native http
// Assuming node 18+ has built in fetch or I'll just use http

const http = require('http');

const data = JSON.stringify({
    prompt: "student entry form, student,rollno, section, department phone no, email id",
    vibe: "official",
    lang: "en"
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/generate',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let body = '';
    res.on('data', (chunk) => {
        body += chunk;
    });
    res.on('end', () => {
        console.log('BODY:', body);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
