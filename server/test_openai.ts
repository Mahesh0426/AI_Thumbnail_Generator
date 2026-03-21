import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

async function main() {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: "A beautiful sunset over the mountains",
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    console.log("Success! Got output length:", response.data[0].b64_json?.length);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
