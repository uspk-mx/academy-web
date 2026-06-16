import {
  CreatePracticeBiteDocument,
  CreatePracticeBiteItemDocument,
  DeletePracticeBiteDocument,
  DeletePracticeBiteItemDocument,
  PracticeBitesByLessonIdDocument,
  UpdatePracticeBiteDocument,
  UpdatePracticeBiteItemDocument,
} from "gql-generated/gql/graphql";
import type {
  CreatePracticeBiteItemMutation,
  CreatePracticeBiteItemMutationVariables,
  CreatePracticeBiteMutation,
  CreatePracticeBiteMutationVariables,
  DeletePracticeBiteItemMutation,
  DeletePracticeBiteItemMutationVariables,
  DeletePracticeBiteMutation,
  DeletePracticeBiteMutationVariables,
  PracticeBitesByLessonIdQuery,
  PracticeBitesByLessonIdQueryVariables,
  UpdatePracticeBiteItemMutation,
  UpdatePracticeBiteItemMutationVariables,
  UpdatePracticeBiteMutation,
  UpdatePracticeBiteMutationVariables,
} from "gql-generated/generated/types";
import { PracticeBiteItemType } from "gql-generated/generated/types";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { useMutation, useQuery } from "urql";
import { PageLoader } from "ui/components/admin/page-loader";
import { DeleteResourceDialog } from "ui/components/admin/delete-resource-modal";
import { Button } from "ui/components/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "ui/components/drawer";
import { Input } from "ui/components/input";
import { Label } from "ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/select";
import { Textarea } from "ui/components/textarea";
import { cn } from "ui/lib/utils";
import {
  PracticeBiteItemEditor,
  type PracticeBiteItemFormValues,
} from "./practice-bite-item-editor";
import { PracticeBiteItemList } from "./practice-bite-item-list";
import {
  PRACTICE_BITE_ITEM_TYPE_OPTIONS,
  type PracticeBite,
  type PracticeBiteItem,
} from "./types";

const DRAFT_ITEM_ID = "__draft__";

interface PracticeBitesDialogProps {
  lessonId: string;
  trigger?: ReactNode;
}

export function PracticeBitesDialog({
  lessonId,
  trigger,
}: PracticeBitesDialogProps): ReactNode {
  const [open, setOpen] = useState(false);

  const [{ data, fetching, error }, reexecute] = useQuery<
    PracticeBitesByLessonIdQuery,
    PracticeBitesByLessonIdQueryVariables
  >({
    query: PracticeBitesByLessonIdDocument,
    variables: { lessonId },
    pause: !open,
    requestPolicy: "cache-and-network",
  });

  const bite: PracticeBite | undefined = data?.practiceBitesByLessonId?.[0];

  const refetch = (): void =>
    reexecute({ requestPolicy: "network-only" });

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        {trigger ?? (
          <Button
            className="aspect-square max-sm:p-0"
            size="sm"
            variant="noShadowNeutral"
          >
            <PlusIcon
              aria-hidden="true"
              className="opacity-60 sm:-ms-1 sm:me-2"
              size={16}
              strokeWidth={2}
            />
            <span className="max-sm:sr-only">Practice Bites</span>
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent
        className="w-11/12 gap-y-0 p-0 sm:p-0 left-0 top-24! sm:w-full sm:max-w-5xl sm:max-h-[min(850px,100vh)]"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        <div className="flex h-full flex-col">
          <DrawerHeader
            className="px-6 pt-4"
            closeButtonClassName="m-4"
            containerClassName="sticky top-0 z-10 bg-white"
          >
            <DrawerTitle>Bocados de práctica</DrawerTitle>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto">
            {fetching && !data ? (
              <div className="flex h-64 items-center justify-center">
                <PageLoader loadingLabel="Cargando bocados de práctica..." />
              </div>
            ) : error ? (
              <div className="flex h-64 flex-col items-center justify-center gap-3 text-center">
                <p className="text-sm text-muted-foreground">
                  No pudimos cargar los bocados de práctica.
                </p>
                <Button onClick={refetch} type="button" variant="neutral">
                  Reintentar
                </Button>
              </div>
            ) : bite ? (
              <PracticeBiteEditor bite={bite} onChanged={refetch} />
            ) : (
              <CreatePracticeBiteForm
                lessonId={lessonId}
                onCreated={refetch}
              />
            )}
          </div>
        </div>

        <div
          className={cn(
            "hidden absolute inset-0 z-10 bg-muted-foreground/40",
            { "flex justify-center": fetching && !data },
          )}
        >
          <PageLoader className="h-full" loadingLabel="Cargando..." />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function CreatePracticeBiteForm({
  lessonId,
  onCreated,
}: {
  lessonId: string;
  onCreated: () => void;
}): ReactNode {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [threshold, setThreshold] = useState(3);
  const [isSaving, setIsSaving] = useState(false);

  const [, createPracticeBite] = useMutation<
    CreatePracticeBiteMutation,
    CreatePracticeBiteMutationVariables
  >(CreatePracticeBiteDocument);

  const handleCreate = async (): Promise<void> => {
    if (!title.trim()) return;
    setIsSaving(true);
    const response = await createPracticeBite({
      input: {
        lessonId,
        title: title.trim(),
        description: description.trim() || undefined,
        solutionRevealThreshold: threshold,
      },
    });
    setIsSaving(false);

    if (response.error || !response.data?.createPracticeBite) {
      toast.error("No pudimos crear el bocado de práctica", {
        description: response.error?.message,
      });
      return;
    }

    toast.success("Bocado de práctica creado 🎉");
    onCreated();
  };

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6 px-6 py-10">
      <div className="space-y-1 text-center">
        <h3 className="text-lg font-semibold">
          Crea un bocado de práctica
        </h3>
        <p className="text-sm text-muted-foreground">
          Un quiz corto y gamificado para reforzar lo aprendido en la lección.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="practice-bite-title">Título</Label>
        <Input
          id="practice-bite-title"
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ej. Repaso rápido"
          value={title}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="practice-bite-description">Descripción</Label>
        <Textarea
          id="practice-bite-description"
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Describe brevemente este bocado de práctica..."
          value={description}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="practice-bite-threshold">
          Intentos antes de revelar la solución
        </Label>
        <Input
          id="practice-bite-threshold"
          min={1}
          onChange={(event) =>
            setThreshold(Math.max(1, Number(event.target.value) || 1))
          }
          type="number"
          value={threshold}
        />
      </div>

      <Button
        disabled={!title.trim() || isSaving}
        onClick={handleCreate}
        type="button"
      >
        Crear bocado de práctica
      </Button>
    </div>
  );
}

function PracticeBiteEditor({
  bite,
  onChanged,
}: {
  bite: PracticeBite;
  onChanged: () => void;
}): ReactNode {
  const [title, setTitle] = useState(bite.title);
  const [description, setDescription] = useState(bite.description ?? "");
  const [threshold, setThreshold] = useState(bite.solutionRevealThreshold);
  const [isSavingHeader, setIsSavingHeader] = useState(false);
  const [isSavingItem, setIsSavingItem] = useState(false);
  const [openDeleteBite, setOpenDeleteBite] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<PracticeBiteItem | null>(
    null,
  );

  const [draftType, setDraftType] = useState<PracticeBiteItemType | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const items = bite.items ?? [];

  const [, updatePracticeBite] = useMutation<
    UpdatePracticeBiteMutation,
    UpdatePracticeBiteMutationVariables
  >(UpdatePracticeBiteDocument);
  const [, deletePracticeBite] = useMutation<
    DeletePracticeBiteMutation,
    DeletePracticeBiteMutationVariables
  >(DeletePracticeBiteDocument);
  const [, createItem] = useMutation<
    CreatePracticeBiteItemMutation,
    CreatePracticeBiteItemMutationVariables
  >(CreatePracticeBiteItemDocument);
  const [, updateItem] = useMutation<
    UpdatePracticeBiteItemMutation,
    UpdatePracticeBiteItemMutationVariables
  >(UpdatePracticeBiteItemDocument);
  const [, deleteItem] = useMutation<
    DeletePracticeBiteItemMutation,
    DeletePracticeBiteItemMutationVariables
  >(DeletePracticeBiteItemDocument);

  const headerDirty =
    title !== bite.title ||
    description !== (bite.description ?? "") ||
    threshold !== bite.solutionRevealThreshold;

  const draftItem: PracticeBiteItem | null = draftType
    ? {
        __typename: "PracticeBiteItem",
        id: DRAFT_ITEM_ID,
        type: draftType,
        prompt: "",
        media: null,
        answerExplanation: null,
        position: items.length + 1,
        createdAt: "",
        updatedAt: "",
        settings: null,
        solution: null,
      }
    : null;

  const selectedItem =
    draftItem ?? items.find((item) => item.id === selectedItemId) ?? null;

  const handleSaveHeader = async (): Promise<void> => {
    if (!title.trim()) return;
    setIsSavingHeader(true);
    const response = await updatePracticeBite({
      updatePracticeBiteId: bite.id,
      input: {
        title: title.trim(),
        description: description.trim() || null,
        solutionRevealThreshold: threshold,
      },
    });
    setIsSavingHeader(false);

    if (response.error) {
      toast.error("No pudimos guardar los cambios", {
        description: response.error.message,
      });
      return;
    }
    toast.success("Bocado de práctica actualizado");
    onChanged();
  };

  const handleDeleteBite = async (): Promise<void> => {
    const response = await deletePracticeBite({ deletePracticeBiteId: bite.id });
    if (response.error || !response.data?.deletePracticeBite) {
      toast.error("No pudimos eliminar el bocado de práctica", {
        description: response.error?.message,
      });
      return;
    }
    toast.success("Bocado de práctica eliminado");
    onChanged();
  };

  const handleAddItem = (type: PracticeBiteItemType): void => {
    setSelectedItemId(null);
    setDraftType(type);
  };

  const handleSelectItem = (item: PracticeBiteItem): void => {
    setDraftType(null);
    setSelectedItemId(item.id);
  };

  const handleSaveItem = async (
    values: PracticeBiteItemFormValues,
  ): Promise<void> => {
    setIsSavingItem(true);
    const isDraft = selectedItem?.id === DRAFT_ITEM_ID;

    const response = isDraft
      ? await createItem({
          input: {
            practiceBiteId: bite.id,
            type: values.type,
            prompt: values.prompt,
            media: values.media,
            answerExplanation: values.answerExplanation,
            settings: values.settings,
            position: items.length + 1,
          },
        })
      : await updateItem({
          updatePracticeBiteItemId: selectedItem!.id,
          input: {
            prompt: values.prompt,
            media: values.media,
            answerExplanation: values.answerExplanation,
            settings: values.settings,
          },
        });
    setIsSavingItem(false);

    if (response.error) {
      toast.error("No pudimos guardar el elemento", {
        description: response.error.message,
      });
      return;
    }

    if (isDraft && "data" in response && response.data) {
      const created = (response.data as CreatePracticeBiteItemMutation)
        .createPracticeBiteItem;
      setDraftType(null);
      setSelectedItemId(created.id);
    }
    toast.success(isDraft ? "Elemento agregado" : "Elemento actualizado");
    onChanged();
  };

  const handleConfirmDeleteItem = async (): Promise<void> => {
    if (!itemToDelete) return;
    const response = await deleteItem({
      deletePracticeBiteItemId: itemToDelete.id,
    });
    if (response.error || !response.data?.deletePracticeBiteItem) {
      toast.error("No pudimos eliminar el elemento", {
        description: response.error?.message,
      });
      return;
    }
    if (selectedItemId === itemToDelete.id) setSelectedItemId(null);
    setItemToDelete(null);
    toast.success("Elemento eliminado");
    onChanged();
  };

  const handleReorder = async (
    reordered: PracticeBiteItem[],
  ): Promise<void> => {
    const responses = await Promise.all(
      reordered.map((item) =>
        updateItem({
          updatePracticeBiteItemId: item.id,
          input: { position: item.position },
        }),
      ),
    );
    if (responses.some((response) => response.error)) {
      toast.error("Hubo un error al reorganizar los elementos");
    } else {
      toast.success("Elementos reorganizados");
    }
    onChanged();
  };

  return (
    <div className="grid h-full grid-cols-1 sm:grid-cols-[20rem_1fr]">
      <div className="flex flex-col gap-4 border-b border-border p-6 sm:border-b-0 sm:border-r">
        <div className="space-y-2">
          <Label htmlFor="bite-title">Título</Label>
          <Input
            id="bite-title"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bite-description">Descripción</Label>
          <Textarea
            id="bite-description"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bite-threshold">
            Intentos para revelar solución
          </Label>
          <Input
            id="bite-threshold"
            min={1}
            onChange={(event) =>
              setThreshold(Math.max(1, Number(event.target.value) || 1))
            }
            type="number"
            value={threshold}
          />
        </div>
        <div className="flex gap-2">
          <Button
            className="flex-1"
            disabled={!headerDirty || !title.trim() || isSavingHeader}
            onClick={handleSaveHeader}
            type="button"
          >
            Guardar
          </Button>
          <Button
            onClick={() => setOpenDeleteBite(true)}
            size="icon"
            type="button"
            variant="ghost"
          >
            <Trash2Icon className="size-4 text-destructive" />
          </Button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-medium">Elementos</span>
          <Select
            onValueChange={(value) =>
              handleAddItem(value as PracticeBiteItemType)
            }
            value=""
          >
            <SelectTrigger className="h-9 w-auto" variant="neutral">
              <SelectValue placeholder="Agregar" />
            </SelectTrigger>
            <SelectContent>
              {PRACTICE_BITE_ITEM_TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <PracticeBiteItemList
          items={items}
          onRemove={setItemToDelete}
          onReorder={handleReorder}
          onSelect={handleSelectItem}
          selectedItemId={draftType ? DRAFT_ITEM_ID : selectedItemId}
        />
      </div>

      <div className="overflow-y-auto p-6">
        {selectedItem ? (
          <PracticeBiteItemEditor
            isDraft={selectedItem.id === DRAFT_ITEM_ID}
            isSaving={isSavingItem}
            item={selectedItem}
            key={selectedItem.id}
            onSave={handleSaveItem}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
            Selecciona un elemento o agrega uno nuevo para empezar.
          </div>
        )}
      </div>

      <DeleteResourceDialog
        onDelete={handleDeleteBite}
        onOpenChange={setOpenDeleteBite}
        open={openDeleteBite}
        resourceName={bite.title}
        resourceType="Bocado de práctica"
      />
      <DeleteResourceDialog
        onDelete={handleConfirmDeleteItem}
        onOpenChange={(value) => !value && setItemToDelete(null)}
        open={Boolean(itemToDelete)}
        resourceName={itemToDelete?.prompt || "Elemento"}
        resourceType="Elemento"
      />
    </div>
  );
}
