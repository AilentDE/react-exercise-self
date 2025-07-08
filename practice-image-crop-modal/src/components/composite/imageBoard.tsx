import Image from "next/image";

import { CroppedImage } from "@/entities/image";
import ImageBoardDeleteButton from "./imageBoardDeleteButton";

interface ImageBoardProps {
  images: CroppedImage[];
}

const ImageBoard = ({ images }: ImageBoardProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative size-64">
          <div className="absolute top-0 left-0 size-full bg-black/50 flex items-center justify-center">
            <ImageBoardDeleteButton imageId={image.id} />
          </div>
          <Image src={image.src} alt={image.alt} fill={true} />
        </div>
      ))}
    </div>
  );
};

export default ImageBoard;
