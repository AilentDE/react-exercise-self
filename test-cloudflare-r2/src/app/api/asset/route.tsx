import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import db from "@/config/db";
import { generateSignature } from "@/lib/signatureHandler";

interface AssetInfo {
  filename: string;
  mime: string;
  is_public: boolean;
}

export async function POST(req: NextRequest) {
  const { filename, mime, is_public } = (await req.json()) as AssetInfo;
  const id = uuidv4();
  const key = `first-folder/${id}-${filename}`;

  await db
    .prepare(
      `INSERT INTO files (id, filename, mime, key, is_public, status) VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(id, filename, mime, key, is_public ? 1 : 0, "pending");

  const params = new URLSearchParams({
    expires: (Date.now() + 60000).toString(),
  });
  const signaturePayload = `${key}?${params.toString()}`;
  const signature = generateSignature(
    process.env.IMAGE_PROXY_SECRET!,
    signaturePayload
  );
  params.set("signature", signature);
  const uploadUrl = `${
    process.env.IMAGE_PROXY_URL
  }/${key}?${params.toString()}`;

  return NextResponse.json({ id, uploadUrl });
}
