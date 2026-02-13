import type { PageInfo } from "gql-generated/generated/types";
import { Button } from "ui/components/button";
import { Label } from "ui/components/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "ui/components/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/select";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { SetURLSearchParams } from "react-router";

interface CoursePaginationProps {
  totalCount: number;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  pageInfo: PageInfo;
}

export const CoursePagination = ({
  totalCount,
  searchParams,
  setSearchParams,
  pageInfo,
}: CoursePaginationProps) => {
  const pageSize = Number(searchParams.get("pageSize") || 10);
  const pageIndex = Number(searchParams.get("page") || 1);

  const handlePageSize = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("pageSize", value);
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handlePageIndex = (value: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", value.toString());
    setSearchParams(newParams);
  };

  // Pagination button handlers
  const handleFirstPage = () => handlePageIndex(1);
  const handlePreviousPage = () => handlePageIndex(pageIndex - 1);
  const handleNextPage = () => handlePageIndex(pageIndex + 1);

  const lastPage = Math.ceil(totalCount / pageSize);
  const start = (pageIndex - 1) * pageSize + 1;
  const end = Math.min(pageIndex * pageSize, totalCount);

  return (
    <div className="flex items-center w-full justify-between gap-8 mt-auto">
      <div className="flex items-center gap-3 w-full">
        <Label className="max-sm:sr-only mr-3">Filas por pagina</Label>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => {
            handlePageSize(value);
          }}
        >
          <SelectTrigger className="w-fit whitespace-nowrap">
            <SelectValue placeholder="Select number of results" />
          </SelectTrigger>
          <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
            {[8, 10, 25, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex grow justify-end w-full whitespace-nowrap text-sm text-muted-foreground">
        <p
          className="whitespace-nowrap text-sm text-muted-foreground"
          aria-live="polite"
        >
          <span className="text-foreground">
            {totalCount === 0 ? 0 : start}-{end}
          </span>{" "}
          de <span className="text-foreground">{totalCount}</span>
        </p>
      </div>

      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                size="icon"
                variant="neutral"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={handleFirstPage}
                disabled={pageIndex === 1}
                aria-label="Go to first page"
              >
                <ChevronFirst size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                size="icon"
                variant="neutral"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={handlePreviousPage}
                disabled={pageIndex === 1}
                aria-label="Go to previous page"
              >
                <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                size="icon"
                variant="neutral"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={handleNextPage}
                disabled={!pageInfo?.hasNextPage}
                aria-label="Go to next page"
              >
                <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                size="icon"
                variant="neutral"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={() => handlePageIndex(lastPage)}
                disabled={!pageInfo?.hasNextPage}
                aria-label="Go to last page"
              >
                <ChevronLast size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
