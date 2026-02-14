import type {
  LogoutMutation,
  LogoutMutationVariables,
} from "gql-generated/generated/types";
import { LogoutDocument, type MeQuery } from "gql-generated/gql/graphql";
import {
  Award,
  BarChart3,
  Bell,
  Book,
  Calendar,
  Heart,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingCart,
  SmileIcon,
  Star,
  UserIcon,
  Users,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { Skeleton } from "ui/components/skeleton";
import { useMutation } from "urql";
import { Badge } from "../badge";

export const Sidebar = ({
  userData,
  isLoading,
}: {
  userData: MeQuery["me"] | null;
  isLoading?: boolean;
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [, onLogoutMutation] = useMutation<
    LogoutMutation,
    LogoutMutationVariables
  >(LogoutDocument);

  const isCompanyUser = Boolean(userData?.company?.id);

  const handleLogout = async () => {
    try {
      const response = await onLogoutMutation({});
      if (response.error) {
        toast.error("Error al cerrar sesión");
        return;
      }
      if (response.data?.logout) {
        document.cookie =
          "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/login", { replace: true });
      }
    } catch (error) {
      toast.error("Problema al cerrar sesión");
      console.error(error);
    }
  };

  const renderImage = userData?.profilePicture ? (
    <img
      src={userData?.profilePicture ?? ""}
      alt="Profile"
      width={128}
      height={128}
      className="relative rounded-xl border-4 max-h-32 border-black object-cover size-full"
    />
  ) : (
    <div className="relative justify-center items-center flex h-full">
      <SmileIcon className="w-4/6 h-full max-h-32 fill-main" />
    </div>
  );

  return (
    <aside className="hidden max-h-fit rounded-xl border-4 border-black bg-card p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:block">
      <div className="mb-8 text-center">
        <div className="relative mx-auto mb-4 h-32 w-32">
          <div className="absolute inset-0 rotate-3 rounded-xl border-4 border-black bg-[#FF3D5A]" />
          {isLoading ? <Skeleton className="h-32 w-32" /> : renderImage}
        </div>
        {isLoading ? (
          <>
            <Skeleton className="mx-auto mt-2 h-6 w-40" />
            <Skeleton className="mx-auto mt-2 h-4 w-24" />
          </>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="mt-2 text-xl font-black">{userData?.fullName}</h2>
            <span className="text-sm text-muted-foreground">
              @{userData?.userName}
            </span>
            {isCompanyUser && (
              <Badge className="mt-2 border-2 border-black bg-chart-1">
                Business Account
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {getNavMenuItems?.(pathname, isCompanyUser)
          ?.filter((item) => item.showInSidebar !== false)
          .map((item) => (
            <Link
              key={item.label}
              to={item.href ?? "#"}
              className={`group flex items-center gap-3 rounded-lg border-2 border-black px-4 py-2.5 font-bold transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                item.active
                  ? "bg-black text-white hover:bg-black"
                  : "hover:bg-main"
              }`}
              onClick={
                item.label === "Cerrar Sesión" ? handleLogout : undefined
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <Badge className="border-2 border-black bg-chart-1">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
      </nav>
    </aside>
  );
};

// Shared navigation items function with business logic
export function getNavMenuItems(pathname: string, isBusinessUser?: boolean) {
  if (isBusinessUser) {
    // Business User Menu
    return [
      {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: "/",
        active: pathname === "/",
        showInSidebar: true,
      },
      {
        icon: Users,
        label: "Mi Equipo",
        href: "/team",
        active: pathname === "/team",
        showInSidebar: true,
      },
      {
        icon: Book,
        label: "Cursos Asignados",
        href: "/courses",
        active: pathname === "/courses",
        showInSidebar: true,
      },
      {
        icon: BarChart3,
        label: "Reportes",
        href: "/reports",
        active: pathname === "/reports",
        showInSidebar: true,
      },
      {
        icon: Star,
        label: "Reseñas",
        href: "/reviews",
        active: pathname === "/reviews",
        showInSidebar: true,
      },
      {
        icon: Award,
        label: "Certificados",
        href: "/certificates",
        active: pathname === "/certificates",
        showInSidebar: true,
      },
      {
        icon: Settings,
        label: "Configuración",
        href: "/profile",
        active: pathname === "/profile",
        showInSidebar: true,
      },
      {
        icon: LogOut,
        label: "Cerrar Sesión",
        showInSidebar: true,
      },
    ];
  }

  // Regular User Menu
  return [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/",
      active: pathname === "/",
      showInSidebar: true,
    },
    {
      icon: UserIcon,
      label: "Mi Perfil",
      href: "/profile",
      active: pathname === "/profile",
      showInSidebar: true,
    },
    {
      icon: Book,
      label: "Mis Cursos",
      href: "/courses",
      active: pathname === "/courses",
      showInSidebar: true,
    },
    {
      icon: Heart,
      label: "Lista de Deseos",
      href: "/wishlist",
      active: pathname === "/wishlist",
      showInSidebar: true,
    },
    {
      icon: Star,
      label: "Reseñas",
      href: "/reviews",
      active: pathname === "/reviews",
      showInSidebar: true,
    },
    {
      icon: HelpCircle,
      label: "Intentos de Quizzes",
      href: "/quiz-attempts",
      active: pathname === "/quiz-attempts",
      showInSidebar: true,
    },
    {
      icon: ShoppingCart,
      label: "Historial de Órdenes",
      href: "/order-history",
      active: pathname === "/order-history",
      showInSidebar: true,
    },
    {
      icon: Calendar,
      label: "Calendario",
      href: "/calendar",
      active: pathname === "/calendar",
      showInSidebar: true,
      badge: "Nuevo",
    },
    {
      icon: Bell,
      label: "Notificaciones",
      href: "/notifications",
      active: pathname === "/notifications",
      showInSidebar: false, // Only in header
    },
    {
      icon: Settings,
      label: "Configuración",
      href: "/settings",
      active: pathname === "/settings",
      showInSidebar: true,
    },
    {
      icon: LogOut,
      label: "Cerrar Sesión",
      showInSidebar: true,
    },
  ];
}
