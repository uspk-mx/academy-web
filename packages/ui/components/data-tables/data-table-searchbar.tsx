import { useId, useRef, type ReactNode } from "react";
import type { Table } from "@tanstack/react-table";
import { CircleX, ListFilter } from "lucide-react";
import { Input } from "ui/components/input";
import { cn } from "ui/lib/utils";

interface DataTableSearchbarProps<TData> {
  table: Table<TData>;
  filterColumn: string
}

export function DataTableSearchbar<TData>({
  table,
  filterColumn
}: DataTableSearchbarProps<TData>): ReactNode {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  return (
    <div className="relative">
      <Input
        aria-label={`Filtra los datos por ${filterColumn}`}
        className={cn(
          "peer min-w-60 ps-9",
          Boolean(table.getColumn(filterColumn)?.getFilterValue()) && "pe-9"
        )}
        id={`${id}-input`}
        onChange={(e) =>
          table.getColumn("name")?.setFilterValue(e.target.value)
        }
        placeholder={`Filtra los datos por ${filterColumn}`}
        ref={inputRef}
        type="text"
        value={(table.getColumn(filterColumn)?.getFilterValue() ?? "") as string}
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
        <ListFilter aria-hidden="true" size={16} strokeWidth={2} />
      </div>
      {Boolean(table.getColumn(filterColumn)?.getFilterValue()) && (
        <button
          aria-label="Clear filter"
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => {
            table.getColumn(filterColumn)?.setFilterValue("");
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
          type="button"
        >
          <CircleX aria-hidden="true" size={16} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
