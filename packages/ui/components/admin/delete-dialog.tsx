import type { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import { CircleAlert } from "lucide-react";
import type { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "ui/components/alert-dialog";
import { Button } from "ui/components/button";

interface DeleteDialogProps extends AlertDialogProps {
  triggerLabel?: string;
  dialogTitle: string;
  dialogDescription: string;
  actions: {
    cancelLabel: string;
    onCancel?: () => void;
    confirmLabel: string;
    onConfirm?: () => void;
  };
}

export function DeleteDialog({
  triggerLabel,
  dialogTitle,
  dialogDescription,
  actions: { cancelLabel, confirmLabel, onConfirm },
  ...rest
}: DeleteDialogProps): ReactNode {
  return (
    <AlertDialog {...rest}>
      {triggerLabel ? (
        <AlertDialogTrigger asChild>
          <Button variant="neutral">{triggerLabel}</Button>
        </AlertDialogTrigger>
      ) : null}
      <AlertDialogContent>
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
          >
            <CircleAlert className="opacity-80" size={16} strokeWidth={2} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
            <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
