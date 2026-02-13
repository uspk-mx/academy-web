import {
  ArrowLeftIcon,
  FileTextIcon,
  MessageCircleQuestionIcon,
  VideoIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Button, Checkbox } from "ui/components/index";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "ui/components/accordion";
import { ScrollArea } from "ui/components/scroll-area";
import { useProgress } from "ui/context/progress-context";
import type { CourseQuery } from "gql-generated/generated/types";
import { cn } from "ui/lib/utils";
import { VideoMetadataDisplay } from "./video-metadata-display";

export const CourseSideNavigation = ({
  topics,
}: {
  topics: CourseQuery["course"]["topics"];
}) => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const pathname = location.pathname;
  const [activeItem, setActiveItem] = useState("");

  const { markComplete, markLessonComplete } = useProgress();

  const handleMarkLessonComplete = async (itemId: string) => {
    markComplete(itemId);
    markLessonComplete({ lessonId: itemId });
  };

  const activeTopicTitle = topics?.find(
    (topic) =>
      topic?.lessons?.some((lesson) => pathname.includes(lesson?.id)) ||
      topic.quizzes?.some((quiz) => pathname.includes(quiz?.id))
  )?.title;

  useEffect(() => {
    if (activeTopicTitle) {
      setActiveItem(activeTopicTitle);
    }
  }, [activeTopicTitle]);

  return (
    <>
      {open ? (
        <div className="hidden min-[969px]:flex flex-1 items-stretch bg-white basis-auto flex-col shrink-0 list-none m-0 min-h-0 p-0 relative no-underline z-0 max-w-[375px]">
          <div className={cn("flex-1 border-l border-l-border")}>
            <ScrollArea className="w-full bg-white h-full">
              <div className="sticky top-0 z-10 flex flex-row justify-between items-center px-4 py-2 bg-white border-l-0 border-r-0 border-b border-b-border  border-gray-300">
                <p className="text-base font-semibold">Contenido del curso</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-0"
                  onClick={() => setOpen(false)}
                >
                  <XIcon className="size-5" />
                </Button>
              </div>
              <Accordion
                type="single"
                collapsible
                className="w-full max-w-sm"
                onValueChange={setActiveItem}
                value={activeItem}
              >
                {topics?.map((topic) => {
                  const items = [
                    ...(topic.lessons ?? []).map((lesson) => ({
                      ...lesson,
                    })),

                    ...(topic.quizzes ?? []).map((quiz) => ({ ...quiz })),
                    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                  ].sort((a: any, b: any) => a.position - b.position);

                  return (
                    <AccordionItem
                      className="border-x-0 border-t-0 rounded-none"
                      value={topic.title || ""}
                      key={topic?.id}
                    >
                      <AccordionTrigger className="items-start last:border-b-0 last:border-b-transparent px-4">
                        <div className="flex flex-col items-start gap-2">
                          <p className="text-base">{topic.title}</p>
                          <p className="text-sm">
                            {items.length} Modulo{items.length > 1 ? "s" : ""}
                          </p>
                        </div>
                      </AccordionTrigger>
                      {items.map((item, index) => {
                        const isLesson = item?.__typename === "Lesson";
                        const itemId = item?.id;
                        const activeElement = pathname.includes(item?.id);
                        return (
                          <AccordionContent
                            className={cn("px-4 py-4 hover:bg-background", {
                              "bg-background": activeElement,
                            })}
                            key={item?.id}
                          >
                            <Link
                              to={`/courses/${topic.course?.id}/${
                                isLesson
                                  ? `lesson/${item?.id}`
                                  : `quiz/${item?.id}`
                              }`}
                              viewTransition
                            >
                              <div className="flex flex-row items-starts gap-4">
                                <Checkbox
                                  id="checkbox-06"
                                  className={cn("rounded-full", {
                                    "cursor-not-allowed": !isLesson,
                                  })}
                                  disabled={
                                    !isLesson || !!item.progress?.completed
                                  }
                                  checked={!!item.progress?.completed}
                                  onCheckedChange={() => {
                                    handleMarkLessonComplete(
                                      isLesson ? item.id : item.id
                                    );
                                  }}
                                />
                                <div className="flex flex-col items-start gap-1">
                                  <div
                                    // key={isLesson ? item?.id : item?.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    {isLesson ? (
                                      item.video?.videoURL !== "undefined" ? (
                                        <VideoIcon
                                          size="16"
                                          color={
                                            activeElement
                                              ? "#1d4ed8"
                                              : "#030712"
                                          }
                                        />
                                      ) : (
                                        <FileTextIcon
                                          size="16"
                                          color={
                                            activeElement
                                              ? "#1d4ed8"
                                              : "#030712"
                                          }
                                        />
                                      )
                                    ) : (
                                      <MessageCircleQuestionIcon
                                        size="16"
                                        color={
                                          activeElement ? "#1d4ed8" : "#030712"
                                        }
                                      />
                                    )}
                                    <div className="max-w-72">
                                      <p
                                        className={cn(
                                          "text-gray-950 truncate text-sm",
                                          {
                                            "font-bold": activeElement,
                                          }
                                        )}
                                      >
                                        {item.title}
                                      </p>
                                    </div>
                                  </div>
                                  {isLesson && item.video?.duration !== 0 ? (
                                    <VideoMetadataDisplay
                                      duration={item.video?.duration || 0}
                                    />
                                  ) : null}
                                </div>
                              </div>
                            </Link>
                          </AccordionContent>
                        );
                      })}
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </ScrollArea>
          </div>
        </div>
      ) : (
        <Button
          variant="noShadow"
          className="absolute border-r-0 border-t-0 top-[calc(4.8rem + 0.8rem)] right-0 rounded-none transition-[transform 400ms cubic-bezier(0.2, 0, 0.38, 0.9)] transform-[translateX(-4.8rem)] z-10"
          onClick={() => setOpen(true)}
          type="button"
        >
          <ArrowLeftIcon />
        </Button>
      )}
    </>
  );
};
