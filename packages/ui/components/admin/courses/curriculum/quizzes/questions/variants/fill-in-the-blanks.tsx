import { Button, Input, Label } from "ui/components/index";
import type { ReactNode } from "react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Textarea } from "ui/components/textarea";
import type { QuestionTypesProps } from "./types";
import { MinimalTiptapEditor } from "ui/components/minimal-tiptap-editor";
import type { Content } from "@tiptap/react";
import FileUploader from "ui/components/file-uploader";
import { useFileUploaderContext } from "ui/context/file-uploader-context";

export function FillInTheBlanksQuestion({
  question,
  updateQuestion,
}: QuestionTypesProps): ReactNode {
  const textRef = useRef<HTMLDivElement | null>(null);
  const [description, setDescription] = useState<Content>(
    question.description || ""
  );
  const { setFileUrls } = useFileUploaderContext();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (question.media) {
      setFileUrls([question.media]);
    } else {
      setFileUrls([]);
    }
  }, [question.id, setFileUrls]);

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex flex-col gap-2 w-full">
        <Label className="mt-4">
          Sube material de apoyo para tu pregunta {"(opcional)"}
        </Label>

        <FileUploader
          title="Arrastra tu archivo multimedia aqui."
          triggerLabel="Subir archivo"
          formatsLabel="MP4, MP3, JPG, PNG, MOV"
          acceptedFormats=".jpg,.jpeg,.png,.mp3,.mp4,.mov"
          initialMedia={question.media}
          key={question.id}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="mt-4">
          Usa variables {"{dash}"} para los espacios a rellenar en el texto de
          la pregunta.
        </Label>
        <MinimalTiptapEditor
          showMediaActions={false}
          autofocus
          className="w-full"
          editable
          editorClassName="focus:outline-none"
          editorContentClassName="p-5"
          onChange={(description) => {
            setDescription(description);
            updateQuestion(question.id, {
              description: description?.toString(),
            });
          }}
          ref={textRef}
          output="html"
          placeholder="Ingresa la pregunta con variables {dash} para espacios en blanco"
          value={description || ""}
        />
        <input name="content" type="hidden" value={description as string} />

        <div>
          <Button
            onClick={() => {
              if (!textRef.current) return;
              textRef.current.focus();
              const editor = textRef.current.querySelector(".text-node");
              if (!editor) return;
              const dash = " {dash}";
              editor.innerHTML = description + dash;
            }}
            type="button"
          >
            Agregar variable
          </Button>
        </div>
        <Label htmlFor="correctAnswers" className="mt-2 font-semibold">
          Respuestas correctas
        </Label>
        <Input
          name="correctAnswers"
          onChange={(e) => {
            updateQuestion(question.id, {
              settings: { correctAnswers: [e.target.value] },
            });
          }}
          placeholder="Respuestas correctas (separadas por barras |), ex. Manzana|Perro|Gato"
          value={
            question.settings?.correctAnswers?.map((item) =>
              item.replace(/[\s,]+/g, "|")
            ) || []
          }
        />

        <div className="text-sm">
          <span className="font-bold">Recuerda: </span>
          Las respuestas correctas deben estar separadas por barras, por
          ejemplo: <span className="font-bold">Manzana|Perro|Gato </span>. No se
          permiten espacios ni otros símbolos.
        </div>
      </div>
    </div>
  );
}
const dashRegex = /\{dash\}/g;

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO: delete later
function HighlightedTextarea({
  question,
  updateQuestion,
}: QuestionTypesProps): ReactNode {
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [description, setDescription] = useState(question.description);

  // Function to replace {dash} with highlighted text
  const formatTextWithDash = (text?: string): ReactNode => {
    if (!text) return;
    const parts = text.split(dashRegex);

    return parts.map((part, index) => (
      <Fragment key={part}>
        {part}
        {index < parts.length - 1 && (
          <span className="font-bold text-red-500">{"{dash}"}</span>
        )}
      </Fragment>
    ));
  };

  return (
    <div className="mt-4">
      <Label className="mb-2">
        Usa variables {"{dash}"} para los espacios a rellenar en el texto de la
        pregunta.
      </Label>

      <Textarea
        className="mt-2"
        name="question_description"
        onChange={(e) => {
          setDescription(e.target.value);
          updateQuestion(question.id, { description: e.target.value });
        }}
        placeholder="Ingresa la pregunta con variables {dash} para espacios en blanco"
        ref={textRef}
        value={description || ""}
      />

      <div className="mt-4 rounded-sm border bg-gray-100 p-2">
        {formatTextWithDash(description || "")}
      </div>
    </div>
  );
}
