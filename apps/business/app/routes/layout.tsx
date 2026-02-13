import { useEffect, type ReactNode } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router";
import { Toaster } from "sonner";
import { AppSidebar } from "ui/components/app-sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "ui/components/sidebar";
import type {
  MeQuery,
  MeQueryVariables,
  User,
} from "gql-generated/generated/types";
import { getCookie } from "ui/lib/cookies";
import type { Route } from "./+types/layout";
import { shouldRedirectBasedOnDifferentRole } from "ui/lib/auth";
import { useQuery } from "urql";
import { MeDocument } from "gql-generated/gql/graphql";
import { sidebarConfig } from "ui/components/admin";

// const stripe = loadStripe(import.meta.env.STRIPE_KEY || "", {
//   betas: ["custom_checkout_beta_5"],
//   locale: "es",
// });

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

export default function BusinessLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [{ data }] = useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
    requestPolicy: "cache-and-network",
  });

  useEffect(() => {
    const redirectPath = shouldRedirectBasedOnDifferentRole(
      data?.me?.role,
      "business",
    );

    if (redirectPath) {
      navigate(redirectPath);
    }
  }, [data?.me?.role, navigate]);

  return (
    <>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar
          userData={{ ...data?.me, id: data?.me?.customerId as string } as any}
          selectorLabel={data?.me?.company?.name || "Select Company"}
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
