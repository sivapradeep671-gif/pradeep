
const http = require('http');

async function test(prompt, lang = 'en') {
    return new Promise((resolve) => {
        const data = JSON.stringify({ prompt, vibe: "official", lang });
        const req = http.request({
            hostname: 'localhost', port: 5000, path: '/api/generate', method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Content-Length': data.length }
        }, (res) => {
            let body = '';
            res.on('data', c => body += c);
            res.on('end', () => {
                const p = JSON.parse(body);
                console.log(`\n--- PROMPT: "${prompt}" (Lang: ${lang}) ---`);
                console.log(`TITLE: ${p.formSchema.title}`);
                p.formSchema.fields.forEach(f => {
                    console.log(` - ${f.label} (${f.type})`);
                    if (f.pattern) console.log(`   Pattern: ${f.pattern}`);
                });
                resolve();
            });
        });
        req.write(data);
        req.end();
    });
}

async function run() {
    await test("student entry rollno section dept phone");
    await test("student entry form", "ta"); // Tamil Test
}

run();
