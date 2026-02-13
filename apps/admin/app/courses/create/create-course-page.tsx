import { useCallback, useEffect, useState } from "react";
import { redirect, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { useMutation, useQuery } from "urql";
import { PageLoader } from "ui/components/admin";
import { NewCourseStep } from "ui/components/admin/courses/new-course-step";
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
import { Progress } from "ui/components/progress";
import {
  CreateInitialCourseDocument,
  GetCategoriesDocument,
  GetLevelsDocument,
} from "gql-generated/generated/bff.sdk";
import {
  CourseStatus,
  type Course,
  type CreateInitialCourseInput,
  type CreateInitialCourseMutationVariables,
  type GetCategoriesQuery,
  type GetLevelsQuery,
} from "gql-generated/generated/types";
import { usePersistedState } from "ui/hooks/use-persisted-state";
import { cn } from "ui/lib/utils";
import type { Route } from "./+types/create-course-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Uspk Academy | Create Course" },
    { name: "description", content: "Crea tu nuevo curso en Uspk Academy" },
  ];
}

export const loader = async ({ request }: { request: Request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = Object.fromEntries(
    cookieHeader?.split("; ").map((cookie) => cookie.split("=")) || []
  );

  const sessionToken = cookies["session_token"];

  if (!sessionToken) {
    // Redirect to login if session token is missing
    return redirect("/login");
  }

  return null;
};

export default function CreateCoursePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [hasQueriedLevels, setHasQueriedLevels] = useState(false);
  const [hasQueriedCategories, setHasQueriedCategories] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = usePersistedState("initial_couse_form_data", {
    title: "",
    categoryId: "",
    levelId: "",
  });

  const currentStep = (searchParams.get("step") as string) || "1";

  const [{ data: categories, fetching: fetchingCategories }] =
    useQuery<GetCategoriesQuery>({ query: GetCategoriesDocument });

  const [{ data: levels, fetching: fetchingLevels }] = useQuery<GetLevelsQuery>(
    { query: GetLevelsDocument, pause: hasQueriedLevels }
  );

  useEffect(() => {
    if (!hasQueriedLevels && !fetchingLevels) {
      setHasQueriedLevels(true);
    }
    if (!hasQueriedCategories && !fetchingCategories) {
      setHasQueriedCategories(true);
    }
  }, [
    hasQueriedLevels,
    hasQueriedCategories,
    fetchingLevels,
    fetchingCategories,
  ]);

  const [{ data, fetching }, createInitialCourseMutation] = useMutation<
    { createInitialCourse: Course },
    CreateInitialCourseMutationVariables
  >(CreateInitialCourseDocument);

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateStep = useCallback(
    (step: string) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("step", step);
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const navigateToNextStep = (e?: React.MouseEvent) => {
    e?.preventDefault();
    switch (currentStep) {
      case "1":
        if (formData.title.trim()) updateStep("2");
        break;
      case "2":
        if (formData.categoryId.trim()) updateStep("3");
        break;
      case "3":
        document.querySelector("form")?.requestSubmit();
        break;
    }
  };

  const navigateToPreviousStep = (e?: React.MouseEvent) => {
    e?.preventDefault();
    switch (currentStep) {
      case "3":
        updateStep("2");
        break;
      case "2":
        updateStep("1");
        break;
    }
  };

  const isNextDisabled =
    {
      "1": !formData.title.trim(),
      "2": !formData.categoryId.trim(),
      "3": !formData.levelId.trim(),
    }[currentStep] || false;

  const getStepProgress = useCallback(() => {
    switch (currentStep) {
      case "1":
        return 40;
      case "2":
        return 70;
      case "3":
        return 100;
      default:
        return 0;
    }
  }, [currentStep]);

  const clearFormData = useCallback(() => {
    localStorage.removeItem("course_form_data");
    setFormData({
      title: "",
      categoryId: "",
      levelId: "",
    });
    setSearchParams(new URLSearchParams());
  }, [setFormData, setSearchParams]);

  const handleSubmit = async (formDataObj: FormData) => {
    const courseData = Array.from(formDataObj.entries()).reduce(
      (acc: Record<string, FormDataEntryValue>, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {}
    ) as Omit<CreateInitialCourseInput, "status">;

    try {
      setIsSaving(true); // Show loader before mutation
      const result = await createInitialCourseMutation({
        input: { ...courseData, status: CourseStatus.Draft },
      });

      if (result.data?.createInitialCourse) {
        toast.success("Curso creado con exito!", {
          position: "top-right",
        });
        clearFormData();
        navigate(
          `/admin/courses/${result.data?.createInitialCourse.id}/builder`
        );
      } else if (result.error) {
        toast.error("Error al crear el curso", {
          description: result.error.message,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Oops! algo salio mal, intentalo nuevamente mas tarde!", {
        description: error as string,
        position: "top-right",
      });
    } finally {
      setIsSaving(false); // Hide loader after mutation
    }
  };

  if (isSaving) {
    return <PageLoader loadingLabel="Guardando Cambios" />;
  }

  return (
    <>
      <div className="sticky left-0 top-0 z-1 w-full bg-white">
        <div className="relative z-50 flex h-20 items-center justify-between bg-white px-10 py-0 shadow-[0_2px_4px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.08)]">
          <img
            src="https://res.cloudinary.com/uspk/image/upload/v1668625225/logos/png/black-logo_cxrldb.png"
            alt="Uspk logo"
            width={300}
            height={150}
            className="h-14 w-auto"
          />
          <div className="mx-10 flex h-full min-w-px flex-1 items-center border-l border-l-accent px-10 text-xl">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <div className="hidden md:inline">Paso {currentStep} de 3</div>
              <div className="inline md:hidden">{currentStep}/3</div>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost">Salir</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Salir del creador del curso?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Toma un momento para revisar los datos ingresados, si sales
                  perderás el progreso no guardado.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    clearFormData();
                    navigate("/courses");
                  }}
                >
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <Progress value={getStepProgress()} className="h-2 rounded-none" />
      </div>
      <form
        onSubmit={(e) => {
          if (currentStep !== "3") {
            e.preventDefault();
          } else {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSubmit(formData);
          }
        }}
        className="flex flex-auto flex-col"
      >
        <div className="mx-10 flex max-w-536 flex-auto flex-col py-24 md:mx-auto">
          <div className="flex justify-center">
            <NewCourseStep
              title="Hay que darle un nombre al curso"
              description="No hay problema si no se te ocurre un buen título ahora.
                  Puedes cambiarlo más tarde."
              inputData={{
                placeholder: "e.g Curso de ingles intensivo",
                name: "title",
                value: formData.title,
                onValueChange: (event) =>
                  updateFormData("title", event.target.value),
                maxLength: 60,
              }}
              className={cn(`${currentStep === "1" ? "block" : "hidden"}`)}
            />

            <NewCourseStep
              title="Ahora asignemos una categoria"
              description="Esta categoria servira para organizar el curso."
              selectData={{
                placeholder: "Selecciona una categoria",
                name: "categoryId",
                value: formData.categoryId,
                onValueChange: (value) => updateFormData("categoryId", value),
                label: "Categorias",
                options:
                  categories?.getCategories?.map((category) => ({
                    id: category.id,
                    label: category.name,
                  })) || [],
              }}
              className={cn(`${currentStep === "2" ? "block" : "hidden"}`)}
              isLoading={fetchingCategories}
            />

            <NewCourseStep
              title="Ahora asignemos un nivel al curso"
              description="Este nivel puede ser cambiado despues, si cambias de opinion."
              selectData={{
                placeholder: "Selecciona un nivel",
                name: "levelId",
                value: formData.levelId,
                onValueChange: (value) => updateFormData("levelId", value),
                label: "Niveles",
                options:
                  levels?.getLevels?.map((level) => ({
                    id: level.id,
                    label: level.name,
                  })) || [],
              }}
              className={cn(`${currentStep === "3" ? "block" : "hidden"}`)}
              isLoading={fetchingLevels}
            />
          </div>
        </div>
        <div className="sticky bottom-0 left-0 z-1 flex w-full flex-wrap justify-between gap-x-10 gap-y-3 bg-white px-10 py-6 shadow-[0_-2px_4px_rgba(0,0,0,0.08),0_-4px_12px_rgba(0,0,0,0.08)]">
          {currentStep !== "1" && (
            <Button
              variant="neutral"
              onClick={(e) => navigateToPreviousStep(e)}
            >
              Anterior
            </Button>
          )}

          <Button
            type={currentStep === "3" ? "submit" : "button"}
            onClick={(e) =>
              currentStep !== "3" ? navigateToNextStep(e) : undefined
            }
            disabled={isNextDisabled}
          >
            {currentStep === "3" ? "Crear curso" : "Siguiente"}
          </Button>
        </div>
      </form>
    </>
  );
}
