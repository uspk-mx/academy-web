import { useState } from "react";
import { useQuery } from "urql";
import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock,
  TrendingUp,
  Award,
  Calendar,
  Target,
  Loader2,
} from "lucide-react";
import {
  GetUserEnrollmentsDocument,
  type GetUserEnrollmentsQuery,
  type GetUserEnrollmentsQueryVariables,
} from "gql-generated/gql/graphql";

export function meta() {
  return [
    { title: `Uspk Academy | Reportes` },
    { name: "description", content: "Reportes de progreso del estudiante." },
  ];
}

export default function ReportesPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "all">("week");

  const [{ data, fetching }] = useQuery<
    GetUserEnrollmentsQuery,
    GetUserEnrollmentsQueryVariables
  >({ query: GetUserEnrollmentsDocument });

  const courses = data?.getUserEnrollments;

  const stats = {
    total: courses?.length || 0,
    inProgress:
      courses?.filter(
        (c) =>
          c.course?.progress?.progressPercentage &&
          c.course?.progress?.progressPercentage > 0 &&
          c.course?.progress?.progressPercentage < 100
      ).length || 0,
    completed:
      courses?.filter((c) => c.course?.progress?.progressPercentage === 100).length || 0,
    notStarted:
      courses?.filter((c) => !c.course?.progress?.progressPercentage).length || 0,
  };

  // Calculate average score from completed courses
  const completedCourses = courses?.filter(
    (c) => c.course?.progress?.progressPercentage === 100
  );
  const averageScore =
    completedCourses && completedCourses.length > 0
      ? Math.round(
          completedCourses.reduce(
            (sum, c) => sum + (c.course?.progress?.averageScore || 0),
            0
          ) / completedCourses.length
        )
      : 0;

  // Calculate total study hours (mock for now - you might have this in your schema)
  const totalStudyHours = courses?.reduce(
    (sum, c) => sum + (c.course?.progress?.averageCompletionTime || 0),
    0
  );
  const thisWeekHours = Math.round((totalStudyHours || 0) * 0.25); // Mock: 25% of total

  // Mock weekly activity (you can replace with real data if available)
  const weeklyActivity = [
    { day: "Lun", hours: thisWeekHours * 0.25 },
    { day: "Mar", hours: thisWeekHours * 0.2 },
    { day: "Mié", hours: thisWeekHours * 0.1 },
    { day: "Jue", hours: thisWeekHours * 0.25 },
    { day: "Vie", hours: thisWeekHours * 0.15 },
    { day: "Sáb", hours: 0 },
    { day: "Dom", hours: thisWeekHours * 0.05 },
  ];

  // Loading state
  if (fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="text-center">
          <Loader2 className="mx-auto h-16 w-16 animate-spin text-main" />
          <p className="mt-4 text-xl font-black">Cargando tu progreso...</p>
        </div>
      </div>
    );
  }

  const maxHours = Math.max(...weeklyActivity.map((d) => d.hours));

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="relative">
          <div className="relative rounded-xl border-4 border-black bg-card p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-lg border-4 border-black bg-chart-1 p-2">
                  <BarChart3
                    className="h-8 w-8 stroke-white"
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-black">Mi Progreso</h1>
                  <p className="text-sm text-muted-foreground">
                    Seguimiento personal de aprendizaje
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-chart-1/20">
                <BookOpen className="h-6 w-6 text-chart-1" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-3xl font-black tabular-nums">
                  {stats.inProgress}
                </p>
                <p className="text-xs font-bold text-muted-foreground">
                  Cursos Activos
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-chart-2/20">
                <CheckCircle2 className="h-6 w-6 text-chart-2" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-3xl font-black tabular-nums">
                  {stats.completed}
                </p>
                <p className="text-xs font-bold text-muted-foreground">
                  Completados
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-chart-3/20">
                <Clock className="h-6 w-6 text-chart-3" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-3xl font-black tabular-nums">
                  {thisWeekHours.toFixed(1)}h
                </p>
                <p className="text-xs font-bold text-muted-foreground">
                  Esta Semana
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-chart-4/20">
                <Target className="h-6 w-6 text-chart-4" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-3xl font-black tabular-nums">
                  {averageScore}%
                </p>
                <p className="text-xs font-bold text-muted-foreground">
                  Score Promedio
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-xl border-4 border-black bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="border-b-4 border-black bg-main p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black">Actividad Semanal</h2>
                  <div className="flex gap-2">
                    {(["week", "month", "all"] as const).map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => setTimeRange(range)}
                        className={`rounded-lg border-2 border-black px-3 py-1 text-sm font-bold transition-all ${
                          timeRange === range
                            ? "bg-black text-white"
                            : "bg-card hover:bg-muted"
                        }`}
                      >
                        {range === "week"
                          ? "Semana"
                          : range === "month"
                          ? "Mes"
                          : "Todo"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6">
                {/* Bar Chart */}
                <div className="flex items-end justify-between gap-2" style={{ height: 200 }}>
                  {weeklyActivity.map((day) => (
                    <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                      <div className="relative flex w-full items-end justify-center">
                        <div
                          className="w-full rounded-t-lg border-4 border-black bg-chart-1 transition-all hover:bg-chart-1/80"
                          style={{
                            height: `${(day.hours / maxHours) * 160}px`,
                            minHeight: day.hours > 0 ? "20px" : "0px",
                          }}
                        >
                          {day.hours > 0 && (
                            <div className="absolute inset-x-0 -top-6 text-center text-xs font-bold">
                              {day.hours}h
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-bold">{day.day}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-lg border-2 border-black bg-chart-1/10 p-3 text-center">
                  <p className="text-sm font-bold">
                    Total esta semana: {thisWeekHours.toFixed(1)} horas
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border-4 border-black bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="border-b-4 border-black bg-chart-4 p-4">
                <h2 className="text-xl font-black text-white">Cursos Asignados</h2>
              </div>
              <div className="space-y-4 p-6">
                {!courses || courses.length === 0 ? (
                  <div className="py-12 text-center">
                    <BookOpen className="mx-auto h-16 w-16 text-muted-foreground" />
                    <p className="mt-4 font-bold text-muted-foreground">
                      No tienes cursos asignados
                    </p>
                  </div>
                ) : (
                  courses.map((enrollment) => {
                    const course = enrollment.course;
                    const progress = course?.progress;
                    const progressPercentage = progress?.progressPercentage || 0;
                    const isCompleted = progressPercentage === 100;

                    return (
                      <div
                        key={enrollment.id}
                        className="group rounded-lg border-4 border-black bg-card p-4 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <div className="flex items-start gap-4">
                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border-4 border-black">
                            <img
                              src={course?.featuredImage || "https://picsum.photos/seed/course/400/300"}
                              alt={course?.title || "Course"}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-black leading-tight">{course?.title}</h3>
                              {isCompleted && (
                                <div className="shrink-0 rounded-full border-2 border-black bg-chart-2 p-1">
                                  <CheckCircle2 className="h-4 w-4 text-white" />
                                </div>
                              )}
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-bold text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-3 w-3" />
                                {progress?.completedLessons || 0}/{progress?.totalLessons || 0} lecciones
                              </span>
                              {progress?.averageCompletionTime && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {progress.averageCompletionTime.toFixed(1)}h invertidas
                                </span>
                              )}
                              {progress?.updatedAt && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(progress.updatedAt).toLocaleDateString("es-MX")}
                                </span>
                              )}
                            </div>

                            <div className="mt-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="font-bold">Progreso</span>
                                <span className="font-black">{progressPercentage.toFixed(0)}%</span>
                              </div>
                              <div className="mt-1 h-3 overflow-hidden rounded-full border-2 border-black bg-muted">
                                <div
                                  className={`h-full transition-all ${
                                    isCompleted ? "bg-chart-2" : "bg-chart-1"
                                  }`}
                                  style={{ width: `${progressPercentage}%` }}
                                />
                              </div>
                            </div>

                            <div className="mt-3 flex gap-2">
                              {isCompleted ? (
                                <a
                                  href={`/courses/${course?.id}/certificate`}
                                  className="inline-flex items-center gap-1 rounded-lg border-2 border-black bg-chart-2 px-3 py-1 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                >
                                  <Award className="h-3 w-3" />
                                  Ver Certificado
                                </a>
                              ) : (
                                <a
                                  href={`/courses/${course?.id}`}
                                  className="inline-flex items-center gap-1 rounded-lg border-2 border-black bg-main px-3 py-1 text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                >
                                  Continuar Curso →
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border-4 border-black bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="border-b-4 border-black bg-chart-2 p-4">
                <h2 className="font-black text-white">Progreso General</h2>
              </div>
              <div className="p-4">
                <div className="text-center">
                  <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-8 border-black bg-main">
                    <div className="text-center">
                      <p className="text-4xl font-black">
                        {stats.total > 0
                          ? Math.round((stats.completed / stats.total) * 100)
                          : 0}
                        %
                      </p>
                      <p className="text-xs font-bold text-muted-foreground">
                        Completado
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-bold">Total cursos:</span>
                      <span className="font-black">{stats.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Completados:</span>
                      <span className="font-black text-chart-2">
                        {stats.completed}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">En progreso:</span>
                      <span className="font-black text-chart-1">
                        {stats.inProgress}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="rounded-xl border-4 border-black bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="border-b-4 border-black bg-main p-4">
                <h2 className="font-black">Estadísticas Rápidas</h2>
              </div>
              <div className="space-y-3 p-4">
                <div className="flex items-center justify-between rounded-lg border-2 border-black bg-muted p-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-chart-3" />
                    <span className="text-sm font-bold">Total de horas</span>
                  </div>
                  <span className="text-lg font-black">
                    {totalStudyHours ? totalStudyHours.toFixed(1) : 0}h
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border-2 border-black bg-muted p-3">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-chart-2" />
                    <span className="text-sm font-bold">Certificados</span>
                  </div>
                  <span className="text-lg font-black">{stats.completed}</span>
                </div>

                <div className="flex items-center justify-between rounded-lg border-2 border-black bg-muted p-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-chart-1" />
                    <span className="text-sm font-bold">Score promedio</span>
                  </div>
                  <span className="text-lg font-black">{averageScore}%</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border-4 border-black bg-chart-1 p-6 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-5xl">🎯</div>
              <h3 className="mt-4 text-xl font-black">¡Sigue así!</h3>
              <p className="mt-2 text-sm font-bold">
                {stats.total - stats.completed > 0
                  ? `Estás a ${stats.total - stats.completed} ${
                      stats.total - stats.completed === 1 ? "curso" : "cursos"
                    } de completar tu programa`
                  : "¡Has completado todos tus cursos asignados!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






















