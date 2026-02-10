import { RectangleHorizontal, RectangleVertical, Square } from "lucide-react";

const AspectRatioSelector = () => {
  const iconMap = {
    "16:9": <RectangleHorizontal size={24} />,
    "1:1": <Square size={24} />,
    "9:6": <RectangleVertical size={24} />,
  } as Record<>;

  return (
    <div className="space-y-3 dark">
      <label
        htmlFor="aspect-ratio"
        className="block text-sm font-medium text-zinc-200"
      >
        Aspect Ratio
      </label>
      <div className="flex flex-wrap gap-28">
        <select
          id="aspect-ratio"
          className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/6 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-blue-500"
        >
          <option value="16:9">16:9</option>
          <option value="9:16">9:16</option>
          <option value="1:1">1:1</option>
        </select>
      </div>
    </div>
  );
};

export default AspectRatioSelector;
