import { redirect, useLoaderData } from "react-router";
import { useQuery } from "urql";
import { Curriculum } from "ui/components/admin/courses/curriculum/curriculum";
import { PageLoader } from "ui/components/admin/page-loader";
import { CourseDocument } from "gql-generated/generated/bff.sdk";
import type {
  CourseQuery,
  CourseQueryVariables,
} from "gql-generated/generated/types";
import type { Route } from "./+types/curriculum-builder";
import { FileUploaderProvider } from "ui/context/file-uploader-context";
import { getCookie } from "ui/lib/cookies";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Uspk Academy | Curriculum Builder" },
    { name: "description", content: "Uspk Academy curriculum builder" },
  ];
}

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const [, sessionToken] = getCookie(request, "session_token");

  if (!sessionToken) {
    return redirect("/login");
  }

  return { courseId: params.cid, authenticated: true };
};

export default function CurriculumBuilder() {
  const { courseId } = useLoaderData<typeof loader>();
  const [{ data, fetching }] = useQuery<CourseQuery, CourseQueryVariables>({
    query: CourseDocument,
    variables: {
      courseId,
    },
  });

  if (fetching && !data?.course) return <PageLoader loadingLabel="Cargando" />;
  return (
    <FileUploaderProvider>
      <Curriculum
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        initialTopicsData={data?.course.topics as any}
        courseId={courseId || ""}
      />
    </FileUploaderProvider>
  );
}
