import type { ReactNode } from "react";
import { Outlet, redirect } from "react-router";
import { Toaster } from "sonner";
import { DashboardLayout } from "ui/components/dashboard/layout";
import { CustomerContextProvider } from "ui/context";
import { getCookie } from "ui/lib/cookies";
import type { Route } from "./+types/layout";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const [, sessionToken] = getCookie(request, "session_token");

  if (!sessionToken) {
    // Redirect to login if session token is missing
    return redirect("/login");
  }

  return { authenticated: true };
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <CustomerContextProvider>
        <DashboardLayout>
          {children}
          <Outlet />
        </DashboardLayout>
      </CustomerContextProvider>
      <Toaster richColors />
    </>
  );
}
