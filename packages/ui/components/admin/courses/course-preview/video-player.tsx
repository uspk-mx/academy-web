import { useRef, useEffect } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  onComplete: () => void;
}

export function VideoPlayer({ videoUrl, onComplete }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleEnded = () => {
      onComplete();
    };

    videoElement.addEventListener("ended", handleEnded);

    return () => {
      videoElement.removeEventListener("ended", handleEnded);
    };
  }, [onComplete]);

  return (
    <div className="aspect-w-16 aspect-h-9 relative">
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
}
