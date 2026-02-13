import { ClockIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { QuizState } from "./quiz";

interface QuizStatusBarProps {
  currentQuestion: number;
  totalQuestions: number;
  totalAttempted: number;
  maxAttempts: number;
  timeRemaining: string;
}

export function QuizStatusBar({
  currentQuestion,
  totalQuestions,
  totalAttempted,
  maxAttempts,
  timeRemaining,
}: QuizStatusBarProps) {
  return (
    <div className="flex flex-col gap-4 items-start md:gap-0 md:flex-row md:items-center justify-between py-4 px-1 text-gray-600">
      <div className="flex gap-4 md:gap-8">
        <div>
          <span className="mr-2">Numero de pregunta:</span>
          <span className="font-medium">
            {currentQuestion}/{totalQuestions}
          </span>
        </div>
        <div>
          <span className="mr-2">Intentos totales:</span>
          <span className="font-medium">
            {totalAttempted}/{maxAttempts}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ClockIcon className="w-5 h-5 text-blue-600" />
        <span>Tiempo restante:</span>
        <span className="font-medium">{timeRemaining}</span>
      </div>
    </div>
  );
}
