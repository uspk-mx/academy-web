import { useNavigate } from "react-router";

interface CourseItem {
  id: string;
  topicId?: string;
  type: "lesson" | "quiz";
}

interface UseCourseNavigationProps {
  courseId: string;
  courseItems: CourseItem[];
  currentItemId: string;
}

export function useCourseNavigation({
  courseId,
  courseItems,
  currentItemId,
}: UseCourseNavigationProps) {
  const navigate = useNavigate();
  const currentIndex = courseItems.findIndex(
    (item) => item.id === currentItemId,
  );

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < courseItems.length - 1;

  const previousItem = hasPrevious ? courseItems[currentIndex - 1] : null;
  const nextItem = hasNext ? courseItems[currentIndex + 1] : null;

  const navigateToNext = () => {
    if (hasNext && nextItem) {
      const path =
        nextItem.type === "lesson"
          ? `/courses/${courseId}/lesson/${nextItem.id}`
          : `/courses/${courseId}/quiz/${nextItem.id}`;
      navigate(path);
    } else {
      navigate("/");
    }
  };

  const navigateToPrevious = () => {
    if (hasPrevious && previousItem) {
      const path =
        previousItem.type === "lesson"
          ? `/courses/${courseId}/lesson/${previousItem.id}`
          : `/courses/${courseId}/quiz/${previousItem.id}`;
      navigate(path);
    } else {
      navigate("/");
    }
  };

  return {
    previousItem,
    nextItem,
    hasPrevious,
    hasNext,
    navigateToNext,
    navigateToPrevious,
  };
}
