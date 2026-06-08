import { useEffect, useMemo, useState } from "react";

export type SubtitleCue = {
  start: number;
  end: number;
  text: string;
};

type UseSubtitlesOptions = {
  src?: string;
  currentTime: number;
  enabled?: boolean;
};

function parseTimestamp(timestamp: string): number {
  const normalized = timestamp.trim().replace(",", ".");
  const parts = normalized.split(":");

  if (parts.length !== 3) {
    throw new Error(`Invalid VTT timestamp: ${timestamp}`);
  }

  const [hours, minutes, seconds] = parts;

  return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
}

const EMPTY_CUES: SubtitleCue[] = [];

function parseVtt(vttText: string): SubtitleCue[] {
  const normalized = vttText.replace(/\r\n/g, "\n").trim();

  const blocks = normalized.split("\n\n");
  const cues: SubtitleCue[] = [];

  for (const block of blocks) {
    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (!lines.length) continue;
    if (lines[0] === "WEBVTT") continue;

    let timeLineIndex = 0;

    if (!lines[0].includes("-->")) {
      timeLineIndex = 1;
    }

    const timeLine = lines[timeLineIndex];
    if (!timeLine || !timeLine.includes("-->")) continue;

    const [startRaw, endRawWithSettings] = timeLine.split("-->");
    const endRaw = endRawWithSettings.trim().split(" ")[0];

    const textLines = lines.slice(timeLineIndex + 1);
    const text = textLines.join("\n");

    if (!text) continue;

    cues.push({
      start: parseTimestamp(startRaw),
      end: parseTimestamp(endRaw),
      text,
    });
  }

  return cues;
}

export function useSubtitles({
  src,
  currentTime,
  enabled = true,
}: UseSubtitlesOptions) {
  const [cues, setCues] = useState<SubtitleCue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const active = Boolean(src && enabled);

  useEffect(() => {
    if (!active) return;

    let isCancelled = false;

    async function loadSubtitles() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(src as string);

        if (!response.ok) {
          throw new Error(`Failed to load subtitles: ${response.status}`);
        }

        const text = await response.text();
        const parsed = parseVtt(text);

        if (!isCancelled) {
          setCues(parsed);
        }
      } catch (err) {
        if (!isCancelled) {
          setCues([]);
          setError(
            err instanceof Error ? err.message : "Failed to load subtitles",
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadSubtitles();

    return () => {
      isCancelled = true;
    };
  }, [src, active]);

  const activeCue = useMemo(() => {
    if (!active) return null;

    return (
      cues.find((cue) => currentTime >= cue.start && currentTime <= cue.end) ??
      null
    );
  }, [cues, currentTime, active]);

  return {
    cues: active ? cues : EMPTY_CUES,
    activeCue,
    subtitleText: activeCue?.text ?? "",
    isLoading: active ? isLoading : false,
    error: active ? error : null,
  };
}
