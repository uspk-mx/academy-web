import type { ReactNode } from "react";
import { Outlet, redirect } from "react-router";

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

export default function CreateCourseLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-auto flex-col">
      <div className="relative box-border flex min-h-screen flex-col">
        {children}
        <Outlet />
      </div>
    </div>
  );
}
