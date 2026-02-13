import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "ui/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-base border-2 border-border px-2.5 font-base py-[0.125rem] text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-main text-main-foreground",
        neutral: "bg-secondary text-foreground",
        dark: "bg-black text-white",
      },
      shape: {
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant,  shape,...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, shape}), className)} {...props} />
  )
}

export { Badge, badgeVariants }

// const badgeVariants = cva(
//   "inline-flex items-center justify-center rounded-full border px-1.5 text-xs font-medium leading-normal transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70",
//   {
//     variants: {
//       variant: {
//         default: "border-transparent bg-primary text-primary-foreground",
//         secondary: "border-transparent bg-secondary text-secondary-foreground",
//         destructive:
//           "border-transparent bg-destructive text-destructive-foreground",
//         outline: "text-foreground",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   }
// );

// export interface BadgeProps
//   extends React.HTMLAttributes<HTMLDivElement>,
//     VariantProps<typeof badgeVariants> {}

// function Badge({ className, variant, ...props }: BadgeProps): ReactNode {
//   return (
//     <div className={cn(badgeVariants({ variant }), className)} {...props} />
//   );
// }

// export { Badge, badgeVariants };
