import { Suspense } from "react";
import { fetchImages } from "@/utils/fileController/images";
import { CroppedImage } from "@/entities/image";

import TriggerDialog from "@/components/composite/triggerDialog";
import UploadCropper from "@/components/composite/uploadCropper";
import ImageBoard from "@/components/composite/imageBoard";

const fetchImagePage = async () => {
  const images = (await fetchImages()) as CroppedImage[];

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-4xl font-extrabold">Image Gallery</h1>
      <TriggerDialog
        triggerText="Add Image"
        title="Cropper"
        description="crop image here."
      >
        <UploadCropper />
      </TriggerDialog>
      <Suspense fallback={<div>Loading...</div>}>
        <ImageBoard images={images} />
      </Suspense>
    </div>
  );
};

export default fetchImagePage;
