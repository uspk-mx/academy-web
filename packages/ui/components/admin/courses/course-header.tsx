import { ArrowLeft, CheckCircle2Icon, XIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "ui/components/button";
import { Separator } from "ui/components/separator";
import { useProgress } from "ui/context/progress-context";
import { cn } from "ui/lib/utils";

export const CourseHeader = ({
  courseTitle,
  topicItemId,
  isItemCompleted,
  isLesson,
}: {
  courseTitle: string;
  topicItemId: string;
  isItemCompleted?: boolean;
  isLesson?: boolean;
}) => {
  const {
    markComplete,
    markLessonComplete,
    completedCourseItems,
    totalItems,
    progressPercentage,
  } = useProgress();

  const handleMarkLessonComplete = async () => {
    await markLessonComplete({ lessonId: topicItemId });
  };

  const isDarkMode = false;

  return (
    <div className="bg-background p-4 border-b hidden md:block">
      <div className="flex flex-row items-center gap-4">
        <Button variant="ghost" size="icon" type="button" asChild>
          <Link to="/dashboard/courses" className="flex min-[969px]:hidden">
            <ArrowLeft className="size-5" />
          </Link>
        </Button>

        <div className="hidden min-[969px]:flex flex-row items-center gap-4">
          <Logo isDarkMode={isDarkMode} />
          <Separator className="h-4" orientation="vertical" />
        </div>

        <p className="text-gray-900 text-lg font-bold web:hover:underline web:hover:cursor-default hidden md:flex">
          {courseTitle}
        </p>

        <div className="flex flex-row items-center ml-auto gap-4">
          {/* TODO: uncomment this when ever the public user ux is ready */}
          <p
            className={cn("max-[969px]:hidden", {
              "text-green-600": progressPercentage === 100,
            })}
          >
            {progressPercentage === 100
              ? "🎉 Courso completado!"
              : `Tu progreso: ${completedCourseItems} de ${totalItems} (${progressPercentage}%)`}
          </p>

          {isLesson ? (
            <Button
              variant="noShadowNeutral"
              type="button"
              className={cn("md:flex hidden", {
                "cursor-not-allowed": isItemCompleted,
              })}
              onClick={!isItemCompleted ? handleMarkLessonComplete : undefined}
              disabled={isItemCompleted}
            >
              <div className="text-gray-900! flex flex-row gap-2 items-center">
                <CheckCircle2Icon
                  className={cn("size-4", {
                    "text-green-500": isItemCompleted,
                  })}
                />

                <p className="text-gray-950!">
                  {isItemCompleted ? "Completado" : "Marcar como completado"}
                </p>
              </div>
            </Button>
          ) : null}

          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="rounded-full"
            asChild
          >
            <Link to="/dashboard/courses">
              <XIcon className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

function Logo({ isDarkMode }: { isDarkMode?: boolean }) {
  return (
    <img
      src={
        isDarkMode
          ? "https://res.cloudinary.com/uspk/image/upload/v1668625225/logos/png/white-logo_spokyg.png"
          : "https://res.cloudinary.com/uspk/image/upload/v1668625225/logos/png/black-logo_cxrldb.png"
      }
      className="w-14 h-8"
      alt="Logo de la plataforma"
    />
  );
}
