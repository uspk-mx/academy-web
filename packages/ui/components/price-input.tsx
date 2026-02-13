;

import { useEffect, useState } from "react";
import type { ReactNode, ChangeEvent, ComponentProps } from "react";
import { Label } from "./label";
import { Input } from "./input";

interface PriceInputProps
  extends Omit<ComponentProps<typeof Input>, "value" | "onChange"> {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  isInvalid?: boolean
}

export function PriceInput({
  label = "Price",
  placeholder = "0.00",
  value,
  onChange,
  isInvalid
}: PriceInputProps): ReactNode {
  const [internalValue, setInternalValue] = useState("");

  useEffect(() => {
    setInternalValue(value?.toString() || "");
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Allow only numbers, one decimal point, and two decimal places
    if (/^(\d+\.?\d{0,2}|\.\d{0,2})$/.test(inputValue) || inputValue === "") {
      setInternalValue(inputValue);
      onChange(inputValue);
    }
  };

  const handleBlur = () => {
    // Format the value to always show two decimal places
    if (internalValue !== "" && !isNaN(Number(internalValue))) {
      const formattedValue = Number(Number.parseFloat(internalValue)).toFixed(
        2
      );
      setInternalValue(formattedValue);
      onChange(formattedValue);
    } else if (internalValue === "") {
      setInternalValue("");
      onChange("");
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="price-input">{label}</Label>
      <div className="relative">
        <Input
          className="pl-7"
          id="price-input"
          inputMode="decimal"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={placeholder}
          type="text"
          value={internalValue}
          aria-invalid={isInvalid}
        />
        <span className="absolute inset-y-0 flex justify-center items-center peer-disabled:opacity-50 text-muted-foreground text-sm pointer-events-none ps-3 start-0">
          $
        </span>
        <span className="absolute inset-y-0 flex justify-center items-center peer-disabled:opacity-50 text-muted-foreground text-sm pointer-events-none end-0 pe-3">
          MXN
        </span>
      </div>
    </div>
  );
}
