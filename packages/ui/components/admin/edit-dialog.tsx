import type { DialogProps } from "@radix-ui/react-dialog";
import { type ReactNode } from "react";
import { Button } from "ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui/components/dialog";
import { LoaderCircleIcon } from "lucide-react";

interface EditDialogProps extends DialogProps {
  triggerLabel?: ReactNode;
  dialogTitle: string;
  dialogDescription: string;
  editAction: (value: FormData) => void;
  isLoading?: boolean;
  actions: {
    cancelLabel?: string;
    onCancel?: () => void;
    confirmLabel: string;
    onConfirm?: () => void;
  };
}

export function EditDialog({
  triggerLabel,
  dialogTitle,
  dialogDescription,
  editAction,
  isLoading,
  actions: { cancelLabel, confirmLabel, onConfirm },
  children,
  ...rest
}: EditDialogProps): ReactNode {
  return (
    <Dialog {...rest}>
      {triggerLabel ? (
        <DialogTrigger asChild>
          <Button className="ml-auto">{triggerLabel}</Button>
        </DialogTrigger>
      ) : null}
      <DialogContent className="p-0">
        <div className="flex flex-col items-start gap-2">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="sm:text-left">{dialogTitle}</DialogTitle>
            <DialogDescription className="sm:text-left">
              {dialogDescription}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            editAction(formData);
          }}
          className="space-y-5"
        >
          <div className="space-y-4 px-6">{children}</div>
          <DialogFooter className="border-t bg-[#F7F7F7] sm:justify-between px-6 py-4">
            <DialogClose asChild>
              <Button type="button" variant="neutral" disabled={false}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoaderCircleIcon
                    className="-ms-1 animate-spin"
                    size={16}
                    aria-hidden="true"
                  />
                  Guardando...
                </>
              ) : (
                confirmLabel
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
