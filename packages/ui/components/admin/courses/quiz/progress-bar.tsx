import { cn } from "ui/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export default function ProgressBar({
  current,
  total,
  className,
}: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div
      className={cn("w-full bg-gray-200 rounded-full h-2.5 mb-4", className)}
    >
      <div
        className="bg-black h-2.5 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
