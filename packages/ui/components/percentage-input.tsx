;

import type { ChangeEvent, ComponentProps, ReactNode } from "react";
import { useState, useEffect } from "react";
import { Input } from "./input";
import { Label } from "./label";

interface PercentageInputProps extends ComponentProps<"input"> {
  id: string;
  label: string;
  initialValue?: number;
  onChangeValue: (value: number) => void;
}

export default function PercentageInput({
  id,
  label,
  initialValue = 0,
  onChangeValue,
  ...rest
}: PercentageInputProps): ReactNode {
  const [inputValue, setInputValue] = useState<string>(initialValue.toString());

  const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(2)}%`;
  };

  useEffect(() => {
    setInputValue(formatPercentage(initialValue));
  }, [initialValue]);


  const parsePercentage = (value: string): number => {
    const cleaned = value.replace(/[^\d.-]/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed / 100;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const numericValue = parsePercentage(newValue);
    onChangeValue(numericValue);
  };

  const handleBlur = () => {
    const numericValue = parsePercentage(inputValue);
    setInputValue(formatPercentage(numericValue));
  };

  return (
    <div className="w-full">
      <Label htmlFor={id}>{label}</Label>
      <Input
        className="mt-1"
        id={id}
        name={rest.name}
        onBlur={handleBlur}
        onChange={(e) => {
          handleInputChange(e);
          rest.onChange?.(e);
        }}
        type="text"
        value={inputValue}
      />
    </div>
  );
}
