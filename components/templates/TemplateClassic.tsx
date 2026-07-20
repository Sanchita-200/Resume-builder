import { ResumeData, AccentColor } from "@/types/resume";

interface Props {
  data: ResumeData;
  accentColor: AccentColor;
}

const colorMap: Record<AccentColor, string> = {
  indigo: "#3730a3",
  emerald: "#065f46",
  crimson: "#9f1239",
  amber: "#92400e",
  slate: "#1e293b",
  violet: "#5b21b6",
};

export default function TemplateClassic({ data, accentColor }: Props) {
  const { personalInfo, education, experience, skills, projects, certifications, languages } = data;
  const primaryColor = colorMap[accentColor] || colorMap.indigo;

  return (
    <div className="bg-white text-slate-900 p-8 text-sm leading-relaxed font-serif min-h-[1050px] shadow-sm">
      {/* Centered Traditional Header */}
      <header className="text-center mb-6 pb-4 border-b-2 border-slate-900">
        <h1 className="text-3xl font-extrabold uppercase tracking-wide" style={{ color: primaryColor }}>
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        <p className="text-base font-semibold italic text-slate-700 mt-1">
          {personalInfo.jobTitle || "Professional Title"}
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-600 font-sans">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.email && <span>• {personalInfo.email}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-2 font-sans" style={{ color: primaryColor }}>
            Executive Summary
          </h2>
          <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-3 font-sans" style={{ color: primaryColor }}>
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900 text-sm">
                  <span>{exp.position}</span>
                  <span className="text-xs font-normal text-slate-600 font-sans">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="text-xs italic text-slate-700 mb-1 font-sans">
                  {exp.company} {exp.location ? `, ${exp.location}` : ""}
                </div>
                <div className="text-xs text-slate-800 whitespace-pre-line leading-relaxed">
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
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-3 font-sans" style={{ color: primaryColor }}>
            Key Projects & Initiatives
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs sm:text-sm">
                  <span>{proj.title}</span>
                  {proj.techStack && <span className="text-[11px] font-normal font-sans text-slate-500">{proj.techStack}</span>}
                </div>
                <p className="text-xs text-slate-800 mt-1">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-3 font-sans" style={{ color: primaryColor }}>
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline text-xs sm:text-sm">
                <div>
                  <span className="font-bold text-slate-900">{edu.institution}</span> – {edu.degree} in {edu.fieldOfStudy}
                  {edu.description && <div className="text-xs italic text-slate-600">{edu.description}</div>}
                </div>
                <span className="text-xs text-slate-600 font-sans">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-2" style={{ color: primaryColor }}>
              Core Competencies
            </h2>
            <p className="text-xs text-slate-800 leading-relaxed">
              {skills.map((s) => s.name).join(" • ")}
            </p>
          </section>
        )}

        {(certifications.length > 0 || languages.length > 0) && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-2" style={{ color: primaryColor }}>
              Certifications & Languages
            </h2>
            <div className="text-xs text-slate-800 space-y-1">
              {certifications.map((c) => (
                <div key={c.id}><strong>{c.name}</strong> – {c.issuer}</div>
              ))}
              {languages.map((l) => (
                <div key={l.id}><strong>{l.name}:</strong> {l.proficiency}</div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
