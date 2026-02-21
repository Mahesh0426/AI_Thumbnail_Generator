import { Loader2Icon } from "lucide-react";
import { type AspectRatio, type IThumbnail } from "../assets/assets";

const PreviewPanel = ({
  thumbnail,
  isLoading,
  aspectRatio,
}: {
  thumbnail: IThumbnail | null;
  isLoading: boolean;
  aspectRatio: AspectRatio;
}) => {
  const aspectClasses = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  } as Record<AspectRatio, string>;
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className={`relative overflow-hidden ${aspectClasses[aspectRatio]}`}>
        {isLoading && (
          <div className="flex flex-col absolute inset-0 items-center justify-center">
            <Loader2Icon className="animate-spin size-8 text-zinc-400" />
            <div className="text-center">
              <p className="text-sm font-medium text-zinc-400">
                Generating Thumbnail...
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                Please wait while we generate your thumbnail.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
