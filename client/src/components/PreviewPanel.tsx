import { ImageIcon, Loader2Icon } from "lucide-react";
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
        {/* thumbnail image */}
        {!isLoading && thumbnail?.image_url && (
          <img
            src={thumbnail.image_url}
            alt={thumbnail.title || "Generated Thumbnail"}
            className="w-full h-full object-cover rounded-xl"
          />
        )}

        {/* empty state */}
        {!isLoading && !thumbnail?.image_url && (
          <div className="flex flex-col items-center justify-center gap-4 absolute inset-0 m-2 rounded-lg border-2 border-dashed border-white/20 bg-black/25 ">
            <div className="max-sm:hidden flex size-20 items-center justify-center rounded-full bg-white/5">
              <ImageIcon className="size-10 text-white opacity-50" />
            </div>
            <div className="px-4 text-center">
              <p className="text-zinc-400 font-medium text-center">
                Generate your first thumbnail
              </p>
              <p className="text-zinc-400 text-sm">
                Enter your video title and description to get started
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
