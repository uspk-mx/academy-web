import { useEffect, useState, type ReactNode } from "react";
import { Input } from "ui/components/input";
import { Label } from "ui/components/label";
import { Switch } from "ui/components/switch";
import { questionTypesMap } from "./question-selector";
import type { QuestionTypesProps } from "./variants";

export function QuestionSettings({
  question,
  updateQuestion,
}: QuestionTypesProps): ReactNode {
  const [questionMark, setQuestionMark] = useState(question.mark || 0);

  useEffect(() => {
    setQuestionMark(question.mark || 0);
  }, [question]);

  const handleSettingChange = (
    field: string,
    value: boolean | string | number
  ): void => {
    updateQuestion(question.id, {
      ...question,
      settings: {
        ...question.settings,
        [field]: value,
      },
    });
  };

  const updateQuestionMark = (value: number) => {
    updateQuestion(question.id, {
      ...question,
      mark: value || 0,
      settings: {
        ...question.settings,
        questionMark: value || 0,
      },
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 border-b border-border pb-6 px-6">
        <span>Tipo de pregunta</span>
        {questionTypesMap
          .filter((item) => item.type === question.type)
          .map((q) => (
            <div className="flex gap-4 items-center" key={q.displayName}>
              {q.icon}
              <span>{q.displayName}</span>
            </div>
          ))}
      </div>
      <div className="space-y-6 mt-6 px-6">
        <h3 className="font-semibold mb-4">Ajustes de preguntas</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="answerRequired">Respuesta requirada</Label>
            <Switch
              checked={question.settings?.answerRequired || false}
              id="answerRequired"
              name="answerRequired"
              onCheckedChange={(checked) => {
                handleSettingChange("answerRequired", checked);
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="randomizeQuestion">Elección aleatoria</Label>
            <Switch
              checked={question.settings?.randomizeQuestion || false}
              id="randomizeQuestion"
              name="randomizeQuestion"
              onCheckedChange={(checked) => {
                handleSettingChange("randomizeQuestion", checked);
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="questionMark">Puntos para esta pregunta</Label>
            <Input
              id="mark"
              min="0"
              name="mark"
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                updateQuestionMark(value);
                setQuestionMark(value);
              }}
              type="number"
              value={questionMark}
            />
            <input
              className="hidden"
              min="0"
              name="questionMark"
              onChange={(e) => {
                handleSettingChange("questionMark", questionMark);
              }}
              type="number"
              value={questionMark}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="showQuestionMark">Puntos de visualización</Label>
            <Switch
              checked={question.settings?.showQuestionMark || false}
              id="showQuestionMark"
              name="showQuestionMark"
              onCheckedChange={(checked) => {
                handleSettingChange("showQuestionMark", checked);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
