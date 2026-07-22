import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Download, Eye, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>AI Resume Builder</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15]">
          Build ATS-Friendly Resumes{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            in Seconds
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Create professional, beautifully styled resumes with real-time live preview, 5 customizable templates, auto-save, and instant PDF download.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            href="/builder"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer"
          >
            Create Resume Now
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#templates"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer"
          >
            <Eye className="w-5 h-5 text-indigo-500" />
            Explore Templates
          </a>
        </div>

        {/* Key highlights line */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>100% Private (No Login Required)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Auto-Save Local Storage</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Download className="w-4 h-4 text-indigo-500" />
            <span>Instant PDF Export</span>
          </div>
        </div>

        {/* Preview Container Graphic */}
        <div className="mt-12 max-w-5xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span>Live Editor Preview</span>
            </div>

            {/* Inner Graphic Mock */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-3">
                <div className="h-4 bg-indigo-200 dark:bg-indigo-900/50 rounded w-1/3"></div>
                <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-950 shadow-inner space-y-3">
                <div className="h-6 bg-indigo-600 rounded w-1/2"></div>
                <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}