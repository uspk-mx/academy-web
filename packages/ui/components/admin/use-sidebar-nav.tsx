import { isCSR } from "ui/lib/guards";
import { sidebarConfig } from "./sidebar-config";
import type { NavItem, SidebarConfig, UserNav } from "./types";
import { useQuery } from "urql";
import { MeDocument } from "gql-generated/gql/graphql";
import type { MeQuery, MeQueryVariables } from "gql-generated/generated/types";

interface UseSidebarNavReturn extends SidebarConfig {
  user: UserNav;
}

export function useSidebarNav(): UseSidebarNavReturn {
  const pathname = isCSR(globalThis) ? location.pathname : null;
  const [{ data }] = useQuery<MeQuery, MeQueryVariables>({ query: MeDocument })

  // Helper function to check if a path is active
  const isActivePath = (path: string): boolean => {
    if (path === "#") return false;
    return pathname?.startsWith(path) ?? false;
  };

  // Recursively set active states based on current path
  const setActiveStates = (items: NavItem[]): NavItem[] => {
    return items.map((item) => ({
      ...item,
      isActive: isActivePath(item.url || ""),
      items: item.items ? setActiveStates(item.items) : undefined,
    }));
  };

  // Apply active states to the config
  const processedConfig: SidebarConfig = {
    ...sidebarConfig,
    navMain: {
      ...sidebarConfig.navMain,
      items: setActiveStates(sidebarConfig.navMain.items),
    },
    businessNav: {
      ...sidebarConfig.businessNav,
      items: setActiveStates(sidebarConfig.businessNav?.items || []),
    } as any,
  };

  // This could come from your auth context or API
  const userNav: UserNav = {
    name: data?.me?.fullName ?? "user",
    email: data?.me?.email ?? "",
    avatar: data?.me?.profilePicture ?? "",
    navItems: []
  };

  return {
    user: userNav,
    ...processedConfig,
  };
}
