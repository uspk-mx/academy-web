import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ChevronDown,
  ChevronRight,
  GripVertical,
  Pencil,
  PlusIcon,
  Trash2,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "ui/components/button";
import { Card, CardFooter } from "ui/components/card";
import { DeleteDialog } from "ui/components/delete-dialog";
import { useTopicContent } from "ui/context/topic-content-context";
import type {
  LessonsByTopicIdQuery,
  Topic as TopicType,
} from "gql-generated/generated/types";
import { cn } from "ui/lib/utils";
import { LessonBuilder } from "./lessons";
import { CreateQuizDialog } from "./quizzes/create-quiz-dialog";
import { TopicContent } from "./topic-content";

type TopicProps = TopicType & {
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string) => void;
  isTopicDragging?: boolean;
  isCollapsed?: boolean;
  onCollapseToggle?: () => void;
  topic?: TopicType;
};

export function Topic({
  id,
  title,
  description,
  position,
  onDelete,
  onEdit,
  isTopicDragging,
  isCollapsed,
  onCollapseToggle,
  topic,
}: TopicProps): ReactNode {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const { content } = useTopicContent();

  const lessonContent = content.filter(
    (item): item is LessonsByTopicIdQuery["lessonsByTopicId"][number] =>
      item.__typename === "Lesson"
  );

  const effectiveDragging = isDragging || isTopicDragging;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: effectiveDragging ? 0.5 : 1,
  };

  return (
    <Card
      className={cn("mb-4 w-full", {
        "shadow-lg bg-accent": effectiveDragging,
      })}
      ref={setNodeRef}
      style={style}
    >
      <div className={cn("p-4", { "px-0 pb-0": isCollapsed })}>
        <div
          className={cn("flex items-center gap-2", {
            "items-start px-4": isCollapsed,
            "border-b border-border pb-4":
              content && content.length > 0 && isCollapsed,
          })}
        >
          <Button
            className="cursor-grab"
            size="icon"
            variant="ghost"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-4 h-4" />
          </Button>

          <div className="flex-1 truncate">
            <h3 className="text-lg font-semibold">{title}</h3>
            {isCollapsed ? (
              <p className="text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => {
                onEdit(id);
              }}
              size="icon"
              variant="ghost"
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <DeleteDialog
              onDelete={() => void onDelete(id)}
              resource="topic"
              resourceName={title || ""}
              trigger={
                <Button size="icon" type="button" variant="ghost">
                  <Trash2 className="h-4 w-4" />
                </Button>
              }
            />

            <Button onClick={onCollapseToggle} size="icon" variant="ghost">
              {!isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <TopicContent actions={undefined} isVisible={isCollapsed} />
        {isCollapsed ? (
          <CardFooter className="py-4 px-0 border-t border-border mt-4">
            <div className="px-4">
              <div className="flex gap-2">
                <LessonBuilder
                  lessons={lessonContent}
                  title={`Leccion | Topic: ${title}`}
                  topicId={id}
                  trigger={
                    <Button variant="noShadowNeutral">
                      <PlusIcon className="mr-2 w-4 h-4" /> Leccion
                    </Button>
                  }
                />

                <CreateQuizDialog
                  topicId={id}
                  trigger={
                    <Button variant="noShadowNeutral">
                      <PlusIcon className="mr-2 w-4 h-4" /> Quiz
                    </Button>
                  }
                />
              </div>
            </div>
          </CardFooter>
        ) : null}
      </div>
    </Card>
  );
}
