type CourseItem = {
  type: "lesson" | "quiz";
  id: string;
  title: string;
  completed: boolean;
};

type NextAction = {
  label: string;
  target: { type: "lesson" | "quiz"; id: string } | null;
};

export function getCourseItemsList(
  topics:
    | Array<{
        id: string;
        position?: number | null;
        lessons?: Array<{
          id: string;
          title: string;
          position?: number | null;
          progress?: { completed?: boolean | null } | null;
        }> | null;
        quizzes?: Array<{
          id: string;
          title: string;
          position?: number | null;
          progress?: { completed?: boolean | null } | null;
        }> | null;
      }>
    | null
    | undefined,
): CourseItem[] {
  const sortedTopics = [...(topics ?? [])].sort(
    (a, b) => (a.position ?? 0) - (b.position ?? 0),
  );

  const items: CourseItem[] = [];

  for (const topic of sortedTopics) {
    const topicItems = [
      ...(topic.lessons ?? []).map((lesson) => ({
        type: "lesson" as const,
        id: lesson.id,
        topicId: topic.id,
        title: lesson.title,
        position: lesson.position ?? 0,
        completed: !!lesson.progress?.completed,
      })),
      ...(topic.quizzes ?? []).map((quiz) => ({
        type: "quiz" as const,
        id: quiz.id,
        topicId: topic.id,
        title: quiz.title,
        position: quiz.position ?? 0,
        completed: !!quiz.progress?.completed,
      })),
    ];
    topicItems.sort((a, b) => a.position - b.position);
    items.push(...topicItems);
  }

  return items;
}


export function getNextAction(items: CourseItem[], currentId?: string): NextAction {
  const currentIndex = items.findIndex((item) => item.id === currentId);

  // Priority 1: Next item after current
  if (currentIndex >= 0 && currentIndex < items.length - 1) {
    const next = items[currentIndex + 1];
    const label =
      next.type === "lesson" ? "Siguiente lección" : "Siguiente quiz";
    return { label, target: { type: next.type, id: next.id } };
  }

  // Priority 2: First incomplete lesson before current
  const incompleteBeforeCurrent = items.find(
    (item, i) => i < currentIndex && !item.completed && item.type === "lesson",
  );
  if (incompleteBeforeCurrent) {
    return {
      label: `Continuar: ${incompleteBeforeCurrent.title}`,
      target: {
        type: "lesson",
        id: incompleteBeforeCurrent.id,
      },
    };
  }

  // Priority 3: All done
  return { label: "Volver al dashboard", target: null };
}
