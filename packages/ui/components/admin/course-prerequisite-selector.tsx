import * as React from "react";
import { Check, ChevronsUpDown, GripVertical, X } from "lucide-react";

import { cn } from "../../lib/utils";
import { Badge } from "ui/components/badge";
import { Button } from "ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "ui/components/command";
import { Label } from "ui/components/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "ui/components/popover";

interface CourseOption {
  id: string;
  title: string;
  featuredImage?: string | null;
}

interface CoursePrerequisiteSelectorProps {
  label?: string;
  helperText?: string;
  courses: CourseOption[];
  selectedCourseIds: string[];
  currentCourseId?: string;
  onSelectCourses: (courseIds: string[]) => void;
}

export function CoursePrerequisiteSelector({
  label,
  helperText,
  courses,
  selectedCourseIds,
  currentCourseId,
  onSelectCourses,
}: CoursePrerequisiteSelectorProps): React.ReactNode {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const availableCourses = courses.filter((c) => c.id !== currentCourseId);

  const handleSelect = (courseId: string) => {
    if (selectedCourseIds.includes(courseId)) {
      onSelectCourses(selectedCourseIds.filter((id) => id !== courseId));
    } else {
      onSelectCourses([...selectedCourseIds, courseId]);
    }
  };

  const handleRemove = (courseId: string) => {
    onSelectCourses(selectedCourseIds.filter((id) => id !== courseId));
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      {helperText && (
        <p className="text-muted-foreground text-xs">{helperText}</p>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="neutral"
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full"
          >
            {selectedCourseIds.length > 0
              ? `${selectedCourseIds.length} curso${selectedCourseIds.length > 1 ? "s" : ""} seleccionado${selectedCourseIds.length > 1 ? "s" : ""}`
              : "Seleccionar cursos prerequisito..."}
            <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
          <Command>
            <CommandInput
              placeholder="Buscar cursos..."
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandEmpty>No se encontraron cursos.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-auto">
              {availableCourses.map((course) => (
                <CommandItem
                  key={course.id}
                  value={course.title}
                  onSelect={() => handleSelect(course.id)}
                  className="flex items-center gap-2"
                >
                  {course.featuredImage && (
                    <img
                      src={course.featuredImage}
                      alt={course.title}
                      className="rounded w-8 h-8 object-cover"
                    />
                  )}
                  <span className="flex-1 text-sm truncate">
                    {course.title}
                  </span>
                  <Check
                    className={cn(
                      "h-4 w-4 shrink-0",
                      selectedCourseIds.includes(course.id)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedCourseIds.length > 0 && (
        <div className="flex flex-col gap-1.5 mt-2">
          {selectedCourseIds.map((courseId, index) => {
            const course = courses.find((c) => c.id === courseId);
            if (!course) return null;
            return (
              <div
                key={course.id}
                className="flex items-center gap-2 bg-muted/50 px-3 py-2 border rounded-md"
              >
                <span className="font-medium text-muted-foreground text-xs tabular-nums">
                  {index + 1}.
                </span>
                {course.featuredImage && (
                  <img
                    src={course.featuredImage}
                    alt={course.title}
                    className="rounded w-6 h-6 object-cover"
                  />
                )}
                <span className="flex-1 text-sm truncate">{course.title}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6"
                  onClick={() => handleRemove(course.id)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
