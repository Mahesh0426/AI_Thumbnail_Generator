import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

async function testModel(modelName: string) {
  console.log(`Testing ${modelName}...`);
  try {
    const response = await openai.images.generate({
      model: modelName,
      prompt: "A beautiful sunset over the mountains",
      n: 1,
      size: modelName === "dall-e-2" ? "256x256" : "1024x1024",
      response_format: "b64_json",
    });
    console.log(`Success with ${modelName}!`);
  } catch (error: any) {
    console.error(`Error with ${modelName}:`, error.message);
  }
}

async function main() {
  await testModel("dall-e-3");
  await testModel("dall-e-2");
  await testModel("gpt-image-1");
}

main();
