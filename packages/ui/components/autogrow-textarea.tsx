import type { ChangeEvent, ReactNode } from "react";
import { useId, useRef } from "react";
import { Label } from "ui/components/label";
import type { TextareaProps } from "ui/components/textarea";
import { Textarea } from "ui/components/textarea";
import { cn } from "ui/lib/utils";

export function AutoGrowTextarea({
  label,
  className,
  rows = 1,
  maxRows: maxRowsProps,
  onChange,
  ...rest
}: TextareaProps): ReactNode {
  const id = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const defaultRows = rows;
  const maxRows = maxRowsProps;

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const textarea = e.target;
    textarea.style.height = "auto";

    const style = window.getComputedStyle(textarea);
    const borderHeight =
      parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth);
    const paddingHeight =
      parseInt(style.paddingTop) + parseInt(style.paddingBottom);

    const lineHeight = parseInt(style.lineHeight);
    const maxHeight = maxRows
      ? lineHeight * maxRows + borderHeight + paddingHeight
      : Infinity;

    const newHeight = Math.min(textarea.scrollHeight + borderHeight, maxHeight);

    textarea.style.height = `${newHeight}px`;
  };

  return (
    <div className="space-y-2">
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      <Textarea
        className={cn("min-h-[none] resize-none", className)}
        id={id}
        onChange={(e) => { 
            handleInput(e)
            onChange?.(e)
        }}
        placeholder="Leave a comment"
        ref={textareaRef}
        rows={defaultRows}
        {...rest}
      />
    </div>
  );
}
