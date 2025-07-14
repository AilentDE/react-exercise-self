interface UploadImageProps {
  filename: string;
  mime: string;
  is_public?: boolean;
}
interface UploadImageResult {
  id: string;
  uploadUrl: string;
}

interface UploadResult {
  success: boolean;
  signature: string;
}

interface UploadDoneProps {
  id: string;
  signature: string;
}

export const requireUploadUrl = async ({
  filename,
  mime,
  is_public = false,
}: UploadImageProps): Promise<UploadImageResult> => {
  const response = await fetch("/api/asset", {
    method: "POST",
    body: JSON.stringify({ filename, mime, is_public }),
  });
  if (!response.ok) {
    throw new Error("Failed to upload image");
  }
  const data = await response.json();
  return data;
};

export const uploadImage = async (
  uploadUrl: string,
  file: File
): Promise<UploadResult> => {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
  });
  if (!response.ok) {
    throw new Error("Failed to upload image");
  }
  const data = await response.json();
  return data;
};

export const uploadDone = async ({ id, signature }: UploadDoneProps) => {
  const response = await fetch("/api/asset/uploaded", {
    method: "POST",
    body: JSON.stringify({ id, signature }),
  });
  if (!response.ok) {
    throw new Error("Failed to upload image");
  }
  const data = await response.json();
  return data;
};
