import { Button, Input } from "ui/components/index";
import { Trash2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { RadioGroup, RadioGroupItem } from "ui/components/radio-group";
import type { QuestionTypesProps } from "./types";

export function SingleChoiceQuestion({
  question,
  updateQuestion,
}: QuestionTypesProps): ReactNode {
  const [options, setOptions] = useState(
    question.settings?.sortableItems || []
  );

  const handleAddOption = () => {
    const newOptions = [...options, ""];
    setOptions(newOptions);
    updateQuestion(question.id, {
      settings: {
        ...question.settings,
        sortableItems: newOptions,
      },
    });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    updateQuestion(question.id, {
      settings: {
        ...question.settings,
        sortableItems: newOptions,
      },
    });
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    updateQuestion(question.id, {
      settings: {
        ...question.settings,
        sortableItems: newOptions,
      },
    });
  };

  return (
    <>
      {options.map((option, index) => (
        <div className="flex items-center space-x-2 mt-2 w-full" key={index}>
          <Input
            name="answer_text"
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Opción ${index + 1}`}
            value={option}
          />
          <RadioGroup
            onValueChange={(value) => {

              updateQuestion(question.id, {
                settings: {
                  ...question.settings,
                  correctAnswers: [value],
                },
              });
            }}
            value={question.settings?.correctAnswers?.[0] || ""}
          >
            <RadioGroupItem
              id={`correct-${question.id}-${index}`}
              value={option}
            />
          </RadioGroup>
          <Button
            onClick={() => handleRemoveOption(index)}
            size="icon"
            type="button"
            variant="neutral"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <input
        name="options"
        type="hidden"
        value={JSON.stringify(question.settings?.sortableItems)}
      />
      <Button className="mt-2" onClick={handleAddOption} type="button">
        Agregar Opcion
      </Button>
    </>
  );
}
