import { useMemo } from "react";
import { useParams } from "react-router";
import { ContentTabs } from "ui/components/admin/courses/content-tabs";
import { CourseHeader } from "ui/components/admin/courses/course-header";
import { CourseSideNavigation } from "ui/components/admin/courses/course-sidenav";
import { LoadingVideoSkeleton } from "ui/components/admin/courses/loading-video-skeleton";
import { VideoPlayer } from "ui/components/admin/courses/video-player";
import { ScrollArea } from "ui/components/scroll-area";
import { useCustomerContextProvider } from "ui/context";

export default function LessonPage() {
  const { cid: courseId, lessonId } = useParams();
  const { customerData, fetching } = useCustomerContextProvider();

  const course = customerData?.courses?.find((item) => item?.id === courseId);

  const isLessonCompleted = useMemo(
    () =>
      course?.topics?.some((topic) => {
        const lessons = topic?.lessons?.filter(
          (lesson) => lesson?.id === lessonId
        );
        return lessons?.some((lesson) => lesson.progress?.completed);
      }),
    [course?.topics, lessonId]
  );

  const activeLesson = course?.topics
    ?.flatMap((topic) => topic.lessons)
    .find((lesson) => lesson?.id === lessonId);

  return (
    <div key={lessonId} className="flex-1 h-screen flex flex-col bg-background">
      <CourseHeader
        courseTitle={course?.title || ""}
        topicItemId={lessonId || ""}
        isItemCompleted={isLessonCompleted}
        isLesson
      />

      <div className="flex flex-1 flex-row">
        <div className="flex-1">
          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="relative w-full flex flex-col">
              <div className="relative flex-1 min-w-[1px] flex z-0">
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
