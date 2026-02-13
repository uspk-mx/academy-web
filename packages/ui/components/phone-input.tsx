import { cn } from "ui/lib/utils";
import { Input, type InputProps } from "ui/components/input";
import { Label } from "ui/components/label";
import { ChevronDownIcon, PhoneIcon } from "lucide-react";
import { forwardRef, useId, useState, type ElementType } from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

export function PhoneInput({
  label,
  value,
  onChange,
  placeholder,
  inputComponent,
}: {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  inputComponent?: ElementType
}) {
  const id = useId();
  const [localValue, setLocalValue] = useState(value);

  return (
    <div className="*:not-first:mt-2" dir="ltr">
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      <RPNInput.default
        className="flex rounded-lg shadow-xs"
        international
        flagComponent={FlagComponent}
        countrySelectComponent={CountrySelect}
        inputComponent={inputComponent ? inputComponent : PhoneInputComponent}
        id={id}
        placeholder={placeholder}
        value={localValue}
        onChange={(newValue) => {
          setLocalValue(newValue ?? "");
          onChange?.(newValue ?? "");
        }}
      />
    </div>
  );
}

const PhoneInputComponent = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        className={cn(
          "-ms-px rounded-s-none shadow-none focus-visible:z-10",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

PhoneInput.displayName = "PhoneInput";

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: { label: string; value: RPNInput.Country | undefined }[];
};

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as RPNInput.Country);
  };

  return (
    <div className="border-input bg-background text-muted-foreground focus-within:border-ring/40 ring-ring/8 dark:ring-ring/12 hover:bg-accent hover:text-foreground has-aria-invalid:border-destructive/60 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/25 relative inline-flex items-center self-stretch rounded-s-lg border py-2 ps-3 pe-2 transition-shadow focus-within:z-10 focus-within:ring-[3px] focus-within:outline-hidden has-disabled:pointer-events-none has-disabled:opacity-50">
      <div className="inline-flex items-center gap-1" aria-hidden="true">
        <FlagComponent country={value} countryName={value} aria-hidden="true" />
        <span className="text-muted-foreground/80">
          <ChevronDownIcon size={16} aria-hidden="true" />
        </span>
      </div>
      <select
        disabled={disabled}
        value={value}
        onChange={handleSelect}
        className="absolute inset-0 text-sm opacity-0"
        aria-label="Select country"
      >
        <option key="default" value="">
          Select a country
        </option>
        {options
          .filter((x) => x.value)
          .map((option, i) => (
            <option key={option.value ?? `empty-${i}`} value={option.value}>
              {option.label}{" "}
              {option.value &&
                `+${RPNInput.getCountryCallingCode(option.value)}`}
            </option>
          ))}
      </select>
    </div>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="w-5 overflow-hidden rounded-sm">
      {Flag ? (
        <Flag title={countryName} />
      ) : (
        <PhoneIcon size={16} aria-hidden="true" />
      )}
    </span>
  );
};
