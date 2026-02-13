import { Trash2 } from "lucide-react";
import { Input, Button } from "ui/components/index";
import { useEffect, useState, type ReactNode } from "react";
import { CustomCheckbox } from "../custom-checkbox";
import type { QuestionTypesProps } from "./types";

export function MultipleChoiceQuestion({
  question,
  updateQuestion,
}: QuestionTypesProps): ReactNode {
  const [correctAnswers, setCorrectAnswers] = useState<string[]>(
    question.settings?.correctAnswers || []
  );
  const [options, setOptions] = useState<string[]>(
    question.settings?.sortableItems || []
  );

  useEffect(() => {
    if (question.settings?.correctAnswers) {
      setCorrectAnswers(question.settings.correctAnswers);
    }
    if (question.settings?.sortableItems) {
      setOptions(question.settings.sortableItems);
    }
  }, [question.settings?.correctAnswers, question.settings?.sortableItems]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;

    setOptions(newOptions);
    updateQuestion(question.id, {
      settings: {
        ...question.settings,
        sortableItems: newOptions,
        correctAnswers,
      },
    });
  };

  const handleCheckboxChange = (option: string, checked: boolean) => {
    const newCorrectAnswers = checked
      ? [...correctAnswers, option]
      : correctAnswers.filter((a) => a !== option);

    setCorrectAnswers(newCorrectAnswers);
    updateQuestion(question.id, {
      settings: {
        ...question.settings,
        sortableItems: options, // Preserve options
        correctAnswers: newCorrectAnswers,
      },
    });
  };

  const handleRemoveOption = (index: number, option: string) => {
    const newOptions = options.filter((_, i) => i !== index);
    const newCorrectAnswers = correctAnswers.filter((a) => a !== option);

    setOptions(newOptions);
    setCorrectAnswers(newCorrectAnswers);
    updateQuestion(question.id, {
      settings: {
        ...question.settings,
        sortableItems: newOptions,
        correctAnswers: newCorrectAnswers,
      },
    });
  };

  const handleAddOption = () => {
    const newOptions = [...options, ""];

    setOptions(newOptions);
    updateQuestion(question.id, {
      settings: {
        ...question.settings,
        sortableItems: newOptions,
        correctAnswers,
      },
    });
  };

  return (
    <>
      {question.settings?.sortableItems?.map((option: any, index: any) => (
        <div className="mt-2 flex items-center space-x-2 w-full" key={index}>
          <Input
            onChange={(e) => {
              handleOptionChange(index, e.target.value);
            }}
            placeholder={`Option ${index + 1}`}
            value={option}
          />
          <CustomCheckbox
            checked={correctAnswers.includes(option)}
            className="sr-only"
            label={option}
            name={`correctAnswers-${option}`}
            onChange={(event) => {
              handleCheckboxChange(option, event.target.checked);
            }}
            type="checkbox"
            value={`correctAnswers-${option}`}
          />
          <Button
            onClick={() => {
              handleRemoveOption(index, option);
            }}
            size="icon"
            type="button"
            variant="neutral"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Button className="mt-2" onClick={handleAddOption} type="button">
        Agregar Opcion
      </Button>
    </>
  );
}
