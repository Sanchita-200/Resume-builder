import { ResumeData, ResumeConfig, TemplateId, AccentColor } from "@/types/resume";
import { initialResumeData, defaultResumeConfig } from "./sampleData";

const RESUME_DATA_KEY = "ai_resume_builder_data";
const RESUME_CONFIG_KEY = "ai_resume_builder_config";
const SAVED_RESUMES_LIST_KEY = "ai_resume_builder_saved_list";

export interface SavedResumeItem {
  id: string;
  title: string;
  updatedAt: string;
  template: TemplateId;
  accentColor: AccentColor;
  data: ResumeData;
}

export function loadResumeData(): ResumeData {
  if (typeof window === "undefined") return initialResumeData;
  try {
    const saved = localStorage.getItem(RESUME_DATA_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to load resume data from localStorage:", error);
  }
  return initialResumeData;
}

export function saveResumeData(data: ResumeData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(RESUME_DATA_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save resume data to localStorage:", error);
  }
}

export function loadResumeConfig(): ResumeConfig {
  if (typeof window === "undefined") return defaultResumeConfig;
  try {
    const saved = localStorage.getItem(RESUME_CONFIG_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to load resume config from localStorage:", error);
  }
  return defaultResumeConfig;
}

export function saveResumeConfig(config: ResumeConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(RESUME_CONFIG_KEY, JSON.stringify(config));
  } catch (error) {
    console.error("Failed to save resume config to localStorage:", error);
  }
}

export function clearResumeStorage(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(RESUME_DATA_KEY);
    localStorage.removeItem(RESUME_CONFIG_KEY);
  } catch (error) {
    console.error("Failed to clear resume storage:", error);
  }
}

// Saved Resumes List Methods
export function loadSavedResumesList(): SavedResumeItem[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(SAVED_RESUMES_LIST_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    // Default initial sample item if empty
    const defaultItem: SavedResumeItem = {
      id: "res_sample_1",
      title: `${initialResumeData.personalInfo.fullName}'s Professional Resume`,
      updatedAt: new Date().toLocaleDateString(),
      template: "modern",
      accentColor: "indigo",
      data: initialResumeData,
    };
    localStorage.setItem(SAVED_RESUMES_LIST_KEY, JSON.stringify([defaultItem]));
    return [defaultItem];
  } catch (error) {
    console.error("Failed to load saved resumes list:", error);
    return [];
  }
}

export function saveResumeToList(item: SavedResumeItem): SavedResumeItem[] {
  if (typeof window === "undefined") return [];
  try {
    const list = loadSavedResumesList();
    const existingIdx = list.findIndex((r) => r.id === item.id);
    let updated: SavedResumeItem[];
    if (existingIdx !== -1) {
      list[existingIdx] = item;
      updated = list;
    } else {
      updated = [item, ...list];
    }
    localStorage.setItem(SAVED_RESUMES_LIST_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error("Failed to save resume item to list:", error);
    return [];
  }
}

export function deleteResumeFromList(id: string): SavedResumeItem[] {
  if (typeof window === "undefined") return [];
  try {
    const list = loadSavedResumesList();
    const filtered = list.filter((r) => r.id !== id);
    localStorage.setItem(SAVED_RESUMES_LIST_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (error) {
    console.error("Failed to delete resume item from list:", error);
    return [];
  }
}
