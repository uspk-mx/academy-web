import { Outlet, redirect, useParams } from "react-router";
import { CustomerContextProvider } from "ui/context";
import {
  ProgressProvider,
  TotalItemsSetter,
} from "ui/context/progress-context";
import { getCookie } from "ui/lib/cookies";
import type { Route } from "./+types/layout";

export async function loader({ request, params }: Route.LoaderArgs) {
  const [, sessionToken] = getCookie(request, "session_token");

  if (!sessionToken) {
    return redirect("/login");
  }

  return { authenticated: true };
}

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cid } = useParams();

  const courseId = cid || "";
  return (
    <CustomerContextProvider>
      <ProgressProvider courseId={courseId}>
        <TotalItemsSetter courseId={courseId} />
        {children}
        <Outlet />
      </ProgressProvider>
    </CustomerContextProvider>
  );
}
