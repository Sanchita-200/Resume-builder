"use client";

import { LanguageItem } from "@/types/resume";
import { Languages, Plus, Trash2 } from "lucide-react";

interface Props {
  data: LanguageItem[];
  onChange: (list: LanguageItem[]) => void;
}

export default function LanguagesForm({ data, onChange }: Props) {
  const handleAddItem = () => {
    const newItem: LanguageItem = {
      id: `lang-${Date.now()}`,
      name: "",
      proficiency: "Fluent",
    };
    onChange([...data, newItem]);
  };

  const handleUpdateItem = (id: string, field: keyof LanguageItem, value: string) => {
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
            <Languages className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Languages
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Specify languages spoken and proficiency levels.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Language
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
          <Languages className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-500 dark:text-slate-400">No languages added yet.</p>
          <button
            type="button"
            onClick={handleAddItem}
            className="mt-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer inline-block"
          >
            + Add language
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 relative group transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleUpdateItem(item.id, "name", e.target.value)}
                  placeholder="e.g. English"
                  className="w-full px-2.5 py-1.5 text-sm font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 p-1.5 rounded-lg transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer"
                  title="Remove language"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Proficiency Level</label>
                <select
                  value={item.proficiency}
                  onChange={(e) => handleUpdateItem(item.id, "proficiency", e.target.value)}
                  className="w-full px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs outline-none"
                >
                  <option value="Native">Native / Bilingual</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Professional">Professional Working</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
