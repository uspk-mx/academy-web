//@ts-ignore
import confetti from "canvas-confetti";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "urql";
import {
  MarkLessonCompletedDocument,
  UpdateQuizProgressDocument,
} from "gql-generated/gql/graphql";
import type {
  MarkLessonCompletedInput,
  MarkLessonCompletedMutation,
  MarkLessonCompletedMutationVariables,
  SubmitQuizAttemptInput,
  SubmitQuizAttemptMutation,
  SubmitQuizAttemptMutationVariables,
  UpdateQuizProgressMutation,
  UpdateQuizProgressMutationVariables,
} from "gql-generated/generated/types";
import { useCustomerContextProvider } from "./customer-context";

type ProgressContextType = {
  completedItems: Set<string>;
  totalItems: number;
  progressPercentage: number;
  completedCourseItems: number;
  markComplete: (id: string) => void;
  markLessonComplete: (input: MarkLessonCompletedInput) => Promise<void>;
  submitQuizAttempt: (input: SubmitQuizAttemptInput) => void;
  markQuizComplete: (quizId: string, score?: number) => void;
  isCompleted: (id: string) => boolean;
  setTotalItems: (total: number) => void;
  progress: number;
  isLessonCompleted?: boolean;
  isQuizCompleted?: boolean;
};

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

const serializeSet = (set: Set<string>) => JSON.stringify(Array.from(set));
const deserializeSet = (str: string | null) => new Set(JSON.parse(str || "[]"));

// Confetti configuration
const confettiConfig = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
};

export function ProgressProvider({
  children,
  courseId,
}: {
  children: React.ReactNode;
  courseId: string;
}) {
  const [, markLessonCompletedMutation] = useMutation<
    MarkLessonCompletedMutation,
    MarkLessonCompletedMutationVariables
  >(MarkLessonCompletedDocument);

  const [, submitQuizAttemptMutation] = useMutation<
    SubmitQuizAttemptMutation,
    SubmitQuizAttemptMutationVariables
  >(MarkLessonCompletedDocument);

  const [, updateQuizProgressMutation] = useMutation<
    UpdateQuizProgressMutation,
    UpdateQuizProgressMutationVariables
  >(UpdateQuizProgressDocument);

  //@ts-ignore
  const [completedItems, setCompletedItems] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`course-progress-${courseId}`);
      return deserializeSet(stored);
    }
    return new Set<string>();
  });

  const { customerData } = useCustomerContextProvider();

  const courseProgress = customerData?.courses.find(
    (item) => item?.id === courseId
  )?.progress;

  const localTotalItems =
    (courseProgress?.totalLessons || 0) + (courseProgress?.totalQuizzes || 0);

  const progressPercentage = courseProgress?.progressPercentage || 0;

  const completedCourseItems =
    (courseProgress?.completedLessons || 0) +
    (courseProgress?.completedQuizzes || 0);

  const [totalItems, setTotalItems] = useState(localTotalItems);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const markComplete = (id: string) => {
    setCompletedItems((prev) => {
      const next = new Set(prev);
      const wasCompleted = next.has(id);

      if (wasCompleted) {
        next.delete(id);
      } else {
        next.add(id);

        // Check if this completion marks 100%
        if (next.size === totalItems) {
          // Trigger confetti
          confetti(confettiConfig);
          // Add a second burst for more effect
          setTimeout(() => {
            confetti({
              ...confettiConfig,
              particleCount: 50,
              spread: 100,
              origin: { y: 0.7 },
            });
          }, 200);
        }
      }

      return next;
    });
  };

  const markLessonComplete = async (input: MarkLessonCompletedInput) => {
    const response = await markLessonCompletedMutation({
      input,
    });

    if (response.error) {
      console.error("Error marking lesson as completed:", response.error);
      toast.error("Hubo un error al marcar la lección como completada", {
        description: response.error.message,
      });
    }

    if (response.data?.markLessonCompleted) {
      toast.success("Lección marcada como completada");
      // markComplete(input.lessonId);
      setIsLessonCompleted(true);
    }
  };

  const completeQuiz = () => {
    confetti(confettiConfig);
    setTimeout(() => {
      confetti({
        ...confettiConfig,
        particleCount: 50,
        spread: 100,
        origin: { y: 0.7 },
      });
    }, 200);
  };

  const handleMarkAsCompleteQuiz = async (quizId: string, score?: number) => {
    try {
      const response = await updateQuizProgressMutation({
        input: {
          completedAt: new Date().toISOString(),
          score,
          completed: true,
          quizId,
        },
      });

      if (response.error) {
        console.error("Error updating quiz progress:", response.error);
        toast.error("Ocurrio alguna falla al guardar el progreso del quiz", {
          description: "Intentalo nuevamente mas tarde.",
        });
      }
      if (response.data?.updateQuizProgress) {
        toast.success("Progreso del quiz guardado correctamente");
        setIsQuizCompleted(true);
        completeQuiz();
      }
    } catch (error) {
      console.error("Error updating quiz progress:", error);
      toast.error("Ocurrio alguna falla al guardar el progreso del quiz", {
        description: "Intentalo nuevamente mas tarde.",
      });
    }
  };

  const submitQuizAttempt = async (input: SubmitQuizAttemptInput) => {
    const response = await submitQuizAttemptMutation({
      input,
    });

    if (response.error) {
      console.error("Error submitting quiz attempt:", response.error);
      toast.error("Hubo un error al enviar el intento del cuestionario", {
        description: response.error.message,
      });
    }

    if (response.data?.submitQuizAttempt) {
      toast.success("Intento de cuestionario enviado");
      markComplete(input.quizId);
    }
  };

  const progress = Math.round((completedItems.size / totalItems) * 100);

  useEffect(() => {
    localStorage.setItem(
      `course-progress-${courseId}`,
      serializeSet(completedItems)
    );
  }, [completedItems, courseId]);

  const isCompleted = (id: string) => completedItems.has(id);

  return (
    <ProgressContext.Provider
      value={{
        totalItems: localTotalItems,
        completedItems,
        completedCourseItems,
        isLessonCompleted,
        isQuizCompleted,
        progressPercentage,
        markComplete,
        markLessonComplete,
        markQuizComplete: handleMarkAsCompleteQuiz,
        submitQuizAttempt,
        isCompleted,
        setTotalItems,
        progress,
      }}
    >
      <div>{children}</div>
    </ProgressContext.Provider>
  );
}

export function TotalItemsSetter({ courseId }: { courseId: string }) {
  const { setTotalItems } = useProgress();
  const { customerData } = useCustomerContextProvider();

  const topics = customerData?.courses.find(
    (item) => item?.id === courseId
  )?.topics;

  useEffect(() => {
    const totalLessonsAndQuizzes = topics?.reduce((acc, topic) => {
      const lessonsCount = topic.lessons?.length || 0;
      const quizzesCount = topic.quizzes?.length || 0;
      return acc + lessonsCount + quizzesCount;
    }, 0);

    setTotalItems(totalLessonsAndQuizzes || 0);
  }, [topics, setTotalItems]);

  return null;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
