import type {
  LogoutMutation,
  LogoutMutationVariables,
} from "gql-generated/generated/types";
import {
  LogoutDocument,
  type Company,
  type MeQuery,
} from "gql-generated/gql/graphql";
import {
  Bell,
  BookOpen,
  ChevronDown,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  ShoppingCart,
  SmileIcon,
  User,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "ui/components/avatar";
import { Badge } from "ui/components/badge";
import { Button } from "ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "ui/components/dropdown-menu";
import { useMutation } from "urql";
import { CommandMenu, useCommandMenu } from "./command-menu";
import { Skeleton } from "../skeleton";
import { useMemo } from "react";
import { logos } from "ui/lib/config/site";

interface UserData {
  fullName: string | null;
  email: string | null;
  profilePicture: string | null;
  userName: string | null;
  company: Company | null;
}

export const Header = ({
  userData,
  isLoading,
}: {
  userData: MeQuery["me"] | null;
  isLoading?: boolean;
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [, onLogoutMutation] = useMutation<
    LogoutMutation,
    LogoutMutationVariables
  >(LogoutDocument);

  const isBusinessUser = Boolean(userData?.company?.id);
  const unreadNotifications = 3; // Example static number
  const cartItems = 2; // Example static number
  const commandMenu = useCommandMenu();

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

  return (
    <>
      <header className="sticky top-0 z-50 border-b-4 border-black bg-card shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 p-4">
          {/* Logo */}
          <Link to="/" className="shrink-0 hover:rotate-2 transition-transform">
            <img
              src={logos.full}
              alt="Logo"
              className="h-9"
            />
          </Link>

          <button
            onClick={commandMenu.open}
            className="hidden max-w-xl flex-1 md:block"
          >
            <div className="group relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-hover:text-foreground" />
              <div className="w-full cursor-pointer rounded-xl border-4 border-black bg-card py-2.5 pl-12 pr-4 text-left font-bold text-muted-foreground transition-all hover:border-main hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none">
                Buscar cursos, instructores...
              </div>
              <kbd className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded border-2 border-black bg-muted px-2 py-1 text-xs font-black lg:inline-block">
                ⌘K
              </kbd>
            </div>
          </button>

          <nav className="hidden items-center gap-6 md:flex">
            <BusinessNavSkeleton isLoading={isLoading && !isBusinessUser} length={2} /> 
            {isBusinessUser ? (
              // Business User Nav
              <>
                <Link
                  to="/"
                  className={`font-bold transition-colors hover:text-main ${
                    pathname === "/"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/team"
                  className={`font-bold transition-colors hover:text-main ${
                    pathname === "/team"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  Mi Equipo
                </Link>
                <Link
                  to="/courses"
                  className={`font-bold transition-colors hover:text-main ${
                    pathname === "/courses"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  Cursos Asignados
                </Link>
                <Link
                  to="/reports"
                  className={`font-bold transition-colors hover:text-main ${
                    pathname === "/reports"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  Reportes
                </Link>
              </>
            ) : (
              // Regular User Nav
              <>
                <Link
                  to="/courses"
                  className={`font-bold transition-colors hover:text-main ${
                    pathname === "/courses"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  Mis Cursos
                </Link>
                <Link
                  to="/explore"
                  className={`font-bold transition-colors hover:text-main ${
                    pathname === "/explore"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  Explorar
                </Link>
              </>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Search - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={commandMenu.open}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart - Only for Regular Users */}
            {!isBusinessUser && (
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems > 0 && (
                    <Badge className="absolute -right-1 -top-1 flex items-center justify-center h-5 min-w-5 rounded-full border-2 border-black bg-destructive p-0 text-xs font-black">
                      {cartItems}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -right-1 -top-1 flex items-center justify-center h-5 min-w-5 rounded-full border-2 border-black bg-chart-1 p-0 text-xs font-black">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="text-lg font-black">
                  Notificaciones
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-y-auto">
                  {/* Mock notifications */}
                  <DropdownMenuItem className="flex flex-col items-start gap-2 p-4">
                    <div className="flex w-full items-start justify-between">
                      <p className="font-bold">Nuevo curso disponible</p>
                      <span className="text-xs text-muted-foreground">2h</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Advanced React Patterns" ya está disponible en tu
                      biblioteca
                    </p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-2 p-4">
                    <div className="flex w-full items-start justify-between">
                      <p className="font-bold">Clase programada</p>
                      <span className="text-xs text-muted-foreground">1d</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Tu clase con Sarah Johnson es mañana a las 10:00 AM
                    </p>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-auto gap-2 p-0 hover:bg-transparent"
                >
                  <Avatar>
                    <AvatarImage
                      className="object-cover"
                      src={userData?.profilePicture ?? ""}
                      alt="Profile image"
                    />
                    <AvatarFallback>
                      <SmileIcon className="fill-main size-full!" />
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="hidden h-4 w-4 md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-black">
                    {userData?.fullName}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {userData?.email}
                  </span>
                  {isBusinessUser && (
                    <Badge className="mt-2 w-fit border-2 border-black bg-chart-1">
                      Business
                    </Badge>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="/">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User className="h-4 w-4" />
                      <span>Mi Perfil</span>
                    </Link>
                  </DropdownMenuItem>
                  {!isBusinessUser && (
                    <DropdownMenuItem asChild>
                      <Link to="/wishlist">
                        <BookOpen className="h-4 w-4" />
                        <span>Lista de Deseos</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <Settings className="h-4 w-4" />
                      <span>Configuración</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a
                    href="https://uspk.com.mx/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span>Ayuda</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <CommandMenu isOpen={commandMenu.isOpen} onClose={commandMenu.close} />
    </>
  );
};

function BusinessNavSkeleton({
  isLoading,
  length = 4,
}: {
  isLoading?: boolean;
  length?: number;
}) {
  if (!isLoading) return null;
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <Skeleton key={index} className="h-5 w-40 rounded bg-muted" />
      ))}
    </>
  );
}
