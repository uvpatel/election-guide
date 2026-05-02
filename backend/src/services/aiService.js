import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";

let client = null;

export function getGeminiClient() {
  if (!env.geminiApiKey) {
    console.warn("Gemini API key is not configured.");
    return null;
  }
  if (!client) {
    client = new GoogleGenAI({ apiKey: env.geminiApiKey });
  }
  return client;
}

export async function simulateReactions(policyText, personas) {
  const ai = getGeminiClient();
  if (!ai) {
    // Mock response if no key
    return personas.map(p => ({
      personaId: p.id,
      reactionQuote: `(Mock) As a ${p.demographic}, I think this policy is interesting.`,
      sentimentDelta: Math.floor(Math.random() * 20) - 10
    }));
  }

  const prompt = `You are a sociological simulation engine.
I will give you a policy text and a list of voter personas. 
For each persona, simulate their reaction to this policy. 
Provide a short quote (reactionQuote) and a sentiment shift score from -100 to 100 (sentimentDelta).
Return ONLY a valid JSON array matching this format: [{"personaId": "id", "reactionQuote": "...", "sentimentDelta": 0}]

Policy: "${policyText}"
Personas: ${JSON.stringify(personas)}
`;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(result.text);
  } catch (error) {
    console.error("AI Simulation Error:", error);
    throw new Error("Failed to generate simulation via Gemini.");
  }
}
