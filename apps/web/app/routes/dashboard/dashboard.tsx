import type {
  GetProfileQuery,
  GetProfileQueryVariables,
  LogoutMutation,
  LogoutMutationVariables,
} from "gql-generated/gql/graphql";
import {
  GetProfileDocument,
  LogoutDocument,
} from "gql-generated/gql/graphql";
import {
  Award,
  Book,
  CheckCircle2,
  ChevronRight,
  Clock,
  GraduationCap,
  PlayCircle,
  Star,
  Target,
  Zap,
} from "lucide-react";
import { Link, redirect, useNavigate } from "react-router";
import { useMutation, useQuery } from "urql";

export const loader = async ({ request }: { request: Request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = Object.fromEntries(
    cookieHeader?.split("; ").map((cookie) => cookie.split("=")) || []
  );

  const sessionToken = cookies.session_token;

  if (!sessionToken) {
    // Redirect to login if session token is missing
    return redirect("/login");
  }

  return null; // Proceed if authenticated
};

export function meta() {
  return [
    { title: "Uspk Academy | Dashboard" },
    { name: "description", content: "Dashboard de Uspk Academy" },
  ];
}

export default function DashboardPage() {
 const navigate = useNavigate();

  const [, logoutMutation] = useMutation<
    LogoutMutation,
    LogoutMutationVariables
  >(LogoutDocument);

  const [{ data, fetching }] = useQuery<
    GetProfileQuery,
    GetProfileQueryVariables
  >({
    query: GetProfileDocument,
  });

  // Calculate statistics
  const stats = {
    enrolled: data?.getProfile?.courses.length ?? 0,
    active:
      data?.getProfile?.courses.filter((item) => item?.progress?.startedAt)
        .length ?? 0,
    completed:
      data?.getProfile?.courses.filter((item) => item?.progress?.completed)
        .length ?? 0,
    lessonsCompleted:
      data?.getProfile?.courses?.flatMap(
        (course) =>
          course?.topics?.flatMap((topic) =>
            topic?.lessons?.filter((lesson) => lesson?.progress?.completed)
          ) || []
      ).length ?? 0,
    quizzesCompleted:
      data?.getProfile?.courses?.flatMap(
        (course) =>
          course?.topics?.flatMap((topic) =>
            topic?.quizzes?.filter((quiz) => quiz?.progress?.completed)
          ) || []
      ).length ?? 0,
    certificates:
      data?.getProfile?.courses.find((course) => course)?.certificates
        ?.length ?? 0,
  };

  // Get in-progress courses
  const inProgressCourses =
    data?.getProfile?.courses
      ?.filter(
        (item) =>
          item?.progress?.startedAt &&
          new Date(item.progress.startedAt) <= new Date() &&
          !item.progress?.completedAt
      )
      .sort(
        (a, b) =>
          new Date(b?.progress?.startedAt || 0).getTime() -
          new Date(a?.progress?.startedAt || 0).getTime()
      ) || [];

  const lastCourse = inProgressCourses[0];
  const isNewUser = stats.enrolled === 0; 

  return (
  <div className="min-h-screen p-6">
      {/* Welcome Header */}
      <div className="mb-6 space-y-1">
        <h1 className="text-4xl font-black tracking-tight">
          Hola, {data?.getProfile?.fullName?.split(" ")[0] || "Alvaro"} 👋
        </h1>
        <p className="text-base text-muted-foreground">
          {isNewUser
            ? "¡Bienvenido! Comienza tu viaje de aprendizaje."
            : stats.active > 0
              ? `Tienes ${stats.active} ${stats.active === 1 ? "curso activo" : "cursos activos"}. ¡Sigue así!`
              : "¿Listo para continuar aprendiendo?"}
        </p>
      </div>

      {/* Hero Section - Only show ONE CTA */}
      {lastCourse ? (
        // User has courses in progress
        <Link
          to={`/courses/${lastCourse.id}`}
          className="group mb-6 block overflow-hidden rounded-2xl border-4 border-black bg-main p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-4 border-black bg-white">
                <img
                  src={lastCourse.featuredImage}
                  alt={lastCourse.title || "Course"}
                  className="h-full w-full object-cover mix-blend-multiply"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-bold">
                    <Clock className="h-3 w-3" />
                    En Progreso
                  </span>
                </div>
                <h2 className="text-xl font-black md:text-2xl">
                  {lastCourse.title || "Curso sin título"}
                </h2>
                <p className="line-clamp-1 text-sm text-muted-foreground md:line-clamp-2">
                  {lastCourse.shortDescription || "Sin descripción"}
                </p>
                {lastCourse.progress?.progressPercentage !== undefined && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>Progreso</span>
                      <span>
                        {Math.round(lastCourse.progress.progressPercentage)}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full border-2 border-black bg-white">
                      <div
                        className="h-full bg-black transition-all duration-300"
                        style={{
                          width: `${lastCourse.progress.progressPercentage}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 self-end md:self-center md:flex-col md:items-end">
              <span className="text-base font-bold md:text-lg">Continuar</span>
              <PlayCircle className="h-7 w-7 transition-transform group-hover:translate-x-1 md:h-8 md:w-8" />
            </div>
          </div>
        </Link>
      ) : (
        // New user - show explore CTA
        <Link
          to="/courses"
          className="group mb-6 block overflow-hidden rounded-2xl border-4 border-black bg-main p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
        >
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-black md:text-3xl">
                Explora nuestro catálogo de cursos
              </h2>
              <p className="text-sm text-muted-foreground md:text-base">
                Descubre cursos diseñados para impulsar tu carrera
              </p>
            </div>
            <div className="flex items-center gap-2 self-end md:self-center">
              <span className="text-lg font-bold">Explorar</span>
              <ChevronRight className="h-8 w-8 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      )}

      {/* Stats Grid - FIXED ALIGNMENT */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {[
          {
            label: "Inscritos",
            value: stats.enrolled,
            icon: Book,
            href: "/courses",
          },
          {
            label: "Activos",
            value: stats.active,
            icon: GraduationCap,
          },
          {
            label: "Completados",
            value: stats.completed,
            icon: CheckCircle2,
          },
          {
            label: "Lecciones",
            value: stats.lessonsCompleted,
            icon: Target,
          },
          {
            label: "Quizzes",
            value: stats.quizzesCompleted,
            icon: Zap,
          },
          {
            label: "Certificados",
            value: stats.certificates,
            icon: Award,
          },
        ].map((stat) => (
          <Link
            key={stat.label}
            to={stat.href || "#"}
            className="group relative flex flex-col justify-between rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            {/* Icon in top-right corner */}
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-bold text-muted-foreground">
                {stat.label}
              </span>
              <div className="shrink-0 rounded-lg border-2 border-black bg-main p-1.5">
                <stat.icon className="h-4 w-4" strokeWidth={2.5} />
              </div>
            </div>
            
            {/* Value at bottom */}
            <p className="text-3xl font-black tabular-nums leading-none">
              {stat.value}
            </p>
          </Link>
        ))}
      </div>

      {/* Continue Where You Left Off - Only show if there are more courses */}
      {inProgressCourses.length > 1 && (
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black">Continúa donde lo dejaste</h2>
            <Link
              to="/courses"
              className="group flex items-center gap-1.5 text-sm font-bold transition-colors hover:underline"
            >
              Ver todos
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inProgressCourses.slice(1, 4).map((course) => (
              <Link
                key={course?.id}
                to={`/courses/${course?.id}`}
                className="group relative overflow-hidden rounded-xl border-4 border-black bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="aspect-video overflow-hidden border-b-4 border-black bg-muted">
                  <img
                    src={course?.featuredImage}
                    alt={course?.title || "Course"}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3 p-4">
                  <h3 className="line-clamp-2 font-bold leading-tight">
                    {course?.title || "Curso sin título"}
                  </h3>
                  {course?.progress?.progressPercentage !== undefined && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-muted-foreground">Progreso</span>
                        <span>
                          {Math.round(course.progress.progressPercentage)}%
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full border-2 border-black bg-muted">
                        <div
                          className="h-full bg-main transition-all duration-300"
                          style={{
                            width: `${course.progress.progressPercentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Empty State - ONLY show for completely new users with no courses */}
      {isNewUser && (
        <div className="rounded-2xl border-4 border-black bg-card p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="mx-auto max-w-md space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-black bg-main">
              <Star className="h-8 w-8" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-black">
              ¡Comienza tu viaje de aprendizaje!
            </h2>
            <p className="text-muted-foreground">
              Descubre cursos diseñados por expertos para impulsar tu carrera
              profesional
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-xl border-4 border-black bg-main px-6 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              Explorar Cursos
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
