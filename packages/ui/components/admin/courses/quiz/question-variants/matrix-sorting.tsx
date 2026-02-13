import React from "react";
import type { QuestionVariantType } from "./types";
import { Input } from "ui/components/index";

export const MatrixSorting = ({
  question,
  setMatrixAnswers,
  onAnswer,
  matrixAnswers,
}: QuestionVariantType & {
  matrixAnswers: string[];
  setMatrixAnswers: (value: string[]) => void;
}) => {
  return (
    <div className="space-y-4">
      {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
      {question?.settings?.matrixMatches?.map((match: any, index: number) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <div key={index} className="flex items-center space-x-4">
          <span className="font-medium">{match.columnA}</span>
          <Input
            value={matrixAnswers[index] || ""}
            onChange={(e) => {
              const newAnswers = [...matrixAnswers];
              newAnswers[index] = e.target.value;
              setMatrixAnswers(newAnswers);
              onAnswer(newAnswers);
            }}
            placeholder="Enter matching item"
          />
        </div>
      ))}
    </div>
  );
};
