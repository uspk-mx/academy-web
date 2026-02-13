import { useId, useState, type ReactNode } from "react";
import { MinimalTiptapEditor } from "ui/components/minimal-tiptap-editor";
import type { Content } from "@tiptap/react";
import { QuestionType } from "gql-generated/generated/types";
import { Label } from "ui/components/label";
import { Input } from "ui/components/input";
import { useCharacterLimit } from "ui/hooks/use-character-limit";
import { AutoGrowTextarea } from "ui/components/autogrow-textarea";
import type { QuestionTypesProps } from "./variants";
import { QuestionTypeRenderer } from "./question-type-renderer";

export function QuestionForm({
  question,
  updateQuestion,
}: QuestionTypesProps): ReactNode {
  const id = useId();
  const [content, setContent] = useState<Content>(question.description || "");
  const maxLength = 60;
  const {
    value,
    maxLength: limit,
    handleChange,
    characterCount,
  } = useCharacterLimit({
    maxLength,
    initialValue: question.title || "",
  });

  const ANSWER_EXPLANATION_MAX_LENGTH = 180;
  const {
    value: answerExplanationValue,
    characterCount: answerExplanationCharacterCount,
    handleChange: onChangeAnswerExplanation,
    maxLength: answerExplanationLimit,
  } = useCharacterLimit({ maxLength: ANSWER_EXPLANATION_MAX_LENGTH, initialValue: question.answerExplanation || "" });

  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <div className="space-y-2 w-full">
        <Label htmlFor={id}>Titulo</Label>
        <div className="relative">
          <Input
            aria-describedby={`${id}-description`}
            className="pe-14 peer"
            id={id}
            maxLength={maxLength}
            name="title"
            onChange={(e) => {
              handleChange(e);
              updateQuestion(question.id, { title: e.target.value });
            }}
            type="text"
            value={value}
          />
          <div
            aria-live="polite"
            className="absolute inset-y-0 flex justify-center items-center peer-disabled:opacity-50 text-muted-foreground text-xs pointer-events-none end-0 pe-3 tabular-nums"
            id={`${id}-description`}
            // biome-ignore lint/a11y/useSemanticElements: <explanation>
            role="status"
          >
            {characterCount}/{limit}
          </div>
        </div>
      </div>
      {question.type !== QuestionType.FillInTheBlanks ? (
        <div className="space-y-2 w-full">
          <Label htmlFor={id} data-question-type={question.type}>
            Descripcion
          </Label>
          <MinimalTiptapEditor
            autofocus
            className="w-full"
            editable
            editorClassName="focus:outline-none"
            editorContentClassName="p-5"
            showMediaActions
            onChange={(description) => {
              setContent(description);
              updateQuestion(question.id, {
                description: description?.toString(),
              });
            }}
            output="html"
            placeholder="Type your description here..."
            value={content}
          />
          <input name="content" type="hidden" value={content as string} />
        </div>
      ) : null}
      <QuestionTypeRenderer
        question={question}
        updateQuestion={updateQuestion}
      />

      <div className="w-full">
        <AutoGrowTextarea
          label="Explicacion de la respuesta"
          maxRows={8}
          name="answerExplanation"
          onChange={(e) => {
            onChangeAnswerExplanation(e);
            updateQuestion(question.id, { answerExplanation: e.target.value });
          }}
          rows={3}
          value={answerExplanationValue}
        />
        <p
          aria-live="polite"
          className="mt-2 text-right text-xs text-muted-foreground"
          id={`${id}-description`}
          // biome-ignore lint/a11y/useSemanticElements: <explanation>
          role="status"
        >
          <span className="tabular-nums">
            {answerExplanationLimit - answerExplanationCharacterCount}
          </span>{" "}
          caracteres disponibles
        </p>
      </div>
    </div>
  );
}
