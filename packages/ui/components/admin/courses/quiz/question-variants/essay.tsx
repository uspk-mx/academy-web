import { Textarea } from "ui/components/textarea";
import type { QuestionVariantType } from "./types";

interface EssayProps extends QuestionVariantType {
  essayAnswer: string;
  setEssayAnswer: (value: string) => void;
}

export const Essay = ({
  savedAnswer,
  essayAnswer,
  onAnswer,
  setEssayAnswer,
}: EssayProps) => {
  return (
    <Textarea
      value={essayAnswer}
      onChange={(e) => {
        setEssayAnswer(e.target.value);
        onAnswer(e.target.value);
      }}
      placeholder="Write your essay here..."
      className="mt-2"
    />
  );
};
