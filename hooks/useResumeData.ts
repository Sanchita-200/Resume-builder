"use client";

import { useState, useEffect, useCallback } from "react";
import { ResumeData, ResumeConfig, TemplateId, AccentColor } from "@/types/resume";
import { initialResumeData, defaultResumeConfig } from "@/lib/sampleData";
import {
  loadResumeData,
  saveResumeData,
  loadResumeConfig,
  saveResumeConfig,
  clearResumeStorage,
} from "@/lib/localStorage";

export function useResumeData() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [config, setConfig] = useState<ResumeConfig>(defaultResumeConfig);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Hydrate state from localStorage on initial load
  useEffect(() => {
    const data = loadResumeData();
    const cfg = loadResumeConfig();
    setResumeData(data);
    setConfig(cfg);
    setIsLoaded(true);
  }, []);

  // Save changes to localStorage with debounced save timestamp indicator
  useEffect(() => {
    if (!isLoaded) return;
    saveResumeData(resumeData);
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setLastSaved(now);
  }, [resumeData, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    saveResumeConfig(config);
  }, [config, isLoaded]);

  const updatePersonalInfo = useCallback((info: Partial<ResumeData["personalInfo"]>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  }, []);

  const setEducationList = useCallback((list: ResumeData["education"]) => {
    setResumeData((prev) => ({ ...prev, education: list }));
  }, []);

  const setExperienceList = useCallback((list: ResumeData["experience"]) => {
    setResumeData((prev) => ({ ...prev, experience: list }));
  }, []);

  const setSkillsList = useCallback((list: ResumeData["skills"]) => {
    setResumeData((prev) => ({ ...prev, skills: list }));
  }, []);

  const setProjectsList = useCallback((list: ResumeData["projects"]) => {
    setResumeData((prev) => ({ ...prev, projects: list }));
  }, []);

  const setCertificationsList = useCallback((list: ResumeData["certifications"]) => {
    setResumeData((prev) => ({ ...prev, certifications: list }));
  }, []);

  const setLanguagesList = useCallback((list: ResumeData["languages"]) => {
    setResumeData((prev) => ({ ...prev, languages: list }));
  }, []);

  const setTemplate = useCallback((template: TemplateId) => {
    setConfig((prev) => ({ ...prev, template }));
  }, []);

  const setAccentColor = useCallback((accentColor: AccentColor) => {
    setConfig((prev) => ({ ...prev, accentColor }));
  }, []);

  const loadSampleData = useCallback(() => {
    setResumeData(initialResumeData);
    setConfig(defaultResumeConfig);
    saveResumeData(initialResumeData);
    saveResumeConfig(defaultResumeConfig);
  }, []);

  const resetResume = useCallback(() => {
    const emptyData: ResumeData = {
      personalInfo: {
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
      },
      education: [],
      experience: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: [],
    };
    setResumeData(emptyData);
    clearResumeStorage();
  }, []);

  return {
    resumeData,
    config,
    activeStep,
    setActiveStep,
    isLoaded,
    lastSaved,
    updatePersonalInfo,
    setEducationList,
    setExperienceList,
    setSkillsList,
    setProjectsList,
    setCertificationsList,
    setLanguagesList,
    setTemplate,
    setAccentColor,
    loadSampleData,
    resetResume,
  };
}
