import { create } from "zustand";

export type QuizSection =
  | "intro"
  | "in-progress"
  | "completed"
  | "timeout"
  | "submitted";

export interface QuizState {
  quizState: QuizSection;
}

type QuizAction = {
  updateQuizState: (state: QuizSection) => void;
};

export const useQuizStore = create<QuizState & QuizAction>()((set) => ({
  quizState: "intro",
  updateQuizState: (state) => set({ quizState: state }),
}));
