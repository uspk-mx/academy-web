import type React from "react";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/select";
import { FileGrid } from "./file-grid";
import type { FileType, FilterOptions } from "ui/lib/types";
import { defaultFolders } from "./folder-navigation";
import { FolderBreadcrumb } from "./folder-breadcrumb";

// Sample data for demonstration with folder IDs
const sampleFiles: FileType[] = [
  {
    id: "1",
    name: "black-logo_cxrldb-Thumbnail.png",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-o6OoHnoTqSLOq44x4C6XHRwSJEbPpa.png",
    type: "image/png",
    size: 1024,
    dimensions: { width: 200, height: 104 },
    uploadDate: new Date("2024-06-12"),
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-o6OoHnoTqSLOq44x4C6XHRwSJEbPpa.png",
    folderId: "images",
  },
  {
    id: "2",
    name: "team-photo.jpg",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ti8h7yaFiTCN14vNGJB35olUPg3YW5.png",
    type: "image/jpeg",
    size: 2048,
    dimensions: { width: 800, height: 600 },
    uploadDate: new Date("2024-06-10"),
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ti8h7yaFiTCN14vNGJB35olUPg3YW5.png",
    folderId: "images",
  },
  {
    id: "3",
    name: "presentation.pptx",
    url: "/placeholder.svg?height=100&width=100",
    type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    size: 3145728,
    uploadDate: new Date("2024-06-08"),
    folderId: "attachments",
  },
  {
    id: "4",
    name: "report.pdf",
    url: "/placeholder.svg?height=100&width=100",
    type: "application/pdf",
    size: 1048576,
    uploadDate: new Date("2024-06-05"),
    folderId: "attachments",
  },
  {
    id: "5",
    name: "data.xlsx",
    url: "/placeholder.svg?height=100&width=100",
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    size: 512000,
    uploadDate: new Date("2024-06-01"),
    folderId: "attachments",
  },
  {
    id: "6",
    name: "document.docx",
    url: "/placeholder.svg?height=100&width=100",
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    size: 245760,
    uploadDate: new Date("2024-05-28"),
    folderId: "attachments",
  },
  {
    id: "7",
    name: "course-introduction.mp4",
    url: "/placeholder.svg?height=100&width=100",
    type: "video/mp4",
    size: 15728640,
    uploadDate: new Date("2024-05-25"),
    folderId: "course-intro-videos",
  },
  {
    id: "8",
    name: "lesson-1-basics.mp4",
    url: "/placeholder.svg?height=100&width=100",
    type: "video/mp4",
    size: 12582912,
    uploadDate: new Date("2024-05-22"),
    folderId: "lesson-videos",
  },
  {
    id: "9",
    name: "background-music.mp3",
    url: "/placeholder.svg?height=100&width=100",
    type: "audio/mpeg",
    size: 4194304,
    uploadDate: new Date("2024-05-20"),
    folderId: "audios",
  },
];

interface MediaLibraryProps {
  onFileSelect: (file: FileType) => void;
  selectedFile: FileType | null;
  currentFolderId: string;
}

export function MediaLibrary({
  onFileSelect,
  selectedFile,
  currentFolderId,
}: MediaLibraryProps) {
  const [files, setFiles] = useState<FileType[]>(sampleFiles);
  const [filteredFiles, setFilteredFiles] = useState<FileType[]>(sampleFiles);
  const [filters, setFilters] = useState<FilterOptions>({
    type: "all",
    dateRange: "all",
    searchQuery: "",
    folderId: currentFolderId,
  });

  // Update filters when folder changes
  useEffect(() => {
    setFilters((prev) => ({ ...prev, folderId: currentFolderId }));
  }, [currentFolderId]);

  useEffect(() => {
    let result = [...files];

    // Filter by folder
    if (filters.folderId !== "root") {
      result = result.filter((file) => file.folderId === filters.folderId);
    }

    // Filter by type
    if (filters.type !== "all") {
      result = result.filter((file) => {
        if (filters.type === "images") return file.type.startsWith("image/");
        if (filters.type === "documents")
          return file.type.includes("document") || file.type.includes("pdf");
        if (filters.type === "spreadsheets") return file.type.includes("sheet");
        if (filters.type === "presentations")
          return file.type.includes("presentation");
        if (filters.type === "audio") return file.type.startsWith("audio/");
        if (filters.type === "video") return file.type.startsWith("video/");
        return true;
      });
    }

    // Filter by date range
    if (filters.dateRange !== "all") {
      const now = new Date();
      const pastDate = new Date();

      if (filters.dateRange === "week") {
        pastDate.setDate(now.getDate() - 7);
      } else if (filters.dateRange === "month") {
        pastDate.setMonth(now.getMonth() - 1);
      } else if (filters.dateRange === "year") {
        pastDate.setFullYear(now.getFullYear() - 1);
      }

      result = result.filter((file) => file.uploadDate >= pastDate);
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter((file) => file.name.toLowerCase().includes(query));
    }

    setFilteredFiles(result);
  }, [files, filters]);

  const handleTypeChange = (value: string) => {
    setFilters((prev) => ({ ...prev, type: value }));
  };

  const handleDateRangeChange = (value: string) => {
    setFilters((prev) => ({ ...prev, dateRange: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
  };

  return (
    <div className="w-full">
      <div className="p-4 border-b">
        <FolderBreadcrumb
          folders={defaultFolders}
          currentFolderId={currentFolderId}
          onFolderSelect={() => {}} // This would be handled by the parent component
        />

        <div className="flex flex-col md:flex-row gap-2 mt-4">
          <div className="flex-1 flex gap-2">
            <Select defaultValue="all" onValueChange={handleTypeChange}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="All media items" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All media items</SelectItem>
                <SelectItem value="images">Images</SelectItem>
                <SelectItem value="documents">Documents</SelectItem>
                <SelectItem value="spreadsheets">Spreadsheets</SelectItem>
                <SelectItem value="presentations">Presentations</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all" onValueChange={handleDateRangeChange}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="All dates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All dates</SelectItem>
                <SelectItem value="week">Last week</SelectItem>
                <SelectItem value="month">Last month</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search"
              className="pl-8 w-full md:w-[200px]"
              value={filters.searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <div className="p-4 border-b">
        <div className="text-sm">
          <span className="font-medium">{filteredFiles.length}</span>{" "}
          {filteredFiles.length === 1 ? "item" : "items"}
        </div>
      </div>

      <FileGrid
        files={filteredFiles}
        onFileSelect={onFileSelect}
        selectedFile={selectedFile}
      />
    </div>
  );
}
