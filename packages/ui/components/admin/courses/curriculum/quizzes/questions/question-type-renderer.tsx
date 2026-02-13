import type { ReactNode } from "react";
import type { QuestionType } from "gql-generated/generated/types";
import { InfoIcon } from "lucide-react";
import type { QuestionTypesProps } from "./variants";
import {
  TrueOrFalseQuestion,
  SingleChoiceQuestion,
  MultipleChoiceQuestion,
  FillInTheBlanksQuestion,
  SortingQuestion,
  MatrixSortingQuestion,
} from "./variants";

export function QuestionTypeRenderer({
  question,
  updateQuestion,
}: QuestionTypesProps): ReactNode {
  const QuestionTypeMap: Record<QuestionType, ReactNode> = {
    TRUE_FALSE: (
      <TrueOrFalseQuestion
        question={question}
        updateQuestion={updateQuestion}
      />
    ),
    SINGLE_CHOICE: (
      <SingleChoiceQuestion
        question={question}
        updateQuestion={updateQuestion}
      />
    ),
    MULTIPLE_CHOICE: (
      <MultipleChoiceQuestion
        question={question}
        updateQuestion={updateQuestion}
      />
    ),
    FILL_IN_THE_BLANKS: (
      <FillInTheBlanksQuestion
        question={question}
        updateQuestion={updateQuestion}
      />
    ),
    SORTING: (
      <SortingQuestion question={question} updateQuestion={updateQuestion} />
    ),
    FREE_CHOICE: <NonAnswerRequiredMessage />,
    ESSAY: <NonAnswerRequiredMessage />,
    ASSESSMENT: <NonAnswerRequiredMessage />,
    MATRIX_SORTING: (
      <MatrixSortingQuestion
        question={question}
        updateQuestion={updateQuestion}
      />
    ),
  };

  if (!question) return null;

  return QuestionTypeMap[question.type];
}

function NonAnswerRequiredMessage(): ReactNode {
  return (
    <div className="rounded-lg border border-blue-500/50 text-blue-600 px-4 py-3 my-3 w-full">
      <p className="text-sm">
        <InfoIcon
          className="-mt-0.5 me-3 inline-flex text-blue-500"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        No es necesaria ninguna opción para este tipo de respuesta
      </p>
    </div>
  );
}
