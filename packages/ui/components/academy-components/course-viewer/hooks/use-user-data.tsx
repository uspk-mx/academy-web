import {
  HelpCircle,
  LayoutDashboard,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { useCustomerContextProvider } from "ui/context";

export const useUserData = ({ onLogout }: { onLogout: () => void }) => {
  const { customerData, fetching } = useCustomerContextProvider();
  const userMenuData = {
    menuItems: [
      {
        label: "Dashboard",
        href: "/",
        icon: <LayoutDashboard className="h-4 w-4" />,
      },
      {
        label: "Mi Perfil",
        href: "/profile",
        icon: <UserIcon className="h-4 w-4" />,
      },
      {
        label: "Ayuda",
        href: "https://uspk.com.mx/contact",
        icon: <HelpCircle className="h-4 w-4" />,
      },
      {
        label: "Cerrar sesion",
        icon: <LogOutIcon className="h-4 w-4" />,
        onClick: onLogout,
      },
    ],
    userData: {
      fullName: customerData?.fullName ?? "",
      avatarUrl: customerData?.profilePicture ?? "",
    },
  };

  return [{ customerData, fetching, userMenuData }, onLogout] as const;
};
