import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import type {
  DeleteLessonMutation,
  DeleteLessonMutationVariables,
  DeleteQuizMutation,
  DeleteQuizMutationVariables,
  LessonsByTopicIdQuery,
  QuizzesByTopicIdQuery,
  UpdateLessonMutation,
  UpdateLessonMutationVariables,
  UpdateQuizMutation,
  UpdateQuizMutationVariables,
} from "gql-generated/generated/types";
import { Trash2Icon } from "lucide-react";
import { useMutation } from "urql";
import { Button } from "ui/components/button";
import { useTopicContent } from "ui/context/topic-content-context";
import {
  DeleteLessonDocument,
  DeleteQuizDocument,
  UpdateLessonDocument,
  UpdateQuizDocument,
} from "gql-generated/gql/graphql";
import { DeleteResourceDialog } from "../../delete-resource-modal";
import { EditLessonDialog } from "./lessons/edit-lesson-dialog";
import { EditQuizDialog } from "./quizzes/edit-quiz-dialog";
import { CreateQuestionDialog } from "./quizzes/questions/create-question-dialog";
import { TopicItem } from "./topic-item";

interface TopicContentProps {
  actions: ReactNode;
  isVisible?: boolean;
}

export function TopicContent({
  actions,
  isVisible,
}: TopicContentProps): ReactNode {
  const [activeId, setActiveId] = useState<string | null>(null);

  const { content, setContent } = useTopicContent();

  const [{}, updateLesson] = useMutation<
    UpdateLessonMutation,
    UpdateLessonMutationVariables
  >(UpdateLessonDocument);
  const [{}, updateQuiz] = useMutation<
    UpdateQuizMutation,
    UpdateQuizMutationVariables
  >(UpdateQuizDocument);

  const [{}, onDeleteLesson] = useMutation<
    DeleteLessonMutation,
    DeleteLessonMutationVariables
  >(DeleteLessonDocument);

  const [{}, onDeleteQuiz] = useMutation<
    DeleteQuizMutation,
    DeleteQuizMutationVariables
  >(DeleteQuizDocument);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent): void => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent): Promise<void> => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = content.findIndex((item) => item.id === active.id);
      const newIndex = content.findIndex((item) => item.id === over.id);

      const newContent = arrayMove(content, oldIndex, newIndex).map(
        (item, index) => ({
          ...item,
          position: index + 1,
        })
      );

      setContent(newContent);

      const mutationUpdate = newContent.map((item) => {
        if (item.__typename === "Lesson") {
          return updateLesson({
            lessonId: item.id,
            input: { position: item.position },
          });
        }
        return updateQuiz({
          updateQuizId: item.id,
          input: { position: item.position },
        });
      });

      const responses = await Promise.all(mutationUpdate);

      if (responses.every((response) => response.data)) {
        toast.success("Contenido reorganizado correctamente.");
      } else {
        toast.error("Hubo un error al reorganizar el contenido.");
      }
    }

    setActiveId(null);
  };

  const handleDeleteLesson = async (lessonId: string): Promise<void> => {
    try {
      const response = await onDeleteLesson({ lessonId });
      if (response.data?.deleteLesson) {
        // Keep quizzes and filter out only the deleted lesson
        const updatedContent = content.filter((item) => item.id !== lessonId);

        setContent(updatedContent);

        toast.success("Lección eliminada", {
          description: "Has borrado la lección con éxito 🎉",
        });
      } else {
        throw new Error(response.error?.message || "Error desconocido");
      }
    } catch (error) {
      toast.error("Ocurrió un error", {
        description:
          error instanceof Error
            ? error.message
            : "No hemos podido eliminar la lección, inténtalo nuevamente más tarde.",
      });
    }
  };

  const handleDeleteQuiz = async (quizId: string): Promise<void> => {
    try {
      const response = await onDeleteQuiz({ deleteQuizId: quizId });
      if (response.data?.deleteQuiz) {
        // Keep lessons and filtered out only the deleted quzzes
        const updatedContent = content.filter((item) => item.id !== quizId);

        setContent(updatedContent);

        toast.success("Quiz eliminado", {
          description: "Has borrado el quiz con éxito 🎉",
        });
      } else {
        throw new Error(response.error?.message || "Error desconocido");
      }
    } catch (error) {
      toast.error("Ocurrió un error", {
        description:
          error instanceof Error
            ? error.message
            : "No hemos podido eliminar el quiz, inténtalo nuevamente más tarde.",
      });
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <SortableContext
        items={content.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div>
          {content
            .sort((a, b) => a.position! - b.position!)
            .map((item) => (
              <TopicItem
                actions={
                  <TopicItemActions
                    data={item}
                    onDeleteLesson={handleDeleteLesson}
                    onDeleteQuiz={handleDeleteQuiz}
                  />
                }
                id={item.id}
                isDragging={item.id === activeId}
                isVisible={isVisible}
                key={item.id}
                questionsQuantity={
                  item.__typename === "Quiz"
                    ? item.questions?.length
                    : undefined
                }
                title={item.title}
                variant={item.__typename === "Lesson" ? "LESSON" : "QUIZ"}
              />
            ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          <TopicItem
            {...content.find((item) => item.id === activeId)!}
            actions={actions}
            isDragging
            isVisible
            variant={
              content.find((item) => item.id === activeId)?.__typename ===
              "Lesson"
                ? "LESSON"
                : "QUIZ"
            }
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function TopicItemActions({
  data,
  onDeleteLesson,
  onDeleteQuiz,
}: {
  data:
    | LessonsByTopicIdQuery["lessonsByTopicId"][number]
    | QuizzesByTopicIdQuery["quizzesByTopicId"][number];
  onDeleteLesson?: (value: string) => void;
  onDeleteQuiz?: (value: string) => void;
}): ReactNode {
  const [openLessonDeleteDialog, setOpenLessonDeleteDialog] = useState(false);
  const [openQuizDeleteDialog, setOpenQuizDeleteDialog] = useState(false);

  return (
    <>
      {data.__typename === "Lesson" ? (
        <>
          <EditLessonDialog
            lesson={{
              attachments: data.attachments,
              content: data.content,
              featuredImage: data.featuredImage,
              position: data.position,
              showPreview: data.showPreview,
              title: data.title,
              topic: data.topic as any,
              video: data.video,
              createdAt: data.createdAt,
              id: data.id,
              updatedAt: data.updatedAt,
            }}
          />
          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={() => setOpenLessonDeleteDialog(true)}
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
          <DeleteResourceDialog
            onDelete={() => onDeleteLesson?.(data.id)}
            resourceName={data.title || ""}
            resourceType="Leccion"
            open={openLessonDeleteDialog}
            onOpenChange={setOpenLessonDeleteDialog}
          />
        </>
      ) : data.__typename === "Quiz" ? (
        <>
          <CreateQuestionDialog
            questionData={data.questions}
            quizId={data.id}
          />
          <EditQuizDialog initialData={data} />
          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={() => setOpenQuizDeleteDialog(true)}
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
          <DeleteResourceDialog
            onDelete={() => onDeleteQuiz?.(data.id)}
            resourceName={data.title || ""}
            resourceType="Quiz"
            open={openQuizDeleteDialog}
            onOpenChange={setOpenQuizDeleteDialog}
          />
        </>
      ) : null}
    </>
  );
}
