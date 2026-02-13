import type { FileType } from "ui/lib/types";
import {
  formatFileSize,
  isImageFile,
  isVideoFile,
  isAudioFile,
} from "ui/lib/file-manager";
import {
  X,
  Pencil,
  Trash2,
  Image,
  FileText,
  Video,
  Music,
  File,
  Link,
  FolderOpen,
} from "lucide-react";
import { Button } from "ui/components/button";
import { Input } from "ui/components/input";
import { Textarea } from "ui/components/textarea";
import { defaultFolders } from "./folder-navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/components/select";

interface FileDetailsProps {
  file: FileType | null;
  onClose: () => void;
}

export function FileDetails({ file, onClose }: FileDetailsProps) {
  if (!file) return null;

  const getFileIcon = () => {
    if (isImageFile(file.type)) return <Image className="h-6 w-6" />;
    if (isVideoFile(file.type)) return <Video className="h-6 w-6" />;
    if (isAudioFile(file.type)) return <Music className="h-6 w-6" />;
    if (file.type.includes("pdf")) return <FileText className="h-6 w-6" />;
    return <File className="h-6 w-6" />;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const folderName =
    defaultFolders.find((folder) => folder.id === file.folderId)?.name ||
    "Unknown";

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-medium">ATTACHMENT DETAILS</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4">
        {isImageFile(file.type) && (
          <div className="mb-4">
            <img
              src={file.url || "/placeholder.svg"}
              alt={file.name}
              className="w-full h-auto rounded"
            />
          </div>
        )}

        {!isImageFile(file.type) && (
          <div className="flex items-center justify-center h-32 bg-gray-100 rounded-sm mb-4">
            {getFileIcon()}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">{file.name}</p>
            <p className="text-xs text-gray-500">
              {formatDate(file.uploadDate)}
            </p>
            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
            {file.dimensions && (
              <p className="text-xs text-gray-500">
                {file.dimensions.width} by {file.dimensions.height} pixels
              </p>
            )}
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <FolderOpen className="h-3 w-3 mr-1" />
              {folderName}
            </div>
          </div>

          <div className="space-y-2">
            <Button
              variant="noShadowNeutral"
              size="sm"
              className="w-full justify-start"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit Image
            </Button>
            <Button
              variant="noShadowNeutral"
              size="sm"
              className="w-full justify-start text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete permanently
            </Button>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <div className="space-y-1">
              <label htmlFor="folder" className="text-sm">
                Folder
              </label>
              <Select defaultValue={file.folderId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select folder" />
                </SelectTrigger>
                <SelectContent>
                  {defaultFolders
                    .filter((folder) => folder.id !== "root")
                    .map((folder) => (
                      <SelectItem key={folder.id} value={folder.id}>
                        {folder.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label htmlFor="alt-text" className="text-sm">
                Alt Text
              </label>
              <Textarea
                id="alt-text"
                placeholder="Alternative text for the image"
                className="resize-none"
              />
              <p className="text-xs text-gray-500">
                Learn how to describe the purpose of the image. Leave empty if
                the image is purely decorative.
              </p>
            </div>

            <div className="space-y-1">
              <label htmlFor="title" className="text-sm">
                Title
              </label>
              <Input id="title" defaultValue={file.name.split(".")[0]} />
            </div>

            <div className="space-y-1">
              <label htmlFor="caption" className="text-sm">
                Caption
              </label>
              <Textarea
                id="caption"
                placeholder="Image caption"
                className="resize-none"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="description" className="text-sm">
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Image description"
                className="resize-none"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="file-url" className="text-sm">
                File URL
              </label>
              <div className="flex">
                <Input id="file-url" value={file.url} readOnly />
                <Button variant="ghost" size="icon" className="ml-2">
                  <Link className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
