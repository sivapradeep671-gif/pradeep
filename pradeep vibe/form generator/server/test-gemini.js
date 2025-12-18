
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const models = ["gemini-1.5-flash", "gemini-1.5-flash-001", "gemini-pro", "gemini-1.0-pro", "gemini-1.5-pro"];

    console.log("Starting Model Check...");

    for (const m of models) {
        console.log(`Checking ${m}...`);
        try {
            const model = genAI.getGenerativeModel({ model: m });
            const result = await model.generateContent("Hello");
            console.log(`✅ WORKS: ${m} `);
            return; // Exit on first success to save time
        } catch (e) {
            console.error(`❌ FAILS: ${m} -> ${e.message.split('\n')[0]} `);
        }
    }
    console.log("All models failed.");
}
test();

