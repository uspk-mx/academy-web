import {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useQuery } from "urql";
import {
  LessonsByTopicIdDocument,
  QuizzesByTopicIdDocument,
} from "gql-generated/gql/graphql";
import type {
  LessonsByTopicIdQuery,
  LessonsByTopicIdQueryVariables,
  QuizzesByTopicIdQuery,
  QuizzesByTopicIdQueryVariables,
} from "gql-generated/generated/types";

type LessonsQuizzes = (
  | LessonsByTopicIdQuery["lessonsByTopicId"][number]
  | QuizzesByTopicIdQuery["quizzesByTopicId"][number]
)[];

interface TopicContentContextType {
  content: LessonsQuizzes;
  setContent: (value: LessonsQuizzes) => void;
}

const TopicContentContext = createContext<TopicContentContextType | undefined>(
  undefined
);

export const TopicContentProvider = ({
  children,
  topicId,
}: {
  children: ReactNode;
  topicId: string;
}) => {
  const [content, setContent] = useState<LessonsQuizzes>([]);
  const [{ data: lessons }] = useQuery<
    LessonsByTopicIdQuery,
    LessonsByTopicIdQueryVariables
  >({ query: LessonsByTopicIdDocument, variables: { topicId } });

  const [{ data: quizzes }] = useQuery<
    QuizzesByTopicIdQuery,
    QuizzesByTopicIdQueryVariables
  >({ query: QuizzesByTopicIdDocument, variables: { topicId } });

  useEffect(() => {
    const lessonData = lessons?.lessonsByTopicId || [];
    const quizzesData = quizzes?.quizzesByTopicId || [];
    setContent([...lessonData, ...quizzesData] as LessonsQuizzes);
  }, [lessons?.lessonsByTopicId, quizzes?.quizzesByTopicId]);

  return (
    <TopicContentContext.Provider value={{ content, setContent }}>
      {children}
    </TopicContentContext.Provider>
  );
};

export function useTopicContent(): TopicContentContextType {
  const context = use(TopicContentContext);
  if (context === undefined) {
    throw new Error(
      "useTopicContent must be used within a TopicContentProvider"
    );
  }
  return context;
}
