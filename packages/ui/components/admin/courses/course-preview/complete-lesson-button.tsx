import { Button } from "ui/components/button"
import { useState } from "react"
import { CheckCircle } from 'lucide-react'

interface CompleteLessonButtonProps {
  isEnabled: boolean
  lessonId: number
}

export function CompleteLessonButton({ isEnabled, lessonId }: CompleteLessonButtonProps) {
  const [isCompleted, setIsCompleted] = useState(false)

  const handleComplete = async () => {
    // Here you would typically make an API call to mark the lesson as completed
    // For this example, we'll just set the state
    setIsCompleted(true)
  }

  return (
    <Button
      onClick={handleComplete}
      disabled={!isEnabled || isCompleted}
      className="w-full"
    >
      {isCompleted ? (
        <>
          <CheckCircle className="w-4 h-4 mr-2" />
          Lesson Completed
        </>
      ) : (
        'Mark Lesson as Completed'
      )}
    </Button>
  )
}