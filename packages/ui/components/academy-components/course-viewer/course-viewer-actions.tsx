import { Button } from "ui/components/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "ui/lib/utils";
import { Switch } from "ui/components/switch";

export const CourseViewerActions = ({
  isItemCompleted,
  navigateNext,
  navigatePrevious,
  labels,
}: {
  isItemCompleted?: boolean;
  navigateNext?: () => void;
  navigatePrevious?: () => void;
  labels?: {
    previousButtonLabel: string;
    nextButtonLabel: string;
    completeButtonLabel: string;
    completedButtonLabel: string;
  };
}) => {
  return (
    <div className="flex items-center justify-center md:justify-between mt-6">
      <Button size="lg" onClick={navigatePrevious}>
        <ArrowLeft className="size-4" /> {labels?.previousButtonLabel}
      </Button>

      <div className="flex items-center gap-4">
        <Button
          size="lg"
          variant="neutral"
          className={cn({
            "border border-black": isItemCompleted,
          })}
        >
          <Switch
            checked={isItemCompleted}
            className="[--thumb-size:--spacing(4)] sm:[--thumb-size:--spacing(3)]"
          />{" "}
          {isItemCompleted
            ? labels?.completedButtonLabel
            : labels?.completeButtonLabel}
        </Button>
        <Button size="lg" onClick={navigateNext}>
          {labels?.nextButtonLabel} <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};
