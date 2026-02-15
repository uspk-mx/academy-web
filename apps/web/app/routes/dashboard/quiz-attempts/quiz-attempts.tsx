import {
  ArrowLeft,
  Award,
  Book,
  CheckCircle2,
  ChevronRight,
  Clock,
  Filter,
  HelpCircle,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "ui/components/button";

// Mock data for quiz attempts
const mockQuizAttempts = [
  {
    id: 1,
    date: "March 29, 2025 11:15 am",
    title: "Level 1 Test",
    courseTitle: "Success Abcauss",
    student: "Alvaro Castillo",
    questions: 3,
    totalMarks: 3,
    correctAnswers: 1,
    incorrectAnswers: 2,
    earnedMarks: 1,
    earnedPercentage: 33,
    result: "Fail",
    attemptTime: "5 min",
  },
  {
    id: 2,
    date: "March 29, 2025 10:30 am",
    title: "Level 1 Test",
    courseTitle: "Success Abcauss",
    student: "Alvaro Castillo",
    questions: 3,
    totalMarks: 3,
    correctAnswers: 0,
    incorrectAnswers: 3,
    earnedMarks: 0,
    earnedPercentage: 0,
    result: "Fail",
    attemptTime: "7 min",
  },
  {
    id: 3,
    date: "March 29, 2025 3:52 am",
    title: "Quiz 1",
    courseTitle: "Introduction to Programming",
    student: "Alvaro Castillo",
    questions: 1,
    totalMarks: 1,
    correctAnswers: 1,
    incorrectAnswers: 0,
    earnedMarks: 1,
    earnedPercentage: 100,
    result: "Pass",
    attemptTime: "2 min",
  },
  {
    id: 4,
    date: "March 27, 2025 8:49 am",
    title: "Hell yeah",
    courseTitle: "Thai Language Basics",
    student: "Alvaro Castillo",
    questions: 2,
    totalMarks: 2,
    correctAnswers: 1,
    incorrectAnswers: 1,
    earnedMarks: 1,
    earnedPercentage: 50,
    result: "Fail",
    attemptTime: "4 min",
  },
];

type FilterOption = "all" | "pass" | "fail";

export function meta() {
  return [
    { title: "Uspk Academy | Intentos de pruebas" },
    { name: "description", content: "Intentos de pruebas, visualiza y administra los intentos de pruebas de los cursos." },
  ];
}

export default function QuizAttemptsPage() {
  const [quizAttempts, setQuizAttempts] = useState(mockQuizAttempts);
  const [filter, setFilter] = useState<FilterOption>("all");

  // Calculate stats
  const stats = {
    total: quizAttempts.length,
    passed: quizAttempts.filter((q) => q.result === "Pass").length,
    failed: quizAttempts.filter((q) => q.result === "Fail").length,
    passRate:
      quizAttempts.length > 0
        ? Math.round(
            (quizAttempts.filter((q) => q.result === "Pass").length /
              quizAttempts.length) *
              100,
          )
        : 0,
    averageScore:
      quizAttempts.length > 0
        ? Math.round(
            quizAttempts.reduce((sum, q) => sum + q.earnedPercentage, 0) /
              quizAttempts.length,
          )
        : 0,
    bestScore:
      quizAttempts.length > 0
        ? Math.max(...quizAttempts.map((q) => q.earnedPercentage))
        : 0,
  };

  // Filter attempts
  const filteredAttempts = quizAttempts.filter((attempt) => {
    if (filter === "all") return true;
    return filter === "pass"
      ? attempt.result === "Pass"
      : attempt.result === "Fail";
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Back Button */}
        <Link to="/">
          <Button type="button" variant="neutral">
            <ArrowLeft className="h-4 w-4" />
            Volver al dashboard
          </Button>
        </Link>
        {/* Header */}
        <div className="relative mt-6">
          <div className="relative rounded-xl border-4 border-black bg-card p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-lg border-4 border-black bg-chart-1 p-2">
                  <HelpCircle
                    className="h-8 w-8 fill-white stroke-white"
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-black">Mis Intentos de Tests</h1>
                  {quizAttempts.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {stats.total} {stats.total === 1 ? "intento" : "intentos"}{" "}
                      • Tasa de aprobación: {stats.passRate}%
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        {quizAttempts.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              {
                label: "Total",
                value: stats.total,
                icon: Book,
                color: "bg-chart-1/20",
              },
              {
                label: "Aprobados",
                value: stats.passed,
                icon: CheckCircle2,
                color: "bg-chart-2/20",
              },
              {
                label: "Reprobados",
                value: stats.failed,
                icon: XCircle,
                color: "bg-destructive/20",
              },
              {
                label: "% Aprobación",
                value: `${stats.passRate}%`,
                icon: TrendingUp,
                color: "bg-chart-4/20",
              },
              {
                label: "Promedio",
                value: `${stats.averageScore}%`,
                icon: Award,
                color: "bg-chart-3/20",
              },
              {
                label: "Mejor Score",
                value: `${stats.bestScore}%`,
                icon: Award,
                color: "bg-chart-2/20",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-black ${stat.color}`}
                >
                  <stat.icon className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-black tabular-nums leading-none">
                    {stat.value}
                  </p>
                  <p className="truncate text-xs font-bold text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filter Bar */}
        {quizAttempts.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold">Filtrar:</span>
            {(
              [
                { value: "all", label: "Todos" },
                { value: "pass", label: "Aprobados" },
                { value: "fail", label: "Reprobados" },
              ] as const
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFilter(option.value)}
                className={`rounded-xl border-4 border-black px-4 py-2 font-bold transition-all hover:-translate-y-0.5 ${
                  filter === option.value
                    ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-card shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                {option.label}
              </button>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              ({filteredAttempts.length}{" "}
              {filteredAttempts.length === 1 ? "resultado" : "resultados"})
            </span>
          </div>
        )}

        {/* Empty State */}
        {quizAttempts.length === 0 ? (
          <div className="relative">
            <div className="absolute inset-0 rotate-1 rounded-xl border-4 border-black bg-chart-2" />
            <div className="relative rounded-xl border-4 border-black bg-card p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
                <div className="relative h-40 w-40">
                  <div className="absolute inset-0 rotate-6 rounded-full border-4 border-black bg-main" />
                  <div className="relative flex h-full w-full items-center justify-center rounded-full border-4 border-black bg-card">
                    <HelpCircle
                      className="h-20 w-20 stroke-chart-1"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
                <h2 className="text-2xl font-black">
                  Sin Intentos de Quiz aún
                </h2>
                <p className="max-w-md text-lg font-bold text-muted-foreground">
                  Aún no has hecho ningún quiz. ¡Empieza a aprender y pon a
                  prueba tus conocimientos!
                </p>
                <Button type="button" asChild>
                  <Link to="/courses">Buscar Cursos</Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Quiz Attempts Cards
          <div className="grid gap-4 md:grid-cols-2">
            {filteredAttempts.map((attempt) => (
              <div
                key={attempt.id}
                className="group relative overflow-hidden rounded-xl border-4 border-black bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                {/* Header with result badge */}
                <div
                  className={`flex items-center justify-between border-b-4 border-black p-4 ${
                    attempt.result === "Pass"
                      ? "bg-chart-2/20"
                      : "bg-destructive/20"
                  }`}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-black">{attempt.title}</h3>
                    <Link
                      to={`/courses/${attempt.courseTitle.replace(/\s+/g, "-").toLowerCase()}`}
                      className="text-sm text-muted-foreground hover:underline"
                    >
                      {attempt.courseTitle}
                    </Link>
                  </div>
                  <div
                    className={`flex items-center gap-2 rounded-full border-2 border-black px-4 py-1.5 ${
                      attempt.result === "Pass"
                        ? "bg-chart-2 text-white"
                        : "bg-destructive text-white"
                    }`}
                  >
                    {attempt.result === "Pass" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    <span className="font-black">{attempt.result}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 p-4">
                  {/* Date and Time */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="font-bold">
                      {formatDate(attempt.date)}
                    </span>
                  </div>

                  {/* Score - Large and prominent */}
                  <div className="flex items-center justify-between rounded-lg border-2 border-black bg-main p-4">
                    <div>
                      <p className="text-sm font-bold text-muted-foreground">
                        Puntuación
                      </p>
                      <p className="text-4xl font-black tabular-nums">
                        {attempt.earnedPercentage}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-muted-foreground">
                        Calificación
                      </p>
                      <p className="text-2xl font-black">
                        {attempt.earnedMarks}/{attempt.totalMarks}
                      </p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg border-2 border-black bg-card p-3">
                      <p className="text-2xl font-black tabular-nums">
                        {attempt.questions}
                      </p>
                      <p className="text-xs font-bold text-muted-foreground">
                        Preguntas
                      </p>
                    </div>
                    <div className="rounded-lg border-2 border-black bg-chart-2/10 p-3">
                      <p className="text-2xl font-black tabular-nums text-chart-2">
                        {attempt.correctAnswers}
                      </p>
                      <p className="text-xs font-bold text-muted-foreground">
                        Correctas
                      </p>
                    </div>
                    <div className="rounded-lg border-2 border-black bg-destructive/10 p-3">
                      <p className="text-2xl font-black tabular-nums text-destructive">
                        {attempt.incorrectAnswers}
                      </p>
                      <p className="text-xs font-bold text-muted-foreground">
                        Incorrectas
                      </p>
                    </div>
                  </div>

                  {/* Attempt Time */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-muted-foreground">
                      Tiempo de intento
                    </span>
                    <span className="font-bold">{attempt.attemptTime}</span>
                  </div>

                  {/* Action Button */}
                  <Link to={`/quiz-attempts/${attempt.id}`}>
                    <Button type="button" className="w-full" size="sm">
                      Ver Detalles
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty Filter Results */}
        {quizAttempts.length > 0 && filteredAttempts.length === 0 && (
          <div className="rounded-2xl border-4 border-black bg-card p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="mx-auto max-w-md space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-black bg-muted">
                <Filter className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-black">
                No hay intentos {filter === "pass" ? "aprobados" : "reprobados"}
              </h2>
              <p className="text-muted-foreground">
                Intenta con otro filtro para ver más resultados
              </p>
              <button
                type="button"
                onClick={() => setFilter("all")}
                className="inline-flex items-center gap-2 rounded-xl border-4 border-black bg-main px-6 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1"
              >
                Ver todos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
