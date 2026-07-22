"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import { useResumeData } from "@/hooks/useResumeData";
import { TemplateId } from "@/types/resume";
import { Loader2 } from "lucide-react";

const validTemplates: TemplateId[] = ["modern", "classic", "minimal", "tech", "creative"];

function BuilderContent() {
  const resumeState = useResumeData();
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template") as TemplateId | null;

  useEffect(() => {
    if (templateParam && validTemplates.includes(templateParam)) {
      resumeState.setTemplate(templateParam);
    }
  }, [templateParam, resumeState.setTemplate]);

  if (!resumeState.isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2 font-medium text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
          <span>Loading Resume Builder...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Interactive Multi-Step Builder Form (Hidden during printing) */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-6 no-print">
            <ResumeForm resumeDataState={resumeState} />
          </div>

          {/* Right Side: Live Real-Time Resume Preview */}
          <div className="lg:col-span-6 xl:col-span-7 sticky top-20">
            <ResumePreview resumeDataState={resumeState} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2 font-medium text-sm">
            <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
            <span>Loading...</span>
          </div>
        </div>
      }
    >
      <BuilderContent />
    </Suspense>
  );
}