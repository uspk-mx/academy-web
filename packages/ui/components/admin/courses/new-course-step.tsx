import type { ChangeEvent, ReactNode } from "react";
import { useCharacterLimit } from "../../../hooks/use-character-limit";
import { Input } from "ui/components/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "ui/components/select";
import { Skeleton } from "ui/components/skeleton";

export function NewCourseStep({
  title,
  description,
  inputData,
  selectData,
  className,
  isLoading,
}: {
  title: string;
  description: string;
  inputData?: {
    value: string;
    onValueChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    name: string;
    decorator?: ReactNode;
    maxLength?: number;
  };
  selectData?: {
    label: string;
    placeholder: string;
    options: { id: string; label: string }[];
    value: string;
    onValueChange: (value: string) => void;
    name: string;
  };
  className?: string;
  isLoading?: boolean;
}): ReactNode {
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({
    maxLength: inputData?.maxLength ?? 60,
    initialValue: inputData?.value,
  });

  return (
    <div className={className}>
      <h1 className="text-center font-bold text-4xl">{title}</h1>
      <p className="mt-6 text-center text-base max-w-none">{description}</p>
      <div className="mt-10 max-w-240">
        {isLoading ? (
          <Skeleton className="w-full h-10" />
        ) : selectData ? (
          <>
            <Select
              onValueChange={selectData.onValueChange}
              value={selectData.value}
            >
              <SelectTrigger>
                <SelectValue placeholder={selectData.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{selectData.label}</SelectLabel>
                  {selectData.options.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <input
              name={selectData.name}
              type="hidden"
              value={selectData.value}
            />
          </>
        ) : (
          <div className="relative">
            <Input
              maxLength={inputData?.maxLength}
              name={inputData?.name}
              onChange={(e) => {
                inputData?.onValueChange?.(e);
                handleChange(e);
              }}
              placeholder={inputData?.placeholder}
              type="text"
              value={value}
            />
            {inputData?.maxLength ? (
              <div
                aria-live="polite"
                className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs tabular-nums text-muted-foreground peer-disabled:opacity-50"
                role="status"
              >
                {characterCount}/{limit}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
