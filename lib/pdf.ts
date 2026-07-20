import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportToPdf(elementId: string, filename = "resume.pdf"): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found for PDF export.`);
    return;
  }

  // Backup original innerHTML of all style tags to prevent html2canvas lab()/oklch() parser crashes
  const styleTags = Array.from(document.querySelectorAll("style"));
  const originalStyles = styleTags.map((style) => style.innerHTML);

  try {
    // Sanitize oklch() and lab() color functions in document style tags
    styleTags.forEach((style) => {
      if (style.innerHTML && (style.innerHTML.includes("oklch") || style.innerHTML.includes("lab"))) {
        style.innerHTML = style.innerHTML
          .replace(/oklch\([^)]+\)/gi, "#1e293b")
          .replace(/lab\([^)]+\)/gi, "#1e293b");
      }
    });

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: 1200,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const canvasScaledWidth = pdfWidth;
    const canvasScaledHeight = (imgHeight * pdfWidth) / imgWidth;

    if (canvasScaledHeight <= pdfHeight) {
      pdf.addImage(imgData, "PNG", 0, 0, canvasScaledWidth, canvasScaledHeight);
    } else {
      let position = 0;
      let heightLeft = canvasScaledHeight;

      pdf.addImage(imgData, "PNG", 0, position, canvasScaledWidth, canvasScaledHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, canvasScaledWidth, canvasScaledHeight);
        heightLeft -= pdfHeight;
      }
    }

    pdf.save(filename);
  } catch (error) {
    console.error("PDF Export Error:", error);
    alert("Could not generate PDF. Please check your browser settings.");
  } finally {
    // Restore original stylesheet innerHTML immediately
    styleTags.forEach((style, index) => {
      if (originalStyles[index] !== undefined) {
        style.innerHTML = originalStyles[index];
      }
    });
  }
}

export function triggerBrowserPrint(): void {
  if (typeof window !== "undefined") {
    window.print();
  }
}
