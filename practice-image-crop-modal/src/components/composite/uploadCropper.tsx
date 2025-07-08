"use client";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import Cropper, { Point, Area } from "react-easy-crop";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui//button";
import { v4 as uuidv4 } from "uuid";

import {
  getCroppedImg,
  uploadImage,
} from "@/utils/fileController/imagesClient";

interface UploadCropperProps {
  onClose?: () => void;
}

const UploadCropper = ({ onClose }: UploadCropperProps) => {
  const router = useRouter();
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const fileUrl = useMemo(() => {
    return fileInput ? URL.createObjectURL(fileInput) : undefined;
  }, [fileInput]);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const resetModal = () => {
    setFileInput(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl); // 釋放物件 URL
    }
    console.log("Modal reset");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    maxSize: 10000000,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFileInput(file);
      } else {
        console.error("No file selected or file is not valid.");
      }
    },
    onError: (error) => {
      console.error("Dropzone error:", error);
    },
  });

  const handleSubmit = async () => {
    if (!fileInput || !fileUrl || !croppedAreaPixels) return;
    // 根據原始 mime type 決定格式
    const format = fileInput.type === "image/png" ? "image/png" : "image/jpeg";
    const blob = await getCroppedImg(fileUrl, croppedAreaPixels, zoom, format);
    // 自動產生檔名
    // const ext = format === "image/png" ? ".png" : ".jpg";
    // const fileName = `upload-${Date.now()}-${uuidv4()}${ext}`;
    const fileName = fileInput.name || `upload-${uuidv4()}`;
    // 用 Blob 建立 File
    const croppedFile = new File([blob], fileName, { type: format });
    await uploadImage(croppedFile);

    // 清理資源
    router.refresh(); // 刷新頁面以顯示新的圖片
    resetModal();

    // 關閉 Dialog
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="flex flex-col space-y-4 items-center">
      {!fileInput ? (
        <div
          {...getRootProps()}
          className="flex flex-col items-center justify-center p-4 size-40 sm:w-80 sm:h-40 border-2 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag and drop some files here, or click to select files</p>
          )}
        </div>
      ) : (
        <div className="relative w-full h-80">
          <Cropper
            image={fileUrl}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      )}
      <div className="flex flex-col items-center space-y-4">
        {fileInput ? (
          <>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Selected file: {fileInput.name}
            </p>

            <Slider
              className="p-1"
              value={[zoom - 1]}
              onValueChange={(value) => {
                setZoom(value[0] + 1);
              }}
              max={2}
              step={0.01}
            />
            <div className="flex gap-4">
              <Button className="cursor-pointer" onClick={handleSubmit}>
                Submit
              </Button>
              <Button
                className="cursor-pointer"
                onClick={() => setFileInput(null)}
              >
                Reset
              </Button>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No file selected
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadCropper;
