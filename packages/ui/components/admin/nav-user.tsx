import { ChevronsUpDown, LogOut } from "lucide-react";
import type { ReactElement } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "ui/components/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "ui/components/sidebar";
import type { UserNav } from "./types";
import { Link } from "react-router";
import { Button } from "ui/components/button";
import { Skeleton } from "ui/components/skeleton";
import { getInitials } from "ui/lib/utils";

export function NavUser({
  user,
  isLoading,
}: {
  user: UserNav;
  isLoading?: boolean;
}): ReactElement {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="bg-background data-[state=open]:bg-sidebar-accent ring-1 ring-[#FFDC58] data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              <Avatar className="rounded-lg w-8 h-8">
                <AvatarImage
                  className="object-cover"
                  alt={user.name}
                  src={user.avatar}
                />
                <AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 grid text-left text-sm leading-tight">
                {isLoading ? (
                  <Skeleton className="w-32 h-3 mb-1" />
                ) : (
                  <span className="font-semibold truncate">{user.name}</span>
                )}
                {isLoading ? (
                  <Skeleton className="w-36 h-3" />
                ) : (
                  <span className="text-xs truncate">{user.email}</span>
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-lg w-(--radix-dropdown-menu-trigger-width) min-w-56"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="rounded-lg w-8 h-8">
                  <AvatarImage
                    className="object-cover"
                    alt={user.name}
                    src={user.avatar}
                  />
                  <AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 grid text-left text-sm leading-tight">
                  <span className="font-semibold truncate">{user.name}</span>
                  <span className="text-xs truncate">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {user.navItems
                ? user.navItems.map((navItem) => (
                    <DropdownMenuItem key={navItem?.title} asChild>
                      {navItem?.url ? (
                        <Link to={navItem?.url || ""}>
                          {navItem?.icon ? <navItem.icon /> : null}
                          {navItem?.title}
                        </Link>
                      ) : (
                        <Button
                          variant="ghost"
                          className="w-full justify-start shadow-none! focus-visible:shadow-none focus-visible:ring-transparent focus-visible:outline-0 hover:translate-x-0"
                          onClick={navItem?.action}
                        >
                          {navItem?.icon ? <navItem.icon /> : null}
                          {navItem?.title}
                        </Button>
                      )}
                    </DropdownMenuItem>
                  ))
                : null}
            </DropdownMenuGroup>
            {user.logoutLabel && user.logoutAction && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={user.logoutAction}>
                  <LogOut />
                  {user.logoutLabel}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
