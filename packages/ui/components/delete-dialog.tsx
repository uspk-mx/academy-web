import { useId, useState, type ReactNode } from "react";
import { CircleAlert } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";
import { Label } from "./label";
import { Input } from "./input";

type ResourceType = "course" | "topic" | "lesson" | "quiz";

export function DeleteDialog({
  resource,
  resourceName,
  onDelete,
  trigger,
  open,
  onOpenChange,
}: {
  resource: ResourceType;
  resourceName: string;
  onDelete?: () => void;
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}): ReactNode {
  const id = useId();
  const [inputValue, setInputValue] = useState("");

  const resourceMap: Record<ResourceType, string> = {
    course: "Curso",
    lesson: "Leccion",
    quiz: "Quiz",
    topic: "Topic",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button type="button" variant="neutral">
            Borrar {resourceMap[resource].toLowerCase()}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
          >
            <CircleAlert className="opacity-80" size={16} strokeWidth={2} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Confirmacion final
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              Esta acción no se puede deshacer. Para confirmar, ingrese el
              nombre del {resourceMap[resource]}.{" "}
              <span className="text-foreground">{resourceName}</span>.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form action={onDelete} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor={id}>Nombre del {resourceMap[resource]}</Label>
            <Input
              id={id}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              placeholder={`Escribe ${resourceName} para confirmar`}
              type="text"
              value={inputValue}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="flex-1" type="button" variant="neutral">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              className="flex-1"
              disabled={inputValue !== resourceName}
              type="submit"
            >
              Borrar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
