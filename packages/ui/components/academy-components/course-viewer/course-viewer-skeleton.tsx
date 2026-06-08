import { ClockIcon } from "lucide-react";
import { Skeleton } from "ui/components/skeleton";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "ui/components/sidebar";
import { cn } from "ui/lib/utils";
import { useMediaQuery } from "../hooks";

export interface CourseViewerSkeletonProps {
  /** Number of placeholder lesson rows to render in the sidebar. */
  sidebarItemCount?: number;
}

/**
 * Full-page loading state for the CourseViewer. Mirrors the real layout
 * (sidebar list, header, video player, lesson content, footer actions) so the
 * page does not visually jump when the data finishes loading.
 */
export function CourseViewerSkeleton({
  sidebarItemCount = 7,
}: CourseViewerSkeletonProps) {
  const isMobile = useMediaQuery("(min-width: 900px)");

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": isMobile ? "22.5rem" : "19rem",
        } as React.CSSProperties
      }
      className="group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar"
    >
      <Sidebar
        variant="floating"
        className="group peer hidden text-sidebar-foreground md:block"
      >
        <SidebarHeader className="bg-neutral-50 rounded-md gap-3">
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-3 p-2">
              <Skeleton className="h-8 w-40" />
            </SidebarMenuItem>
          </SidebarMenu>
          <Skeleton className="ml-2 h-7 w-3/4" />
        </SidebarHeader>
        <SidebarContent className="gap-0 overflow-hidden scrollbar-none bg-neutral-50 rounded-b-md p-2">
          {Array.from({ length: sidebarItemCount }).map((_, index) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder list
              key={index}
              className="flex h-12 items-center justify-between px-2"
            >
              <Skeleton
                className="h-4"
                style={{ width: `${55 + ((index * 7) % 35)}%` }}
              />
            </div>
          ))}
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="relative min-w-0 flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-2 md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ms-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm/5">
        <header className="flex h-16 items-center w-full max-w-full gap-2 justify-between px-4 sticky top-0 bg-background z-10 overflow-x-hidden">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <SidebarTrigger className="-ml-1 shrink-0" />
            <Skeleton className="h-4 w-48 max-w-[40vw]" />
            <div className="hidden shrink-0 lg:flex items-center gap-1 text-muted-foreground/40">
              <ClockIcon className="size-4" />
              <Skeleton className="h-4 w-10" />
            </div>
          </div>
          <Skeleton className="h-9 w-9 rounded-full" />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-w-0 min-h-screen flex-1 max-w-full lg:max-w-5xl mx-auto px-4 sm:px-8 mt-4 mb-6 md:min-h-min w-full">
            {/* Video placeholder */}
            <Skeleton className="aspect-video w-full max-w-full rounded-xl" />

            {/* Lesson content placeholder */}
            <div className="mt-6 space-y-3">
              <Skeleton className="h-7 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            {/* Footer actions placeholder */}
            <div
              className={cn(
                "flex items-center justify-center gap-4 lg:gap-0 lg:justify-between mt-6",
              )}
            >
              <Skeleton className="h-11 w-32 rounded-md" />
              <div className="flex lg:flex-wrap items-center justify-center gap-4">
                <Skeleton className="h-11 w-32 rounded-md" />
                <Skeleton className="h-11 w-24 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
