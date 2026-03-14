import { useState, useMemo, useCallback } from "react";

export interface UsePaginationOptions {
  /** Total number of items */
  totalItems: number;
  /** Number of items per page */
  itemsPerPage?: number;
  /** Initial page (1-indexed) */
  initialPage?: number;
}

export interface UsePaginationReturn<T = undefined> {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Number of items per page */
  itemsPerPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Total number of items */
  totalItems: number;
  /** Index of first item on current page (0-indexed, for slicing) */
  startIndex: number;
  /** Index after last item on current page (0-indexed, for slicing) */
  endIndex: number;
  /** Whether a previous page exists */
  hasPreviousPage: boolean;
  /** Whether a next page exists */
  hasNextPage: boolean;
  /** Go to a specific page */
  goToPage: (page: number) => void;
  /** Go to the next page */
  nextPage: () => void;
  /** Go to the previous page */
  previousPage: () => void;
  /** Go to the first page */
  firstPage: () => void;
  /** Go to the last page */
  lastPage: () => void;
  /** Update items per page and reset to page 1 */
  setItemsPerPage: (limit: number) => void;
  /** Slice a data array to the current page's items */
  paginate: T extends undefined ? <D>(data: D[]) => D[] : (data: T[]) => T[];
  /** Page range for rendering page buttons (e.g. [1,2,3,4,5]) */
  pageRange: number[];
}

/**
 * usePagination
 *
 * A fully type-safe pagination hook. Pass a generic type parameter to lock
 * the `paginate` helper to a specific array element type, or leave it
 * unspecified to keep `paginate` generic.
 *
 * @example
 * const pagination = usePagination({ totalItems: data.length, itemsPerPage: 10 });
 * const currentItems = pagination.paginate(data);
 */
export function usePagination<T = undefined>({
  totalItems,
  itemsPerPage: initialItemsPerPage = 10,
  initialPage = 1,
}: UsePaginationOptions): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState<number>(() =>
    Math.max(1, initialPage)
  );
  const [itemsPerPage, setItemsPerPageState] = useState<number>(() =>
    Math.max(1, initialItemsPerPage)
  );

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalItems / itemsPerPage)),
    [totalItems, itemsPerPage]
  );

  // Clamp current page if total pages shrinks
  const safePage = useMemo(
    () => Math.min(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const startIndex = useMemo(
    () => (safePage - 1) * itemsPerPage,
    [safePage, itemsPerPage]
  );

  const endIndex = useMemo(
    () => Math.min(startIndex + itemsPerPage, totalItems),
    [startIndex, itemsPerPage, totalItems]
  );

  const hasPreviousPage = safePage > 1;
  const hasNextPage = safePage < totalPages;

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(Math.min(Math.max(1, page), totalPages));
    },
    [totalPages]
  );

  const nextPage = useCallback(
    () => goToPage(safePage + 1),
    [goToPage, safePage]
  );

  const previousPage = useCallback(
    () => goToPage(safePage - 1),
    [goToPage, safePage]
  );

  const firstPage = useCallback(() => goToPage(1), [goToPage]);

  const lastPage = useCallback(
    () => goToPage(totalPages),
    [goToPage, totalPages]
  );

  const setItemsPerPage = useCallback((limit: number) => {
    setItemsPerPageState(Math.max(1, limit));
    setCurrentPage(1);
  }, []);

  /** Visible page numbers with ellipsis represented as -1 */
  const pageRange = useMemo<number[]>(() => {
    const delta = 2;
    const range: number[] = [];

    for (
      let i = Math.max(1, safePage - delta);
      i <= Math.min(totalPages, safePage + delta);
      i++
    ) {
      range.push(i);
    }

    if (range[0] > 2) range.unshift(-1);
    if (range[0] > 1) range.unshift(1);
    if (range[range.length - 1] < totalPages - 1) range.push(-1);
    if (range[range.length - 1] < totalPages) range.push(totalPages);

    return range;
  }, [safePage, totalPages]);

  const paginate = useCallback(
    <D>(data: D[]): D[] => data.slice(startIndex, endIndex),
    [startIndex, endIndex]
  );

  return {
    currentPage: safePage,
    itemsPerPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    hasPreviousPage,
    hasNextPage,
    goToPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    setItemsPerPage,
    paginate: paginate as UsePaginationReturn<T>["paginate"],
    pageRange,
  };
}