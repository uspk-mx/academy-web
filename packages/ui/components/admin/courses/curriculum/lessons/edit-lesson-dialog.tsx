import type { Content } from "@tiptap/react";
import { PencilIcon, VideoIcon, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { useMutation } from "urql";
import { PageLoader } from "ui/components/admin/page-loader";
import type { FileData } from "ui/components/admin/upload-attachments";
import { UploadAttachment } from "ui/components/admin/upload-attachments";
import { MinimalTiptapEditor } from "ui/components/minimal-tiptap-editor";
import { Button } from "ui/components/button";
import { Card, CardContent } from "ui/components/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "ui/components/drawer";
import { Input } from "ui/components/input";
import { Label } from "ui/components/label";
import { Switch } from "ui/components/switch";
import { UpdateLessonDocument } from "gql-generated/gql/graphql";
import type {
  Lesson,
  UpdateLessonMutation,
  UpdateLessonMutationVariables,
  VideoInput,
} from "gql-generated/generated/types";
import {
  extractFilenameFromUrl,
  uploadFileToCloudinary,
} from "ui/lib/cloudinary";
import { cn } from "ui/lib/utils";

export function EditLessonDialog({ lesson }: { lesson: Lesson }): ReactNode {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<Content>(lesson?.content || "");
  const inputRefVideo = useRef<HTMLInputElement | null>(null);

  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState(
    lesson?.video?.videoURL || ""
  );
  const [feauteredImage, setFeauteredImage] = useState(
    lesson?.featuredImage || ""
  );
  const [introVideo, setIntroVideo] = useState<VideoInput | null>(
    lesson?.video || {}
  );
  const [lessonTitle, setLessonTitle] = useState(lesson?.title || "");
  const [showPreview, setShowPreview] = useState(lesson?.showPreview || false);

  const [imageUrl, setImageUrl] = useState<string | null>(
    lesson?.featuredImage || null
  );
  const [videoData, setVideoData] = useState<VideoInput>(lesson?.video || {});
  const [attachments, setAttachments] = useState<any>(
    lesson?.attachments || []
  );

  const [isImageModified, setIsImageModified] = useState(false);
  const [isVideoModified, setIsVideoModified] = useState(false);
  const [isAttachmentsModified, setIsAttachmentsModified] = useState(false);

  const [isUploadingAttachments, setIsUploadingAttachments] = useState(false);
  const [files, setFiles] = useState<FileData[]>([]);

  const [isUpdating, setIsUpdating] = useState(false);

  const [{}, updateLessonMutation] = useMutation<
    UpdateLessonMutation,
    UpdateLessonMutationVariables
  >(UpdateLessonDocument);

  useEffect(() => {
    setContent(lesson?.content || "");
    setVideoPreview(lesson?.video?.videoURL || "");
    setFeauteredImage(lesson?.featuredImage || "");
    setIntroVideo(lesson?.video || null);
    setLessonTitle(lesson?.title || "");
    setShowPreview(lesson?.showPreview || false);
    setImageUrl(lesson?.featuredImage || null);
    setVideoData(lesson?.video || {});

    if (lesson.attachments && lesson.attachments.length > 0) {
      setAttachments(lesson.attachments.filter(Boolean));
    }
  }, [lesson]);

  useEffect(() => {
    const buildFilesfromAttachments = async (): Promise<void> => {
      if (!lesson.attachments || lesson.attachments.length === 0) return;

      try {
        const filePromises = lesson.attachments?.map(
          async (url: string, index: number) => {
            if (!url) return null;

            const response = await fetch(url);
            const blob = await response.blob();

            const fileName = extractFilenameFromUrl(url);
            const file = new File([blob], fileName, { type: blob.type });

            return {
              file,
              name: fileName,
              size: file.size,
              type: file.type,
              url,
            };
          }
        );

        const filesArray = (await Promise.all(filePromises)).filter(Boolean);
        setFiles(filesArray as any);
      } catch (error) {
        // eslint-disable-next-line no-console -- just for debugging
        console.error("Error fetching attachments:", error);
      }
    };

    buildFilesfromAttachments();
  }, [lesson.attachments]);

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;

    if (selectedFile) {
      setVideo(selectedFile);
      setIsVideoModified(true);

      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setVideo(null);
      setVideoPreview("");
    }
  };

  const handleSubmitAttachments = async () => {
    if (files.length === 0) {
      toast.error("No files selected", {
        description: "Please select at least one file to upload.",
      });
      return;
    }

    setIsUploadingAttachments(true);
    setIsAttachmentsModified(true);
    try {
      const newFiles = files.filter((file) => !file.url as any);
      const uploadPromises = newFiles.map(async (fileData) => {
        const formData = new FormData();
        formData.append("file", fileData.file);
        formData.append("folder", "attachments");

        const response = await fetch(
          `${import.meta.env.VITE_API_TARGET}/api/files/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(`Failed to upload ${fileData.name}`);
        }

        return result;
      });

      const result = await Promise.all(uploadPromises);
      const uploadedUrls = result.map((item) => item.url);
      const existingUrls = attachments.filter(Boolean);
      const combinedAttachments = [...existingUrls, ...uploadedUrls];

      setAttachments(combinedAttachments);

      toast.success("Archivos subidos", {
        description: "Todos los adjuntos fueron subidos a la nube!",
      });

      setFiles([]);
      return combinedAttachments;
    } catch (error) {
      toast.error("Upload failed", {
        description:
          error instanceof Error ? error.message : "Failed to upload files",
      });
      return [];
    } finally {
      setIsUploadingAttachments(false);
    }
  };

  const onUpdateLesson = async (formData: FormData) => {
    try {
      setIsUpdating(true);
      let uploadedImageURL = imageUrl;
      let uploadedVideoData = videoData;
      let attachmentsData = [...attachments].filter(Boolean);

      if (image && isImageModified) {
        uploadedImageURL = await uploadFileToCloudinary(image, "image");
      }

      if (video && isVideoModified) {
        uploadedVideoData = await uploadFileToCloudinary(video, "video");
      }

      if (files.length > 0 && isAttachmentsModified) {
        attachmentsData = (await handleSubmitAttachments()) || [];
      } else {
        // Ensure we're using the existing attachments (with full URLs)
        attachmentsData = [...attachments].filter(Boolean);
      }

      let videoDataInfo: VideoInput | null = null;
      let imageDataInfo: string | null = null;

      if (isVideoModified) {
        videoDataInfo = {
          description: "",
          duration: parseInt(String(uploadedVideoData.duration)),
          format: uploadedVideoData.format,
          height: uploadedVideoData.height,
          width: uploadedVideoData.width,
          tags: uploadedVideoData.tags,
          //@ts-expect-error -- it is coming from cloudinary
          videoURL: String(uploadedVideoData.secure_url),
          source: "computer",
          type: uploadedVideoData.type,
        };
      } else {
        // We preserved the current video if video is not modified :)
        videoDataInfo = introVideo ? introVideo : null;
      }

      if (isImageModified) {
        imageDataInfo = uploadedImageURL;
      } else {
        imageDataInfo = feauteredImage ? feauteredImage : null;
      }

      const response = await updateLessonMutation({
        lessonId: lesson.id,
        input: {
          attachments: attachmentsData,
          content: content?.toString() || "",
          featuredImage: imageDataInfo,
          showPreview: Boolean(formData.get("showPreview")?.toString()),
          title: formData.get("title")?.toString() || "",
          video: {
            description: videoDataInfo?.description,
            duration: videoDataInfo?.duration,
            format: videoDataInfo?.format,
            height: videoDataInfo?.height,
            source: videoDataInfo?.source,
            tags: videoDataInfo?.tags,
            type: videoDataInfo?.type,
            videoURL: videoDataInfo?.videoURL,
            width: videoDataInfo?.width,
          },
        },
      });

      if (response.data) {
        toast.success("Leccion actualizada", {
          description: "La leccion fue actualizada correctamente.",
        });
        setIsUpdating(false);
        setOpen(false);
        setIsVideoModified(false);
      } else {
        setIsUpdating(false);
        toast.error("Ocurrio un problema al actualizar la leccion", {
          description: response.error?.message,
        });
      }
    } catch (error) {
      setIsUpdating(false);
      toast.error("Also sucedio al actualizar la leccion", {
        description: "Trata nuevamente mas tarde.",
      });
      throw new Error("Also sucedio al actualizar la leccion");
    }
  };

  return (
    <Drawer onOpenChange={setOpen} open={open} key={lesson.id}>
      <DrawerTrigger asChild>
        <Button size="icon" type="button" variant="ghost">
          <PencilIcon className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        onInteractOutside={(event) => {
          event.preventDefault();
        }}
        onPointerDownOutside={(event) => {
          event.preventDefault();
        }}
        onEscapeKeyDown={(event) => {
          event.preventDefault();
        }}
        className={cn(
          "w-11/12 gap-y-0 sm:pb-0 sm:px-0 sm:max-w-267.5 left-0 top-24! pt-0!",
          { "pointer-events-none": isUpdating }
        )}
      >
        <DrawerHeader
          className="px-6! pr-4! pt-4 items-center"
          containerClassName="pb-4 items-center bg-white"
          closeButtonClassName="mr-4 mt-4"
        >
          <DrawerTitle>Actualizar leccion</DrawerTitle>
        </DrawerHeader>

        <div className="h-full px-6 overflow-x-hidden overflow-y-auto">
          <form
            className="h-full"
            id="lessonEditor"
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              await onUpdateLesson(formData);
            }}
          >
            <div className="grid xl:grid-cols-[1fr_21.125rem] gap-6 w-full h-full">
              <div>
                <div className="py-5 pr-8 flex flex-col gap-6 xl:sticky top-0 z-10">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Titulo de la leccion</Label>
                    <Input
                      id="title"
                      name="title"
                      onChange={(e) => {
                        setLessonTitle(e.target.value);
                      }}
                      placeholder="Ingles avanzado 101"
                      value={lessonTitle}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="content">Contenido</Label>
                    <MinimalTiptapEditor
                      autofocus
                      className="w-full"
                      content={content}
                      editable
                      editorClassName="focus:outline-none"
                      editorContentClassName="p-5"
                      onChange={(value) => {
                        setContent(value);
                      }}
                      output="html"
                      placeholder="Ingresa el contendio de la leccion..."
                      value={content}
                    />
                    <input
                      name="content"
                      type="hidden"
                      value={content as string}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col xl:border-l xl:border-t-0 xl:border-border gap-6 py-5 xl:pl-8">
                <div className="items-center gap-3 grid grid-cols-2 xl:grid-cols-1 w-full">
                  {/* Introduction Video Upload Section */}
                  <div className="flex flex-col items-start gap-3">
                    <Label>Video de la lección</Label>
                    <Card className="flex items-center justify-center border-dashed w-full max-w-md min-h-64 xl:min-h-48 group">
                      {videoPreview ? (
                        <div className="relative w-full">
                          <video
                            className="rounded-xl object-fill w-full h-full max-h-64 min-h-64 xl:min-h-48"
                            controls
                            width="400"
                          >
                            <track default kind="captions" srcLang="en" />
                            <source
                              src={videoPreview || introVideo?.videoURL!}
                              type="video/mp4"
                            />
                            Your browser does not support HTML5 video.
                          </video>
                          <Button
                            className="top-2 right-2 absolute flex gap-2 bg-white/80 shadow-lg p-1 rounded-full w-9 text-gray-500 text-xs"
                            onClick={() => {
                              setVideo(null);
                              setVideoPreview("");
                              setIsVideoModified(false);
                              setIntroVideo(null);
                              if (inputRefVideo.current) {
                                inputRefVideo.current.value = "";
                              }
                            }}
                            type="button"
                          >
                            <X className="w-4 h-4" />
                            <span className="sr-only">Eliminar video</span>
                          </Button>
                        </div>
                      ) : (
                        <CardContent className="pt-6">
                          <div className="flex flex-col justify-center items-center gap-3">
                            <Button
                              onClick={() => inputRefVideo.current?.click()}
                              type="button"
                            >
                              <VideoIcon className="mr-2 size-5" />
                              Agregar video
                            </Button>
                            <p className="text-center text-xs">
                              formatos MP4 y WebM, con tamaños de hasta 50 MB
                            </p>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                    <input
                      accept="video/mp4,video/webm"
                      hidden
                      id="introVideoFile"
                      name="introVideoFile"
                      onChange={handleVideoChange}
                      ref={inputRefVideo}
                      type="file"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Archivos de ejercicio</Label>
                  <UploadAttachment
                    files={files}
                    handleSubmit={handleSubmitAttachments}
                    initialAttachments={attachments}
                    setFiles={setFiles}
                    setInitialAttachments={setAttachments}
                    setIsAttchmentModified={setIsAttachmentsModified}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Vista previa de la lección</Label>
                    <div className="text-sm text-muted-foreground">
                      Habilitar el modo de vista previa
                    </div>
                  </div>
                  <Switch
                    checked={showPreview}
                    id="showPreview"
                    name="showPreview"
                    onCheckedChange={(value) => {
                      setShowPreview(value);
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <DrawerFooter className="border-t bg-white bottom-0 border-border px-6 py-4">
          <DrawerClose asChild>
            <Button type="button" variant="neutral">
              Cancelar
            </Button>
          </DrawerClose>
          <Button
            // disabled={!lessonTitle.length || !content?.length || !video}
            form="lessonEditor"
            type="submit"
          >
            Guardar cambios
          </Button>
        </DrawerFooter>

        <div
          className={cn("hidden absolute inset-0 bg-muted-foreground/40 z-10", {
            "flex justify-center": isUpdating,
          })}
        >
          <PageLoader className="h-full" loadingLabel="Guardando cambios..." />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
