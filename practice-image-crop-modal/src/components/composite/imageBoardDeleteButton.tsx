"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { deleteImg } from "@/utils/fileController/imagesClient";

const ImageBoardDeleteButton = ({ imageId }: { imageId: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteImg(imageId);
    router.refresh();
  };

  return (
    <Button
      variant="destructive"
      size="icon"
      className="absolute top-2 right-2 cursor-pointer z-10"
      onClick={handleDelete}
    >
      <Trash2 className="size-4" />
    </Button>
  );
};

export default ImageBoardDeleteButton;
