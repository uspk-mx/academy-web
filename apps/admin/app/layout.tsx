import { MeDocument } from "gql-generated/generated/bff.sdk";
import type {
  MeQuery,
  MeQueryVariables
} from "gql-generated/generated/types";
import { useEffect, type ReactNode } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router";
import { Toaster } from "sonner";
import { AppSidebar } from "ui/components/app-sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "ui/components/sidebar";
import { FileUploaderProvider } from "ui/context/file-uploader-context";
import { shouldRedirectBasedOnDifferentRole } from "ui/lib/auth";
import { getCookie } from "ui/lib/cookies";
import { useQuery } from "urql";
import type { Route } from "./+types/layout";
import { sidebarConfig } from "ui/components/admin";

export async function loader({ request }: Route.LoaderArgs) {
  const [cookies, sessionToken] = getCookie(request, "session_token");

  if (!sessionToken) {
    return redirect("/login");
  }

  const sidebarState = cookies?.["sidebar:state"] === "true";

  return {
    sidebarState,
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  const { sidebarState } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [{ data }] = useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
    requestPolicy: "cache-and-network",
  });

  useEffect(() => {
    const redirectPath = shouldRedirectBasedOnDifferentRole(
      data?.me?.role,
      "admin"
    );

    if (redirectPath) {
      navigate(redirectPath);
    }
  }, [data?.me?.role, navigate]);

  return (
    <>
      <SidebarProvider defaultOpen={sidebarState}>
        <AppSidebar
          userData={{ ...data?.me, id: data?.me?.customerId as string } as any}
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
