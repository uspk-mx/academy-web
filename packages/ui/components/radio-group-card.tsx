import type { RadioGroupProps } from "@radix-ui/react-radio-group";
import type { ReactNode } from "react";
import { useId } from "react";
import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./radio-group";

export interface RadioGroupCardOptions {
  value: string;
  label: string;
  subLabel?: string;
  description?: string;
}

interface RadioGroupCardProps extends RadioGroupProps {
  options: RadioGroupCardOptions[];
}

export function RadioGroupCard({
  options,
  ...rest
}: RadioGroupCardProps): ReactNode {
  const id = useId();
  return (
    <RadioGroup className="gap-2" {...rest}>
      {options.map((option) => (
        <div
          className="relative flex w-full items-start gap-2 rounded-lg border bg-white border-border p-4 shadow-sm shadow-black/5 has-data-[state=checked]:border-ring"
          key={option.value}
        >
          <RadioGroupItem
            aria-describedby={`${id}-${option.value}-description`}
            className="order-1 after:absolute after:inset-0"
            id={`${id}-${option.value}`}
            value={option.value}
          />

          <div className="grid grow gap-2">
            <Label htmlFor={`${id}-${option.value}`}>
              {option.label}{" "}
              {option.subLabel ? (
                <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                  {option.subLabel}
                </span>
              ) : null}
            </Label>
            {option.description ? (
              <p
                className="text-xs text-muted-foreground"
                id={`${id}-1-description`}
              >
                {option.description}
              </p>
            ) : null}
          </div>
        </div>
      ))}
    </RadioGroup>
  );
}
