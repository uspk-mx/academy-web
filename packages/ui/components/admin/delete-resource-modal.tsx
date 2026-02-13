import { LoaderCircleIcon } from "lucide-react";
import * as React from "react";
import { Alert, AlertDescription } from "ui/components/alert";
import { Button } from "ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "ui/components/dialog";
import { Input } from "ui/components/input";

interface DeleteResourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resourceType: string;
  resourceName: string;
  onDelete: () => void;
  isLoading?: boolean;
}

export function DeleteResourceDialog({
  open,
  onOpenChange,
  resourceType,
  resourceName,
  onDelete,
  isLoading,
}: DeleteResourceDialogProps) {
  const [nameInput, setNameInput] = React.useState("");
  const [confirmationInput, setConfirmationInput] = React.useState("");

  const isValid =
    nameInput === resourceName?.trim() &&
    confirmationInput === `eliminar mi ${resourceType.toLowerCase()}`;

  const handleDelete = () => {
    if (isValid) {
      onDelete();
      onOpenChange(false);
      setNameInput("");
      setConfirmationInput("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        hasCloseButton={false}
        className="sm:max-w-md border-t gap-0 p-0"
      >
        <DialogHeader className="p-6 pb-0 bg-background">
          <DialogTitle>Eliminar {resourceType}</DialogTitle>
          <DialogDescription className="pt-4">
            Este {resourceType.toLowerCase()} sera eliminado con todo el
            contenido que incluye.
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-4 bg-background">
          <Alert variant="destructive" className="bg-destructive">
            <AlertDescription>
              <span className="font-semibold">Alerta:</span> Esta accion sera
              irreversible. Esté seguro.
            </AlertDescription>
          </Alert>
        </div>
        <div className="grid gap-4 py-6 px-6 border-t broder-t-border bg-background">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Ingresa el nombre del {resourceType.toLowerCase()}{" "}
              <span className="font-medium text-foreground">
                {resourceName}
              </span>{" "}
              para continuar:
            </p>
            <Input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder={resourceName}
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Para verificar, ingresa{" "}
              <span className="font-medium text-foreground">
                eliminar mi {resourceType.toLowerCase()}
              </span>{" "}
              abajo:
            </p>
            <Input
              value={confirmationInput.toLowerCase()}
              onChange={(e) => setConfirmationInput(e.target.value)}
              placeholder={`eliminar mi ${resourceType.toLowerCase()}`}
            />
          </div>
        </div>
        <DialogFooter className="bg-[#F7F7F7] px-6 py-4 rounded-b-xl  border-t flex sm:justify-between gap-3">
          <Button
            variant="neutral"
            onClick={() => onOpenChange(false)}
            className="bg-white hover:bg-gray-50"
          >
            Cancelar
          </Button>
          <Button
            variant="default"
            onClick={handleDelete}
            disabled={!isValid || isLoading}
            className="px-6"
          >
            {isLoading ? (
              <>
                <LoaderCircleIcon
                  className="-ms-1 animate-spin"
                  size={16}
                  aria-hidden="true"
                />
                Eliminando...
              </>
            ) : (
              "Eliminar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
