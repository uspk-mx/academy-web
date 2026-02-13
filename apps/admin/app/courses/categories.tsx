import type { ColumnDef, FilterFn } from "@tanstack/react-table";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMutation, useQuery } from "urql";
import { DeleteResourceDialog } from "ui/components/admin/delete-resource-modal";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import { AddCategoryDialog } from "ui/components/categories/add-category-dialog";
import { EditCategoryDialog } from "ui/components/categories/edit-category-dialog";
import { DataTable, RowActions } from "ui/components/data-tables/data-table";
import { Checkbox } from "ui/components/checkbox";
import { TableSkeleton } from "ui/components/table-skeleton";
import {
  DeleteCategoryDocument,
  GetCategoriesDocument,
  GetCategoryDocument,
} from "gql-generated/generated/bff.sdk";
import type {
  Category,
  DeleteCategoryMutationVariables,
  GetCategoriesQuery,
  GetCategoryQuery,
  GetCategoryQueryVariables,
} from "gql-generated/generated/types";

const multiColumnFilterFn: FilterFn<Category> = (
  row,
  columnId,
  filterValue
) => {
  const searchableRowContent =
    `${row.original.name} ${row.original.description}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

const statusFilterFn: FilterFn<Category> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

const columns = ({
  setCategoryId,
  open,
  setOpen,
  openEditDialog,
  setOpenEditDialog,
}: {
  levelId?: string;
  setCategoryId?: (value: string) => void;
  open?: boolean;
  setOpen?: (value: boolean) => void;
  openEditDialog?: boolean;
  setOpenEditDialog?: (value: boolean) => void;
}): ColumnDef<Category>[] => [
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
      useEffect(() => {
        setCategoryId?.(row.getValue("id"));
        return () => setCategoryId?.("");
      }, []);

      return <div className="font-medium hidden">{row.getValue("id")}</div>;
    },
    enableHiding: true,
  },
  {
    header: "Nombre",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
    size: 180,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Descripcion",
    accessorKey: "description",
    size: 220,
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
    cell: ({ row }) => (
      <RowActions
        row={row}
        actions={[
          {
            label: "Editar",
            icon: <PencilIcon />,
            onClick: () => {
              setOpenEditDialog?.(true);
              setCategoryId?.(row.getValue("id"));
            },
          },
          {
            label: "Borrar",
            destructive: true,
            icon: <Trash2Icon />,
            onClick: () => {
              setOpen?.(true);
              setCategoryId?.(row.getValue("id"));
            },
          },
        ]}
      />
    ),
    size: 60,
    enableHiding: false,
  },
];

export default function Categories() {
  const [hasQueried, setHasQueried] = useState(false);
  const [{ data }, refetchQuery] = useQuery<GetCategoriesQuery>({
    query: GetCategoriesDocument,
  });
  const [open, setOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [isDeleteing, setIsDeleteing] = useState(false);
    const categories = data?.getCategories

  const [{ data: categoryData, fetching: fetchingCategoryId }] = useQuery<
    GetCategoryQuery,
    GetCategoryQueryVariables
  >({
    query: GetCategoryDocument,
    variables: {
      getCategoryId: categoryId,
    },
  });

  const [, deleteCategoryMutation] = useMutation<
    boolean,
    DeleteCategoryMutationVariables
  >(DeleteCategoryDocument);

  useEffect(() => {
    if (!hasQueried) {
      setHasQueried(true);
    }
  }, [hasQueried]);

  const onDeleteCategory = async () => {
    try {
      setIsDeleteing(true);
      const result = await deleteCategoryMutation({
        deleteCategoryId: categoryId,
      });
      if (result.error) {
        toast.error("Error al borrar la categoria", {
          description: result.error.message,
          position: "top-right",
        });
        setIsDeleteing(false);
      } else {
        toast.success("Categoria borrada con exito", {
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
    setCategoryId,
    openEditDialog,
    setOpenEditDialog,
  });

  return (
    <>
      <PageBreadCrumbs
        items={[{ label: "Cursos", href: "courses" }, { label: "Categorias" }]}
      />
      {!categories ? (
        <TableSkeleton />
      ) : (
        <>
          <DataTable
            data={categories as any}
            columns={columnsData as any}
            addButton={{ trigger: <AddCategoryDialog /> }}
          />
          <EditCategoryDialog
            data={categoryData?.getCategory}
            open={openEditDialog}
            onOpenChange={setOpenEditDialog}
            refetchData={refetchQuery}
          />

          <DeleteResourceDialog
            open={open}
            onOpenChange={setOpen}
            resourceType="Categoria"
            resourceName={
              categories.find((category) => category.id === categoryId)
                ?.name || ""
            }
            onDelete={onDeleteCategory}
            isLoading={isDeleteing}
          />
        </>
      )}
    </>
  );
}
