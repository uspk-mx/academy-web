import { ImagePlusIcon, LoaderCircle } from "lucide-react";
import { useId, useRef, useState, type ReactNode } from "react";
import { Button } from "ui/components/button";
import { Card, CardContent } from "ui/components/card";
import { Label } from "ui/components/label";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "ui/lib/cloudinary";

export function ImageUploader({
  imageCloudResponse,
  setImageCloudResponse,
  uploading: isUploading,
  setUploading,
  uploadComplete,
  setUploadComplete,
}: {
  imageCloudResponse: any;
  setImageCloudResponse: any;
  uploading: boolean;
  setUploading: (uploading: boolean) => void;
  uploadComplete: boolean;
  setUploadComplete: (complete: boolean) => void;
}): ReactNode {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId;

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

          const fetchResponse = await response.json();
          setImageCloudResponse(fetchResponse);
          console.info("File upload complete.");
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

  return (
    <div className="flex flex-col items-start gap-3">
      <Label>Imagen destacada</Label>
      {isUploading && (
        <LoaderCircle
          aria-hidden="true"
          className="animate-spin -ms-1 me-2"
          size={16}
          strokeWidth={2}
        />
      )}

      <Card className="border-dashed w-full max-w-md min-h-42 group">
        <CardContent className="pt-6">
          {preview ? (
            <div className="flex flex-col items-center gap-3">
              <img 
                src={preview} 
                alt="Preview" 
                className="max-w-full max-h-48 object-contain"
              />
              <Button type="button" onClick={() => {
                setFile(null);
                setPreview(null);
              }}>
                Remove Image
              </Button>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-3">
              <ImagePlusIcon className="group-hover:text-blue-700" />
              <Button type="button" onClick={() => inputRef.current?.click()}>
                Subir imagen destacada
              </Button>
              <p className="text-center text-xs">
                formatos JPEG, PNG, GIF, y WebP con tamaños de hasta 2 MB
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <input
        type="file"
        ref={inputRef}
        hidden
        name="featuredImage"
        id="featuredImage"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleFileChange}
      />
      {file && !uploadComplete && (
        <Button onClick={uploadFile} disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      )}
    </div>
  );
}
