
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.1, // Low temperature for factual accuracy
      },
    });

    const text = response.text;
    if (!text) {
      return "직접 문의부탁드립니다";
    }

    return text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "직접 문의부탁드립니다";
  }
};
