import { PlusIcon } from "lucide-react";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
// eslint-disable-next-line import/no-extraneous-dependencies -- Not extraneous
import { useMutation } from "urql";
import { PageLoader } from "ui/components/admin/page-loader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "ui/components/alert-dialog";
import { Button } from "ui/components/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "ui/components/drawer";
import { useFileUploaderContext } from "ui/context/file-uploader-context";
import {
  CreateQuestionDocument,
  DeleteQuestionDocument,
  UpdateQuestionDocument,
} from "gql-generated/gql/graphql";
import type {
  CreateQuestionMutation,
  CreateQuestionMutationVariables,
  DeleteQuestionMutation,
  DeleteQuestionMutationVariables,
  Question,
  UpdateQuestionMutation,
  UpdateQuestionMutationVariables,
} from "gql-generated/generated/types";
import { QuestionType } from "gql-generated/generated/types";
import { cn } from "ui/lib/utils";
import { QuestionForm } from "./question-form";
import QuestionList from "./question-list";
import { QuestionSelector } from "./question-selector";
import { QuestionSettings } from "./question-settings";
import type { UpdateQuestionInput } from "gql-generated/gql/graphql";
import { useDirtyIds } from "ui/hooks/use-dirty-ids";
import { useRevalidator } from "react-router";

export function CreateQuestionDialog({
  quizId,
  questionData,
}: {
  quizId: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  questionData: any;
}): ReactNode {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [questions, setQuestions] = useState(questionData || []);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const { fileUrls, files, onSubmitAttachments, setFileUrls, isUploading } =
    useFileUploaderContext();

  const [, createQuestionMutation] = useMutation<
    CreateQuestionMutation,
    CreateQuestionMutationVariables
  >(CreateQuestionDocument);

  const [, updateQuestionMutation] = useMutation<
    UpdateQuestionMutation,
    UpdateQuestionMutationVariables
  >(UpdateQuestionDocument);

  const [, deleteQuestionMutation] = useMutation<
    DeleteQuestionMutation,
    DeleteQuestionMutationVariables
  >(DeleteQuestionDocument);

  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const isInitializingRef = useRef(false);
  const lastFileUrlsRef = useRef<string[]>([]);
  const lastSelectedQuestionIdRef = useRef<string | null>(null);
  const lastFilesCountRef = useRef<number>(0);
  const {
    isDirty,
    markItemDirty: markQuestionDirty,
    markItemClean: markQuestionClean,
    markAllItemsClean: markAllQuestionsClean,
  } = useDirtyIds();

  const revalidator = useRevalidator();

  useEffect(() => {
    // Detect if the question has changed
    const questionChanged =
      selectedQuestion?.id !== lastSelectedQuestionIdRef.current;
    lastSelectedQuestionIdRef.current = selectedQuestion?.id || null;

    if (questionChanged) {
      console.log(
        "🔄 Question changed, initializing fileUrls for:",
        selectedQuestion?.id
      );
      isInitializingRef.current = true;

      if (selectedQuestion?.media) {
        const mediaArray = [selectedQuestion.media];
        setFileUrls(mediaArray);
        lastFileUrlsRef.current = mediaArray;
      } else {
        setFileUrls([]);
        lastFileUrlsRef.current = [];
      }

      lastFilesCountRef.current = 0;

      // Allow initialization to complete
      setTimeout(() => {
        isInitializingRef.current = false;
      }, 0);
    }
  }, [selectedQuestion?.id, selectedQuestion?.media, setFileUrls]);

  // detect when user changes media files
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // 🔍 DEBUG
    console.log("🔵 fileUrls changed:", fileUrls);

    if (isInitializingRef.current) {
      console.log("⏭️ Skipping fileUrls change - initializing");
      return;
    }

    const currentFileUrlsStr = JSON.stringify(fileUrls);
    const lastFileUrlsStr = JSON.stringify(lastFileUrlsRef.current);

    if (selectedQuestion && currentFileUrlsStr !== lastFileUrlsStr) {
      console.log(
        "🔥 User changed fileUrls from",
        lastFileUrlsRef.current,
        "to",
        fileUrls
      );

      lastFileUrlsRef.current = fileUrls;

      if (fileUrls.length > 0) {
        updateQuestion(selectedQuestion.id, { media: fileUrls[0] });
      } else {
        // 🔑 IMPORTANTE: Actualizar a null cuando se borra
        console.log(
          "🗑️ Setting media to null for question:",
          selectedQuestion.id
        );
        updateQuestion(selectedQuestion.id, { media: null });
      }
    }
  }, [fileUrls, selectedQuestion?.id]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isInitializingRef.current) {
      console.log("⏭️ Skipping files change - initializing");
      return;
    }

    // Si hay archivos nuevos (files aumentó)
    if (files.length > 0 && files.length !== lastFilesCountRef.current) {
      console.log("📁 User selected new file(s):", files.length, "files");
      lastFilesCountRef.current = files.length;

      if (selectedQuestion) {
        markQuestionDirty(selectedQuestion.id);
      }
    } else if (files.length === 0 && lastFilesCountRef.current > 0) {
      // Files fueron limpiados
      console.log("🧹 Files cleared");
      lastFilesCountRef.current = 0;
    }
  }, [files.length, selectedQuestion?.id, markQuestionDirty]);

  const handleQuestionTypeChange = (type: QuestionType) => {
    const newQuestion = {
      type,
      title: "",
      description: "",
      order: questions.length + 1,
      settings: {
        answerRequired: false,
        showQuestionMark: false,
        correctAnswers: [],
        questionMark: 0,
        questionType: type,
        randomizeQuestion: false,
        sortableItems: [],
      },
      createdAt: "",
      id: `${questions.length + 1}`,
      mark: 0,
      updatedAt: "",
    };
    setQuestions([...questions, newQuestion]);
    setSelectedQuestion(newQuestion);
    markQuestionDirty(newQuestion.id);
  };

  const onEscKeyDown = (e: KeyboardEvent) => {
    if (isDirty) {
      e.preventDefault();
      setShowUnsavedDialog(true);
    }
  };

  // Update the handleQuestionsReorder function
  const handleQuestionsReorder = async (reorderedQuestions: Question[]) => {
    const questionsMap = new Map(questions?.map((q: Question) => [q.id, q]));

    const updatedQuestions = reorderedQuestions.map((question) => ({
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      ...questionsMap.get(question.id)!,
      order: question.order,
      questionId: question.id,
    }));

    setQuestions(updatedQuestions);

    for (const question of reorderedQuestions) {
      markQuestionDirty(question.id);
    }

    const mutationUpdate = reorderedQuestions.map((question) => {
      return updateQuestionMutation({
        questionId: question.id,
        input: { questionOrder: question.order },
      });
    });

    if (mutationUpdate.length > 0) {
      toast.success("Pregunta reorganizada correctamente.");
    } else {
      toast.error("Hubo un error al reorganizar la pregunta.");
    }
  };

  const handleQuestionRemove = async (questionId: string) => {
    try {
      const questionToRemove = questions.find(
        (q: Question) => q.id === questionId
      );
      if (!questionToRemove) {
        toast.error("No se encontró la pregunta a eliminar");
        return;
      }

      const newQuestions = questions.filter(
        (q: Question) => q.id !== questionId
      );
      const reorderedQuestions = newQuestions.map(
        (q: Question, index: number) => ({
          ...q,
          order: index + 1,
        })
      );

      // Handle unsaved questions differently from saved ones
      if (!questionToRemove.createdAt) {
        // Question wasn't saved to database yet
        setQuestions(reorderedQuestions);
        if (selectedQuestion?.id === questionId) {
          setSelectedQuestion(null);
        }
        markQuestionClean(questionId);
        toast.success("Pregunta eliminada de la lista");
        return;
      }

      // Delete saved question from database
      const response = await deleteQuestionMutation({ questionId });
      if (response.error) {
        toast.error("Error al eliminar la pregunta", {
          description: response.error.message,
        });
        return;
      }

      setQuestions(reorderedQuestions);
      if (selectedQuestion?.id === questionId) {
        setSelectedQuestion(null);
      }
      markQuestionClean(questionId);
      toast.success("Pregunta eliminada exitosamente");
    } catch (error) {
      console.error("Error removing question:", error);
      toast.error("Error inesperado al eliminar la pregunta");
    }
  };

  const handleSaveNewQuestions = async () => {
    try {
      const newQuestions = questions.filter((q: Question) => !q.createdAt);
      if (newQuestions.length === 0) return;
      setIsSaving(true);

      let fileUrl = "";
      if (selectedQuestion?.type === QuestionType.FillInTheBlanks && files) {
        const response = await onSubmitAttachments();
        fileUrl = response?.[0];
      }
      const results = await Promise.all(
        newQuestions.map((question: Question) =>
          createQuestionMutation({
            input: {
              quizID: quizId,
              type: question.type,
              title: question.title,
              description: question.description,
              media: fileUrl ? fileUrl : null,
              questionMark: question.settings?.questionMark || 0,
              questionOrder: question.order,
              questionSettings: {
                answerRequired: question.settings?.answerRequired || false,
                showQuestionMark: question.settings?.showQuestionMark || false,
                correctAnswers: question.settings?.correctAnswers || [],
                questionMark: question.settings?.questionMark || 0,
                questionType: question.type,
                randomizeQuestion:
                  question.settings?.randomizeQuestion || false,
                sortableItems: question.settings?.sortableItems || [],
                matrixMatches: question.settings?.matrixMatches || [],
              },
              answerExplanation: question.answerExplanation || "",
            },
          })
        )
      );

      const hasErrors = results.some((result) => result.error);
      if (hasErrors) {
        toast.error("Error al guardar algunas preguntas", {
          description: "Por favor, intente nuevamente",
        });
        return;
      }

      const createdQuestions = results.map(
        (result) => result.data?.createQuestion
      );

      toast.success("Preguntas guardadas exitosamente", {
        description: `Se guardaron ${results.length} preguntas`,
      });

      setQuestions((prevQuestions: Question[]) =>
        prevQuestions.map((q) => {
          const createdVersion = createdQuestions.find(
            (created) => created?.title === q.title
          );
          return createdVersion || q;
        })
      );
      markAllQuestionsClean();
      setIsSaving(false); 
      revalidator.revalidate()
    } catch (error) {
      setIsSaving(false);
      console.error("Error saving questions:", error);
      toast.error("Error al guardar las preguntas", {
        description: "Ocurrió un error inesperado",
      });
    }
  };

  const handleUpdateQuestion = async () => {
    try {
      const updatedQuestion = questions.find(
        (q: Question) => q.id === selectedQuestion?.id
      );
      if (!updatedQuestion) return;

      console.log("🔍 DEBUG handleUpdateQuestion START:", {
        selectedQuestionId: selectedQuestion?.id,
        questionType: selectedQuestion?.type,
        filesLength: files.length,
        fileUrlsLength: fileUrls.length,
        files: files,
        fileUrls: fileUrls,
      });

      setIsSaving(true);

      let mediaUrl: string | null | undefined = undefined;

      if (selectedQuestion?.type === QuestionType.FillInTheBlanks) {
        console.log("📸 Processing FillInTheBlanks media");

        const realFiles = files.filter(
          (file) => file instanceof File && file.size > 0
        );

        console.log("🔍 Real files check:", {
          totalFiles: files.length,
          realFiles: realFiles.length,
          files: files.map((f) => ({
            isFile: f instanceof File,
            size: f.size,
            name: f.name,
          })),
        });

        if (realFiles.length > 0) {
          console.log("📤 Case 1: Has REAL files - will upload");
          const uploadedUrls = await onSubmitAttachments();
          console.log("📥 Upload result:", uploadedUrls);

          if (uploadedUrls && uploadedUrls.length > 0) {
            mediaUrl = uploadedUrls[0];
            console.log("✅ Upload successful:", mediaUrl);
          } else {
            console.error("❌ Upload failed");
            toast.error("Error al subir el archivo");
            setIsSaving(false);
            return;
          }
        } else if (fileUrls.length > 0) {
          console.log("📸 Case 2: No real files, has fileUrls");
          const currentFileUrl = fileUrls[0];
          const isRemoteUrl =
            currentFileUrl.startsWith("https://") ||
            currentFileUrl.startsWith("http://");

          console.log("🔍 URL check:", { currentFileUrl, isRemoteUrl });

          if (isRemoteUrl) {
            console.log("✅ Case 2a: Using existing remote URL");
            mediaUrl = currentFileUrl;
          } else {
            console.warn("⚠️ Case 2b: Strange URL format");
            mediaUrl = currentFileUrl;
          }
        } else {
          console.log("🗑️ Case 3: No files, no URLs - empty media");
          mediaUrl = "";
        }
      } else {
        console.log("⏭️ Not FillInTheBlanks type, skipping media processing");
      }

      console.log("💾 Final media value:", mediaUrl);

      const input: UpdateQuestionInput = {
        questionOrder: updatedQuestion.order,
        title: updatedQuestion.title,
        description: updatedQuestion.description,
        questionMark: updatedQuestion.settings?.questionMark || 0,
        questionSettings: {
          answerRequired: updatedQuestion.settings?.answerRequired || false,
          showQuestionMark: updatedQuestion.settings?.showQuestionMark || false,
          correctAnswers: updatedQuestion.settings?.correctAnswers || [],
          questionMark: updatedQuestion.settings?.questionMark || 0,
          questionType: updatedQuestion.settings?.questionType,
          randomizeQuestion:
            updatedQuestion.settings?.randomizeQuestion || false,
          sortableItems: updatedQuestion.settings?.sortableItems || [],
          matrixMatches: updatedQuestion.settings?.matrixMatches || [],
        },
        answerExplanation: updatedQuestion.answerExplanation || "",
      };

      if (selectedQuestion?.type === QuestionType.FillInTheBlanks) {
        input.media = mediaUrl;
      }

      console.log("🔍 Mutation input:", input);

      const result = await updateQuestionMutation({
        questionId: updatedQuestion.id,
        input,
      });

      if (result.error) {
        console.error("❌ Mutation error:", result.error);
        toast.error("Error al actualizar la pregunta", {
          description: result.error.message,
        });
        return;
      }

      console.log("✅ Mutation successful");

      setQuestions((prev: Question[]) =>
        prev.map((q) =>
          q.id === updatedQuestion.id
            ? {
                ...q,
                media: mediaUrl === "" ? null : mediaUrl,
                updatedAt: new Date().toISOString(),
              }
            : q
        )
      );

      toast.success("Pregunta actualizada exitosamente");
      markQuestionClean(updatedQuestion.id);
    } catch (error) {
      console.error("❌ Error in handleUpdateQuestion:", error);
      toast.error("Error al actualizar la pregunta", {
        description: "Ocurrió un error inesperado",
      });
      revalidator.revalidate()
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    if (isDirty) {
      setShowUnsavedDialog(true);
    } else {
      setOpen(false);
    }
  };

  const updateQuestion = useCallback(
    (id: string, updates: Partial<Question>): void => {
      console.log("📝 Updating question", id, "with", updates);
      setQuestions((prevQuestions: Question[]) =>
        prevQuestions.map((q: Question) =>
          q.id === id ? { ...q, ...updates } : q
        )
      );
      markQuestionDirty(id);
    },
    [markQuestionDirty]
  );

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <Button
          className="aspect-square max-sm:p-0"
          size="sm"
          variant="noShadowNeutral"
        >
          <PlusIcon
            aria-hidden="true"
            className="opacity-60 sm:-ms-1 sm:me-2"
            size={16}
            strokeWidth={2}
          />
          <span className="max-sm:sr-only">Preguntas</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className="w-11/12 gap-y-0 p-0 sm:p-0 sm:w-full sm:max-w-7xl sm:max-h-[min(850px,100vh)] left-0 top-24!"
        onEscapeKeyDown={(e) => {
          onEscKeyDown(e);
        }}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        ref={dialogRef}
      >
        <div className="flex h-full flex-col">
          <DrawerHeader
            className="px-4 pt-4"
            closeButtonClassName="m-4"
            containerClassName="sticky top-0 bg-white z-10"
          >
            <DrawerTitle>Crear pregunta</DrawerTitle>
            <DrawerDescription>
              Selecciona un tipo de pregunta y rellena todos los campos.
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto">
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                handleSaveNewQuestions();
              }}
              className="grid w-full h-max sm:grid-cols-[20.31rem_1fr_17.5rem] sm:h-full"
              id="questionCreator"
            >
              <div className="flex flex-col items-start px-6 pt-6 gap-6 overflow-y-auto">
                <div className="flex items-center gap-4">
                  <span>Preguntas</span>
                  <QuestionSelector
                    onQuestionTypeChange={handleQuestionTypeChange}
                    questionType={QuestionType.TrueFalse}
                  />
                </div>
                {questions?.length ? (
                  <QuestionList
                    onQuestionRemove={handleQuestionRemove}
                    onQuestionSelect={setSelectedQuestion}
                    onQuestionsReorder={handleQuestionsReorder}
                    questions={questions}
                    selectedQuestion={selectedQuestion}
                  />
                ) : (
                  <div className="flex items-center justify-center text-muted-foreground">
                    Sin preguntas agregadas aun
                  </div>
                )}
              </div>

              <div className="overflow-y-auto border-l border-l-border p-6 h-full w-full">
                {selectedQuestion ? (
                  questions
                    .filter(
                      (question: Question) =>
                        question.id === selectedQuestion.id
                    )
                    .map((item: Question) => {
                      return (
                        <QuestionForm
                          key={item.id}
                          question={item}
                          updateQuestion={updateQuestion}
                        />
                      );
                    })
                ) : (
                  <div className="flex items-center justify-center text-muted-foreground">
                    Selecciona un tipo de pregunta para iniciar
                  </div>
                )}
              </div>

              <div className="flex flex-col items-start xl:border-l w-full xl:border-l-border overflow-y-auto">
                <div className="flex flex-col h-full items-start w-full pt-6 gap-6">
                  {selectedQuestion ? (
                    questions
                      .filter(
                        (question: Question) =>
                          question.id === selectedQuestion.id
                      )
                      .map((item: Question) => (
                        <QuestionSettings
                          key={item.id}
                          question={item}
                          updateQuestion={updateQuestion}
                        />
                      ))
                  ) : (
                    <div className="flex items-center justify-center px-6 text-muted-foreground">
                      Sin preguntas seleccionadas
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          <DrawerFooter className="bg-white border-t border-border sm:justify-between px-6 py-4 sticky bottom-0 z-10">
            <div className="flex items-center justify-between w-full">
              <div className="flex-1">
                {isDirty && (
                  <div className="flex items-center gap-2 text-yellow-600 text-sm">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                    Cambios sin guardar
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button onClick={handleClose} type="button" variant="neutral">
                  Cancelar
                </Button>
                {selectedQuestion &&
                questions.some(
                  (q: Question) => q.id === selectedQuestion.id && q.createdAt
                ) ? (
                  <Button
                    onClick={handleUpdateQuestion}
                    type="button"
                    disabled={!isDirty}
                  >
                    {isUploading ? "Actualizando datos" : "Actualizar pregunta"}
                  </Button>
                ) : (
                  <Button
                    disabled={
                      !questions?.length || !selectedQuestion || isUploading
                    }
                    form="questionCreator"
                    type="submit"
                  >
                    Guardar preguntas
                  </Button>
                )}
              </div>
            </div>
          </DrawerFooter>
        </div>
        <AlertDialog
          onOpenChange={setShowUnsavedDialog}
          open={showUnsavedDialog}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cambios sin guardad</AlertDialogTitle>
              <AlertDialogDescription>
                Tienes cambios sin guardar. ¿Estas seguro de irte?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setShowUnsavedDialog(false);
                  setOpen(false);
                  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
                  setTimeout(() => (document.body.style.pointerEvents = ""), 0);
                }}
              >
                Irse
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div
          className={cn("hidden absolute inset-0 bg-muted-foreground/40 z-10", {
            "flex justify-center": isSaving,
          })}
        >
          <PageLoader className="h-full" loadingLabel="Guardando cambios..." />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
