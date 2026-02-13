import type { ReactNode } from "react";
import { Textarea } from "ui/components/textarea";
import type { QuestionTypesProps } from "./types";

export function TextQuestion({
  question,
  updateQuestion,
}: QuestionTypesProps): ReactNode {
  return (
    <Textarea
      onChange={(e) =>
        { updateQuestion(question.id, {
          settings: {
            correctAnswers: [e.target.value],
          },
        }); }
      }
      placeholder="Model answer or grading rubric"
      value={question.settings?.correctAnswers?.[0] as string}
    />
  );
}
