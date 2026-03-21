export const stylePrompt = {
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

export const colourSchemeDescription = {
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

export interface GenerateImageParams {
  title: string;
  style: string;
  color_scheme: string;
  user_prompt: string;
  aspect_ratio: string;
}
