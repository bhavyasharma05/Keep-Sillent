import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.warn("API_KEY environment variable not set. Gemini features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getWittyReply(callerName: string): Promise<string> {
    if (!apiKey) {
        return "Gemini API key not configured.";
    }

    const prompt = `I'm getting a call from "${callerName}". Suggest a short, witty, and clever one-liner I can use to answer the phone. Make it funny but safe for work.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const text = response.text;

        if (text) {
            // Clean up the response, removing potential markdown like quotes or asterisks
            return text.replace(/["*]/g, '').trim();
        } else {
            return "Couldn't think of anything clever. You're on your own!";
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate a reply.");
    }
}
