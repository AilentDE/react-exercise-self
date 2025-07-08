import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";
import { saveImage } from "@/utils/fileController/images";

export const POST = async (req: NextRequest) => {
  const arrayBuffer = await req.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const encodedFileName =
    req.headers.get("x-file-name") || `upload-${uuidv4()}.jpg`;
  const fileName = decodeURIComponent(encodedFileName);

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  const saveFileName = `${Date.now()}-${fileName}`;
  const saveFilePath = path.join(uploadDir, saveFileName);
  const filePath = `/uploads/${saveFileName}`;

  try {
    await fs.writeFile(saveFilePath, buffer);
    const savedFile = await saveImage(filePath, fileName);
    revalidatePath("/imageController");
    return NextResponse.json({
      message: "File uploaded successfully",
      data: savedFile,
    });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
  }
};
