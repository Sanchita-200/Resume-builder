import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ResumeData, ResumeConfig, AccentColor } from "@/types/resume";

const rgbColors: Record<AccentColor, [number, number, number]> = {
  indigo: [79, 70, 229],
  emerald: [5, 150, 105],
  crimson: [225, 29, 72],
  amber: [217, 119, 6],
  slate: [51, 65, 85],
  violet: [124, 58, 237],
};

function sanitizePdfText(str: string): string {
  if (!str) return "";
  return str
    .replace(/•/g, "-")
    .replace(/—/g, "-")
    .replace(/–/g, "-")
    .replace(/“/g, '"')
    .replace(/”/g, '"')
    .replace(/‘/g, "'")
    .replace(/’/g, "'");
}

export async function exportToPdf(
  elementId: string,
  filename = "resume.pdf",
  data?: ResumeData,
  config?: ResumeConfig
): Promise<void> {
  if (data) {
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const primaryRgb = rgbColors[config?.accentColor || "indigo"] || [79, 70, 229];
      const [r, g, b] = primaryRgb;

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      let y = margin;

      // Full Name
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(22);
      pdf.setTextColor(15, 23, 42);
      pdf.text(sanitizePdfText(data.personalInfo.fullName || "Your Full Name"), margin, y + 4);
      y += 10;

      // Job Title
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.setTextColor(r, g, b);
      pdf.text(sanitizePdfText(data.personalInfo.jobTitle || "Professional Title"), margin, y);
      y += 6;

      // Contact Information Bar
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      pdf.setTextColor(71, 85, 105);

      const contactParts = [
        data.personalInfo.email,
        data.personalInfo.phone,
        data.personalInfo.location,
        data.personalInfo.website,
        data.personalInfo.linkedin,
        data.personalInfo.github,
      ]
        .filter(Boolean)
        .map((item) => sanitizePdfText(item || ""));

      if (contactParts.length > 0) {
        const contactStr = contactParts.join("  |  ");
        const contactLines = pdf.splitTextToSize(contactStr, pageWidth - margin * 2);
        pdf.text(contactLines, margin, y);
        y += contactLines.length * 4 + 2;
      }

      // Top Accent Divider Line
      pdf.setDrawColor(r, g, b);
      pdf.setLineWidth(0.8);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 7;

      // Helper function to draw Section Titles
      const addSectionHeader = (title: string) => {
        if (y > pageHeight - 20) {
          pdf.addPage();
          y = margin;
        }
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);
        pdf.setTextColor(r, g, b);
        pdf.text(title.toUpperCase(), margin, y);
        y += 2;
        pdf.setDrawColor(226, 232, 240);
        pdf.setLineWidth(0.4);
        pdf.line(margin, y, pageWidth - margin, y);
        y += 5;
      };

      // Summary Section
      if (data.personalInfo.summary) {
        addSectionHeader("Professional Summary");
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(30, 41, 59);

        const cleanSummary = sanitizePdfText(data.personalInfo.summary);
        const lines = pdf.splitTextToSize(cleanSummary, pageWidth - margin * 2);
        pdf.text(lines, margin, y);
        y += lines.length * 4 + 4;
      }

      // Work Experience Section
      if (data.experience && data.experience.length > 0) {
        addSectionHeader("Work Experience");

        data.experience.forEach((exp) => {
          if (y > pageHeight - 25) {
            pdf.addPage();
            y = margin;
          }

          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(9.5);
          pdf.setTextColor(15, 23, 42);
          pdf.text(sanitizePdfText(exp.position), margin, y);

          const dateStr = sanitizePdfText(`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`);
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(8.5);
          pdf.setTextColor(100, 116, 139);
          pdf.text(dateStr, pageWidth - margin, y, { align: "right" });
          y += 4;

          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(8.5);
          pdf.setTextColor(71, 85, 105);
          const companyLoc = sanitizePdfText(exp.company + (exp.location ? ` | ${exp.location}` : ""));
          pdf.text(companyLoc, margin, y);
          y += 4.5;

          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(8.5);
          pdf.setTextColor(30, 41, 59);
          const cleanDesc = sanitizePdfText(exp.description);
          const descLines = pdf.splitTextToSize(cleanDesc, pageWidth - margin * 2);
          pdf.text(descLines, margin, y);
          y += descLines.length * 3.8 + 4;
        });
      }

      // Projects Section
      if (data.projects && data.projects.length > 0) {
        addSectionHeader("Key Projects");

        data.projects.forEach((proj) => {
          if (y > pageHeight - 20) {
            pdf.addPage();
            y = margin;
          }

          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(9.5);
          pdf.setTextColor(15, 23, 42);
          pdf.text(sanitizePdfText(proj.title), margin, y);

          if (proj.techStack) {
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(8);
            pdf.setTextColor(100, 116, 139);
            pdf.text(sanitizePdfText(proj.techStack), pageWidth - margin, y, { align: "right" });
          }
          y += 4;

          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(8.5);
          pdf.setTextColor(30, 41, 59);
          const cleanDesc = sanitizePdfText(proj.description);
          const descLines = pdf.splitTextToSize(cleanDesc, pageWidth - margin * 2);
          pdf.text(descLines, margin, y);
          y += descLines.length * 3.8 + 4;
        });
      }

      // Education Section
      if (data.education && data.education.length > 0) {
        addSectionHeader("Education");

        data.education.forEach((edu) => {
          if (y > pageHeight - 20) {
            pdf.addPage();
            y = margin;
          }

          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(9.5);
          pdf.setTextColor(15, 23, 42);
          pdf.text(sanitizePdfText(`${edu.degree} in ${edu.fieldOfStudy}`), margin, y);

          const eduDate = sanitizePdfText(`${edu.startDate} - ${edu.endDate}`);
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(8.5);
          pdf.setTextColor(100, 116, 139);
          pdf.text(eduDate, pageWidth - margin, y, { align: "right" });
          y += 4;

          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(8.5);
          pdf.setTextColor(71, 85, 105);
          pdf.text(sanitizePdfText(edu.institution + (edu.location ? ` | ${edu.location}` : "")), margin, y);
          y += 4.5;
        });
      }

      // Skills Section
      if (data.skills && data.skills.length > 0) {
        addSectionHeader("Skills & Competencies");
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8.5);
        pdf.setTextColor(30, 41, 59);

        const skillNames = data.skills.map((s) => sanitizePdfText(s.name)).join("  |  ");
        const skillLines = pdf.splitTextToSize(skillNames, pageWidth - margin * 2);
        pdf.text(skillLines, margin, y);
        y += skillLines.length * 3.8 + 4;
      }

      // Certifications & Languages
      if ((data.certifications && data.certifications.length > 0) || (data.languages && data.languages.length > 0)) {
        addSectionHeader("Certifications & Languages");
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8.5);
        pdf.setTextColor(30, 41, 59);

        if (data.certifications && data.certifications.length > 0) {
          const certStr = data.certifications.map((c) => sanitizePdfText(`${c.name} (${c.issuer})`)).join("  |  ");
          pdf.text(`Certifications: ${certStr}`, margin, y);
          y += 4.5;
        }

        if (data.languages && data.languages.length > 0) {
          const langStr = data.languages.map((l) => sanitizePdfText(`${l.name} (${l.proficiency})`)).join("  |  ");
          pdf.text(`Languages: ${langStr}`, margin, y);
          y += 4.5;
        }
      }

      // Trigger instant direct download into browser!
      pdf.save(filename);
      return;
    } catch (err) {
      console.error("Direct vector PDF export error:", err);
    }
  }

  // Fallback DOM rasterization
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    pdf.addImage(imgData, "PNG", 0, 0, 210, (canvas.height * 210) / canvas.width);
    pdf.save(filename);
  } catch (canvasErr) {
    console.error("Canvas PDF export fallback error:", canvasErr);
    alert("Could not generate PDF download.");
  }
}

export function triggerBrowserPrint(): void {
  if (typeof window !== "undefined") {
    window.print();
  }
}
