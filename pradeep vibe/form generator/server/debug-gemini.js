
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
    console.log("Debug Script Starting...");
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error("❌ No API Key found in env!");
        return;
    }
    console.log(`Key found (length: ${key.length}), starts with: ${key.substring(0, 5)}...`);

    const genAI = new GoogleGenerativeAI(key);

    const modelName = "gemini-flash-latest";

    try {
        console.log(`Attempting generation with ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello");
        console.log("✅ Success!");
        console.log(result.response.text());
    } catch (e) {
        console.error("❌ Error:");
        console.error(e.message);
        if (e.response) {
            console.error("Full Response:", JSON.stringify(e.response, null, 2));
        }
    }
}
test();
