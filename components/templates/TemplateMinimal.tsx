import { ResumeData, AccentColor } from "@/types/resume";

interface Props {
  data: ResumeData;
  accentColor: AccentColor;
}

const colorMap: Record<AccentColor, string> = {
  indigo: "#4f46e5",
  emerald: "#059669",
  crimson: "#e11d48",
  amber: "#d97706",
  slate: "#334155",
  violet: "#7c3aed",
};

export default function TemplateMinimal({ data, accentColor }: Props) {
  const { personalInfo, education, experience, skills, projects, certifications, languages } = data;
  const accent = colorMap[accentColor] || colorMap.indigo;

  return (
    <div className="bg-white text-slate-800 p-8 text-xs leading-relaxed font-sans min-h-[1050px] shadow-sm">
      {/* Header */}
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-light tracking-tight text-slate-900">
            <span className="font-bold">{personalInfo.fullName.split(" ")[0]}</span>{" "}
            {personalInfo.fullName.split(" ").slice(1).join(" ")}
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-0.5">{personalInfo.jobTitle}</p>
        </div>

        <div className="mt-2 md:mt-0 text-left md:text-right text-[11px] text-slate-500 space-y-0.5">
          <div>{personalInfo.email} • {personalInfo.phone}</div>
          <div>{personalInfo.location} {personalInfo.website ? `• ${personalInfo.website}` : ""}</div>
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <p className="text-slate-600 text-xs leading-relaxed mb-6 font-light">{personalInfo.summary}</p>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: accent }}>
                <div className="flex justify-between items-baseline font-semibold text-slate-900">
                  <span>{exp.position}</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mb-1">{exp.company}</div>
                <p className="text-slate-700 text-xs whitespace-pre-line leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div key={proj.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <h3 className="font-bold text-slate-900 text-xs">{proj.title}</h3>
                {proj.techStack && <span className="text-[10px] text-slate-500 block font-mono mt-0.5">{proj.techStack}</span>}
                <p className="text-slate-600 text-[11px] mt-1">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Education</h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-500">{edu.institution} ({edu.startDate} – {edu.endDate})</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-1">
              {skills.map((s) => (
                <span key={s.id} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px]">
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
