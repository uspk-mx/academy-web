import type { Question } from "gql-generated/generated/types";

const checkAnswerCorrectness = (
  question: Question,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  userAnswer: any
): { isCorrect: boolean; earnedMarks: number } => {
  if (!question?.settings?.correctAnswers) {
    if (
      question.type === "FREE_CHOICE" ||
      question.type === "ESSAY" ||
      question.type === "ASSESSMENT"
    ) {
      // Pending manual grading
      return { isCorrect: false, earnedMarks: 0 };
    }
    // Invalid question
    return { isCorrect: false, earnedMarks: 0 };
  }

  if (userAnswer === undefined || userAnswer === null) {
    // Unanswered
    return { isCorrect: false, earnedMarks: 0 };
  }

  const correctAnswers = question.settings.correctAnswers;
  const mark = question.mark || 0;
  let earnedMarks = 0;

  switch (question.type) {
    case "TRUE_FALSE":
      if (userAnswer === correctAnswers[0]) {
        return { isCorrect: true, earnedMarks: mark };
      }
      break;

    case "SINGLE_CHOICE":
      if (userAnswer === correctAnswers[0]) {
        return { isCorrect: true, earnedMarks: mark };
      }
      break;

    case "MULTIPLE_CHOICE":
      if (Array.isArray(userAnswer) && Array.isArray(correctAnswers)) {
        const correctCount = userAnswer.filter((answer) =>
          correctAnswers.includes(answer)
        ).length;

        const incorrectCount = userAnswer.filter(
          (answer) => !correctAnswers.includes(answer)
        ).length;

        if (correctCount > 0 && incorrectCount === 0) {
          earnedMarks = (correctCount / correctAnswers.length) * mark;

          return {
            isCorrect: correctCount === correctAnswers.length,
            earnedMarks,
          };
        }
      }
      break;

    case "FILL_IN_THE_BLANKS":
      if (Array.isArray(userAnswer) && correctAnswers[0]) {
        const correctAnswerArray = correctAnswers[0].split("|");
        const correctCount = userAnswer.reduce((acc, answer, index) => {
          return (
            acc +
            (index < correctAnswerArray.length &&
            answer.trim().toLowerCase() === correctAnswerArray[index].trim().toLowerCase()
              ? 1
              : 0)
          );
        }, 0);
        earnedMarks = (correctCount / correctAnswerArray.length) * mark;
        return {
          isCorrect: correctCount === correctAnswerArray.length,
          earnedMarks,
        };
      }
      break;

    case "SORTING":
      if (Array.isArray(userAnswer) && Array.isArray(correctAnswers)) {
        const correctCount = userAnswer.reduce((acc, answer, index) => {
          return acc + (answer === correctAnswers[index] ? 1 : 0);
        }, 0);
        earnedMarks = (correctCount / correctAnswers.length) * mark;
        return {
          isCorrect: correctCount === correctAnswers.length,
          earnedMarks,
        };
      }
      break;

    case "MATRIX_SORTING":
      if (Array.isArray(userAnswer) && Array.isArray(correctAnswers)) {
        const correctCount = userAnswer.reduce((acc, answer, index) => {
          if (index >= correctAnswers.length) return acc;
          const [_, correctValue] = correctAnswers[index].split(":");
          return (
            acc + (answer.trim().toLowerCase() === correctValue.trim().toLowerCase() ? 1 : 0)
          );
        }, 0);
        earnedMarks = (correctCount / correctAnswers.length) * mark;
        return {
          isCorrect: correctCount === correctAnswers.length,
          earnedMarks,
        };
      }
      break;

    default:
      break;
  }

  return { isCorrect: false, earnedMarks: 0 };
};

const formatAnswer = (
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  answer: any,
  questionType: string,
  correctAnswers?: string[]
): string => {
  if (answer === undefined || answer === null) {
    return "No se obtuvo respuesta";
  }
  if (Array.isArray(answer)) {
    if (questionType === "FILL_IN_THE_BLANKS") {
      return answer.join(" ");
    }
    return answer.join(", ");
  }
  return String(answer);
};

const formatCorrectAnswers = (
  correctAnswers?: string[],
  questionType?: string
): string => {
  if (!correctAnswers) {
    const manualGradingTypes = ["FREE_CHOICE", "ESSAY", "ASSESSMENT"];
    if (questionType && manualGradingTypes.includes(questionType)) {
      return "Calificacion manual pendiente";
    }
    return "Respuesta correcta no configurada";
  }
  if (questionType === "FILL_IN_THE_BLANKS" && correctAnswers[0]) {
    return correctAnswers[0].split("|").join(" ");
  }
  if (questionType === "MATRIX_SORTING") {
    return correctAnswers.map((ans) => ans.split(":")[1]).join(", ");
  }
  return correctAnswers.join(", ");
};

export { checkAnswerCorrectness, formatAnswer, formatCorrectAnswers };
