import { ChevronDown, ClockIcon } from "lucide-react";
import { Button } from "ui/components//button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui/components/dropdown-menu";
import { SidebarTrigger } from "ui/components//sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "ui/components//avatar";
import { getInitials } from "ui/lib/utils";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { ThemeToggle } from "../theme/theme-toggle";

export interface UserMenuProps {
  userData: {
    fullName: string;
    avatarUrl: string;
  };
  menuItems: {
    label: string;
    icon?: ReactNode;
    href?: string;
    onClick?: () => void;
    closeOnClick?: boolean;
  }[];
}

export interface CourseViewerHeaderProps {
  moduleTitle: string;
  moduleDuration?: string;
  userMenuData: UserMenuProps;
}

export function CourseViewerHeader({
  moduleTitle,
  moduleDuration,
  userMenuData,
}: CourseViewerHeaderProps) {
  return (
    <header className="flex h-16 items-center w-full max-w-full gap-2 justify-between px-4 sticky top-0 bg-background z-10 overflow-x-hidden">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <SidebarTrigger className="-ml-1 shrink-0" />
        <span className="truncate">{moduleTitle}</span>
        {moduleDuration && (
          <div className="hidden shrink-0 lg:flex items-center gap-1">
            <ClockIcon className="size-4" />
            {moduleDuration}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      <UserMenu {...userMenuData} />
      </div>
    </header>
  );
}

function UserMenu({ userData, menuItems }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="shrink-0">
        <Button variant="ghost" size="lg" className="px-0 pr-3 rounded-full">
          <Avatar className="shrink-0 dark:border dark:border-white">
            <AvatarImage alt={userData.fullName} src={userData.avatarUrl} />
            <AvatarFallback>{getInitials(userData.fullName)}</AvatarFallback>
          </Avatar>
          <span className="hidden truncate sm:inline max-w-40">
            {userData.fullName}
          </span>
          <ChevronDown className="size-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {menuItems.map((item, index) => (
          <DropdownMenuItem key={index} onClick={item.onClick} className="dark:text-black" asChild>
            {item.href?.includes("https") ? (
              <a href={item.href} target="__blank" rel="noopener noreferrer">
                {item.icon && <span>{item.icon}</span>}
                {item.label}
              </a>
            ) : (
              <Link to={item.href ?? ""}>
                {item.icon && <span>{item.icon}</span>}
                {item.label}
              </Link>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
