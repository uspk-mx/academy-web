import { useState } from "react";
import { CURRENT_USER, EMOJI_OPTIONS } from "./constants";
import type { Reaction } from "./types";

interface ReactionBarProps {
  reactions: Reaction[];
  onReact: (emoji: string) => void;
}

export function ReactionBar({ reactions, onReact }: ReactionBarProps) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {reactions.filter(r => r.count > 0).map(r => {
        const reacted = r.reactedBy.includes(CURRENT_USER.id);
        return (
          <button key={r.emoji} onClick={() => onReact(r.emoji)}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-all hover:scale-105 active:scale-95"
            style={{
              background: reacted ? "var(--main)" : "var(--muted)",
              color: reacted ? "var(--mtext)" : "var(--muted-foreground)",
              border: reacted ? "1.5px solid var(--blank)" : "1.5px solid transparent",
            }}>
            <span>{r.emoji}</span>
            <span>{r.count}</span>
          </button>
        );
      })}

      <div className="relative">
        <button onClick={() => setShowPicker(p => !p)}
          className="w-6 h-6 flex items-center justify-center rounded-full text-xs transition-all hover:scale-110"
          style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
          </svg>
        </button>
        {showPicker && (
          <div className="absolute z-50 bottom-full mb-2 left-0 flex gap-1 p-2 rounded-xl border shadow-xl"
            style={{ background: "var(--bw)", borderColor: "var(--input)" }}>
            {EMOJI_OPTIONS.map(emoji => (
              <button key={emoji} onClick={() => { onReact(emoji); setShowPicker(false); }}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-base transition-all hover:scale-125 hover:bg-gray-100">
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}