import type {
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { type Key, type ReactNode, useState } from "react";
import { Button, Input } from "ui/components/index";
import { cn } from "ui/lib/utils";
import type { QuestionTypesProps } from "./types";

export function SortingQuestion({
  question,
  updateQuestion,
}: QuestionTypesProps): ReactNode {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [sortableItems, setSortableItems] = useState(
    (question.settings?.sortableItems || []).map(
      (item: any, index: number) => ({
        id: `item-${index}`,
        item,
        position: index + 1,
      })
    )
  );

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

  // eslint-disable-next-line @typescript-eslint/require-await -- it is ok
  const handleDragEnd = async (event: DragEndEvent): Promise<void> => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sortableItems.findIndex(
        (item: { id: UniqueIdentifier }) => item.id === active.id
      );
      const newIndex = sortableItems.findIndex(
        (item: { id: UniqueIdentifier }) => item.id === over.id
      );

      const newSortableItems = arrayMove(sortableItems, oldIndex, newIndex).map(
        (item, index) => ({
          ...item,
          position: index + 1,
        })
      );

      setSortableItems(newSortableItems);
      updateQuestion(question.id, {
        settings: {
          ...question.settings,
          sortableItems: newSortableItems.map((item) => item.item),
          correctAnswers: newSortableItems.map((item) => item.item),
        },
      });
      setActiveId(null);
    }
  };

  return (
    <>
      <p className="text-sm">
        Asegurate de escribir una descripcion que ayude al alumno a ordenar los
        elementos correctamente.{" "}
      </p>
      <DndContext
        collisionDetection={closestCenter}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises -- not required to throw void :thinking:
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        sensors={sensors}
      >
        <SortableContext
          items={sortableItems.map((item: { id: any }) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {sortableItems
            .sort(
              (a: { position: number }, b: { position: number }) =>
                a.position - b.position
            )
            .map(
              (option: {
                position: number;
                id: Key | null | undefined;
                item: string;
              }) => (
                <SortingItemQuestion
                  index={option.position - 1}
                  isDragging={option.id === activeId}
                  key={option.id}
                  option={option.item}
                  optionId={option.id as string}
                  question={question}
                  setSortableItems={setSortableItems}
                  sortableItems={sortableItems}
                  updateQuestion={updateQuestion}
                />
              )
            )}
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <SortingItemQuestion
              index={0}
              isDragging
              key={0}
              option={
                sortableItems.find(
                  (lesson: { id: string }) => lesson.id === activeId
                )?.item || ""
              }
              optionId="1"
              question={question}
              setSortableItems={setSortableItems}
              sortableItems={sortableItems}
              // eslint-disable-next-line @typescript-eslint/no-empty-function -- expected
              updateQuestion={() => {}}
            />
          ) : null}
        </DragOverlay>
        <input
          name="correctAnswers"
          type="hidden"
          value={sortableItems.map((item: { item: any }) => item.item)}
        />
      </DndContext>
      <div className="text-sm flex flex-col gap-2 items-start mt-4">
        La respuesta correcta se determina por el orden de los elementos. Por
        ejemplo:
        <ul className="flex flex-col items-start gap-1">
          <li>1. Do</li>
          <li>2. You</li>
          <li>3. like it?</li>
        </ul>
        Los estudiantes deberán ordenar estos elementos en esta secuencia
        específica.
      </div>
      <Button
        className="mt-2"
        onClick={() => {
          const newItem = {
            id: `item-${sortableItems.length || 0}`,
            item: "",
            position: (sortableItems.length || 0) + 1,
          };
          const updatedItems = [...(sortableItems || []), newItem];
          setSortableItems(updatedItems);
          updateQuestion(question.id, {
            settings: {
              ...question.settings,
              sortableItems: updatedItems.map((item) => item.item),
            },
          });
        }}
        type="button"
      >
        Agregar Opcion
      </Button>
      <input
        name="options"
        type="hidden"
        value={JSON.stringify(question.settings?.sortableItems)}
      />
      {/* <TagInput
        label="Respuesta correcta"
        placeholder="Agrega la respuesta correcta en orden"
        tags={correctAnswers}
        onTagsChange={(tags) => {
          setCorrectAnswers(tags);
          updateQuestion(question.id, {
            settings: {
              ...question.settings,
              correctAnswers: correctAnswers,
            },
          });
        }}
      /> */}
    </>
  );
}

function SortingItemQuestion({
  index,
  question,
  updateQuestion,
  option,
  optionId,
  isDragging,
  sortableItems,
  setSortableItems,
}: {
  index: number;
  option: string;
  optionId: string;
  isDragging: boolean;
  sortableItems: { id: string; item: string; position: number }[];
  setSortableItems: (
    items: { id: string; item: string; position: number }[]
  ) => void;
} & QuestionTypesProps): ReactNode {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isDraggingItem,
  } = useSortable({ id: optionId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDraggingItem ? 0.5 : 1,
  };

  return (
    <div
      className={cn("flex items-center space-x-2 mt-2", {
        "shadow-lg bg-accent": isDragging,
      })}
      ref={setNodeRef}
      style={style}
    >
      <GripVertical className="h-4 w-4" {...attributes} {...listeners} />
      <Input
        onChange={(e: { target: { value: any } }) => {
          const newValue = e.target.value;
          const updatedItems = sortableItems.map((item, i) =>
            i === index ? { ...item, item: newValue } : item
          );

          setSortableItems(updatedItems);
          updateQuestion(question.id, {
            settings: {
              ...question.settings,
              sortableItems: updatedItems.map((item) => item.item),
              correctAnswers: updatedItems.map((item) => item.item),
            },
          });
        }}
        placeholder={`Opcion ${index + 1}`}
        value={option}
      />
      <Button
        onClick={() => {
          const newOptions = question.settings?.sortableItems?.filter(
            (_: any, i: number) => i !== index
          );
          updateQuestion(question.id, {
            settings: {
              sortableItems: newOptions,
            },
          });
        }}
        size="icon"
        variant="neutral"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
