import type { MeQuery } from "gql-generated/generated/types";
import { LogoutDocument, type LogoutMutation, type LogoutMutationVariables } from "gql-generated/gql/graphql";
import {
  Book,
  LayoutDashboard,
  UserIcon,
  Users
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useToggleState } from "ui/hooks/use-toggle-state";
import { useMutation } from "urql";
import { Badge } from "../badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../sheet";
import { getNavMenuItems } from "./sidebar";

export const MobileNav = ({ userData }: { userData: MeQuery["me"] | null }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, onOpenChange, onCloseNav] = useToggleState(false);

  const [, onLogoutMutation] = useMutation<
    LogoutMutation,
    LogoutMutationVariables
  >(LogoutDocument);

  const isBusinessUser = Boolean(userData?.company?.id);

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

  const primaryNavItems = isBusinessUser
    ? [
        {
          icon: LayoutDashboard,
          label: "Dashboard",
          href: "/",
          active: pathname === "/",
        },
        {
          icon: Users,
          label: "Mi Equipo",
          href: "/team",
          active: pathname === "/team",
        },
        {
          icon: Book,
          label: "Cursos",
          href: "/courses",
          active: pathname === "/courses",
        },
      ]
    : [
        {
          icon: LayoutDashboard,
          label: "Inicio",
          href: "/",
          active: pathname === "/",
        },
        {
          icon: Book,
          label: "Mis Cursos",
          href: "/courses",
          active: pathname === "/courses",
        },
        {
          icon: UserIcon,
          label: "Perfil",
          href: "/profile",
          active: pathname === "/profile",
        },
      ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 block border-t-4 border-black bg-card md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around p-2">
        {primaryNavItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
              item.active ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            <item.icon
              className={`h-6 w-6 ${item.active ? "fill-main" : ""}`}
            />
            <span className="text-xs font-bold">{item.label}</span>
          </Link>
        ))}

        {/* Menu Sheet */}
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="flex flex-col items-center gap-1 px-3 py-2 text-muted-foreground"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-current">
                <span className="text-xs font-black">☰</span>
              </div>
              <span className="text-xs font-bold">Menú</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80" onClose={onCloseNav}>
            <SheetHeader className="mb-6">
              <SheetTitle className="text-2xl font-black">Menú</SheetTitle>
            </SheetHeader>
            <nav className="space-y-2">
              {getNavMenuItems(pathname, isBusinessUser).map((item) => (
                <Link
                  key={item.label}
                  to={item.href ?? "#"}
                  className={`group flex items-center gap-3 rounded-lg border-2 border-black px-4 py-3 font-bold transition-all hover:bg-main ${
                    item.active ? "bg-black text-white" : ""
                  }`}
                  onClick={
                    item.label === "Cerrar Sesión"
                      ? () => {
                          onCloseNav();
                          handleLogout();
                        }
                      : onCloseNav
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge className="border-2 border-black bg-chart-1">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

// function getNavMenuItems(pathname: string) {
//   return [
//     {
//       icon: LayoutDashboard,
//       label: "Dashboard",
//       href: "/dashboard",
//       active: pathname === "/dashboard",
//     },
//     {
//       icon: User,
//       label: "Mi Perfil",
//       href: "/dashboard/profile",
//       active: pathname === "/dashboard/profile",
//     },
//     {
//       icon: Book,
//       label: "Mis Cursos",
//       href: "/dashboard/courses",
//       active: pathname === "/dashboard/courses",
//     },
//     {
//       icon: Heart,
//       label: "Lista de Deseos",
//       href: "/dashboard/wishlist",
//       active: pathname === "/dashboard/wishlist",
//     },
//     {
//       icon: Star,
//       label: "Reseñas",
//       href: "/dashboard/reviews",
//       active: pathname === "/dashboard/reviews",
//     },
//     {
//       icon: HelpCircle,
//       label: "Intentos de Quizzes",
//       href: "/dashboard/quiz-attempts",
//       active: pathname === "/dashboard/quiz-attempts",
//     },
//     {
//       icon: ShoppingCart,
//       label: "Historial de Ordenes",
//       href: "/dashboard/order-history",
//       active: pathname === "/dashboard/order-history",
//     },
//     {
//       icon: Calendar,
//       label: "Calendario",
//       href: "/dashboard/calendar",
//       active: pathname === "/dashboard/calendar",
//     },
//     { icon: LogOut, label: "Sign Out" },
//   ];
// }
