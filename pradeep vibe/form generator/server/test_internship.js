
const http = require('http');

const data = JSON.stringify({
    prompt: "generate a example internship offer student to pay the fees",
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
    let body = '';
    res.on('data', (chunk) => { body += chunk; });
    res.on('end', () => {
        try {
            const parsed = JSON.parse(body);
            console.log(JSON.stringify(parsed, null, 2));
        } catch (e) {
            console.log('BODY:', body);
        }
    });
});

req.write(data);
req.end();
