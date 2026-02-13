import { useEffect, useState } from "react";
import { Button } from "ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "ui/components/card";
import { RadioGroup, RadioGroupItem } from "ui/components/radio-group";
import { Label } from "ui/components/label";
import { CheckCircle2, Timer, XCircle } from "lucide-react";
// import { Text } from "ui/components/text";
// import { div } from "react-native";
import { Progress } from "ui/components/progress";
import { useProgress } from "ui/context/progress-context";
import type { Quiz } from "gql-generated/generated/types";
import { HtmlRenderer } from 'ui/components/components/html-renderer';

export function QuizContent({ quiz }: { quiz: Quiz }) {
    const [started, setStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [answers, setAnswers] = useState<
      { questionId: string; answer: string; correct: boolean; marks: number }[]
    >([]);
    const [completed, setCompleted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(quiz?.timer || 0);
    const [attempts, setAttempts] = useState(0);
  
    const { markComplete } = useProgress();
  
    useEffect(() => {
      if (started && (quiz?.timer || 0) > 0 && timeLeft > 0) {
        const timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              handleComplete();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return () => clearInterval(timer);
      }
    }, [started, quiz?.timer]);
  
    const handleStart = () => {
      if (quiz?.maxAttempts && attempts >= quiz.maxAttempts) {
        alert(`Maximum attempts (${quiz.maxAttempts}) reached`);
        return;
      }
      setStarted(true);
      setCurrentQuestion(0);
      setAnswers([]);
      setCompleted(false);
      setTimeLeft(quiz?.timer || 0);
      setAttempts((prev) => prev + 1);
    };
  
    const handleAnswerSelect = (answer: string) => {
      setSelectedAnswer(answer);
    };
  
    const handleNext = () => {
      const currentQ = quiz?.questions?.[currentQuestion];
      if (!currentQ) return;
  
      const isCorrect = currentQ?.settings?.correctAnswers?.includes(selectedAnswer) || false;
      const earnedMarks = isCorrect ? currentQ.mark : 0;
  
      setAnswers([
        ...answers,
        {
          questionId: currentQ.id,
          answer: selectedAnswer,
          correct: isCorrect,
          marks: earnedMarks,
        },
      ]);
  
      if (currentQuestion < (quiz?.questions?.length || 0) - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer("");
      }
    };
  
    const handleComplete = () => {
      if (selectedAnswer) {
        const currentQ = quiz?.questions?.[currentQuestion];
        if (currentQ) {
          const isCorrect = currentQ?.settings?.correctAnswers?.includes(selectedAnswer) || false;
          const earnedMarks = isCorrect ? currentQ.mark : 0;
  
          setAnswers([
            ...answers,
            {
              questionId: currentQ.id,
              answer: selectedAnswer,
              correct: isCorrect,
              marks: earnedMarks,
            },
          ]);
        }
      }
      setCompleted(true);
    };
  
    // Generate answer options for a question
    const getAnswerOptions = (question: any) => {
      // For multiple choice questions, the correct answers plus any additional options
      // would be stored in the settings
      if (question?.settings?.correctAnswers) {
        return question.settings.correctAnswers;
      }
      return [];
    };
  
    const getCorrectAnswers = (questionId: string) => {
      const question = quiz?.questions?.find(q => q.id === questionId);
      return question?.settings?.correctAnswers || [];
    };
  
    const totalMarks = quiz?.questions?.reduce((acc, q) => acc + q.mark, 0) || 0;
    const scoredMarks = answers.reduce((acc, a) => acc + (a.marks || 0), 0);
    const percentage = totalMarks > 0 ? (scoredMarks / totalMarks) * 100 : 0;
    const passed = percentage >= (quiz?.passingGrade || 0);
  
    if (!started) {
      return (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">{quiz?.title}</CardTitle>
            <CardDescription className="whitespace-pre-line">
             <HtmlRenderer content={quiz?.content || ""} />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4" />
                <p>
                  Tiempo limite:{" "}
                  {(quiz?.timer || 0) > 0
                    ? `${quiz?.timer} ${quiz.timeUnit || 'segundos'}`
                    : "No time limit"}
                </p>
              </div>
              <p>
                Maximos intentos:{" "}
                {quiz?.maxAttempts ? quiz.maxAttempts : "Sin limite"}
              </p>
              <p>Calificacion para pasar: {quiz?.passingGrade}%</p>
              <p>Intentos usados: {attempts}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleStart}
              className="w-full"
              disabled={quiz?.maxAttempts ? attempts >= quiz.maxAttempts : false}
            >
              Iniciar Quiz
            </Button>
          </CardFooter>
        </Card>
      );
    }
  
    if (completed) {
      return (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Resultados del quizz</CardTitle>
            <CardDescription>
              {passed
                ? "Felicidades! Haz pasado el quizz!"
                : "Lametablemente, no lograste pasar el quizz, intentalo nuevamente."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-lg font-semibold">
                  Puntuacion: {scoredMarks}/{totalMarks} ({percentage.toFixed(1)}
                  %)
                </p>
                <Progress value={percentage} className="w-full" />
              </div>
              <div className="space-y-4">
                {answers?.map((answer, index) => {
                  const question = quiz?.questions?.[index];
                  if (!question) return null;
                  
                  const correctAnswers = getCorrectAnswers(question.id);
                  return (
                    <div key={question.id} className="p-4 rounded-lg border">
                      <div className="flex items-start gap-2">
                        {answer.correct ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                        )}
                        <div className="space-y-1">
                          <p className="font-medium">{question.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Tu respuesta: {answer.answer}
                          </p>
                          {!answer.correct && (
                            <p className="text-sm text-muted-foreground">
                              Respuesta correcta:{" "}
                              {correctAnswers.join(", ")}
                            </p>
                          )}
                          <p className="text-sm">
                            Marcas: {answer.marks}/{question.mark}
                          </p>
                          {question.answerExplanation && (
                            <p className="text-sm mt-2 p-2 bg-muted rounded">
                              Explicación: {question.answerExplanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              onClick={handleStart}
              className="w-full"
              disabled={quiz?.maxAttempts ? attempts >= quiz.maxAttempts : false}
              variant="neutral"
              type="button"
            >
              Intentarlo de nuevo
            </Button>
            <Button
              onClick={() => markComplete(quiz.id)}
              className="w-full text-white!"
              disabled={!passed}
              type="button"
            >
              Completar modulo
            </Button>
          </CardFooter>
        </Card>
      );
    }
  
    const currentQ = quiz?.questions?.[currentQuestion];
    const answerOptions = currentQ?.settings?.correctAnswers || [];
  
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">
              Question {currentQuestion + 1} of {quiz?.questions?.length || 0}
            </CardTitle>
            {(quiz?.timer || 0) > 0 && (
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4" />
                <p>
                  {timeLeft} {quiz.timeUnit || 'segundos'}
                </p>
              </div>
            )}
          </div>
          <Progress
            value={((currentQuestion + 1) / (quiz?.questions?.length || 1)) * 100}
            className="w-full"
          />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              {quiz?.content && (
                <p>
                  {quiz.content
                    .replace(
                      "Lee el siguiente texto con atención. Luego completa las afirmaciones seleccionando la opción correcta. Consulta las respuestas al final para revisar tu trabajo. 😊",
                      ""
                    )
                    .trim()}
                </p>
              )}
              <p className="text-lg font-medium">{currentQ?.title}</p>
              {currentQ?.description && (
                <p className="text-muted-foreground">{currentQ.description}</p>
              )}
              {currentQ?.settings?.showQuestionMark !== false && (
                <p className="text-sm text-muted-foreground">
                  Points: {currentQ?.settings?.questionMark || currentQ?.mark || 0}
                </p>
              )}
            </div>
            <RadioGroup
              value={selectedAnswer}
              onValueChange={handleAnswerSelect}
              className="space-y-2"
            >
              {answerOptions.map((option) => (
                <Label
                  key={option}
                  className={`flex items-center space-x-2 p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedAnswer === option ? "bg-muted" : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  <RadioGroupItem value={option} id={option} />
                  <p>{option}</p>
                </Label>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          {currentQuestion < (quiz?.questions?.length || 0) - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!selectedAnswer && currentQ?.settings?.answerRequired !== false}
              className="w-full text-white!"
              type="button"
            >
              Siguiente pregunta
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={!selectedAnswer && currentQ?.settings?.answerRequired !== false}
              className="w-full text-white!"
              type="button"
            >
              Complete Quiz
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }