import { ResumeData, AccentColor } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, ExternalLink, Share2, Code } from "lucide-react";

interface Props {
  data: ResumeData;
  accentColor: AccentColor;
}

const colorMap: Record<AccentColor, { sidebar: string; text: string; tag: string }> = {
  indigo: { sidebar: "bg-slate-900 text-white", text: "text-indigo-400", tag: "bg-indigo-950 text-indigo-200 border-indigo-800" },
  emerald: { sidebar: "bg-slate-900 text-white", text: "text-emerald-400", tag: "bg-emerald-950 text-emerald-200 border-emerald-800" },
  crimson: { sidebar: "bg-slate-900 text-white", text: "text-rose-400", tag: "bg-rose-950 text-rose-200 border-rose-800" },
  amber: { sidebar: "bg-slate-900 text-white", text: "text-amber-400", tag: "bg-amber-950 text-amber-200 border-amber-800" },
  slate: { sidebar: "bg-slate-900 text-white", text: "text-slate-300", tag: "bg-slate-800 text-slate-200 border-slate-700" },
  violet: { sidebar: "bg-slate-900 text-white", text: "text-violet-400", tag: "bg-violet-950 text-violet-200 border-violet-800" },
};

export default function TemplateTech({ data, accentColor }: Props) {
  const { personalInfo, education, experience, skills, projects, certifications, languages } = data;
  const theme = colorMap[accentColor] || colorMap.indigo;

  return (
    <div className="bg-white text-slate-800 text-xs leading-relaxed font-sans min-h-[1050px] shadow-sm grid grid-cols-1 md:grid-cols-3">
      {/* Left Sidebar Column */}
      <aside className={`${theme.sidebar} p-6 space-y-6 md:col-span-1`}>
        {/* Contact Info */}
        <div>
          <h2 className={`text-xs font-mono font-bold uppercase tracking-wider ${theme.text} mb-3 pb-1 border-b border-slate-800`}>
            // Contact
          </h2>
          <div className="space-y-2 text-[11px] text-slate-300">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Share2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-2">
                <Code className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className={`text-xs font-mono font-bold uppercase tracking-wider ${theme.text} mb-3 pb-1 border-b border-slate-800`}>
              // Tech Stack
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((sk) => (
                <span
                  key={sk.id}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${theme.tag}`}
                >
                  {sk.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className={`text-xs font-mono font-bold uppercase tracking-wider ${theme.text} mb-3 pb-1 border-b border-slate-800`}>
              // Certifications
            </h2>
            <div className="space-y-2 text-[11px] text-slate-300">
              {certifications.map((c) => (
                <div key={c.id}>
                  <div className="font-semibold text-white">{c.name}</div>
                  <div className="text-[10px] text-slate-400">{c.issuer}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h2 className={`text-xs font-mono font-bold uppercase tracking-wider ${theme.text} mb-3 pb-1 border-b border-slate-800`}>
              // Languages
            </h2>
            <div className="space-y-1 text-[11px] text-slate-300">
              {languages.map((l) => (
                <div key={l.id} className="flex justify-between">
                  <span>{l.name}</span>
                  <span className="text-[10px] text-slate-400">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Column */}
      <main className="p-6 md:col-span-2 space-y-6">
        {/* Name & Title */}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {personalInfo.fullName || "Developer Name"}
          </h1>
          <p className="text-sm font-mono font-semibold text-slate-600 mt-0.5">
            {personalInfo.jobTitle || "Software Engineer"}
          </p>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <p className="text-slate-700 text-xs leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900 mb-3 pb-1 border-b-2 border-slate-900">
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{exp.position}</h3>
                    <span className="text-[10px] font-mono text-slate-500">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-600 mb-1">{exp.company}</div>
                  <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">{exp.description}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900 mb-3 pb-1 border-b-2 border-slate-900">
              Featured Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between font-bold text-slate-900 text-xs">
                    <span className="flex items-center gap-1">
                      {proj.title}
                      {proj.link && <ExternalLink className="w-3 h-3 text-slate-400" />}
                    </span>
                    {proj.techStack && <span className="text-[10px] font-mono text-slate-500">{proj.techStack}</span>}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900 mb-3 pb-1 border-b-2 border-slate-900">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{edu.degree} in {edu.fieldOfStudy}</span>
                    <div className="text-slate-600">{edu.institution}</div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
