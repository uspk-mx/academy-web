import { useState, type ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  BookIcon,
  GripVertical,
  MenuIcon,
  PencilIcon,
  Trash2,
} from "lucide-react";
import type { Lesson } from "gql-generated/generated/types";
import { Card, CardContent } from "ui/components/card";
import { Button } from "ui/components/button";
import { DeleteDialog } from "ui/components/delete-dialog";
import { useHover } from "ui/hooks/use-hover";
import { cn } from "ui/lib/utils";
import type { LessonActions } from "./type";
import { EditLessonDialog } from "./edit-lesson-dialog";

interface LessonItemProps extends Omit<LessonActions, "onEdit"> {
  id: string;
  title: string;
  lesson?: Lesson;
  isDragging?: boolean;
}

export function LessonItem({
  id,
  title,
  lesson,
  onDelete,
  isVisible,
  isDragging,
}: LessonItemProps): ReactNode {
  const [isLessonCardHovered, ref, hoverProps] = useHover<HTMLDivElement>();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isLessonDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isLessonDragging ? 0.5 : 1,
  };

  function getCardIcon(): ReactNode {
    if (isDragging) {
      return <GripVertical />;
    }
    if (isLessonCardHovered) {
      return <MenuIcon />;
    }
    return <BookIcon />;
  }

  return (
    <Card
      className={cn("m-4 p-0", {
        hidden: !isVisible,
        "shadow-lg bg-accent": isDragging,
      })}
      ref={setNodeRef}
      style={style}
      {...hoverProps}
    >
      <CardContent className={cn("flex items-center gap-2 p-2")}>
        <Button
          className="cursor-grab"
          size="icon"
          variant="ghost"
          type="button"
          {...attributes}
          {...listeners}
        >
          {getCardIcon()}
        </Button>

        <div className="flex-1 truncate">
          <h3 className="text-base font-semibold">{title}</h3>
        </div>

        <div className="flex gap-2">
          <EditLessonDialog lesson={lesson!} />

          <DeleteDialog
            onDelete={() => void onDelete(id)}
            resource="lesson"
            resourceName={title || ""}
            trigger={
              <Button size="icon" type="button" variant="ghost">
                <Trash2 className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
