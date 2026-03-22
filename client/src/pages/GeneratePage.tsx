import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SoftBackdrop from "../components/SoftBackdrop";
import AspectRatioSelector from "../components/AspectRatioSelector";
import {
  colorSchemes,
  type AspectRatio,
  type IThumbnail,
  type ThumbnailStyle,
} from "../assets/assets";
import StyleSelector from "../components/StyleSelector";
import ColourSchemeSelector from "../components/ColourSchemeSelector";
import PreviewPanel from "../components/PreviewPanel";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import api from "../configs/api";

const GeneratePage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);

  console.log("thumbnail", thumbnail);

  const [loading, setLoading] = useState(false);

  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [colorSchemeId, setColorSchemeId] = useState<string>(
    colorSchemes[0].id,
  );
  const [style, setStyle] = useState<ThumbnailStyle>("Bold & Graphic");

  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);

  // function that will handle generate
  const handleGenerate = async () => {
    setLoading(true);
    if (!isLoggedIn) {
      setLoading(false);
      navigate("/login");
      return;
    }

    if (!title.trim()) {
      setLoading(false);
      return toast.error("Please enter a title!");
    }

    //api call
    const api_payload = {
      title,
      prompt: additionalDetails,
      style,
      aspect_ratio: aspectRatio,
      color_scheme: colorSchemeId,
      text_overlay: true,
    };

    try {
      const { data } = await api.post("/api/thumbnail/generate", api_payload);

      if (data.success || data.thumbnail) {
        navigate(`/generate/${data.thumbnail._id}`);
        toast.success(data.message);
      } else {
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Error generating thumbnail",
      );
      setLoading(false);
    }
  };

  // fetch thumbnail if id is present
  const fetchThumbnail = useCallback(async () => {
    try {
      const { data } = await api.get(`/api/user/thumbnail/${id}`);
      setThumbnail(data?.thumbnail as IThumbnail);
      setLoading(!data?.thumbnail?.image_url);
      setAdditionalDetails(data?.thumbnail?.user_prompt);
      setTitle(data?.thumbnail?.title);
      setColorSchemeId(data?.thumbnail?.color_schema);
      setAspectRatio(data?.thumbnail?.aspect_ratio);
      setStyle(data?.thumbnail?.style);
    } catch (error: any) {
      console.log("error fetching user thumbnail", error);

      toast.error(error.response?.data?.message || "An error occurred");
    }
  }, [id]);

  // initial fetch when arriving via a shared or generated ID
  useEffect(() => {
    if (isLoggedIn && id) {
      const doFetch = async () => {
        await fetchThumbnail();
      };
      doFetch();
    }
  }, [isLoggedIn, id, fetchThumbnail]);

  // polling fetch while still loading
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (id && loading && isLoggedIn) {
      interval = setInterval(() => {
        fetchThumbnail();
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [id, loading, isLoggedIn, fetchThumbnail]);

  // if user is on generate page and clicks on generate button again then clear the thumbnail
  useEffect(() => {
    if (!id && thumbnail) {
      // Defer state update to avoid cascading render warning
      const timeoutId = setTimeout(() => setThumbnail(null), 0);
      return () => clearTimeout(timeoutId);
    }
  }, [pathname, id, thumbnail]);

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
                <AspectRatioSelector
                  value={aspectRatio}
                  onChange={setAspectRatio}
                />

                {/* style selector */}
                <StyleSelector
                  value={style}
                  onChange={setStyle}
                  isOpen={styleDropdownOpen}
                  setIsOpen={setStyleDropdownOpen}
                />

                {/* color theme selector */}
                <ColourSchemeSelector
                  value={colorSchemeId}
                  onChange={setColorSchemeId}
                />

                {/* details */}
                <div className="space-y-2">
                  <label
                    htmlFor="details"
                    className="block text-sm font-medium"
                  >
                    Additional Prompts{" "}
                    <span className="text-xs text-zinc-400">(Optional)</span>
                  </label>
                  <textarea
                    id="details"
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    maxLength={500}
                    placeholder="Add any extra directions for the thumbnail, such as style, mood, or quality settings."
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

              {!id && (
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="text-[15px] w-full py-3.5 rounded-xl font-medium bg-linear-to-b from-blue-500 to-blue-600 hover:from-blue-700 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Generating..." : "Generate Thumbnail"}
                </button>
              )}
            </div>

            {/* right panel */}
            <div>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
                <h2 className="text-lg font-semibold text-zinc-100 mb-1">
                  Preview
                </h2>
                <p className="text-sm text-zinc-400 mb-4">
                  Your thumbnail will appear here once generated.
                </p>
                <PreviewPanel
                  thumbnail={thumbnail}
                  isLoading={loading}
                  aspectRatio={aspectRatio}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default GeneratePage;
