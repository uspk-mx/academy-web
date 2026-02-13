import React, { Fragment } from "react";
import type { QuestionVariantType } from "./types";
import { Input } from "ui/components/index";

export const FillInTheBlanks = ({
  question,
  onAnswer,
  fillInTheBlanksAnswer,
  setFillInTheBlanksAnswer,
}: QuestionVariantType & {
  fillInTheBlanksAnswer: string[];
  setFillInTheBlanksAnswer: (value: string[]) => void;
}) => {
  const parts = question?.description?.split(/{dash}/g);
  return (
    <div className="space-y-2 mt-2">
      {parts?.map((part, index) => (
        <Fragment key={part}>
          <span>{part}</span>
          {index < parts.length - 1 && (
            <Input
              className="inline-block w-32 mx-1"
              value={fillInTheBlanksAnswer[index] || ""}
              onChange={(e) => {
                const newAnswers = [...fillInTheBlanksAnswer];
                newAnswers[index] = e.target.value;
                setFillInTheBlanksAnswer(newAnswers);
                onAnswer(newAnswers);
              }}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};
