import type { ReactNode } from "react";
import type { Table } from "@tanstack/react-table";
import { CircleAlert, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "ui/components/alert-dialog";
import { Button } from "ui/components/button";

export function DataDeleteButton<TData>({
  table,
  onDelete,
}: {
  table: Table<TData>;
  onDelete: () => void;
}): ReactNode {
  return (
    <>
      {table.getSelectedRowModel().rows.length > 0 && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="ml-auto" variant='noShadowNeutral'>
              <Trash
                aria-hidden="true"
                className="opacity-60 -ms-1 me-2"
                size={16}
                strokeWidth={2}
              />
              Delete
              <span className="inline-flex items-center bg-background px-1 border border-border rounded-sm h-5 max-h-full font-[inherit] font-medium text-[0.625rem] text-muted-foreground/70 -me-1 ms-3">
                {table.getSelectedRowModel().rows.length}
              </span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className="flex sm:flex-row flex-col max-sm:items-center gap-2 sm:gap-4">
              <div
                aria-hidden="true"
                className="flex justify-center items-center border border-border rounded-full shrink-0 size-9"
              >
                <CircleAlert className="opacity-80" size={16} strokeWidth={2} />
              </div>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete{" "}
                  {table.getSelectedRowModel().rows.length} selected{" "}
                  {table.getSelectedRowModel().rows.length === 1
                    ? "row"
                    : "rows"}
                  .
                </AlertDialogDescription>
              </AlertDialogHeader>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Borrar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
