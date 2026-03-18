import { Request, Response } from "express";
import Thumbnail from "../models/thumbnailModel.js";
import {
  GenerateContentConfig,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/genai";
import ai from "../config/ai.js";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { url } from "inspector/promises";

const stylePrompt = {
  "Bold & Graphic":
    "Bold, high-contrast, eye-catching, dynamic composition, strong typography, vibrant colors, attention-grabbing",
  "Tech/Futuristic":
    "Futuristic thumbnail, high-tech, sleek, modern, neon lights, digital elements, sci-fi aesthetic holographic effects",
  Minimalist:
    "Minimalist thumbnail, clean, simple, modern, elegant, subtle, sophisticated, sharp_lightening, clear_focal_point",
  Cinematic:
    "Cinematic thumbnail, dramatic lighting, professional composition, movie-style, immersive atmosphere",
  Photorealistic:
    "Photorealistic thumbnail, realistic details, natural lighting, lifelike, high-quality photography, DSLR-style, natural skin tones, 8k resolution, lifestyle realism, shallow depth of field",
  Illustrated:
    "Illustrated thumbnail, cartoonish, hand-drawn, playful, creative, artistic, bold outlines, vibrant colors, fun and energetic, creative cartoon or vector art style",
};

const colourSchemeDescription = {
  vibrant:
    "vibrant and energetic colors, high saturation, bold contrasts, eye-catching palette",
  sunset:
    "warn sunset tones, orange pink and purple hues, soft gradients, cinematic glow",
  forest:
    "natural green tones, earthy colors, carm and organic palette, fresh atmosphere ",
  neon: "neon glow effects, electric blues and pinks, cyberpunk aesthetic lightening, high contrast glow",
  purple:
    "purple-dominant color palatte, magenta and violet tones, modern and stylish mood",
  monochrome:
    "black and white color scheme, high contrast, dramatic and sophisticated lighening, timeless asthetic",
  ocean:
    "cool blue and teal tones, aquatic color palatte, fresh ans clean atmosphere",
  pastel:
    "Soft pastel colors, low saturation, gentle tones, calm and friendly aesthetic",
};

export const generateThumbnail = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;
    const {
      title,
      prompt: user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
    } = req.body;

    //save to db
    const thumbnail = await Thumbnail.create({
      userId,
      title,
      prompt_used: user_prompt,
      user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
      isGenerating: true,
    });

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

    //prompts
    let prompt = `
    Create a ${stylePrompt[style as keyof typeof stylePrompt]} for: "${title}"
    `;

    if (colourSchemeDescription) {
      prompt += ` Use a ${colourSchemeDescription[color_scheme as keyof typeof colourSchemeDescription]} color scheme.`;

      if (user_prompt) {
        prompt += `Aditional details:${user_prompt}`;
      }
    }

    prompt += ` The thumbnail should be ${aspect_ratio}, visually stunning, and designed to maximize click-through-rate. Make it bold, professional, and impossible to ignore`;

    //generate the image  using ai model
    const response: any = await ai.models.generateContent({
      model,
      contents: [prompt],
      config: generateConfig,
    });

    //check if the response is valid
    if (!response.candidates?.[0]?.content?.parts) {
      throw new Error("Invalid response from AI model");
    }

    //extract the image data from the response
    const parts = response.candidates[0].content.parts;
    let finalBuffer: Buffer | null = null;

    for (const part of parts) {
      if (part.inlineData) {
        finalBuffer = Buffer.from(parts.inlineData.data, "base64");
      }
    }

    //create filename
    const filename = `thumbnail-${Date.now()}.png`;
    const filePath = path.join("images", filename);

    //create the images directory if it doesn't exist
    fs.mkdirSync("images", { recursive: true });

    //save the image to the file system
    fs.writeFileSync(filePath, finalBuffer!);

    //upload to cloudinary
    const uploadToCloudinary = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
    });

    //update the thumbnail with the image url
    thumbnail.image_url = uploadToCloudinary.secure_url || url;
    thumbnail.isGenerating = false;

    //save to db
    await thumbnail.save();
    response.json({
      message: "Thumbnail generated successfully",
      thumbnail,
    });

    //delete the local file
    fs.unlinkSync(filePath);
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//delete thumbnail

export const deleteThumbnail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.session;

    await Thumbnail.findByIdAndDelete({ _id: id, userId });

    res.json({ message: "Thumbnail deleted successfully" });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
