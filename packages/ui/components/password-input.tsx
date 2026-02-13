import type { ComponentProps, ReactElement } from "react";
import { forwardRef, useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "ui/lib/utils";
import { Input, type InputProps } from "./input";
import { Label } from "./label";

interface PasswordInputProps extends Omit<InputProps, "type"> {
  label?: string;
  labelClassName?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, labelClassName, ...rest }, ref): ReactElement => {
    const id = useId();
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = (): void => {
      setIsVisible((prevState) => !prevState);
    };

    return (
      <div className="space-y-2">
        <Label className={labelClassName} htmlFor={id}>
          {label}
        </Label>
        <div className="relative">
          <Input
            className={cn("pe-9 aria-invalid:text-current", className)}
            id={id}
            type={isVisible ? "text" : "password"}
            ref={ref}
            {...rest}
          />
          <button
            aria-controls="password"
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            onClick={toggleVisibility}
            type="button"
          >
            {isVisible ? (
              <EyeOff aria-hidden="true" size={16} strokeWidth={2} />
            ) : (
              <Eye aria-hidden="true" size={16} strokeWidth={2} />
            )}
          </button>
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
