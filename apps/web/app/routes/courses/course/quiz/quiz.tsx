import type {
  CourseQuery,
  CourseQueryVariables,
  GetCourseProgressQuery,
  GetCourseProgressQueryVariables,
  TopicsByCourseQuery,
  TopicsByCourseQueryVariables,
} from "gql-generated/gql/graphql";
import {
  CourseDocument,
  GetCourseProgressDocument,
  TopicsByCourseDocument,
} from "gql-generated/gql/graphql";
import {
  HelpCircle,
  LayoutDashboard,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { useMemo } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import {
  CourseViewer,
  CourseViewerSkeleton,
} from "ui/components/academy-components";
import { useCourseNavigation } from "ui/components/academy-components/course-viewer/hooks/use-course-navigation";
import { PageLoader } from "ui/components/admin";
import { ContentTabs } from "ui/components/admin/courses/content-tabs";
import { CourseCompletionScreen } from "ui/components/admin/courses/course-completion-screen";
import { CourseHeader } from "ui/components/admin/courses/course-header";
import { CourseSideNavigation } from "ui/components/admin/courses/course-sidenav";
import { Quiz } from "ui/components/admin/courses/quiz/quiz";
import { useQuizStore } from "ui/components/admin/courses/quiz/store/quiz.store";
import { ScrollArea } from "ui/components/scroll-area";
import { useCustomerContextProvider } from "ui/context/customer-context";
import { useProgress } from "ui/context/progress-context";
import { getNextCourse } from "ui/lib/course-progression";
import { useQuery } from "urql";
import { flagsClient } from "~/lib/flags";
import type { Route } from "./+types/quiz";
import { getCourseItemsList, getNextAction } from "~/lib/course-utils";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Uspk Academy | Quiz: ${params.quizId}` },
    { name: "description", content: `Quiz del curso ${params.cid}` },
  ];
}

export async function loader() {
  const isNewViewer = await flagsClient.evaluate<boolean>(
    "new-course-viewer",
    true,
  );

  return {
    flags: { isNewViewer: isNewViewer.value },
  };
}

export default function QuizPage() {
  const { cid: courseId, quizId } = useParams();
  const navigate = useNavigate();
  const { customerData } = useCustomerContextProvider();
  const { progressPercentage } = useProgress();
  const quizState = useQuizStore((state) => state.quizState);
  const { flags } = useLoaderData<typeof loader>();

  const courseData = customerData?.courses?.find(
    (item) => item?.id === courseId,
  );

  const [{ data, fetching }] = useQuery<
    TopicsByCourseQuery,
    TopicsByCourseQueryVariables
  >({
    query: TopicsByCourseDocument,
    variables: {
      courseId: courseId as string,
    },
  });

  const { navigateToNext, navigateToPrevious } = useCourseNavigation({
    courseId: courseId || "",
    courseItems: getCourseItemsList(data?.topicsByCourseId ?? []),
    currentItemId: quizId || "",
  });

  const course = data?.topicsByCourseId?.find((item) => item?.course);

  const [{ data: courseInfo, fetching: fetchingCourse }] = useQuery<
    CourseQuery,
    CourseQueryVariables
  >({
    query: CourseDocument,
    variables: { courseId: courseId || "" },
    pause: !courseId,
  });

  const [{ data: courseProgressData, fetching: fetchingCourseProgress }] =
    useQuery<GetCourseProgressQuery, GetCourseProgressQueryVariables>({
      query: GetCourseProgressDocument,
      variables: {
        courseId: courseId || "",
        userId: customerData?.customerId || "",
      },
      pause: !courseId,
    });

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

  const isCourseCompleted = progressPercentage === 100;
  const isLastItem = !nextAction?.target;

  const certificateData = {
    studentName: customerData?.fullName ?? "",
    studentLevel: courseInfo?.course?.level?.name ?? "",
    studentLevelDescription: courseInfo?.course?.level?.name ?? "",
    teacherName: courseInfo?.course.instructors?.[0]?.fullName ?? "",
    date: courseProgressData?.getCourseProgress?.completedAt || "",
  };

  const nextCourse = useMemo(() => {
    if (!courseData || !customerData?.courses) return null;
    const courses = customerData.courses.filter(
      (c): c is NonNullable<typeof c> => c !== null,
    );
    return getNextCourse(courseData, courses);
  }, [courseData, customerData?.courses]);

  // Show completion screen when course is 100% done and this is the last item
  if (isCourseCompleted && isLastItem && activeQuiz?.progress?.completed) {
    return (
      <div key={quizId} className="flex-1 h-screen flex flex-col bg-background">
        <CourseHeader
          courseTitle={course?.title ?? ""}
          topicItemId="completion"
          isItemCompleted
          isLesson={false}
          certificateData={certificateData}
        />
        <div className="flex flex-1 h-full flex-row">
          <div className="flex-1 h-full">
            <ScrollArea className="flex-1 h-full overflow-y-auto">
              <CourseCompletionScreen
                courseTitle={courseData?.title ?? ""}
                certificateData={certificateData}
                nextCourse={
                  nextCourse
                    ? { id: nextCourse.id, title: nextCourse.title ?? "" }
                    : null
                }
              />
            </ScrollArea>
          </div>
          <CourseSideNavigation topics={data?.topicsByCourseId} />
        </div>
      </div>
    );
  }

  const isNewViewer = flags.isNewViewer;

  // While the customer data is still loading (e.g. on a hard refresh) the
  // course/lesson are undefined, which would render the viewer with empty data
  // (blank sidebar, lone video spinner, misleading "no materials" text). Show a
  // skeleton that mirrors the real layout instead.
  const isViewerLoading = fetching || !course || !activeQuiz;

  if (isNewViewer && isViewerLoading) {
    return <CourseViewerSkeleton />;
  }

  if (isNewViewer) {
    return (
      <CourseViewer
        sidebarData={{
          courseTitle: course?.course.title ?? "",
          courseData:
            data?.topicsByCourseId?.map((topic) => ({
              title: topic?.title ?? "",
              url: "#",
              items: [
                ...(topic?.lessons?.map((lesson) => ({
                  title: lesson?.title ?? "",
                  url: `/courses/${courseId}/lesson/${lesson?.id}`,
                  isCompleted: !!lesson?.progress?.completed,
                  isActive: false,
                })) ?? []),
                ...(topic?.quizzes?.map((quiz) => ({
                  title: quiz?.title ?? "",
                  url: `/courses/${courseId}/quiz/${quiz?.id}`,
                  isCompleted: !!quiz?.progress?.completed,
                  isActive: quiz?.id === quizId,
                })) ?? []),
              ],
            })) ?? [],
        }}
        navigateToNext={navigateToNext}
        navigateToPrevious={navigateToPrevious}
        headerData={{
          moduleTitle: activeQuiz?.title ?? "",
          userMenuData: {
            menuItems: [
              {
                label: "Dashboard",
                href: "/",
                icon: <LayoutDashboard className="h-4 w-4" />,
              },
              {
                label: "Mi Perfil",
                href: "/profile",
                icon: <UserIcon className="h-4 w-4" />,
              },
              {
                label: "Ayuda",
                href: "https://uspk.com.mx/contact",
                icon: <HelpCircle className="h-4 w-4" />,
              },
              {
                label: "Cerrar sesion",
                icon: <LogOutIcon className="h-4 w-4" />,
                onClick: () => {},
              },
            ],
            userData: {
              fullName: customerData?.fullName ?? "",
              avatarUrl: customerData?.profilePicture ?? "",
            },
          },
        }}
        quizContent={
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
        }
        renderCompleteButton={false}
        lessonContent={(quizState === "intro" && activeQuiz?.content) || ""}
        shouldShowFooterActions={quizState === "intro"}
      />
    );
  }

  return (
    <div key={quizId} className="flex-1 h-screen flex flex-col bg-background">
      <CourseHeader
        courseTitle={course?.title ?? ""}
        topicItemId="mdeiwonmdieow"
        isItemCompleted={activeQuiz?.progress?.completed}
        isLesson={false}
        certificateData={certificateData}
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
