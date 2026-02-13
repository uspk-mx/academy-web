import { parse } from "cookie";
import type { ReactNode } from "react";
import { Outlet, redirect } from "react-router";
import { Toaster } from "sonner";
import { CustomerContextProvider } from "ui/context";
import type { Route } from "./+types/layout";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookies = parse(cookieHeader);
  const sessionToken = cookies.session_token;

  if (!sessionToken) {
    return redirect("/login");
  }

  return { authenticated: true };
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <CustomerContextProvider>
        {children}
        <Outlet />
      </CustomerContextProvider>
      <Toaster richColors />
    </>
  );
}
