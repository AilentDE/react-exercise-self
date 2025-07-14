import { NextRequest, NextResponse } from "next/server";

import db from "@/config/db";
import { generateSignature } from "@/lib/signatureHandler";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ assetKey: string[] }> }
) {
  const { assetKey } = await params;
  const combinedKey = assetKey.join("/");
  const width = request.nextUrl.searchParams.get("w");
  const height = request.nextUrl.searchParams.get("h");

  // use database if permission check is needed
  const asset = await db
    .prepare(`SELECT * FROM files WHERE key = ?`)
    .get(combinedKey);
  if (!asset) {
    return NextResponse.json({ message: "Asset not found" }, { status: 404 });
  }

  const queryParams = new URLSearchParams({
    expires: (Date.now() + 60000).toString(),
  });
  if (width) {
    queryParams.set("w", width.toString());
  }
  if (height) {
    queryParams.set("h", height.toString());
  }
  const signaturePayload = `${combinedKey}?${queryParams.toString()}`;
  const signature = generateSignature(
    process.env.IMAGE_PROXY_SECRET!,
    signaturePayload
  );
  queryParams.set("signature", signature);

  const targetUrl = `${
    process.env.IMAGE_PROXY_URL
  }/${combinedKey}?${queryParams.toString()}`;

  console.log(targetUrl);
  return NextResponse.redirect(targetUrl);
}
