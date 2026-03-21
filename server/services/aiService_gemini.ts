import {
  GenerateContentConfig,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/genai";
import ai from "../config/ai.js";
import {
  GenerateImageParams,
  stylePrompt,
  colourSchemeDescription,
} from "./aiService.js";

export const generateImageFromGemini = async ({
  title,
  style,
  color_scheme,
  user_prompt,
  aspect_ratio,
}: GenerateImageParams): Promise<Buffer> => {
  const model = "gemini-2.5-flash-image";

  const generateConfig: GenerateContentConfig = {
    maxOutputTokens: 32768,
    temperature: 1,
    topP: 0.95,
    responseModalities: ["IMAGE"],
    imageConfig: {
      aspectRatio: aspect_ratio || "16:9",
      imageSize: "1K",
    },
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.OFF,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.OFF,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.OFF,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.OFF,
      },
    ],
  };

  console.log("generateConfig", generateConfig);

  //prompts
  let prompt = `
  Create a ${stylePrompt[style as keyof typeof stylePrompt] || style} for: "${title}"
  `;

  if (color_scheme) {
    prompt += ` Use a ${colourSchemeDescription[color_scheme as keyof typeof colourSchemeDescription] || color_scheme} color scheme.`;
  }

  if (user_prompt) {
    prompt += `Aditional details:${user_prompt}`;
  }

  prompt += ` The thumbnail should be ${aspect_ratio || "16:9"}, visually stunning, and designed to maximize click-through-rate. Make it bold, professional, and impossible to ignore`;

  //generate the image using ai model
  const response: any = await ai.models.generateContent({
    model,
    contents: [prompt],
    config: generateConfig,
  });
  console.log("response from ai model", response);

  //check if the response is valid
  if (!response.candidates?.[0]?.content?.parts) {
    throw new Error("Invalid response from AI model");
  }

  //extract the image data from the response
  const parts = response.candidates[0].content.parts;
  let finalBuffer: Buffer | null = null;

  for (const part of parts) {
    if (part.inlineData) {
      finalBuffer = Buffer.from(part.inlineData.data, "base64");
    }
  }

  if (!finalBuffer) {
    throw new Error("Could not extract image buffer from AI response");
  }

  return finalBuffer;
};
