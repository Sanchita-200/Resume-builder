"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import UserMenu from "@/components/auth/UserMenu";
import AuthModal from "@/components/auth/AuthModal";
import { FileText, Sparkles, LayoutTemplate, User } from "lucide-react";

export default function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 dark:text-white transition-all duration-200 hover:scale-[1.02] active:scale-95">
            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-md shadow-indigo-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <span>
              AI Resume<span className="text-indigo-600 dark:text-indigo-400">Builder</span>
            </span>
          </Link>

          <nav className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/#features"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 hover:scale-[1.03] active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              Features
            </Link>
            <Link
              href="/#templates"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 hover:scale-[1.03] active:scale-95"
            >
              <LayoutTemplate className="w-4 h-4" />
              Templates
            </Link>
            <Link
              href="/profile"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 hover:scale-[1.03] active:scale-95"
            >
              <User className="w-4 h-4" />
              My Profile
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <UserMenu />
            </div>
          </nav>
        </div>
      </header>

      {/* Global Authentication Modal Dialog */}
      <AuthModal />
    </>
  );
}