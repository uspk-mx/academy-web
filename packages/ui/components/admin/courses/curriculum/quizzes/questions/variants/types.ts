import type { Question } from "gql-generated/generated/types";

export interface QuestionTypesProps {
  question: Question;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
}
