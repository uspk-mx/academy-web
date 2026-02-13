import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "ui/components/sidebar";
import { Play, HelpCircle } from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  type: "video" | "quiz";
}

interface CourseSidebarProps {
  lessons: Lesson[];
  onSelectLesson: (lesson: Lesson) => void;
}

export function CourseSidebar({ lessons, onSelectLesson }: CourseSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-xl font-bold px-4 py-2">Course Content</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Module 1: Getting Started</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {lessons.map((lesson) => (
                <SidebarMenuItem key={lesson.id}>
                  <SidebarMenuButton onClick={() => onSelectLesson(lesson)}>
                    {lesson.type === "video" ? (
                      <Play className="w-4 h-4 mr-2" />
                    ) : (
                      <HelpCircle className="w-4 h-4 mr-2" />
                    )}
                    <span>{lesson.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
