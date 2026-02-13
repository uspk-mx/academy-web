import { Filter } from "lucide-react";
import { useId, type ReactNode } from "react";
import { Button } from "ui/components/button";
import { Popover, PopoverContent, PopoverTrigger } from "ui/components/popover";
import { Checkbox } from "ui/components/checkbox";
import { Label } from "ui/components/label";

interface DataTableStatusFilterProps {
  selectedStatuses: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- We may need any value
  uniqueStatusValues: any[];
  onStatusChange: (checked: boolean, value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- We may need any value
  statusCounts: Map<any, any>;
}

export function DataTableStatusFilter({
  selectedStatuses,
  uniqueStatusValues,
  onStatusChange,
  statusCounts,
}: DataTableStatusFilterProps): ReactNode {
  const id = useId();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="neutral">
          <Filter
            aria-hidden="true"
            className="opacity-60 -ms-1 me-2"
            size={16}
            strokeWidth={2}
          />
          Estatus
          {selectedStatuses.length > 0 && (
            <span className="inline-flex items-center bg-background px-1 border border-border rounded-sm h-5 max-h-full font-[inherit] font-medium text-[0.625rem] text-muted-foreground/70 -me-1 ms-3">
              {selectedStatuses.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-3 min-w-36">
        <div className="space-y-3">
          <div className="font-medium text-muted-foreground text-xs">
            Filtros
          </div>
          <div className="space-y-3">
            {uniqueStatusValues.map((value: string, i) => (
              <div className="flex items-center gap-2" key={value}>
                <Checkbox
                  checked={selectedStatuses.includes(value)}
                  id={`${id}-${i}`}
                  onCheckedChange={(checked: boolean) => {
                    onStatusChange(checked, value);
                  }}
                />
                <Label
                  className="flex justify-between gap-2 font-normal grow"
                  htmlFor={`${id}-${i}`}
                >
                  {value}{" "}
                  <span className="text-muted-foreground text-xs ms-2">
                    {statusCounts.get(value)}
                  </span>
                </Label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
