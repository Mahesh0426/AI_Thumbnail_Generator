import { RectangleHorizontal, RectangleVertical, Square } from "lucide-react";
import { aspectRatios, type AspectRatio } from "../assets/assets";

const AspectRatioSelector = ({
  value,
  onChange,
}: {
  value: AspectRatio;
  onChange: (value: AspectRatio) => void;
}) => {
  const iconMap = {
    "16:9": <RectangleHorizontal size={24} />,
    "1:1": <Square size={24} />,
    "9:6": <RectangleVertical size={24} />,
  } as Record<AspectRatio, React.ReactNode>;

  return (
    <div className="space-y-3 dark">
      <label
        htmlFor="aspect-ratio"
        className="block text-sm font-medium text-zinc-200"
      >
        Aspect Ratio
      </label>
      <div className="flex flex-wrap gap-28">
        {aspectRatios.map((ratio) => {
          const selected = value === ratio;

          return (
            <button
              key={ratio}
              type="button"
              onClick={() => onChange(ratio)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-md border text-sm transition border-white/10 ${selected ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-200"}`}
            >
              {iconMap[ratio]}
              <span className="tracking-widest">{ratio}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AspectRatioSelector;
