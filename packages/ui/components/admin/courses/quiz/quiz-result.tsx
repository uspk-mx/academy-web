import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Scroll,
  XCircle,
} from "lucide-react";
import { Button } from "ui/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "ui/components/card";
import { ScrollArea } from "ui/components/scroll-area";
import { Separator } from "ui/components/separator";
import type {
  Question,
  UpdateQuizProgressMutation,
  UpdateQuizProgressMutationVariables,
} from "gql-generated/generated/types";
import {
  checkAnswerCorrectness,
  formatAnswer,
  formatCorrectAnswers,
} from "./utils";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useMutation } from "urql";
import { UpdateQuizProgressDocument } from "gql-generated/gql/graphql";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "ui/components/collapsible";
import { useState } from "react";
import { Badge } from "ui/components/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui/components/tabs";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "ui/components/drawer";

interface QuizResultProps {
  score: number;
  totalScore: number;
  passingGrade: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  userAnswers: Record<string, any>;
  questions: Question[];
  onRetry: () => void;
  onComplete: () => void;
  attemptsUsed: number;
  maxAttempts: number;
}

export default function QuizResult({
  score,
  totalScore,
  passingGrade,
  userAnswers,
  questions,
  onRetry,
  onComplete,
  attemptsUsed,
  maxAttempts,
}: QuizResultProps) {
  const percentage = totalScore > 0 ? (score / totalScore) * 100 : 0;
  const passed = percentage >= passingGrade;
  const attemptsLeft = maxAttempts - attemptsUsed;
  const [drawerFilter, setDrawerFilter] = useState<
    "all" | "correct" | "incorrect"
  >("all");

  const correctQuestions = questions.filter(
    (q) => checkAnswerCorrectness(q, userAnswers[q.id]).isCorrect === true
  );
  const incorrectQuestions = questions.filter(
    (q) => checkAnswerCorrectness(q, userAnswers[q.id]).isCorrect === false
  );

  const pendingQuestions = questions.filter(
    (q) => checkAnswerCorrectness(q, userAnswers[q.id]).isCorrect === null
  );

  const getFilteredQuestions = () => {
    switch (drawerFilter) {
      case "correct":
        return correctQuestions;
      case "incorrect":
        return [...incorrectQuestions, ...pendingQuestions];
      default:
        return questions;
    }
  };

  return (
    <div className="p-6 max-w-full overflow-auto">
      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl md:text-3xl">
                Resultados del cuestionario
              </CardTitle>
              <p
                className={
                  passed ? "text-green-600 mt-1" : "text-gray-600 mt-1"
                }
              >
                {passed
                  ? "¡Felicidades! Has pasado el cuestionario."
                  : `Lamentablemente, no lograste pasar el cuestionario${
                      attemptsLeft > 0 ? ", puedes intentarlo nuevamente." : "."
                    }`}
              </p>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">
                  {score.toFixed(1)}/{totalScore} ({percentage.toFixed(1)}%)
                </span>
                <Badge
                  variant={passed ? "default" : "neutral"}
                  className={
                    passed
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {passed ? "Aprobado" : "No aprobado"}
                </Badge>
              </div>
              <div className="w-full md:w-40 bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full ${
                    passed ? "bg-green-600" : "bg-black"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="summary">Resumen</TabsTrigger>
              <TabsTrigger value="correct">
                Correctas ({correctQuestions.length})
              </TabsTrigger>
              <TabsTrigger value="incorrect">
                Incorrectas (
                {incorrectQuestions.length + pendingQuestions.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="summary" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Correctas</p>
                      <p className="text-xl font-bold">
                        {correctQuestions.length}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="rounded-full bg-red-100 p-2">
                      <XCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Incorrectas</p>
                      <p className="text-xl font-bold">
                        {incorrectQuestions.length}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="rounded-full bg-yellow-100 p-2">
                      <Clock className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pendientes</p>
                      <p className="text-xl font-bold">
                        {pendingQuestions.length}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <div className="max-h-72 gap-4 flex flex-col overflow-y-auto">
                  {questions.slice(0, 3).map((question) => (
                    <QuestionSummaryItem
                      key={question.id}
                      question={question}
                      userAnswer={userAnswers[question.id]}
                    />
                  ))}
                </div>
                <Separator />
                {questions.length > 3 && (
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="noShadowNeutral" className="w-full">
                        Ver todas las preguntas ({questions.length})
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="w-full sm:w-[540px] sm:max-w-md p-0">
                      <DrawerHeader className="w-full">
                        <div className="flex flex-col items-start gap-4 w-full justify-between">
                          <DrawerTitle>Todas las preguntas</DrawerTitle>
                          <div className="flex items-center gap-4">
                            <Button
                              variant={
                                drawerFilter === "all"
                                  ? "noShadow"
                                  : "noShadowNeutral"
                              }
                              size="sm"
                              onClick={() => setDrawerFilter("all")}
                            >
                              Todas
                            </Button>
                            <Button
                              variant={
                                drawerFilter === "correct"
                                  ? "noShadow"
                                  : "noShadowNeutral"
                              }
                              size="sm"
                              onClick={() => setDrawerFilter("correct")}
                            >
                              Correctas
                            </Button>
                            <Button
                              variant={
                                drawerFilter === "incorrect"
                                  ? "noShadow"
                                  : "noShadowNeutral"
                              }
                              size="sm"
                              onClick={() => setDrawerFilter("incorrect")}
                            >
                              Incorrectas
                            </Button>
                          </div>
                        </div>
                      </DrawerHeader>
                      <div className="h-[calc(100vh-8rem)] overflow-y-auto py-4">
                        <div className="space-y-3 pb-6">
                          {getFilteredQuestions().map((question) => (
                            <QuestionSummaryItem
                              key={question.id}
                              question={question}
                              userAnswer={userAnswers[question.id]}
                            />
                          ))}
                          {getFilteredQuestions().length === 0 && (
                            <p className="text-center py-6 text-gray-500">
                              No hay preguntas en esta categoría
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="border-t p-4 flex justify-end">
                        <DrawerClose asChild>
                          <Button variant="noShadowNeutral">Cerrar</Button>
                        </DrawerClose>
                      </div>
                    </DrawerContent>
                  </Drawer>
                )}
              </div>
            </TabsContent>

            <TabsContent
              data-value="correct"
              value="correct"
              className="mt-0 space-y-3"
            >
              {correctQuestions.map((question) => (
                <QuestionSummaryItem
                  key={question.id}
                  question={question}
                  userAnswer={userAnswers[question.id]}
                />
              ))}
              {correctQuestions.length === 0 && (
                <p className="text-center py-6 text-gray-500">
                  No hay preguntas correctas
                </p>
              )}
            </TabsContent>

            <TabsContent value="incorrect" className="mt-0 space-y-3">
              {[...incorrectQuestions, ...pendingQuestions].map((question) => (
                <QuestionSummaryItem
                  key={question.id}
                  question={question}
                  userAnswer={userAnswers[question.id]}
                />
              ))}
              {incorrectQuestions.length === 0 &&
                pendingQuestions.length === 0 && (
                  <p className="text-center py-6 text-gray-500">
                    No hay preguntas incorrectas
                  </p>
                )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <Separator />
        <CardFooter className="gap-4 pt-6 flex flex-col sm:flex-row">
          {attemptsLeft > 0 && !passed && (
            <Button
              variant="noShadowNeutral"
              className="w-full"
              onClick={onRetry}
            >
              Intentarlo de nuevo ({attemptsLeft}{" "}
              {attemptsLeft === 1 ? "intento" : "intentos"} restantes)
            </Button>
          )}
          <Button
            className="w-full"
            type="button"
            variant="noShadow"
            onClick={onComplete}
          >
            Completar módulo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function QuestionSummaryItem({
  question,
  userAnswer,
}: {
  question: Question;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  userAnswer: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { isCorrect, earnedMarks } = checkAnswerCorrectness(
    question,
    userAnswer
  );

  const isManualGrading =
    question.type === "FREE_CHOICE" ||
    question.type === "ESSAY" ||
    question.type === "ASSESSMENT";

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border bg-background rounded-lg"
    >
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isManualGrading ? (
            <span className="w-5 h-5 text-yellow-500 shrink-0">⏳</span>
          ) : isCorrect ? (
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500 shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate">{question.title}</h3>
            <p className="text-xs text-gray-500">
              Marcas: {earnedMarks.toFixed(1)}/{question.mark}
            </p>
          </div>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="p-1 h-auto">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent>
        <Separator />
        <div className="p-3 space-y-2 text-sm">
          <div>
            <p className="text-gray-600">
              Tu respuesta:{" "}
              <span className="font-medium">
                {formatAnswer(userAnswer, question.type)}
              </span>
            </p>
            {!isManualGrading && (
              <p className="text-gray-600">
                Respuesta correcta:{" "}
                <span className="font-medium">
                  {formatCorrectAnswers(
                    question?.settings?.correctAnswers as string[],
                    question.type
                  )}
                </span>
              </p>
            )}
          </div>

          {question.answerExplanation && (
            <div className="mt-2 p-2 bg-gray-50 rounded-sm text-xs">
              <p className="font-medium mb-1">Explicación:</p>
              <Markdown rehypePlugins={[rehypeRaw]}>
                {question.answerExplanation}
              </Markdown>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
