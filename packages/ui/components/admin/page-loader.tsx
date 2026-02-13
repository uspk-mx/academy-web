import { LoaderCircle } from "lucide-react";
import { type ReactElement } from "react";
import { cn } from "ui/lib/utils";

export function PageLoader({
  loadingLabel,
  className,
}: {
  loadingLabel?: string;
  className?: string;
}): ReactElement {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center h-[65vh] gap-4",
        className
      )}
    >
      <LoaderCircle
        aria-hidden="true"
        className="-ms-1 me-2 animate-spin"
        size={56}
        strokeWidth={2}
      />
      <p className="font-semibold text-lg">{loadingLabel}</p>
    </div>
  );
}
