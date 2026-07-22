"use client";

import { useState } from "react";
import { SkillItem } from "@/types/resume";
import { getAiSkillSuggestions } from "@/lib/ai";
import { Wrench, Plus, Trash2, Sparkles, Loader2 } from "lucide-react";

interface Props {
  data: SkillItem[];
  onChange: (list: SkillItem[]) => void;
}

const defaultSuggestions = [
  "React.js",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "REST APIs",
  "GraphQL",
  "Git",
  "Docker",
  "SQL",
  "Agile/Scrum",
];

export default function SkillsForm({ data, onChange }: Props) {
  const [suggestions, setSuggestions] = useState<string[]>(defaultSuggestions);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  const handleAddItem = () => {
    const newItem: SkillItem = {
      id: `sk-${Date.now()}`,
      name: "",
      level: "Advanced",
      category: "Technical",
    };
    onChange([...data, newItem]);
  };

  const handleAddSuggestedSkill = (skillName: string) => {
    if (data.some((s) => s.name.toLowerCase() === skillName.toLowerCase())) return;
    const newItem: SkillItem = {
      id: `sk-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      name: skillName,
      level: "Advanced",
      category: "Technical",
    };
    onChange([...data, newItem]);
  };

  const handleUpdateItem = (id: string, field: keyof SkillItem, value: string) => {
    const updated = data.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    onChange(updated);
  };

  const handleRemoveItem = (id: string) => {
    onChange(data.filter((item) => item.id !== id));
  };

  const handleFetchAiSuggestions = async () => {
    setIsLoadingAi(true);
    const res = await getAiSkillSuggestions("Software Engineer");
    setSuggestions(res.hardSkills);
    setIsLoadingAi(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Skills & Competencies
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Highlight technical skills, tools, frameworks, and core capabilities.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      {/* AI Quick Skill Suggestions Bar */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            Quick AI Skill Recommendations (1-Click Add):
          </span>

          <button
            type="button"
            onClick={handleFetchAiSuggestions}
            disabled={isLoadingAi}
            className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            {isLoadingAi ? "Refreshing..." : "Refresh Suggestions"}
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {suggestions.map((skill) => {
            const isAdded = data.some((s) => s.name.toLowerCase() === skill.toLowerCase());
            return (
              <button
                key={skill}
                type="button"
                disabled={isAdded}
                onClick={() => handleAddSuggestedSkill(skill)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isAdded
                    ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 cursor-default opacity-70"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
                }`}
              >
                {isAdded ? `✓ ${skill}` : `+ ${skill}`}
              </button>
            );
          })}
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
          <Wrench className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-500 dark:text-slate-400">No skills added yet.</p>
          <button
            type="button"
            onClick={handleAddItem}
            className="mt-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer inline-block"
          >
            + Add key skills
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
                  placeholder="e.g. React / Next.js"
                  className="w-full px-2.5 py-1.5 text-sm font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 p-1.5 rounded-lg transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer"
                  title="Remove skill"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Proficiency</label>
                  <select
                    value={item.level || "Advanced"}
                    onChange={(e) => handleUpdateItem(item.id, "level", e.target.value)}
                    className="w-full px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Category</label>
                  <input
                    type="text"
                    value={item.category || ""}
                    onChange={(e) => handleUpdateItem(item.id, "category", e.target.value)}
                    placeholder="e.g. Frontend"
                    className="w-full px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
