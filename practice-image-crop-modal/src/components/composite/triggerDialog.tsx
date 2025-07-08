"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImageDialogProps {
  triggerText: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const TriggerDialog = ({
  triggerText,
  title,
  description,
  children,
}: ImageDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  // 將 onClose 函數傳遞給子組件
  const childrenWithClose =
    children && React.isValidElement(children)
      ? React.cloneElement(
          children as React.ReactElement<{ onClose?: () => void }>,
          { onClose: handleClose }
        )
      : children;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="cursor-pointer">
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="min-h-2/3 min-w-1/2">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl uppercase">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-center text-sm">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {childrenWithClose}
      </DialogContent>
    </Dialog>
  );
};

export default TriggerDialog;
