import {
  ChevronDownIcon,
  CpuIcon,
  ImageIcon,
  PenToolIcon,
  SparkleIcon,
} from "lucide-react";
import { thumbnailStyles, type ThumbnailStyle } from "../assets/assets";

const StyleSelector = ({
  value,
  onChange,
  isOpen,
  setIsOpen,
}: {
  value: ThumbnailStyle;
  onChange: (style: ThumbnailStyle) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const styleDescriptions: Record<ThumbnailStyle, string> = {
    "Bold & Graphic": "High contrast, bold typography striking visuals",
    Minimalist: "Clean, simple,modern, lots of white space",
    Cinematic: "Dramatic lighting, deep shadows, movie-like",
    Photorealistic:
      "Hyper-realistic, detailed, lifelike, photo-based, natural looking",
    "Tech/Futuristic": "Neon lights, circuit boards, sci-fi, tech inspired",
    Illustrated: "Hand-drawn, artistic, creative, stylized",
  };

  const styleIcons: Record<ThumbnailStyle, React.ReactNode> = {
    "Bold & Graphic": <SparkleIcon className="h-4 w-4" />,
    Minimalist: <SparkleIcon className="h-4 w-4" />,
    Cinematic: <ImageIcon className="h-4 w-4" />,
    Photorealistic: <PenToolIcon className="h-4 w-4" />,
    "Tech/Futuristic": <CpuIcon className="h-4 w-4" />,
    Illustrated: <PenToolIcon className="h-4 w-4" />,
  };

  return (
    <div className="relative space-y-3 dark">
      <label
        htmlFor="style"
        className="block text-sm font-medium text-zinc-200"
      >
        Thumbnail Style
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border px-4 py-3 text-left transition bg-white/8 border-white/10 text-zinc-200"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-medium">
            {styleIcons[value]}
            <span className="text-sm font-medium">{value}</span>
          </div>
          <p className="text-xs text-zinc-400">{styleDescriptions[value]}</p>
        </div>
        <ChevronDownIcon
          className={[
            "h-4 w-4 text-zinc-400 transition-transform",
            isOpen && "rotate-180",
          ].join(" ")}
        />
      </button>
      {isOpen && (
        <div className="absolute bottom-0 z-50 mt-1 w-full rounded-md border border-white/12 backdrop-blur-3xl shadow-lg">
          {thumbnailStyles.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => {
                onChange(style);
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-2 hover:bg-white/5 transition-colors text-left"
            >
              <div className="text-zinc-400">{styleIcons[style]}</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-200">{style}</p>
                <p className="text-xs text-zinc-500">
                  {styleDescriptions[style]}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StyleSelector;
