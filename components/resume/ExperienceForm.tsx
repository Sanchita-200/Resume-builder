"use client";

import { useState } from "react";
import { ExperienceItem } from "@/types/resume";
import { enhanceAiExperienceBullet } from "@/lib/ai";
import { Briefcase, Plus, Trash2, Calendar, MapPin, Building, Sparkles, Loader2 } from "lucide-react";

interface Props {
  data: ExperienceItem[];
  onChange: (list: ExperienceItem[]) => void;
}

export default function ExperienceForm({ data, onChange }: Props) {
  const [loadingAiId, setLoadingAiId] = useState<string | null>(null);

  const handleAddItem = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    onChange([...data, newItem]);
  };

  const handleUpdateItem = (
    id: string,
    field: keyof ExperienceItem,
    value: string | boolean
  ) => {
    const updated = data.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const handleRemoveItem = (id: string) => {
    onChange(data.filter((item) => item.id !== id));
  };

  const handleAiEnhanceBullet = async (item: ExperienceItem) => {
    setLoadingAiId(item.id);
    const enhancedText = await enhanceAiExperienceBullet(item.position, item.company, item.description);
    handleUpdateItem(item.id, "description", enhancedText);
    setLoadingAiId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Work Experience
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            List your relevant professional roles, accomplishments, and metrics.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-500 dark:text-slate-400">No work experience added yet.</p>
          <button
            type="button"
            onClick={handleAddItem}
            className="mt-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer inline-block"
          >
            + Add your first position
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((item, index) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 relative group transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-600 dark:text-slate-300">
                  Experience #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 p-1.5 rounded-lg transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Company Name *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={item.company}
                      onChange={(e) => handleUpdateItem(item.id, "company", e.target.value)}
                      placeholder="e.g. TechScale Inc."
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Position / Job Title *
                  </label>
                  <input
                    type="text"
                    value={item.position}
                    onChange={(e) => handleUpdateItem(item.id, "position", e.target.value)}
                    placeholder="e.g. Senior Frontend Developer"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={item.location || ""}
                      onChange={(e) => handleUpdateItem(item.id, "location", e.target.value)}
                      placeholder="e.g. San Francisco, CA"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={item.current}
                      onChange={(e) => handleUpdateItem(item.id, "current", e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                    />
                    <span>I currently work here</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="month"
                      value={item.startDate}
                      onChange={(e) => handleUpdateItem(item.id, "startDate", e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    End Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="month"
                      disabled={item.current}
                      value={item.current ? "" : item.endDate}
                      onChange={(e) => handleUpdateItem(item.id, "endDate", e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:opacity-60"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Responsibilities & Achievements *
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAiEnhanceBullet(item)}
                    disabled={loadingAiId === item.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {loadingAiId === item.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    <span>{loadingAiId === item.id ? "Enhancing..." : "Enhance with AI"}</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={item.description}
                  onChange={(e) => handleUpdateItem(item.id, "description", e.target.value)}
                  placeholder="• Led migration to Next.js App Router boosting speed by 40%&#10;• Managed team of 4 engineers&#10;• Delivered key client features..."
                  className="w-full p-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
