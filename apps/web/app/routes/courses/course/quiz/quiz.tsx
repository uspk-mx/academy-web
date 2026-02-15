import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "urql";
import { PageLoader } from "ui/components/admin";
import { ContentTabs } from "ui/components/admin/courses/content-tabs";
import { CourseHeader } from "ui/components/admin/courses/course-header";
import { CourseSideNavigation } from "ui/components/admin/courses/course-sidenav";
import { Quiz } from "ui/components/admin/courses/quiz/quiz";
import { ScrollArea } from "ui/components/scroll-area";
import { TopicsByCourseDocument } from "gql-generated/gql/graphql";
import type {
  TopicsByCourseQuery,
  TopicsByCourseQueryVariables,
} from "gql-generated/gql/graphql";
import type { Route } from "./+types/quiz";

type CourseItem = {
  type: "lesson" | "quiz";
  id: string;
  title: string;
  completed: boolean;
};

type NextAction = {
  label: string;
  target: { type: "lesson" | "quiz"; id: string } | null;
};

function getCourseItemsList(
  topics: TopicsByCourseQuery["topicsByCourseId"],
): CourseItem[] {
  const sortedTopics = [...(topics ?? [])].sort(
    (a, b) => (a.position ?? 0) - (b.position ?? 0),
  );

  const items: CourseItem[] = [];

  for (const topic of sortedTopics) {
    const topicItems = [
      ...(topic.lessons ?? []).map((lesson) => ({
        type: "lesson" as const,
        id: lesson.id,
        title: lesson.title,
        position: lesson.position ?? 0,
        completed: !!lesson.progress?.completed,
      })),
      ...(topic.quizzes ?? []).map((quiz) => ({
        type: "quiz" as const,
        id: quiz.id,
        title: quiz.title,
        position: quiz.position ?? 0,
        completed: !!quiz.progress?.completed,
      })),
    ];
    topicItems.sort((a, b) => a.position - b.position);
    items.push(...topicItems);
  }

  return items;
}

function getNextAction(items: CourseItem[], currentId?: string): NextAction {
  const currentIndex = items.findIndex((item) => item.id === currentId);

  // Priority 1: Next item after current
  if (currentIndex >= 0 && currentIndex < items.length - 1) {
    const next = items[currentIndex + 1];
    const label =
      next.type === "lesson" ? "Siguiente lección" : "Siguiente quiz";
    return { label, target: { type: next.type, id: next.id } };
  }

  // Priority 2: First incomplete lesson before current
  const incompleteBeforeCurrent = items.find(
    (item, i) => i < currentIndex && !item.completed && item.type === "lesson",
  );
  if (incompleteBeforeCurrent) {
    return {
      label: `Continuar: ${incompleteBeforeCurrent.title}`,
      target: {
        type: "lesson",
        id: incompleteBeforeCurrent.id,
      },
    };
  }

  // Priority 3: All done
  return { label: "Volver al dashboard", target: null };
}

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Uspk Academy | Quiz: ${params.quizId}` },
    { name: "description", content: `Quiz del curso ${params.cid}` },
  ];
}

export default function QuizPage() {
  const { cid: courseId, quizId } = useParams();
  const navigate = useNavigate();

  const [{ data, fetching }] = useQuery<
    TopicsByCourseQuery,
    TopicsByCourseQueryVariables
  >({
    query: TopicsByCourseDocument,
    variables: {
      courseId: courseId as string,
    },
  });

  const course = data?.topicsByCourseId?.find((item) => item?.course);

  const activeQuiz = data?.topicsByCourseId
    ?.flatMap((topic) => topic.quizzes || [])
    .find((quiz) => quiz.id === quizId);

  const nextAction = useMemo(() => {
    if (!data?.topicsByCourseId) return null;
    const items = getCourseItemsList(data.topicsByCourseId);
    return getNextAction(items, quizId);
  }, [data?.topicsByCourseId, quizId]);

  const navigateToNextElement = () => {
    if (!nextAction?.target) return navigate("/courses");
    const { type, id } = nextAction.target;
    navigate(`/courses/${courseId}/${type}/${id}`);
  };

  return (
    <div key={quizId} className="flex-1 h-screen flex flex-col bg-background">
      <CourseHeader
        courseTitle={course?.title ?? ""}
        topicItemId="mdeiwonmdieow"
        isItemCompleted={activeQuiz?.progress?.completed}
        isLesson={false}
      />

      <div className="flex flex-1 h-full flex-row">
        <div className="flex-1 h-full">
          <ScrollArea className="flex-1 h-full overflow-y-auto">
            <div className="pb-6 xl:pb-0">
              <div className="relative h-full w-full flex flex-col">
                <div className="relative flex-1 min-w-px h-full flex flex-col justify-center z-0">
                  {!activeQuiz ? (
                    <PageLoader />
                  ) : (
                    <Quiz
                      quiz={activeQuiz}
                      navigateToNextCourseItem={navigateToNextElement}
                      nextItemLabel={nextAction?.label}
                    />
                  )}
                </div>
              </div>
            </div>
            <ContentTabs
              courseTitle={course?.title ?? ""}
              topics={data?.topicsByCourseId}
              lessonDescription=""
              attachments={[]}
            />
          </ScrollArea>
        </div>

        <CourseSideNavigation topics={data?.topicsByCourseId} />
      </div>
    </div>
  );
}
