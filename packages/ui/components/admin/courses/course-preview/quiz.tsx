import { useState } from "react";
import { Button } from "ui/components/button";
import { RadioGroup, RadioGroupItem } from "ui/components/radio-group";
import { Label } from "ui/components/label";

interface QuizProps {
  quizData: {
    questions: {
      id: number;
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
  };
  lessonId: number;
}

export function Quiz({ quizData, lessonId }: QuizProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    quizData.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setIsSubmitted(true);
    // Here you would typically make an API call to submit the quiz results
  };

  return (
    <div className="space-y-8">
      {quizData.questions.map((question) => (
        <div key={question.id} className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
          <RadioGroup
            onValueChange={(value) =>
              handleAnswer(question.id, parseInt(value))
            }
            disabled={isSubmitted}
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={index.toString()}
                  id={`q${question.id}-a${index}`}
                />
                <Label htmlFor={`q${question.id}-a${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
      {!isSubmitted ? (
        <Button onClick={handleSubmit} className="w-full">
          Submit Quiz
        </Button>
      ) : (
        <div className="text-center">
          <p className="text-xl font-bold">
            Your Score: {score} / {quizData.questions.length}
          </p>
          <p>Quiz completed!</p>
        </div>
      )}
    </div>
  );
}
