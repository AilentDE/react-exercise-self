import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

import { findImage, deleteImage } from "@/utils/fileController/images";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ imageId: string }> }
) => {
  const { imageId } = await params;

  if (!imageId) {
    return NextResponse.json(
      { error: "Image ID is required" },
      { status: 400 }
    );
  }

  const image = await findImage(imageId);
  if (!image) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }
  const imagePath = path.join(process.cwd(), "public", image.src);

  try {
    await fs.unlink(imagePath);
    await deleteImage(imageId);
    revalidatePath("/imageController");
    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
};
