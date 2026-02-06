
import { GoogleGenAI, Type } from "@google/genai";
import { AIAppDetails } from "../types";

/**
 * Generates a short description for an app using Gemini AI.
 * Initializing inside the function ensures the API key is retrieved at the moment of use.
 */
export const generateAppDetails = async (appName: string, url: string): Promise<AIAppDetails | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      I am adding a web application to my dashboard.
      App Name: "${appName}"
      App URL: "${url}"
      
      Please generate a short, catchy description (max 15 words).
    `;

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

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text) as AIAppDetails;

  } catch (error) {
    console.error("Error generating app details with Gemini:", error);
    return null;
  }
};
