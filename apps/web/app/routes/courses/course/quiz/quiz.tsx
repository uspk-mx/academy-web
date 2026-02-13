import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "urql";
import { PageLoader } from "ui/components/admin";
import { ContentTabs } from "ui/components/admin/courses/content-tabs";
import { CourseHeader } from "ui/components/admin/courses/course-header";
import { CourseSideNavigation } from "ui/components/admin/courses/course-sidenav";
import { Quiz } from "ui/components/admin/courses/quiz/quiz";
import { ScrollArea } from "ui/components/scroll-area";
import { TopicsByCourseDocument } from "gql-generated/gql/graphql";
import type {
  TopicsByCourseQuery,
  TopicsByCourseQueryVariables,
} from "gql-generated/gql/graphql";

export default function QuizPage() {
  const { cid: courseId, quizId } = useParams();
  const navigate = useNavigate();

    const [{ data, fetching }] = useQuery<
    TopicsByCourseQuery,
    TopicsByCourseQueryVariables
  >({
    query: TopicsByCourseDocument,
    variables: {
      courseId: courseId as string,
    },
  });


  const [nextItemLabel, setNextItemLabel] = useState('')
  const [hasMoreTopics, setHasMoreTopics] = useState(false)
  const course = data?.topicsByCourseId?.find((item) => item?.course);

  const activeQuiz = data?.topicsByCourseId
    ?.flatMap((topic) => topic.quizzes || [])
    .find((quiz) => quiz.id === quizId);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
      const topics = data?.topicsByCourseId || [];
      let foundCurrent = false;

      for (let i = 0; i < topics.length; i++) {
        const topic = topics[i];
        const elements = [...(topic.lessons || []), ...(topic.quizzes || [])];
        const sortedElements = elements.sort(
          (a, b) => (a?.position || 0) - (b.position || 0)
        );

        for (let j = 0; j < sortedElements.length; j++) {
          const element = sortedElements[j];

          if (element.id === quizId) {
            foundCurrent = true;

            // Check if there's a next element in the same topic
            if (j < sortedElements.length - 1) {
              setNextItemLabel("Siguiente material")
              setHasMoreTopics(true)
            }

            // Otherwise, move to the next topic
            if (i < topics.length - 1) {
              const nextTopic = topics[i + 1];
              const nextTopicElements = [
                ...(nextTopic.lessons || []),
                ...(nextTopic.quizzes || []),
              ];
              const nextSortedElements = nextTopicElements.sort(
                (a, b) => (a?.position || 0) - (b.position || 0)
              );

              if (nextSortedElements.length > 0) {
                setNextItemLabel("Siguiente seccion")
                setHasMoreTopics(true)
              }
            }

            if (!(j < sortedElements.length - 1 && i < topics.length - 1)) {
              setNextItemLabel("Regresar al dashboard")
              setHasMoreTopics(false)
            }
          }
        }
      }

    if (!foundCurrent) {
      console.warn("Current quiz not found in topics.");
    }
    }, [])
    

  const navigateToNextElement = () => {
    const topics = data?.topicsByCourseId || [];
    let foundCurrent = false;

    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i];
      const elements = [...(topic.lessons || []), ...(topic.quizzes || [])];
      const sortedElements = elements.sort(
        (a, b) => (a?.position || 0) - (b.position || 0)
      );

      for (let j = 0; j < sortedElements.length; j++) {
        const element = sortedElements[j];

        if (element.id === quizId) {
          foundCurrent = true;

          // Check if there's a next element in the same topic
          if (j < sortedElements.length - 1) {
            const nextElement = sortedElements[j + 1];
            console.log("Next element in the same topic: ", nextElement);
            return navigate(
              `/courses/${courseId}/${
                "video" in nextElement ? "lesson" : "quiz"
              }/${nextElement.id}`
            );
          }

          // Otherwise, move to the next topic
          if (i < topics.length - 1) {
            const nextTopic = topics[i + 1];
            const nextTopicElements = [
              ...(nextTopic.lessons || []),
              ...(nextTopic.quizzes || []),
            ];
            const nextSortedElements = nextTopicElements.sort(
              (a, b) => (a?.position || 0) - (b.position || 0)
            );

            if (nextSortedElements.length > 0) {
              const nextElement = nextSortedElements[0];
              console.log("Next element in the next topic: ", nextElement);
              return navigate(
                `/courses/${courseId}/${
                  "video" in nextElement ? "lesson" : "quiz"
                }/${nextElement.id}`
              );
            }
          }

          if (!(j < sortedElements.length - 1 && i < topics.length - 1)) {
              navigate('/courses')
          }
        }
      }
    }

    if (!foundCurrent) {
      console.warn("Current quiz not found in topics.");
    }
  };

  return (
    <div key={quizId} className="flex-1 h-screen flex flex-col bg-background">
      <CourseHeader
        courseTitle={course?.title ?? ""}
        topicItemId="mdeiwonmdieow"
        isItemCompleted={activeQuiz?.progress?.completed}
        isLesson={false}
      />

      <div className="flex flex-1 h-full flex-row">
        <div className="flex-1 h-full">
          <ScrollArea className="flex-1 h-full overflow-y-auto">
            <div className="pb-6 xl:pb-0">
              <div className="relative h-full w-full flex flex-col">
                <div className="relative flex-1 min-w-[1px] h-full flex flex-col justify-center z-0">
                  {!activeQuiz ? (
                    <PageLoader />
                  ) : (
                    <Quiz
                      quiz={activeQuiz}
                      navigateToNextCourseItem={navigateToNextElement}
                      nextItemLabel={nextItemLabel}
                    />
                  )}
                </div>
              </div>
            </div>
            <ContentTabs
              courseTitle={course?.title ?? ""}
              topics={data?.topicsByCourseId}
              lessonDescription=""
              attachments={[]}
            />
          </ScrollArea>
        </div>

        <CourseSideNavigation topics={data?.topicsByCourseId} />
      </div>
    </div>
  );
}
