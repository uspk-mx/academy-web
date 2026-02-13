import { forwardRef, type ComponentProps } from "react";
import { cn } from "ui/lib/utils";

// export type InputProps = Omit<ComponentProps<"input">, "size"> & {
//   size?: "base" | "lg" | "xl";
// };

// const Input = forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, size, ...props }, ref) => {
//     return (
//       <input
//         className={cn(
//           "flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-blue-500/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50",
//           type === "search" &&
//             "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
//           type === "file" &&
//             "p-0 pr-3 italic text-muted-foreground/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground",
//           "aria-invalid:border-destructive/80 aria-invalid:text-destructive aria-invalid:focus-visible:border-destructive/80 aria-invalid:focus-visible:ring-destructive/20",
//           {
//             "h-9 py-2": size === "base",
//             "h-11 py-3": size === "lg",
//             "h-14 py-3": size === "xl",
//           },
//           className
//         )}
//         ref={ref}
//         type={type}
//         {...props}
//       />
//     );
//   }
// );
// Input.displayName = "Input";

// export { Input };

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-base border-2 text-foreground font-base selection:bg-main selection:text-mtext border-border bg-background px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
          "aria-invalid:border-destructive/80 aria-invalid:focus-visible:border-destructive/80 aria-invalid:focus-visible:ring-destructive/50",
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
