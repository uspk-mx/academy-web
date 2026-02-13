import { LoaderCircleIcon } from "lucide-react";
import { type ReactNode, useId, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "urql";
import { Button, Label } from "ui/components/index";
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
import { CreateEnrollmentDocument } from "gql-generated/gql/graphql";
import type {
  Course,
  CreateEnrollmentMutation,
  CreateEnrollmentMutationVariables,
  User,
} from "gql-generated/generated/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/select";
import type TurndownServiceType from "turndown";

let td: TurndownServiceType | null = null;
interface AddEnrollmentDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  trigger?: ReactNode;
  students: Pick<User, "id" | "fullName" | "email" | "profilePicture">[];
  courses: Pick<Course, "id" | "title" | "description" | "status">[];
}

async function turndown(input: string) {
  if (!input) return "";
  if (typeof window === "undefined") return input.replace(/<[^>]*>/g, "");

  if (!td) {
    const mod = await import("turndown");
    const TurndownService = mod.default;
    td = new TurndownService();
  }
  return td.turndown(input);
}

export const AddEnrollmentDialog = ({
  open,
  onOpenChange,
  trigger,
  students,
  courses,
}: AddEnrollmentDialogProps) => {
  const id = useId();
  const [isAdding, setIsAdding] = useState(false);
  const [, addEnrollmentMutation] = useMutation<
    CreateEnrollmentMutation,
    CreateEnrollmentMutationVariables
  >(CreateEnrollmentDocument);

  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const handleAddEnrollment = async () => {
    if (!selectedUserId || !selectedCourseId) {
      toast.error("Por favor selecciona un estudiante y un curso.");
      return;
    }

    setIsAdding(true);

    try {
      const response = await addEnrollmentMutation({
        userId: selectedUserId,
        courseId: selectedCourseId,
      });

      if (response.error) {
        toast.error("Ocurrió un error al crear la inscripción.", {
          description: `Detalles: ${response.error.message}`,
        });
        return;
      }

      if (response.data?.createEnrollment) {
        toast.success("La inscripción se creó correctamente.");
        setSelectedUserId("");
        setSelectedCourseId("");
        onOpenChange(false);
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado al crear la inscripción.", {
        description: `Detalles: ${
          error instanceof Error ? error.message : String(error)
        }`,
      });
      console.error(error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button variant="default">Inscribir estudiante</Button>
        )}
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="px-6 py-4 text-left border-b bg-[#F7F7F7]">
          <DialogTitle className="text-base">Inscribir Estudante</DialogTitle>
          <DialogDescription>
            Selecciona el estudiante a inscribir y el curso al cual lo vas a
            inscribir, despues haz clic en Guardar Cambios.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto">
          <div className="px-6 pt-4 pb-6">
            <form
              className="space-y-4"
              action={handleAddEnrollment}
              onSubmit={async (event) => {
                event.preventDefault();
                await handleAddEnrollment();
              }}
              id="add-enrollment-form"
            >
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-student`}>Estudiante</Label>
                  <Select
                    value={selectedUserId}
                    onValueChange={setSelectedUserId}
                  >
                    <SelectTrigger className="text-left **:data-desc:hidden">
                      <SelectValue placeholder="Selecciona un estudiante" />
                    </SelectTrigger>
                    <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                      {students.map(async (student) => (
                        <SelectItem
                          value={student.id}
                          key={student.id}
                          className="flex flex-col items-start gap-2"
                        >
                          {student.fullName}
                          <span
                            className="text-muted-foreground mt-1 block text-xs"
                            data-desc
                          >
                            {await turndown(student.email ?? "")}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="*:not-first:mt-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-courses`} className="mb-2">
                    Cursos
                  </Label>
                  <Select
                    value={selectedCourseId}
                    onValueChange={setSelectedCourseId}
                  >
                    <SelectTrigger
                      id="courses"
                      className="text-left **:data-desc:hidden"
                    >
                      <SelectValue placeholder="Selecciona un curso" />
                    </SelectTrigger>
                    <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                      {courses.map(async (course) => (
                        <SelectItem value={course.id} key={course.id}>
                          {course.title}
                          <span
                            className="text-muted-foreground mt-1 block text-xs"
                            data-desc
                          >
                            {await turndown(course.description ?? "")}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </div>
        </div>
        <DialogFooter className="border-t bg-[#F7F7F7] sm:justify-between px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="neutral" disabled={isAdding}>
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" form="add-enrollment-form" disabled={isAdding}>
            {isAdding ? (
              <>
                <LoaderCircleIcon
                  className="-ms-1 animate-spin"
                  size={16}
                  aria-hidden="true"
                />
                Guardando cambios
              </>
            ) : (
              "Guardar cambios"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
