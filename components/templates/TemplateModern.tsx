import { ResumeData, AccentColor } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, ExternalLink, Share2, Code } from "lucide-react";

interface Props {
  data: ResumeData;
  accentColor: AccentColor;
}

const colorClasses: Record<AccentColor, { primary: string; lightBg: string; border: string }> = {
  indigo: { primary: "text-indigo-600", lightBg: "bg-indigo-50 text-indigo-700 border-indigo-200", border: "border-indigo-600" },
  emerald: { primary: "text-emerald-600", lightBg: "bg-emerald-50 text-emerald-700 border-emerald-200", border: "border-emerald-600" },
  crimson: { primary: "text-rose-600", lightBg: "bg-rose-50 text-rose-700 border-rose-200", border: "border-rose-600" },
  amber: { primary: "text-amber-600", lightBg: "bg-amber-50 text-amber-700 border-amber-200", border: "border-amber-600" },
  slate: { primary: "text-slate-800", lightBg: "bg-slate-100 text-slate-800 border-slate-300", border: "border-slate-800" },
  violet: { primary: "text-violet-600", lightBg: "bg-violet-50 text-violet-700 border-violet-200", border: "border-violet-600" },
};

export default function TemplateModern({ data, accentColor }: Props) {
  const { personalInfo, education, experience, skills, projects, certifications, languages } = data;
  const theme = colorClasses[accentColor] || colorClasses.indigo;

  return (
    <div className="bg-white text-slate-800 p-8 text-sm leading-relaxed font-sans min-h-[1050px] shadow-sm">
      {/* Header */}
      <header className={`border-b-4 ${theme.border} pb-5 mb-6`}>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        <p className={`text-lg font-semibold ${theme.primary} mt-0.5`}>
          {personalInfo.jobTitle || "Job Title"}
        </p>

        {/* Contact info row */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              {personalInfo.website}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Share2 className="w-3.5 h-3.5" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1">
              <Code className="w-3.5 h-3.5" />
              {personalInfo.github}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className={`text-xs font-extrabold uppercase tracking-wider ${theme.primary} mb-2`}>
            Professional Summary
          </h2>
          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className={`text-xs font-extrabold uppercase tracking-wider ${theme.primary} mb-3 pb-1 border-b border-slate-200`}>
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-wrap items-baseline justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">{exp.position}</h3>
                  <span className="text-xs text-slate-500 font-medium">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-600 mb-1.5">
                  {exp.company} {exp.location ? `• ${exp.location}` : ""}
                </div>
                <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className={`text-xs font-extrabold uppercase tracking-wider ${theme.primary} mb-3 pb-1 border-b border-slate-200`}>
            Key Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs sm:text-sm">
                    <span>{proj.title}</span>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  {proj.techStack && (
                    <span className="text-[11px] font-mono text-slate-500">{proj.techStack}</span>
                  )}
                </div>
                <p className="text-xs text-slate-700 mt-1">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className={`text-xs font-extrabold uppercase tracking-wider ${theme.primary} mb-3 pb-1 border-b border-slate-200`}>
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                    {edu.degree} in {edu.fieldOfStudy}
                  </h3>
                  <div className="text-xs text-slate-600">
                    {edu.institution} {edu.location ? `• ${edu.location}` : ""}
                  </div>
                  {edu.description && <p className="text-xs text-slate-500 mt-0.5">{edu.description}</p>}
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grid for Skills, Certifications, Languages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className={`text-xs font-extrabold uppercase tracking-wider ${theme.primary} mb-2 pb-1 border-b border-slate-200`}>
              Skills & Expertise
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((sk) => (
                <span
                  key={sk.id}
                  className={`text-xs px-2.5 py-1 rounded-md border font-medium ${theme.lightBg}`}
                >
                  {sk.name} {sk.level ? `(${sk.level})` : ""}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Languages */}
        <div className="space-y-4">
          {certifications.length > 0 && (
            <section>
              <h2 className={`text-xs font-extrabold uppercase tracking-wider ${theme.primary} mb-2 pb-1 border-b border-slate-200`}>
                Certifications
              </h2>
              <div className="space-y-1.5">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-xs text-slate-800">
                    <span className="font-bold">{cert.name}</span> – <span className="text-slate-600">{cert.issuer}</span> ({cert.issueDate})
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 className={`text-xs font-extrabold uppercase tracking-wider ${theme.primary} mb-2 pb-1 border-b border-slate-200`}>
                Languages
              </h2>
              <div className="flex flex-wrap gap-3 text-xs text-slate-700">
                {languages.map((lang) => (
                  <span key={lang.id}>
                    <strong className="font-semibold text-slate-900">{lang.name}:</strong> {lang.proficiency}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
