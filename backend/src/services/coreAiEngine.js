import { GoogleGenAI, Type } from "@google/genai";
import { env } from "../config/env.js";

let client = null;

export function getGeminiClient() {
  if (!env.geminiApiKey) {
    console.warn("[PulseAI] Gemini API key is missing. AI endpoints will fail.");
    return null;
  }
  if (!client) {
    client = new GoogleGenAI({ apiKey: env.geminiApiKey });
  }
  return client;
}

/**
 * Base function for structured AI generation
 */
async function generateStructuredData(systemInstruction, prompt, schema) {
  const ai = getGeminiClient();
  if (!ai) throw new Error("AI not configured");

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.7,
      }
    });
    return JSON.parse(result.text);
  } catch (error) {
    console.error("[PulseAI] Generation Error:", error);
    throw new Error("Failed to generate AI response.");
  }
}

/**
 * 1. Voter Persona Generator
 */
export async function generatePersonas(region, demographics) {
  const systemInstruction = `You are an expert sociologist and political strategist. Your job is to model hyper-realistic voter personas. 
Avoid stereotypes; capture nuanced economic, social, and cultural priorities. Always provide a confidence score representing the typicality of this persona in the given region.`;
  
  const prompt = `Generate 3 distinct voter personas for the following demographics in ${region}:\nDemographics context: ${demographics}`;

  const schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING },
        demographicName: { type: Type.STRING },
        coreBeliefs: { type: Type.ARRAY, items: { type: Type.STRING } },
        topPriorities: { type: Type.ARRAY, items: { type: Type.STRING } },
        baselineSentiment: { type: Type.INTEGER, description: "General satisfaction (0-100)" },
        confidenceScore: { type: Type.NUMBER, description: "0.0 to 1.0" },
        explanation: { type: Type.STRING, description: "Why this persona is statistically relevant here." }
      },
      required: ["id", "demographicName", "coreBeliefs", "topPriorities", "baselineSentiment", "confidenceScore", "explanation"]
    }
  };

  return generateStructuredData(systemInstruction, prompt, schema);
}

/**
 * 2. Sentiment Simulator
 */
export async function simulateSentiment(eventText, personas) {
  const systemInstruction = `You are a psychological behavior engine. You predict how specific voter personas react to political events or policies.
Think critically about how an event aligns or conflicts with a persona's core beliefs. Calculate a sentiment shift and explain the psychological reasoning.`;

  const prompt = `Simulate the reaction to this event/policy:\n"${eventText}"\n\nFor these personas:\n${JSON.stringify(personas, null, 2)}`;

  const schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        personaId: { type: Type.STRING },
        reactionQuote: { type: Type.STRING, description: "A realistic quote from this persona." },
        sentimentDelta: { type: Type.INTEGER, description: "Shift in sentiment (-100 to +100)" },
        confidenceScore: { type: Type.NUMBER },
        reasoning: { type: Type.STRING, description: "Psychological explanation for this reaction." }
      },
      required: ["personaId", "reactionQuote", "sentimentDelta", "confidenceScore", "reasoning"]
    }
  };

  return generateStructuredData(systemInstruction, prompt, schema);
}

/**
 * 3. Narrative Analyzer
 */
export async function analyzeNarrative(textStream) {
  const systemInstruction = `You are an elite political intelligence analyst and misinformation detector.
Analyze the provided text to detect emerging narratives, underlying framing, and classify whether it exhibits traits of organic discourse or coordinated propaganda.`;

  const prompt = `Analyze this political text/narrative stream:\n"${textStream}"`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      primaryNarrative: { type: Type.STRING },
      framingTechniques: { type: Type.ARRAY, items: { type: Type.STRING } },
      isPropaganda: { type: Type.BOOLEAN },
      propagandaProbability: { type: Type.NUMBER, description: "0.0 to 1.0" },
      targetAudience: { type: Type.STRING },
      explanation: { type: Type.STRING, description: "Detailed evidence for your classification." }
    },
    required: ["primaryNarrative", "framingTechniques", "isPropaganda", "propagandaProbability", "targetAudience", "explanation"]
  };

  return generateStructuredData(systemInstruction, prompt, schema);
}

/**
 * 4. Election Predictor
 */
export async function predictElection(sentimentData, turnoutEstimate) {
  const systemInstruction = `You are a world-class election forecaster (like Nate Silver). 
You synthesize sentiment data, persona baselines, and turnout estimates to calculate probabilistic election outcomes.`;

  const prompt = `Predict the election outcome based on this data:\nSentiment Data: ${JSON.stringify(sentimentData)}\nExpected Turnout: ${turnoutEstimate}%`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      incumbentWinProbability: { type: Type.NUMBER, description: "0.0 to 1.0" },
      challengerWinProbability: { type: Type.NUMBER, description: "0.0 to 1.0" },
      keyDecidingFactor: { type: Type.STRING },
      swingPersonas: { type: Type.ARRAY, items: { type: Type.STRING } },
      confidenceScore: { type: Type.NUMBER },
      explanation: { type: Type.STRING, description: "Deep analysis of why this outcome is predicted." }
    },
    required: ["incumbentWinProbability", "challengerWinProbability", "keyDecidingFactor", "swingPersonas", "confidenceScore", "explanation"]
  };

  return generateStructuredData(systemInstruction, prompt, schema);
}
