import SoftBackdrop from "../components/SoftBackdrop";
import { dummyThumbnails, IThumbnail } from "../assets/assets";
import { useEffect, useState } from "react";

const MyGeneration = () => {
  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchThumbnails = async () => {
    setThumbnails(dummyThumbnails as unknown as IThumbnail[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchThumbnails();
  }, []);

  const handleDownload = (image_url: string) => {
    window.open(image_url, "_blank");
  };

  const handleDelete = (id: string) => {
    console.log(id);
  };

  return (
    <>
      <SoftBackdrop />
      <div className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
        {/* header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-100">My Generations</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Manage and download your generated thumbnails.
          </p>
        </div>

        {/* loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyGeneration;
