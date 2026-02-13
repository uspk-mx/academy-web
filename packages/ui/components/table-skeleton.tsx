import { Grid, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Skeleton } from "./skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

export function TableSkeleton(): ReactNode {
  return (
    <div className="w-full space-y-4">
      {/* Header section */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-xs">
          <div className="relative">
            <Input
              className="bg-muted"
              disabled
              placeholder="Filtra los datos"
            />
          </div>
        </div>
        <Button className="bg-muted" disabled size="sm" variant="neutral">
          <Grid className="h-4 w-4 mr-2" />
          View
        </Button>

        <Button className="bg-muted ml-auto" disabled size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Agregar nivel
        </Button>
      </div>

      {/* Table section */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Skeleton className="h-4 w-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-4" />
              </TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(3)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[140px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[250px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-6 rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
