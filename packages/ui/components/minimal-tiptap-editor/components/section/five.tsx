import * as React from "react";
import type { Editor } from "@tiptap/react";
import type { FormatAction } from "../../types";
import type { toggleVariants } from "ui/components/toggle";
import type { VariantProps } from "class-variance-authority";
import {
  ChevronDown,
  CodeIcon,
  Minus,
  PlusIcon,
  QuoteIcon,
} from "lucide-react";
import { LinkEditPopover } from "../link/link-edit-popover";
import { ImageEditDialog } from "../image/image-edit-dialog";
import { ToolbarSection } from "../toolbar-section";
import { AudioUploadButton, VideoUploadButton } from "../../extensions";
import { YoutubeEditDialog } from "../youtube/youtube-edit-dialog";
import { Separator } from "ui/components/separator";

type InsertElementAction = "codeBlock" | "blockquote" | "horizontalRule";
interface InsertElement extends FormatAction {
  value: InsertElementAction;
}

const formatActions: InsertElement[] = [
  {
    value: "codeBlock",
    label: "Code block",
    icon: <CodeIcon className="size-5" />,
    action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive("codeBlock"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleCodeBlock().run(),
    shortcuts: ["mod", "alt", "C"],
  },
  {
    value: "blockquote",
    label: "Blockquote",
    icon: <QuoteIcon className="size-5" />,
    action: (editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive("blockquote"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleBlockquote().run(),
    shortcuts: ["mod", "shift", "B"],
  },
  {
    value: "horizontalRule",
    label: "Divider",
    icon: <Minus className="size-5" />,
    action: (editor) => editor.chain().focus().setHorizontalRule().run(),
    isActive: () => false,
    canExecute: (editor) =>
      editor.can().chain().focus().setHorizontalRule().run(),
    shortcuts: ["mod", "alt", "-"],
  },
];

interface SectionFiveProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
  activeActions?: InsertElementAction[];
  mainActionCount?: number;
  isVisible?: boolean;
}

export function SectionFive({
  editor,
  activeActions = formatActions.map((action) => action.value),
  mainActionCount = 0,
  size,
  variant,
  isVisible,
}: SectionFiveProps) {
  const handleAudioUpload = (base64: string): void => {
    //@ts-ignore
    editor.chain().focus().setAudio({ src: base64 }).run();
  };

  const handleVideoUpload = (base64: string): void => {
    //@ts-ignore
    editor.chain().focus().setVideo({ src: base64 }).run();
  };

  if (!isVisible) return null;

  return (
    <>
      <Separator className="mx-2 h-7" orientation="vertical" />
      <LinkEditPopover editor={editor} size={size} variant={variant} />
      <ImageEditDialog editor={editor} size={size} variant={variant} />
      <AudioUploadButton onUpload={handleAudioUpload} />
      <VideoUploadButton onUpload={handleVideoUpload} />
      <YoutubeEditDialog editor={editor} />
      <ToolbarSection
        actions={formatActions}
        activeActions={activeActions}
        dropdownIcon={
          <>
            <PlusIcon className="size-5" />
            <ChevronDown className="size-5" />
          </>
        }
        dropdownTooltip="Insert elements"
        editor={editor}
        mainActionCount={mainActionCount}
        size={size}
        variant={variant}
      />
    </>
  );
}

SectionFive.displayName = "SectionFive";

export default SectionFive;
