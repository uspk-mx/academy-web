import confetti from "canvas-confetti";
import type { Certificate } from "gql-generated/generated/types";
import { useState } from "react";
import { redirect, useNavigate, useSearchParams } from "react-router";
import { CourseEmptyPage } from "ui/components/courses/course-empty-page";
import { CoursesPageToolbar } from "ui/components/courses/course-page-toolbar";

export const loader = async ({ request }: { request: Request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = Object.fromEntries(
    cookieHeader?.split("; ").map((cookie) => cookie.split("=")) || [],
  );

  const sessionToken = cookies["session_token"];

  if (!sessionToken) {
    // Redirect to login if session token is missing
    return redirect("/login");
  }

  return null;
};

// Confetti configuration
const confettiConfig = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
};

export default function TemplatesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("q") || undefined;
  const sort = searchParams.get("sort") || "newest";
  const pageSize = Number(searchParams.get("pageSize") || 10);
  const pageIndex = Number(searchParams.get("page") || 1);
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [hasQueried, setHasQueried] = useState(false);
  // const [, onDeleteCourseMutation] = useMutation<
  //   DeleteCourseMutation,
  //   DeleteCourseMutationVariables
  // >(DeleteCourseDocument);
  const [isDeleting, setIsDeleting] = useState(false);

  // const { sortBy, sortOrder } = sortByMap[sort];

  // const queryVariables = useMemo(
  //   () => ({
  //     search: searchQuery,
  //     sortBy,
  //     sortOrder,
  //     page: pageIndex,
  //     limit: pageSize,
  //   }),
  //   [searchQuery, sortBy, sortOrder, pageIndex, pageSize],
  // );

  // const [{ data, fetching }, reexecuteQuery] = useQuery<
  //   CertificateTemplatesQuery,
  //   CertificateTemplatesQueryVariables
  // >({
  //   query: InstructorCoursesDocument,
  //   variables: queryVariables,
  // });

  const createConfetti = () => {
    confetti(confettiConfig);
    // Add a second burst for more effect
    setTimeout(() => {
      confetti({
        ...confettiConfig,
        particleCount: 50,
        spread: 100,
        origin: { y: 0.7 },
      });
    }, 200);
  };

  return (
    <>
      <CourseEmptyPage
        title="Seccion en construccion"
        description="Pronto podras ver y administrar los certificados"
        buttonLabel="Muestra la sorpresa"
        action={createConfetti}
      />

      <div className="flex flex-col items-start gap-8 h-full">
        <CoursesPageToolbar
          // isLoading={fetching && !!searchQuery}
          hasPublishFilters
          ctaLabel="Nuevo Curso"
          ctaHref="/courses/create"
          isLoading={false}
        />
      </div>
    </>
  );
}
