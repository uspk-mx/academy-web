;

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";
import { cn } from "ui/lib/utils"

// const Select = SelectPrimitive.Root;

// const SelectGroup = SelectPrimitive.Group;

// const SelectValue = SelectPrimitive.Value;

// type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
//   size?: 'base' | 'lg' | 'xl'
// }

// const SelectTrigger = React.forwardRef<
//   React.ComponentRef<typeof SelectPrimitive.Trigger>,
//   SelectTriggerProps
// >(({ className, children, size, ...props }, ref) => (
//   <SelectPrimitive.Trigger
//     className={cn(
//       "flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 py-2 text-start text-sm text-foreground shadow-xs shadow-blue-500/5 focus:border-blue-500 focus:outline-none focus:ring-[3px] focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 data-placeholder:text-muted-foreground/70 [&>span]:min-w-0",
//       {
//         'h-9 py-2': size === 'base',
//         "h-11 py-3": size === "lg",
//         "h-14 py-3": size === "xl",
//       },
//       className,
//     )}
//     ref={ref}
//     {...props}
//   >
//     {children}
//     <SelectPrimitive.Icon asChild>
//       <ChevronDown className="text-muted-foreground/80 shrink-0" size={16} strokeWidth={2} />
//     </SelectPrimitive.Icon>
//   </SelectPrimitive.Trigger>
// ));
// SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

// const SelectScrollUpButton = React.forwardRef<
//   React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
//   React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
// >(({ className, ...props }, ref) => (
//   <SelectPrimitive.ScrollUpButton
//     className={cn("flex cursor-default items-center justify-center py-1", className)}
//     ref={ref}
//     {...props}
//   >
//     <ChevronUp size={16} strokeWidth={2} />
//   </SelectPrimitive.ScrollUpButton>
// ));
// SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

// const SelectScrollDownButton = React.forwardRef<
//   React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>,
//   React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
// >(({ className, ...props }, ref) => (
//   <SelectPrimitive.ScrollDownButton
//     className={cn("flex cursor-default items-center justify-center py-1", className)}
//     ref={ref}
//     {...props}
//   >
//     <ChevronDown size={16} strokeWidth={2} />
//   </SelectPrimitive.ScrollDownButton>
// ));
// SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

// const SelectContent = React.forwardRef<
//   React.ComponentRef<typeof SelectPrimitive.Content>,
//   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
// >(({ className, children, position = "popper", ...props }, ref) => (
//   <SelectPrimitive.Portal>
//     <SelectPrimitive.Content
//       className={cn(
//         "relative z-50 max-h-[min(24rem,var(--radix-select-content-available-height))] min-w-32 overflow-hidden rounded-lg border border-input bg-popover text-popover-foreground shadow-lg shadow-black/5 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:[[role=group]]:py-1",
//         position === "popper" &&
//           "w-full min-w-(--radix-select-trigger-width) data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
//         className,
//       )}
//       position={position}
//       ref={ref}
//       {...props}
//     >
//       <SelectScrollUpButton />
//       <SelectPrimitive.Viewport
//         className={cn("p-1", position === "popper" && "h-(--radix-select-trigger-height)")}
//       >
//         {children}
//       </SelectPrimitive.Viewport>
//       <SelectScrollDownButton />
//     </SelectPrimitive.Content>
//   </SelectPrimitive.Portal>
// ));
// SelectContent.displayName = SelectPrimitive.Content.displayName;

// const SelectLabel = React.forwardRef<
//   React.ComponentRef<typeof SelectPrimitive.Label>,
//   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
// >(({ className, ...props }, ref) => (
//   <SelectPrimitive.Label
//     className={cn("py-1.5 pe-2 ps-8 text-xs font-medium text-muted-foreground", className)}
//     ref={ref}
//     {...props}
//   />
// ));
// SelectLabel.displayName = SelectPrimitive.Label.displayName;

// const SelectItem = React.forwardRef<
//   React.ComponentRef<typeof SelectPrimitive.Item>,
//   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
// >(({ className, children, ...props }, ref) => (
//   <SelectPrimitive.Item
//     className={cn(
//       "relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pe-2 ps-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
//       className,
//     )}
//     ref={ref}
//     {...props}
//   >
//     <span className="absolute flex justify-center items-center size-3.5 start-2">
//       <SelectPrimitive.ItemIndicator>
//         <Check size={16} strokeWidth={2} />
//       </SelectPrimitive.ItemIndicator>
//     </span>

//     <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
//   </SelectPrimitive.Item>
// ));
// SelectItem.displayName = SelectPrimitive.Item.displayName;

// const SelectSeparator = React.forwardRef<
//   React.ComponentRef<typeof SelectPrimitive.Separator>,
//   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
// >(({ className, ...props }, ref) => (
//   <SelectPrimitive.Separator
//     className={cn("-mx-1 my-1 h-px bg-border", className)}
//     ref={ref}
//     {...props}
//   />
// ));
// SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// export {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectScrollDownButton,
//   SelectScrollUpButton,
//   SelectSeparator,
//   SelectTrigger,
//   SelectValue,
// };


const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

interface SelectTriggerProps extends   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  variant?: 'default' | 'neutral'
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, variant, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center text-main-foreground bg-main justify-between rounded-base border-2 border-border px-3 py-2 text-sm font-base ring-offset-white placeholder:text-main-foreground placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
      variant === 'default' && 'bg-main',
      variant === 'neutral' && 'bg-white'
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default text-main-foreground items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default text-main-foreground items-center justify-center py-1 font-base",
      className,
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

  interface SelectContentProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
    variant?: 'default' | 'neutral'
  }

const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, variant, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-32 overflow-hidden rounded-base border-2 border-border bg-main font-base text-main-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
        variant === 'neutral' && 'bg-white',
        variant === 'default' && 'bg-main'
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "border-2 border-transparent py-1.5 pl-8 pr-2 text-sm font-base text-main-foreground/80",
      className,
    )}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full text-main-foreground cursor-default select-none items-center rounded-base border-2 border-transparent py-1.5 pl-8 pr-2 text-sm font-base outline-none focus:border-border data-disabled:pointer-events-none data-disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}