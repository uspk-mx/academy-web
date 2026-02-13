import { Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Button, Input } from "ui/components/index";
import type { QuestionTypesProps } from "./types";

export function MatrixSortingQuestion({
  question,
  updateQuestion,
}: QuestionTypesProps): ReactNode {
  const [options, setOptions] = useState(
    question.settings?.sortableItems || []
  );

  // This method will generate the correct_answer array based on the matrix matches
  const matrixMatches = options.map((option) => {
    const [columnA, columnB] = option.split("::");
    return { columnA: columnA.trim() ?? "", columnB: columnB.trim() ?? "" };
  });

  const correctAnswers = options.map((option) => {
    const [columnA, columnB] = option.split("::");
    return `${columnA.trim()}:${columnB.trim()}`;
  });

  const handleUpdateOptions = (
    index: number,
    columnA: string,
    columnB: string
  ): void => {
    const newOptions = [...options];
    newOptions[index] = `${columnA}::${columnB}`;
    setOptions(newOptions);
    updateQuestion(question.id, {
      settings: {
        sortableItems: newOptions,
        matrixMatches,
        correctAnswers,
      },
    });
  };

  const handleAddPair = (): void => {
    setOptions([...options, "::"]);
    updateQuestion(question.id, {
      settings: { sortableItems: [...options, "::"] },
    });
  };

  const handleRemovePair = (index: number): void => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    updateQuestion(question.id, { settings: { sortableItems: newOptions } });
  };

  return (
    <>
      {question.settings?.sortableItems?.map((option, index) => {
        const [columnA, columnB] = option.split("::");
        return (
          <div className="mt-2 flex items-center space-x-2" key={index}>
            <Input
              onChange={(e) => {
                handleUpdateOptions(index, e.target.value, columnB);
              }}
              placeholder={`Elemento ${index + 1} (Column A)`}
              value={columnA || ""}
            />
            <Input
              onChange={(e) => {
                handleUpdateOptions(index, columnA, e.target.value);
              }}
              placeholder={`Par para Elemento ${index + 1} (Column B)`}
              value={columnB || ""}
            />
            <Button
              onClick={() => {
                handleRemovePair(index);
              }}
              size="sm"
              type="button"
              variant='ghost'
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      })}
      <input
        name="matrix_matches"
        type="hidden"
        value={JSON.stringify(matrixMatches)}
        onChange={(e) => {
          console.log("matrix_matches: ", e.target.value);
        }}
      />
      <input
        name="correct_answer"
        type="hidden"
        value={JSON.stringify(correctAnswers)}
        onChange={(e) => {
          console.log("correctAnswer: ", e.target.value);
        }}
      />
      <Button className="mt-2" onClick={handleAddPair} type="button">
        Agregar Par
      </Button>
    </>
  );
}
