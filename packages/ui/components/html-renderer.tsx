import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { type JSX, useEffect, useRef, useState } from "react";
import { cn } from "ui/lib/utils";
import Markdown, { MarkdownHooks } from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkEmbedImages from "remark-embed-images";
import remarkDirective from "remark-directive";
import remarkDirectiveSugar from "remark-directive-sugar";
import rehypeRemark from "rehype-remark";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const RenderHTMLContent = ({ htmlContent }: { htmlContent: any }) => {
  // Sanitize the HTML content
  const sanitizedHTML = DOMPurify.sanitize(htmlContent);

  // Function to handle specific tags during parsing
  const replaceOptions = {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    replace: (domNode: any) => {
      // Handle <audio> tags
      if (domNode.name === "audio" && domNode.attribs) {
        return (
          <audio controls>
            <source src={domNode.attribs.src} type={domNode.attribs.type} />
            <track
              kind="captions"
              src={domNode.attribs.captions || ""}
              srcLang="en"
              label="English captions"
            />
            Your browser does not support the audio element.
          </audio>
        );
      }

      // Handle <video> tags
      if (domNode.name === "video" && domNode.attribs) {
        return (
          <video controls width="100%">
            <track
              kind="captions"
              src={domNode.attribs.captions || ""}
              srcLang="en"
              label="English captions"
            />
            <source src={domNode.attribs.src} type={domNode.attribs.type} />
            Your browser does not support the video tag.
          </video>
        );
      }

      // Handle <iframe> tags, with special handling for YouTube
      if (domNode.name === "iframe" && domNode.attribs) {
        const src = domNode.attribs.src || "";
        let embedSrc = src;
        let isYouTube = false;

        // Detect YouTube URLs
        if (src.includes("youtube.com") || src.includes("youtu.be")) {
          isYouTube = true;
          // Convert YouTube watch URL to embed URL
          if (src.includes("youtube.com/watch")) {
            const videoId = new URLSearchParams(src.split("?")[1]).get("v");
            embedSrc = videoId
              ? `https://www.youtube.com/embed/${videoId}`
              : src;
          } else if (src.includes("youtu.be")) {
            const videoId = src.split("/").pop();
            embedSrc = videoId
              ? `https://www.youtube.com/embed/${videoId}`
              : src;
          }
        }

        return (
          <div
            style={{
              position: "relative",
              paddingBottom: isYouTube ? "56.25%" : 0,
              height: isYouTube ? 0 : "auto",
            }}
          >
            <iframe
              src={embedSrc}
              title={
                domNode.attribs.title || isYouTube
                  ? "YouTube Video"
                  : "Embedded Content"
              }
              width={isYouTube ? "100%" : domNode.attribs.width || "100%"}
              height={isYouTube ? "100%" : domNode.attribs.height || "400"}
              frameBorder={domNode.attribs.frameborder || "0"}
              allowFullScreen={
                domNode.attribs.allowfullscreen === "true" || isYouTube
              }
              style={
                isYouTube
                  ? {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }
                  : {}
              }
              allow={
                isYouTube
                  ? "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  : undefined
              }
            />
          </div>
        );
      }

      // Handle <img> tags
      if (domNode.name === "img" && domNode.attribs) {
        return (
          <img
            src={domNode.attribs.src}
            alt={domNode.attribs.alt || "Image"}
            style={{ maxWidth: "100%", maxHeight: '15rem' }}
          />
        );
      }

      // Return the default node if no special handling is needed
      return domNode;
    },
  };

  // Parse and render the sanitized HTML
  return <div>{parse(sanitizedHTML, replaceOptions)}</div>;
};

export function HtmlRenderer({
  content,
  className,
}: {
  content: string;
  className?: string;
}): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const isYouTube = content.includes("data-youtube-video=");
  
  useEffect(() => {
   const youtubeElement = document.querySelector('[data-youtube-video]')
   if (youtubeElement) {
    const iframeElement = youtubeElement.querySelector('iframe')
    if (iframeElement) {
      // iframeElement.style.maxWidth = '100%'
      iframeElement.classList.add('max-w-full', 'h-80')
      const youtubeSource = iframeElement.getAttribute('src');
      if (youtubeSource) {
        const updatedSource = youtubeSource.replace('controls', '');
        iframeElement.setAttribute('src', updatedSource);
      }
    }
   }
  }, [])

  return (
    <div className={cn(className)} ref={containerRef}>
      {isYouTube ? (
        <Markdown
          rehypePlugins={[rehypeRaw]}
          // remarkPlugins={[remarkDirective, remarkDirectiveSugar]}
          remarkRehypeOptions={{ allowDangerousHtml: true }}
        >
          {content}
        </Markdown>
      ) : (
        <RenderHTMLContent htmlContent={content} />
      )}
    </div>
  );
}
