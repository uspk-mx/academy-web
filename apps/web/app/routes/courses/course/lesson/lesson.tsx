import { useMemo } from "react";
import { useParams } from "react-router";
import { ContentTabs } from "ui/components/admin/courses/content-tabs";
import { CourseCompletionScreen } from "ui/components/admin/courses/course-completion-screen";
import { CourseHeader } from "ui/components/admin/courses/course-header";
import { CourseSideNavigation } from "ui/components/admin/courses/course-sidenav";
import { LoadingVideoSkeleton } from "ui/components/admin/courses/loading-video-skeleton";
import { VideoPlayer } from "ui/components/admin/courses/video-player";
import { ScrollArea } from "ui/components/scroll-area";
import { useCustomerContextProvider } from "ui/context";
import { useProgress } from "ui/context/progress-context";
import { getNextCourse } from "ui/lib/course-progression";
import type { Route } from "./+types/lesson";
import {
  CourseDocument,
  GetCourseProgressDocument,
  type CourseQuery,
  type CourseQueryVariables,
  type GetCourseProgressQuery,
  type GetCourseProgressQueryVariables,
} from "gql-generated/gql/graphql";
import { useQuery } from "urql";

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
  topics: Array<{
    position?: number | null;
    lessons?: Array<{ id: string; title: string; position?: number | null; progress?: { completed?: boolean | null } | null }> | null;
    quizzes?: Array<{ id: string; title: string; position?: number | null; progress?: { completed?: boolean | null } | null }> | null;
  }> | null | undefined,
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

  if (currentIndex >= 0 && currentIndex < items.length - 1) {
    const next = items[currentIndex + 1];
    const label =
      next.type === "lesson" ? "Siguiente lección" : "Siguiente quiz";
    return { label, target: { type: next.type, id: next.id } };
  }

  const incompleteBeforeCurrent = items.find(
    (item, i) => i < currentIndex && !item.completed && item.type === "lesson",
  );
  if (incompleteBeforeCurrent) {
    return {
      label: `Continuar: ${incompleteBeforeCurrent.title}`,
      target: { type: "lesson", id: incompleteBeforeCurrent.id },
    };
  }

  return { label: "Volver al dashboard", target: null };
}

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Uspk Academy | Lección: ${params.lessonId}` },
    { name: "description", content: `Lección del curso ${params.cid}` },
  ];
}

export default function LessonPage() {
  const { cid: courseId, lessonId } = useParams();
  const { customerData, fetching } = useCustomerContextProvider();
  const { progressPercentage } = useProgress();

  const course = customerData?.courses?.find((item) => item?.id === courseId);

  const isLessonCompleted = useMemo(
    () =>
      course?.topics?.some((topic) => {
        const lessons = topic?.lessons?.filter(
          (lesson) => lesson?.id === lessonId,
        );
        return lessons?.some((lesson) => lesson.progress?.completed);
      }),
    [course?.topics, lessonId],
  );

  const [{ data: courseData }] = useQuery<
    CourseQuery,
    CourseQueryVariables
  >({
    query: CourseDocument,
    variables: { courseId: courseId || "" },
    pause: !courseId,
  });

  const [{ data: courseProgressData }] =
    useQuery<GetCourseProgressQuery, GetCourseProgressQueryVariables>({
      query: GetCourseProgressDocument,
      variables: {
        courseId: courseId || "",
        userId: customerData?.customerId || "",
      },
      pause: !courseId,
    });

  const activeLesson = course?.topics
    ?.flatMap((topic) => topic.lessons)
    .find((lesson) => lesson?.id === lessonId);

  const nextAction = useMemo(() => {
    if (!course?.topics) return null;
    const items = getCourseItemsList(course.topics);
    return getNextAction(items, lessonId);
  }, [course?.topics, lessonId]);

  const isCourseCompleted = progressPercentage === 100;
  const isLastItem = !nextAction?.target;

  const certificateData = {
    studentName: customerData?.fullName ?? "",
    studentLevel: courseData?.course?.level?.name ?? "",
    studentLevelDescription: courseData?.course?.level?.name ?? "",
    teacherName: courseData?.course?.instructors?.[0]?.fullName ?? "",
    date: courseProgressData?.getCourseProgress?.completedAt || "",
  };

  const nextCourse = useMemo(() => {
    if (!course || !customerData?.courses) return null;
    const courses = customerData.courses.filter(
      (c): c is NonNullable<typeof c> => c !== null,
    );
    return getNextCourse(course, courses);
  }, [course, customerData?.courses]);

  // Show completion screen when course is 100% done and this is the last item
  if (isCourseCompleted && isLastItem && activeLesson?.progress?.completed) {
    return (
      <div key={lessonId} className="flex-1 h-screen flex flex-col bg-background">
        <CourseHeader
          courseTitle={course?.title || ""}
          topicItemId="completion"
          isItemCompleted
          isLesson
          certificateData={certificateData}
        />
        <div className="flex flex-1 flex-row">
          <div className="flex-1">
            <ScrollArea className="flex-1 overflow-y-auto">
              <CourseCompletionScreen
                courseTitle={course?.title ?? ""}
                certificateData={certificateData}
                nextCourse={
                  nextCourse
                    ? { id: nextCourse.id, title: nextCourse.title ?? "" }
                    : null
                }
              />
            </ScrollArea>
          </div>
          <CourseSideNavigation topics={course?.topics} />
        </div>
      </div>
    );
  }

  return (
    <div key={lessonId} className="flex-1 h-screen flex flex-col bg-background">
      <CourseHeader
        courseTitle={course?.title || ""}
        topicItemId={lessonId || ""}
        isItemCompleted={isLessonCompleted}
        isLesson
        certificateData={{
          studentName: customerData?.fullName ?? "",
          studentLevel: courseData?.course?.level?.name ?? "",
          studentLevelDescription: courseData?.course?.level?.name ?? "",
          teacherName: courseData?.course?.instructors?.[0]?.fullName ?? "",
          date: courseProgressData?.getCourseProgress?.completedAt || "",
        }}
      />

      <div className="flex flex-1 flex-row">
        <div className="flex-1">
          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="relative w-full flex flex-col">
              <div className="relative flex-1 min-w-px flex z-0">
                {!activeLesson?.video?.videoURL && !fetching ? (
                  <div className="relative w-full  bg-black">
                    <div className="relative aspect-video">
                      <LoadingVideoSkeleton />
                    </div>
                  </div>
                ) : activeLesson?.video?.videoURL !== "undefined" ? (
                  <VideoPlayer
                    videoUrl={activeLesson?.video?.videoURL || ""}
                    videoFormat="video/mp4"
                    containerClassName="max-w-full"
                    duration={activeLesson?.video?.duration || 0}
                    isLoading={fetching}
                    lessonTitle={activeLesson?.title}
                    lessonId={activeLesson?.id}
                  />
                ) : null}
              </div>
            </div>

            <ContentTabs
              courseTitle={course?.title ?? ""}
              topics={course?.topics}
              lessonDescription={activeLesson?.content || ""}
              attachments={activeLesson?.attachments || []}
              isItemCompleted={activeLesson?.progress?.completed}
              isLesson
            />
          </ScrollArea>
        </div>

        <CourseSideNavigation topics={course?.topics} />
      </div>
    </div>
  );
}
