import { ResumeData } from "@/types/resume";

export interface AtsAnalysisResult {
  score: number; // 0 - 100
  rating: "Needs Work" | "Good" | "Excellent" | "ATS Master";
  strengths: string[];
  missingKeywords: string[];
  recommendations: string[];
}

export async function generateAiSummary(jobTitle: string, currentSummary?: string): Promise<string> {
  // Simulate AI latency for realistic UX
  await new Promise((res) => setTimeout(res, 600));

  const title = jobTitle.trim() || "Software Engineer & Technology Professional";

  const summaries: Record<string, string> = {
    engineer: `Results-oriented ${title} with 5+ years of experience engineering scalable web applications, optimizing database performance, and delivering robust full-stack software solutions. Proven track record of improving application throughput by 35% and collaborating across agile engineering teams to accelerate product delivery cycles.`,
    developer: `Passionate and detail-driven ${title} specializing in modern frontend and backend frameworks. Adept at transforming complex user requirements into elegant, high-performance digital products. Recognized for technical leadership, clean code practices, and continuous integration workflows.`,
    manager: `Strategic and growth-focused ${title} with a strong background in cross-functional team leadership, project execution, and client stakeholder management. Skilled in optimizing operations, driving cross-team alignment, and delivering complex milestones on schedule and within budget.`,
    designer: `Creative and user-centered ${title} adept at building intuitive digital interfaces, design systems, and responsive user experiences. Combines strong aesthetic vision with data-informed UX research to boost user engagement and product retention metrics.`,
  };

  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("manager") || lowerTitle.includes("lead")) {
    return summaries.manager;
  }
  if (lowerTitle.includes("design") || lowerTitle.includes("ux") || lowerTitle.includes("ui")) {
    return summaries.designer;
  }
  if (lowerTitle.includes("developer") || lowerTitle.includes("frontend") || lowerTitle.includes("backend")) {
    return summaries.developer;
  }

  return summaries.engineer;
}

export async function enhanceAiExperienceBullet(position: string, company: string, description: string): Promise<string> {
  await new Promise((res) => setTimeout(res, 600));

  const pos = position.trim() || "Role";

  if (!description.trim()) {
    return `• Spearheaded core software feature development for ${pos} position, improving system reliability by 28% and reducing customer support tickets.\n• Collaborated with cross-functional engineering teams to implement automated CI/CD pipelines, accelerating release cycles by 40%.\n• Optimized database query logic and backend APIs, resulting in a 2.5x increase in page load speeds across high-traffic user endpoints.`;
  }

  // Enhance existing bullet points with action verbs and metrics
  const lines = description
    .split("\n")
    .map((l) => l.trim().replace(/^[-•*]\s*/, ""))
    .filter(Boolean);

  const enhanced = lines.map((line, idx) => {
    if (idx === 0) {
      return `• Spearheaded ${line.toLowerCase()}, driving a 30% increase in operational performance and team productivity.`;
    }
    if (idx === 1) {
      return `• Engineered automated workflows for ${line.toLowerCase()}, reducing process latency by 45% and eliminating manual error rates.`;
    }
    return `• Delivered ${line.toLowerCase()} across multi-platform environments, ensuring compliance with industry standards and 99.9% uptime.`;
  });

  return enhanced.join("\n");
}

export async function getAiSkillSuggestions(jobTitle: string): Promise<{ hardSkills: string[]; softSkills: string[] }> {
  await new Promise((res) => setTimeout(res, 400));

  const lower = jobTitle.toLowerCase();

  if (lower.includes("design") || lower.includes("ux")) {
    return {
      hardSkills: ["Figma", "UI/UX Design", "Wireframing", "Prototyping", "Design Systems", "User Research", "Adobe XD"],
      softSkills: ["Empathy", "Visual Communication", "Design Thinking", "Feedback Receptivity", "Collaboration"],
    };
  }

  if (lower.includes("manager") || lower.includes("product") || lower.includes("project")) {
    return {
      hardSkills: ["Agile/Scrum", "Jira", "Product Roadmap", "KPI Analytics", "Risk Management", "Budgeting", "SQL"],
      softSkills: ["Leadership", "Stakeholder Management", "Strategic Planning", "Problem Solving", "Conflict Resolution"],
    };
  }

  if (lower.includes("data") || lower.includes("analyst")) {
    return {
      hardSkills: ["Python", "SQL", "Tableau", "Power BI", "Pandas", "Machine Learning", "Data Visualization", "ETL"],
      softSkills: ["Analytical Thinking", "Data Storytelling", "Attention to Detail", "Critical Reasoning"],
    };
  }

  // Default Tech / Software Developer Skills
  return {
    hardSkills: ["React.js", "TypeScript", "Next.js", "Node.js", "Tailwind CSS", "REST APIs", "GraphQL", "Git & GitHub", "Docker", "SQL"],
    softSkills: ["Problem Solving", "Agile Collaboration", "Technical Communication", "Code Review Leadership", "Adaptability"],
  };
}

export async function analyzeAtsScore(data: ResumeData): Promise<AtsAnalysisResult> {
  await new Promise((res) => setTimeout(res, 500));

  let score = 50;
  const strengths: string[] = [];
  const missingKeywords: string[] = [];
  const recommendations: string[] = [];

  // Personal Info Audit
  if (data.personalInfo.fullName && data.personalInfo.email && data.personalInfo.phone) {
    score += 10;
    strengths.push("Complete Contact Information (Name, Email, Phone).");
  } else {
    recommendations.push("Add complete contact details (email and phone number).");
  }

  if (data.personalInfo.summary && data.personalInfo.summary.length > 50) {
    score += 10;
    strengths.push("Professional Summary is present and well-structured.");
  } else {
    recommendations.push("Add a targeted 2-3 sentence Professional Summary at the top.");
  }

  // Experience Audit
  if (data.experience && data.experience.length > 0) {
    score += 15;
    strengths.push(`Includes ${data.experience.length} work experience entries.`);
    const hasBullets = data.experience.some((e) => e.description && (e.description.includes("•") || e.description.includes("%")));
    if (hasBullets) {
      score += 10;
      strengths.push("Work Experience uses bullet points and measurable impact metrics (%).");
    } else {
      recommendations.push("Add measurable metrics (%) and bullet points to your work experience duties.");
    }
  } else {
    recommendations.push("Add at least 1 work experience entry.");
  }

  // Education Audit
  if (data.education && data.education.length > 0) {
    score += 10;
    strengths.push("Education section is filled with degree and institution.");
  } else {
    recommendations.push("Add your highest degree and education institution.");
  }

  // Skills Audit
  if (data.skills && data.skills.length >= 5) {
    score += 10;
    strengths.push(`Contains ${data.skills.length} skills keywords.`);
  } else {
    recommendations.push("Include at least 5-8 relevant industry skills.");
    missingKeywords.push("CI/CD", "TypeScript", "Agile Methodology", "Cross-Functional Collaboration");
  }

  const finalScore = Math.min(100, Math.max(40, score));

  let rating: AtsAnalysisResult["rating"] = "Good";
  if (finalScore >= 90) rating = "ATS Master";
  else if (finalScore >= 75) rating = "Excellent";
  else if (finalScore >= 60) rating = "Good";
  else rating = "Needs Work";

  return {
    score: finalScore,
    rating,
    strengths,
    missingKeywords: missingKeywords.length > 0 ? missingKeywords : ["CI/CD Pipelines", "System Architecture", "KPI Optimization"],
    recommendations,
  };
}

export async function generateAiCoverLetter(data: ResumeData, companyName = "Target Company"): Promise<string> {
  await new Promise((res) => setTimeout(res, 600));

  const name = data.personalInfo.fullName || "Applicant Name";
  const title = data.personalInfo.jobTitle || "Professional";
  const email = data.personalInfo.email || "email@example.com";
  const phone = data.personalInfo.phone || "(555) 000-0000";
  const dateStr = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const skillsStr = data.skills && data.skills.length > 0 ? data.skills.slice(0, 4).map((s) => s.name).join(", ") : "modern technology and strategic planning";

  return `${name}
${email} | ${phone}
${dateStr}

Hiring Manager
${companyName}

Dear Hiring Manager,

I am writing to express my enthusiastic interest in the ${title} position at ${companyName}. With a strong background in software development, project execution, and key competencies in ${skillsStr}, I am eager to contribute to ${companyName}'s engineering goals and product innovation.

In my recent experience as a ${data.experience[0]?.position || title} at ${data.experience[0]?.company || "my previous organization"}, I successfully spearheaded key initiatives that improved application scalability and operational throughput. I thrive in collaborative, fast-paced environments where technical precision and user-centered design intersect.

I would welcome the opportunity to discuss how my technical skills, proactive problem-solving, and dedication to excellence align with the needs of ${companyName}. Thank you for your time and consideration.

Sincerely,

${name}`;
}
