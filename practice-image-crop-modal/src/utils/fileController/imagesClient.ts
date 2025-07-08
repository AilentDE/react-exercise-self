import { Area } from "react-easy-crop";

export const uploadImage = async (
  file: File
): Promise<{ message: string; path: string }> => {
  const arrayBuffer = await file.arrayBuffer();
  const res = await fetch("/api/image", {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      "X-File-Name": encodeURIComponent(file.name),
    },
    body: arrayBuffer,
  });

  if (!res.ok) {
    throw new Error("Failed to upload image");
  }
  const data = await res.json();
  return data;
};

// 工具函數：根據 crop 訊息裁切圖片並回傳 Blob
export const getCroppedImg = async (
  imageSrc: string,
  crop: Area,
  zoom: number,
  format: "image/jpeg" | "image/png" = "image/jpeg"
): Promise<Blob> => {
  const image = new window.Image();
  image.src = imageSrc;
  await new Promise((resolve) => {
    image.onload = resolve;
  });

  const canvas = document.createElement("canvas");
  const scale = image.naturalWidth / image.width;
  const cropX = crop.x * scale;
  const cropY = crop.y * scale;
  const cropWidth = crop.width * scale;
  const cropHeight = crop.height * scale;
  canvas.width = cropWidth;
  canvas.height = cropHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No 2d context");

  ctx.drawImage(
    image,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
    }, format);
  });
};

export const deleteImg = async (imageId: string) => {
  const res = await fetch(`/api/image/${imageId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete image");
  }
  return res.json();
};
