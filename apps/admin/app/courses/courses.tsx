import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { useMutation, useQuery } from "urql";
import { CourseCard } from "ui/components/admin/courses/course-card";
import { CourseCardSkeleton } from "ui/components/admin/courses/course-card-skeleton";
import { DeleteResourceDialog } from "ui/components/admin/delete-resource-modal";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import { CourseEmptyPage } from "ui/components/courses/course-empty-page";
import { CoursesPageToolbar } from "ui/components/courses/course-page-toolbar";
import { CoursePagination } from "ui/components/courses/course-pagination";
import {
  DeleteCourseDocument,
  InstructorCoursesDocument,
} from "gql-generated/generated/bff.sdk";
import type {
  Course,
  DeleteCourseMutation,
  DeleteCourseMutationVariables,
  InstructorCoursesQuery,
  InstructorCoursesQueryVariables,
  PageInfo,
} from "gql-generated/generated/types";
import type { Route } from "../+types/root";

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Uspk Academy | Courses" },
    { name: "description", content: "Cursos de USPK Academy!" },
  ];
}

const sortByMap: Record<string, Record<string, string>> = {
  newest: { sortBy: "created_at", sortOrder: "DESC" },
  oldest: { sortBy: "created_at", sortOrder: "ASC" },
  "a-z": { sortBy: "title", sortOrder: "ASC" },
  "z-a": { sortBy: "title", sortOrder: "DESC" },
  published: { sortBy: "status", sortOrder: "ASC" },
  draft: { sortBy: "status", sortOrder: "DESC" },
};

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("q") || undefined;
  const sort = searchParams.get("sort") || "newest";
  const pageSize = Number(searchParams.get("pageSize") || 10);
  const pageIndex = Number(searchParams.get("page") || 1);
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [hasQueried, setHasQueried] = useState(false);
  const [, onDeleteCourseMutation] = useMutation<
    DeleteCourseMutation,
    DeleteCourseMutationVariables
  >(DeleteCourseDocument);
  const [isDeleting, setIsDeleting] = useState(false);

  const { sortBy, sortOrder } = sortByMap[sort];

  const queryVariables = useMemo(
    () => ({
      search: searchQuery,
      sortBy,
      sortOrder,
      page: pageIndex,
      limit: pageSize,
    }),
    [searchQuery, sortBy, sortOrder, pageIndex, pageSize]
  );

  const [{ data, fetching }, reexecuteQuery] = useQuery<
    InstructorCoursesQuery,
    InstructorCoursesQueryVariables
  >({
    query: InstructorCoursesDocument,
    variables: queryVariables,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    reexecuteQuery({ requestPolicy: "network-only" });
  }, [searchParams, reexecuteQuery]);

  const [courses, setCourses] = useState(data?.instructorCourses.course || []);

  useEffect(() => {
    if (data) {
      setCourses(data?.instructorCourses.course || []);
    }
  }, [data]);

  useEffect(() => {
    if (!hasQueried && !fetching) {
      setHasQueried(true);
    }
  }, [hasQueried, fetching]);

  const isInitialLoading = fetching && !searchQuery;
  const showNoResults = !fetching && searchQuery && courses?.length === 0;

  const handleDeleteCourse = async () => {
    try {
      setIsDeleting(true);
      const response = await onDeleteCourseMutation({
        courseId: selectedCourse?.id || "",
      });
      if (response.error?.message) {
        toast.error("Error al eliminar el curso", {
          description: "No se pudo eliminar el curso, intenta de nuevo.",
        });
        console.error("Error al eliminar el curso: ", response.error.message);
        setIsDeleting(false);
      }

      toast.success("Curso eliminado", {
        description: "El curso ha sido eliminado exitosamente.",
      });
      setCourses(
        (
          prevCourses: InstructorCoursesQuery["instructorCourses"]["course"]
        ) => {
          return prevCourses?.filter(
            (course) => course.id !== selectedCourse?.id
          );
        }
      );
      setOpenDeleteDialog(false);
      setIsDeleting(false);
    } catch (error) {
      console.error("Error al eliminar el curso: ", error);
      toast.error("Error al eliminar el curso", {
        description: "No se pudo eliminar el curso, intenta de nuevo.",
      });
    }
  };

  return (
    <>
      <PageBreadCrumbs items={[{ label: "Cursos" }]} />
      {!fetching && courses?.length === 0 && !searchQuery ? (
        <CourseEmptyPage
          title="Sin cursos creados aun"
          description="Crea tu primer curso para iniciar."
          buttonLabel="Nuevo curso"
          action={() => navigate("/courses/create")}
        />
      ) : (
        <div className="flex flex-col items-start gap-8 h-full">
          <CoursesPageToolbar
            isLoading={fetching && !!searchQuery}
            hasPublishFilters
            ctaLabel="Nuevo Curso"
            ctaHref="/courses/create"
          />

          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {isInitialLoading ? (
              Array.from([1, 2, 3, 4, 5, 6, 7, 8], (index) => (
                <CourseCardSkeleton key={index} />
              ))
            ) : showNoResults ? (
              <div className="col-span-full text-center py-8">
                <p className="text-lg text-gray-500">
                  No se encontraron cursos que coincidan con tu búsqueda
                </p>
              </div>
            ) : (
              courses?.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course as Course}
                  actionsMenu={[
                    {
                      label: "Ver detalles",
                      href: `/courses/${course.id}/builder`,
                    },
                    {
                      label: "Editar",
                      href: `/courses/${course.id}/builder`,
                    },
                    {
                      label: "Eliminar",
                      className:
                        "text-destructive hover:!text-destructive hover:!bg-destructive/20",
                      onClick: () => {
                        setSelectedCourse(course as Course);
                        setOpenDeleteDialog(true);
                      },
                    },
                  ]}
                />
              ))
            )}
          </div>

          <DeleteResourceDialog
            open={openDeleteDialog}
            onOpenChange={setOpenDeleteDialog}
            resourceType="Curso"
            resourceName={selectedCourse?.title as string}
            onDelete={handleDeleteCourse}
            isLoading={isDeleting}
          />

          {data?.instructorCourses?.totalCount &&
          data?.instructorCourses?.totalCount > 9 ? (
            <CoursePagination
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              totalCount={data?.instructorCourses.totalCount || 0}
              pageInfo={data?.instructorCourses.pageInfo as PageInfo}
            />
          ) : null}
        </div>
      )}
    </>
  );
}
