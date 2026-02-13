import React from "react";
import { RadioGroupCard } from "ui/components/radio-group-card";
import type { QuestionVariantType } from "./types";

export const SingleChoice = ({
  onAnswer,
  question,
  savedAnswer,
}: QuestionVariantType) => {
  return (
    <RadioGroupCard
      className="grid md:grid-cols-2 gap-4"
      onValueChange={onAnswer}
      value={savedAnswer}
      options={
        question?.settings?.sortableItems?.map((item) => ({
          value: item,
          label: item,
        })) || []
      }
    />
  );
};
