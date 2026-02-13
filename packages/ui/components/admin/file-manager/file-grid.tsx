import type { FileType } from "ui/lib/types";
import { isImageFile, isVideoFile, isAudioFile } from "ui/lib/file-manager";
import { File, FileText, Image, Music, Video } from "lucide-react";
import { Check } from "lucide-react";

interface FileGridProps {
  files: FileType[];
  onFileSelect: (file: FileType) => void;
  selectedFile: FileType | null;
}

export function FileGrid({ files, onFileSelect, selectedFile }: FileGridProps) {
  const getFileIcon = (file: FileType) => {
    if (isImageFile(file.type)) return <Image className="h-6 w-6" />;
    if (isVideoFile(file.type)) return <Video className="h-6 w-6" />;
    if (isAudioFile(file.type)) return <Music className="h-6 w-6" />;
    if (file.type.includes("pdf")) return <FileText className="h-6 w-6" />;
    return <File className="h-6 w-6" />;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
      {files.map((file) => (
        <div
          key={file.id}
          className={`relative border rounded-md overflow-hidden cursor-pointer transition-all hover:shadow-md ${
            selectedFile?.id === file.id ? "ring-2 ring-blue-500" : ""
          }`}
          onClick={() => onFileSelect(file)}
        >
          <div className="aspect-square">
            <FileThumbnail file={file} />
          </div>

          {selectedFile?.id === file.id && (
            <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full p-1">
              <Check className="h-4 w-4" />
            </div>
          )}

          <div className="p-2 text-xs truncate border-t bg-white">
            {file.name}
          </div>
        </div>
      ))}
    </div>
  );
}

function FileThumbnail({ file }: { file: FileType }) {
  if (isImageFile(file.type)) {
    return (
      <div className="relative w-full h-full">
        <img
          src={file.thumbnail || file.url}
          alt={file.name}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  if (isVideoFile(file.type)) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-100">
        <Video className="h-10 w-10 text-gray-400" />
      </div>
    );
  }

  if (isAudioFile(file.type)) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-100">
        <Music className="h-10 w-10 text-gray-400" />
      </div>
    );
  }

  // Default thumbnail for other file types
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-100">
      {file.type.includes("pdf") ? (
        <FileText className="h-10 w-10 text-gray-400" />
      ) : (
        <File className="h-10 w-10 text-gray-400" />
      )}
    </div>
  );
}
