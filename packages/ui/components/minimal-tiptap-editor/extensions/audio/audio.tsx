import { mergeAttributes, Node } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { Music2Icon } from "lucide-react";
import type { ChangeEvent, JSX } from "react";
import { useRef } from "react";
import { Button } from "ui/components/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "ui/components/tooltip";

// Utility function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Audio Upload Button Component
function AudioUploadButton({
  onUpload,
}: {
  onUpload: (src: string) => void;
}): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("audio/")) {
      alert("Please upload an audio file");
      return;
    }

    // Validate file size (e.g., 10MB limit)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > MAX_SIZE) {
      alert("File size should be less than 10MB");
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      onUpload(base64);

      // Reset input
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <div className="relative inline-block">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => inputRef.current?.click()}
            size="icon"
            type="button"
            variant="ghost"
          >
            <Music2Icon className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Agrega un audio</p>
        </TooltipContent>
      </Tooltip>
      <input
        ref={inputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

// Audio Player Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- can be anything
function AudioComponent({ node }: { node: any }): JSX.Element {
  return (
    <NodeViewWrapper className="react-component-audio-wrapper">
      <div className="my-4">
        <audio
          className="w-full"
          controls
          src={node.attrs.src}
          style={{ maxWidth: "500px" }}
        >
          <track default kind="captions" srcLang="en" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </NodeViewWrapper>
  );
}

export interface AudioOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    audio: {
      setAudio: (options: { src: string }) => ReturnType;
    };
  }
}

export const Audio = Node.create<AudioOptions>({
  name: "audio",

  group: "block",

  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "audio",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "audio",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(AudioComponent);
  },

  addCommands() {
    return {
      setAudio:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});

export { AudioUploadButton };
