import { LoaderCircleIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
import { Label } from "ui/components/label";
import { Textarea } from "ui/components/textarea";

interface TopicDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; description: string }) => void;
  initialData?: { title: string; description: string };
  isLoading?: boolean;
}

export function UpsertTopicDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
  isLoading,
}: TopicDialogProps): ReactNode {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSave({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {initialData?.title || initialData?.description
                ? "Actualizar topic"
                : "Crear nuevo topic"}
            </DialogTitle>
            <DialogDescription className="text-left">
              Llena o actualiza todos los campos y haz clic en guardar cambios.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                name="title"
                placeholder="Enter topic title"
                required
                value={title}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Enter topic description"
                required
                value={description}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoaderCircleIcon
                    className="-ms-1 mr-2 animate-spin"
                    size={16}
                    aria-hidden="true"
                  />
                  Guardando...
                </>
              ) : (
                "Guardar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
