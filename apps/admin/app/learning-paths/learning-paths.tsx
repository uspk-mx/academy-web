import {
  LearningPathsDocument,
  InstructorCoursesDocument,
  DeleteLearningPathDocument,
} from "gql-generated/generated/bff.sdk";
import type {
  LearningPath,
  LearningPathsQuery,
  LearningPathsQueryVariables,
  InstructorCoursesQuery,
  InstructorCoursesQueryVariables,
  DeleteLearningPathMutation,
  DeleteLearningPathMutationVariables,
} from "gql-generated/generated/types";
import { CourseCardSkeleton } from "ui/components/admin/courses/course-card-skeleton";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import { redirect, useSearchParams } from "react-router";
import { useMutation, useQuery } from "urql";
import { CourseEmptyPage } from "ui/components/courses/course-empty-page";
import { CoursesPageToolbar } from "ui/components/courses/course-page-toolbar";
import type { Route } from "./+types/learning-paths";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { LearningPathCard } from "ui/components/admin/learning-paths/learning-path-card";
import { LearningPathFormSheet } from "ui/components/admin/learning-paths/learning-path-form-sheet";
import { DeleteDialog } from "ui/components/admin/delete-dialog";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Learning Paths" },
    { name: "description", content: "Learning Paths de USPK Academy!" },
  ];
}

export const loader = async ({ request }: { request: Request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = Object.fromEntries(
    cookieHeader?.split("; ").map((cookie) => cookie.split("=")) || [],
  );

  const sessionToken = cookies["session_token"];

  if (!sessionToken) {
    return redirect("/login");
  }

  return null;
};

export default function LearningPaths() {
  const [openFormSheet, setOpenFormSheet] = useState(false);
  const [editingPath, setEditingPath] = useState<LearningPath | null>(null);
  const [deletingPath, setDeletingPath] = useState<LearningPath | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("q") || undefined;
  const sortOrder = searchParams.get("sort") || undefined;

  const [{ data, fetching }, reexecuteQuery] = useQuery<
    LearningPathsQuery,
    LearningPathsQueryVariables
  >({
    query: LearningPathsDocument,
  });

  // Fetch all courses for the course selector
  const [{ data: coursesData }] = useQuery<
    InstructorCoursesQuery,
    InstructorCoursesQueryVariables
  >({
    query: InstructorCoursesDocument,
    variables: { limit: 100 },
  });

  const [, deleteLearningPath] = useMutation<
    DeleteLearningPathMutation,
    DeleteLearningPathMutationVariables
  >(DeleteLearningPathDocument);

  const learningPaths = data?.learningPaths ?? [];
  const isLoading = fetching;

  const allCourses =
    coursesData?.instructorCourses?.course?.map((c) => ({
      id: c.id,
      title: c.title,
      featuredImage: c.featuredImage,
    })) ?? [];

  const handleCreate = () => {
    setEditingPath(null);
    setOpenFormSheet(true);
  };

  const handleEdit = (lp: LearningPath) => {
    setEditingPath(lp);
    setOpenFormSheet(true);
  };

  const handleDelete = async () => {
    if (!deletingPath) return;

    const result = await deleteLearningPath({
      learningPathId: deletingPath.id,
    });

    if (result.error) {
      toast.error("Error al eliminar el learning path");
    } else {
      toast.success("Learning path eliminado correctamente");
      reexecuteQuery({ requestPolicy: "network-only" });
    }

    setDeletingPath(null);
  };

  const handleFormSuccess = () => {
    reexecuteQuery({ requestPolicy: "network-only" });
  };

  const filteredLearningPaths = learningPaths.filter((item) => {
    if (!searchQuery) return true
    return item.name.toLowerCase().includes(searchQuery?.toLowerCase()); 
  }).sort((a, b) => {
      if (sortOrder === "a-z") {
        return a.name.localeCompare(b.name);
      }
      if (sortOrder === "z-a") {
        return b.name.localeCompare(a.name);
      }
      if (sortOrder === "newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (sortOrder === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });


  return (
    <>
      <PageBreadCrumbs items={[{ label: "Learning Paths" }]} />

      {!fetching && learningPaths.length === 0 ? (
        <CourseEmptyPage
          title="Sin learning paths creados aun"
          description="Crea tu primer learning path para iniciar."
          buttonLabel="Nuevo Learning Path"
          action={handleCreate}
        />
      ) : (
        <div className="flex flex-col items-start gap-8 h-full">
          <CoursesPageToolbar
            isLoading={false}
            ctaLabel="Nuevo Learning Path"
            ctaAction={handleCreate}
          />

          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {isLoading
              ? Array.from([1, 2, 3, 4], (index) => (
                  <CourseCardSkeleton key={index} />
                ))
              : filteredLearningPaths?.map((lp) => (
                  <LearningPathCard
                    key={lp.id}
                    learningPath={lp as LearningPath}
                    onEdit={handleEdit}
                    onDelete={setDeletingPath}
                  />
                ))}
          </div>
        </div>
      )}

      <LearningPathFormSheet
        open={openFormSheet}
        onOpenChange={setOpenFormSheet}
        learningPath={editingPath}
        courses={allCourses}
        onSuccess={handleFormSuccess}
      />

      <DeleteDialog
        open={!!deletingPath}
        onOpenChange={(open) => {
          if (!open) setDeletingPath(null);
        }}
        dialogTitle="Eliminar Learning Path"
        dialogDescription={`¿Estas seguro que deseas eliminar "${deletingPath?.name}"? Esta accion no se puede deshacer.`}
        actions={{
          cancelLabel: "Cancelar",
          confirmLabel: "Eliminar",
          onConfirm: handleDelete,
        }}
      />
    </>
  );
}
