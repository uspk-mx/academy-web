import { useId, useState } from "react";
import type { ReactNode, KeyboardEvent, ChangeEvent } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "ui/lib/utils";
import { Label } from "./label";
import { Badge } from "./badge";
import type { TagInputProps } from "./tag-input";

export function TagTextarea({
  label,
  tags,
  onTagsChange,
  placeholder = "Escribe y presiona Enter o coma para agregar etiquetas...",
  maxTags = 10,
  className,
  helperText,
}: TagInputProps & { helperText?: string }): ReactNode {
  const id = useId();
  const [input, setInput] = useState("");

  const addTag = (tag: string = input.trim()): void => {
    if (tag && !tags.includes(tag)) {
      if (tags.length >= maxTags) {
        toast.error(`Maximum ${maxTags} tags allowed`);
        return;
      }
      const newTags = [...tags, tag];
      onTagsChange?.(newTags);
      setInput("");
    }
  };

  const removeTag = (index: number): void => {
    const newTags = tags.filter((_, i) => i !== index);
    onTagsChange?.(newTags);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && input === "" && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(",")) {
      const newTag = value.replace(",", "").trim();
      setInput("");
      if (newTag) addTag(newTag);
    } else {
      setInput(value);
    }
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <div className="flex flex-wrap gap-1 rounded-base bg-background shadow-black/5 shadow-sm p-1 border focus-within:border-border focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 wrap-break-word transition-shadow focus-within:outline-none">
        {tags.map((tag, index) => (
          <Badge className="px-2 py-1 rounded-md" key={tag} variant="neutral">
            {tag}
            <button
              aria-label="Delete"
              className="inline-flex justify-center items-center opacity-60 hover:opacity-100 -my-[5px] p-0 rounded-[inherit] focus-visible:outline-ring/70 transition-opacity -me-2 -ms-0.5 focus-visible:outline focus-visible:outline-2 shrink-0 size-7"
              onClick={() => {
                removeTag(index);
              }}
              type="button"
            >
              <X aria-hidden="true" size={14} strokeWidth={2} />
            </button>
          </Badge>
        ))}
        <input
          className="bg-white shadow-none px-2 w-full min-w-[80px] h-7 focus-visible:outline-none"
          id={id}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          type="text"
          value={input}
        />
      </div>
      {helperText ? (
        <p
          aria-live="polite"
          className="mt-2 text-muted-foreground text-xs"
          role="region"
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
