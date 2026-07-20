import { ResumeData, ResumeConfig } from "@/types/resume";
import { initialResumeData, defaultResumeConfig } from "./sampleData";

const RESUME_DATA_KEY = "ai_resume_builder_data";
const RESUME_CONFIG_KEY = "ai_resume_builder_config";

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
