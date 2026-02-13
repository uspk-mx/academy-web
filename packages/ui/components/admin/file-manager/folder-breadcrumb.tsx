import { ChevronRight, Home } from "lucide-react";
import type { FolderType } from "ui/lib/types";
import { Button } from "ui/components/button";

interface FolderBreadcrumbProps {
  folders: FolderType[];
  currentFolderId: string;
  onFolderSelect: (folderId: string) => void;
}

export function FolderBreadcrumb({
  folders,
  currentFolderId,
  onFolderSelect,
}: FolderBreadcrumbProps) {
  // Find the current folder
  const currentFolder = folders.find((folder) => folder.id === currentFolderId);

  if (!currentFolder) {
    return null;
  }

  // For root folder, just show "All Files"
  if (currentFolder.id === "root") {
    return (
      <div className="flex items-center text-sm">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2"
          onClick={() => onFolderSelect("root")}
        >
          <Home className="h-4 w-4 mr-1" />
          All Files
        </Button>
      </div>
    );
  }

  // For other folders, show path
  return (
    <div className="flex items-center text-sm">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-2"
        onClick={() => onFolderSelect("root")}
      >
        <Home className="h-4 w-4 mr-1" />
        All Files
      </Button>
      <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-2"
        onClick={() => onFolderSelect(currentFolder.id)}
      >
        {currentFolder.name}
      </Button>
    </div>
  );
}
