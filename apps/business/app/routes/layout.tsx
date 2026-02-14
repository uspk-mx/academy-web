import type { ReactNode } from "react";
import { Outlet, redirect, useLoaderData } from "react-router";
import { Toaster } from "sonner";
import { AppSidebar } from "ui/components/app-sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "ui/components/sidebar";
import { getCookie } from "ui/lib/cookies";
import type { Route } from "./+types/layout";
import { requireRole } from "ui/lib/auth";
import { sidebarConfig } from "ui/components/admin";

export async function loader({ request }: Route.LoaderArgs) {
  const [cookies, sessionToken] = getCookie(request, "session_token");

  if (!sessionToken) {
    return redirect("/login");
  }

  const me = await requireRole(sessionToken, process.env.VITE_API_TARGET!, ["business", "admin"]);
  const sidebarState = cookies?.["sidebar:state"] === "true";

  return {
    sidebarState,
    me,
  };
}

export default function BusinessLayout({ children }: { children: ReactNode }) {
  const { me } = useLoaderData<typeof loader>();

  return (
    <>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar
          userData={{ ...me, id: me.customerId } as any}
          selectorLabel={me.company?.name || "Select Company"}
          mainNavTree={sidebarConfig.businessNav ?? { title: "", items: [] }}
          secondaryNavTree={
            sidebarConfig.navSecondary ?? { title: "", items: [] }
          }
        />
        <SidebarInset>
          <div className="flex flex-col flex-1 gap-4 p-4 px-8 pt-0">
            {children}
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
      <Toaster richColors />
    </>
  );
}
