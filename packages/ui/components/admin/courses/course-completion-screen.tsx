import { ArrowRight, Award, Download, Home } from "lucide-react";
import { Link } from "react-router";
import { Button } from "ui/components/button";
import type { CertificateData, TextOverlay } from "ui/lib/pdf-exports";
import { exportCertificatePdf, pdfUrlToFile } from "ui/lib/pdf-exports";
import { useState } from "react";

const PDF_URL =
  "https://pub-b7daf0a886e34f2b8c2ab3497bc521f7.r2.dev/uploads/Certificate.pdf";

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

type NextCourseInfo = {
  id: string;
  title: string;
};

export function CourseCompletionScreen({
  courseTitle,
  certificateData,
  nextCourse,
}: {
  courseTitle: string;
  certificateData: CertificateData;
  nextCourse: NextCourseInfo | null;
}) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const pdfFile = await pdfUrlToFile(PDF_URL, "certificate_template.pdf");
      await exportCertificatePdf(pdfFile, certificateData, textOverlays);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-12 text-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-green-100 p-4">
          <Award className="size-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Felicidades, completaste el curso!
        </h1>
        <p className="text-lg text-gray-600 max-w-md">
          Has terminado todas las lecciones y quizzes de{" "}
          <span className="font-semibold">{courseTitle}</span>.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Button
          variant="default"
          className="flex-1 gap-2"
          onClick={handleExport}
          disabled={isExporting}
        >
          <Download className="size-4" />
          {isExporting ? "Descargando..." : "Descargar certificado"}
        </Button>

        {nextCourse ? (
          <Button variant="default" className="flex-1 gap-2" asChild>
            <Link to={`/courses/${nextCourse.id}`}>
              Siguiente curso
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="neutral" className="flex-1 gap-2" asChild>
            <Link to="/courses">
              <Home className="size-4" />
              Volver al dashboard
            </Link>
          </Button>
        )}
      </div>

      {nextCourse && (
        <div className="flex flex-col items-center gap-2 mt-2">
          <p className="text-sm text-gray-500">
            Siguiente curso: <span className="font-medium">{nextCourse.title}</span>
          </p>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/courses">Volver al dashboard</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
