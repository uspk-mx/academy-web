import type * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "ui/components/sidebar";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import { useSidebarNav } from "./use-sidebar-nav";

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>): React.ReactElement {
  const { user, navMain, navSecondary, projects } = useSidebarNav();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <a href="/">
                <div className="flex justify-center items-center bg-sidebar-primary rounded-lg text-sidebar-primary-foreground aspect-square size-8">
                  {/* <Command className="size-4" /> */}
                  <img
                    alt=""
                    className="size-6"
                    src="https://res.cloudinary.com/uspk/image/upload/v1642566273/logos/svg/uspk-u-white.svg"
                  />
                </div>
                <div className="flex-1 grid text-left text-sm leading-tight">
                  <span className="font-semibold truncate">Uspk</span>
                  <span className="text-xs truncate">Academy</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain.items} title={navMain.title} />
        <NavProjects projects={projects} />
        <NavSecondary className="mt-auto" items={navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
