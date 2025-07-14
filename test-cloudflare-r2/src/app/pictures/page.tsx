import { Suspense } from "react";
import Image from "next/image";

import UploadButton from "@/components/composite/UploadButton";
import db, { AssetInfo } from "@/config/db";

// import r2ImageLoader from "@/lib/imageLoader";

const PicturePage = async () => {
  const assets = (await db
    .prepare(`SELECT * FROM files WHERE status = 'uploaded'`)
    .all()) as AssetInfo[];

  return (
    <div className="flex flex-col gap-4 p-8 items-center">
      <h1 className="text-4xl font-extrabold">Pictures</h1>
      <UploadButton />
      <Suspense fallback={<p>Loading...</p>}>
        <div className="flex flex-wrap gap-4 p-1">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center justify-center size-20 relative"
            >
              <Image
                src={`/api/asset/${asset.key}?w=80`}
                // loader={r2ImageLoader}
                alt={asset.filename}
                fill={true}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default PicturePage;
