import type { ColumnDef, FilterFn } from "@tanstack/react-table";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useMutation, useQuery } from "urql";
import { DeleteResourceDialog } from "ui/components/admin/delete-resource-modal";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import { DataTable, RowActions } from "ui/components/data-tables/data-table";
import { AddLevelDialog } from "ui/components/levels/add-level-dialog";
import { EditLevelDialog } from "ui/components/levels/edit-level-dialog";
import { Checkbox } from "ui/components/checkbox";
import { TableSkeleton } from "ui/components/table-skeleton";
import {
  DeleteLevelDocument,
  GetLevelDocument,
  GetLevelsDocument,
} from "gql-generated/generated/bff.sdk";
import type {
  DeleteLevelMutationVariables,
  GetLevelQuery,
  GetLevelQueryVariables,
  GetLevelsQuery,
  GetLevelsQueryVariables,
  Level,
} from "gql-generated/generated/types";

const multiColumnFilterFn: FilterFn<Level> = (row, columnId, filterValue) => {
  const searchableRowContent =
    `${row.original.name} ${row.original.description}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

const columns = ({
  levelId,
  setLevelId,
  open,
  setOpen,
  openEditDialog,
  setOpenEditDialog,
}: {
  levelId?: string;
  setLevelId?: (value: string) => void;
  open?: boolean;
  setOpen?: (value: boolean) => void;
  openEditDialog?: boolean;
  setOpenEditDialog?: (value: boolean) => void;
}): ColumnDef<Level>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(Boolean(value))
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
      />
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: () => <span>ID</span>,
    cell: ({ row }) => {
      // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
      useEffect(() => {
        setLevelId?.(row.getValue("id"));
        return () => setLevelId?.("");
      }, []);

      return <div className="font-medium hidden">{row.getValue("id")}</div>;
    },
    enableHiding: true,
  },
  {
    header: "Nombre",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="font-medium truncate">{row.getValue("name")}</div>
    ),
    size: 180,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Descripcion",
    accessorKey: "description",
    size: 220,
    cell: ({ row }) => (
      <div className="truncate">{row.getValue("description")}</div>
    ),
  },
  {
    header: "Creado el",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <div className="font-medium">
        {new Intl.DateTimeFormat("es-MX", {
          dateStyle: "medium",
          timeZone: "America/Mexico_City",
        }).format(new Date(String(row.getValue("createdAt"))))}
      </div>
    ),
    size: 180,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const onOpen = useCallback(() => {
        setOpen?.(true);
        setLevelId?.(row.getValue("id"));
      }, []);

      return (
        <RowActions
          row={row}
          actions={[
            {
              label: "Editar",
              icon: <PencilIcon />,
              onClick: () => {
                setOpenEditDialog?.(true);
                setLevelId?.(row.getValue("id"));
              },
            },
            {
              label: "Borrar",
              destructive: true,
              icon: <Trash2Icon />,
              onClick: onOpen,
            },
          ]}
        />
      );
    },
    size: 60,
    enableHiding: false,
  },
];

export default function LevelsPage() {
  const [open, setOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [levelId, setLevelId] = useState("");
  const [hasQueried, setHasQueried] = useState(false);
  const [{data}, refetchQuery] = useQuery<GetLevelsQuery, GetLevelsQueryVariables>({
    query: GetLevelsDocument,
    // pause: hasQueried,
  });

  const levels = data?.getLevels;

  const [isDeleteing, setIsDeleteing] = useState(false);

  const [{ data: levelData, fetching: fetchingLevelById }] = useQuery<
    GetLevelQuery,
    GetLevelQueryVariables
  >({
    query: GetLevelDocument,
    variables: {
      getLevelId: levelId,
    },
  });

  useEffect(() => {
    if (!hasQueried) {
      setHasQueried(true);
    }
  }, [hasQueried]);

  const [, deleteLevelMutation] =
    useMutation<DeleteLevelMutationVariables>(DeleteLevelDocument);

  const onDeleteLevel = async () => {
    try {
      setIsDeleteing(true);
      const result = await deleteLevelMutation({ deleteLevelId: levelId });
      if (result.error) {
        toast.error("Error al borrar el nivel", {
          description: result.error.message,
          position: "top-right",
        });
        setIsDeleteing(false);
      } else {
        toast.success("Nivel borrado con exito", {
          position: "top-right",
        });
        setOpen(false);
        refetchQuery({ requestPolicy: "network-only" });
        setIsDeleteing(false);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Oops! algo salio mal, intentalo nuevamente!", {
        description: error as string,
        position: "top-right",
      });
    }
  };

  const columnsData = columns({
    open,
    setOpen,
    levelId,
    setLevelId,
    openEditDialog,
    setOpenEditDialog,
  });

  return (
    <>
      <PageBreadCrumbs
        items={[{ label: "Cursos", href: "courses" }, { label: "Niveles" }]}
      />
      {!levels ? (
        <TableSkeleton />
      ) : (
        <>
          <DataTable
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            data={levels as any}
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            columns={columnsData as any}
            addButton={{ trigger: <AddLevelDialog /> }}
          />
          <EditLevelDialog
            data={levelData?.getLevel}
            open={openEditDialog}
            onOpenChange={setOpenEditDialog}
            refetchData={refetchQuery}
          />
          <DeleteResourceDialog
            open={open}
            onOpenChange={setOpen}
            resourceType="Nivel"
            resourceName={
              levels.find((level) => level.id === levelId)?.name ||
              ""
            }
            onDelete={onDeleteLevel}
            isLoading={isDeleteing}
          />
        </>
      )}
    </>
  );
}
