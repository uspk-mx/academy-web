export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  );
}

export function getFileTypeIcon(type: string) {
  const fileTypeMap: Record<string, string> = {
    image: "image",
    pdf: "file-text",
    doc: "file-text",
    docx: "file-text",
    xls: "file",
    xlsx: "file",
    ppt: "file",
    pptx: "file",
    mp4: "video",
    mpg: "video",
    avi: "video",
    mp3: "music",
    wav: "music",
  };

  const fileExtension = type.toLowerCase().split("/")[1] || type.toLowerCase();
  return fileTypeMap[fileExtension] || "file";
}

export function getFileExtension(filename: string): string {
  return filename
    .slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
    .toLowerCase();
}

export function isImageFile(type: string): boolean {
  return type.startsWith("image/");
}

export function isVideoFile(type: string): boolean {
  return type.startsWith("video/");
}

export function isAudioFile(type: string): boolean {
  return type.startsWith("audio/");
}

export function getFileType(filename: string): string {
  const extension = getFileExtension(filename);
  const mimeTypes: Record<string, string> = {
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    mp4: "video/mp4",
    mpg: "video/mpeg",
    avi: "video/x-msvideo",
    mp3: "audio/mpeg",
    wav: "audio/wav",
  };

  return mimeTypes[extension] || "application/octet-stream";
}
