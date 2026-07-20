import Link from "next/link";
import { FileText, Heart, Code } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 py-8 no-print transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
          <div className="p-1.5 bg-indigo-600 rounded-lg text-white">
            <FileText className="w-4 h-4" />
          </div>
          <span>Resume Builder</span>
        </div>

        <p className="text-sm flex items-center gap-1">
          Built with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> using Next.js 15 & Tailwind CSS. Client-side privacy guaranteed.
        </p>

        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/builder" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Create Resume
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <Code className="w-4 h-4" />
            
          </a>
        </div>
      </div>
    </footer>
  );
}
