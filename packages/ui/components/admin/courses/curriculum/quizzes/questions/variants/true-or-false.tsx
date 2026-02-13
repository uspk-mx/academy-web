import { Label } from "ui/components/index";
import { useState, type ReactNode } from "react";
import type { RadioGroupCardOptions } from "ui/components/radio-group-card";
import { RadioGroupCard } from "ui/components/radio-group-card";
import type { QuestionTypesProps } from "./types";

export function TrueOrFalseQuestion({
  question,
  updateQuestion,
}: QuestionTypesProps): ReactNode {
  const [correctAnswer, setCorrectAnswer] = useState(
    question.settings?.correctAnswers?.[0]
  );
  const options: RadioGroupCardOptions[] = [
    {
      value: "true",
      label: "Verdadero",
    },
    {
      value: "false",
      label: "Falso",
    },
  ];

  return (
    <div className="space-y-2 w-full">
      <Label>Respuesta correcta</Label>
      <RadioGroupCard
        defaultValue="true"
        name="correctAnswers"
        onValueChange={(value) => {
          setCorrectAnswer(value);
          updateQuestion(question.id, {
            ...question,
            settings: {
              ...question.settings,
              correctAnswers: [value],
            },
          });
        }}
        options={options}
        value={correctAnswer}
      />
      <input
        name="options"
        type="hidden"
        value={JSON.stringify(["true", "false"])}
      />
    </div>
  );
}
