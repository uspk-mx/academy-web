import { useId, useRef, useState } from "react";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "../lib/cloudinary";

interface CloudeReponse {
  description: string;
  duration: number;
  format: string;
  resource_type: string;
  height: number;
  width: number;
  source: string;
  tags: string[];
  type: string;
  secure_url: string;
}

export function useFileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [cloudResponse, setCloudResponse] =
    useState<Partial<CloudeReponse> | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  const uploadFile = async () => {
    if (!file) {
      console.error("Please select a file.");
      return;
    }

    const uniqueUploadId = id;
    const chunkSize = 5 * 1024 * 1024;
    const totalChunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;

    setUploading(true);

    const uploadChunk = async (start: number, end: number) => {
      const formData = new FormData();
      formData.append("file", file.slice(start, end));
      formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      const contentRange = `bytes ${start}-${end - 1}/${file.size}`;

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
          {
            method: "POST",
            body: formData,
            headers: {
              "X-Unique-Upload-Id": uniqueUploadId,
              "Content-Range": contentRange,
            } as any,
          }
        );

        if (!response.ok) {
          throw new Error("Chunk upload failed.");
        }

        currentChunk++;

        if (currentChunk < totalChunks) {
          const nextStart = currentChunk * chunkSize;
          const nextEnd = Math.min(nextStart + chunkSize, file.size);
          uploadChunk(nextStart, nextEnd);
        } else {
          setUploadComplete(true);
          setUploading(false);

          const result = await response.json();
          setCloudResponse(result);
          console.info("File upload complete.");
          setFileUrl(result.secure_url);
          return {
            fileUrl: result.secure_url,
            cloudResponse: result
          }
        }
      } catch (error) {
        console.error("Error uploading chunk:", error);
        setUploading(false);
      }
    };

    const start = 0;
    const end = Math.min(chunkSize, file.size);
    await uploadChunk(start, end);
  };

  // Generate preview when file is selected
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  return [
    {
      file,
      preview,
      uploading,
      uploadComplete,
      cloudResponse,
      inputRef,
      fileUrl,
    },
    { uploadFile, handleFileChange, setFile, setPreview, setFileUrl },
  ] as const;
}
