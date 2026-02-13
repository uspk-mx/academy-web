import { useQuery } from "urql";
import { AddEnrollmentDialog } from "ui/components/admin/enrollments/add-enrollment-dialog";
import { EnrollmentsTable } from "ui/components/admin/enrollments/enrollments-table";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import { CourseEmptyPage } from "ui/components/courses/course-empty-page";
import { Button } from "ui/components/button";
import {
  GetEnrollmentsDocument,
  GetUsersDocument,
  InstructorCoursesDocument,
} from "gql-generated/generated/bff.sdk";
import {
  CourseStatus,
  type GetEnrollmentsQuery,
  type GetUsersQuery,
  type InstructorCoursesQuery
} from "gql-generated/generated/types";
import { useToggleState } from "ui/hooks/use-toggle-state";
import type { Route } from "./+types/enrollments";

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Uspk Academy | Enrollments" },
    { name: "description", content: "Inscripciones de USPK Academy!" },
  ];
}

export default function EnrollmentsPage() {
  const [isAddEnrollmentDialogOpen, , , toggleAddEnrollmentDialog] =
    useToggleState(false);

  const [{ data }] = useQuery<GetUsersQuery>({ query: GetUsersDocument });
  const [{ data: coursesData }] = useQuery<InstructorCoursesQuery>({
    query: InstructorCoursesDocument,
  });
  const [{ data: enrollments }] = useQuery<GetEnrollmentsQuery>({
    query: GetEnrollmentsDocument,
  });

  const students = data?.getUsers
    ? data.getUsers
        .filter((user) => user?.role === "student")
        ?.map((student) => ({
          id: student?.id || "",
          email: student?.email || "",
          fullName: student?.fullName || "",
          profilePicture: student?.profilePicture || null,
        }))
    : [];

  const courses = coursesData?.instructorCourses?.course
    ?.filter((course) => course.status === CourseStatus.Published)
    ?.map((course) => ({
      id: course?.id,
      title: course?.title,
      description: course?.description,
      status: course?.status,
    }));

  return (
    <>
      <PageBreadCrumbs
        items={[
          { label: "Cursos", href: "courses" },
          { label: "Inscripciones" },
        ]}
      />

      {enrollments?.getEnrollments ? (
        <div className="flex flex-col gap-4 items-start">
          <Button
            type="button"
            variant="noShadow"
            className="justify-end"
            onClick={toggleAddEnrollmentDialog}
          >
            Inscribir alumno
          </Button>
          <EnrollmentsTable enrollments={enrollments.getEnrollments} />
        </div>
      ) : (
        <CourseEmptyPage
          title="Sin inscripciones aun"
          description="Aqui veras las inscripciones una ves que las haya."
          buttonLabel="Inscribir estudiante"
          action={toggleAddEnrollmentDialog}
        />
      )}
      <AddEnrollmentDialog
        open={isAddEnrollmentDialogOpen}
        onOpenChange={toggleAddEnrollmentDialog}
        students={students}
        courses={courses ? courses : []}
        // biome-ignore lint/complexity/noUselessFragments: <explanation>
        trigger={<></>}
      />
    </>
  );
}
