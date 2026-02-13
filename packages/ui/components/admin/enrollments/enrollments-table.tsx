import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "ui/components/table";
import type {
  Enrollment,
  EnrollmentStatus,
  GetEnrollmentsQuery,
} from "gql-generated/generated/types";
import { formatDate } from "ui/lib/utils";

const statusVariant: Record<EnrollmentStatus, string> = {
  ACTIVE: "bg-[#54CA95]/20 text-[#54CA95] border-[#54CA95]",
  COMPLETED: "bg-[#5E17EB]/20 text-[#5E17EB] border-[#5E17EB]",
  DROPPED: "bg-[#FF3D5A]/20 text-[#FF3D5A] border-[#FF3D5A]",
};

export const EnrollmentsTable = ({
  enrollments,
}: {
  enrollments: GetEnrollmentsQuery["getEnrollments"];
}) => {
  return (
    <Table className="bg-background">
      <TableCaption className="text-foreground">
        Lista de inscritos a los cursos.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Estudiante</TableHead>
          <TableHead>Curso</TableHead>
          <TableHead>Inscrito el</TableHead>
          <TableHead className="text-center">Estatus</TableHead>
          <TableHead className="text-center">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {enrollments?.map((enrollment) => (
          <TableRow key={enrollment.id}>
            <TableCell className="font-base">
              {enrollment.user.fullName}
            </TableCell>
            <TableCell>
              <p className="font-bold">{enrollment.course.title}</p>
              <p className="text-sm text-gray-600 line-clamp-1">
                {enrollment.course.description}
              </p>
            </TableCell>
            <TableCell>{formatDate(enrollment.enrolledAt)}</TableCell>
            <TableCell>
              {" "}
              <div className="flex justify-center">
                <span
                  className={`inline-flex rounded-full border-2 px-3 py-1 text-sm font-bold ${
                    statusVariant[enrollment.status] ||
                    "bg-gray-200 text-gray-700 border-gray-400"
                  }`}
                >
                  {enrollment.status.charAt(0).toUpperCase() +
                    enrollment.status.slice(1)}
                </span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    // handleEnrollmentClick(enrollment);
                  }}
                  className="rounded-lg border-2 border-black bg-[#5E17EB] px-4 py-1 font-bold text-white hover:bg-[#4c12c9]"
                >
                  Details
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
