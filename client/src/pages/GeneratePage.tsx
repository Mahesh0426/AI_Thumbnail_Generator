import { useState } from "react";
import { useParams } from "react-router-dom";
import SoftBackdrop from "../components/SoftBackdrop";

const GeneratePage = () => {
  const { id } = useParams();
  console.log(id);

  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <SoftBackdrop />
      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            {/* left side */}
            <div className={`space-y-6 ${id && "pointer-events-none"}`}>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-zinc-100 mb-1">
                    Create Your Thumbnail
                  </h2>
                  <p>Describe your vision and let AI handle the rest.</p>
                </div>
              </div>
            </div>
            {/* right side */}
            <div className="space-y-5">
              <div>
                <label htmlFor="title" className="block text-sm font-medium">
                  Title or Topic
                </label>
                <input
                  type="text"
                  value={title}
                  placeholder="eg. EC2 on Amazon Web Services"
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={100}
                  className="w-full px-4 py-3 rounded-lg border border-white/12 bg-white/8 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-blue-500"
                />
                <div className="flex justify-end">
                  <span className="text-xs text-zinc-400">
                    {title.length}/100
                  </span>
                </div>
              </div>

              {/* aspectratio selection */}
              {/* style selector */}
              {/* color theme selector */}
              {/* details */}
              <div className="space-y-2">
                <label htmlFor="details" className="block text-sm font-medium">
                  Additional Prompts{" "}
                  <span className="text-xs text-zinc-400">(Optional)</span>
                </label>
                <textarea
                  id="details"
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  maxLength={500}
                  placeholder="eg. High quality, 4k, 8k, 3d, cinematic, professional, etc."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/6 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-blue-500 resize-none"
                />
                <div className="flex justify-end">
                  <span className="text-xs text-zinc-400">
                    {additionalDetails.length}/500
                  </span>
                </div>
              </div>
            </div>
            {/* button */}
            {!id && (
              <button className="text-[15px] w-full py-3.5 rounded-xl font-medium bg-linear-to-b from-blue-500 to-blue-600 hover:from-blue-700 disabled:cursor-not-allowed transition-colors">
                {loading ? "Generating..." : "Generate Thumbnail"}
              </button>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default GeneratePage;
