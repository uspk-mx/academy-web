import type {
  Course,
  CreateLearningPathInput,
  LearningPath,
  UpdateLearningPathInput,
} from "gql-generated/generated/types";
import {
  CreateLearningPathDocument,
  UpdateLearningPathDocument,
} from "gql-generated/generated/bff.sdk";
import type {
  CreateLearningPathMutation,
  CreateLearningPathMutationVariables,
  UpdateLearningPathMutation,
  UpdateLearningPathMutationVariables,
} from "gql-generated/generated/types";
import { ImagePlusIcon, LoaderCircleIcon, XIcon } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "urql";
import { Button } from "ui/components/button";
import { Input } from "ui/components/input";
import { Label } from "ui/components/label";
import { Textarea } from "ui/components/textarea";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "ui/components/sheet";
import { CoursePrerequisiteSelector } from "ui/components/admin/course-prerequisite-selector";
import { useImageUpload } from "ui/hooks/use-image-upload";
import { uploadFileToCloudinary } from "ui/lib/cloudinary";

interface LearningPathFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  learningPath?: LearningPath | null;
  courses: Array<{ id: string; title: string; featuredImage?: string | null }>;
  onSuccess?: () => void;
}

export function LearningPathFormSheet({
  open,
  onOpenChange,
  learningPath,
  courses,
  onSuccess,
}: LearningPathFormSheetProps): ReactNode {
  const isEditing = !!learningPath;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [imageRemoved, setImageRemoved] = useState(false);

  const { file, previewUrl, fileInputRef, handleThumbnailClick, handleFileChange, handleRemove: originalHandleRemove } =
    useImageUpload();

  const handleRemoveImage = () => {
    originalHandleRemove();
    setImageRemoved(true);
  };

  const [, createLearningPath] = useMutation<
    CreateLearningPathMutation,
    CreateLearningPathMutationVariables
  >(CreateLearningPathDocument);

  const [, updateLearningPath] = useMutation<
    UpdateLearningPathMutation,
    UpdateLearningPathMutationVariables
  >(UpdateLearningPathDocument);

  useEffect(() => {
    if (open && learningPath) {
      setName(learningPath.name);
      setDescription(learningPath.description);
      setImageRemoved(false);
      setSelectedCourseIds(
        learningPath.courses
          ?.slice()
          .sort((a, b) => a.position - b.position)
          .map((lpc) => lpc.course.id) ?? []
      );
    } else if (open && !learningPath) {
      setName("");
      setDescription("");
      setSelectedCourseIds([]);
      handleRemoveImage();
    }
  }, [open, learningPath]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("El nombre es requerido");
      return;
    }

    setIsSaving(true);

    try {
      let featuredImage: string | undefined;

      if (file) {
        featuredImage = await uploadFileToCloudinary(file, "image");
      }

      if (isEditing) {
        const input: UpdateLearningPathInput = {
          name: name.trim(),
          description: description.trim(),
          courseIds: selectedCourseIds,
          ...(featuredImage ? { featuredImage } : imageRemoved ? { featuredImage: "" } : {}),
        };

        const result = await updateLearningPath({
          learningPathId: learningPath.id,
          input,
        });

        if (result.error) {
          toast.error("Error al actualizar el learning path");
          return;
        }

        toast.success("Learning path actualizado correctamente");
      } else {
        const input: CreateLearningPathInput = {
          name: name.trim(),
          description: description.trim(),
          courseIds: selectedCourseIds,
          ...(featuredImage && { featuredImage }),
        };

        const result = await createLearningPath({ input });

        if (result.error) {
          toast.error("Error al crear el learning path");
          return;
        }

        toast.success("Learning path creado correctamente");
      }

      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast.error("Ocurrio un error inesperado");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const currentImage = previewUrl || (!imageRemoved ? learningPath?.featuredImage : null);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {isEditing ? "Editar Learning Path" : "Nuevo Learning Path"}
          </SheetTitle>
          <SheetDescription>
            {isEditing
              ? "Actualiza los datos del learning path."
              : "Crea un nuevo learning path para organizar tus cursos."}
          </SheetDescription>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          {/* Featured Image */}
          <div className="space-y-2">
            <Label>Imagen destacada</Label>
            {currentImage ? (
              <div className="relative rounded-lg border-2 overflow-hidden aspect-video">
                <img
                  src={currentImage}
                  alt="Featured"
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8"
                  onClick={handleRemoveImage}
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleThumbnailClick}
                className="flex flex-col items-center justify-center gap-2 w-full aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors bg-muted/50"
              >
                <ImagePlusIcon className="w-8 h-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Subir imagen
                </span>
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="lp-name">Nombre</Label>
            <Input
              id="lp-name"
              placeholder="Ej: Ingles General A1 - A2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="lp-description">Descripcion</Label>
            <Textarea
              id="lp-description"
              placeholder="Describe el learning path..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxRows={4}
            />
          </div>

          {/* Course Selector */}
          <CoursePrerequisiteSelector
            label="Cursos incluidos"
            helperText="Selecciona los cursos que forman parte de este learning path. El orden determina la secuencia."
            courses={courses}
            selectedCourseIds={selectedCourseIds}
            onSelectCourses={setSelectedCourseIds}
          />
        </div>

        <SheetFooter className="mt-6 w-full gap-4 md:gap-0">
          <Button onClick={handleSubmit} disabled={isSaving} className="w-full">
            {isSaving ? (
              <>
                <LoaderCircleIcon
                  className="-ms-1 animate-spin"
                  size={16}
                  aria-hidden="true"
                />
                Guardando...
              </>
            ) : isEditing ? (
              "Guardar cambios"
            ) : (
              "Crear Learning Path"
            )}
          </Button>
          <SheetClose asChild className="w-full">
            <Button variant="neutral" disabled={isSaving}>
              Cancelar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
