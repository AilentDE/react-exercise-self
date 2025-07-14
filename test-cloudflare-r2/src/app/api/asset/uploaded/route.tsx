import { NextRequest, NextResponse } from "next/server";

import db, { AssetInfo } from "@/config/db";
import { generateSignature } from "@/lib/signatureHandler";

interface UploadedAssetInfo {
  id: string;
  signature: string;
}

export async function POST(req: NextRequest) {
  const { id, signature } = (await req.json()) as UploadedAssetInfo;

  const assetInfo = (await db
    .prepare(`SELECT * FROM files WHERE id = ?`)
    .get(id)) as AssetInfo;
  if (!assetInfo) {
    return NextResponse.json(
      { success: false, error: "Asset not found" },
      { status: 404 }
    );
  }

  const assetSignature = generateSignature(
    process.env.IMAGE_PROXY_SECRET!,
    encodeURI(assetInfo.key)
  );
  if (assetSignature !== signature) {
    return NextResponse.json(
      { success: false, error: "Invalid signature" },
      { status: 401 }
    );
  }

  const updatedAsset = db
    .prepare(
      `UPDATE files SET status = 'uploaded', updated_at = CURRENT_TIMESTAMP 
       WHERE id = ? 
       RETURNING *`
    )
    .get(id) as AssetInfo;

  return NextResponse.json({
    success: true,
    file: {
      id: updatedAsset.id,
      fileName: updatedAsset.filename,
      mime: updatedAsset.mime,
      key: updatedAsset.key,
      is_public: updatedAsset.is_public,
      status: updatedAsset.status,
      created_at: updatedAsset.created_at,
      updated_at: updatedAsset.updated_at,
    },
  });
}
