// Tremor Drawer [v0.0.2]

import * as React from "react";
import * as DrawerPrimitives from "@radix-ui/react-dialog";
import { X as CloseIcon } from "lucide-react";
import { cn, focusRing } from "ui/lib/utils";
import { Button } from "./button";

function Drawer(props: React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Root>): React.ReactNode {
  return <DrawerPrimitives.Root {...props} />;
}
Drawer.displayName = "Drawer";

const DrawerTrigger = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Trigger>
>(({ className, ...props }, ref) => {
  return (
    <DrawerPrimitives.Trigger className={cn(className)} ref={ref} {...props} />
  );
});
DrawerTrigger.displayName = "Drawer.Trigger";

const DrawerClose = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Close>
>(({ className, ...props }, ref) => {
  return (
    <DrawerPrimitives.Close className={cn(className)} ref={ref} {...props} />
  );
});
DrawerClose.displayName = "Drawer.Close";

const DrawerPortal = DrawerPrimitives.Portal;

DrawerPortal.displayName = "DrawerPortal";

const DrawerOverlay = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitives.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Overlay>
>(({ className, ...props }, forwardedRef) => {
  return (
    <DrawerPrimitives.Overlay
      className={cn(
        // base
        "fixed inset-0 z-50 overflow-y-auto",
        // background color
        "bg-black/30",
        // transition
        "data-[state=closed]:animate-hide data-[state=open]:animate-dialogOverlayShow",
        className
      )}
      ref={forwardedRef}
      {...props}
      style={{
        animationDuration: "400ms",
        animationFillMode: "backwards",
      }}
    />
  );
});

DrawerOverlay.displayName = "DrawerOverlay";

const DrawerContent = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Content>
>(({ className, ...props }, forwardedRef) => {
  return (
    <DrawerPortal>
      <DrawerOverlay>
        <DrawerPrimitives.Content
          className={cn(
            // base
            "fixed inset-y-2 z-50 mx-auto flex w-[95vw] flex-1 flex-col overflow-y-auto rounded-md border p-4 shadow-lg focus:outline-none max-sm:inset-x-2 sm:inset-y-2 sm:right-2 sm:max-w-lg sm:p-6",
            // border color
            "border-gray-200 dark:border-gray-900",
            // background color
            "bg-background",
            // transition
            "data-[state=closed]:animate-drawerSlideRightAndFade data-[state=open]:animate-drawerSlideLeftAndFade",
            focusRing,
            className
          )}
          ref={forwardedRef}
          {...props}
        />
      </DrawerOverlay>
    </DrawerPortal>
  );
});

DrawerContent.displayName = "DrawerContent";

type DrawerHeaderProps = React.ComponentPropsWithoutRef<"div"> & {
  closeButtonClassName?: string
  containerClassName?: string;
}

const DrawerHeader = React.forwardRef<
  HTMLDivElement,
  DrawerHeaderProps
>(({ children, className, closeButtonClassName,containerClassName, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex justify-between items-start gap-x-4 border-border dark:border-gray-900 pb-4 border-b",
        containerClassName
      )}
      ref={ref}
      {...props}
    >
      <div className={cn("mt-1 flex flex-col gap-y-1", className)}>
        {children}
      </div>
      <DrawerPrimitives.Close asChild>
        <Button
          className={cn(
            "hover:bg-gray-100 dark:hover:bg-gray-400/10 p-1 aspect-square",
            closeButtonClassName
          )}
          variant="ghost"
        >
          <CloseIcon aria-hidden="true" className="size-6" />
        </Button>
      </DrawerPrimitives.Close>
    </div>
  );
});

DrawerHeader.displayName = "Drawer.Header";

const DrawerTitle = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Title>
>(({ className, ...props }, forwardedRef) => (
  <DrawerPrimitives.Title
    className={cn(
      // base
      "text-base font-semibold",
      // text color
      "text-gray-900 dark:text-gray-50",
      className
    )}
    ref={forwardedRef}
    {...props}
  />
));

DrawerTitle.displayName = "DrawerTitle";

const DrawerBody = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return <div className={cn("flex-1 py-4", className)} ref={ref} {...props} />;
});
DrawerBody.displayName = "Drawer.Body";

const DrawerDescription = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Description>
>(({ className, ...props }, forwardedRef) => {
  return (
    <DrawerPrimitives.Description
      className={cn("text-gray-500 dark:text-gray-500", className)}
      ref={forwardedRef}
      {...props}
    />
  );
});

DrawerDescription.displayName = "DrawerDescription";

function DrawerFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse border-t border-border pt-4 sm:flex-row sm:justify-end sm:space-x-2 dark:border-gray-900",
        className
      )}
      {...props}
    />
  );
}

DrawerFooter.displayName = "DrawerFooter";

export {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
};
