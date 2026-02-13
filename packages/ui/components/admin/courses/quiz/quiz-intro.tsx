import { BookCheckIcon, ChevronDown, ChevronUp, Dice5Icon, Info, PlayCircle, RotateCcw, Timer, TrophyIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "ui/components/badge";
import { Button } from "ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "ui/components/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "ui/components/collapsible";
import { HtmlRenderer } from "ui/components/html-renderer";
import { Separator } from "ui/components/separator";
import type { Quiz } from "gql-generated/generated/types";

interface QuizIntroProps {
  quiz: Quiz;
  attemptsUsed: number;
  maxAttempts: number;
  onStart: () => void;
}

type TimeUnit = "MINUTES" | "SECONDS" | "HOURS";
const timeUnitMap: Record<TimeUnit, string> = {
  SECONDS: "Segundos",
  MINUTES: "Minutos",
  HOURS: "Horas",
};



export default function QuizIntro({ quiz, attemptsUsed, maxAttempts, onStart }: QuizIntroProps) {
  const attemptsLeft = maxAttempts - attemptsUsed
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="p-6 max-w-full">
      <Card className="overflow-hidden">
        <CardHeader className="pb-0 pt-6 px-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Badge
                variant="neutral"
                className="text-xs px-2 py-0 h-5 bg-amber-50"
              >
                Quiz
              </Badge>
              <Badge
                variant="neutral"
                className={`text-xs px-2 py-0 h-5 ${
                  attemptsLeft > 0
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {attemptsLeft > 0
                  ? `${attemptsLeft} intentos disponibles`
                  : "Sin intentos disponibles"}
              </Badge>
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold">
              {quiz.title}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="px-6 pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <Timer className="w-6 h-6 text-gray-500 mb-2" />
              <p className="text-sm text-gray-500">Tiempo límite</p>
              <p className="font-semibold">
                {quiz.timer} {timeUnitMap[quiz.timeUnit as TimeUnit]}
              </p>
            </div>

            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <Dice5Icon className="w-6 h-6 text-gray-500 mb-2" />
              <p className="text-sm text-gray-500">Intentos máximos</p>
              <p className="font-semibold">{quiz.maxAttempts}</p>
            </div>

            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <TrophyIcon className="w-6 h-6 text-gray-500 mb-2" />
              <p className="text-sm text-gray-500">Calificación para pasar</p>
              <p className="font-semibold">{quiz.passingGrade}%</p>
            </div>

            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <RotateCcw className="w-6 h-6 text-gray-500 mb-2" />
              <p className="text-sm text-gray-500">Intentos usados</p>
              <p className="font-semibold">
                {attemptsUsed} de {maxAttempts}
              </p>
            </div>
          </div>

          {quiz.content && (
            <div className="mb-6">
              <Collapsible open={showDetails} onOpenChange={setShowDetails}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-gray-500" />
                    <h3 className="font-medium">
                      Descripción del cuestionario
                    </h3>
                  </div>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                      {showDetails ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>

                <CollapsibleContent className="max-h-40 overflow-y-auto md:max-h-full">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <HtmlRenderer
                      content={quiz.content}
                      className="prose max-w-none text-gray-700"
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
        </CardContent>

        <Separator />

        <CardFooter className="px-6 py-6 flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2 text-gray-500">
            <PlayCircle className="w-5 h-5" />
            <p className="text-sm">
              {attemptsLeft > 0
                ? "Haz clic en el botón para comenzar el cuestionario."
                : "Has agotado todos tus intentos disponibles."}
            </p>
          </div>
          <Button
            size="lg"
            className="bg-amber-400 hover:bg-amber-500 text-black w-full sm:w-auto"
            onClick={onStart}
            disabled={attemptsLeft <= 0}
          >
            {attemptsLeft <= 0
              ? "No hay más intentos disponibles"
              : "Iniciar cuestionario"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
