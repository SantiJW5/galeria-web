import jsPDF from "jspdf";
import type { GalleryImage } from "../types/GalleryImage";

function getImageFormat(imageData: string) {
  if (imageData.startsWith("data:image/png")) {
    return "PNG";
  }

  return "JPEG";
}

export function generateImagePdf(item: GalleryImage) {
  const pdf = new jsPDF();

  const pageWidth = pdf.internal.pageSize.getWidth();

  const margin = 20;
  const availableWidth = pageWidth - margin * 2;

  pdf.setFontSize(18);
  pdf.text("Imagen de la galería", margin, 20);

  const format = getImageFormat(item.image);

  const imageProperties = pdf.getImageProperties(item.image);

  const imageWidth = availableWidth;

  const imageHeight =
    (imageProperties.height * imageWidth) /
    imageProperties.width;

  const maxImageHeight = 120;

  const finalHeight =
    imageHeight > maxImageHeight
      ? maxImageHeight
      : imageHeight;

  const finalWidth =
    imageHeight > maxImageHeight
      ? (imageProperties.width * maxImageHeight) /
        imageProperties.height
      : imageWidth;

  const imageX =
    (pageWidth - finalWidth) / 2;

  pdf.addImage(
    item.image,
    format,
    imageX,
    30,
    finalWidth,
    finalHeight
  );

  const textY = 30 + finalHeight + 15;

  pdf.setFontSize(14);
  pdf.text("Descripción", margin, textY);

  pdf.setFontSize(11);

  const description =
    item.text.trim() || "Sin descripción.";

  const lines = pdf.splitTextToSize(
    description,
    availableWidth
  );

  pdf.text(
    lines,
    margin,
    textY + 10
  );

  pdf.save(`galeria-${item.id}.pdf`);
}