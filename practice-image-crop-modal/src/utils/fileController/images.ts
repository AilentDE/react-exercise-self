import fs from "node:fs/promises";
import { v7 as uuidv7 } from "uuid";

import filePaths from "./filePaths";
import { CroppedImage } from "@/entities/image";
import { checkFileExists } from "@/utils/fetcherHandler";

const filePath = filePaths.images + "/images.json";

export const fetchImages = async () => {
  const fileExists = await checkFileExists(filePath);
  if (!fileExists) {
    return [];
  }

  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading images file:", error);
    return [];
  }
};

export const findImage = async (imageId: string) => {
  const data = (await fetchImages()) as CroppedImage[];
  return data.find((image: CroppedImage) => image.id === imageId);
};

export const saveImage = async (
  imagePath: string,
  imageName: string
): Promise<CroppedImage> => {
  const data = await fetchImages();
  const newImage: CroppedImage = {
    id: uuidv7(),
    src: imagePath,
    alt: imageName,
  };

  data.push(newImage);
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    return newImage;
  } catch (error) {
    console.error("Error saving image:", error);
    throw new Error("Failed to save image");
  }
};

export const deleteImage = async (imageId: string) => {
  const data = await fetchImages();
  const filteredData = data.filter(
    (image: CroppedImage) => image.id !== imageId
  );
  try {
    await fs.writeFile(filePath, JSON.stringify(filteredData, null, 2), "utf8");
  } catch (error) {
    console.error("Error deleting image:", error);
    throw new Error("Failed to delete image");
  }
};
