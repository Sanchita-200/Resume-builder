import { ResumeData, ResumeConfig } from "@/types/resume";

export const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "Alex Morgan",
    jobTitle: "Senior Full Stack Engineer",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    website: "https://alexmorgan.dev",
    linkedin: "https://linkedin.com/in/alexmorgan",
    github: "https://github.com/alexmorgan",
    summary:
      "Passionate and result-driven Senior Full Stack Engineer with 6+ years of experience architecting high-performance web applications, scalable APIs, and intuitive user interfaces. Adept in Next.js, React, TypeScript, Node.js, and cloud native technology.",
  },
  education: [
    {
      id: "edu-1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2015-08",
      endDate: "2019-05",
      location: "Berkeley, CA",
      description: "Graduated with Honors. Coursework in Distributed Systems, Algorithms, and UI Design.",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "TechScale Solutions",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2022-03",
      endDate: "Present",
      current: true,
      description:
        "• Spearheaded frontend architecture migration to Next.js App Router, boosting page load speeds by 42%.\n• Designed and delivered micro-frontends serving over 1.2M monthly active users.\n• Mentored 5 junior engineers and led bi-weekly code review workshops.",
    },
    {
      id: "exp-2",
      company: "Innovate Labs",
      position: "Full Stack Developer",
      location: "San Jose, CA",
      startDate: "2019-06",
      endDate: "2022-02",
      current: false,
      description:
        "• Built real-time analytics dashboard with React, Tailwind CSS, and WebSockets.\n• Optimized PostgreSQL queries reducing database query latency by 35%.\n• Collaborated closely with product managers to deliver 15+ high-priority features.",
    },
  ],
  skills: [
    { id: "sk-1", name: "React / Next.js", level: "Expert", category: "Frontend" },
    { id: "sk-2", name: "TypeScript", level: "Expert", category: "Frontend" },
    { id: "sk-3", name: "Tailwind CSS", level: "Advanced", category: "Frontend" },
    { id: "sk-4", name: "Node.js / Express", level: "Advanced", category: "Backend" },
    { id: "sk-5", name: "PostgreSQL & Prisma", level: "Intermediate", category: "Backend" },
    { id: "sk-6", name: "Git / CI/CD", level: "Advanced", category: "DevOps" },
  ],
  projects: [
    {
      id: "proj-1",
      title: "TaskPulse - Agile Management Platform",
      description:
        "A real-time Kanban and task tracking platform featuring drag-and-drop boards, analytics, and instant team notifications.",
      techStack: "Next.js, TypeScript, Tailwind CSS, Zustand, Supabase",
      link: "https://taskpulse.demo.app",
    },
    {
      id: "proj-2",
      title: "DevFlow - Markdown Documentation Engine",
      description:
        "Lightweight, ultra-fast static site generator designed specifically for developer documentation with live search.",
      techStack: "React, MDX, Tailwind CSS, Node.js",
      link: "https://github.com/alexmorgan/devflow",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      issueDate: "2023-09",
      url: "https://aws.amazon.com/verification",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native" },
    { id: "lang-2", name: "Spanish", proficiency: "Intermediate" },
  ],
};

export const defaultResumeConfig: ResumeConfig = {
  template: "modern",
  accentColor: "indigo",
};
