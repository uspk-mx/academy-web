import {
  CircleAlert,
  Cloud,
  ExternalLinkIcon,
  Minus,
  TrashIcon,
  X,
  XIcon,
} from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useMutation, useQuery } from "urql";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "ui/components/alert-dialog";
import { Badge } from "ui/components/badge";
import { Button } from "ui/components/button";
import { ButtonSelector } from "ui/components/button-selector";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "ui/components/drawer";
import { Separator } from "ui/components/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "ui/components/tooltip";
import { useBuilderState } from "ui/context";
import { useBuilderNav } from "ui/context/builder-nav-context";
import {
  CourseDocument,
  DeleteCourseDocument,
  UpdateCourseDocument,
} from "gql-generated/gql/graphql";
import {
  type CourseQuery,
  type CourseQueryVariables,
  CourseStatus,
  type DeleteCourseMutation,
  type DeleteCourseMutationVariables,
  type UpdateCourseMutation,
  type UpdateCourseMutationVariables,
} from "gql-generated/generated/types";
import { cn } from "ui/lib/utils";

export function BuilderNav(): ReactNode {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [openDeleteCourseDialog, setOpenDeleteCourseDialog] = useState(false);
  const [, onDeleteCourseMutation] = useMutation<
    DeleteCourseMutation,
    DeleteCourseMutationVariables
  >(DeleteCourseDocument);
  const [, onUpdateCourseMutation] = useMutation<
    UpdateCourseMutation,
    UpdateCourseMutationVariables
  >(UpdateCourseDocument);

  const { cid } = useParams();

  const [{ data: courseData }] = useQuery<CourseQuery, CourseQueryVariables>({
    query: CourseDocument,
    variables: { courseId: cid || "" },
  });

  const { isSubmitting, formId } = useBuilderNav();
  const state = useBuilderState();
  const isPublishDisabled =
    !courseData?.course.title ||
    !courseData?.course.description ||
    !courseData?.course.duration ||
    !courseData?.course.featuredImage ||
    !courseData?.course.video ||
    !courseData?.course.category ||
    !courseData?.course.level ||
    courseData?.course.metadata?.benefits?.length === 0 ||
    courseData?.course.metadata?.learnings?.length === 0 ||
    courseData?.course.metadata?.materialsIncluded?.length === 0 ||
    courseData?.course.metadata?.requirements?.length === 0 ||
    courseData?.course.metadata?.targetAudience?.length === 0 ||
    courseData.course.topics?.length === 0;

  const shouldHideActionButtons = pathname.includes("curriculum");

  const handleDeleteCourse = async () => {
    const response = await onDeleteCourseMutation({ courseId: cid || "" });
    if (response.error?.message) {
      toast.error("Algo salio mal", {
        description:
          "No pudimos borrar el curso, intentalo nuevamente mas tarde.",
      });
    }

    toast.success("Curso borrado exitosamente", {
      description: "El curso a sido borrado con exito.",
    });
    navigate("/courses");
  };

  const handlePublishCourse = async () => {
    const response = await onUpdateCourseMutation({
      updateCourseId: cid || "",
      input: {
        title: courseData?.course.title || "",
        // video: courseData?.course.video,
        status: CourseStatus.Published,
      },
    });

    if (response.error?.message) {
      toast.error("Algo salio mal", {
        description:
          "No pudimos publicar el curso, intentalo nuevamente mas tarde.",
      });
    }

    toast.success("Curso publicado exitosamente", {
      description: "El curso a sido publicado con exito.",
    });
    navigate("/courses");
  };

  useEffect(() => {
    if (!openDeleteCourseDialog) {
      setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 1000);
    }
  }, [openDeleteCourseDialog]);

  const lessonQuizId =
    (courseData?.course?.topics?.[0].lessons?.length || 0) > 0
      ? `lesson/${courseData?.course?.topics?.[0].lessons?.[0].id}`
      : `quiz/${courseData?.course?.topics?.[0].quizzes?.[0].id}`;

  console.log("lessonQuizId:", lessonQuizId);
  const previewUrl = `/courses/${courseData?.course.id}/${lessonQuizId}`;

  return (
    <header className="top-0 z-10 sticky border-border bg-background border-b">
      <div className="items-center gap-8 grid grid-cols-2 xl:grid-cols-[1fr_1006px_1fr] px-4 sm:px-6 h-16">
        <div className="flex items-center space-x-4">
          <img
            alt=""
            className="xl:flex hidden size-16"
            src="https://res.cloudinary.com/uspk/image/upload/v1670008070/logos/svg/color-logo-new.svg"
          />
          <img
            alt=""
            className="flex xl:hidden size-10"
            src="https://res.cloudinary.com/uspk/image/upload/v1642566273/logos/svg/uspk-u-mark.svg"
          />
        </div>
        <div className="flex items-center gap-4 xl:hidden ml-auto">
          <div
            className={cn(
              "md:flex items-center gap-2 hidden data-[curriculum-route=true]:hidden"
            )}
            data-curriculum-route={shouldHideActionButtons}
          >
            <Button
              className="gap-2"
              disabled={isSubmitting}
              form={formId}
              type="submit"
              variant="ghost"
            >
              <Cloud
                className={`w-4 h-4 ${isSubmitting ? "animate-spin" : ""}`}
              />
              Save as Draft
            </Button>
            <ButtonSelector
              action={handlePublishCourse}
              label="Publicar"
              isDisabled={isPublishDisabled}
              menuItems={[
                {
                  label: "Previsualizar",
                  action: () => navigate(previewUrl),
                  disabled: courseData?.course.topics?.some(
                    (topic) =>
                      topic.lessons?.length === 0 || topic.quizzes?.length === 0
                  ),
                  rightDecorator: (
                    <ExternalLinkIcon
                      aria-hidden="true"
                      className="ml-auto"
                      size={16}
                      strokeWidth={2}
                    />
                  ),
                },
                {
                  label: "Eliminar",
                  action: (event) => {
                    event.preventDefault();
                    setOpenDeleteCourseDialog(true);
                    void handleDeleteCourse();
                  },
                  leftDecorator: (
                    <TrashIcon aria-hidden="true" size={16} strokeWidth={2} />
                  ),
                  className: "text-destructive focus:text-destructive",
                  topSeparator: true,
                },
              ]}
            />
          </div>
          <Drawer onOpenChange={setOpen} open={open}>
            <DrawerTrigger asChild>
              <Button
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
                className="flex xl:hidden group"
                onClick={() => {
                  setOpen((prevState) => !prevState);
                }}
                size="icon"
                variant="noShadowNeutral"
              >
                <svg
                  className="pointer-events-none"
                  fill="none"
                  height={16}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>menu</title>
                  <path
                    className="group-aria-expanded:rotate-315 origin-center transition-all ease-[cubic-bezier(.5,.85,.25,1.1)] -translate-y-[7px] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 duration-300"
                    d="M4 12L20 12"
                  />
                  <path
                    className="group-aria-expanded:rotate-45 origin-center transition-all ease-[cubic-bezier(.5,.85,.25,1.8)] duration-300"
                    d="M4 12H20"
                  />
                  <path
                    className="group-aria-expanded:rotate-135 origin-center transition-all ease-[cubic-bezier(.5,.85,.25,1.1)] translate-y-[7px] group-aria-expanded:translate-y-0 duration-300"
                    d="M4 12H20"
                  />
                </svg>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="sm:max-w-lg">
              <DrawerClose asChild>
                <Button
                  className="top-2 right-2 absolute hover:bg-gray-100 dark:hover:bg-gray-400/10 p-1 aspect-square"
                  variant="ghost"
                >
                  <X aria-hidden="true" className="size-6" />
                </Button>
              </DrawerClose>
              <DrawerBody>
                <div className="flex flex-col items-start gap-4">
                  <span className="font-semibold text-xl">Course builder</span>
                  <Separator />
                  <div className="flex flex-col items-start gap-4">
                    <SectionStep
                      className="text-xl"
                      href="builder"
                      isActive={pathname.includes("/builder")}
                      isLast
                      label="Basics"
                      onClick={() => {
                        setOpen(false);
                      }}
                      step={1}
                    />
                    <SectionStep
                      className="text-xl"
                      href="curriculum"
                      isActive={pathname.includes("/curriculum")}
                      isLast
                      label="Curriculum"
                      onClick={() => {
                        setOpen(false);
                      }}
                      step={2}
                    />
                    <SectionStep
                      className="text-xl"
                      href="additional"
                      isActive={pathname.includes("/additional")}
                      isLast
                      label="Additional"
                      onClick={() => {
                        setOpen(false);
                      }}
                      step={2}
                    />
                  </div>
                </div>
              </DrawerBody>
              <DrawerFooter
                className={cn("mt-6", { hidden: shouldHideActionButtons })}
              >
                <DrawerClose
                  asChild
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Button
                    className="gap-2"
                    disabled={isSubmitting}
                    form={formId}
                    type="submit"
                    variant="ghost"
                  >
                    <Cloud
                      className={`w-4 h-4 ${
                        isSubmitting ? "animate-spin" : ""
                      }`}
                    />
                    Save as Draft
                  </Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <ButtonSelector
                    action={handlePublishCourse}
                    label="Publicar"
                    isDisabled={isPublishDisabled}
                    menuItems={[
                      {
                        label: "Previsualizar",
                        action: () => navigate(previewUrl),
                        disabled: courseData?.course.topics?.some(
                          (topic) =>
                            topic.lessons?.length === 0 ||
                            topic.quizzes?.length === 0
                        ),
                        rightDecorator: (
                          <ExternalLinkIcon
                            aria-hidden="true"
                            className="ml-auto"
                            size={16}
                            strokeWidth={2}
                          />
                        ),
                      },
                      {
                        label: "Eliminar",
                        action: (event) => {
                          event.preventDefault();
                          setOpenDeleteCourseDialog(true);
                          void handlePublishCourse();
                        },
                        leftDecorator: (
                          <TrashIcon
                            aria-hidden="true"
                            size={16}
                            strokeWidth={2}
                          />
                        ),
                        className: "text-destructive focus:text-destructive",
                        topSeparator: true,
                      },
                    ]}
                  />
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="xl:flex justify-between items-center gap-8 hidden w-full xl:max-w-[1006px]">
          <div className="sm:flex items-center gap-4 hidden text-gray-500 text-sm">
            <span className="xl:block hidden">Course builder</span>
            <Separator className="h-4" orientation="vertical" />
            <div className="flex items-center gap-1">
              <SectionStep
                href="builder"
                isActive={pathname.includes("/builder")}
                label="Basics"
                step={1}
              />
              <SectionStep
                href="curriculum"
                isActive={pathname.includes("/curriculum")}
                label="Curriculum"
                step={2}
              />
              <SectionStep
                href="additional"
                isActive={pathname.includes("/additional")}
                isLast
                label="Additional"
                step={3}
              />
            </div>
          </div>
          <div
            className={cn("flex items-center gap-2", {
              hidden: shouldHideActionButtons,
            })}
          >
            <Button
              className="gap-2"
              disabled={isSubmitting}
              form={formId}
              type="submit"
              variant="noShadowNeutral"
            >
              <Cloud
                className={`w-4 h-4 ${isSubmitting ? "animate-spin" : ""}`}
              />
              Save as Draft
            </Button>
            <ButtonSelector
              action={() => {
                void handlePublishCourse();
              }}
              label="Publicar"
              isDisabled={isPublishDisabled}
              menuItems={[
                {
                  label: "Previsualizar",
                  action: () => navigate(previewUrl),
                  disabled: courseData?.course.topics?.some(
                    (topic) =>
                      topic.lessons?.length === 0 || topic.quizzes?.length === 0
                  ),
                  rightDecorator: (
                    <ExternalLinkIcon
                      aria-hidden="true"
                      className="ml-auto"
                      size={16}
                      strokeWidth={2}
                    />
                  ),
                },
                {
                  label: "Eliminar",
                  action: (event) => {
                    event.preventDefault();
                    setOpenDeleteCourseDialog(true);
                  },
                  leftDecorator: (
                    <TrashIcon aria-hidden="true" size={16} strokeWidth={2} />
                  ),
                  className: "text-destructive focus:text-destructive",
                  topSeparator: true,
                },
              ]}
            />
          </div>

          <div
            className={cn("flex items-center gap-2", {
              hidden: !shouldHideActionButtons,
            })}
          >
            <Button
              variant="noShadowNeutral"
              disabled={courseData?.course.topics?.some(
                (topic) =>
                  topic.lessons?.length === 0 || topic.quizzes?.length === 0
              )}
              asChild
            >
              <Link to={previewUrl} viewTransition>
                Previsualizar
                <ExternalLinkIcon
                  aria-hidden="true"
                  className="ml-auto"
                  size={16}
                  strokeWidth={2}
                />
              </Link>
            </Button>
          </div>
        </div>
        <div className="xl:flex justify-end items-center space-x-2 hidden">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="rounded-full size-8"
                onClick={() => navigate("/courses")}
                variant="ghost"
              >
                <XIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs">
              Salir del builder
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <DeleteCourseDialog
        onCancel={() => {
          setOpenDeleteCourseDialog(false);
        }}
        onDelete={() => {
          void handleDeleteCourse();
        }}
        open={openDeleteCourseDialog}
        setOpen={setOpenDeleteCourseDialog}
      />
    </header>
  );
}

function SectionStep({
  step,
  label,
  isActive,
  isLast,
  href,
  className,
  onClick,
}: {
  step: number;
  label: string;
  href: string;
  isActive: boolean;
  isLast?: boolean;
  className?: string;
  onClick?: () => void;
}): ReactNode {
  const navigate = useNavigate();
  const { cid } = useParams();
  return (
    <div className="flex items-center">
      <Button
        className={cn(
          "flex items-center p-1 data-[active=false]:text-gray-400 hover:no-underline",
          className
        )}
        data-active={isActive}
        onClick={() => {
          navigate(`/courses/${cid}/${href}`);
          onClick?.();
        }}
        variant="ghost"
      >
        <Badge
          className="data-active justify-center flex size-6"
          data-active={isActive}
          variant={isActive ? "dark" : "neutral"}
          shape="rounded"
        >
          {step}
        </Badge>
        <span className="ml-2">{label}</span>
      </Button>
      {!isLast ? <Minus className="mx-2 w-4 h-4" /> : isLast}
    </div>
  );
}

function DeleteCourseDialog({
  trigger,
  onCancel,
  onDelete,
  open,
  setOpen,
}: {
  trigger?: ReactNode;
  onCancel: () => void;
  onDelete: () => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}): ReactNode {
  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        {trigger ? trigger : <></>}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
          >
            <CircleAlert className="opacity-80" size={16} strokeWidth={2} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Borrar curso?</AlertDialogTitle>
            <AlertDialogDescription>
              Una vez borrando el curso no podras recuperarlo.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} type="button">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive"
            onClick={onDelete}
            type="button"
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
