import { Button } from "ui/components/button";
import { Plus } from "lucide-react";

export const CourseEmptyPage = ({
  title,
  description,
  buttonLabel,
  action,
}: {
  title: string;
  description?: string;
  buttonLabel?: string;
  action?: () => void;
}) => {
  return (
    <div className="relative">
      <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li className="h-44 rounded-lg bg-gray-50 dark:bg-gray-800" />
        <li className="h-44 rounded-lg bg-gray-50 dark:bg-gray-800" />
        <li className="hidden h-44 rounded-lg bg-gray-50 dark:bg-gray-800 sm:block" />
        <li className="hidden h-44 rounded-lg bg-gray-50 dark:bg-gray-800 sm:block" />
        <li className="hidden h-44 rounded-lg bg-gray-50 dark:bg-gray-800 sm:block" />
        <li className="hidden h-44 rounded-lg bg-gray-50 dark:bg-gray-800 sm:block" />
      </ul>
      {/* Change dark:from-gray-950 in parent below according to your dark mode background */}
      <div className="absolute inset-x-0 bottom-0 flex h-32 flex-col items-center justify-center bg-linear-to-t from-white to-transparent dark:from-gray-950">
        <p className="font-medium text-gray-900 dark:text-gray-50">{title}</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
          {description}
        </p>
        <Button className="mt-6 gap-1" type="button" onClick={action}>
          <Plus className="-ml-1 size-5 shrink-0" aria-hidden={true} />
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};
