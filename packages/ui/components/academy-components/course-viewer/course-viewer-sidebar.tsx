import { CheckIcon, ChevronRight } from "lucide-react";
import { cn } from "ui/lib/utils";

import { Link } from "react-router";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "ui/components/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "ui/components/sidebar";

interface CourseItem {
  title: string;
  url: string;
  items?: CourseItem[];
  isActive?: boolean;
  isCompleted?: boolean;
}

export interface Topic {
  title: string;
  url?: string;
  items: CourseItem[];
}

export interface CourseViewerSidebarProps {
  courseTitle?: string;
  courseData: Topic[];
  className?: string
}

export function CourseViewerSidebar({
  courseTitle,
  courseData,
  className
}: CourseViewerSidebarProps) {
  return (
    <Sidebar
      variant="floating"
      className={cn(
        "group peer hidden text-sidebar-foreground md:block",
        className,
      )}
    >
      <SidebarHeader className="bg-neutral-50 dark:bg-sidebar-background rounded-md">
        <SidebarMenu>
          <CourseSidebarHeader />
        </SidebarMenu>
        <h2 className="text-2xl text-accent-foreground pl-2 font-semibold">
          {courseTitle}
        </h2>
      </SidebarHeader>
      <SidebarContent className="gap-0 overflow-y-scroll scrollbar-none bg-neutral-50 dark:bg-sidebar-background rounded-b-md">
        {courseData.map((topic) => (
          <Collapsible
            key={topic.title}
            title={topic.title}
            defaultOpen={topic.items.some((item) => item.isActive)}
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                className="group/label text-sm text-sidebar-accent-foreground"
                asChild
              >
                <CollapsibleTrigger className="flex items-center font-semibold data-[state=open]:mb-3 data-[state=open]:[&_svg]:rotate-90">
                  {topic.title}{" "}
                  <ChevronRight className="ml-auto transition-transform" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              {topic.items?.length ? (
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {topic.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            isActive={item.isActive}
                            className={cn("justify-between h-12", {
                              "font-medium dark:text-black bg-brand!": item.isActive,
                            })}
                            asChild
                          >
                            <Link
                              to={item.url}
                              viewTransition
                            >
                              <span className="truncate">{item.title}</span>
                              {item.isCompleted ? (
                                <CheckIcon className="size-4 text-green-700 ml-1" />
                              ) : null}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              ) : null}
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

function CourseSidebarHeader() {
  return (
    <SidebarMenuItem className="flex items-center gap-3">
      <SidebarMenuButton size="lg" asChild>
        <Link to="/courses">
          <div className="flex flex-col gap-0.5 leading-none">
            <img
              src="https://pub-74a58968a0814f12bf1cecf8c23125ee.r2.dev/logos/ua-logo.png"
              alt="USPK Academy Logo"
              className="w-60 -ml-4"
            />
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
