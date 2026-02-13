import type { Lesson, Quiz, Topic } from "gql-generated/generated/types";
import { createContext, useState, useContext, type ReactNode } from "react";

interface CurriculumContextProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  globals: any;
  topics: Topic[];
  lessons: Lesson[];
  quizzes: Quiz[];
  setIsTopicCollapse: (topicId: string, isCollapsed: boolean) => void;
  collapseAllTopics: () => void;
}

const CurriculumContext = createContext<CurriculumContextProps | undefined>(
  undefined
);

export function CurriculumProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [globals, setGlobals] = useState<any>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const setIsTopicCollapse = (topicId: string, isCollapsed: boolean): void => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === topicId ? { ...topic, isCollapsed } : topic
      )
    );
  };

  const collapseAllTopics = (): void => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) => ({ ...topic, isCollapsed: true }))
    );
  };

  return (
    <CurriculumContext.Provider
      value={{
        globals,
        topics,
        lessons,
        quizzes,
        setIsTopicCollapse,
        collapseAllTopics,
      }}
    >
      {children}
    </CurriculumContext.Provider>
  );
}

export const useCurriculumContext = () => {
  const context = useContext(CurriculumContext);
  if (context === undefined) {
    throw new Error(
      "useCurriculumContext must be used within a CurriculumProvider"
    );
  }
  return context;
};
