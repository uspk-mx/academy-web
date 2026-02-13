import type { Content } from "@tiptap/react";
import { ChevronDown, PencilIcon, XIcon } from "lucide-react";
import { useEffect, useId, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { useMutation } from "urql";
import { MinimalTiptapEditor } from "ui/components/minimal-tiptap-editor";
import { Button } from "ui/components/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "ui/components/drawer";
import { Input } from "ui/components/input";
import { Label } from "ui/components/label";
import PercentageInput from "ui/components/percentage-input";
import { UpdateQuizDocument } from "gql-generated/gql/graphql";
import type {
  UpdateQuizInput,
  UpdateQuizMutation,
  UpdateQuizMutationVariables,
} from "gql-generated/generated/types";
import { useCharacterLimit } from "ui/hooks/use-character-limit";
import type { QuizDataType } from "./type";

export function EditQuizDialog({
  initialData,
}: {
  initialData?: QuizDataType;
}): ReactNode {
  const [open, setOpen] = useState(false);
  const [quizData, setQuizData] = useState(initialData);
  const id = useId();
  const maxLength = 60;
  const [content, setContent] = useState<Content>(quizData?.content || "");

  useEffect(() => {
    if (initialData) {
      setQuizData(initialData);
    }
  }, [initialData]);

  const [passingGrade, setPassingGrade] = useState<number | undefined>(
    initialData?.passingGrade
  );

  const {
    value,
    maxLength: limit,
    handleChange,
    characterCount,
  } = useCharacterLimit({
    maxLength,
    initialValue: quizData?.title,
  });

  const [, updateQuizMutation] = useMutation<
    UpdateQuizMutation,
    UpdateQuizMutationVariables
  >(UpdateQuizDocument);

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <Button size="icon" type="button" variant="ghost">
          <PencilIcon className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-11/12 gap-y-0 pt-0! pb-32 xl:pb-0 sm:px-0 sm:max-w-267.5 left-0 top-24!">
        <DrawerClose asChild>
          <Button
            className="absolute top-1 right-1 size-8 rounded-full"
            type="button"
            variant="ghost"
          >
            <XIcon />
          </Button>
        </DrawerClose>
        <form
          action={async (formData) => {
            const input: UpdateQuizInput = {
              title: String(formData.get("title")),
              content: formData.get("content")?.toString(),
              timer: Number.parseInt(String(formData.get("timer"))),
              timeUnit: formData.get("timeUnit")?.toString(),
              maxAttempts: Number.parseInt(String(formData.get("maxAttempts"))),
              passingGrade: Number.parseInt(String(formData.get("passingGrade"))),
            };

            try {
              const updatedData = await updateQuizMutation({
                updateQuizId: quizData?.id || "",
                input,
              });

              if (updatedData.error) {
                toast.error("Ocurrio un error al actualizar el quiz", {
                  description: updatedData.error.message,
                });
                return;
              }

              toast.success("Quiz actualizado con exito! 🎉");
              setOpen(false);
            } catch (error) {
              toast.error("Ocurrio un error al actualizar el quiz");
              console.error("Error updating quiz:", error);
            }
          }}
          className="h-full"
        >
          <div className="flex flex-col overflow-y-auto gap-6 h-full w-full xl:flex-row">
            <div className="flex flex-col items-start px-6 gap-6">
              <div className="mr-6 mt-6">
                <h2 className="font-semibold text-xl">Contenido del quiz</h2>
                <p className="text-sm text-card-foreground">
                  Ingresa el contenido del quiz, trata de que el titulo sea
                  atractivo para el alumno y agrega una descripcion de lo que se
                  vera en el quiz, puedes agregar contenido de apoyo como
                  videos, audios e imagenes.
                </p>
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor={id}>Titulo</Label>
                <div className="relative">
                  <Input
                    aria-describedby={`${id}-description`}
                    className="pe-14 peer"
                    id={id}
                    maxLength={maxLength}
                    name="title"
                    onChange={handleChange}
                    type="text"
                    value={value}
                  />
                  <div
                    aria-live="polite"
                    className="absolute inset-y-0 flex justify-center items-center peer-disabled:opacity-50 text-muted-foreground text-xs pointer-events-none end-0 pe-3 tabular-nums"
                    id={`${id}-description`}
                    // biome-ignore lint/a11y/useSemanticElements: <explanation>
                    role="status"
                  >
                    {characterCount}/{limit}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={id}>Descripcion</Label>
                <MinimalTiptapEditor
                  autofocus
                  className="w-full"
                  editable
                  editorClassName="focus:outline-none"
                  editorContentClassName="p-5"
                  onChange={(contentData) => {
                    setContent(contentData);
                  }}
                  output="html"
                  placeholder="Type your description here..."
                  value={content}
                />
                <input name="content" type="hidden" value={content as string} />
              </div>
            </div>

            <div className="flex flex-col items-start xl:border-l w-full xl:border-l-border">
              <div className="mx-6 mt-6">
                <h2 className="font-semibold text-xl">Ajustes del quiz</h2>
                <p className="text-sm text-card-foreground">
                  Ingresa los ajustes del quiz tales como el tiempo limite para
                  completarlo, la calificacion para aprobar y los intentos
                  maximos.
                </p>
              </div>

              <div className="flex flex-col items-start w-full px-6 pt-6 gap-6">
                <div className="space-y-2 w-full">
                  <Label htmlFor={id}>Tiempo</Label>
                  <div className="flex rounded-lg shadow-sm shadow-black/5">
                    <Input
                      className="-me-px rounded-e-none shadow-none focus-visible:z-10"
                      defaultValue={quizData?.timer || 0}
                      id={id}
                      name="timer"
                      placeholder="65"
                      type="text"
                    />
                    <div className="relative inline-flex">
                      <select
                        aria-label="Domain suffix"
                        className="peer inline-flex h-full appearance-none items-center rounded-none rounded-e-lg border border-input bg-background pe-8 ps-3 text-sm text-muted-foreground transition-shadow hover:bg-accent hover:text-accent-foreground focus:z-10 focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue={quizData?.timeUnit || ""}
                        name="timeUnit"
                      >
                        <option value="MINUTES">Minutos</option>
                        <option value="HOURS">Horas</option>
                        <option value="SECONDS">Segundos</option>
                        <option value="DAYS">Dias</option>
                        <option value="WEEKS">Semanas</option>
                        <option value="MONTHS">Messes</option>
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 end-0 z-10 flex h-full w-9 items-center justify-center text-muted-foreground/80 peer-disabled:opacity-50">
                        <ChevronDown
                          aria-hidden="true"
                          role="img"
                          size={16}
                          strokeWidth={2}
                        />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 w-full">
                  <PercentageInput
                    id="passingGrade"
                    initialValue={Number(
                      // biome-ignore lint/style/noNonNullAssertion: <explanation>
                      (quizData?.passingGrade! / 100).toFixed(2)
                    )}
                    label="Calificacion aprobatoria"
                    name="passingGrade"
                    onChangeValue={setPassingGrade}
                    value={passingGrade}
                  />
                </div>
                <div className="space-y-2 w-full">
                  <Label htmlFor="maxAttempts">Maximos intentos</Label>
                  <Input
                    defaultValue={quizData?.maxAttempts || 0}
                    id="maxAttempts"
                    name="maxAttempts"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>

          <DrawerFooter className="absolute bg-white right-0 left-0 border-t bottom-0 border-border px-6 py-4">
            <DrawerClose asChild>
              <Button type="button" variant="neutral">
                Cancelar
              </Button>
            </DrawerClose>
            <Button type="submit">Guardar cambios</Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
