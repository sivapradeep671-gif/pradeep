
const http = require('http');

async function test(prompt) {
    return new Promise((resolve) => {
        const data = JSON.stringify({ prompt, vibe: "official", lang: "en" });
        const req = http.request({
            hostname: 'localhost', port: 5000, path: '/api/generate', method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Content-Length': data.length }
        }, (res) => {
            let body = '';
            res.on('data', c => body += c);
            res.on('end', () => {
                const p = JSON.parse(body);
                console.log(`\n--- PROMPT: "${prompt}" ---`);
                console.log(`TITLE: ${p.formSchema.title}`);
                console.log(`FIELDS: ${p.formSchema.fields.map(f => f.label).join(', ')}`);
                resolve();
            });
        });
        req.write(data);
        req.end();
    });
}

async function run() {
    await test("Business registration TN-MBNR");
    await test("Patient intake form");
    await test("Employee onboarding");
}

run();
