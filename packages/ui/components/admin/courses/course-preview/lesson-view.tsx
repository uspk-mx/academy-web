import { useState } from "react"
import { VideoPlayer } from "./video-player"
import { LessonDescription } from "./lesson-description"
import { Attachments } from "./attachments"
import { CompleteLessonButton } from "./complete-lesson-button"
import { Quiz } from "./quiz"

interface LessonViewProps {
  lesson: {
    id: number
    title: string
    videoUrl?: string
    description?: string
    attachments?: { name: string; url: string }[]
    type: 'video' | 'quiz'
    quizData?: any
  }
}

export function LessonView({ lesson }: LessonViewProps) {
  const [isVideoComplete, setIsVideoComplete] = useState(false)

  const handleVideoComplete = () => {
    setIsVideoComplete(true)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">{lesson.title}</h1>
      {lesson.type === 'video' && lesson.videoUrl && (
        <>
          <VideoPlayer videoUrl={lesson.videoUrl} onComplete={handleVideoComplete} />
          {lesson.description && <LessonDescription description={lesson.description} />}
          {lesson.attachments && <Attachments attachments={lesson.attachments} />}
          <CompleteLessonButton isEnabled={isVideoComplete} lessonId={lesson.id} />
        </>
      )}
      {lesson.type === 'quiz' && lesson.quizData && (
        <Quiz quizData={lesson.quizData} lessonId={lesson.id} />
      )}
    </div>
  )
}