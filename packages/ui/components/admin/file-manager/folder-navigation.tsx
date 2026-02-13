import { useState } from "react";
import { ChevronRight, Folder, FolderOpen, Home, Plus } from "lucide-react";
import { Button } from "ui/components/button";
import type { FolderType } from "ui/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui/components/dropdown-menu";
import { cn } from "ui/lib/utils";

export const defaultFolders: FolderType[] = [
  {
    id: "root",
    name: "All Files",
    path: "/",
    icon: "home",
  },
  {
    id: "attachments",
    name: "Attachments",
    path: "/attachments",
    icon: "file",
    parentId: "root",
  },
  {
    id: "audios",
    name: "Audios",
    path: "/audios",
    icon: "music",
    parentId: "root",
  },
  {
    id: "course-intro-videos",
    name: "Course Intro Videos",
    path: "/course-intro-videos",
    icon: "video",
    parentId: "root",
  },
  {
    id: "images",
    name: "Images",
    path: "/images",
    icon: "image",
    parentId: "root",
  },
  {
    id: "lesson-videos",
    name: "Lesson Videos",
    path: "/lesson-videos",
    icon: "video",
    parentId: "root",
  },
];

interface FolderNavigationProps {
  folders: FolderType[];
  currentFolderId: string;
  onFolderSelect: (folderId: string) => void;
}

export function FolderNavigation({
  folders,
  currentFolderId,
  onFolderSelect,
}: FolderNavigationProps) {
  const [expandedFolders, setExpandedFolders] = useState<
    Record<string, boolean>
  >({
    root: true,
  });

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const getFolderIcon = (folder: FolderType) => {
    if (folder.icon === "home") return <Home className="h-4 w-4 mr-2" />;
    if (folder.icon === "music")
      return <Folder className="h-4 w-4 mr-2 text-blue-500" />;
    if (folder.icon === "video")
      return <Folder className="h-4 w-4 mr-2 text-purple-500" />;
    if (folder.icon === "image")
      return <Folder className="h-4 w-4 mr-2 text-green-500" />;
    return <Folder className="h-4 w-4 mr-2 text-yellow-500" />;
  };

  const renderFolder = (folder: FolderType) => {
    const isExpanded = expandedFolders[folder.id];
    const isSelected = folder.id === currentFolderId;
    const childFolders = folders.filter((f) => f.parentId === folder.id);
    const hasChildren = childFolders.length > 0;

    return (
      <div key={folder.id} className="mb-1">
        <div
          className={cn(
            "flex items-center py-1 px-2 rounded-md cursor-pointer hover:bg-gray-100",
            isSelected && "bg-gray-100 font-medium"
          )}
        >
          {hasChildren && (
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0 mr-1"
              onClick={() => toggleFolder(folder.id)}
            >
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform",
                  isExpanded && "rotate-90"
                )}
              />
            </Button>
          )}
          {!hasChildren && <div className="w-6" />}
          <div
            className="flex items-center flex-1"
            onClick={() => onFolderSelect(folder.id)}
          >
            {isSelected ? (
              <FolderOpen className="h-4 w-4 mr-2" />
            ) : (
              getFolderIcon(folder)
            )}
            <span className="text-sm">{folder.name}</span>
          </div>
        </div>
        {isExpanded && hasChildren && (
          <div className="pl-4 mt-1 border-l ml-3">
            {childFolders.map((childFolder) => renderFolder(childFolder))}
          </div>
        )}
      </div>
    );
  };

  const rootFolders = folders.filter(
    (folder) => folder.parentId === null || folder.id === "root"
  );

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Carpetas</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem disabled>Nueva Carpeta</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="space-y-1">
        {rootFolders.map((folder) => renderFolder(folder))}
      </div>
    </div>
  );
}
