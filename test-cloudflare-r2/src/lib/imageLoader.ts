"use client";
import { generateSignature } from "@/lib/signatureHandler";

export default function r2ImageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}): string {
  const params = new URLSearchParams({
    expires: (Date.now() + 60000).toString(),
  });
  if (width) {
    params.set("w", width.toString());
  }
  const signaturePayload = `${src}?${params.toString()}`;
  const signature = generateSignature(
    process.env.IMAGE_PROXY_SECRET!,
    signaturePayload
  );
  params.set("signature", signature);
  //   return `${process.env.IMAGE_PROXY_URL}${pathname}?${params.toString()}`;

  return `${
    process.env.NEXT_PUBLIC_IMAGE_PROXY_URL
  }/${src}?${params.toString()}`;
}
