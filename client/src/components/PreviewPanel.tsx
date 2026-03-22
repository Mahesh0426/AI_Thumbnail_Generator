import { ImageIcon, Loader2Icon, Download as DownloadIcon } from "lucide-react";
import { type AspectRatio, type IThumbnail } from "../assets/assets";
import toast from "react-hot-toast";

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
                Generating your thumbnail...
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                Please wait while we generate your thumbnail. this may take
                15-20 seconds.
              </p>
            </div>
          </div>
        )}
        {/* thumbnail preview */}
        {!isLoading && thumbnail?.image_url && (
          <div className="group relative w-full h-full">
            <img
              src={thumbnail.image_url}
              alt={thumbnail.title || "Generated Thumbnail"}
              className="w-full h-full object-cover rounded-xl"
            />
            {/* Download Overlay */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-t from-black/80 via-black/40 to-transparent p-6 rounded-b-xl">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!thumbnail?.image_url) return;

                  try {
                    const link = document.createElement("a");
                    link.href = thumbnail.image_url.replace(
                      "/upload",
                      "/upload/fl_attachment",
                    );
                    link.download = `${thumbnail.title || "generated-thumbnail"}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  } catch (err) {
                    console.error("Failed to download image", err);
                    toast.error(
                      "Failed to download the image. Please try again.",
                    );
                  }
                }}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2.5 rounded-lg backdrop-blur-md transition-all cursor-pointer shadow-lg border border-white/10"
              >
                <DownloadIcon className="size-4" />
                <span className="text-sm font-semibold">Download Image</span>
              </button>
            </div>
          </div>
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
