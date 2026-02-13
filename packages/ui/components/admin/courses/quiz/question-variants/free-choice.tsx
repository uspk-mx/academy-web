import { Input } from "ui/components/index";
import type { QuestionVariantType } from "./types";

export const FreeChoice = ({
  freeChoiceAnswer,
  onAnswer,
  setFreeChoiceAnswer,
}: QuestionVariantType & {
  setFreeChoiceAnswer: (value: string) => void;
  freeChoiceAnswer: string;
}) => {
  return (
    <Input
      value={freeChoiceAnswer}
      onChange={(e) => {
        setFreeChoiceAnswer(e.target.value);
        onAnswer(e.target.value);
      }}
      placeholder="Enter your answer..."
      className="mt-2"
    />
  );
};
