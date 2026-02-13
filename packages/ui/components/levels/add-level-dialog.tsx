import { LoaderCircleIcon, Plus } from "lucide-react";
import { useId, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "urql";
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
import { Input } from "ui/components/input";
import { Label } from "ui/components/label";
import { CreateLevelDocument } from "gql-generated/gql/graphql";
import type {
  CreateLevelOrCategoryInput,
  Level,
} from "gql-generated/generated/types";

export function AddLevelDialog() {
  const id = useId();
  const [data, addLevelMutation] = useMutation<
    Level,
    { input: CreateLevelOrCategoryInput }
  >(CreateLevelDocument);
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const addLevelAction = async (formData: FormData) => {
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    if (!name || !description) {
      console.error("Nombre y descripcion son requeridos");
      toast.error("Nombre y descripcion son requeridos", {
        position: "top-right",
      });
      return;
    }

    try {
      setIsSaving(true);
      const result = await addLevelMutation({
        input: {
          name,
          description,
        },
      });
      if (result.error) {
        toast.error("Error al agregar el nivel", {
          description: result.error.message,
          position: "top-right",
        });
        setIsSaving(false);
      } else {
        toast.success("Nivel agregado con exito!", {
          description: "Podras visualizarlo en la tabla de datos",
          position: "top-right",
        });
        setOpen(false);
        setIsSaving(false);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Oops! algo salio mal, intentalo nuevamente!", {
        description: error as string,
        position: "top-right",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto">
          <Plus
            aria-hidden="true"
            className="-ms-1 me-2 opacity-60"
            size={16}
            strokeWidth={2}
          />
          Agregar nivel
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <div className="flex flex-col items-start gap-2">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="sm:text-left">
              Agrega un nuevo nivel
            </DialogTitle>
            <DialogDescription className="sm:text-left">
              Completa todos los cambios y haz clic en guardar cambios cuando
              termines.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form
          className="space-y-5"
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            await addLevelAction(formData);
          }}
        >
          <div className="space-y-4 px-6">
            <div className="space-y-2">
              <Label htmlFor={`${id}-name`}>Nombre</Label>
              <Input
                id={`${id}-name`}
                placeholder="Avanzado"
                name="name"
                type="text"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-description`}>Descripcion</Label>
              <Input
                id={`${id}-description`}
                placeholder="Esta es una descripcion de ejemplo..."
                type="text"
                name="description"
                required
              />
            </div>
          </div>

          <DialogFooter className="border-t bg-[#F7F7F7] sm:justify-between px-6 py-4">
            <DialogClose asChild>
              <Button type="button" variant="neutral" disabled={false}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <LoaderCircleIcon
                    className="-ms-1 animate-spin"
                    size={16}
                    aria-hidden="true"
                  />
                  Guardando...
                </>
              ) : (
                "Guardar cambios"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
