import type { Question } from "gql-generated/generated/types";

export interface QuestionVariantType {
  question: Question;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onAnswer: (answer: any) => void;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  savedAnswer?: any;
}
