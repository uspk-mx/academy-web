import React, { useState } from "react";
import type { QuestionVariantType } from "./types";
import { Checkbox, Label } from "ui/components/index";

interface MultipleChoiceProps extends QuestionVariantType {
  selectedOptions: string[];
  onSelectedOptions: (string: []) => void;
}

export const MultipleChoice = ({
  question,
  savedAnswer,
  onAnswer,
  selectedOptions,
  onSelectedOptions,
}: MultipleChoiceProps) => {
  return (
    <div className="space-y-2" key={question.id}>
      <div className="grid md:grid-cols-2 gap-6">
        {question?.settings?.sortableItems?.map((item: string) => (
          <div
            key={item}
            className="border-input has-data-[state=checked]:border-ring relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none"
          >
            <Checkbox
              id={item}
              checked={selectedOptions.includes(item)}
              onCheckedChange={(checked) => {
                const newSelected = checked
                  ? [...selectedOptions, item]
                  : selectedOptions.filter((i) => i !== item);
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                onSelectedOptions(newSelected as any);
                onAnswer(newSelected);
              }}
            />
            <div className="grid grow gap-2">
              <Label htmlFor={item}>{item}</Label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
