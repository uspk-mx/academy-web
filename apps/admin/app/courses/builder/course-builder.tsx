import {
  EyeIcon,
  ImagePlusIcon,
  InfoIcon,
  LoaderCircle,
  Settings2,
  Shield,
  Users2,
  VideoIcon,
  X,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Link, redirect, useParams } from "react-router";
import { useMutation, useQuery } from "urql";
import { ScheduleSelector } from "ui/components/admin/courses/builder/schedule-selector";
import { CourseEnrollments } from "ui/components/admin/courses/enrollments/course-enrollments";
import { PageLoader } from "ui/components/admin/page-loader";
import { UserSelector } from "ui/components/admin/user-selector";
import MinimalTiptapEditor from "ui/components/minimal-tiptap-editor/minimal-tiptap";
import { Badge } from "ui/components/badge";
import { Button } from "ui/components/button";
import { Card, CardContent, CardHeader } from "ui/components/card";
import { Input } from "ui/components/input";
import { Label } from "ui/components/label";
import { PriceInput } from "ui/components/price-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "ui/components/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui/components/tabs";
import { TagInput } from "ui/components/tag-input";
import { Textarea } from "ui/components/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "ui/components/tooltip";
import { useBuilderDispatch, useBuilderState } from "ui/context/builder-context";
import { useBuilderNav } from "ui/context/builder-nav-context";
import {
  AssignInstructorDocument,
  CourseDocument,
  CourseIntroVideoDocument,
  GetCategoriesDocument,
  GetLevelsDocument,
  InternalUsersDocument,
  UnassignInstructorDocument,
} from "gql-generated/generated/bff.sdk";
import {
  type AssignInstructorMutation,
  type AssignInstructorMutationVariables,
  type CourseIntroVideoQuery,
  type CourseIntroVideoQueryVariables,
  type CourseQuery,
  type CourseQueryVariables,
  type GetCategoriesQuery,
  type GetCategoriesQueryVariables,
  type GetLevelsQuery,
  type GetLevelsQueryVariables,
  type InternalUsersQuery,
  type InternalUsersQueryVariables,
  type UnassignInstructorMutation,
  type UnassignInstructorMutationVariables,
  type VideoInput,
  Visibility,
} from "gql-generated/generated/types";
import { PricingType } from "gql-generated/gql/graphql";
import { useCharacterLimit } from "ui/hooks/use-character-limit";
import { useFileUpload } from "ui/hooks/use-file-upload";
import { uploadFileToCloudinary } from "ui/lib/cloudinary";
import { timeSlots } from "./utils";

export function meta() {
  return [
    { title: "Uspk Academy | Course Builder" },
    { name: "description", content: "Uspk Academy course builder" },
  ];
}

export const loader = async ({ request }: { request: Request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = Object.fromEntries(
    cookieHeader?.split("; ").map((cookie) => cookie.split("=")) || []
  );

  const sessionToken = cookies.session_token;

  if (!sessionToken) {
    // Redirect to login if session token is missing
    return redirect("/login");
  }

  return null;
};

export default function CourseBuilder() {
  const { cid } = useParams();
  const [{ data: courseData, fetching }, refetchCourseData] = useQuery<
    CourseQuery,
    CourseQueryVariables
  >({ query: CourseDocument, variables: { courseId: cid || "" } });

  const [{ data: categories }] = useQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >({ query: GetCategoriesDocument });
  const [{ data: levels }] = useQuery<GetLevelsQuery, GetLevelsQueryVariables>({
    query: GetLevelsDocument,
  });

  const [{ data: users }] = useQuery<
    InternalUsersQuery,
    InternalUsersQueryVariables
  >({ query: InternalUsersDocument });

  const [, assignInstructorMutation] = useMutation<
    AssignInstructorMutation,
    AssignInstructorMutationVariables
  >(AssignInstructorDocument);

  const [{ fetching: isDeleting }, unassignInstructorMutation] = useMutation<
    UnassignInstructorMutation,
    UnassignInstructorMutationVariables
  >(UnassignInstructorDocument);

  const formRef = useRef<HTMLFormElement>(null);
  const sectionState = useBuilderState();

  const {
    description,
    date,
    time,
    pricingModel,
    tags,
    selectedAuthor,
    selectedCategory,
    selectedLevel,
    coursePrice,
    discountedPrice,
    title,
    // characterCount,
    featuredImage: featuredImageData,
    introVideo: introVideoData,
    maxEnrollments,
    visibility,
  } = sectionState;

  const [isImageModified, setIsImageModified] = useState(false);
  const [isVideoModified, setIsVideoModified] = useState(false);

  const [{ data: courseIntroVideo }] = useQuery<
    CourseIntroVideoQuery,
    CourseIntroVideoQueryVariables
  >({
    query: CourseIntroVideoDocument,
    variables: { courseId: courseData?.course.id || "" },
  });

  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<VideoInput | null>(null);
  const inputRefImage = useRef<HTMLInputElement | null>(null);
  const inputRefVideo = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [flags, setFlags] = useState({ isSchedulerEnabled: false });
  const [isSaving, setIsSaving] = useState(false);

  const dispatch = useBuilderDispatch();

  const [
    {
      file: featuredImage,
      preview: previewImage,
      uploading: isUploadingImage,
      uploadComplete: isImageUploadComplete,
      cloudResponse: imageCloudResponse,
      // inputRef: inputRefImage,
      fileUrl: featuredImageUrl,
    },
    {
      uploadFile,
      handleFileChange: originalHandleImageChange,
      setFile: setFeaturedImage,
      setPreview: setPreviewImage,
    },
  ] = useFileUpload();

  const [
    {
      file: introVideo,
      preview: introVideoPreview,
      uploading: isUploadingVideo,
      uploadComplete: isVideoUploadComplete,
      cloudResponse: videoCloudResponse,
      // inputRef: inputRefVideo,
      fileUrl: introVideoUrl,
    },
    {
      uploadFile: uploadVideoFile,
      handleFileChange: handleFileChangeVideo,
      setFile: setIntroVideo,
      setPreview: setPreviewVideo,
    },
  ] = useFileUpload();

  const id = useId();
  const maxLength = 60;
  const shortDescriptionMaxLength = 255

  const {
    value,
    maxLength: limit,
    handleChange,
    setValue,
    characterCount,
    setCharacterCount,
  } = useCharacterLimit({
    maxLength,
    initialValue: "",
  });

    const {
    value: shortDescriptionValue,
    maxLength: shortDescriptionLimit,
    handleChange: handleShortDescriptionChange,
    setValue: setShortDescriptionValue,
    characterCount: shortDescriptionCharecterCount,
    setCharacterCount: setShortDescriptionCharecterCount,
  } = useCharacterLimit({
    maxLength: shortDescriptionMaxLength,
    initialValue: "",
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // Early return if no course data
    if (!courseData?.course) return;

    const { course } = courseData;

    if (course?.featuredImage) {
      setPreviewImage(course.featuredImage);
    }

    if (course?.video?.videoURL) {
      setVideoPreview(course.video.videoURL);
    }

    if (course.featuredImage) {
      setImagePreview(course.featuredImage);
    }

    // Update form fields with course data
    if (course.title) {
      setValue(course.title);
      setCharacterCount(course.title.length);
      dispatch({ type: "SET_TITLE", payload: course.title });
    }

    if (courseIntroVideo && isVideoModified) {
      const updatedVideoObject: VideoInput = {
        description: "",
        duration: Number.parseInt(String(courseIntroVideo.courseIntroVideo?.duration)),
        format: courseIntroVideo.courseIntroVideo?.format,
        height: courseIntroVideo.courseIntroVideo?.height,
        // @ts-ignore
        source: courseIntroVideo.courseIntroVideo?.resource_type,
        tags: courseIntroVideo.courseIntroVideo?.tags,
        type: courseIntroVideo.courseIntroVideo?.type,
        // @ts-ignore
        videoURL: courseIntroVideo.courseIntroVideo?.secure_url,
        width: courseIntroVideo.courseIntroVideo?.width,
      };

      dispatch({ type: "SET_INTRO_VIDEO", payload: updatedVideoObject });
    }
    if (course.maxEnrollments) {
      dispatch({ type: "SET_MAX_ENROLLMENTS", payload: course.maxEnrollments });
    }

    if (course.video) {
      dispatch({ type: "SET_INTRO_VIDEO", payload: course.video });
    }

    if (imageUrl && isImageModified) {
      dispatch({ type: "SET_FEATURED_IMAGE", payload: imageUrl });
    }

    if (course.category?.id) {
      dispatch({ type: "SET_CATEGORY", payload: course.category.id });
    }

    if (course.level?.id) {
      dispatch({ type: "SET_LEVEL", payload: course.level.id });
    }

    if (course.description) {
      dispatch({ type: "SET_DESCRIPTION", payload: course.description });
    }

    if (course.shortDescription) {
      setShortDescriptionValue(course.shortDescription);
      setShortDescriptionCharecterCount(course.shortDescription.length);
      dispatch({
        type: "SET_SHORT_DESCRIPTION",
        payload: course.shortDescription,
      });
    }

    if (course.visibility) {
      dispatch({ type: "SET_VISIBILITY", payload: course.visibility });
    }

    // Handle pricing model and course price
    if (course.pricingType) {
      dispatch({ type: "SET_PRICING_MODEL", payload: course.pricingType });
    }
    
    if (course.price !== null && course.price !== undefined) {  
      dispatch({ type: "SET_COURSE_PRICE", payload: course.price });
    }

    if (course?.tags) {
      dispatch({ type: "SET_TAGS", payload: course.tags });
    }
  }, [
    courseData?.course,
    setValue,
    setCharacterCount,
    setShortDescriptionValue,
    setShortDescriptionCharecterCount,
    dispatch,
  ]);

  useEffect(() => {
    if (users?.internalUsers && courseData?.course.creatorID) {
      const creator = users.internalUsers.find(
        (user) => user?.id === courseData.course.creatorID
      );
      if (creator?.id) {
        dispatch({ type: "SET_AUTHOR", payload: creator.id });
      }
    }
  }, [users?.internalUsers, courseData?.course.creatorID, dispatch]);

  // Combine date and time values into a single datetime
  const scheduledDateTime =
    time && date
      ? new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          Number.parseInt(time.split(":")[0]),
          Number.parseInt(time.split(":")[1])
        )
      : date;

  const { formId, onSubmitForm, isSubmitting } = useBuilderNav();

  const onUpdateCourse = async () => {
    try {
      let uploadedImageUrl = imageUrl;
      let uploadedVideoData = videoData;
      setIsSaving(true);

      if (image) {
        uploadedImageUrl = await uploadFileToCloudinary(image, "image");
      }
      if (video) {
        uploadedVideoData = await uploadFileToCloudinary(video, "video");
      }

      const videoDataInfo: VideoInput = {
        description: "",
        duration: Number.parseInt(String(uploadedVideoData?.duration)),
        format: uploadedVideoData?.format,
        height: uploadedVideoData?.height,
        width: uploadedVideoData?.width,
        tags: uploadedVideoData?.tags,
        // @ts-ignore
        videoURL: uploadedVideoData?.secure_url,
        source: "computer",
        type: uploadedVideoData?.type,
      };

      if (isVideoModified) {
        setIsVideoModified(false);
      }

      const price = pricingModel === PricingType.Free ? 0 : coursePrice;

      await onSubmitForm?.({
        title: value,
        shortDescription: shortDescriptionValue,
        description: description?.toString(),
        maxEnrollments: maxEnrollments,
        categoryId: selectedCategory,
        levelId: selectedLevel,
        visibility: visibility,
        scheduledPublishAt: scheduledDateTime,
        pricingType: pricingModel,
        featuredImage:
          uploadedImageUrl ||
          featuredImageData ||
          courseData?.course.featuredImage,
        video:
          videoDataInfo || courseIntroVideo?.courseIntroVideo || introVideoData,
        price: price ? Number(price) : null,
        discountedPrice: discountedPrice ? Number(discountedPrice) : null,
        tags: tags,
        creatorId: selectedAuthor,
      });
      setIsSaving(false);
    } catch (error) {
      console.error("Error during form submission:", error);
      setIsSaving(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;

    if (selectedFile) {
      setImage(selectedFile);
      setIsImageModified(true);

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
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
      reader.onloadend = () => setVideoPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setVideo(null);
      setVideoPreview("");
    }
  };

  if (fetching || isSaving) {
    return (
      <PageLoader loadingLabel={isSaving ? "Guardando cambios" : "Cargando"} />
    );
  }

  return (
    <div className="flex bg-background mx-auto w-full max-w-full xl:max-w-[1006px] min-h-[calc(-64px+100vh)]">
      <form
        id={formId}
        onSubmit={async (event) => {
          event.preventDefault();
          onUpdateCourse();
        }}
        ref={formRef}
        className="w-full"
        hidden
      />
      <div className="gap-0 xl:gap-8 grid xl:grid-cols-[1fr_338px] w-full">
        {/* Left column */}
        <div className="top-16 xl:sticky pt-8 pb-6 self-start">
          <div className="flex flex-col gap-6">
            {/* Form elements */}

            <div className="space-y-2">
              <Label htmlFor={id}>Titulo</Label>
              <div className="relative">
                <Input
                  id={id}
                  className="pe-14 peer"
                  type="text"
                  name="title"
                  value={value}
                  maxLength={maxLength}
                  onChange={handleChange}
                  aria-describedby={`${id}-description`}
                />
                <output
                  id={`${id}-description`}
                  className="absolute inset-y-0 flex justify-center items-center peer-disabled:opacity-50 text-muted-foreground text-xs pointer-events-none end-0 pe-3 tabular-nums"
                  aria-live="polite"
                >
                  {characterCount}/{limit}
                </output>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={id}>Descripcion corta</Label>
              <div className="relative">
                <Textarea
                  id={id}
                  className="pe-14 peer"
                  name="shortDescription"
                  value={shortDescriptionValue}
                  maxLength={shortDescriptionMaxLength}
                  onChange={handleShortDescriptionChange}
                  aria-describedby={`${id}-sortDescription`}
                />
                <output
                  id={`${id}-sortDescription`}
                  className="mt-4 flex justify-end items-center peer-disabled:opacity-50 text-muted-foreground text-xs pointer-events-none end-0 pe-3 tabular-nums"
                  aria-live="polite"
                >
                  Caracteres: {shortDescriptionCharecterCount}/
                  {shortDescriptionLimit}
                </output>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={id}>Descripcion</Label>
              <MinimalTiptapEditor
                value={description}
                onChange={(value) =>
                  dispatch({ type: "SET_DESCRIPTION", payload: value })
                }
                className="w-full"
                editorContentClassName="p-5"
                output="html"
                placeholder="Type your description here..."
                autofocus={true}
                editable={true}
                editorClassName="focus:outline-none"
              />
              <input
                type="hidden"
                name="description"
                value={description as string}
              />
            </div>

            <div className="flex flex-col items-start gap-2 w-full">
              <Label>Opciones</Label>
              <Card className="w-full">
                <Tabs defaultValue="general">
                  <CardHeader className="p-0">
                    <TabsList className="justify-start gap-2 bg-transparent mb-3 px-0 py-1 border-b border-border rounded-none h-auto text-foreground">
                      <TabsTrigger
                        value="general"
                        className="relative after:bottom-0 after:absolute after:inset-x-0 data-[state=active]:after:bg-primary hover:bg-accent data-[state=active]:hover:bg-accent data-[state=active]:bg-transparent data-[state=active]:shadow-none after:-mb-1 after:h-0.5 hover:text-foreground"
                      >
                        <Settings2
                          className="opacity-60 -ms-0.5 me-1.5"
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        General
                      </TabsTrigger>
                      <TabsTrigger
                        value="instructors"
                        className="relative after:bottom-0 after:absolute after:inset-x-0 data-[state=active]:after:bg-primary hover:bg-accent data-[state=active]:hover:bg-accent data-[state=active]:bg-transparent data-[state=active]:shadow-none after:-mb-1 after:h-0.5 hover:text-foreground"
                      >
                        <Users2
                          className="opacity-60 -ms-0.5 me-1.5"
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        Instructores
                        <Badge
                          className="justify-center px-px min-w-5 h-5 ms-1.5"
                          variant="dark"
                          shape="rounded"
                        >
                          {
                            courseData?.course.instructors?.filter(
                              (item) => item.isActive
                            ).length
                          }
                        </Badge>
                      </TabsTrigger>
                    </TabsList>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 pt-0">
                    <TabsContent value="general">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Label htmlFor={id}>Maximos estudiantes</Label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InfoIcon className="w-4 h-4" />
                            </TooltipTrigger>
                            <TooltipContent className="py-3 max-w-xs">
                              <div className="flex gap-3">
                                <div className="space-y-1">
                                  <p className="text-xs">
                                    El numero maximo de estudiantes que puedes
                                    tener en tu curso. Si no especificas este
                                    valor, el curso no tiene límite de
                                    estudiantes.
                                  </p>
                                </div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </div>

                        <Input
                          id={id}
                          placeholder="0"
                          type="number"
                          name="maxEnrollments"
                          value={maxEnrollments}
                          onChange={(event) =>
                            dispatch({
                              type: "SET_MAX_ENROLLMENTS",
                              payload: Number.parseInt(event.target.value),
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center gap-4 mt-6 w-full">
                        <div className="flex flex-col items-start gap-2 w-full">
                          <div className="flex items-center gap-3">
                            <Label htmlFor={id}>Nivel del curso</Label>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <InfoIcon className="w-4 h-4" />
                              </TooltipTrigger>
                              <TooltipContent className="py-3 max-w-xs">
                                <div className="flex gap-3">
                                  <div className="space-y-1">
                                    <p className="text-xs">
                                      El nivel de dificultad del curso.
                                    </p>
                                  </div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <Select
                            value={selectedLevel}
                            onValueChange={(value) =>
                              dispatch({ type: "SET_LEVEL", payload: value })
                            }
                            name="level"
                          >
                            <SelectTrigger id={id}>
                              <SelectValue placeholder="Seleciona un nivel" />
                            </SelectTrigger>
                            <SelectContent>
                              {levels?.getLevels.map((level) => (
                                <SelectItem value={level.id} key={level.id}>
                                  {level.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col items-start gap-2 w-full">
                          <div className="flex items-center gap-3">
                            <Label htmlFor={id}>Categoria del curso</Label>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <InfoIcon className="w-4 h-4" />
                              </TooltipTrigger>
                              <TooltipContent className="py-3 max-w-xs">
                                <div className="flex gap-3">
                                  <div className="space-y-1">
                                    <p className="text-xs">
                                      La categoria del curso
                                    </p>
                                  </div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <Select
                            value={selectedCategory}
                            onValueChange={(value) =>
                              dispatch({
                                type: "SET_CATEGORY",
                                payload: value,
                              })
                            }
                            name="category"
                          >
                            <SelectTrigger id={id}>
                              <SelectValue placeholder="Selecciona una categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories?.getCategories.map((category) => (
                                <SelectItem
                                  value={category.id}
                                  key={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="instructors">
                      <div className="space-y-2 w-full">
                        <Label>Instructores</Label>
                        <CourseEnrollments
                          users={users?.internalUsers || []}
                          enrollments={
                            courseData?.course.instructors?.filter(
                              (item) => item.isActive
                            ) || []
                          }
                          onDeleteUser={unassignInstructorMutation}
                          isDeleting={isDeleting}
                          onAssingInstructor={assignInstructorMutation}
                          refecthEnrollments={refetchCourseData}
                        />
                      </div>
                    </TabsContent>
                  </CardContent>
                </Tabs>
              </Card>
            </div>
          </div>
          {/* Stepper actions */}
          <div className="lg:flex justify-end items-center gap-4 hidden mt-10 w-full h-8">
            <Button
              variant="neutral"
              className="aria-disabled:opacity-50 aria-disabled:pointer-events-none"
              // aria-disabled={currentPage === totalPages ? true : undefined}
              // role={currentPage === totalPages ? "link" : undefined}
              asChild
            >
              <Link
                // href={currentPage === totalPages ? undefined : `#/page/${currentPage + 1}`}
                to={`/courses/${cid}/curriculum`}
              >
                Siguiente
              </Link>
            </Button>
          </div>
        </div>
        {/* Right column */}
        <div className="flex flex-col gap-4 py-6 lg:pl-8 border-t border-t-border lg:border-t-0 lg:border-l-border lg:border-l min-h-[calc(-64px+100vh)]">
          {/* Form columns */}
          <div className="space-y-2">
            <Label htmlFor={id}>Visibilidad</Label>
            <Select
              value={visibility}
              onValueChange={(value) =>
                dispatch({
                  type: "SET_VISIBILITY",
                  payload: value as Visibility,
                })
              }
            >
              <SelectTrigger
                id={id}
                className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80"
                name="visibility"
              >
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
                <SelectItem value={Visibility.Public}>
                  <EyeIcon size={16} aria-hidden="true" />
                  <span className="truncate">Publico</span>
                </SelectItem>
                {/* TODO: Implement password protected feature for later use */}
                {/* <SelectItem value="PASSWORD_PROTECTED">
                  <LockIcon size={16} aria-hidden="true" />
                  <span className="truncate">Protegido por contraseña</span>
                </SelectItem> */}
                <SelectItem value={Visibility.Private}>
                  <Shield size={16} aria-hidden="true" />
                  <span className="truncate">Privado</span>
                </SelectItem>
              </SelectContent>
            </Select>
            <p
              className="mt-2 text-muted-foreground text-xs"
              // biome-ignore lint/a11y/useSemanticElements: <explanation>
              role="region"
              aria-live="polite"
            >
              Selecciona como se mostrará el curso
            </p>
          </div>
          {flags.isSchedulerEnabled ? (
            <ScheduleSelector
              date={date as Date}
              setDate={(date) => dispatch({ type: "SET_DATE", payload: date })}
              time={time}
              setTime={(time) => dispatch({ type: "SET_TIME", payload: time })}
              timeSlots={timeSlots}
            />
          ) : null}

          <div className="items-center gap-3 grid grid-cols-2 xl:grid-cols-1 w-full">
            <div className="flex flex-col items-start gap-3">
              <Label>Imagen destacada</Label>
              <Card className="border-dashed w-full max-w-md min-h-42 group">
                {isUploadingImage && (
                  <LoaderCircle
                    aria-hidden="true"
                    className="animate-spin -ms-1 me-2"
                    size={16}
                    strokeWidth={2}
                  />
                )}

                {imagePreview || featuredImageData ? (
                  <div className="relative w-full">
                    <img
                      src={imagePreview || featuredImageData}
                      alt="Featured"
                      className="rounded-xl w-full max-w-full max-h-64 min-h-48 object-cover"
                    />
                    <Button
                      className="top-2 right-2 absolute flex gap-2 bg-white/80 shadow-lg p-1 rounded-full w-9 text-gray-500 text-xs"
                      type="button"
                      onClick={() => {
                        dispatch({ type: "SET_FEATURED_IMAGE", payload: "" }); // Clear Redux state
                        setImage(null); // Clear the file state
                        setImagePreview(""); // Clear the preview
                        setIsImageModified(false); // Reset modification flag
                        if (inputRefImage.current) {
                          inputRefImage.current.value = ""; // Reset file input
                        }
                      }}
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
                        type="button"
                        onClick={() => inputRefImage.current?.click()}
                      >
                        Subir imagen destacada
                      </Button>
                      <p className="text-center text-xs">
                        formatos JPEG, PNG, GIF, y WebP con tamaños de hasta 2
                        MB
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
              <input
                type="file"
                ref={inputRefImage}
                hidden
                name="featuredImageFile"
                id="featuredImageFile"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleImageChange}
              />
            </div>

            {/* Introduction Video Upload Section */}
            <div className="flex flex-col items-start gap-3">
              <Label>Video de introducción</Label>
              <Card className="flex items-center border-dashed w-full max-w-md min-h-48 group">
                {videoPreview ? (
                  <div className="relative w-full">
                    <video
                      width="400"
                      controls
                      className="rounded-xl object-fill w-full h-full max-h-64 min-h-48"
                    >
                      <track kind="captions" />
                      <source
                        src={
                          videoPreview || (introVideoData?.videoURL as string)
                        }
                        type="video/mp4"
                      />
                      Your browser does not support HTML5 video.
                    </video>
                    <Button
                      className="top-2 right-2 absolute flex gap-2 bg-white/80 shadow-lg p-1 rounded-full w-9 text-gray-500 text-xs"
                      type="button"
                      onClick={() => {
                        dispatch({
                          type: "SET_INTRO_VIDEO",
                          payload: undefined,
                        });
                        setVideo(null); // Clear video state
                        setVideoPreview(""); // Clear preview
                        setIsVideoModified(false);
                        if (inputRefVideo.current) {
                          inputRefVideo.current.value = ""; // Reset file input
                        }
                      }}
                    >
                      <X className="w-4 h-4" />
                      <span className="sr-only">Eliminar video</span>
                    </Button>
                  </div>
                ) : (
                  <CardContent className="pt-6">
                    <div className="flex flex-col justify-center items-center gap-3">
                      <Button
                        type="button"
                        onClick={() => inputRefVideo.current?.click()}
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
                type="file"
                ref={inputRefVideo}
                hidden
                name="introVideoFile"
                id="introVideoFile"
                accept="video/mp4,video/webm"
                onChange={handleVideoChange}
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-3">
            <Label>Modelo de pago</Label>
            <Select
              onValueChange={(value) =>
                dispatch({
                  type: "SET_PRICING_MODEL",
                  payload: value as PricingType,
                })
              }
              value={pricingModel}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un modelo de pago" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={PricingType.Free} id={`${id}-1`}>
                    Gratis
                  </SelectItem>
                  <SelectItem value={PricingType.Paid} id={`${id}-2`}>
                    Pagado
                  </SelectItem>
                  <SelectItem value={PricingType.Custom} id={`${id}-3`}>
                    Personalizado
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {pricingModel === PricingType.Paid ||
            pricingModel === PricingType.Custom ? (
              <div className="flex items-center gap-4 w-full">
                <div className="space-y-2">
                  <PriceInput
                    placeholder="0.00"
                    label="Precio regular"
                    name="price"
                    value={coursePrice ? coursePrice.toString() : undefined}
                    onChange={(value) =>
                      dispatch({
                        type: "SET_COURSE_PRICE",
                        payload: Number.parseFloat(value),
                      })
                    }
                  />
                </div>
                <div className="flex flex-col items-start gap-3">
                  <PriceInput
                    placeholder="0.00"
                    label="Precio de oferta"
                    name="discountedPrice"
                    value={
                      discountedPrice ? discountedPrice.toString() : undefined
                    }
                    onChange={(value) =>
                      dispatch({
                        type: "SET_DISCOUNTED_PRICE",
                        payload: Number.parseFloat(value),
                      })
                    }
                  />
                </div>
              </div>
            ) : null}

            {pricingModel === PricingType.Custom && (
              <div className="text-sm text-muted-foreground">
                Esta opción de precio se utiliza cuando el curso está dirigido
                al sector empresarial o cuando el pago se realizará de otra
                forma. Puedes dejar el precio en 0 y proporcionar detalles sobre el
                proceso de pago en la descripción del curso o contactar con el
                equipo de soporte para más ayuda.
              </div>
            )}
          </div>

          <TagInput
            label="Etiquetas"
            tags={tags}
            maxTags={5}
            onTagsChange={(value) =>
              dispatch({ type: "SET_TAGS", payload: value })
            }
          />
          <input type="hidden" name="tags" value={tags} />

          <UserSelector
            label="Creador"
            users={users?.internalUsers || []}
            selectedUser={selectedAuthor}
            placeholder="Escoje un creador"
            onSelectUser={(user) =>
              dispatch({ type: "SET_AUTHOR", payload: user })
            }
          />
        </div>
      </div>
    </div>
  );
}
