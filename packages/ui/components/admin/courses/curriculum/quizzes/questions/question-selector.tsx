import { QuestionType } from "gql-generated/generated/types";
import {
  Check,
  CheckCheck,
  CircleSlash,
  Clock,
  Plus,
  SortAscIcon,
  SortDesc,
  Text,
  TextCursor,
} from "lucide-react";
import type { ReactNode } from "react";
import { Fragment, useState } from "react";
import { Button } from "ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "ui/components/dropdown-menu";

interface QuestionTypeInfo {
  type: QuestionType;
  icon: ReactNode;
  displayName: string;
  description: string;
  hasOptions: boolean;
}

export const questionTypesMap: QuestionTypeInfo[] = [
  {
    type: QuestionType.TrueFalse,
    icon: (
      <div className="flex items-center justify-center rounded-sm bg-blue-500 p-2">
        <CircleSlash className="size-4" />
      </div>
    ),
    displayName: "Verdadero / Falso",
    description: "Pregunta de una sola respuesta",
    hasOptions: false,
  },
  {
    type: QuestionType.SingleChoice,
    icon: (
      <div className="flex items-center justify-center rounded-sm bg-green-500 p-2">
        <Check className="size-4" />
      </div>
    ),
    displayName: "Single Choice",
    description: "Select one option from a list of choices",
    hasOptions: true,
  },
  {
    type: QuestionType.MultipleChoice,
    icon: (
      <div className="flex items-center justify-center rounded-sm bg-green-500 p-2">
        <CheckCheck className="size-4" />
      </div>
    ),
    displayName: "Multiple Choice",
    description: "Select one or more options from a list of choices",
    hasOptions: true,
  },
  {
    type: QuestionType.FreeChoice,
    icon: (
      <div className="flex items-center justify-center rounded-sm bg-red-500 p-2">
        <Text className="size-4" />
      </div>
    ),
    displayName: "Free Choice",
    description: "Enter a free-form text response",
    hasOptions: false,
  },
  {
    type: QuestionType.MatrixSorting,
    icon: (
      <div className="flex items-center justify-center rounded-sm bg-red-500 p-2">
        <SortAscIcon className="size-4" />
      </div>
    ),
    displayName: "Matrix Sorting",
    description: "Sort items into a matrix of categories",
    hasOptions: true,
  },
  {
    type: QuestionType.Sorting,
    icon: (
      <div className="flex items-center justify-center rounded-sm bg-indigo-500 p-2">
        <SortDesc className="size-4" />
      </div>
    ),
    displayName: "Sorting",
    description: "Arrange items in a specific order",
    hasOptions: true,
  },
  {
    type: QuestionType.FillInTheBlanks,
    icon: (
      <div className="flex items-center justify-center rounded-sm bg-pink-500 p-2">
        <Clock className="size-4" />
      </div>
    ),
    displayName: "Fill in the Blanks",
    description: "Complete a sentence or paragraph by filling in missing words",
    hasOptions: false,
  },
  {
    type: QuestionType.Assessment,
    icon: (
      <div className="flex items-center justify-center rounded-sm bg-orange-500 p-2">
        <Text className="size-4" />
      </div>
    ),
    displayName: "Assessment",
    description: "Evaluate or rate something based on given criteria",
    hasOptions: true,
  },
  {
    type: QuestionType.Essay,
    icon: (
      <div className="flex items-center justify-center rounded-sm bg-purple-500 p-2">
        <TextCursor className="size-4" />
      </div>
    ),
    displayName: "Essay",
    description: "Write a longer, structured response to a prompt",
    hasOptions: false,
  },
];

export function QuestionSelector({
  questionType,
  onQuestionTypeChange,
}: {
  questionType: QuestionType;
  onQuestionTypeChange: (value: QuestionType) => void;
}): ReactNode {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Open edit menu"
          className="rounded-full shadow-none"
          size="icon"
          variant="ghost"
        >
          <Plus aria-hidden="true" size={16} strokeWidth={2} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pb-2">
        <DropdownMenuLabel>Selecciona el tipo de pregunta</DropdownMenuLabel>
        {questionTypesMap.map((question) => (
          <Fragment key={question.displayName}>
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
                onQuestionTypeChange(question.type);
                setOpen(false);
              }}
            >
              <div
                aria-hidden="true"
                className="flex size-8 items-center justify-center rounded-lg border border-border bg-background"
              >
                {question.icon}
              </div>
              <div>
                <div className="text-sm font-medium">
                  {question.displayName}
                </div>
                <div className="text-xs text-muted-foreground">
                  {question.description}
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="last-of-type:hidden" />
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
