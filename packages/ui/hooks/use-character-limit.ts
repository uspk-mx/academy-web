;

import type { ChangeEvent} from "react";
import { useState } from "react";

interface UseCharacterLimitProps {
  maxLength: number;
  initialValue?: string;
}

export function useCharacterLimit({
  maxLength,
  initialValue = "",
}: UseCharacterLimitProps): {
  value: string;
  characterCount: number;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  maxLength: number;
  setCharacterCount: (value: number) => void
  setValue: (value: string) => void
} {
  const [value, setValue] = useState(initialValue);
  const [characterCount, setCharacterCount] = useState(initialValue.length);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setValue(newValue);
      setCharacterCount(newValue.length);
    }
  };

  return {
    value,
    characterCount,
    handleChange,
    maxLength,
    setCharacterCount,
    setValue,
  };
}
