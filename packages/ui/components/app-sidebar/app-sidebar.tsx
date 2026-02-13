import type { User } from "gql-generated/generated/types";
import type * as React from "react";
import { Link } from "react-router";
import { NavMain } from "ui/components/admin/nav-main";
import { NavSecondary } from "ui/components/admin/nav-secondary";
import { NavUser } from "ui/components/admin/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "ui/components/sidebar";
import type { SidebarConfig } from "../admin";
import { EditProfileDialog } from "../admin/edit-profile-dialog";
import useAppSidebar from "./use-app-sidebar";

interface AppSidebarProps extends Omit<
  React.ComponentProps<typeof Sidebar>,
  "variant"
> {
  userData: User;
  secondaryNavTree: SidebarConfig["navSecondary"];
  mainNavTree: SidebarConfig["navMain"];
  toolsNavTree?: SidebarConfig["tools"];
  selectorLabel?: string;
}

export function AppSidebar({
  userData,
  secondaryNavTree,
  mainNavTree,
  selectorLabel,
  toolsNavTree,
  ...props
}: AppSidebarProps): React.ReactElement {
  const { user, isOpenEditProfileDialog, onOpenEditProfileDialog } =
    useAppSidebar({ userData });

  return (
    <Sidebar {...props} variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="bg-background ring-1 ring-[#FFDC58]"
            >
              <Link to="/">
                <div className="flex justify-center items-center bg-sidebar-primary rounded-lg text-sidebar-primary-foreground aspect-square size-8">
                  <img
                    alt="Uspk Logo"
                    className="w-6 h-6"
                    src="https://res.cloudinary.com/uspk/image/upload/v1642566273/logos/svg/uspk-u-white.svg"
                  />
                </div>
                <div className="flex-1 grid text-left text-sm leading-tight">
                  <span className="font-semibold truncate">
                    {selectorLabel}
                  </span>
                  <span className="text-xs truncate">Academy</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={mainNavTree.items} title={mainNavTree.title} />
        {toolsNavTree ? (
          <NavMain items={toolsNavTree.items} title={toolsNavTree.title} />
        ) : null}
        <NavSecondary className="mt-auto" items={secondaryNavTree} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={user}
          // isLoading={isLoadingUser}
        />
      </SidebarFooter>
      <EditProfileDialog
        open={isOpenEditProfileDialog}
        onOpenChange={onOpenEditProfileDialog}
        userData={userData as any}
        trigger={<></>}
      />
    </Sidebar>
  );
}
