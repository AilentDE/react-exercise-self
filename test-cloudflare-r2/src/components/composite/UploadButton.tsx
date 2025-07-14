"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Upload } from "lucide-react";

import {
  requireUploadUrl,
  uploadImage,
  uploadDone,
} from "@/actions/uploadImage";

const UploadButton = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const { id, uploadUrl } = await requireUploadUrl({
          filename: file.name,
          mime: file.type,
        });
        const { success, signature } = await uploadImage(uploadUrl, file);
        if (!success) {
          throw new Error("Failed to upload image");
        }
        await uploadDone({ id, signature });
        router.refresh();
      } catch (error) {
        alert("Failed to upload image");
        console.error(error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <>
      {fileInputRef.current?.files?.[0] && (
        <div className="text-sm text-gray-500">
          {fileInputRef.current?.files?.[0].name}
        </div>
      )}
      <Button
        className="cursor-pointer"
        onClick={handleClick}
        disabled={isUploading}
      >
        {isUploading ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            <p>Uploading...</p>
          </>
        ) : (
          <>
            <Upload className="size-4" />
            <p>Upload</p>
          </>
        )}
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleUpload}
      />
    </>
  );
};

export default UploadButton;
