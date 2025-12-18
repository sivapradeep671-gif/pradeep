
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // There isn't a direct "listModels" method exposed easily on the instance typically, 
        // but usually 404 on generation means model name is wrong or region/key issue.
        // Let's try a standard generation with error dumping.
        console.log("Attempting generation with gemini-1.5-flash...");
        const result = await model.generateContent("Test");
        console.log("Success:", result.response.text());
    } catch (error) {
        console.error("Error details:");
        console.log(JSON.stringify(error, null, 2));
    }
}

listModels();
