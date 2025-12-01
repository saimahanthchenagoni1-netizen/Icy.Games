import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let chatSession: Chat | null = null;
let genAiInstance: GoogleGenAI | null = null;

export const getGenAiInstance = (): GoogleGenAI => {
  if (!genAiInstance) {
    genAiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return genAiInstance;
};

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = getGenAiInstance();
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      maxOutputTokens: 500,
    },
  });
  return chatSession;
};

export const sendMessageToIcy = async (message: string, imageBase64?: string): Promise<string> => {
  try {
    const chat = initializeChat();
    
    // If there's an image, we send it as a multimodal message
    if (imageBase64) {
      const imagePart = {
        inlineData: {
          mimeType: 'image/png', // Assuming PNG or standard image format from FileReader
          data: imageBase64.split(',')[1] || imageBase64,
        },
      };
      const textPart = { text: message || "What is this?" };
      
      // Pass parts array to the message property
      const response: GenerateContentResponse = await chat.sendMessage({
         message: [imagePart, textPart]
      });
      return response.text || "I see the image, but I'm speechless!";
    }

    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "I'm feeling a bit frozen right now. Try again later!";
  } catch (error) {
    console.error("Error talking to Icy:", error);
    return "Brrr! My circuits are frozen. I can't answer that right now.";
  }
};