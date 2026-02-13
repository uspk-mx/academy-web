import { InstructorBundlesDocument } from "gql-generated/generated/bff.sdk";
import type {
  CourseBundle,
  InstructorBundlesQuery,
  InstructorBundlesQueryVariables,
  PageInfo,
} from "gql-generated/generated/types";
import { CourseBundleCard } from "ui/components/admin/courses/course-bundle-card";
import { CourseCardSkeleton } from "ui/components/admin/courses/course-card-skeleton";
import { PageBreadCrumbs } from "ui/components/admin/page-breadcrumbs";
import { redirect, useNavigate, useSearchParams } from "react-router";
import { useQuery } from "urql";
import { CourseEmptyPage } from "ui/components/courses/course-empty-page";
import { CoursesPageToolbar } from "ui/components/courses/course-page-toolbar";
import { CoursePagination } from "ui/components/courses/course-pagination";
import type { Route } from "./+types/bundles";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bundles" },
    { name: "description", content: "Bundles de USPK Academy!" },
  ];
}
const sortByMap: Record<string, Record<string, string>> = {
  newest: { sortBy: "created_at", sortOrder: "DESC" },
  oldest: { sortBy: "created_at", sortOrder: "ASC" },
  "a-z": { sortBy: "title", sortOrder: "ASC" },
  "z-a": { sortBy: "title", sortOrder: "DESC" },
};

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

export default function Bundles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || undefined;
  const sort = searchParams.get("sort") || "newest";
  const pageSize = Number(searchParams.get("pageSize") || 10);
  const pageIndex = Number(searchParams.get("page") || 1);
  const navigate = useNavigate();

  const { sortBy, sortOrder } = sortByMap[sort];

  const [{ data, fetching }] = useQuery<
    InstructorBundlesQuery,
    InstructorBundlesQueryVariables
  >({
    query: InstructorBundlesDocument,
    variables: {
      search: searchQuery,
      sortBy,
      sortOrder,
      page: pageIndex,
      limit: pageSize,
    },
  });

  const courseBundles = data?.instructorBundles.bundle || [];
  const isInitialLoading = fetching && !searchQuery;
  const showNoResults = !fetching && searchQuery && courseBundles.length === 0;

  return (
    <>
      <PageBreadCrumbs items={[{ label: "Bundles" }]} />
      {!fetching && courseBundles.length === 0 && !searchQuery ? (
        <CourseEmptyPage
          title="Sin bundles creados aun"
          description="Crea tu primer bundles para iniciar."
          buttonLabel="Nuevo bundles"
          action={() => navigate("/bundles/create")}
        />
      ) : (
        <div className="flex flex-col items-start gap-8 h-full">
          <CoursesPageToolbar
            isLoading={fetching && !!searchQuery}
            ctaLabel="Nuevo Bundle"
            ctaHref="/bundles/create"
            ctaStatus="disabled"
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
              courseBundles.map((bundle) => (
                <CourseBundleCard
                  key={bundle.id}
                  courseBundle={bundle as CourseBundle}
                />
              ))
            )}
          </div>

          {data?.instructorBundles?.totalCount &&
          data?.instructorBundles?.totalCount > 9 ? (
            <CoursePagination
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              totalCount={data?.instructorBundles.totalCount || 0}
              pageInfo={data?.instructorBundles.pageInfo as PageInfo}
            />
          ) : null}
        </div>
      )}
    </>
  );
}
