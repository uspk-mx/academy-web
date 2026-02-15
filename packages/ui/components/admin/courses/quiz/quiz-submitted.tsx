import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "ui/components/card";
import { Button } from "ui/components/button";
import { Separator } from "ui/components/separator";
import { CheckCircle2 } from "lucide-react";
interface QuizSubmittedProps {
  score: number;
  totalScore: number;
  passingGrade: number;
  attemptsUsed: number;
  maxAttempts: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  questions: any[];
  onRetry: () => void;
  onViewResults?: () => void;
  onNextLesson: () => void;
  nextItemLabel?: string;
}

export function QuizSubmitted({
  score,
  totalScore,
  passingGrade,
  attemptsUsed,
  maxAttempts,
  nextItemLabel,
  questions,
  onRetry,
  onViewResults,
  onNextLesson,
}: QuizSubmittedProps) {
  const percentage = totalScore > 0 ? (score / totalScore) * 100 : 0;
  const passed = percentage >= passingGrade;
  const attemptsLeft = maxAttempts - attemptsUsed;
  const hasManualGrading = questions.some(
    (q) =>
      q.type === "FREE_CHOICE" || q.type === "ESSAY" || q.type === "ASSESSMENT"
  );

  return (
    <div className="px-6">
      <Card className="max-w-4xl my-6 mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
            ¡Cuestionario Enviado!
          </CardTitle>
          <p className="text-gray-600">
            {passed
              ? "¡Felicidades! Has completado el cuestionario exitosamente."
              : "Gracias por enviar tu cuestionario."}
            {hasManualGrading &&
              " Algunas respuestas requieren calificación manual. Te notificaremos tu resultado final."}
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">
              Puntuación: {score.toFixed(1)}/{totalScore} (
              {percentage.toFixed(1)}%)
            </h2>
            <p className="text-lg">
              Estado:{" "}
              <span className={passed ? "text-green-500" : "text-red-500"}>
                {passed ? "Aprobado" : "No Aprobado"}
              </span>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-black h-2 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
          <p className="text-gray-600">
            Este cuestionario forma parte de tu progreso en el curso.{" "}
            {passed
              ? "Has avanzado al siguiente paso."
              : "Intenta de nuevo para avanzar."}
          </p>
        </CardContent>
        <Separator />
        <CardFooter className="gap-6 pt-6 flex flex-col md:flex-row">
          {/* <Button className="w-full" onClick={onViewResults}>
            Ver Resultados Detallados
          </Button> */}
          {/* {attemptsLeft > 0 && !passed && (
            <Button variant="neutral" className="w-full" onClick={onRetry}>
              Intentar de Nuevo ({attemptsLeft}{" "}
              {attemptsLeft === 1 ? "intento" : "intentos"} restantes)
            </Button>
          )} */}
          <Button
            type="button"
            className="w-full"
            variant="noShadow"
            onClick={onNextLesson}
          >
            {passed ? nextItemLabel || "Siguiente Lección" : "Volver al Curso"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}