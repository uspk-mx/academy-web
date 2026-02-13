import * as React from "react";
import "./styles/index.css";

import type { Content, Editor } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";
import { Separator } from "ui/components/separator";
import { cn } from "ui/lib/utils";
import type { UseMinimalTiptapEditorProps } from "./hooks/use-minimal-tiptap";
import { SectionOne } from "./components/section/one";
import { SectionTwo } from "./components/section/two";
import { SectionThree } from "./components/section/three";
import { SectionFour } from "./components/section/four";
import { SectionFive } from "./components/section/five";
import { LinkBubbleMenu } from "./components/bubble-menu/link-bubble-menu";
import { useMinimalTiptapEditor } from "./hooks/use-minimal-tiptap";
import { MeasuredContainer } from "./components/measured-container";

export interface MinimalTiptapProps
  extends Omit<UseMinimalTiptapEditorProps, "onUpdate"> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
  showMediaActions?: boolean;
}

function Toolbar({
  editor,
  showMediaActions = true,
}: {
  editor: Editor;
  showMediaActions?: boolean;
}) {
  return (
    <div className="p-2 border-b border-border overflow-x-auto shrink-0">
      <div className="flex items-center gap-px w-max">
        <SectionOne activeLevels={[1, 2, 3, 4, 5, 6]} editor={editor} />

        <Separator className="mx-2 h-7" orientation="vertical" />

        <SectionTwo
          activeActions={[
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "code",
            "clearFormatting",
          ]}
          editor={editor}
          mainActionCount={3}
        />

        <Separator className="mx-2 h-7" orientation="vertical" />

        <SectionThree editor={editor} />

        <Separator className="mx-2 h-7" orientation="vertical" />

        <SectionFour
          activeActions={["orderedList", "bulletList"]}
          editor={editor}
          mainActionCount={0}
        />

        <SectionFive
          activeActions={["codeBlock", "blockquote", "horizontalRule"]}
          editor={editor}
          mainActionCount={0}
          isVisible={showMediaActions}
        />
      </div>
    </div>
  );
}

export const MinimalTiptapEditor = React.forwardRef<
  HTMLDivElement,
  MinimalTiptapProps
>(
  (
    {
      value,
      onChange,
      className,
      editorContentClassName,
      showMediaActions,
      ...props
    },
    ref
  ) => {
    const editor = useMinimalTiptapEditor({
      value,
      onUpdate: onChange,
      ...props,
    });

    if (!editor) {
      return null;
    }

    console.log("showMediaActions", showMediaActions);

    return (
      <MeasuredContainer
        as="div"
        className={cn(
          "flex h-auto min-h-72 max-h-96 bg-background max-w-full md:max-w-159 w-full flex-col rounded-md border-2 border-border shadow-xs ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2  focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2",
          className
        )}
        name="editor"
        ref={ref}
      >
        <Toolbar editor={editor} showMediaActions={showMediaActions} />
        <EditorContent
          className={cn(
            "minimal-tiptap-editor bg-background overflow-y-auto",
            editorContentClassName
          )}
          editor={editor}
        />
        <LinkBubbleMenu editor={editor} />
      </MeasuredContainer>
    );
  }
);

MinimalTiptapEditor.displayName = "MinimalTiptapEditor";

export default MinimalTiptapEditor;
