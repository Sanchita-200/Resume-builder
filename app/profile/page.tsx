"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  loadSavedResumesList,
  saveResumeToList,
  deleteResumeFromList,
  saveResumeData,
  saveResumeConfig,
  SavedResumeItem,
} from "@/lib/localStorage";
import { exportToPdf } from "@/lib/pdf";
import {
  User as UserIcon,
  Mail,
  Calendar,
  FileText,
  Plus,
  Download,
  Edit,
  Trash2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  LayoutTemplate,
  Palette,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const [resumes, setResumes] = useState<SavedResumeItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const list = loadSavedResumesList();
    setResumes(list);
    setIsLoaded(true);
  }, []);

  const handleEditResume = (item: SavedResumeItem) => {
    saveResumeData(item.data);
    saveResumeConfig({ template: item.template, accentColor: item.accentColor });
    router.push("/builder");
  };

  const handleDownloadPdf = async (item: SavedResumeItem) => {
    const fileName = `${item.data.personalInfo.fullName.replaceAll(" ", "_") || "resume"}_CV.pdf`;
    await exportToPdf("resume-preview-document", fileName, item.data, {
      template: item.template,
      accentColor: item.accentColor,
    });
  };

  const handleDeleteResume = (id: string) => {
    const updated = deleteResumeFromList(id);
    setResumes(updated);
    setNotification("Resume removed from profile.");
    setTimeout(() => setNotification(null), 2500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Top Header Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>My Profile & Saved Resumes</span>
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage your personal account profile and access all your saved resume documents.
            </p>
          </div>

          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Resume</span>
          </Link>
        </div>

        {/* Notification Alert */}
        {notification && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-xs font-semibold text-emerald-700 dark:text-emerald-300 rounded-xl flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{notification}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side Column: User Profile Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
              {isAuthenticated && user ? (
                <>
                  <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-950 border-2 border-indigo-500 p-1 flex items-center justify-center overflow-hidden shadow-md">
                      {user.avatarUrl ? (
                        // eslint-disable-next-next/no-img-element
                        <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover rounded-full" />
                      ) : (
                        <UserIcon className="w-8 h-8 text-indigo-600" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{user.email}</p>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Account</span>
                    </div>
                  </div>

                  {/* Profile Metadata Details */}
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-indigo-500" />
                        <span>Saved Resumes:</span>
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">{resumes.length}</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>Plan Tier:</span>
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">Free Pro Tier</span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>Joined:</span>
                      </span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                    <UserIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Guest User Session</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Sign in to associate your saved resumes with your account.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openAuthModal("signin")}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm cursor-pointer transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Sign In to Account</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Column: Saved Resumes Grid Showcase */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>My Saved Resumes ({resumes.length})</span>
              </h2>
            </div>

            {!isLoaded ? (
              <div className="py-16 text-center text-xs text-slate-400">Loading saved resumes...</div>
            ) : resumes.length === 0 ? (
              <div className="p-10 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 space-y-4">
                <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">No Saved Resumes Found</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Create your first resume using our multi-template builder.
                  </p>
                </div>
                <Link
                  href="/builder"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Build Resume Now</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {resumes.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all group"
                  >
                    <div className="space-y-3">
                      {/* Top badges bar */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                          <LayoutTemplate className="w-3 h-3" />
                          {item.template}
                        </span>

                        <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.updatedAt}
                        </span>
                      </div>

                      {/* Resume Document Title */}
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </h3>

                      {/* Candidate Snippet */}
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {item.data.personalInfo.fullName || "Untitled Candidate"}
                        </p>
                        <p className="text-[11px] text-slate-500">{item.data.personalInfo.jobTitle || "No Title Specified"}</p>
                      </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleEditResume(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-xl transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownloadPdf(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-indigo-500" />
                        <span>PDF</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteResume(item.id)}
                        className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition-colors cursor-pointer"
                        title="Delete Resume"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
