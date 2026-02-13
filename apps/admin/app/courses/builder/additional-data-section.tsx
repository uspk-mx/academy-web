import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, redirect, useParams } from "react-router";
import { toast } from "sonner";
import { useQuery } from "urql";
import { ExtraSettingsEditor } from "ui/components/admin/extra-settings-editor";
import { PageLoader } from "ui/components/admin/page-loader";
import { Button } from "ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "ui/components/card";
import { Input } from "ui/components/input";
import { Label } from "ui/components/label";
import { TagTextarea } from "ui/components/tag-textarea";
import { useBuilderDispatch, useBuilderState } from "ui/context/builder-context";
import { useBuilderNav } from "ui/context/builder-nav-context";
import { CourseDocument } from "gql-generated/generated/bff.sdk";
import type {
  CourseQuery,
  CourseQueryVariables,
} from "gql-generated/generated/types";
import type { Route } from "./+types/additional-data-section";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Uspk Academy | Additional Data Builder" },
    { name: "description", content: "Uspk Academy additional data builder" },
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

export default function AdditionalDataSection() {
  const { cid } = useParams();
  const [{ data, fetching }] = useQuery<CourseQuery, CourseQueryVariables>({
    query: CourseDocument,
    variables: { courseId: cid || "" },
  });
  const { extraSettings, metadata, duration, title } = useBuilderState();
  const { formId, onSubmitForm } = useBuilderNav();
  const dispatch = useBuilderDispatch();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.course.metadata?.benefits) {
      dispatch({
        type: "SET_METADATA",
        payload: { benefits: JSON.parse(data?.course.metadata?.benefits) },
      });
    }

    if (data?.course.metadata?.learnings) {
      dispatch({
        type: "SET_METADATA",
        payload: { learnings: JSON.parse(data?.course.metadata?.learnings) },
      });
    }

    if (data?.course.metadata?.requirements) {
      dispatch({
        type: "SET_METADATA",
        payload: {
          requirementsInstructions: JSON.parse(
            data?.course.metadata?.requirements
          ),
        },
      });
    }

    if (data?.course.metadata?.materialsIncluded) {
      dispatch({
        type: "SET_METADATA",
        payload: {
          materialsIncluded: JSON.parse(
            data?.course.metadata?.materialsIncluded
          ),
        },
      });
    }

    if (data?.course.metadata?.targetAudience) {
      dispatch({
        type: "SET_METADATA",
        payload: {
          targetAudience: JSON.parse(data?.course.metadata?.targetAudience),
        },
      });
    }

    if (data?.course.duration) {
      dispatch({
        type: "SET_DURATION",
        payload: data?.course.duration,
      });
    }

    if (data?.course.extraSettings && data?.course.extraSettings.length > 0) {
      dispatch({
        type: "SET_EXTRA_SETTINGS",
        payload: data?.course.extraSettings.map((item) => ({
          key: item.key || undefined,
          value: item.value || undefined,
        })),
      });
    }
  }, [data?.course, dispatch]);

  const onSaveAdditionalData = async () => {
    try {
      setIsSaving(true);
      await onSubmitForm?.({
        title: data?.course?.title || "",
        metadata: {
          benefits: JSON.stringify(metadata?.benefits),
          learnings: JSON.stringify(metadata?.learnings),
          materialsIncluded: JSON.stringify(metadata?.materialsIncluded),
          requirementsInstructions: JSON.stringify(
            metadata?.requirementsInstructions
          ),
          targetAudience: JSON.stringify(metadata?.targetAudience),
        },
        extraSettings: extraSettings,
        duration: duration,
      });

      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
      console.error("Algo salio mal", error);
      toast.error("Algo salio mal", {
        description:
          "Ocurrion un problema al guardar los datos, intentalo nuevamente.",
      });
    }
  };

  if (fetching || isSaving) {
    return (
      <PageLoader loadingLabel={isSaving ? "Guardando cambios" : "Cargando"} />
    );
  }

  return (
    <div className="flex bg-background mx-auto w-full max-w-[1006px] min-h-[calc(-64px+100vh)]">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          onSaveAdditionalData();
        }}
        id={formId}
      >
        <div className="gap-0 lg:gap-8 grid lg:grid-cols-[1fr_338px] w-full">
          {/* Left column */}

          <div className="pt-8 pb-6 self-start">
            <div className="flex items-start gap-4">
              <Button variant="ghost" type="button" asChild>
                <Link to={`/courses/${cid}/curriculum`}>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </Button>
              <div>
                <h3
                  id="existing-users"
                  className="font-semibold text-gray-900 text-lg dark:text-gray-50"
                >
                  Detalles adicionales
                </h3>
                <p className="mt-1 text-gray-500 text-sm leading-6">
                  Agrega los detalles adicionales que quieras incluir en tu
                  curso.
                </p>
              </div>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Descripción general</CardTitle>
                <CardDescription>
                  Proporciona información esencial sobre el curso para atraer e
                  informar a los estudiantes potenciales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-start gap-4">
                  {/* learnings */}
                  <TagTextarea
                    label="¿Que aprendere en este curso?"
                    helperText="Define los aspectos más importantes de este curso (enumera los aspectos por línea)"
                    tags={metadata?.learnings || []}
                    className="text-sm"
                    onTagsChange={(value) =>
                      dispatch({
                        type: "SET_METADATA",
                        payload: { learnings: value },
                      })
                    }
                  />
                  <TagTextarea
                    label="Público objetivo"
                    helperText="Especifa el público objetivo que se beneficiará más del curso. (Una línea por público objetivo)"
                    maxTags={12}
                    placeholder="Escribe y presiona Enter o coma para agregar publicos objetivo..."
                    tags={metadata?.targetAudience || []}
                    className="text-sm"
                    onTagsChange={(value) =>
                      dispatch({
                        type: "SET_METADATA",
                        payload: { targetAudience: value },
                      })
                    }
                  />

                  <TagTextarea
                    label="Materiales incluidos"
                    helperText="Una lista de los recursos que proporcionaras a los estudiantes en este curso (uno por línea)"
                    maxTags={20}
                    placeholder="Escribe y presiona Enter o coma para agregar materiales..."
                    tags={metadata?.materialsIncluded || []}
                    className="text-sm"
                    onTagsChange={(value) =>
                      dispatch({
                        type: "SET_METADATA",
                        payload: { materialsIncluded: value },
                      })
                    }
                  />

                  <TagTextarea
                    label="Requisitos / instrucciones"
                    helperText="Requisitos adicionales o instrucciones especiales para los estudiantes (uno por línea)"
                    maxTags={20}
                    placeholder="Escribe y presiona Enter o coma para agregar requisitos..."
                    tags={metadata?.requirementsInstructions || []}
                    className="text-sm"
                    onTagsChange={(value) =>
                      dispatch({
                        type: "SET_METADATA",
                        payload: { requirementsInstructions: value },
                      })
                    }
                  />

                  <TagTextarea
                    label="Beneficios"
                    helperText="Benedicios que se darán al estudiante al terminar el curso (uno por línea)"
                    placeholder="Escribe y presiona Enter o coma para agregar beneficios..."
                    tags={metadata?.benefits || []}
                    className="text-sm"
                    onTagsChange={(value) =>
                      dispatch({
                        type: "SET_METADATA",
                        payload: { benefits: value },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
            {/* Stepper actions */}
            <div className="lg:flex justify-end items-center gap-4 hidden mt-10 w-full h-8">
              <Button
                variant="neutral"
                className="aria-disabled:opacity-50 aria-disabled:pointer-events-none"
                asChild
              >
                <Link to={`/courses/${cid}/curriculum`}>
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 py-6 lg:pl-8 border-t border-t-border lg:border-t-0 lg:border-l-border lg:border-l min-h-[calc(-64px+100vh)]">
            <div className="space-y-2 w-full">
              <Label htmlFor="duracion">Duracion del curso</Label>
              <div className="relative">
                <Input
                  id="duration"
                  className="pe-22 peer"
                  placeholder="0"
                  type="text"
                  name="duration"
                  value={duration}
                  onChange={(event) => {
                    const value = event.target.value.replace(/[^0-9]/g, "");
                    dispatch({
                      type: "SET_DURATION",
                      payload: Number(value),
                    });
                  }}
                />
                <span className="absolute inset-y-0 flex justify-center items-center peer-disabled:opacity-50 pl-3 border-l text-muted-foreground text-sm pointer-events-none end-0 pe-3">
                  minutos
                </span>
              </div>
            </div>
            <ExtraSettingsEditor
              setSettings={(value) =>
                dispatch({ type: "SET_EXTRA_SETTINGS", payload: value })
              }
              settings={extraSettings || []}
              helperText="Ingresa los ajustes adicionales que quieras incluir en tu curso, con un formato de clave:valor"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
