;

import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  Row,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Ellipsis, Plus } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import { act, useMemo, useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "ui/components/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui/components/table";
import { DataDeleteButton } from "./data-delete-button";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableSearchbar } from "./data-table-searchbar";
import { DataTableStatusFilter } from "./data-table-status-filter";
import { DataTableViewOptions } from "./data-table-view-options";

//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         aria-label="Select all"
//         checked={
//           table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(Boolean(value))}
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         aria-label="Select row"
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
//       />
//     ),
//     size: 28,
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     header: "Name",
//     accessorKey: "name",
//     cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
//     size: 180,
//     filterFn: multiColumnFilterFn,
//     enableHiding: false,
//   },
//   {
//     header: "Email",
//     accessorKey: "email",
//     size: 220,
//   },
//   {
//     header: "Location",
//     accessorKey: "location",
//     cell: ({ row }) => (
//       <div>
//         <span className="text-lg leading-none">{row.original.flag}</span> {row.getValue("location")}
//       </div>
//     ),
//     size: 180,
//   },
//   {
//     header: "Status",
//     accessorKey: "status",
//     cell: ({ row }) => (
//       <Badge
//         className={cn(
//           row.getValue("status") === "Inactive" && "bg-muted-foreground/60 text-primary-foreground",
//         )}
//       >
//         {row.getValue("status")}
//       </Badge>
//     ),
//     size: 100,
//     filterFn: statusFilterFn,
//   },
//   {
//     header: "Performance",
//     accessorKey: "performance",
//   },
//   {
//     header: "Balance",
//     accessorKey: "balance",
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("balance"));
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount);
//       return formatted;
//     },
//     size: 120,
//   },
//   {
//     id: "actions",
//     header: () => <span className="sr-only">Actions</span>,
//     cell: ({ row }) => <RowActions row={row} />,
//     size: 60,
//     enableHiding: false,
//   },
// ];

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- we expect any data array
type DataTupple = any[];

interface DataTableProps<TData> {
  data: TData;
  columns: ColumnDef<TData>[];
  addButton?: {
    label?: string;
    action?: () => void;
    trigger?: ReactNode
  };
  deleteAction?: () => void
}

export function DataTable<TData extends DataTupple>({
  data,
  columns,
  deleteAction,
  addButton,
}: DataTableProps<TData>): ReactNode {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false
  });
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [updatedData, setUpdatedData] = useState<any>([])

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ]);


  const handleDeleteRows = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const updatedData = data.filter(
      (item) => !selectedRows.some((row) => row.original.id === item.id),
    );
    deleteAction?.()
    setUpdatedData(updatedData)
    table.resetRowSelection();
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  });
  // Get unique status values
  const uniqueStatusValues = useMemo(() => {
    const statusColumn = table.getColumn("status");

    if (!statusColumn) return [];

    const values = Array.from(statusColumn.getFacetedUniqueValues().keys());

    return values.sort();
  }, [table.getColumn("status")?.getFacetedUniqueValues()]);

  // Get counts for each status
  const statusCounts = useMemo(() => {
    const statusColumn = table.getColumn("status");
    if (!statusColumn) return new Map();
    return statusColumn.getFacetedUniqueValues();
  }, [table.getColumn("status")?.getFacetedUniqueValues()]);

  const selectedStatuses = useMemo(() => {
    const filterValue = table.getColumn("status")?.getFilterValue() as string[];
    return filterValue ?? [];
  }, [table.getColumn("status")?.getFilterValue()]);

  const handleStatusChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn("status")?.getFilterValue() as string[];
    const newFilterValue = filterValue ? [...filterValue] : [];

    if (checked) {
      newFilterValue.push(value);
    } else {
      const index = newFilterValue.indexOf(value);
      if (index > -1) {
        newFilterValue.splice(index, 1);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- Coming from react-table
    table
      .getColumn("status")
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Filter by name or email */}
          <DataTableSearchbar filterColumn="name" table={table} />
          {/* Filter by status */}
          {data.find((item) =>
            item.status ? (
              <DataTableStatusFilter
                onStatusChange={handleStatusChange}
                selectedStatuses={selectedStatuses}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- we expect any value
                statusCounts={statusCounts}
                uniqueStatusValues={uniqueStatusValues}
              />
            ) : null
          )}
          {/* Toggle columns visibility */}
          <DataTableViewOptions table={table} />
        </div>
        <div className="flex items-center gap-3">
          {/* Delete button */}
          <DataDeleteButton
            onDelete={handleDeleteRows}
            table={table}
          />
          {/* Add user button */}
          {addButton?.trigger ? addButton.trigger :  <Button
              className="ml-auto"
              onClick={addButton?.action}
              variant='neutral'
            >
              <Plus
                aria-hidden="true"
                className="-ms-1 me-2 opacity-60"
                size={16}
                strokeWidth={2}
              />
              {addButton?.label}
            </Button>}

        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-border bg-background">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="hover:bg-transparent" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="h-11"
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                    >
                      {/* eslint-disable-next-line no-nested-ternary -- coming from example */}
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              "flex h-full cursor-pointer select-none items-center justify-between gap-2"
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            // Enhanced keyboard handling for sorting
                            if (
                              header.column.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                          role="button"
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- from tanstack table
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- from tanstack table
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <ChevronUp
                                aria-hidden="true"
                                className="shrink-0 opacity-60"
                                size={16}
                                strokeWidth={2}
                              />
                            ),
                            desc: (
                              <ChevronDown
                                aria-hidden="true"
                                className="shrink-0 opacity-60"
                                size={16}
                                strokeWidth={2}
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  data-state={row.getIsSelected() && "selected"}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="last:py-0" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {data.length > 6 ? <DataTablePagination table={table} /> : null}
    </div>
  );
}

interface RowAction {
  label: string;
  shortcut?: string;
  icon?: ReactNode
  onClick?: () => void;
  destructive?: boolean;
  subActions?: RowAction[];
}

interface RowActionsProps {
  row: Row<any>;
  actions: RowAction[];
}

export function RowActions({ row, actions }: RowActionsProps): ReactNode {
  const renderActions = (actions: RowAction[]): ReactElement[] => {
    return actions.map((action, index) => (
      <DropdownMenuItem
        className={
          action.destructive ? "text-destructive focus:text-destructive" : ""
        }
        key={action.label}
        onClick={action.onClick}
      >
        {action.icon && !action.shortcut ? action.icon : null}
        <span>{action.label}</span>
        {action.shortcut ? (
          <DropdownMenuShortcut>{action.shortcut}</DropdownMenuShortcut>
        ) : null}
        {action.subActions ? (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>{action.label}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {renderActions(action.subActions)}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        ) : null}
      </DropdownMenuItem>
    ));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button
            aria-label="Edit item"
            className="shadow-none"
            size="icon"
            variant="ghost"
          >
            <Ellipsis aria-hidden="true" size={16} strokeWidth={2} />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {renderActions(actions)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
