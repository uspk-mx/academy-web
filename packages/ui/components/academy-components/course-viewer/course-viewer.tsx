import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "ui/components/button";
import { SidebarInset, SidebarProvider } from "ui/components/sidebar";
import {
  VideoPlayer,
  type VideoPlayerProps,
} from "../video-player/video-player";
import {
  CourseViewerHeader,
  type CourseViewerHeaderProps,
} from "./course-viewer-header";
import {
  CourseViewerSidebar,
  type CourseViewerSidebarProps,
} from "./course-viewer-sidebar";
import { Switch } from "ui/components/switch";
import { LessonContent } from "./lesson-content";
import type { ReactNode } from "react";
import { cn } from "ui/lib/utils";
import { useMediaQuery } from "../hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "ui/components/alert-dialog";

/**
 * We should move the components:
 * Video player and Lessons content and jut require Children
 * as this is just a layout and we should not pass video data or lessson.
 */

export interface CourseViewerProps {
  sidebarData: CourseViewerSidebarProps;
  headerData: CourseViewerHeaderProps;
  videoPlayerData?: VideoPlayerProps;
  quizContent?: ReactNode;
  lessonContent?: string;
  renderContent?: ReactNode;
  renderFooterActions?: ReactNode;
  isItemCompleted?: boolean;
  onCompleteToggle?: () => void;
  onRevertItemComplete?: () => void;
  navigateToNext?: () => void;
  navigateToPrevious?: () => void;
  renderCompleteButton?: boolean;
  shouldShowFooterActions?: boolean;
}

export const CourseViewer = ({
  sidebarData,
  videoPlayerData,
  headerData,
  quizContent,
  lessonContent,
  renderContent,
  isItemCompleted,
  renderFooterActions,
  onCompleteToggle,
  onRevertItemComplete,
  navigateToNext,
  navigateToPrevious,
  renderCompleteButton = true,
  shouldShowFooterActions = true,
}: CourseViewerProps) => {
  const isMobile = useMediaQuery("(min-width: 900px)");
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": isMobile ? "22.5rem" : "19rem",
        } as React.CSSProperties
      }
      className="group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar"
    >
      <CourseViewerSidebar
        courseData={sidebarData.courseData}
        courseTitle={sidebarData.courseTitle}
      />
      <SidebarInset className="relative min-w-0 flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-2 md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ms-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm/5">
        <CourseViewerHeader {...headerData} />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div
            className={cn(
              "min-w-0 min-h-screen flex-1 max-w-full lg:max-w-5xl mx-auto px-4 sm:px-8 mt-4 mb-6 md:min-h-min",
              {
                "m-0 lg:max-w-full": !videoPlayerData,
              },
            )}
          >
            {videoPlayerData ? <VideoPlayer {...videoPlayerData} /> : null}
            {quizContent ? quizContent : null}
            {lessonContent ? <LessonContent content={lessonContent} /> : null}
            {renderContent ? renderContent : null}
            <div
              className={cn(
                "flex items-center justify-center gap-4 lg:gap-0 lg:justify-between mt-6",
                {
                  hidden: !shouldShowFooterActions,
                },
              )}
            >
              <Button
                size="lg"
                className="cursor-pointer"
                variant="noShadow"
                onClick={navigateToPrevious}
              >
                <ArrowLeft className="size-4" /> Previous
              </Button>

              <div className="flex lg:flex-wrap items-center justify-center gap-4">
                {renderCompleteButton && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="lg"
                        variant="noShadowNeutral"
                        className={cn("cursor-pointer px-4 dark:border-white dark:text-white", {
                          "border border-black": isItemCompleted,
                        })}
                      >
                        <Switch
                          checked={isItemCompleted}
                          className="[--thumb-size:--spacing(4)] sm:[--thumb-size:--spacing(3)]"
                        />
                        {isItemCompleted ? "Completado" : "Completar"}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {isItemCompleted
                            ? "Desmarcar lección"
                            : "Completar lección"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {isItemCompleted
                            ? "¿Estás seguro de que deseas desmarcar esta lección como completada?"
                            : "¿Estás seguro de que deseas marcar esta lección como completada?"}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={
                            isItemCompleted
                              ? onRevertItemComplete
                              : onCompleteToggle
                          }
                        >
                          {isItemCompleted ? "Desmarcar" : "Completar"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                <Button
                  size="lg"
                  className="cursor-pointer"
                  variant="noShadow"
                  onClick={navigateToNext}
                >
                  Next <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
            {renderFooterActions ? renderFooterActions : null}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
