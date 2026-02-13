import { type ReactNode, createContext, useContext, useState } from "react";
import { toast } from "sonner";

interface FileUploaderContextType {
  files: File[];
  fileUrls: string[];
  setFileUrls: (value: string[]) => void;
  setFiles: (file: File[]) => void;
  isUploading?: boolean;
  setIsUploading?: (value: boolean) => void;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onSubmitAttachments: () => Promise<any[] | undefined>;
}

const FileUploaderContext = createContext<FileUploaderContextType | null>(null);

export const FileUploaderProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmitAttachments = async () => {
    if (files.length === 0) {
      toast.error("No files selected", {
        description: "Please select at least one file to upload.",
      });
      return;
    }

    setIsUploading(true);
    try {
      const uploadPromises = files.map(async (fileData) => {
        const formData = new FormData();
        formData.append("file", fileData);
        formData.append("folder", "attachments");

        const response = await fetch(
          `${import.meta.env.VITE_API_TARGET}/api/files/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();
        return result;
      });

      const result = await Promise.all(uploadPromises);
      const uploadedUrls = result.map((item) => item.url);
      setFiles(files);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      setFileUrls(uploadedUrls as any);
      toast.success("Archivos subidos", {
        description: "Todos los adjuntos fueron subidos a la nube!",
      });

      setFiles([]);
      return uploadedUrls;
    } catch (error) {
      toast.error("Upload failed", {
        description:
          error instanceof Error ? error.message : "Failed to upload files",
      });
      return [];
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <FileUploaderContext.Provider
      value={{
        files,
        setFiles,
        isUploading,
        setIsUploading,
        onSubmitAttachments: handleSubmitAttachments,
        fileUrls,
        setFileUrls,
      }}
    >
      {children}
    </FileUploaderContext.Provider>
  );
};

export function useFileUploaderContext() {
  const context = useContext(FileUploaderContext);
  if (!context) {
    throw new Error(
      "useFileUploaderContext must be used within a FileUploaderProvider"
    );
  }
  return context;
}
