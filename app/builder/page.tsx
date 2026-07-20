"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import { useResumeData } from "@/hooks/useResumeData";
import { Loader2 } from "lucide-react";

export default function BuilderPage() {
  const resumeState = useResumeData();

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