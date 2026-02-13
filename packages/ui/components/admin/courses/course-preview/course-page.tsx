import { useState } from "react";
import { SidebarProvider } from "ui/components/sidebar";
import { CourseSidebar } from "./course-sidebar";
import { LessonView } from "./lesson-view";

const mockLessons = [
  {
    id: 1,
    title: "Introduction to React",
    videoUrl: "/placeholder.svg?height=360&width=640",
    description:
      "In this lesson, we'll introduce you to React and its core concepts.",
    attachments: [
      { name: "React Cheat Sheet", url: "#" },
      { name: "Lesson Slides", url: "#" },
    ],
    type: "video" as const,
  },
  {
    id: 2,
    title: "React Hooks",
    videoUrl: "/placeholder.svg?height=360&width=640",
    description:
      "Learn about React Hooks and how they can simplify your components.",
    attachments: [{ name: "Hooks Reference", url: "#" }],
    type: "video" as const,
  },
  {
    id: 3,
    title: "Module 1 Quiz",
    type: "quiz" as const,
    quizData: {
      questions: [
        {
          id: 1,
          question: "What is React?",
          options: [
            "A JavaScript library for building user interfaces",
            "A programming language",
            "A database management system",
            "An operating system",
          ],
          correctAnswer: 0,
        },
        {
          id: 2,
          question: "Which hook is used for side effects in React?",
          options: ["useState", "useEffect", "useContext", "useReducer"],
          correctAnswer: 1,
        },
      ],
    },
  },
];

export function CoursePage() {
  const [selectedLesson, setSelectedLesson] = useState(mockLessons[0]);

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <CourseSidebar
          onSelectLesson={setSelectedLesson as any}
          lessons={mockLessons}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <LessonView lesson={selectedLesson} />
        </main>
      </div>
    </SidebarProvider>
  );
}
