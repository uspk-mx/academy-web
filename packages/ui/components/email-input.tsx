import { Mail } from "lucide-react";
import type { ComponentProps, ReactElement } from "react";
import { useId } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "ui/lib/utils";

interface EmailInputProps extends Omit<ComponentProps<typeof Input>, "type"> {
  label?: string;
  labelClassName?: string;
  hasRightIcon?: boolean;
}

export default function EmailInput({
  label,
  labelClassName,
  hasRightIcon,
  className,
  ...rest
}: EmailInputProps): ReactElement {
  const id = useId();
  return (
    <div className="space-y-2">
      <Label className={labelClassName} htmlFor={id}>
        {label}
      </Label>
      <div className="relative">
        <Input
          className={cn("peer pe-9 aria-invalid:text-current", className)}
          id={id}
          placeholder="Email"
          type="email"
          {...rest}
        />
        {hasRightIcon ? (
          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <Mail aria-hidden="true" size={16} strokeWidth={2} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
