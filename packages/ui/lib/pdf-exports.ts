import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export interface CertificateData {
  studentName: string;
  teacherName: string;
  studentLevel: string;
  studentLevelDescription?: string;
  date: string;
}

export interface TextOverlay {
  id: string;
  label: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: Number.parseInt(result[1], 16) / 255,
        g: Number.parseInt(result[2], 16) / 255,
        b: Number.parseInt(result[3], 16) / 255,
      }
    : { r: 0, g: 0, b: 0 };
}

export async function pdfUrlToFile(
  url: string,
  filename = "template.pdf",
): Promise<File> {
  const response = await fetch(url, { cache: "no-cache" });
  if (!response.ok)
    throw new Error(
      `Failed to fetch PDF: ${response.status} ${response.statusText}`,
    );

  const blob = await response.blob();
  const pdfBlob =
    blob.type === "application/pdf"
      ? blob
      : new Blob([blob], { type: "application/pdf" });

  return new File([pdfBlob], filename, { type: "application/pdf" });
}

export async function exportCertificatePdf(
  pdfFile: File,
  certificateData: CertificateData,
  textOverlays: TextOverlay[],
): Promise<void> {
  const existingPdfBytes = await pdfFile.arrayBuffer();
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const courier = await pdfDoc.embedFont(StandardFonts.Courier);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();

  const date = new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(certificateData.date));

  const getTextValue = (id: string): string => {
    switch (id) {
      case "studentName":
        return certificateData.studentName || "";
      case "teacherName":
        return certificateData.teacherName || "";
      case "studentLevel":
        return certificateData.studentLevel || "";
      case "studentLevelDescription":
        return certificateData.studentLevelDescription || "";
      case "date":
        return date || "";
      default:
        return "";
    }
  };

  const getFont = (fontFamily: string) => {
    switch (fontFamily) {
      case "serif":
        return timesRoman;
      case "monospace":
        return courier;
      default:
        return helvetica;
    }
  };

  for (const overlay of textOverlays) {
    const text = getTextValue(overlay.id);
    if (!text) continue;

    const font = getFont(overlay.fontFamily);
    const textWidth = font.widthOfTextAtSize(text, overlay.fontSize);
    const x = (overlay.x / 100) * width - textWidth / 2;
    const y = height - (overlay.y / 100) * height - overlay.fontSize / 2;

    const { r, g, b } = hexToRgb(overlay.color);

    firstPage.drawText(text, {
      x,
      y,
      size: overlay.fontSize,
      font,
      color: rgb(r, g, b),
    });
  }

  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes as Uint8Array<ArrayBuffer>], {
    type: "application/pdf",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `certificate-${certificateData.studentName || "unnamed"}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
