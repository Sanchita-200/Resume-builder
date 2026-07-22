"use client";

import { useState, useEffect, useCallback } from "react";
import { ResumeData } from "@/types/resume";
import { generateAiCoverLetter } from "@/lib/ai";
import { X, Mail, Copy, Check, Download, Loader2, Sparkles, Building } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
}

export default function CoverLetterModal({ isOpen, onClose, resumeData }: Props) {
  const [companyName, setCompanyName] = useState<string>("Target Company");
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    const letter = await generateAiCoverLetter(resumeData, companyName || "Target Company");
    setCoverLetter(letter);
    setIsLoading(false);
  }, [resumeData, companyName]);

  useEffect(() => {
    if (isOpen) {
      handleGenerate();
    }
  }, [isOpen, handleGenerate]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([coverLetter], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${dataName()}_Cover_Letter.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  function dataName() {
    return (resumeData.personalInfo.fullName || "Candidate").replaceAll(" ", "_");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in no-print">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-2xl">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">AI Cover Letter Generator</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Generate a tailored cover letter matched to your candidate profile</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Company Filter Bar */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Building className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">Target Company:</span>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Google, Microsoft, Acme Inc."
              className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-48"
            />
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            <span>Regenerate Letter</span>
          </button>
        </div>

        {/* Modal Body / Textarea */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {isLoading ? (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Writing tailored cover letter...</p>
            </div>
          ) : (
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={12}
              className="w-full p-4 text-xs font-sans font-normal leading-relaxed bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500 resize-none shadow-inner"
            />
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            type="button"
            onClick={handleCopy}
            disabled={isLoading || !coverLetter}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied!" : "Copy Text"}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadTxt}
            disabled={isLoading || !coverLetter}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download TXT</span>
          </button>
        </div>
      </div>
    </div>
  );
}
