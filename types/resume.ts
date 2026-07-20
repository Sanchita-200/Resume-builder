export type TemplateId = "modern" | "classic" | "minimal" | "tech" | "creative";

export type AccentColor =
  | "indigo"
  | "emerald"
  | "crimson"
  | "amber"
  | "slate"
  | "violet";

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  location?: string;
  description?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert" | string;
  category?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  techStack?: string;
  link?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  url?: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: "Native" | "Fluent" | "Professional" | "Intermediate" | "Basic" | string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
}

export interface ResumeConfig {
  template: TemplateId;
  accentColor: AccentColor;
}