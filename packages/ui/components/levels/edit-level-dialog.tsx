import { UpdateLevelDocument } from "gql-generated/gql/graphql";
import type {
  GetLevelQuery,
  Level,
  UpdateLevelMutationVariables,
} from "gql-generated/generated/types";
import { EditDialog } from "ui/components/admin/edit-dialog";
import { Input } from "ui/components/input";
import { Label } from "ui/components/label";
import { Textarea } from "ui/components/textarea";
import { useCharacterLimit } from "ui/hooks/use-character-limit";
import { useEffect, useId, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { useMutation } from "urql";

export const EditLevelDialog = ({
  data,
  open,
  refetchData,
  onOpenChange,
}: {
  data: Level | undefined | null;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  refetchData: ({ requestPolicy }: { requestPolicy: "network-only" }) => void;
}) => {
  const id = useId();
  const [{}, updateLevelMutation] = useMutation<
    GetLevelQuery,
    UpdateLevelMutationVariables
  >(UpdateLevelDocument);
  const [isUpdating, setIsUpdating] = useState(false);

  const maxLength = 180;

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(e);
    setFormData({ ...formData, description: e.target.value });
  };

  const [formData, setFormData] = useState<{
    name: string;
    description: string;
  }>({
    name: data?.name || "",
    description: data?.description || "",
  });

  useEffect(() => {
    if (open) {
      setFormData({
        name: data?.name || "",
        description: data?.description || "",
      });
      if (data?.description) {
        setCharacterCount(data?.description?.length);
      }
    }
  }, [open, data]);

  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
    setCharacterCount,
  } = useCharacterLimit({ maxLength, initialValue: formData?.description });

  const onUpdateLevel = async (formData: FormData) => {
    try {
      setIsUpdating(true);
      const result = await updateLevelMutation({
        updateLevelId: data?.id as string,
        input: {
          name: formData.get("name") as string,
          description: formData.get("description") as string,
        },
      });
      if (result.error) {
        toast.error("Error al actualizar el nivel", {
          description: result.error.message,
          position: "top-right",
        });
        setIsUpdating(false);
      } else {
        toast.success("Nivel actualizado con exito", {
          position: "top-right",
        });
        onOpenChange(false);
        refetchData({ requestPolicy: "network-only" });
        setIsUpdating(false);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Oops! algo salio mal, intentalo nuevamente!", {
        description: error as string,
        position: "top-right",
      });
    }
  };

  return (
    <EditDialog
      dialogTitle="Actualizar nivel"
      dialogDescription="Modifica los datos en los campos, y haz clic en el boton guardar cambios cuando finalizes."
      editAction={onUpdateLevel}
      actions={{
        confirmLabel: "Guardar cambios",
      }}
      open={open}
      onOpenChange={onOpenChange}
      isLoading={isUpdating}
    >
      <div className="space-y-2">
        <Label htmlFor={`${id}-name`}>Nombre</Label>
        <Input
          id={`${id}-name`}
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Avanzado"
          required
          type="text"
        />
      </div>
      <div className="space-y-2">
        <Textarea
          id={`${id}-descripcion`}
          label="Descripcion"
          name="description"
          value={formData.description}
          onChange={handleChangeDescription}
          maxLength={180}
          aria-describedby={`${id}-description`}
        />

        <p
          aria-live="polite"
          className="mt-2 text-right text-xs text-muted-foreground"
          id={`${id}-description`}
          role="status"
        >
          <span className="tabular-nums">{limit - characterCount}</span>{" "}
          caracteres disponibles
        </p>
      </div>
    </EditDialog>
  );
};
