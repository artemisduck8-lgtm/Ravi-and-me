import { GoogleGenAI } from "@google/genai";
import { SkyeStats } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates an image of Skye in Pokemon style.
 */
export const generateSkyeAvatar = async (): Promise<string | null> => {
  try {
    const prompt = `A cute chibi anime style illustration of a baby girl named Skye with amber skin and curly hair. She is wearing a soft Eevee or Pikachu onesie. Bright, colorful, soft pastel colors, pokemon art style, adorable, heartwarming.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Skye gen error:", error);
    return null;
  }
};

/**
 * Chat with Skye (Roleplay)
 */
export const talkToSkye = async (message: string, stats: SkyeStats): Promise<string> => {
  try {
    const ageContext = stats.level < 3 ? "a baby Pokemon trainer who only coos" : "a toddler trainer learning to speak";
    const mood = stats.happiness > 50 ? "happy and excited" : "tired and hungry";
    
    const prompt = `
      You are Skye, a virtual baby Pokemon trainer. You are currently ${mood}. 
      You are ${ageContext}.
      Your parent (Trainer) just said: "${message}".
      Respond as Skye. Use Pokemon sounds or references if appropriate but keep it like a human baby. Keep it short (under 15 words). Super cute and expressive.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Pika pika! *giggles*";
  } catch (error) {
    return "Pika? *tilts head*";
  }
};

/**
 * Generate Love Note (Mail)
 */
export const generateLoveNote = async (
  from: string,
  to: string,
  topic: string,
  tone: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a ${tone} love letter (Pokemon Mail style) from Trainer ${from} to Trainer ${to} about ${topic}. Keep it under 40 words. Use cute Pokemon references (like 'I choose you', 'Critical hit to my heart').`,
    });
    return response.text || "Could not generate mail.";
  } catch (error) {
    return "Error using PC.";
  }
};

/**
 * Suggest a Chat Reply (Rotom Dex)
 */
export const suggestReply = async (lastMessage: string): Promise<string> => {
  try {
     const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Suggest a short, cute, loving reply to this text: "${lastMessage}". Maybe include a subtle Pokemon reference.`,
    });
    return response.text || "It's super effective!";
  } catch (error) {
    return "Zzz...";
  }
}