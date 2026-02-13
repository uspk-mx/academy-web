import type { Content } from "@tiptap/react";
import { VideoIcon, X } from "lucide-react";
import { type ReactNode, useRef, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "urql";
import { PageLoader } from "ui/components/admin/page-loader";
import type { FileData } from "ui/components/admin/upload-attachments";
import { UploadAttachment } from "ui/components/admin/upload-attachments";
import { MinimalTiptapEditor } from "ui/components/minimal-tiptap-editor/minimal-tiptap";
import { Button } from "ui/components/button";
import { Card, CardContent } from "ui/components/card";
import { DrawerClose, DrawerFooter } from "ui/components/drawer";
import { Input } from "ui/components/input";
import { Label } from "ui/components/label";
import { Switch } from "ui/components/switch";
import { useTopicContent } from "ui/context/topic-content-context";
import { CreateLessonDocument } from "gql-generated/gql/graphql";
import type {
  CreateLessonMutation,
  CreateLessonMutationVariables,
  LessonsByTopicIdQuery,
  VideoInput,
} from "gql-generated/generated/types";
import { uploadFileToCloudinary } from "ui/lib/cloudinary";
import { cn } from "ui/lib/utils";

export function CreateLessonForm({
  topicId,
  lessons,
  onCloseDrawer,
}: {
  topicId: string;
  lessons: LessonsByTopicIdQuery["lessonsByTopicId"];
  onCloseDrawer: () => void;
}): ReactNode {
  const [content, setContent] = useState<Content>("");
  const { content: topicContent, setContent: setTopicContent } =
    useTopicContent();

  const inputRefImage = useRef<HTMLInputElement | null>(null);
  const inputRefVideo = useRef<HTMLInputElement | null>(null);

  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [feauteredImage, setFeauteredImage] = useState("");
  const [introVideo, setIntroVideo] = useState<VideoInput>({});
  const [lessonTitle, setLessonTitle] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lessonData, setLessonData] = useState(lessons || []);

  const [, createLessonMutation] = useMutation<
    CreateLessonMutation,
    CreateLessonMutationVariables
  >(CreateLessonDocument);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<VideoInput>({});
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [attachments, setAttachments] = useState<any>([]);

  const [isImageModified, setIsImageModified] = useState(false);
  const [isVideoModified, setIsVideoModified] = useState(false);

  const [isUploadingAttachments, setIsUploadingAttachments] = useState(false);
  const [files, setFiles] = useState<FileData[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;

    if (selectedFile) {
      setImage(selectedFile);
      setIsImageModified(true);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImage(null);
      setImagePreview("");
    }
  };

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

      setVideoData({});
    } else {
      setVideo(null);
      setVideoPreview("");
      setVideoData({});
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
    try {
      const uploadPromises = files.map(async (fileData) => {
        const formData = new FormData();
        formData.append("file", fileData.file);
        formData.append("folder", "attachments");

        const response = await fetch(
          //@ts-ignore
          `${import.meta.env.VITE_API_TARGET}/api/files/upload`,
          {
            method: "POST",
            body: formData,
          },
        );

        const result = await response.json();
        return result;
      });

      const result = await Promise.all(uploadPromises);
      const uploadedUrls = result.map((item) => item.url);
      setAttachments(uploadedUrls);
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
      setIsUploadingAttachments(false);
    }
  };

  const onCreateLesson = async (formData: FormData) => {
    try {
      setIsSaving(true);
      let uploadedImageURL = imageUrl;
      let uploadedVideoData = videoData;
      let attachmentsData = attachments;

      if (image) {
        uploadedImageURL = await uploadFileToCloudinary(image, "image");
      }

      if (video) {
        uploadedVideoData = await uploadFileToCloudinary(video, "video");
        setVideoData({ ...uploadedVideoData });
      }

      if (files.length > 0) {
        attachmentsData = await handleSubmitAttachments();
      }

      const videoDataInfo: VideoInput = {
        description: "",
        duration: Number.parseInt(String(uploadedVideoData.duration)),
        format: uploadedVideoData.format,
        height: uploadedVideoData.height,
        width: uploadedVideoData.width,
        tags: uploadedVideoData.tags,
        // @ts-ignore
        videoURL: String(uploadedVideoData.secure_url), // Ensure this is correct
        source: "computer",
        type: uploadedVideoData.type,
      };

      const response = await createLessonMutation({
        input: {
          attachments: attachmentsData,
          content: content?.toString() || "",
          featuredImage: uploadedImageURL,
          position: lessons.length + 1,
          showPreview: Boolean(formData.get("showPreview")?.toString()),
          title: formData.get("title")?.toString() || "",
          video: videoDataInfo,
          topicId,
        },
      });

      if (response.data?.createLesson) {
        toast.success("Leccion creada", {
          description: "La leccion fue creada correctamente.",
        });
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        setLessonData((prev) => [...prev, response.data!.createLesson]);
        setTopicContent([...topicContent, response.data?.createLesson]);

        // Reset state after successful creation
        setContent("");
        setImage(null);
        setVideo(null);
        setImagePreview("");
        setVideoPreview("");
        setFeauteredImage("");
        setIntroVideo({});
        setLessonTitle("");
        setShowPreview(false);
        setFiles([]);
        setAttachments([]);
        setIsImageModified(false);
        setIsVideoModified(false);

        setIsSaving(false);
        onCloseDrawer();
      } else {
        setIsSaving(false);
        toast.error("Ocurrio un problema al crear la leccion", {
          description: response.error?.message,
        });
      }
    } catch (error) {
      setIsSaving(false);
      toast.error("Also sucedio al crear la leccion", {
        description: "Trata nuevamente mas tarde.",
      });
      throw new Error("Also sucedio al crear la leccion");
    }
  };

  return (
    <>
      <div className="h-full px-6 overflow-x-hidden overflow-y-auto">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            onCreateLesson(formData);
          }}
          className="h-full"
          id="lessonCreator"
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
                {/* <div className="flex flex-col items-start gap-3">
                  <Label>Imagen destacada</Label>
                  <Card className="border-dashed w-full max-w-md min-h-42 group">
                    {imagePreview || feauteredImage ? (
                      <div className="relative w-full">
                        <img
                          alt="Featured"
                          className="rounded-xl w-full max-w-full max-h-64 min-h-48 object-cover"
                          src={imagePreview || feauteredImage}
                        />
                        <Button
                          className="top-2 right-2 absolute flex gap-2 bg-white/80 shadow-lg p-1 rounded-full w-9 text-gray-500 text-xs"
                          onClick={() => {
                            setFeauteredImage("");
                            setImage(null);
                            setImagePreview("");
                            setIsImageModified(false);
                            if (inputRefImage.current) {
                              inputRefImage.current.value = "";
                            }
                          }}
                          type="button"
                        >
                          <X className="w-4 h-4" />
                          <span className="sr-only">Eliminar imagen</span>
                        </Button>
                      </div>
                    ) : (
                      <CardContent className="pt-6">
                        <div className="flex flex-col justify-center items-center gap-3">
                          <ImagePlusIcon className="group-hover:text-blue-700" />
                          <Button
                            onClick={() => inputRefImage.current?.click()}
                            type="button"
                          >
                            Subir imagen destacada
                          </Button>
                          <p className="text-center text-xs">
                            formatos JPEG, PNG, GIF, y WebP con tamaños de hasta
                            2 MB
                          </p>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                  <input
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    hidden
                    id="featuredImageFile"
                    name="featuredImageFile"
                    onChange={handleImageChange}
                    ref={inputRefImage}
                    type="file"
                  />
                </div> */}

                {/* Introduction Video Upload Section */}
                <div className="flex flex-col items-start gap-3">
                  <Label>Video de la lección</Label>
                  <Card className="flex items-center border-dashed w-full max-w-md min-h-48 group">
                    {videoPreview ? (
                      <div className="relative w-full">
                        <video
                          className="rounded-xl object-fill w-full h-full max-h-64 min-h-48"
                          controls
                          width="400"
                        >
                          <track default kind="captions" srcLang="en" />
                          <source
                            // biome-ignore lint/style/noNonNullAssertion: <explanation>
                            src={videoPreview || introVideo.videoURL!}
                            type="video/mp4"
                          />
                          Your browser does not support HTML5 video.
                        </video>
                        <Button
                          className="top-2 right-2 absolute flex gap-2 bg-white/80 shadow-lg p-1 rounded-full w-9 text-gray-500 text-xs"
                          onClick={() => {
                            setIntroVideo({});
                            setVideo(null); // Clear video state
                            setVideoPreview(""); // Clear preview
                            setIsVideoModified(false);
                            if (inputRefVideo.current) {
                              inputRefVideo.current.value = ""; // Reset file input
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
                  setFiles={setFiles}
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
      <div
        className={cn("hidden absolute inset-0 bg-muted-foreground/40 z-10", {
          "flex justify-center": isSaving,
        })}
      >
        <PageLoader className="h-full" loadingLabel="Guardando cambios..." />
      </div>
      <DrawerFooter className="border-t bottom-0 sm:justify-between bg-background border-border px-6 py-4">
        <DrawerClose asChild>
          <Button type="button" variant="neutral">
            Cancelar
          </Button>
        </DrawerClose>
        <Button
          form="lessonCreator"
          type="submit"
          disabled={!lessonTitle.length || !content?.length}
        >
          Guardar cambios
        </Button>
      </DrawerFooter>
    </>
  );
}
