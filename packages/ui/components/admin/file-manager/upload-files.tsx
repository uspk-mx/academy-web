import type React from "react";

import { useState, useRef } from "react";
import { Upload, FileUp, FolderUp } from "lucide-react";
import { Button } from "ui/components/button";
import { defaultFolders } from "./folder-navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/select";

interface UploadFilesProps {
  currentFolderId: string;
}

export function UploadFiles({ currentFolderId }: UploadFilesProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(currentFolderId);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const uploadFiles = async (filesToUpload: File[]) => {
    setUploading(true);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real application, you would use FormData to upload files to your server
    // const formData = new FormData()
    // filesToUpload.forEach(file => {
    //   formData.append('files', file)
    //   formData.append('folderId', selectedFolderId)
    // })
    // await fetch('/api/upload', { method: 'POST', body: formData })

    setUploading(false);
    setFiles([]);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Auto-select appropriate folder based on file type
  const getRecommendedFolder = (file: File) => {
    const type = file.type;

    if (type.startsWith("image/")) {
      return "images";
    } else if (type.startsWith("audio/")) {
      return "audios";
    } else if (type.startsWith("video/")) {
      // Determine if it's a course intro or lesson video
      // This is a simplified example - in a real app, you might have more sophisticated logic
      if (
        file.name.toLowerCase().includes("intro") ||
        file.name.toLowerCase().includes("course")
      ) {
        return "course-intro-videos";
      } else {
        return "lesson-videos";
      }
    } else if (type === "application/pdf" || type.includes("document")) {
      return "attachments";
    }

    return selectedFolderId;
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <label htmlFor="file-folder" className="block text-sm font-medium mb-1">
          Select destination folder
        </label>
        <Select value={selectedFolderId} onValueChange={setSelectedFolderId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select folder" />
          </SelectTrigger>
          <SelectContent>
            {defaultFolders.map((folder) => (
              <SelectItem key={folder.id} value={folder.id}>
                {folder.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <Upload className="h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-medium">Drop files to upload</h3>
          <p className="text-sm text-gray-500">or</p>
          <Button
            onClick={handleButtonClick}
            variant="neutral"
            className="mt-2"
          >
            Select Files
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            className="hidden"
            multiple
          />
          <p className="text-xs text-gray-500 mt-4">
            Maximum upload file size: 2 GB.
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Selected Files ({files.length})</h4>
          <ul className="space-y-2">
            {files.map((file, index) => {
              const recommendedFolder = getRecommendedFolder(file);
              const folderName =
                defaultFolders.find((f) => f.id === recommendedFolder)?.name ||
                "Unknown";

              return (
                <li
                  key={index}
                  className="flex items-center p-2 bg-gray-50 rounded"
                >
                  <FileUp className="h-5 w-5 mr-2 text-gray-500" />
                  <div className="flex-1">
                    <span className="block truncate">{file.name}</span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <FolderUp className="h-3 w-3 mr-1" />
                      {folderName}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </li>
              );
            })}
          </ul>
          <Button
            onClick={() => uploadFiles(files)}
            className="mt-4"
            disabled={uploading}
            type="button"
          >
            {uploading ? "Uploading..." : "Upload Files"}
          </Button>
        </div>
      )}
    </div>
  );
}
