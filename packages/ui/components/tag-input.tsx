import { X } from "lucide-react";
import type { ChangeEvent, KeyboardEvent, ReactNode } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "ui/lib/utils";
import { Input } from "./input";
import { Label } from "./label";

export interface TagInputProps {
  label: string;
  tags: string[];
  onTagsChange?: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  className?: string;
}

export function TagInput({
  label,
  tags,
  onTagsChange,
  placeholder = "Escribe y presiona Enter o coma para agregar etiquetas...",
  maxTags = 10,
  className,
}: TagInputProps): ReactNode {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && input === "" && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value.includes(",")) {
      const newTag = value.replace(",", "").trim();
      setInput("");
      if (newTag) addTag(newTag);
    } else {
      setInput(value);
    }
  };

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

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="relative space-y-2">
        <Label htmlFor="tags">{label}</Label>
        <Input
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          type="text"
          value={input}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            className="inline-flex items-center bg-blue-100 slide-in-from-left-5 px-3 py-1 rounded-full text-blue-800 text-sm animate-in duration-200 fade-in"
            key={tag}
          >
            {tag}
            <button
              className="ml-2 hover:text-blue-600 focus:outline-none"
              onClick={() => {
                removeTag(index);
              }}
              type="button"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
export default TagInput;
