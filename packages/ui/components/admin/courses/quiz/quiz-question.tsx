import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Fragment, type ReactNode, useEffect, useMemo, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Input } from "ui/components/index";
import { Checkbox } from "ui/components/checkbox";
import { HtmlRenderer } from "ui/components/html-renderer";
import { Label } from "ui/components/label";
import { RadioGroupCard } from "ui/components/radio-group-card";
import { Textarea } from "ui/components/textarea";
import { type Question, QuestionType } from "gql-generated/generated/types";

interface QuizQuestionProps {
  question: Question;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onAnswer: (answer: any) => void;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  savedAnswer?: any;
  questionContent?: ReactNode;
}

export default function QuizQuestion({
  question,
  onAnswer,
  savedAnswer,
  questionContent,
}: QuizQuestionProps) {
  const [essayAnswer, setEssayAnswer] = useState(savedAnswer || "");
  const [assesmentAnswer, setAssesmentAnswer] = useState(savedAnswer || "");
  const [freeChoiceAnswer, setFreeChoiceAnswer] = useState(savedAnswer || "");
  const [fillInTheBlanksAnswer, setFillInTheBlanksAnswer] = useState<string[]>(
    savedAnswer || []
  );
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>(
    Array.isArray(savedAnswer) ? savedAnswer : []
  );
  const [sortingItems, setSortingItems] = useState<string[] | undefined | null>(
    Array.isArray(savedAnswer) ? savedAnswer : question?.settings?.sortableItems
  );
  const [matrixAnswers, setMatrixAnswers] = useState<string[]>(
    savedAnswer || []
  );

  const modifiedQuestionContent = useMemo(() => {
    if (question.type === QuestionType.FillInTheBlanks) {
      return extractOnlyMedia(question.description || "");
    }
    return question.description;
  }, [question.type, question.description]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    if (question?.settings?.sortableItems) {
      setSortingItems(
        question.settings.sortableItems.sort(() => Math.random() - 0.5)
      );
    }
  }, [question]);

  useEffect(() => {
    setEssayAnswer("");
    setAssesmentAnswer("");
    setFreeChoiceAnswer("");
    setFillInTheBlanksAnswer([]);
    setSelectedCheckboxes([]);
    setSortingItems(question?.settings?.sortableItems || []);
    setMatrixAnswers([]);

    if (savedAnswer !== undefined) {
      switch (question.type) {
        case QuestionType.Essay:
        case QuestionType.Assessment:
        case QuestionType.FreeChoice:
          setEssayAnswer(savedAnswer);
          break;
        case QuestionType.FillInTheBlanks:
          setFillInTheBlanksAnswer(
            Array.isArray(savedAnswer) ? savedAnswer : []
          );
          break;
        case QuestionType.MultipleChoice:
          setSelectedCheckboxes(Array.isArray(savedAnswer) ? savedAnswer : []);
          break;
        case QuestionType.Sorting:
          setSortingItems(
            Array.isArray(savedAnswer)
              ? savedAnswer
              : question?.settings?.sortableItems || []
          );
          break;
        case QuestionType.MatrixSorting:
          setMatrixAnswers(Array.isArray(savedAnswer) ? savedAnswer : []);
          break;
      }
    }
  }, [savedAnswer, question.type, question?.settings?.sortableItems]);

  if (!question || !question.type || !question.settings) {
    return <div>Error: Invalid question data</div>;
  }

  const renderQuestionType = () => {
    switch (question.type) {
      case QuestionType.MultipleChoice:
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
                    checked={selectedCheckboxes.includes(item)}
                    onCheckedChange={(checked) => {
                      const newSelected = checked
                        ? [...selectedCheckboxes, item]
                        : selectedCheckboxes.filter((i) => i !== item);
                      setSelectedCheckboxes(newSelected);
                      onAnswer(newSelected);
                    }}
                  />
                  <div className="grid grow gap-1.5">
                    <Label htmlFor={item} className="cursor-pointer">
                      {item}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case QuestionType.SingleChoice:
        return (
          <RadioGroupCard
            className="grid md:grid-cols-2 gap-4"
            onValueChange={onAnswer}
            value={savedAnswer}
            options={
              question?.settings?.sortableItems?.map((item: string) => ({
                value: item,
                label: item,
              })) || []
            }
          />
        );

      case QuestionType.TrueFalse:
        return (
          <RadioGroupCard
            className="flex flex-col xl:flex-row gap-6"
            onValueChange={(value) => onAnswer(value)}
            value={savedAnswer}
            options={[
              { label: "Verdadero", value: "true" },
              { label: "Falso", value: "false" },
            ]}
          />
        );

      case QuestionType.Essay:
        return (
          <Textarea
            value={essayAnswer}
            onChange={(e) => {
              setEssayAnswer(e.target.value);
              onAnswer(e.target.value);
            }}
            placeholder="Write your essay here..."
            className="mt-2"
          />
        );

      case QuestionType.FreeChoice:
        return (
          <Input
            value={freeChoiceAnswer}
            onChange={(e) => {
              setFreeChoiceAnswer(e.target.value);
              onAnswer(e.target.value);
            }}
            placeholder="Enter your answer..."
            className="mt-2"
          />
        );
      case QuestionType.FillInTheBlanks: {
        const parts = question?.description?.split(/{dash}/g);
        return (
          <div className="flex flex-col items-start">
            <QuestionMediaRenderer
              media={question.media ?? ""}
              altText={question.title}
              key={question.id}
            />
            <div className="flex flex-col items-start md:flex-row md:items-center gap-2 mt-2">
              {parts?.map((part: string, index: number) => {
                return (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <Fragment key={index}>
                    <Markdown
                      rehypePlugins={[rehypeRaw]}
                      components={{ img: () => null }}
                      remarkRehypeOptions={{ allowDangerousHtml: true }}
                    >
                      {part}
                    </Markdown>
                    {index < parts.length - 1 && (
                      <Input
                        key={`input-${index}-${question.id}`}
                        className="inline-block h-8 w-32 mx-1"
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
                );
              })}
            </div>
          </div>
        );
      }
      case QuestionType.Sorting:
        return (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={(event) => {
              const { active, over } = event;
              if (active.id !== over?.id) {
                if (!sortingItems) return;
                const oldIndex = sortingItems.indexOf(active.id as string);
                const newIndex = sortingItems.indexOf(over?.id as string);
                const newItems = arrayMove(sortingItems, oldIndex, newIndex);
                setSortingItems(newItems);
                onAnswer(newItems);
              }
            }}
            sensors={sensors}
          >
            <SortableContext
              items={sortingItems || []}
              strategy={verticalListSortingStrategy}
            >
              <ul className="space-y-2">
                {sortingItems?.map((item, index) => (
                  <SortableItem key={item} id={item}>
                    {index + 1}. {item}
                  </SortableItem>
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        );

      case QuestionType.MatrixSorting:
        return (
          <div className="space-y-4">
            {question?.settings?.matrixMatches?.map(
              (
                match: {
                  columnA: string;
                  columnB: string;
                },
                index: number
              ) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <div key={index} className="flex items-center space-x-4">
                  <span className="font-medium min-w-[120px]">
                    {match.columnA}
                  </span>
                  <Input
                    value={matrixAnswers[index] || ""}
                    onChange={(e) => {
                      const newAnswers = [...matrixAnswers];
                      newAnswers[index] = e.target.value;
                      setMatrixAnswers(newAnswers);
                      onAnswer(newAnswers);
                    }}
                    placeholder="Escribe la respuesta correspondiente"
                    className="flex-1"
                  />
                </div>
              )
            )}
          </div>
        );

      case QuestionType.Assessment:
        return (
          <Textarea
            value={assesmentAnswer}
            onChange={(e) => {
              setAssesmentAnswer(e.target.value);
              onAnswer(e.target.value);
            }}
            placeholder={`Write your ${question.type.toLowerCase()} here...`}
            className="mt-2"
          />
        );
      default:
        return <p>Tipo de pregunta no soportado</p>;
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{question.title}</h2>
      {modifiedQuestionContent && (
        <HtmlRenderer
          key={question.title}
          content={modifiedQuestionContent}
          className="mb-6"
        />
      )}
      {renderQuestionType()}
      {question.settings.showQuestionMark && (
        <div className="mt-6 inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-sm">
          <span className="text-gray-700">Puntos: {question.mark}</span>
        </div>
      )}
    </div>
  );
}

function SortableItem({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 bg-gray-100 rounded"
    >
      {children}
    </li>
  );
}

function extractOnlyMedia(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const allowedTags = ["IMG", "VIDEO", "AUDIO", "IFRAME", "SOURCE", "PICTURE"];

  const mediaElements = Array.from(doc.body.querySelectorAll("*")).filter(
    (el) => allowedTags.includes(el.tagName)
  );

  const container = document.createElement("div");
  // biome-ignore lint/complexity/noForEach: <explanation>
  mediaElements.forEach((el) => container.appendChild(el.cloneNode(true)));

  return container.innerHTML;
}

function QuestionMediaRenderer({
  media,
  altText,
}: {
  media: string;
  altText?: string;
}) {
  if (/\.(jpg|jpeg|png|gif|webp|svg)$/.test(media)) {
    return <img src={media} alt={altText} className="max-w-full w-1/3" />;
  }
  if (/\.(mp4|mov)$/.test(media)) {
    return (
      // biome-ignore lint/a11y/useMediaCaption: <explanation>
      <video controls>
        <source
          src={media}
          type={`video/${media.endsWith("mp4") ? "mp4" : "quicktime"}`}
        />
        Your browser does not support the video tag.
      </video>
    );
  }
  if (/\.(mp3)$/.test(media)) {
    return (
      // biome-ignore lint/a11y/useMediaCaption: <explanation>
      <audio controls>
        <source src={media} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    );
  }
  return null;
}
