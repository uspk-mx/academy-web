import type { UpdateCourseDocument } from "gql-generated/gql/graphql";
import type {
  UpdateCourseInput,
  UpdateCourseMutation,
  UpdateCourseMutationVariables,
} from "gql-generated/generated/types";
import { CircleCheck } from "lucide-react";
import type { JSX } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router";
import { toast } from "sonner";
import { useMutation } from "urql";

interface BuilderNavContextType {
  isSubmitting: boolean;
  isError: boolean;
  error: Error | null;
  lastSavedData: Record<string, UpdateCourseInput>;
  formId?: string;
  setFormId?: (formId: string) => void;
  onSubmitForm?: (data: UpdateCourseInput) => Promise<void>;
}

export const BuilderNavContext = createContext<
  BuilderNavContextType | undefined
>(undefined);

const ROUTE_FORM_MAP = {
  "/builder": "basics",
  "/additional": "additional",
} as const;

export function BuilderNavProvider({
  children,
  courseId,
  updateCourseMutation,
}: {
  children: React.ReactNode;
  courseId: string;
  updateCourseMutation: typeof UpdateCourseDocument;
}): JSX.Element {
  const [currentSection, setCurrentSection] = useState<string>("basics");
  const [formId, setFormId] = useState<string>("");
  const [lastSavedData, setLastSavedData] = useState<
    Record<string, UpdateCourseInput>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { pathname } = useLocation();

  const [{ fetching: isUpdating }, updateCourse] = useMutation<
    UpdateCourseMutation,
    UpdateCourseMutationVariables
  >(updateCourseMutation);

  const onSubmitForm = useCallback(
    async (data: UpdateCourseInput) => {
      try {
        setIsSubmitting(true);
        setError(null);

        // Optimistic update
        setLastSavedData((prev) => ({
          ...prev,
          [currentSection]: data,
        }));

        const response = await updateCourse({
          updateCourseId: courseId,
          input: data,
        });

        if (!response.data?.updateCourse) {
          toast.error("Error al actualizar el curso");
          throw new Error("Failed to update course");
        } else {
          setIsSubmitting(false);
          toast.success("Curso actualizado exitosamente", {
            position: "top-center",
            richColors: true,
            icon: (
              <CircleCheck className="w-6 h-6 text-white mr-2" fill="#15803d" />
            ),
          });
        }
      } catch (err) {
        setLastSavedData((prev) => {
          const { [currentSection]: _, ...rest } = prev;
          return rest;
        });
        setError(
          err instanceof Error ? err : new Error("Unknown error occurred")
        );
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [courseId, currentSection, updateCourse]
  );

  useEffect(() => {
    const matchedRoute = Object.entries(ROUTE_FORM_MAP).find(([route]) =>
      pathname.includes(route)
    );

    if (matchedRoute) {
      const [_, formType] = matchedRoute;
      setFormId(formType);
      setCurrentSection(formType);
    }
  }, [pathname]);

  return (
    <BuilderNavContext.Provider
      value={{
        isSubmitting: isSubmitting || isUpdating,
        isError: !!error,
        error,
        lastSavedData,
        formId,
        setFormId,
        onSubmitForm,
      }}
    >
      {children}
    </BuilderNavContext.Provider>
  );
}

export function useBuilderNav(): BuilderNavContextType {
  const context = useContext(BuilderNavContext);

  if (!context) {
    throw new Error("useBuilderNav must be used within a BuilderNavProvider");
  }

  return context;
}
