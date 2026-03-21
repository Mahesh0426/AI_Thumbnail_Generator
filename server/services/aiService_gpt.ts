import OpenAI from "openai";
import {
  GenerateImageParams,
  stylePrompt,
  colourSchemeDescription,
} from "./aiService.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

export const generateImageFromOpenAI = async ({
  title,
  style,
  color_scheme,
  user_prompt,
  aspect_ratio,
}: GenerateImageParams): Promise<Buffer> => {
  let prompt = `
  Create a ${stylePrompt[style as keyof typeof stylePrompt] || style} for: "${title}"
  `;

  if (color_scheme) {
    prompt += ` Use a ${colourSchemeDescription[color_scheme as keyof typeof colourSchemeDescription] || color_scheme} color scheme.`;
  }

  if (user_prompt) {
    prompt += ` Additional details: ${user_prompt}`;
  }

  prompt += ` The thumbnail should be ${aspect_ratio || "16:9"}, visually stunning, and designed to maximize click-through-rate. Make it bold, professional, and impossible to ignore`;

  // Determine image size based on aspect ratio
  let size: "1024x1024" | "1024x1536" | "1536x1024" | "auto" = "auto";

  if (aspect_ratio === "1:1") size = "1024x1024";
  else if (["9:16", "3:4", "4:5"].includes(aspect_ratio)) size = "1024x1536";
  else if (["16:9", "4:3"].includes(aspect_ratio)) size = "1536x1024";

  // Generate image using OpenAI
  const response = await openai.images.generate({
    model: "gpt-image-1-mini",
    prompt: prompt.substring(0, 4000),
    n: 1,
    size,
  });

  const b64_json = response.data?.[0]?.b64_json;
  if (!b64_json) {
    throw new Error("Could not extract image buffer from OpenAI response");
  }

  return Buffer.from(b64_json, "base64");
};
