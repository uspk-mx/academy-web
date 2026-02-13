import type { Table } from "@tanstack/react-table";
import type { ReactNode } from "react";
import { useId } from "react";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Label } from "ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/select";
import { Pagination, PaginationContent, PaginationItem } from "ui/components/pagination";
import { Button } from "ui/components/button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>): ReactNode {
  const id = useId();
  return (
    <div className="flex items-center justify-between gap-8">
      {/* Results per page */}
      <div className="flex items-center gap-3">
        <Label className="max-sm:sr-only" htmlFor={id}>
          Rows per page
        </Label>
        <Select
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
          value={table.getState().pagination.pageSize.toString()}
        >
          <SelectTrigger className="w-fit whitespace-nowrap" id={id}>
            <SelectValue placeholder="Select number of results" />
          </SelectTrigger>
          <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
            {[5, 10, 25, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Page number information */}
      <div className="flex grow justify-end whitespace-nowrap text-sm text-muted-foreground">
        <p
          aria-live="polite"
          className="whitespace-nowrap text-sm text-muted-foreground"
        >
          <span className="text-foreground">
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}
            -
            {Math.min(
              Math.max(
                table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                  table.getState().pagination.pageSize,
                0
              ),
              table.getRowCount()
            )}
          </span>{" "}
          of{" "}
          <span className="text-foreground">
            {table.getRowCount().toString()}
          </span>
        </p>
      </div>

      {/* Pagination buttons */}
      <div>
        <Pagination>
          <PaginationContent>
            {/* First page button */}
            <PaginationItem>
              <Button
                aria-label="Go to first page"
                className="disabled:pointer-events-none disabled:opacity-50"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.firstPage()}
                size="icon"
                variant="neutral"
              >
                <ChevronFirst aria-hidden="true" size={16} strokeWidth={2} />
              </Button>
            </PaginationItem>
            {/* Previous page button */}
            <PaginationItem>
              <Button
                aria-label="Go to previous page"
                className="disabled:pointer-events-none disabled:opacity-50"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                size="icon"
                variant="neutral"
              >
                <ChevronLeft aria-hidden="true" size={16} strokeWidth={2} />
              </Button>
            </PaginationItem>
            {/* Next page button */}
            <PaginationItem>
              <Button
                aria-label="Go to next page"
                className="disabled:pointer-events-none disabled:opacity-50"
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                size="icon"
                variant="neutral"
              >
                <ChevronRight aria-hidden="true" size={16} strokeWidth={2} />
              </Button>
            </PaginationItem>
            {/* Last page button */}
            <PaginationItem>
              <Button
                aria-label="Go to last page"
                className="disabled:pointer-events-none disabled:opacity-50"
                disabled={!table.getCanNextPage()}
                onClick={() => table.lastPage()}
                size="icon"
                variant="neutral"
              >
                <ChevronLast aria-hidden="true" size={16} strokeWidth={2} />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
