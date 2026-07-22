"use client";

import { CertificationItem } from "@/types/resume";
import { Award, Plus, Trash2, Calendar, Link as LinkIcon, Building } from "lucide-react";

interface Props {
  data: CertificationItem[];
  onChange: (list: CertificationItem[]) => void;
}

export default function CertificationsForm({ data, onChange }: Props) {
  const handleAddItem = () => {
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: "",
      issuer: "",
      issueDate: "",
      url: "",
    };
    onChange([...data, newItem]);
  };

  const handleUpdateItem = (id: string, field: keyof CertificationItem, value: string) => {
    const updated = data.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    onChange(updated);
  };

  const handleRemoveItem = (id: string) => {
    onChange(data.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Certifications & Licenses
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            List industry certifications, credentials, and achievements.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Certification
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
          <Award className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-500 dark:text-slate-400">No certifications added yet.</p>
          <button
            type="button"
            onClick={handleAddItem}
            className="mt-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer inline-block"
          >
            + Add certification
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((item, index) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 relative group transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-600 dark:text-slate-300">
                  Certification #{index + 1}
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
                    Certification Name *
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleUpdateItem(item.id, "name", e.target.value)}
                    placeholder="e.g. AWS Solutions Architect"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Issuing Organization *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={item.issuer}
                      onChange={(e) => handleUpdateItem(item.id, "issuer", e.target.value)}
                      placeholder="e.g. Amazon Web Services"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Issue Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="month"
                      value={item.issueDate}
                      onChange={(e) => handleUpdateItem(item.id, "issueDate", e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Verification URL (Optional)
                  </label>
                  <div className="relative">
                    <LinkIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={item.url || ""}
                      onChange={(e) => handleUpdateItem(item.id, "url", e.target.value)}
                      placeholder="https://credential.url"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
