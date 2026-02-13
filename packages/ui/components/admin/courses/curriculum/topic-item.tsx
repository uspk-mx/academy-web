import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BookIcon, GripVertical, MenuIcon, PuzzleIcon } from "lucide-react";
import { type ReactNode } from "react";
import { Badge } from "ui/components/badge";
import { Button } from "ui/components/button";
import { Card, CardContent } from "ui/components/card";
import { useHover } from "ui/hooks/use-hover";
import { cn } from "ui/lib/utils";

interface TopicItemProps {
  id: string;
  title: string;
  variant: "LESSON" | "QUIZ";
  isDragging?: boolean;
  actions?: ReactNode;
  isVisible?: boolean;
  questionsQuantity?: number;
}

export function TopicItem({
  variant,
  id,
  actions,
  title,
  isVisible,
  isDragging,
  questionsQuantity,
}: TopicItemProps): ReactNode {
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
    return variant === "LESSON" ? (
      <BookIcon className="text-blue-600" />
    ) : (
      <PuzzleIcon className="text-yellow-500" />
    );
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
          type="button"
          variant="ghost"
          {...attributes}
          {...listeners}
        >
          {getCardIcon()}
        </Button>

        <div className="flex-1 truncate">
          {variant === "LESSON" ? (
            <h3 className="text-base font-semibold">{title}</h3>
          ) : (
            <div className="flex items-center gap-4">
              <h3 className="text-base font-semibold">{title}</h3>
              {questionsQuantity ? (
                <Badge className="min-w-6 justify-center rounded-full px-1">
                  {questionsQuantity}
                </Badge>
              ) : null}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">{actions}</div>
      </CardContent>
    </Card>
  );
}
