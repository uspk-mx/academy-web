import {
  FileAudioIcon,
  FileIcon,
  FileTextIcon,
  FileVideoIcon,
  ImageIcon,
  UploadIcon,
  XIcon,
} from "lucide-react";
import type { ReactNode, SetStateAction } from "react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { extractFilenameFromUrl, removeFileExtension } from "ui/lib/cloudinary";
import { Button } from "ui/components/button";
import { Card, CardContent } from "ui/components/card";
import { ScrollArea } from "ui/components/scroll-area";

export interface FileData {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
  url?: string;
  originalSize?: number;
  isNew?: boolean;
}

const ALLOWED_FILE_TYPES = [
  "audio/mpeg", // .mp3
  "video/mp4", // .mp4
  "image/jpeg", // .jpg
  "image/png", // .png
  "application/pdf", // .pdf
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "text/csv", // .csv
  "application/vnd.ms-excel", // .xls
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "application/vnd.ms-powerpoint", // .ppt
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
  "text/plain", // .txt
];

// Size limits in bytes
const SIZE_LIMITS = {
  image: 10 * 1024 * 1024, // 10MB for images
  default: 100 * 1024 * 1024, // 100MB for other files
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

const getFileIcon = (type: string) => {
  if (type.startsWith("image/")) return ImageIcon;
  if (type.startsWith("audio/")) return FileAudioIcon;
  if (type.startsWith("video/")) return FileVideoIcon;
  if (type.startsWith("text/")) return FileTextIcon;
  return FileIcon;
};

const isFileSizeValid = (file: File): boolean => {
  const sizeLimit = file.type.startsWith("image/")
    ? SIZE_LIMITS.image
    : SIZE_LIMITS.default;
  return file.size <= sizeLimit;
};

export function UploadAttachment({
  handleSubmit,
  files,
  setFiles,
  setIsAttchmentModified,
  initialAttachments,
  setInitialAttachments,
}: {
  handleSubmit: () => void;
  files: FileData[];
  setFiles: (value: SetStateAction<FileData[]>) => void;
  initialAttachments?: string[];
  setInitialAttachments?: (value: SetStateAction<string[]>) => void;
  setIsAttchmentModified?: (value: boolean) => void;
}): ReactNode {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const fileList = event.target.files;
    if (!fileList) return;

    const invalidTypeFiles: string[] = [];
    const oversizedFiles: string[] = [];
    const newFiles: FileData[] = [];

    // biome-ignore lint/complexity/noForEach: <explanation>
    Array.from(fileList).forEach((file) => {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        invalidTypeFiles.push(file.name);
      } else if (!isFileSizeValid(file)) {
        oversizedFiles.push(file.name);
      } else {
        const originalSize = file.size;
        newFiles.push({
          id: Math.random().toString(36).substring(7),
          name: file.name,
          size: file.size,
          originalSize: originalSize,
          type: file.type,
          file,
          isNew: true,
        });
      }
    });

    if (invalidTypeFiles.length > 0) {
      toast.error("Tipo de archivo no valido", {
        description: `${invalidTypeFiles.join(", ")} ${
          invalidTypeFiles.length > 1 ? "son" : "es"
        } no soportado.`,
      });
    }

    if (oversizedFiles.length > 0) {
      toast.error("Archivo muy largo", {
        description: `${oversizedFiles.join(", ")} ${
          oversizedFiles.length > 1 ? "execede" : "exceden"
        } el peso limite. imagenes debden de ser en ${formatFileSize(
          SIZE_LIMITS.image
        )}, otros archivos en ${formatFileSize(SIZE_LIMITS.default)}.`,
      });
    }
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (name: string): void => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));

    if (!initialAttachments?.length || !setInitialAttachments) return;

    const nameWithoutExt = removeFileExtension(name);

    const updatedAttachments = initialAttachments.filter((url) => {
      if (!url) return false;

      const urlFileName = removeFileExtension(extractFilenameFromUrl(url));
      return !urlFileName.includes(nameWithoutExt);
    });

    setInitialAttachments(updatedAttachments);
  };

  const handleUploadClick = (): void => {
    fileInputRef.current?.click();
    setIsAttchmentModified?.(true);
  };

  return (
    <UploadAttachmentsContainer shouldRender={files.length > 0}>
      {files.length > 0 ? (
        <>
          <ScrollArea className="mb-4">
            <div className="space-y-2 max-h-64">
              {files.map((file) => {
                const Icon = getFileIcon(file.type);
                return (
                  <div
                    className="flex items-center justify-between p-3 bg-muted rounded-lg group hover:bg-muted/80 transition-colors"
                    key={file.id}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium truncate max-w-52 xl:max-w-40">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      disabled={isUploading}
                      onClick={() => {
                        handleRemoveFile(file.name);
                      }}
                      size="icon"
                      type="button"
                      variant="ghost"
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <div className="flex flex-col gap-2">
            <Button
              disabled={isUploading}
              onClick={handleUploadClick}
              type="button"
              variant="noShadowNeutral"
            >
              <UploadIcon className="mr-2 h-4 w-4" />
              Agregar mas archivos
            </Button>
          </div>
        </>
      ) : (
        <Button
          className="w-max xl:w-full"
          disabled={isUploading}
          onClick={handleUploadClick}
          type="button"
        >
          <UploadIcon className="h-4 w-4 mr-2" />
          <span>Subir adjuntos</span>
        </Button>
      )}
      <input
        accept=".mp3,.mp4,.jpg,.jpeg,.png,.pdf,.doc,.docx,.csv,.xls,.xlsx,.ppt,.pptx,.txt"
        className="hidden"
        multiple
        onChange={handleFileChange}
        ref={fileInputRef}
        type="file"
      />
    </UploadAttachmentsContainer>
  );
}

function UploadAttachmentsContainer({
  children,
  shouldRender,
}: {
  children: ReactNode;
  shouldRender: boolean;
}): ReactNode {
  if (!shouldRender) return <>{children}</>;
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
}
