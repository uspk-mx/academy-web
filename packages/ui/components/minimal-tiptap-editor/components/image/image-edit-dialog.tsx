import type { Editor } from "@tiptap/react";
import type { VariantProps } from "class-variance-authority";
import type { JSX} from "react";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import type { toggleVariants } from "ui/components/toggle";
import { ToolbarButton } from "../toolbar-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "ui/components/dialog";
import { ImageEditBlock } from "./image-edit-block";

interface ImageEditDialogProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

function ImageEditDialog({ editor, size, variant }: ImageEditDialogProps): JSX.Element { 
  const [open, setOpen] = useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <ToolbarButton
          aria-label="Image"
          isActive={editor.isActive("image")}
          size={size}
          tooltip="Image"
          variant={variant}
          type="button"
        >
          <ImageIcon className="size-5" />
        </ToolbarButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Select image</DialogTitle>
          <DialogDescription className="sr-only">
            Upload an image from your computer
          </DialogDescription>
        </DialogHeader>
        <ImageEditBlock close={() => { setOpen(false); }} editor={editor} />
      </DialogContent>
    </Dialog>
  );
};

export { ImageEditDialog };
