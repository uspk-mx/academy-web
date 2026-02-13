import React from "react";
import { Textarea } from "ui/components/textarea";
import type { QuestionVariantType } from "./types";

export const Assesment = ({
  question,
  essayAnswer,
  setEssayAnswer,
  onAnswer,
}: QuestionVariantType & {
  essayAnswer: string;
  setEssayAnswer: (value: string) => void;
}) => {
  return (
    <Textarea
      value={essayAnswer}
      onChange={(e) => {
        setEssayAnswer(e.target.value);
        onAnswer(e.target.value);
      }}
      placeholder={`Write your ${question.type.toLowerCase()} here...`}
      className="mt-2"
    />
  );
};
