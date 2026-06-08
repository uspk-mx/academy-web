import { useEffect, useRef } from "react";
import { cn } from "ui/lib/utils";
import xss from "xss";
import { whiteList } from "../content";

export function LessonContent({ content, className }: { content: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isYouTube = content.includes("data-youtube-video=");

  useEffect(() => {
    if (isYouTube) {
      const youtubeElement = document?.querySelector("[data-youtube-video]");
      if (youtubeElement) {
        const youtubeSource = youtubeElement.getAttribute("src");
        if (youtubeSource) {
          const updatedSource = youtubeSource.replaceAll("controls=0", "");
          youtubeElement.setAttribute("src", updatedSource);
          youtubeElement.setAttribute(
            "allow",
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
          );
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn(className)} ref={containerRef}>
      <div
        dangerouslySetInnerHTML={{
          __html: xss(content, {
            allowList: {
              source: ["src"],
              iframe: [
                "src",
                "width",
                "height",
                "allowfullscreen",
                "autoplay",
                "data-youtube-video",
                "allow",
              ],
              ...whiteList,
            },
          }),
        }}
        className="course-content mt-6"
      />
    </div>
  );
}
