"use client";

import { useState, useEffect, useCallback } from "react";
import { ResumeData } from "@/types/resume";
import { analyzeAtsScore, AtsAnalysisResult } from "@/lib/ai";
import { X, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Tag, Loader2, ArrowRight } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
}

export default function AtsScoreModal({ isOpen, onClose, resumeData }: Props) {
  const [analysis, setAnalysis] = useState<AtsAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const runAnalysis = useCallback(async () => {
    setIsLoading(true);
    const result = await analyzeAtsScore(resumeData);
    setAnalysis(result);
    setIsLoading(false);
  }, [resumeData]);

  useEffect(() => {
    if (isOpen) {
      runAnalysis();
    }
  }, [isOpen, runAnalysis]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in no-print">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-2xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">AI ATS Score & Optimizer</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Automated Applicant Tracking System compliance audit</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {isLoading ? (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Auditing resume formatting & keywords...</p>
            </div>
          ) : analysis ? (
            <>
              {/* ATS Score Display Banner */}
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall ATS Score</span>
                  <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{analysis.score}</span>
                    <span className="text-sm font-semibold text-slate-400">/ 100</span>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Rating: {analysis.rating}</span>
                  </div>
                </div>

                {/* Score Progress Bar Graphic */}
                <div className="w-32 h-32 rounded-full border-8 border-indigo-500/20 flex items-center justify-center relative shadow-inner">
                  <div className="text-center">
                    <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{analysis.score}%</span>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase">Match</p>
                  </div>
                </div>
              </div>

              {/* Strengths Found */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Key Strengths Identified ({analysis.strengths.length})</span>
                </h4>
                <div className="space-y-2">
                  {analysis.strengths.map((str, idx) => (
                    <div key={idx} className="p-3 bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 rounded-xl text-xs font-medium text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Recommended Keywords */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-500" />
                  <span>Recommended Industry Keywords to Add</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingKeywords.map((kw, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Improvement Recommendations */}
              {analysis.recommendations.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-indigo-500" />
                    <span>Actionable Optimization Steps</span>
                  </h4>
                  <div className="space-y-2">
                    {analysis.recommendations.map((rec, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2">
                          <ArrowRight className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          {rec}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
