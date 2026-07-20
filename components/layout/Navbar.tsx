"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { FileText, Sparkles, LayoutTemplate } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 dark:text-white hover:opacity-90">
          <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-md shadow-indigo-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <span>
            Resume<span className="text-indigo-600 dark:text-indigo-400"></span>
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/#features"
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Features
          </Link>
          <Link
            href="/#templates"
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <LayoutTemplate className="w-4 h-4" />
            Templates
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/builder"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-sm shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Build Resume
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}