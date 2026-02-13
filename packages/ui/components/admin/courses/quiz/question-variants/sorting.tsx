import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { QuestionVariantType } from "./types";

export const Sorting = ({
  onAnswer,
  sortingItems,
  setSortingItems,
}: QuestionVariantType & {
  sortingItems: string[];
  setSortingItems: (value: string[]) => void;
}) => {
  return (
    <DndContext
      onDragEnd={(event) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
          const oldIndex = sortingItems.indexOf(active.id as string);
          const newIndex = sortingItems.indexOf(over?.id as string);
          const newItems = arrayMove(sortingItems, oldIndex, newIndex);
          setSortingItems(newItems);
          onAnswer(newItems);
        }
      }}
    >
      <SortableContext items={sortingItems}>
        <ul className="space-y-2">
          {sortingItems.map((item) => (
            <SortableItem key={item} id={item}>
              {item}
            </SortableItem>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

function SortableItem({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 bg-gray-100 rounded"
    >
      {children}
    </li>
  );
}
