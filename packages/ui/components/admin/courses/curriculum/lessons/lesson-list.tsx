import type {
  Exact,
  Lesson,
  LessonsByTopicIdQuery,
  Scalars,
  UpdateLessonInput,
  UpdateLessonMutation,
} from "gql-generated/generated/types";
// eslint-disable-next-line import/no-extraneous-dependencies -- not actually extraneous
import type { UseMutationExecute } from "urql";
import type { ReactNode } from "react";
import { useState } from "react";
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
import { toast } from "sonner";
import type { LessonActions } from "./type";
import { LessonItem } from "./lesson-item";

interface LessonListProps {
  lessons: LessonsByTopicIdQuery["lessonsByTopicId"];
  actions: Omit<LessonActions, "onEdit">;
  setLessons: (value: LessonsByTopicIdQuery["lessonsByTopicId"]) => void;
  updateLessonMutation: UseMutationExecute<
    UpdateLessonMutation,
    Exact<{
      lessonId: Scalars["ID"]["input"];
      input: UpdateLessonInput;
    }>
  >;
}

export function LessonList({
  lessons,
  setLessons,
  actions,
  updateLessonMutation,
}: LessonListProps): ReactNode {
  const [activeId, setActiveId] = useState<string | null>(null);
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
      const oldIndex = lessons.findIndex((item) => item.id === active.id);
      const newIndex = lessons.findIndex((item) => item.id === over.id);

      const newLessons = arrayMove(lessons, oldIndex, newIndex).map(
        (item, index) => ({
          ...item,
          position: index + 1,
        })
      );

      setLessons(newLessons);

      const updatePromises = newLessons.map((item) =>
        updateLessonMutation({
          lessonId: item.id,
          input: { position: item.position },
        })
      );

      const responses = await Promise.all(updatePromises);

      if (responses.every((response) => response.data)) {
        toast.success("Lecciones reorganizadas correctamente.");
      } else {
        toast.error("Hubo un error al reorganizar los topics.");
      }
    }

    setActiveId(null);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises -- not required to throw void :thinking:
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <SortableContext
        items={lessons.map((lesson) => lesson.id)}
        strategy={verticalListSortingStrategy}
      >
        <div>
          {lessons
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- expected to be always defined
            .sort((lessonA, lessonB) => lessonA.position! - lessonB.position!)
            .map((lesson) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson as Lesson}
                {...lesson}
                isDragging={lesson.id === activeId}
                {...actions}
              />
            ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          <LessonItem
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Not harmful
            {...lessons.find((lesson) => lesson.id === activeId)!}
            isDragging
            isVisible
            // eslint-disable-next-line @typescript-eslint/no-empty-function -- not harmful bro
            onDelete={async () => {}}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
