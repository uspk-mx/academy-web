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
import { Fragment, useEffect, useRef, useState } from "react";
import { useMutation } from "urql";
import { Checkbox, Input, Label } from "ui/components/index";
import { Button } from "ui/components/button";
import { HtmlRenderer } from "ui/components/html-renderer";
import { RadioGroupCard } from "ui/components/radio-group-card";
import { Textarea } from "ui/components/textarea";
import { useProgress } from "ui/context/progress-context";
import { SubmitQuizAttemptDocument } from "gql-generated/gql/graphql";
import {
  QuestionType,
  type SubmitQuizAttemptMutation,
  type SubmitQuizAttemptMutationVariables,
} from "gql-generated/generated/types";
import { cn } from "../../../../lib/utils";
import ProgressBar from "./progress-bar";
import QuizIntro from "./quiz-intro";
import QuizQuestion from "./quiz-question";
import QuizResult from "./quiz-result";
import { QuizSubmitted } from "./quiz-submitted";
import { TimeoutNotification } from "./timeout-notification";
import {
  ArrowLeft,
  ArrowRightIcon,
  CheckCircleIcon,
  Clock,
} from "lucide-react";
import { Card } from "ui/components/card";

interface QuizProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  quiz: any;
  navigateToNextCourseItem: () => void;
  nextItemLabel?: string;
}

export type QuizState =
  | "intro"
  | "in-progress"
  | "completed"
  | "timeout"
  | "submitted";

const convertToSeconds = (time: number, unit: string) => {
  switch (unit.toLowerCase()) {
    case "minutes":
      return time * 60;
    case "hours":
      return time * 3600;
    default:
      return time;
  }
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export function Quiz({
  quiz,
  navigateToNextCourseItem,
  nextItemLabel,
}: QuizProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timerValueRef = useRef<number>(0);

  const isValidQuiz = quiz?.questions && quiz.questions.length > 0;

  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [attemptsUsed, setAttemptsUsed] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [displayTime, setDisplayTime] = useState("00:00");

  const [, submitQuizAttemptMutation] = useMutation<
    SubmitQuizAttemptMutation,
    SubmitQuizAttemptMutationVariables
  >(SubmitQuizAttemptDocument);

  const { markQuizComplete } = useProgress();

  const handleStartQuiz = () => {
    // Check if we still have attempts available
    if (attemptsUsed >= (quiz.maxAttempts || 0)) {
      return;
    }

    setQuizState("in-progress");
    setAttemptsUsed((prev) => prev + 1);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleAnswer = (questionId: string, answer: any) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizState("completed");
      const score = calculateScore();
      try {
        await submitQuizAttemptMutation({
          input: {
            quizId: quiz.id,
            attemptDate: new Date().toISOString(),
            score,
          },
        });
      } catch (error) {
        console.error("Error submitting quiz attempt:", error);
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    // biome-ignore lint/complexity/noForEach: <explanation>
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    quiz.questions.forEach((question: any) => {
      if (!question?.id || !question?.settings?.correctAnswers) {
        if (
          question?.type === QuestionType.FreeChoice ||
          question?.type === QuestionType.Essay ||
          question?.type === QuestionType.Assessment
        ) {
          return; // Manual grading
        }
        return;
      }

      const userAnswer = userAnswers[question.id];
      const correctAnswers = question.settings.correctAnswers;
      const mark = question.mark || 0;

      if (userAnswer === undefined || userAnswer === null) {
        return; // Unanswered question scores 0
      }

      switch (question.type) {
        case QuestionType.TrueFalse:
          if (userAnswer === correctAnswers[0]) {
            score += mark;
          }
          break;

        case QuestionType.SingleChoice:
          if (userAnswer === correctAnswers[0]) {
            score += mark;
          }
          break;

        case QuestionType.MultipleChoice:
          if (Array.isArray(userAnswer) && Array.isArray(correctAnswers)) {
            const correctCount = userAnswer.filter((answer) =>
              correctAnswers.includes(answer)
            ).length;
            const incorrectCount = userAnswer.filter(
              (answer) => !correctAnswers.includes(answer)
            ).length;
            if (correctCount > 0 && incorrectCount === 0) {
              score += (correctCount / correctAnswers.length) * mark;
            }
          }
          break;

        case QuestionType.FillInTheBlanks:
          if (Array.isArray(userAnswer) && correctAnswers[0]) {
            const correctAnswerArray = correctAnswers[0].split("|");
            const correctCount = userAnswer.reduce((acc, answer, index) => {
              return (
                acc +
                (index < correctAnswerArray.length &&
                answer.toLowerCase() === correctAnswerArray[index].toLowerCase()
                  ? 1
                  : 0)
              );
            }, 0);
            score += (correctCount / correctAnswerArray.length) * mark;
          }
          break;

        case QuestionType.Sorting:
          console.log("question.settings:", question.settings);
          if (Array.isArray(userAnswer) && Array.isArray(correctAnswers)) {
            const correctCount = userAnswer.reduce((acc, answer, index) => {
              return acc + (answer === correctAnswers[index] ? 1 : 0);
            }, 0);
            score += (correctCount / correctAnswers.length) * mark;
          }
          break;

        case QuestionType.MatrixSorting:
          if (Array.isArray(userAnswer) && Array.isArray(correctAnswers)) {
            const correctCount = userAnswer.reduce((acc, answer, index) => {
              if (index >= correctAnswers.length) return acc;
              const [_, correctValue] = correctAnswers[index].split(":");
              return (
                acc +
                (answer.toLowerCase() === correctValue.toLowerCase() ? 1 : 0)
              );
            }, 0);
            score += (correctCount / correctAnswers.length) * mark;
          }
          break;

        default:
          break;
      }
    });
    return score;
  };

  useEffect(() => {
    if (quiz.progress.completed) {
      setQuizState("submitted");
    }
  }, [quiz.progress.completed]);

  useEffect(() => {
    if (quizState === "in-progress") {
      const initialSeconds = convertToSeconds(
        quiz?.timer || 0,
        quiz?.timeUnit || "seconds"
      );
      timerValueRef.current = initialSeconds;
      setDisplayTime(formatTime(initialSeconds));

      timerRef.current = setInterval(() => {
        timerValueRef.current -= 1;

        if (timerValueRef.current <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          setQuizState("timeout");
          setDisplayTime("00:00");
        } else {
          setDisplayTime(formatTime(timerValueRef.current));
        }
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [quiz?.timer, quiz?.timeUnit, quizState]);

  if (!isValidQuiz) {
    return <div>Error: Invalid quiz data</div>;
  }

  if (quizState === "intro") {
    return (
      <QuizIntro
        quiz={quiz}
        maxAttempts={quiz?.maxAttempts}
        attemptsUsed={attemptsUsed}
        onStart={handleStartQuiz}
      />
    );
  }

  if (quizState === "timeout") {
    return (
      <TimeoutNotification
        attemptsUsed={attemptsUsed}
        maxAttempts={quiz.maxAttempts}
        onRetry={handleStartQuiz}
      />
    );
  }

  if (quizState === "completed") {
    const score = calculateScore();

    return (
      <div className="grid p-0">
        <QuizResult
          score={score}
          totalScore={quiz.questions.reduce(
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            (acc: number, q: any) => acc + (q.mark || 0),
            0
          )}
          passingGrade={quiz.passingGrade || 0}
          userAnswers={userAnswers}
          questions={quiz.questions}
          onRetry={handleStartQuiz}
          onComplete={() => markQuizComplete(quiz.id, score)}
          attemptsUsed={attemptsUsed}
          maxAttempts={quiz?.maxAttempts}
        />
      </div>
    );
  }

  if (quizState === "submitted") {
    return (
      <QuizSubmitted
        score={quiz.progress.score}
        totalScore={quiz.progress.score}
        passingGrade={quiz.passingGrade || 0}
        attemptsUsed={attemptsUsed}
        maxAttempts={quiz.maxAttempts}
        questions={quiz.questions}
        onRetry={handleStartQuiz}
        onNextLesson={navigateToNextCourseItem}
        nextItemLabel={nextItemLabel}
      />
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  console.log("currentQuestion: ", currentQuestion);

  if (!currentQuestion) {
    return <div>Error: Question not found</div>;
  }

  const isAnswered = userAnswers[currentQuestion.id] !== undefined;

  return (
    <div className="grid h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] relative">
      <div className="bg-white sticky top-0 z-10 border-b">
        <div className="max-w-4xl mx-auto w-full px-4 py-4">
          <h1 className="text-sm md:text-2xl font-bold mb-4">{quiz.title}</h1>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Pregunta:</span>
                <span className="font-medium text-sm">
                  {currentQuestionIndex + 1}/{quiz.questions.length}
                </span>
              </div>

              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Intentos:</span>
                <span className="font-medium text-sm">
                  {attemptsUsed}/{quiz.maxAttempts}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 max-w-sm bg-blue-50 px-3 py-1.5 rounded-md">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Tiempo:</span>
              <span className="font-medium">{displayTime}</span>
            </div>
          </div>

          <ProgressBar
            current={currentQuestionIndex + 1}
            total={quiz.questions.length}
          />
        </div>
      </div>

      {/* <QuizStatusBar
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={quiz.questions.length}
        totalAttempted={attemptsUsed}
        maxAttempts={quiz.maxAttempts}
        timeRemaining={formatTime(timeRemaining)}
      /> */}

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="max-w-4xl mx-auto w-full">
          <Card className="p-6">
            <QuizQuestion
              question={currentQuestion}
              onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
              savedAnswer={userAnswers[currentQuestion.id]}
            />
          </Card>
        </div>
      </div>

      <div className="bg-white border-t py-4 sticky bottom-0 left-0 right-0 z-10">
        <div className="max-w-4xl mx-auto w-full px-4 flex items-center justify-between">
          <Button
            onClick={handlePrevQuestion}
            className={cn("gap-2", { invisible: currentQuestionIndex === 0 })}
            type="button"
            variant="noShadowNeutral"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </Button>
          <div className="text-sm text-gray-500">
            {currentQuestionIndex + 1} de {quiz.questions.length}
          </div>

          <Button
            onClick={handleNextQuestion}
            disabled={!isAnswered}
            type="button"
          >
            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <>
                Completar
                <CheckCircleIcon className="w-4 h-4" />
              </>
            ) : (
              <>
                Siguiente
                <ArrowRightIcon className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function QuestionContent({
  savedAnswer,
  question,
  onAnswer,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  savedAnswer: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  question: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onAnswer: any;
}) {
  const [essayAnswer, setEssayAnswer] = useState(savedAnswer || "");
  const [assesmentAnswer, setAssesmentAnswer] = useState(savedAnswer || "");
  const [freeChoiceAnswer, setFreeChoiceAnswer] = useState(savedAnswer || "");
  const [fillInTheBlanksAnswer, setFillInTheBlanksAnswer] = useState<string[]>(
    savedAnswer || []
  );
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>(
    Array.isArray(savedAnswer) ? savedAnswer : []
  );
  const [sortingItems, setSortingItems] = useState<string[]>(
    Array.isArray(savedAnswer) ? savedAnswer : question.settings.sortableItems
  );
  const [matrixAnswers, setMatrixAnswers] = useState<string[]>(
    savedAnswer || []
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    if (question.settings.sortableItems) {
      setSortingItems(
        question.settings.sortableItems.sort(() => Math.random() + 0.5)
      );
    }
  }, [question.settings.sortableItems]);

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
                <div className="grid grow gap-2">
                  <Label htmlFor={item}>{item}</Label>
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
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            question?.settings?.sortableItems?.map((item: any) => ({
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
        <div className="flex items-center gap-2 mt-2">
          {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
          {parts?.map((part: any, index: any) => {
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <Fragment key={index}>
                <HtmlRenderer content={part} />
                {index < parts.length - 1 && (
                  <Input
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
      );
    }
    case QuestionType.Sorting:
      return (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={(event) => {
            const { active, over } = event;
            if (active.id !== over?.id) {
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
            items={sortingItems}
            strategy={verticalListSortingStrategy}
          >
            <ul className="space-y-2">
              {sortingItems.map((item, index) => (
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
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            (match: any, index: number) => (
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
      return <p>Unsupported question type</p>;
  }
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
