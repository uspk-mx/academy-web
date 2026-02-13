interface LessonDescriptionProps {
  description: string;
}

export function LessonDescription({ description }: LessonDescriptionProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Lesson Description</h2>
      <p>{description}</p>
    </div>
  );
}
