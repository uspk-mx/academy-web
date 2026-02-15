import type {
  GetProfileQuery,
  GetProfileQueryVariables,
} from "gql-generated/gql/graphql";
import { GetProfileDocument } from "gql-generated/gql/graphql";
import {
  ArrowLeft,
  Award,
  Book,
  CheckCircle2,
  Clock,
  HelpCircle,
  RefreshCw,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { Link, useParams } from "react-router";
import { Button } from "ui/components/button";
import { formatDate } from "ui/lib/utils";
import { useQuery } from "urql";

// Mock data for quiz attempt details
const mockQuizAttempts = {
  1: {
    id: 1,
    date: "March 29, 2025 11:15 am",
    title: "Level 1 Test",
    courseTitle: "Success Abcauss",
    student: "Alvaro Castillo",
    quizTime: "2 Minutes",
    attemptTime: "1 Minute 45 Seconds",
    questions: 3,
    totalMarks: 3,
    passMarks: 2.4,
    passPercentage: 80,
    correctAnswers: 1,
    incorrectAnswers: 2,
    earnedMarks: 1,
    earnedPercentage: 33,
    result: "Fail",
    questionDetails: [
      {
        number: 1,
        type: "Fill in the blank",
        questionText: "Question 1",
        question: "8+6-3 = _____",
        givenAnswer: "10",
        correctAnswer: "11",
        result: "Incorrect",
      },
      {
        number: 2,
        type: "Fill in the blank",
        questionText: "Question 2",
        question: "7+3+5= _____",
        givenAnswer: "15",
        correctAnswer: "15",
        result: "Correct",
      },
      {
        number: 3,
        type: "Fill in the blank",
        questionText: "Question 3",
        question: "15-7-4= _____",
        givenAnswer: "5",
        correctAnswer: "4",
        result: "Incorrect",
      },
    ],
  },
  2: {
    id: 2,
    date: "March 29, 2025 10:30 am",
    title: "Level 1 Test",
    courseTitle: "Success Abcauss",
    student: "Alvaro Castillo",
    quizTime: "2 Minutes",
    attemptTime: "7 Seconds",
    questions: 3,
    totalMarks: 3,
    passMarks: 2.4,
    passPercentage: 80,
    correctAnswers: 0,
    incorrectAnswers: 3,
    earnedMarks: 0,
    earnedPercentage: 0,
    result: "Fail",
    questionDetails: [
      {
        number: 1,
        type: "Fill in the blank",
        questionText: "Question 3",
        question: "8+6-3 = _____",
        givenAnswer: "",
        correctAnswer: "11",
        result: "Incorrect",
      },
      {
        number: 2,
        type: "Fill in the blank",
        questionText: "Question 1",
        question: "7+3+5= _____",
        givenAnswer: "",
        correctAnswer: "15",
        result: "Incorrect",
      },
      {
        number: 3,
        type: "Fill in the blank",
        questionText: "Question 2",
        question: "15-7-4= _____",
        givenAnswer: "",
        correctAnswer: "4",
        result: "Incorrect",
      },
    ],
  },
  3: {
    id: 3,
    date: "March 29, 2025 3:52 am",
    title: "Quiz 1",
    courseTitle: "Introduction to Programming",
    student: "Alvaro Castillo",
    quizTime: "5 Minutes",
    attemptTime: "2 Minutes 30 Seconds",
    questions: 1,
    totalMarks: 1,
    passMarks: 1,
    passPercentage: 100,
    correctAnswers: 1,
    incorrectAnswers: 0,
    earnedMarks: 1,
    earnedPercentage: 100,
    result: "Pass",
    questionDetails: [
      {
        number: 1,
        type: "Multiple Choice",
        questionText: "Question 1",
        question: "What does HTML stand for?",
        givenAnswer: "Hypertext Markup Language",
        correctAnswer: "Hypertext Markup Language",
        result: "Correct",
      },
    ],
  },
  4: {
    id: 4,
    date: "March 27, 2025 8:49 am",
    title: "Hell yeah",
    courseTitle: "Thai Language Basics",
    student: "Alvaro Castillo",
    quizTime: "10 Minutes",
    attemptTime: "8 Minutes 15 Seconds",
    questions: 2,
    totalMarks: 2,
    passMarks: 1.6,
    passPercentage: 80,
    correctAnswers: 1,
    incorrectAnswers: 1,
    earnedMarks: 1,
    earnedPercentage: 50,
    result: "Fail",
    questionDetails: [
      {
        number: 1,
        type: "Multiple Choice",
        questionText: "Question 1",
        question: "What is the Thai word for 'hello'?",
        givenAnswer: "สวัสดี",
        correctAnswer: "สวัสดี",
        result: "Correct",
      },
      {
        number: 2,
        type: "Multiple Choice",
        questionText: "Question 2",
        question: "What is the Thai word for 'thank you'?",
        givenAnswer: "Hell 666",
        correctAnswer: "Heaven 777",
        result: "Incorrect",
      },
    ],
  },
};

export default function QuizAttemptDetailsPage() {
  const params = useParams();
  const id = Number(params.qid);
  const [{ data, fetching }] = useQuery<
    GetProfileQuery,
    GetProfileQueryVariables
  >({
    query: GetProfileDocument,
  });

  // Get the quiz attempt details based on the ID
  const quizAttempt = mockQuizAttempts[id as keyof typeof mockQuizAttempts];

  if (!quizAttempt) {
    return (
      <div className="min-h-screen bg-bg p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <Link to="/quiz-attempts">
            <Button type="button">
              <ArrowLeft className="h-4 w-4" />
              Volver a intentos
            </Button>
          </Link>

          <div className="relative">
            <div className="absolute inset-0 rotate-1 rounded-xl border-4 border-black bg-destructive" />
            <div className="relative rounded-xl border-4 border-black bg-card p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
                <h2 className="text-2xl font-black">
                  Intento de prueba no encontrado
                </h2>
                <p className="max-w-md text-lg font-bold text-muted-foreground">
                  El intento de cuestionario que estás buscando no existe o ha
                  sido eliminado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Back Button */}
        <Link to="/quiz-attempts">
          <Button type="button" variant="neutral">
            <ArrowLeft className="h-4 w-4" />
            Volver a intentos
          </Button>
        </Link>

        {/* Header Card */}
        <div
          className={`overflow-hidden rounded-xl border-4 border-black mt-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
            quizAttempt.result === "Pass"
              ? "bg-chart-2/10"
              : "bg-destructive/10"
          }`}
        >
          <div className="space-y-4 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <Link
                  to={`/courses/${quizAttempt.courseTitle}`}
                  className="text-sm font-bold text-muted-foreground hover:underline"
                >
                  Curso: {quizAttempt.courseTitle}
                </Link>
                <h1 className="text-4xl font-black">{quizAttempt.title}</h1>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {formatDate(quizAttempt.date, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* Result Badge - Large */}
              <div
                className={`flex items-center gap-3 rounded-xl border-4 border-black px-6 py-4 ${
                  quizAttempt.result === "Pass"
                    ? "bg-chart-2 text-white"
                    : "bg-destructive text-white"
                }`}
              >
                {quizAttempt.result === "Pass" ? (
                  <CheckCircle2 className="h-8 w-8" />
                ) : (
                  <XCircle className="h-8 w-8" />
                )}
                <div>
                  <p className="text-sm font-bold opacity-90">Resultado</p>
                  <p className="text-2xl font-black">
                    {quizAttempt.result === "Pass" ? "Aprobado" : "Reprobado"}
                  </p>
                </div>
              </div>
            </div>

            {/* Time Info */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-lg border-2 border-black bg-card px-4 py-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs font-bold text-muted-foreground">
                    Tiempo del Quiz
                  </p>
                  <p className="font-bold">{quizAttempt.quizTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border-2 border-black bg-card px-4 py-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs font-bold text-muted-foreground">
                    Tu Tiempo
                  </p>
                  <p className="font-bold">{quizAttempt.attemptTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
          {[
            {
              label: "Preguntas",
              value: quizAttempt.questions,
              icon: HelpCircle,
              color: "bg-chart-1/20",
            },
            {
              label: "Puntuación Total",
              value: quizAttempt.totalMarks.toFixed(1),
              icon: Award,
              color: "bg-chart-4/20",
            },
            {
              label: "Para Aprobar",
              value: `${quizAttempt.passMarks.toFixed(1)} (${quizAttempt.passPercentage}%)`,
              icon: TrendingUp,
              color: "bg-chart-3/20",
            },
            {
              label: "Correctas",
              value: quizAttempt.correctAnswers,
              icon: CheckCircle2,
              color: "bg-chart-2/20",
            },
            {
              label: "Incorrectas",
              value: quizAttempt.incorrectAnswers,
              icon: XCircle,
              color: "bg-destructive/20",
            },
            {
              label: "Obtenido",
              value: quizAttempt.earnedMarks.toFixed(1),
              icon: Award,
              color: "bg-main/20",
            },
            {
              label: "Porcentaje",
              value: `${quizAttempt.earnedPercentage}%`,
              icon: TrendingUp,
              color:
                quizAttempt.result === "Pass"
                  ? "bg-chart-2/20"
                  : "bg-destructive/20",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black ${stat.color}`}
              >
                <stat.icon className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{stat.value}</p>
                <p className="text-xs font-bold text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Questions Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black">
              Revisión de Preguntas ({quizAttempt.questions})
            </h2>
            <Button type="button" size="sm">
              <RefreshCw className="h-4 w-4" />
              Reintentar Quiz
            </Button>
          </div>

          {/* Question Cards */}
          <div className="space-y-4">
            {quizAttempt.questionDetails.map((question) => (
              <div
                key={question.number}
                className={`overflow-hidden rounded-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${
                  question.result === "Correct"
                    ? "bg-chart-2/5"
                    : "bg-destructive/5"
                }`}
              >
                {/* Question Header */}
                <div className="flex items-center justify-between border-b-4 border-black bg-main p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-card">
                      <span className="text-lg font-black">
                        {question.number}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-muted-foreground">
                        {question.questionText}
                      </p>
                      <p className="text-xs font-bold text-muted-foreground">
                        {question.type}
                      </p>
                    </div>
                  </div>

                  {/* Result Badge */}
                  <div
                    className={`flex items-center gap-2 rounded-full border-2 border-black px-4 py-2 ${
                      question.result === "Correct"
                        ? "bg-chart-2 text-white"
                        : "bg-destructive text-white"
                    }`}
                  >
                    {question.result === "Correct" ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                    <span className="font-black">{question.result}</span>
                  </div>
                </div>

                {/* Question Content */}
                <div className="space-y-4 p-6">
                  {/* Question Text */}
                  <div>
                    <p className="text-sm font-bold text-muted-foreground">
                      Pregunta
                    </p>
                    <p className="text-lg font-bold">{question.question}</p>
                  </div>

                  {/* Answers Grid */}
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Your Answer */}
                    <div
                      className={`rounded-lg border-4 border-black p-4 ${
                        question.result === "Correct"
                          ? "bg-chart-2/10"
                          : "bg-destructive/10"
                      }`}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        {question.result === "Correct" ? (
                          <CheckCircle2 className="h-5 w-5 text-chart-2" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive" />
                        )}
                        <p className="text-sm font-bold text-muted-foreground">
                          Tu Respuesta
                        </p>
                      </div>
                      <p className="text-xl font-black">
                        {question.givenAnswer || (
                          <span className="text-muted-foreground">
                            Sin respuesta
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Correct Answer */}
                    <div className="rounded-lg border-4 border-black bg-chart-2/10 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-chart-2" />
                        <p className="text-sm font-bold text-muted-foreground">
                          Respuesta Correcta
                        </p>
                      </div>
                      <p className="text-xl font-black text-chart-2">
                        {question.correctAnswer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button type="button" size="lg" asChild>
            <Link to={`/courses/${quizAttempt.courseTitle}`}>
              <Book className="h-5 w-5" />
              Ver Curso
            </Link>
          </Button>
          <Button type="button" size="lg" variant="neutral">
            <RefreshCw className="h-5 w-5" />
            Reintentar Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
