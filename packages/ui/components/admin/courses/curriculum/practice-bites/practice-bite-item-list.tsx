import type { DragEndEvent } from "@dnd-kit/core";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2Icon } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "ui/components/button";
import { cn } from "ui/lib/utils";
import { PRACTICE_BITE_ITEM_TYPE_LABELS, type PracticeBiteItem } from "./types";

interface PracticeBiteItemListProps {
  items: PracticeBiteItem[];
  selectedItemId: string | null;
  onSelect: (item: PracticeBiteItem) => void;
  onRemove: (item: PracticeBiteItem) => void;
  onReorder: (items: PracticeBiteItem[]) => void;
}

function SortableItem({
  item,
  index,
  isSelected,
  onSelect,
  onRemove,
}: {
  item: PracticeBiteItem;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
}): ReactNode {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      className={cn(
        "group flex w-full items-center gap-2 rounded-lg border border-border p-2",
        isSelected ? "bg-main" : "hover:bg-[#FFDC58]/50",
      )}
      ref={setNodeRef}
      style={style}
    >
      <Button
        className="cursor-grab"
        size="icon"
        type="button"
        variant="ghost"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-4" />
      </Button>
      <button
        className="flex-1 min-w-0 text-left"
        onClick={onSelect}
        type="button"
      >
        <div className="truncate font-medium">
          {item.prompt || `Elemento ${index + 1}`}
        </div>
        <div className="truncate text-sm text-muted-foreground">
          {PRACTICE_BITE_ITEM_TYPE_LABELS[item.type]}
        </div>
      </button>
      <Button
        className="opacity-0 transition-opacity group-hover:opacity-100"
        onClick={(event) => {
          event.stopPropagation();
          onRemove();
        }}
        size="icon"
        type="button"
        variant="ghost"
      >
        <Trash2Icon className="size-4 text-destructive" />
      </Button>
    </div>
  );
}

export function PracticeBiteItemList({
  items,
  selectedItemId,
  onSelect,
  onRemove,
  onReorder,
}: PracticeBiteItemListProps): ReactNode {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const sortedItems = [...items].sort((a, b) => a.position - b.position);

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sortedItems.findIndex((item) => item.id === active.id);
      const newIndex = sortedItems.findIndex((item) => item.id === over.id);
      const reordered = arrayMove(sortedItems, oldIndex, newIndex).map(
        (item, index) => ({ ...item, position: index + 1 }),
      );
      onReorder(reordered);
    }
  };

  if (sortedItems.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Aún no hay elementos. Agrega el primero.
      </p>
    );
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="flex flex-col gap-2">
        <SortableContext
          items={sortedItems.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {sortedItems.map((item, index) => (
            <SortableItem
              index={index}
              isSelected={selectedItemId === item.id}
              item={item}
              key={item.id}
              onRemove={() => onRemove(item)}
              onSelect={() => onSelect(item)}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
