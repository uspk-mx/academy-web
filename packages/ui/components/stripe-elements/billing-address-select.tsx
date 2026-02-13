import { useId } from "react";
import { Label ,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/index";

export default function BillingAddress({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Pais</Label>
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Selecciona tu pais" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mx">Mexico</SelectItem>
          <SelectItem value="nl">Netherlands</SelectItem>
          <SelectItem value="us">Estados Unidos</SelectItem>
          <SelectItem value="es">España</SelectItem>
        </SelectContent>
      </Select>
      <p
        aria-live="polite"
        className="mt-2 text-xs text-muted-foreground"
        role="region"
      >
        We are required by law to collect applicable transaction taxes for
        purchases made in certain tax jurisdictions.
      </p>
    </div>
  );
}
