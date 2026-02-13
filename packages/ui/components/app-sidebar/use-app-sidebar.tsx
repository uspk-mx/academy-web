import type {
  LogoutMutation,
  LogoutMutationVariables,
  User
} from "gql-generated/generated/types";
import { LogoutDocument } from "gql-generated/gql/graphql";
import { BadgeCheck, Bell, LockIcon } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { sidebarConfig } from "ui/components/admin/sidebar-config";
import type { NavItem, SidebarConfig, UserNav } from "ui/components/admin/types";
import { useMutation } from "urql";

export default function useAppSidebar({ userData }: { userData: User }) {
  const [openEditProfileDialog, setOpenEditProfileDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [, onLogoutMutation] = useMutation<
    LogoutMutation,
    LogoutMutationVariables
  >(LogoutDocument);

  const isActivePath = (path: string): boolean => {
    if (path === "#") return false;
    return pathname === path;
  };

  const setActiveStates = (items: NavItem[]): NavItem[] => {
    return items.map((item) => {
      const isActive = isActivePath(item.url || "");

      // Recursively check child items for active states
      const childItems = item.items ? setActiveStates(item.items) : undefined;

      return {
        ...item,
        isActive, // Only mark as active if the exact URL matches
        items: childItems,
      };
    });
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
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } as any,
  };

  const handleLogout = async () => {
    try {
      const response = await onLogoutMutation({});

      console.warn("response: ", response);
      if (response.error) {
        toast.error("Error al cerrar sesion");
        return;
        // biome-ignore lint/style/noUselessElse: <explanation>
      } else if (response.data?.logout) {
        // Clear the authentication cookie
        document.cookie =
          "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/login", { replace: true });
      }
    } catch (error) {
      toast.error("Problema al cerrar sesion", {
        description: "Por favor intenta de nuevo",
      });
      console.error(error);
    }
  };

  // This could come from your auth context or API
  const userNav: UserNav = {
    name: userData?.fullName ?? "user",
    email: userData?.email ?? "",
    avatar: userData?.profilePicture ?? "",
    navItems: [
      {
        title: "Cuenta",
        action: () => setOpenEditProfileDialog(true),
        icon: BadgeCheck,
      },
      {
        title: "Contraseña",
        url: "/account/change-password",
        icon: LockIcon,
      },
      {
        title: "Notifications",
        url: "/notifications",
        icon: Bell,
      },
    ],
    logoutLabel: "Cerrar sesion",
    logoutAction: handleLogout,
  };

  const businessUserNav: UserNav = {
    ...userNav,
    navItems: [
      {
        title: "Cuenta",
        action: () => setOpenEditProfileDialog(true),
        icon: BadgeCheck,
      },
      {
        title: "Contraseña",
        url: "/settings/change-password",
        icon: LockIcon,
      },
    ],
  };

  return {
    user: userNav,
    businessUserNav,
    isOpenEditProfileDialog: openEditProfileDialog,
    onOpenEditProfileDialog: setOpenEditProfileDialog,
    // userData:userData.me,
    // isLoadingUser: fetching,
    ...processedConfig,
  };
}
