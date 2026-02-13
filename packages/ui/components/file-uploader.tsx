"use client";

import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";
import { useEffect } from "react";

import { Button } from "ui/components/button";
import { useFileUploaderContext } from "ui/context/file-uploader-context";
import type { Maybe } from "gql-generated/generated/types";
import { useFileUploader } from "ui/hooks/use-file-uploader";

export default function FileUploader({
  title,
  formatsLabel,
  triggerLabel,
  acceptedFormats,
  initialMedia,
}: {
  title: string;
  formatsLabel: string;
  triggerLabel: string;
  acceptedFormats?: string;
  initialMedia?: Maybe<string>;
}) {
  const maxSizeMB = 100;
  const maxSize = maxSizeMB * 1024 * 1024; // 100MB default
  const { setFiles, setFileUrls, fileUrls } = useFileUploaderContext();

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
      setState,
    },
  ] = useFileUploader({
    accept: acceptedFormats
      ? acceptedFormats
      : "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
  });

  useEffect(() => {
    if (files) {
      setFiles(files.map((item) => item.file as File));
    }
  }, [files, setFiles]);

  useEffect(() => {
    if (initialMedia) {
      setState({
        files: [
          {
            preview: initialMedia,
            file: {
              name: "preview",
              id: "",
              type: "",
              size: 0,
              url: initialMedia,
            },
            id: "",
          },
        ],
        isDragging: false,
        errors: [],
      });
    } else {
      // Clean if there's not initialMedia
      setState({
        files: [],
        isDragging: false,
        errors: [],
      });
    }
  }, [initialMedia, setState]);

  const previewUrl = files[0]?.preview || null;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input bg-white data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]"
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload image file"
          />
          {fileUrls[0] || previewUrl ? (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src={previewUrl || fileUrls[0]}
                alt={files[0]?.file?.name || "Uploaded image"}
                className="mx-auto max-h-full rounded-sm object-contain"
                key={title}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <ImageIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">{title}</p>
              <p className="text-muted-foreground text-xs">
                {formatsLabel} (max. {maxSizeMB}MB)
              </p>
              <Button
                variant="noShadowNeutral"
                className="mt-4"
                onClick={openFileDialog}
                type="button"
              >
                <UploadIcon
                  className="-ms-1 size-4 opacity-60"
                  aria-hidden="true"
                />
                {triggerLabel}
              </Button>
            </div>
          )}
        </div>

        {previewUrl && (
          <div className="absolute top-4 right-4">
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={() => {
                setFileUrls([]);
                removeFile(files[0]?.id);
              }}
              aria-label="Remove image"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}
