import type { CourseQuery } from "gql-generated/generated/types";
import {
  FileTextIcon,
  MessageCircleQuestionIcon,
  VideoIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "ui/components/accordion";
import { Checkbox } from "ui/components/checkbox";
import { ScrollArea } from "ui/components/scroll-area";
import { useProgress } from "ui/context/progress-context";
import { cn } from "ui/lib/utils";
import { VideoMetadataDisplay } from "./video-metadata-display";

export const CourseMobileMenu = ({
  topics,
}: {
  topics: CourseQuery["course"]["topics"];
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const { pathname } = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const { isCompleted, markComplete, markLessonComplete } = useProgress();

  const activeTopicTitle = topics?.find(
    (topic) =>
      topic.lessons?.some((lesson) => pathname.includes(lesson?.id)) ||
      topic.quizzes?.some((quiz) => pathname.includes(quiz?.id)),
  )?.title;

  useEffect(() => {
    if (activeTopicTitle) {
      setActiveItem(activeTopicTitle);
    }
  }, [activeTopicTitle]);

  return (
    <div className="flex">
      <div className="flex-1">
        <ScrollArea className="w-full bg-background">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            onValueChange={setActiveItem}
            value={activeItem}
          >
            {topics?.map((topic, index) => {
              const items = [
                ...(topic.lessons ?? []).map((lesson) => ({
                  ...lesson,
                  type: "lesson",
                })),

                ...(topic.quizzes ?? []).map((quiz) => ({
                  ...quiz,
                  type: "quiz",
                })),
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              ].sort((a: any, b: any) => a.position - b.position);

              return (
                <AccordionItem
                  key={topic?.id}
                  className="border-x-0 border-t-0 rounded-none"
                  value={topic.title ?? ""}
                >
                  <AccordionTrigger className="items-start last:border-b-0 last:border-b-transparent px-4">
                    <div className="flex flex-col items-start gap-2">
                      <p className="text-base">{topic.title}</p>
                      <p className="text-sm">{items.length} Modulos</p>
                    </div>
                  </AccordionTrigger>
                  {items.map((item, index) => {
                    const isLesson = "video" in item;
                    const itemId = item.id;
                    const activeElement = pathname.includes(item.id);

                    return (
                      <AccordionContent
                        className={cn("px-4 py-4 hover:bg-background", {
                          "bg-background": activeElement,
                        })}
                        key={item.id}
                      >
                        <Link
                          to={`/courses/${topic.course?.id}/${
                            isLesson ? `lesson/${item?.id}` : `quiz/${item?.id}`
                          }`}
                        >
                          <div className="flex flex-row items-starts gap-4">
                            <Checkbox
                              id="checkbox-06"
                              className={cn("rounded-full", {
                                "cursor-not-allowed": !isLesson,
                              })}
                              disabled={!isLesson || !!item.progress?.completed}
                              checked={!!item.progress?.completed}
                              onClick={(e) => e.stopPropagation()}
                              onCheckedChange={() => {
                                if (isLesson) {
                                  markLessonComplete({ lessonId: itemId });
                                  markComplete(itemId);
                                }
                              }}
                            />
                            <div className="flex flex-col items-start gap-1">
                              <div className="flex flex-row items-center gap-2">
                                {isLesson ? (
                                  item.video?.videoURL !== "undefined" ? (
                                    <VideoIcon
                                      size="16"
                                      color={
                                        activeElement ? "#1d4ed8" : "#030712"
                                      }
                                    />
                                  ) : (
                                    <FileTextIcon
                                      size="16"
                                      color={
                                        activeElement ? "#1d4ed8" : "#030712"
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
                                      },
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
  );
};
