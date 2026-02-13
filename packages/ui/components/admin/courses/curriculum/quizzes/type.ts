export interface QuizDataType {
  id?: string;
  content?: string | null;
  title?: string;
  passingGrade?: number;
  timer?: number | null;
  timeUnit?: string | null;
  maxAttempts?: number | null;
}
