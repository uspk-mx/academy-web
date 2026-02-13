import React from "react";
import { RadioGroupCard } from "ui/components/radio-group-card";
import type { QuestionVariantType } from "./types";

export const TrueOrFalse = ({ onAnswer, savedAnswer }: QuestionVariantType) => {
  return (
    <RadioGroupCard
      className="flex flex-col xl:flex-row gap-6"
      onValueChange={(value) => onAnswer(value)}
      value={savedAnswer}
      options={[
        { label: "Verdadero", value: "true" },
        { label: "Falso", value: "false" },
      ]}
    />
  );
};
