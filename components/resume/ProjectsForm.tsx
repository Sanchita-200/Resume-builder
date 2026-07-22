"use client";

import { ProjectItem } from "@/types/resume";
import { FolderGit2, Plus, Trash2, ExternalLink, Code } from "lucide-react";

interface Props {
  data: ProjectItem[];
  onChange: (list: ProjectItem[]) => void;
}

export default function ProjectsForm({ data, onChange }: Props) {
  const handleAddItem = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: "",
      description: "",
      techStack: "",
      link: "",
    };
    onChange([...data, newItem]);
  };

  const handleUpdateItem = (id: string, field: keyof ProjectItem, value: string) => {
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
            <FolderGit2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Projects
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showcase key side-projects, open-source work, or portfolio items.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
          <FolderGit2 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-500 dark:text-slate-400">No projects added yet.</p>
          <button
            type="button"
            onClick={handleAddItem}
            className="mt-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer inline-block"
          >
            + Add your first project
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
                  Project #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 p-1.5 rounded-lg transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer"
                  title="Remove project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleUpdateItem(item.id, "title", e.target.value)}
                    placeholder="e.g. TaskPulse - Agile Platform"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tech Stack (Optional)
                  </label>
                  <div className="relative">
                    <Code className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={item.techStack || ""}
                      onChange={(e) => handleUpdateItem(item.id, "techStack", e.target.value)}
                      placeholder="e.g. Next.js, Tailwind CSS, TypeScript"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Project Link / Repository URL
                  </label>
                  <div className="relative">
                    <ExternalLink className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={item.link || ""}
                      onChange={(e) => handleUpdateItem(item.id, "link", e.target.value)}
                      placeholder="https://github.com/username/project"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Project Description *
                </label>
                <textarea
                  rows={3}
                  value={item.description}
                  onChange={(e) => handleUpdateItem(item.id, "description", e.target.value)}
                  placeholder="Describe the problem solved, features implemented, and impact..."
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
