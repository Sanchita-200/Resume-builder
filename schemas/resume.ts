import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  email: z.string().email("Invalid email address").or(z.string().min(1, "Email is required")),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  summary: z.string().min(10, "Summary should be at least 10 characters"),
});

export const educationItemSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution name is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  location: z.string().optional(),
  description: z.string().optional(),
});

export const experienceItemSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().min(1, "Description is required"),
});

export const skillItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Skill name is required"),
  level: z.string().optional(),
  category: z.string().optional(),
});

export const projectItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(1, "Project description is required"),
  techStack: z.string().optional(),
  link: z.string().optional(),
});

export const certificationItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Certification name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  url: z.string().optional(),
});

export const languageItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Language name is required"),
  proficiency: z.string().min(1, "Proficiency level is required"),
});

export const resumeDataSchema = z.object({
  personalInfo: personalInfoSchema,
  education: z.array(educationItemSchema),
  experience: z.array(experienceItemSchema),
  skills: z.array(skillItemSchema),
  projects: z.array(projectItemSchema),
  certifications: z.array(certificationItemSchema),
  languages: z.array(languageItemSchema),
});
