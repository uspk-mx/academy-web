import type { Question } from "gql-generated/generated/types";
import { Button } from "ui/components/button";
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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "ui/lib/utils";
import { questionTypesMap } from "./question-selector";

interface QuestionListProps {
  questions: any[];
  selectedQuestion: Question | null;
  onQuestionSelect: (question: Question) => void;
  onQuestionRemove: (questionId: string) => void;
  onQuestionsReorder?: (questions: any[]) => void;
}

function SortableQuestionItem({
  question,
  index,
  isSelected,
  onSelect,
  onRemove,
  isVisible,
}: {
  question: Question;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  isVisible: boolean;
}): ReactNode {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const typeInfo = questionTypesMap.find((t) => t.type === question.type);

  return (
    <div
      className={cn(
        "group flex w-full items-center gap-3 rounded-lg p-3 overflow-hidden",
        isSelected ? "bg-main" : "hover:bg-[#FFDC58]/50",
        isDragging && "opacity-50",
        !isVisible && "hidden"
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
        <GripVertical className="h-4 w-4" />
      </Button>
      <button
        className="flex-1 flex items-center gap-3 text-left"
        onClick={onSelect}
        type="button"
      >
        <div className="shrink-0">{typeInfo?.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate max-w-28">
            {question.title || `Question ${index + 1}`}
          </div>
          <div className="text-sm text-muted-foreground truncate">
            {typeInfo?.displayName}
          </div>
        </div>
      </button>
      <Button
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        size="icon"
        variant="ghost"
        type="button"
      >
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}

export default function QuestionList({
  questions,
  selectedQuestion,
  onQuestionSelect,
  onQuestionRemove,
  onQuestionsReorder,
}: QuestionListProps): ReactNode {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  // Sort questions by order before rendering
  const sortedQuestions = [...questions].sort((a, b) => a.order - b.order);

  const handleDragStart = (event: DragStartEvent): void => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent): Promise<void> => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sortedQuestions.findIndex(
        (question) => question.id === active.id
      );
      const newIndex = sortedQuestions.findIndex(
        (question) => question.id === over.id
      );

      const newQuestions = arrayMove(sortedQuestions, oldIndex, newIndex).map(
        (item, index) => ({
          ...item,
          order: index + 1,
        })
      );

      onQuestionsReorder?.(newQuestions);
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <div className="space-y-2 w-full">
        <SortableContext
          items={sortedQuestions.map((question) => question.id)}
          strategy={verticalListSortingStrategy}
        >
          {sortedQuestions.map((question, index) => (
            <SortableQuestionItem
              index={index}
              isSelected={selectedQuestion?.id === question.id}
              isVisible
              key={`question-${question.id}`}
              onRemove={() => {
                onQuestionRemove(question.id);
              }}
              onSelect={() => {
                onQuestionSelect(question);
              }}
              question={question}
            />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <SortableQuestionItem
              index={0}
              isSelected={sortedQuestions.find((item) => item.id === activeId)}
              isVisible
              onRemove={() => {}}
              onSelect={() => {}}
              question={sortedQuestions.find((item) => item.id === activeId)}
            />
          ) : null}
        </DragOverlay>
        {questions.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            Sin preguntas agregadas aun
          </div>
        )}
      </div>
    </DndContext>
  );
}
