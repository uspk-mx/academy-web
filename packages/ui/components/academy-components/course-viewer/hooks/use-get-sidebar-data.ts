import type { Topic } from "gql-generated/generated/types";

export const useGetSidebarData = ({
  course,
  topics,
  type,
  itemId,
}: {
  course?: {
    id: string;
    title?: string;
  };
  topics?: Omit<Topic, "course">[];
  type: "quiz" | "lesson";
  itemId: string;
}) => {
  if (type === "quiz") {
    return {
      courseTitle: course?.title,
      courseData:
        topics?.map((topic) => ({
          title: topic?.title ?? "",
          url: "#",
          items: [
            ...(topic?.lessons?.map((lesson) => ({
              title: lesson?.title ?? "",
              url: `/courses/${course?.id}/lesson/${lesson?.id}`,
              isCompleted: !!lesson?.progress?.completed,
              isActive: false,
            })) ?? []),
            ...(topic?.quizzes?.map((quiz) => ({
              title: quiz?.title ?? "",
              url: `/courses/${course?.id}/quiz/${quiz?.id}`,
              isCompleted: !!quiz?.progress?.completed,
              isActive: quiz?.id === itemId,
            })) ?? []),
          ],
        })) ?? [],
    };
  }

  return {
    courseTitle: course?.title ?? "",
    courseData:
      topics?.map((topic) => ({
        title: topic?.title ?? "",
        url: "#",
        items: [
          ...(topic?.lessons?.map((lesson) => ({
            title: lesson?.title ?? "",
            url: `/courses/${course?.id}/lesson/${lesson?.id}`,
            isCompleted: lesson?.progress?.completed ?? false,
            isActive: lesson?.id === itemId,
          })) ?? []),
          ...(topic?.quizzes?.map((quiz) => ({
            title: quiz?.title ?? "",
            url: `/courses/${course?.id}/quiz/${quiz?.id}`,
            isCompleted: !!quiz?.progress?.completed,
            isActive: false,
          })) ?? []),
        ],
      })) ?? [],
  };
};
