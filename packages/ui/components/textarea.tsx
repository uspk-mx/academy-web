import * as React from "react";
import { cn } from "ui/lib/utils";
import { Label } from "./label";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  helperText?: string;
  maxRows?: number
}


const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, label, isInvalid, errorMessage, helperText, ...props },
    ref
  ) => {
    return (
      <div className="space-y-2">
        {label ? <Label htmlFor={label}>{label}</Label> : null}
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-base border-2 text-foreground font-base selection:bg-main selection:text-main-foreground border-border bg-background px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "aria-invalid:border-destructive/80 aria-invalid:text-destructive aria-invalid:focus-visible:border-destructive/80 aria-invalid:focus-visible:ring-destructive/20",
            className
          )}
          ref={ref}
          {...props}
        />

        {isInvalid && errorMessage ? (
          <p
            aria-live="polite"
            className="mt-2 text-destructive text-xs"
            role="alert"
          >
            {errorMessage}
          </p>
        ) : null}
        {helperText && !isInvalid ? (
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
);
Textarea.displayName = "Textarea"

export { Textarea }

// const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
//   (
//     {
      // className,
      // label,
      // isInvalid,
      // errorMessage,
      // helperText,
      // ...props
//     },
//     ref
//   ) => {
  
//     return (
      // <div className="space-y-2">
      //   {label ? <Label htmlFor={label}>{label}</Label> : null}
//         <textarea
//           className={cn(
//             "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//             "aria-invalid:border-destructive/80 aria-invalid:text-destructive aria-invalid:focus-visible:border-destructive/80 aria-invalid:focus-visible:ring-destructive/20",
//             className
//           )}
//           ref={ref}
//           {...props}
//         />
        // {isInvalid && errorMessage ? (
        //   <p
        //     aria-live="polite"
        //     className="mt-2 text-destructive text-xs"
        //     role="alert"
        //   >
        //     {errorMessage}
        //   </p>
        // ) : null}
        // {helperText && !isInvalid ? (
        //   <p
        //     aria-live="polite"
        //     className="mt-2 text-muted-foreground text-xs"
        //     role="region"
        //   >
        //     {helperText}
        //   </p>
        // ) : null}
//       </div>
//     );
//   }
// );
// Textarea.displayName = "Textarea";

// export { Textarea };
