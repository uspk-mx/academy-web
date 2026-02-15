import { useMemo, type ReactNode } from "react";
import { Link, useNavigate } from "react-router";
import type {
  Course,
  StartCourseProgressMutation,
  StartCourseProgressMutationVariables,
} from "gql-generated/generated/types";
import { Button } from "ui/components/button";
import { Card, CardContent, CardFooter, CardHeader } from "ui/components/card";
import { Progress } from "ui/components/progress";
import { formatCourseDuration } from "ui/lib/utils";
import { Award, CheckCircle2, Clock } from "lucide-react";
import { useMutation } from "urql";
import { StartCourseProgressDocument } from "gql-generated/gql/graphql";
import { toast } from "sonner";

export function CourseCard({ course }: { course: Course }): ReactNode {
  const navigate = useNavigate();
  const [, startCourseProgressMutation] = useMutation<
    StartCourseProgressMutation,
    StartCourseProgressMutationVariables
  >(StartCourseProgressDocument);

  const handleStartCourse = async (courseId: string) => {
    const result = await startCourseProgressMutation({
      input: {
        courseId: courseId,
      },
    });

    const courseUrl = getCourseUrl(course);

    if (result.error) {
      console.error("Error starting course progress:", result.error);
      toast.error(
        "Error al iniciar el curso. Por favor, inténtalo de nuevo más tarde."
      );
      return;
    }

    if (result.data?.startCourseProgress) {
      toast.success(
        "¡Curso iniciado! Puedes continuar aprendiendo en la sección de cursos.",
      );

      navigate(courseUrl);
    }
  };

  // Calculate course status
  const progress = course.progress?.progressPercentage || 0;
  const isCompleted = progress === 100;
  const isStarted = course.progress?.startedAt !== "";
  const hasCertificate = course.certificates && course.certificates.length > 0;

  // Determine border color based on status
const getBorderColor = useMemo(() => {
  if (isCompleted) return "border-chart-2";  
  if (isStarted) return "border-chart-4";    
  return "border-muted";                     
}, [isCompleted, isStarted]);

  // Get status badge
  const getStatusBadge = () => {
    if (isCompleted) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-chart-2 px-3 py-1 text-xs font-bold text-white">
          <CheckCircle2 className="h-3 w-3" />
          Completado
        </span>
      );
    }
    if (isStarted) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-chart-4 px-3 py-1 text-xs font-bold">
          <Clock className="h-3 w-3" />
          En progreso
        </span>
      );
    }
    return null;
  };

  const getCTAText = () => {
    if (isCompleted) return "Revisar curso";
    if (isStarted) return "Continuar aprendiendo";
    return "Iniciar curso";
  };

  return (
    <Card
      className={`group flex flex-col overflow-hidden border-4 transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${getBorderColor}`}
    >
      <CardHeader className="relative p-0">
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <img
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={
              course.featuredImage ||
              "https://res.cloudinary.com/uspk/image/upload/v1737397211/web_assets/e023e32c-069c-4212-8bfa-c418692f54cf.png"
            }
          />
          
          {/* Status Badge - Top Left */}
          {getStatusBadge() && (
            <div className="absolute left-3 top-3">
              {getStatusBadge()}
            </div>
          )}

          {/* Certificate Badge - Top Right */}
          {isCompleted && hasCertificate && (
            <div className="absolute right-3 top-3">
              <div className="flex items-center justify-center rounded-lg border-2 border-black bg-white p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Award className="h-4 w-4 text-chart-1" strokeWidth={2.5} />
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between p-4 pb-0">
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-base font-bold leading-tight">
            {course.title}
          </h3>
          {course.instructors && course.instructors.length > 0 && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {course.instructors
                .map((instructor) => instructor?.fullName)
                .join(", ")}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-center gap-4 p-4">
        {/* Progress Section */}
        <div className="flex w-full flex-col items-start gap-2">
          {isStarted ? (
            <>
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-bold text-muted-foreground">
                  Progreso
                </p>
                <p className="text-sm font-bold tabular-nums">
                  {Math.round(progress)}%
                </p>
              </div>
              <Progress value={progress} className="h-2.5" />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-lg border-2 border-black bg-main p-1.5">
                <Clock className="h-4 w-4" strokeWidth={2.5} />
              </div>
              <p className="text-sm font-bold text-muted-foreground">
                {formatCourseDuration(course.duration)} de duración
              </p>
            </div>
          )}
        </div>

        {/* Completed Badge */}
        {isCompleted && (
          <div className="flex w-full items-center justify-between rounded-lg border-2 border-black bg-chart-2/10 p-3">
            <span className="text-sm font-bold">¡Curso completado!</span>
            <CheckCircle2 className="h-5 w-5 text-chart-2" strokeWidth={2.5} />
          </div>
        )}

        {/* CTA Button */}
        <div className="flex w-full items-center gap-2">
          <Button
            type="button"
            variant="noShadow"
            className="w-full"
            onClick={async () =>
              isStarted
                ? navigate(getCourseUrl(course))
                : await handleStartCourse(course.id)
            }
          >
            {getCTAText()}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function getCourseUrl(course: Course) {
  const topics = [...(course.topics ?? [])].sort(
    (a, b) => (a?.position ?? 0) - (b?.position ?? 0)
  );

  const items: Array<{
    type: "lesson" | "quiz";
    id: string;
    position?: number;
    progress?: { completed?: boolean } | null;
  }> = [];

  topics.forEach((topic) => {
    const topicItems = [
      ...(topic?.lessons ?? []).map((lesson) => ({
        type: "lesson" as const,
        id: lesson!.id,
        position: lesson!.position ?? 0,
        progress: lesson!.progress,
      })),
      ...(topic?.quizzes ?? []).map((quiz) => ({
        type: "quiz" as const,
        id: quiz!.id,
        position: quiz!.position ?? 0,
        progress: quiz!.progress,
      })),
    ];
    topicItems.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    items.push(...topicItems);
  });

  const firstIncomplete = items.find((item) => !item.progress?.completed);
  const target = firstIncomplete ?? items[0];

  if (!target) return `/courses/${course.id}`;

  return target.type === "quiz"
    ? `/courses/${course.id}/quiz/${target.id}`
    : `/courses/${course.id}/lesson/${target.id}`;
}
