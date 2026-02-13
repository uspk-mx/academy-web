import { isRouteErrorResponse, Outlet, useParams } from "react-router";

// import stylesheet from "ui/globals.css";
import { BuilderNav } from "ui/components/admin/courses/builder/builder-nav";
import { CurriculumProvider } from "ui/components/admin/courses/curriculum/curriculum-context";
import { BuilderProvider } from "ui/context/builder-context";
import { BuilderNavProvider } from "ui/context/builder-nav-context";
import { UpdateCourseDocument } from "gql-generated/generated/bff.sdk";
import type { Route } from "../+types/courses";
import { Toaster } from "sonner";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export default function CourseBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cid: courseId } = useParams();
  return (
    <BuilderProvider>
      <BuilderNavProvider
        courseId={courseId ?? ""}
        updateCourseMutation={UpdateCourseDocument}
      >
        <CurriculumProvider>
          <BuilderNav />
          <div className="flex flex-col flex-1 gap-4 p-8 pt-0">
            {children}
            <Outlet />
          </div>
          <Toaster richColors={true} />
        </CurriculumProvider>
      </BuilderNavProvider>
    </BuilderProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto p-4 pt-16 container">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="p-4 w-full overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
