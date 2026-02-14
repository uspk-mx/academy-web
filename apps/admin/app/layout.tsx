import type { ReactNode } from "react";
import { Outlet, redirect, useLoaderData } from "react-router";
import { Toaster } from "sonner";
import { AppSidebar } from "ui/components/app-sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "ui/components/sidebar";
import { FileUploaderProvider } from "ui/context/file-uploader-context";
import { requireRole } from "ui/lib/auth";
import { getCookie } from "ui/lib/cookies";
import type { Route } from "./+types/layout";
import { sidebarConfig } from "ui/components/admin";

export async function loader({ request }: Route.LoaderArgs) {
  const [cookies, sessionToken] = getCookie(request, "session_token");

  if (!sessionToken) {
    return redirect("/login");
  }

  const me = await requireRole(sessionToken, process.env.VITE_API_TARGET!, ["admin"]);
  const sidebarState = cookies?.["sidebar:state"] === "true";

  return {
    sidebarState,
    me,
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  const { sidebarState, me } = useLoaderData<typeof loader>();

  return (
    <>
      <SidebarProvider defaultOpen={sidebarState}>
        <AppSidebar
          userData={{ ...me, id: me.customerId } as any}
          selectorLabel="Admin Panel"
          mainNavTree={sidebarConfig.navMain ?? { title: "", items: [] }}
          secondaryNavTree={
            sidebarConfig.navSecondary ?? { title: "", items: [] }
          }
        />
        <SidebarInset>
          <FileUploaderProvider>
            <div className="flex flex-col flex-1 gap-4 p-4 px-8 pt-0">
              {children}
              <Outlet />
            </div>
          </FileUploaderProvider>
        </SidebarInset>
      </SidebarProvider>
      <Toaster richColors />
    </>
  );
}
