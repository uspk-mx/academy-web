;

import { ArrowRight, CircleX, LoaderCircle, Search } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "ui/lib/utils";
import { Input, type InputProps } from "./input";
import { Label } from "./label";

interface SearchInputProps extends InputProps {
  label?: string;
  isLoading?: boolean;
  searchTerm?: string;
  onSearchTerm?: (value: string) => void;
}

export function SearchInput({
  label,
  isLoading,
  searchTerm,
  onSearchTerm,
  className,
  ...rest
}: SearchInputProps): ReactNode {
  const id = useId();
  //   const [loading, setLoading] = useState(isLoading);
  const inputRef = useRef<HTMLInputElement>(null);

  //   useEffect(() => {
  //     if (searchTerm) {
  //       setLoading(true);
  //       const timer = setTimeout(() => {
  //         setLoading(false);
  //       }, 500);
  //       return () => {
  //         clearTimeout(timer);
  //       };
  //     }
  //     setLoading(false);
  //   }, [searchTerm]);

  //   const handleClearInput = (): void => {
  //     onSearchTerm("");
  //     if (inputRef.current) {
  //       inputRef.current.focus();
  //     }
  //   };

  return (
    <div className="space-y-2">
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      <div className="relative">
        <Input
          className={cn("peer pe-9 ps-9", className)}
          id={id}
          //   onChange={(e) => {
          //     onSearchTerm(e.target.value);
          //   }}
          type="text"
          //   value={searchTerm}
          {...rest}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          {isLoading ? (
            <LoaderCircle
              aria-label="Loading..."
              className="animate-spin"
              role="status"
              size={16}
              strokeWidth={2}
            />
          ) : (
            <Search aria-hidden="true" size={16} strokeWidth={2} />
          )}
        </div>
        {/* {searchTerm ? (
          <button
            aria-label="Clear input"
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleClearInput}
            type="button"
          >
            <CircleX aria-hidden="true" size={16} strokeWidth={2} />
          </button>
        ) : null} */}

        <button
          aria-label="Submit search"
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
        >
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
