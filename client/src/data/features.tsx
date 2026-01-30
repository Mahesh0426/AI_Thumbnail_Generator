import { Zap, ThumbsUp, Infinity } from "lucide-react";
import type { IFeature } from "../types";

export const featuresData: IFeature[] = [
  {
    icon: <Zap size={34} strokeWidth={1.5} className="text-pink-500" />,
    title: "AI-Powered Generation",
    description:
      "Generate high-quality thumbnails instantly using advanced AI algorithms.",
  },
  {
    icon: <ThumbsUp size={34} strokeWidth={1.5} className="text-pink-500" />,
    title: "High-Quality Results",
    description:
      "Generate professional-grade thumbnails that stand out and attract viewers.",
  },
  {
    icon: <Infinity size={34} strokeWidth={1.5} className="text-pink-500" />,
    title: "Easy to Use",
    description:
      "Simple and intuitive interface - generate thumbnails with just a few clicks.",
  },
];
