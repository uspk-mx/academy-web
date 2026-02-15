import {
  ArrowLeftIcon,
  Cog,
  Maximize2,
  Minimize2,
  Pause,
  PictureInPicture,
  Play,
  SkipBack,
  SkipForward,
  Subtitles,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
  XIcon,
} from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { useNavigate, useRevalidator } from "react-router";
import { Button } from "ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "ui/components/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "ui/components/popover";
import { Slider } from "ui/components/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "ui/components/tooltip";
import { useProgress } from "ui/context/progress-context";
import { cn } from "ui/lib/utils";
import { BufferingSpinner } from "./buffering-spinner";
import { LoadingVideoSkeleton } from "./loading-video-skeleton";

const SKIP_TIME = 10; // seconds to skip forward/backward
const CONTROLS_HIDE_DELAY = 2000; // 2 seconds

interface VideoPlayerProps {
  videoUrl: string;
  videoFormat: string;
  containerClassName?: string;
  isLoading?: boolean;
  duration?: number;
  bufferLoader?: ReactNode;
  lessonTitle?: string
  lessonId?: string
}

export function VideoPlayer({
  videoUrl,
  videoFormat,
  containerClassName,
  isLoading: externalIsLoading = false,
  duration: externalDuration,
  bufferLoader,
  lessonTitle,
  lessonId
}: VideoPlayerProps) {
  // const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(
  typeof externalDuration === "number" && externalDuration > 0 ? externalDuration : 0
);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState("auto");
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>(undefined);
  const bufferingTimeoutRef = useRef<NodeJS.Timeout>(undefined);
  const navigate = useNavigate()
  const revalidator = useRevalidator();
  const { markLessonComplete } = useProgress()

  useEffect(() => {
    setIsLoading(externalIsLoading || !videoUrl);
  }, [externalIsLoading, videoUrl]);

  useEffect(() => {
  if (typeof externalDuration === "number" && externalDuration > 0) {
    setDuration(externalDuration);
  }
}, [externalDuration]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    const handleLoadedData = () => {
      if (!externalDuration) {
        setDuration(video.duration);
      }
      setIsLoading(false);
    };

    const handleDurationChange = () => {
      if (!externalDuration) {
        setDuration(video.duration);
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("durationchange", handleDurationChange);

    if (externalDuration) {
      setDuration(externalDuration);
    }

    // Attempt to load the video
    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("durationchange", handleDurationChange);
    };
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "arrowleft":
          skip(-SKIP_TIME);
          break;
        case "arrowright":
          skip(SKIP_TIME);
          break;
        case "m":
          toggleMute();
          break;
        case "f":
          toggleFullscreen();
          break;
        case "i":
          togglePictureInPicture();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Handle video metadata loaded and buffering
  useEffect(() => {
    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
        videoRef.current.volume = volume;
      }
    };

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    const handleWaiting = () => {
      bufferingTimeoutRef.current = setTimeout(() => {
        setIsBuffering(true);
      }, 500);
    };

    const handleCanPlay = () => {
      if (bufferingTimeoutRef.current) {
        clearTimeout(bufferingTimeoutRef.current);
      }
      setIsBuffering(false);
      setIsLoading(false);
    };

    const handleProgress = () => {
      if (videoRef.current) {
        const buffered = videoRef.current.buffered;
        if (buffered.length > 0) {
          const lastBufferedTime = buffered.end(buffered.length - 1);
          if (lastBufferedTime > videoRef.current.currentTime) {
            setIsBuffering(false);
          }
        }
      }
    };

    const handleError = () => {
      setError("An error occurred while loading the video.");
      setIsLoading(false);
    };

    const handleDurationChange = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      videoRef.current.addEventListener("loadeddata", handleLoadedData);
      videoRef.current.addEventListener("waiting", handleWaiting);
      videoRef.current.addEventListener("canplay", handleCanPlay);
      videoRef.current.addEventListener("progress", handleProgress);
      videoRef.current.addEventListener("error", handleError);
      videoRef.current.addEventListener("durationchange", handleDurationChange);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        videoRef.current.removeEventListener("loadeddata", handleLoadedData);
        videoRef.current.removeEventListener("waiting", handleWaiting);
        videoRef.current.removeEventListener("canplay", handleCanPlay);
        videoRef.current.removeEventListener("progress", handleProgress);
        videoRef.current.removeEventListener("error", handleError);
        videoRef.current.removeEventListener(
          "durationchange",
          handleDurationChange
        );
      }
      if (bufferingTimeoutRef.current) {
        clearTimeout(bufferingTimeoutRef.current);
      }
    };
  }, [volume]);

  // Auto-hide controls
  useEffect(() => {
    const hideControls = () => {
      if (isPlaying) {
        setShowControls(false);
      }
    };

    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(
        hideControls,
        CONTROLS_HIDE_DELAY
      );
    } else {
      setShowControls(true);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleProgress = (value: number) => {
    if (videoRef.current && duration > 0) {
      const time = (value * duration) / 100;
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0];
      videoRef.current.volume = newVolume / 100;
      setVolume(newVolume / 100);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const skip = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        0,
        Math.min(videoRef.current.currentTime + time, duration)
      );
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const togglePictureInPicture = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (videoRef.current) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (error) {
      console.error("Picture-in-Picture failed:", error);
    }
  };

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX />;
    if (volume < 0.3) return <Volume />;
    if (volume < 0.7) return <Volume1 />;
    return <Volume2 />;
  };

  const handleVideoEnd = () => {
    if (lessonId) {
      markLessonComplete({ lessonId });
      revalidator.revalidate();
      console.log(`Lesson ${lessonId} marked as complete!`); // Optional: for debugging
    } else {
      console.warn("Video ended but no lessonId was found."); // Optional: for debugging
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-4xl mx-auto bg-black",
        containerClassName,
        {
          "h-screen": isFullscreen,
        }
      )}
      onMouseMove={() => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
        if (isPlaying) {
          controlsTimeoutRef.current = setTimeout(
            () => setShowControls(false),
            CONTROLS_HIDE_DELAY
          );
        }
      }}
      onMouseLeave={() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }}
    >
      {/* Back button */}
      {/* {showControls && (
        <Button
          variant="ghost"
          className="absolute top-4 left-4 text-white z-10 hover:bg-white/10"
          onClick={() => navigate("/courses")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Regresar al panel
        </Button>
      )} */}

      {/* Video */}
      <div
        className={cn("relative aspect-video h-full", {
          "aspect-auto": isFullscreen,
        })}
      >
        
        {showControls && (
          <div className="md:hidden absolute left-0 flex items-center justify-center w-full gap-8">
            <div className="flex items-start bg-black/30 justify-between w-full">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 z-10 w-12 h-12"
                  onClick={() => navigate("/courses")}
                >
                  <ArrowLeftIcon className="h-8 w-8" />
                </Button>
                <p className="text-sm text-white line-clamp-1">{lessonTitle}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 z-10 w-12 h-12"
                onClick={() => navigate("/courses")}
              >
                <XIcon className="h-8 w-8" />
              </Button>
            </div>
          </div>
        )}
        {isLoading ? (
          <LoadingVideoSkeleton />
        ) : (
          <>
            {error && (
              <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 text-center">
                {error}
              </div>
            )}
            {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <video
              ref={videoRef}
              className="w-full h-auto"
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={handleVideoEnd}
            >
              {videoUrl && <source src={videoUrl} type={videoFormat} />}
              <track
                kind="subtitles"
                src="/captions.vtt"
                srcLang="es"
                label="Spanish"
                default
              />
            </video>
            {isBuffering || (bufferLoader && <BufferingSpinner />)}
          </>
        )}

        {showControls && !isLoading && (
          <div className="md:hidden absolute inset-0 flex items-center justify-center gap-8">
            <Button
              variant="ghost"
              size="icon"
              className="text-white bg-black/30 hover:bg-black/20 w-12 h-12"
              onClick={() => skip(-SKIP_TIME)}
            >
              <div className="relative">
                <SkipBack className="h-8 w-8" />
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium">
                  10
                </span>
              </div>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white bg-black/30 hover:bg-black/20 w-16 h-16"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-12 w-12" />
              ) : (
                <Play className="h-12 w-12" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white bg-black/30 hover:bg-black/20 w-12 h-12"
              onClick={() => skip(SKIP_TIME)}
            >
              <div className="relative">
                <SkipForward className="h-8 w-8" />
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium">
                  10
                </span>
              </div>
            </Button>
          </div>
        )}

        {/* Video controls */}
        {showControls && !isLoading && (
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
            {/* Progress bar */}
            <Slider
              value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
              onValueChange={(value) => handleProgress(value[0])}
              max={100}
              step={0.1}
              className="w-full mb-4 cursor-pointer"
              trackClassName="bg-white"
            />

            <div className="flex items-center gap-4">
              {/* Playback controls */}
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => skip(-SKIP_TIME)}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => skip(SKIP_TIME)}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              {/* Time display */}
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

              {/* Volume control */}
              <div className="hidden md:flex items-center gap-2">
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/10"
                      onClick={toggleMute}
                      type="button"
                    >
                      {getVolumeIcon()}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-inherit">
                    <Slider
                      value={[isMuted ? 0 : volume * 100]}
                      onValueChange={handleVolumeChange}
                      max={100}
                      className="w-24"
                    />
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="flex md:hidden items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/10"
                      onClick={toggleMute}
                      type="button"
                    >
                      {getVolumeIcon()}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-fit">
                    <Slider
                      value={[isMuted ? 0 : volume * 100]}
                      onValueChange={handleVolumeChange}
                      max={100}
                      className="w-24"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Right side controls */}
              <div className="flex items-center gap-2 ml-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={togglePictureInPicture}
                >
                  <PictureInPicture className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <Subtitles className="h-4 w-4" />
                </Button>

                {/* Settings menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/10"
                    >
                      <Cog className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Quality</DropdownMenuLabel>
                    {["auto", "1080p", "720p", "480p", "360p"].map((q) => (
                      <DropdownMenuItem
                        key={q}
                        onClick={() => setQuality(q)}
                        className={quality === q ? "bg-accent" : ""}
                      >
                        {q}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Playback Speed</DropdownMenuLabel>
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                      <DropdownMenuItem
                        key={speed}
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.playbackRate = speed;
                          }
                        }}
                      >
                        {speed}x
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
