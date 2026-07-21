"use client";

import { useState } from "react";
import { useResumeData } from "@/hooks/useResumeData";
import { TemplateId, AccentColor } from "@/types/resume";
import TemplateModern from "@/components/templates/TemplateModern";
import TemplateClassic from "@/components/templates/TemplateClassic";
import TemplateMinimal from "@/components/templates/TemplateMinimal";
import TemplateTech from "@/components/templates/TemplateTech";
import TemplateCreative from "@/components/templates/TemplateCreative";
import { exportToPdf, triggerBrowserPrint } from "@/lib/pdf";
import {
  Download,
  Printer,
  Palette,
  LayoutTemplate,
  Loader2,
  CheckCircle,
} from "lucide-react";

interface Props {
  resumeDataState: ReturnType<typeof useResumeData>;
}

const templatesList: { id: TemplateId; name: string }[] = [
  { id: "modern", name: "Modern Crisp" },
  { id: "classic", name: "Classic Executive" },
  { id: "minimal", name: "Minimalist Clean" },
  { id: "tech", name: "Tech / Developer" },
  { id: "creative", name: "Creative Accent" },
];

const accentColorsList: { id: AccentColor; name: string; bgClass: string }[] = [
  { id: "indigo", name: "Indigo", bgClass: "bg-indigo-600" },
  { id: "emerald", name: "Emerald", bgClass: "bg-emerald-600" },
  { id: "crimson", name: "Crimson", bgClass: "bg-rose-600" },
  { id: "amber", name: "Amber", bgClass: "bg-amber-600" },
  { id: "slate", name: "Slate", bgClass: "bg-slate-700" },
  { id: "violet", name: "Violet", bgClass: "bg-violet-600" },
];

export default function ResumePreview({ resumeDataState }: Props) {
  const { resumeData, config, setTemplate, setAccentColor, lastSaved } = resumeDataState;
  const [isExporting, setIsExporting] = useState(false);

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    const fileName = `${resumeData.personalInfo.fullName.replaceAll(" ", "_") || "resume"}_CV.pdf`;
    await exportToPdf("resume-preview-document", fileName, resumeData, config);
    setIsExporting(false);
  };

  const renderSelectedTemplate = () => {
    switch (config.template) {
      case "modern":
        return <TemplateModern data={resumeData} accentColor={config.accentColor} />;
      case "classic":
        return <TemplateClassic data={resumeData} accentColor={config.accentColor} />;
      case "minimal":
        return <TemplateMinimal data={resumeData} accentColor={config.accentColor} />;
      case "tech":
        return <TemplateTech data={resumeData} accentColor={config.accentColor} />;
      case "creative":
        return <TemplateCreative data={resumeData} accentColor={config.accentColor} />;
      default:
        return <TemplateModern data={resumeData} accentColor={config.accentColor} />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Toolbar for Customization & Export */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-4 no-print">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Template Selection Dropdown */}
          <div className="flex items-center gap-2">
            <LayoutTemplate className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Template:</span>
            <select
              value={config.template}
              onChange={(e) => setTemplate(e.target.value as TemplateId)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {templatesList.map((tmpl) => (
                <option key={tmpl.id} value={tmpl.id}>
                  {tmpl.name}
                </option>
              ))}
            </select>
          </div>

          {/* Accent Color Palette */}
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Theme Color:</span>
            <div className="flex items-center gap-1.5">
              {accentColorsList.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setAccentColor(color.id)}
                  title={color.name}
                  className={`w-5 h-5 rounded-full ${color.bgClass} transition-transform ${
                    config.accentColor === color.id ? "ring-2 ring-indigo-500 ring-offset-2 scale-110" : "hover:scale-105"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Export Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-500/20 transition-all disabled:opacity-50"
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span>{isExporting ? "Exporting..." : "Download PDF"}</span>
            </button>

            <button
              type="button"
              onClick={triggerBrowserPrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Auto-save status footer line */}
        {lastSaved && (
          <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-2 border-t border-slate-100 dark:border-slate-800">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>Auto-saved to Local Storage at {lastSaved}</span>
          </div>
        )}
      </div>

      {/* Printable Document Preview Area */}
      <div className="w-full overflow-x-auto p-2 sm:p-4 bg-slate-200/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/60 dark:border-slate-800 flex justify-center">
        <div
          id="resume-preview-document"
          className="resume-paper bg-white text-slate-900 overflow-hidden shadow-2xl rounded-sm transition-all"
        >
          {renderSelectedTemplate()}
        </div>
      </div>
    </div>
  );
}