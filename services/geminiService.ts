
import { GoogleGenAI, Type } from "@google/genai";
import { AIAppDetails } from "../types";

// Initialize the API client using process.env.API_KEY directly as required by guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAppDetails = async (appName: string, url: string): Promise<AIAppDetails | null> => {
  try {
    const prompt = `
      I am adding a web application to my dashboard.
      App Name: "${appName}"
      App URL: "${url}"
      
      Please generate a short, catchy description (max 15 words).
    `;

    // Always use ai.models.generateContent with model name and prompt together
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { 
              type: Type.STRING,
              description: 'A catchy short description of the app.'
            },
          },
          required: ["description"],
          propertyOrdering: ["description"]
        }
      }
    });

    // Access the .text property directly (not a method)
    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text) as AIAppDetails;

  } catch (error) {
    console.error("Error generating app details with Gemini:", error);
    return null;
  }
};
