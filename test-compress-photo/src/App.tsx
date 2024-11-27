import { useState, useCallback, useEffect, useRef } from "react";
import Compressor from "compressorjs";

import ImageCard from "./compose/Card";

type PhotoType = {
  content: string;
  size: number;
};

type TargetPhotos = {
  original: PhotoType | null;
  resized: PhotoType | null;
};

export default function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState<TargetPhotos>({
    original: null,
    resized: null,
  });

  useEffect(() => {
    if (!photo) return;

    console.log("[photo]", photo);

    const reader = new FileReader();
    reader.onload = (event) => {
      console.log("[origin]", event.target);
      setCurrentPhoto((prev) => ({
        ...prev,
        original: {
          content: event.target?.result as string,
          size: photo.size,
        },
      }));

      new Compressor(photo, {
        convertSize: 1000000,
        quality: 0.6,
        success(result) {
          const reader = new FileReader();
          reader.onload = (event) => {
            console.log("[resized]", event.target);
            setCurrentPhoto((prev) => ({
              ...prev,
              resized: {
                content: event.target?.result as string,
                size: result.size,
              },
            }));
          };
          reader.readAsDataURL(result);
        },
        error(err) {
          console.error(err.message);
        },
      });
    };
    reader.readAsDataURL(photo);
  }, [photo]);

  const handleClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);
  const handleUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        setPhoto(file);
      }
    },
    []
  );

  return (
    <main className="flex w-screen min-h-screen py-12 px-4 justify-center items-center bg-black text-white">
      <div className="flex flex-col w-full px-4 space-y-12">
        <ImageCard
          title="Origin"
          photoUrl={
            currentPhoto.original ? currentPhoto.original.content : undefined
          }
          size={currentPhoto.original ? currentPhoto.original.size : undefined}
        >
          <button
            className="px-2 py-1 border border-gray-300 rounded"
            onClick={handleClick}
          >
            Upload Photo
          </button>
          {photo && (
            <>
              <p>{photo.name}</p>
              <p>{photo.type}</p>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={inputRef}
            onChange={handleUpload}
          />
        </ImageCard>
        <ImageCard
          title="Resized"
          photoUrl={
            currentPhoto.resized ? currentPhoto.resized.content : undefined
          }
          size={currentPhoto.resized ? currentPhoto.resized.size : undefined}
        />
      </div>
    </main>
  );
}
