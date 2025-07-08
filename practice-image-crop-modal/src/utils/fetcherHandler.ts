import fs from "node:fs/promises";
import path from "path";

export const checkFileExists = async (filePath: string): Promise<boolean> => {
  console.log(filePath);
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    const emptyJson = JSON.stringify([]);
    await fs.writeFile(filePath, emptyJson, "utf8");
    console.error(
      `File not found, created an empty file at ${filePath}`,
      error
    );
    return false;
  }
};
