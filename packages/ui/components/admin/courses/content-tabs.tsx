import {
  AlertCircleIcon,
  CheckCircle2Icon,
  DownloadCloudIcon,
  DownloadIcon,
  EllipsisVerticalIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "ui/components/button";
import { HtmlRenderer } from "ui/components/html-renderer";
import { Separator } from "ui/components/separator";
import type { CourseQuery } from "gql-generated/generated/types";
import { useWindowSize } from "ui/hooks/use-window-size";
import { extractFilenameFromCloudinaryUrl } from "ui/lib/cloudinary";
import { cn } from "ui/lib/utils";
import { CourseMobileMenu } from "./course-mobile-menu";

import { useParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui/components/tabs";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "ui/components/vaul-drawer";
import { useProgress } from "ui/context/progress-context";

export const ContentTabs = ({
  courseTitle,
  topics,
  lessonDescription,
  attachments,
  isItemCompleted,
  isLesson
}: {
  courseTitle: string;
  topics: CourseQuery["course"]["topics"];
  lessonDescription?: string;
  attachments?: string[];
  isItemCompleted?: boolean;
  isLesson?: boolean
}) => {
  const windowSize = useWindowSize();
  const width = windowSize.width ?? 0;
  const { lessonId } = useParams();
  const {
    markComplete,
    markLessonComplete,
    completedCourseItems,
    isLessonCompleted,
    totalItems,
    progressPercentage,
  } = useProgress();

  const handleMarkLessonComplete = async () => {
    if (!lessonId) return;
    markComplete(lessonId);
    markLessonComplete({ lessonId });
  };

  // Determine tabs based on width and content
  const courseContentTab = width <= 969 ? ["modules"] : [];
  const tabs = [
    ...courseContentTab,
    ...(lessonDescription ? ["content"] : []),
    ...(attachments && attachments.length > 0 ? ["attachments"] : []),
  ];

  // Set initial active tab to the first available tab
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [previousTab, setPreviousTab] = useState<string | null>(null);

  useEffect(() => {
    if (width <= 968) {
      // Only set to "Módulos" if it's not already active
      if (!tabs.includes(activeTab)) {
        setActiveTab("modules");
      }
    } else if (!tabs.includes(activeTab)) {
      // On larger screens, fallback to the first tab if the current tab is invalid
      setActiveTab(tabs[0] || "");
    }
  }, [width, tabs[0], activeTab]);

  const shouldShowTabs = width <= 968 || tabs.length > 1;

  if (tabs.length === 0 && width > 968) {
    return lessonDescription ? (
      <div className="max-w-4xl flex flex-col mx-auto p-6">
        <p className="text-gray-700 text-base">
          <HtmlRenderer content={lessonDescription} />
        </p>
      </div>
    ) : null;
  }

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

  const handleDonwloadAttachments = async () => {
    if (!attachments) return;
    for (const attachment of attachments) {
      await downloadAttachment(
        attachment,
        extractFilenameFromCloudinaryUrl(attachment)
      );
    }
  };

  return (
    <div>
      {!isLesson && <Separator />}
      <div
        className={cn("p-4 flex items-center gap-2 justify-between", {
          "pb-0": !isLesson,
        })}
      >
        <p className="text-left text-base font-semibold line-clamp-1">
          {courseTitle}
        </p>
        <Drawer>
          <DrawerTrigger asChild>
            <DrawerTrigger asChild>
              <Button variant="ghost">
                <EllipsisVerticalIcon />
              </Button>
            </DrawerTrigger>
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex flex-col flex-1 pb-4 px-4 gap-4 mt-4">
              <Button
                variant="noShadowNeutral"
                type="button"
                className={cn({
                  "cursor-not-alloweD": isLessonCompleted || isItemCompleted,
                })}
                disabled={isLessonCompleted || isItemCompleted}
                onClick={
                  !isLessonCompleted || !isItemCompleted
                    ? handleMarkLessonComplete
                    : undefined
                }
                size="lg"
              >
                <div className="text-gray-900! flex flex-row gap-2 items-center">
                  <CheckCircle2Icon
                    className={cn("size-4", {
                      "text-green-500": isLessonCompleted || isItemCompleted,
                    })}
                  />

                  <p className="text-gray-950!">
                    {isLessonCompleted || isItemCompleted
                      ? "Completado"
                      : "Marcar como completado"}
                  </p>
                </div>
              </Button>
              <Button
                variant="noShadowNeutral"
                onClick={handleDonwloadAttachments}
                type="button"
                size="lg"
              >
                <DownloadIcon />
                Descargar adjuntos
              </Button>
              <Button variant="noShadowNeutral" type="button" size="lg">
                <AlertCircleIcon />
                Reportar un problema
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      {isLesson && <Separator />}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="items-center"
      >
        <TabsList className="h-auto rounded-none border-b bg-transparent p-0 w-full">
          {isLesson && (
            <TabsTrigger
              value="modules"
              className="w-full flex min-[969px]:hidden data-[state=active]:after:bg-primary relative rounded-none py-4 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Modulos
            </TabsTrigger>
          )}
          {lessonDescription && (
            <TabsTrigger
              value="content"
              className="w-full data-[state=active]:after:bg-primary relative rounded-none py-4 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Descripcion
            </TabsTrigger>
          )}
          {attachments && attachments.length > 0 && (
            <TabsTrigger
              value="attachments"
              className="w-full data-[state=active]:after:bg-primary relative rounded-none py-4 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Adjuntos
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="modules" className="mt-0">
          <CourseMobileMenu topics={topics || []} />
        </TabsContent>

        {lessonDescription && (
          <TabsContent value="content" className="px-4">
            <div className="flex flex-col items-start gap-2 w-full">
              <h3 className="text-lg font-semibold">Acerca de la leccion</h3>
              <div className="text-gray-700 text-base w-full">
                <HtmlRenderer content={lessonDescription ?? ""} />
              </div>
            </div>
          </TabsContent>
        )}
        {attachments && attachments.length > 0 && (
          <TabsContent value="attachments">
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-3 sm:gap-6 p-4">
              {attachments.map((attachment) => (
                <div
                  key={attachment}
                  className="relative w-full rounded-lg border-2 border-border p-3 sm:p-6 text-left shadow-sm bg-white dark:bg-[#090E1A] dark:border-gray-900"
                >
                  <div className="flex flex-row justify-between items-center gap-2 sm:gap-6">
                    <p className="text-gray-700 truncate text-sm sm:text-base">
                      {extractFilenameFromCloudinaryUrl(attachment)}
                    </p>
                    <Button
                      size="icon"
                      variant="noShadowNeutral"
                      className="rounded-full shrink-0"
                      onClick={() =>
                        downloadAttachment(
                          attachment,
                          extractFilenameFromCloudinaryUrl(attachment)
                        )
                      }
                    >
                      <DownloadCloudIcon color="#2563eb" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
