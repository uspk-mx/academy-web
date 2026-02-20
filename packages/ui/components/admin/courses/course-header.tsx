import { ArrowLeft, CheckCircle2Icon, XIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "ui/components/button";
import { Separator } from "ui/components/separator";
import { useProgress } from "ui/context/progress-context";
import { exportCertificatePdf, pdfUrlToFile, type CertificateData, type TextOverlay } from "ui/lib/pdf-exports";
import { cn } from "ui/lib/utils";

const PDF_URL = "https://pub-b7daf0a886e34f2b8c2ab3497bc521f7.r2.dev/uploads/Certificate.pdf"

export const CourseHeader = ({
  courseTitle,
  topicItemId,
  isItemCompleted,
  isLesson,
  certificateData,
}: {
  courseTitle: string;
  topicItemId: string;
  isItemCompleted?: boolean;
  isLesson?: boolean;
  certificateData?: CertificateData;
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const {
    markComplete,
    markLessonComplete,
    completedCourseItems,
    totalItems,
    progressPercentage,
  } = useProgress();

  const handleMarkLessonComplete = async () => {
    await markLessonComplete({ lessonId: topicItemId });
  };

  const isDarkMode = false;

  const textOverlays: TextOverlay[] = [
    {
      id: "studentName",
      label: "Student Name",
      x: 52,
      y: 37,
      fontSize: 32,
      fontFamily: "sans-serif",
      color: "#1a1a2e",
    },
    {
      id: "teacherName",
      label: "Teacher Name",
      x: 54,
      y: 59,
      fontSize: 20,
      fontFamily: "sans-serif",
      color: "#1a1a2e",
    },
    {
      id: "studentLevel",
      label: "Student Level",
      x: 79,
      y: 66,
      fontSize: 24,
      fontFamily: "sans-serif",
      color: "#1a1a2e",
    },
    {
      id: "studentLevelDescription",
      label: "Student Level Description",
      x: 75,
      y: 43,
      fontSize: 12,
      fontFamily: "sans-serif",
      color: "#1a1a2e",
    },
    {
      id: "date",
      label: "Date",
      x: 28,
      y: 59,
      fontSize: 16,
      fontFamily: "sans-serif",
      color: "#1a1a2e",
    },
  ];

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const pdfFile = await pdfUrlToFile(PDF_URL, "certificate_template.pdf");
      await exportCertificatePdf(
        pdfFile,
        certificateData ?? {
          studentName: "Nombre del estudiante",
          teacherName: "Nombre del profesor",
          studentLevelDescription: "Descripción del nivel del estudiante",
          studentLevel: "Nivel del estudiante",
          date: new Date().toLocaleDateString(),
        },
        textOverlays,
      );
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-background p-4 border-b hidden md:block">
      <div className="flex flex-row items-center gap-4">
        <Button variant="ghost" size="icon" type="button" asChild>
          <Link to="/courses" className="flex min-[969px]:hidden">
            <ArrowLeft className="size-5" />
          </Link>
        </Button>

        <div className="hidden min-[969px]:flex flex-row items-center gap-4">
          <Logo isDarkMode={isDarkMode} />
          <Separator className="h-4" orientation="vertical" />
        </div>

        <p className="text-gray-900 text-lg font-bold web:hover:underline web:hover:cursor-default hidden md:flex">
          {courseTitle}
        </p>

        <div className="flex flex-row items-center ml-auto gap-4">
          {/* TODO: uncomment this when ever the public user ux is ready */}
          <p
            className={cn("max-[969px]:hidden", {
              "text-green-600": progressPercentage === 100,
            })}
          >
            {progressPercentage === 100
              ? "🎉 Courso completado!"
              : `Tu progreso: ${completedCourseItems} de ${totalItems} (${progressPercentage}%)`}
          </p>

          {progressPercentage === 100 && (
            <Button variant="noShadow" size="sm" onClick={handleExport} disabled={isExporting}>
              {isExporting ? "Descargando certificado..." : "Descargar certificado"}
            </Button>
          )}

          {isLesson ? (
            <Button
              variant="noShadowNeutral"
              type="button"
              className={cn("md:flex hidden", {
                "cursor-not-allowed": isItemCompleted,
              })}
              onClick={!isItemCompleted ? handleMarkLessonComplete : undefined}
              disabled={isItemCompleted}
            >
              <div className="text-gray-900! flex flex-row gap-2 items-center">
                <CheckCircle2Icon
                  className={cn("size-4", {
                    "text-green-500": isItemCompleted,
                  })}
                />

                <p className="text-gray-950!">
                  {isItemCompleted ? "Completado" : "Marcar como completado"}
                </p>
              </div>
            </Button>
          ) : null}

          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="rounded-full"
            asChild
          >
            <Link to="/courses">
              <XIcon className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

function Logo({ isDarkMode }: { isDarkMode?: boolean }) {
  return (
    <img
      src={
        isDarkMode
          ? "https://res.cloudinary.com/uspk/image/upload/v1668625225/logos/png/white-logo_spokyg.png"
          : "https://res.cloudinary.com/uspk/image/upload/v1668625225/logos/png/black-logo_cxrldb.png"
      }
      className="w-14 h-8"
      alt="Logo de la plataforma"
    />
  );
}
