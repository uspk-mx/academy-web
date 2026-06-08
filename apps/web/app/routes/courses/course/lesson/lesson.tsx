import type {
  LogoutMutation,
  LogoutMutationVariables,
} from "gql-generated/generated/types";
import {
  CourseDocument,
  GetCourseProgressDocument,
  LogoutDocument,
  type CourseQuery,
  type CourseQueryVariables,
  type GetCourseProgressQuery,
  type GetCourseProgressQueryVariables,
} from "gql-generated/gql/graphql";
import { DownloadIcon } from "lucide-react";
import { useMemo } from "react";
import {
  useLoaderData,
  useNavigate,
  useParams,
  useRevalidator,
} from "react-router";
import { toast } from "sonner";
import {
  CourseViewer,
  CourseViewerSkeleton,
} from "ui/components/academy-components";
import { ContentTabs } from "ui/components/admin/courses/content-tabs";
import { CourseCompletionScreen } from "ui/components/admin/courses/course-completion-screen";
import { CourseHeader } from "ui/components/admin/courses/course-header";
import { CourseSideNavigation } from "ui/components/admin/courses/course-sidenav";
import { LoadingVideoSkeleton } from "ui/components/admin/courses/loading-video-skeleton";
import { formatDuration } from "ui/components/admin/courses/video-metadata-display";
import { VideoPlayer } from "ui/components/admin/courses/video-player";
import { Button } from "ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui/components/dialog";
import { ScrollArea } from "ui/components/scroll-area";
import { useProgress } from "ui/context/progress-context";
import { extractFilenameFromCloudinaryUrl } from "ui/lib/cloudinary";
import { getNextCourse } from "ui/lib/course-progression";
import { cn } from "ui/lib/utils";
import { useMutation, useQuery } from "urql";
import { getNextAction } from "~/lib/course-utils";
import { flagsClient } from "~/lib/flags";
import { useCourseNavigation } from "../../../../../../../packages/ui/components/academy-components/course-viewer/hooks/use-course-navigation";
import { useUserData } from "../../../../../../../packages/ui/components/academy-components/course-viewer/hooks/use-user-data";
import { getFileIcon } from "../../../../../../../packages/ui/components/admin/upload-attachments";
import { getFileType } from "../../../../../../../packages/ui/lib/file-manager";
import type { Route } from "./+types/lesson";

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
  topics:
    | Array<{
        id: string;
        position?: number | null;
        lessons?: Array<{
          id: string;
          title: string;
          position?: number | null;
          progress?: { completed?: boolean | null } | null;
        }> | null;
        quizzes?: Array<{
          id: string;
          title: string;
          position?: number | null;
          progress?: { completed?: boolean | null } | null;
        }> | null;
      }>
    | null
    | undefined,
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
        topicId: topic.id,
        title: lesson.title,
        position: lesson.position ?? 0,
        completed: !!lesson.progress?.completed,
      })),
      ...(topic.quizzes ?? []).map((quiz) => ({
        type: "quiz" as const,
        id: quiz.id,
        topicId: topic.id,
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

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Uspk Academy | Lección: ${params.lessonId}` },
    { name: "description", content: `Lección del curso ${params.cid}` },
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

export default function LessonPage() {
  const { cid: courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const [, onLogoutMutation] = useMutation<
    LogoutMutation,
    LogoutMutationVariables
  >(LogoutDocument);

  const handleLogout = async () => {
    try {
      const response = await onLogoutMutation({});

      console.warn("response: ", response);
      if (response.error) {
        toast.error("Error al cerrar sesion");
        return;
        // biome-ignore lint/style/noUselessElse: <explanation>
      } else if (response.data?.logout) {
        // Clear the authentication cookie
        document.cookie =
          "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/login", { replace: true });
      }
    } catch (error) {
      toast.error("Problema al cerrar sesion", {
        description: "Por favor intenta de nuevo",
      });
      console.error(error);
    }
  };

  const [{ customerData, fetching, userMenuData }] = useUserData({
    onLogout: handleLogout,
  });
  const { progressPercentage, markLessonComplete, revertLessonComplete } =
    useProgress();
  const revalidator = useRevalidator();
  const { flags } = useLoaderData<typeof loader>();

  const course = customerData?.courses?.find((item) => item?.id === courseId);

  const { navigateToNext, navigateToPrevious } = useCourseNavigation({
    courseId: courseId || "",
    courseItems: getCourseItemsList(course?.topics),
    currentItemId: lessonId || "",
  });

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

  const [{ data: courseData }] = useQuery<CourseQuery, CourseQueryVariables>({
    query: CourseDocument,
    variables: { courseId: courseId || "" },
    pause: !courseId,
  });

  const [{ data: courseProgressData }] = useQuery<
    GetCourseProgressQuery,
    GetCourseProgressQueryVariables
  >({
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
      <div
        key={lessonId}
        className="flex-1 h-screen flex flex-col bg-background"
      >
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
  const handleMarkLessonComplete = async () => {
    await markLessonComplete({ lessonId: lessonId || "" });
  };

  const handleRevertLessonComplete = async () => {
    await revertLessonComplete(lessonId || "");
  };

  const downloadAttachment = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const result = await response.blob();

      if (result) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(result);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  const isNewViewer = flags.isNewViewer;

  // While the customer data is still loading (e.g. on a hard refresh) the
  // course/lesson are undefined, which would render the viewer with empty data
  // (blank sidebar, lone video spinner, misleading "no materials" text). Show a
  // skeleton that mirrors the real layout instead.
  const isViewerLoading = fetching || !course || !activeLesson;

  if (isNewViewer && isViewerLoading) {
    return <CourseViewerSkeleton />;
  }

  if (isNewViewer) {
    return (
      <CourseViewer
        sidebarData={{
          courseTitle: course?.title ?? "",
          courseData:
            course?.topics?.map((topic) => ({
              title: topic?.title ?? "",
              url: "#",
              items: [
                ...(topic?.lessons?.map((lesson) => ({
                  title: lesson?.title ?? "",
                  url: `/courses/${course?.id}/lesson/${lesson?.id}`,
                  isCompleted: lesson?.progress?.completed ?? false,
                  isActive: lesson?.id === lessonId,
                })) ?? []),
                ...(topic?.quizzes?.map((quiz) => ({
                  title: quiz?.title ?? "",
                  url: `/courses/${course?.id}/quiz/${quiz?.id}`,
                  isCompleted: !!quiz?.progress?.completed,
                  isActive: quiz?.id === lessonId,
                })) ?? []),
              ],
            })) ?? [],
        }}
        headerData={{
          moduleDuration: formatDuration(activeLesson?.video?.duration ?? 0),
          moduleTitle: activeLesson?.title ?? "",
          userMenuData,
        }}
        videoPlayerData={{
          videoUrl: activeLesson?.video?.videoURL ?? "",
          videoFormat: activeLesson?.video?.format ?? "mp4",
          containerClassName: "max-w-full",
          duration: activeLesson?.video?.duration ?? 0,
          isLoading: fetching,
          lessonTitle: activeLesson?.title,
          lessonId: activeLesson?.id,
          revalidator: revalidator,
        }}
        onCompleteToggle={handleMarkLessonComplete}
        onRevertItemComplete={handleRevertLessonComplete}
        isItemCompleted={activeLesson?.progress?.completed}
        lessonContent={activeLesson?.content ?? ""}
        navigateToNext={navigateToNext}
        navigateToPrevious={navigateToPrevious}
        renderContent={
          <>
            <h2 className="text-2xl font-semibold mb-2">
              Materiales adicionales
            </h2>
            {activeLesson?.attachments?.length ? (
              <>
                <div className="flex flex-col items-start gap-2">
                  <p className="text-sm text-muted-foreground">
                    Esta lección incluye {activeLesson.attachments.length}{" "}
                    recursos complementarios.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="noShadowNeutral">Ver materiales</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm p-0" hasCloseButton>
                      <DialogHeader className="text-left p-4 pb-0">
                        <DialogTitle>Materiales de la lección</DialogTitle>
                        <DialogDescription>
                          Visualiza y descarga los recursos adicionales para
                          esta lección. Haz clic en el ícono de descarga para
                          obtener cada archivo individualmente, o descarga todo
                          el paquete de materiales al finalizar.
                        </DialogDescription>
                      </DialogHeader>
                      <div
                        className={cn("px-4", {
                          "pb-4": activeLesson.attachments.length === 1,
                        })}
                      >
                        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                          <div className="grid grid-cols-1 relative sm:max-w-sm w-full">
                            {activeLesson.attachments.map((attachment) => {
                              const fileType = getFileType(attachment);
                              const Icon = getFileIcon(fileType);
                              return (
                                <div
                                  key={attachment}
                                  className="relative w-full border border-border hover:bg-muted border-b-0 last-of-type:border-b p-2 text-left shadow-sm bg-white dark:bg-[#090E1A] dark:border-gray-900"
                                >
                                  <div className="flex flex-row justify-between items-center gap-2 sm:gap-6">
                                    <div className="flex items-center space-x-3">
                                      <Icon className="h-5 w-5 text-muted-foreground" />
                                      <div>
                                        <p className="text-sm font-medium truncate sm:max-w-52">
                                          {extractFilenameFromCloudinaryUrl(
                                            attachment,
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="size-8 text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
                                      onClick={() =>
                                        downloadAttachment(
                                          attachment,
                                          extractFilenameFromCloudinaryUrl(
                                            attachment,
                                          ),
                                        )
                                      }
                                    >
                                      <DownloadIcon className="size-4" />
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}{" "}
                          </div>
                        </div>
                      </div>
                      {activeLesson.attachments.length > 1 && (
                        <DialogFooter className="p-4 border-t bg-gray-50">
                          <Button variant="noShadow" className="w-full">
                            Descargar todo
                          </Button>
                        </DialogFooter>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </>
            ) : (
              <p>No hay materiales adicionales para esta lección.</p>
            )}
          </>
        }
      />
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
