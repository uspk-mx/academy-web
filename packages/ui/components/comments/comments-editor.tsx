import { useCallback, useEffect, useRef, useState } from "react";

import leoProfanity from 'leo-profanity';
import { SPANISH_WORDS } from "./utils";
import { BanIcon, XIcon } from "lucide-react";

leoProfanity.loadDictionary('en');
leoProfanity.add(SPANISH_WORDS);

interface RichTextEditorProps {
  placeholder?: string;
  initialContent?: string;
  onSubmit: (html: string) => void;
  onCancel?: () => void;
  submitLabel?: string;
  autoFocus?: boolean;
}

function ProfanityError({ words, onDismiss }: { words: string[]; onDismiss: () => void }) {
  return (
    <div
      className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-lg border text-sm animate-shake"
      style={{
        background: "hsl(0 84% 97%)",
        borderColor: "hsl(0 84% 85%)",
        color: "hsl(0 60% 40%)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <span className="w-4 shrink-0 mt-0.5">
        <BanIcon className="w-full" />
      </span>
      <div className="flex-1">
        <p
          className="font-semibold text-xs mb-0.5"
          style={{ color: "hsl(0 60% 35%)" }}
        >
          Your message contains inappropriate language
        </p>
        <p className="text-xs" style={{ color: "hsl(0 50% 50%)" }}>
          Please revise before posting. Flagged:{" "}
          {words.map((w, i) => (
            <span key={w}>
              <span className="font-mono font-semibold">
                {"*".repeat(w.length)}
              </span>
              {i < words.length - 1 && ", "}
            </span>
          ))}
        </p>
      </div>
      <button
        onClick={onDismiss}
        className="shrink-0 text-xs opacity-50 hover:opacity-100 transition-opacity mt-0.5"
        style={{ color: "hsl(0 60% 40%)" }}
      >
        <XIcon className="w-4" />
      </button>
    </div>
  );
}

export function CommentsEditor({
  placeholder = "Write something…",
  initialContent = "",
  onSubmit,
  onCancel,
  submitLabel = "Post",
  autoFocus = false,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("https://");
  const savedRangeRef = useRef<Range | null>(null);
  const [isEmpty, setIsEmpty] = useState(!initialContent);
  const [profanityError, setProfanityError] = useState<string[] | null>(null);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (editorRef.current && initialContent) {
      editorRef.current.innerHTML = initialContent;
      setIsEmpty(false);
    }
    if (autoFocus) editorRef.current?.focus();
  }, []);

  // Clear profanity error as soon as user starts editing
  const handleInput = useCallback(() => {
    setIsEmpty(!editorRef.current?.textContent?.trim());
    if (profanityError) setProfanityError(null);
  }, [profanityError]);

  const updateFormats = useCallback(() => {
    const formats = new Set<string>();
    if (document.queryCommandState("bold")) formats.add("bold");
    if (document.queryCommandState("italic")) formats.add("italic");
    setActiveFormats(formats);
    setIsEmpty(!editorRef.current?.textContent?.trim());
  }, []);

    const saveSelection = () => {
    const sel = window.getSelection();
    if (sel?.rangeCount) savedRangeRef.current = sel.getRangeAt(0).cloneRange();
  };
  const restoreSelection = () => {
    const sel = window.getSelection();
    if (sel && savedRangeRef.current) {
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    }
  };

  const execFormat = (cmd: string) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false);
    updateFormats();
  };

  const handleSubmit = () => {
    const html = editorRef.current?.innerHTML?.trim() || "";
    if (!html || !editorRef.current?.textContent?.trim()) return;

    const text = html.replace(/<[^>]*>/g, " ");
const hasProfanity = leoProfanity.check(text);
const words: string[] = [];
    // ── Profanity check ──────────────────────────────────────────────────────
    if (hasProfanity) {
      setProfanityError(words);
      // Shake animation
      setShake(true);
      setTimeout(() => setShake(false), 500);
      editorRef.current?.focus();
      return;
    }
    // ────────────────────────────────────────────────────────────────────────

    onSubmit(html);
    if (editorRef.current) { editorRef.current.innerHTML = ""; setIsEmpty(true); }
    setProfanityError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.metaKey || e.ctrlKey) {
      if (e.key === "b") { e.preventDefault(); execFormat("bold"); }
      if (e.key === "i") { e.preventDefault(); execFormat("italic"); }
      if (e.key === "k") { e.preventDefault(); saveSelection(); setShowLinkDialog(true); }
    }
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
  };


  return (
    <div className="flex flex-col gap-2">
      {/* Error banner */}
      {profanityError && (
        <ProfanityError
          words={profanityError}
          onDismiss={() => setProfanityError(null)}
        />
      )}

      <div
        className="rounded-xl border overflow-visible transition-all"
        style={{
          borderColor: profanityError ? "hsl(0 84% 75%)" : "var(--input)",
          background: "var(--bw)",
          boxShadow: profanityError ? "0 0 0 3px hsl(0 84% 92%)" : "none",
          animation: shake ? "shake 0.4s ease" : "none",
        }}
      >
        {/* Toolbar */}
        <div
          className="flex items-center gap-0.5 px-2.5 py-1.5 border-b"
          style={{
            borderColor: profanityError ? "hsl(0 84% 85%)" : "var(--input)",
          }}
        >
          {[
            {
              cmd: "bold",
              label: <span className="font-bold text-sm">B</span>,
              title: "Bold ⌘B",
            },
            {
              cmd: "italic",
              label: <span className="italic font-serif text-sm">I</span>,
              title: "Italic ⌘I",
            },
          ].map(({ cmd, label, title }) => (
            <button
              key={cmd}
              onMouseDown={(e) => {
                e.preventDefault();
                execFormat(cmd);
              }}
              title={title}
              className="w-7 h-7 flex items-center justify-center rounded-md transition-all"
              style={{
                background: activeFormats.has(cmd)
                  ? "var(--muted)"
                  : "transparent",
                color: activeFormats.has(cmd)
                  ? "var(--text)"
                  : "var(--muted-foreground)",
              }}
            >
              {label}
            </button>
          ))}
          <div className="relative">
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                saveSelection();
                setShowLinkDialog(true);
              }}
              title="Link ⌘K"
              className="w-7 h-7 flex items-center justify-center rounded-md transition-all"
              style={{
                color: showLinkDialog
                  ? "var(--text)"
                  : "var(--muted-foreground)",
                background: showLinkDialog ? "var(--muted)" : "transparent",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </button>
            {showLinkDialog && (
              <div
                className="absolute z-50 top-full left-0 mt-1.5 rounded-lg border p-3 w-72 shadow-xl"
                style={{ background: "var(--bw)", borderColor: "var(--input)" }}
              >
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Insert link
                </p>
                <input
                  autoFocus
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      restoreSelection();
                      document.execCommand("createLink", false, linkUrl);
                      editorRef.current
                        ?.querySelectorAll("a")
                        .forEach((a) => a.setAttribute("target", "_blank"));
                      setShowLinkDialog(false);
                      setLinkUrl("https://");
                    }
                    if (e.key === "Escape") {
                      setShowLinkDialog(false);
                      restoreSelection();
                    }
                  }}
                  className="w-full text-sm px-3 py-1.5 rounded-md outline-none border mb-2"
                  style={{
                    borderColor: "var(--input)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontFamily: "var(--font-sans)",
                  }}
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => {
                      setShowLinkDialog(false);
                      restoreSelection();
                    }}
                    className="text-xs px-3 py-1 rounded-md"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      restoreSelection();
                      document.execCommand("createLink", false, linkUrl);
                      editorRef.current
                        ?.querySelectorAll("a")
                        .forEach((a) => a.setAttribute("target", "_blank"));
                      setShowLinkDialog(false);
                      setLinkUrl("https://");
                    }}
                    className="text-xs px-3 py-1 rounded-md font-semibold"
                    style={{
                      background: "var(--primary)",
                      color: "var(--primary-foreground)",
                    }}
                  >
                    Insert
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Editable area */}
        <div className="relative px-3.5 py-3 min-h-20">
          {isEmpty && (
            <span
              className="absolute top-3 left-3.5 pointer-events-none text-sm select-none"
              style={{
                color: "var(--muted-foreground)",
                fontFamily: "var(--font-sans)",
              }}
            >
              {placeholder}
            </span>
          )}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onKeyDown={handleKeyDown}
            onKeyUp={updateFormats}
            onMouseUp={updateFormats}
            onInput={handleInput}
            className="outline-none text-sm leading-relaxed"
            style={{
              color: "var(--text)",
              fontFamily: "var(--font-sans)",
              minHeight: "4rem",
            }}
          />
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-3.5 py-2.5 border-t"
          style={{
            borderColor: profanityError ? "hsl(0 84% 85%)" : "var(--input)",
          }}
        >
          <span
            className="text-xs"
            style={{
              color: profanityError
                ? "hsl(0 60% 55%)"
                : "var(--muted-foreground)",
            }}
          >
            {profanityError
              ? "✏️ Edit your message to continue"
              : "⌘↵ to submit"}
          </span>
          <div className="flex gap-2">
            {onCancel && (
              <button
                onClick={onCancel}
                className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all hover:opacity-80"
                style={{
                  color: "var(--muted-foreground)",
                  background: "var(--muted)",
                }}
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSubmit}
              disabled={isEmpty}
              className="text-xs px-4 py-1.5 rounded-lg font-semibold transition-all"
              style={{
                background: isEmpty
                  ? "var(--muted)"
                  : profanityError
                    ? "hsl(0 84% 60%)"
                    : "var(--primary)",
                color: isEmpty
                  ? "var(--muted-foreground)"
                  : "var(--primary-foreground)",
                cursor: isEmpty ? "not-allowed" : "pointer",
              }}
            >
              {submitLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
