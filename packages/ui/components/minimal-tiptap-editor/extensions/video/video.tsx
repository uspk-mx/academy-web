import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import { VideoIcon } from 'lucide-react';
import type { JSX} from 'react';
import React, { useRef } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from 'ui/components/tooltip';
import { Button } from 'ui/components/button';


// Utility function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => { resolve(reader.result as string); };
    reader.onerror = error => { reject(error); };
  });
};

// Video Upload Button Component
function VideoUploadButton({ onUpload }: { onUpload: (src: string) => void }): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      alert('Please upload a video file');
      return;
    }

    // Increased size limit for videos (50MB)
    const MAX_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      alert('File size should be less than 50MB');
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      onUpload(base64);

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <div className="relative inline-block">
      <Tooltip>
        <TooltipTrigger asChild>
      <Button onClick={() => inputRef.current?.click()}         size='icon' type='button' variant='ghost'>
        <VideoIcon className='size-5' />
      </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Agrega un video desde tu computadora.</p>
      </TooltipContent>
      </Tooltip>
      <input accept="video/*" className="hidden" onChange={handleFileChange} ref={inputRef} type="file" />
    </div>
  );
};

// Video Component
function VideoComponent({ node }: { node: any }): JSX.Element {
  return (
    <NodeViewWrapper className="react-component-video-wrapper">
      <div className="my-4">
        <video
          className="w-full rounded-lg"
          controls
          preload="metadata"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- can be anything
          src={node.attrs.src}
          style={{ maxWidth: "680px" }}
        >
          <track default kind="captions" srcLang="en" />
          Your browser does not support the video element.
        </video>
      </div>
    </NodeViewWrapper>
  );
}

export interface VideoOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      setVideo: (options: { src: string }) => ReturnType;
    };
  }
}

export const Video = Node.create<VideoOptions>({
  name: 'video',

  group: 'block',

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
      width: {
        default: null,
      },
      height: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'video',
        getAttrs: dom => {
          if (!(dom instanceof HTMLElement)) {
            return false;
          }
          return {
            src: dom.getAttribute('src'),
            width: dom.getAttribute('width'),
            height: dom.getAttribute('height'),
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['video', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  //@ts-ignore
  addNodeView() {
    return ReactNodeViewRenderer(VideoComponent);
  },

  addCommands() {
    return {
      setVideo:
        options =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});

export { VideoUploadButton };
