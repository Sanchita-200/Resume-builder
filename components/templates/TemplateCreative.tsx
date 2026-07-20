import { ResumeData, AccentColor } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Share2, Code } from "lucide-react";

interface Props {
  data: ResumeData;
  accentColor: AccentColor;
}

const colorMap: Record<AccentColor, { headerBg: string; text: string; badge: string }> = {
  indigo: { headerBg: "bg-gradient-to-r from-indigo-700 to-purple-700 text-white", text: "text-indigo-600", badge: "bg-indigo-100 text-indigo-800" },
  emerald: { headerBg: "bg-gradient-to-r from-emerald-700 to-teal-700 text-white", text: "text-emerald-600", badge: "bg-emerald-100 text-emerald-800" },
  crimson: { headerBg: "bg-gradient-to-r from-rose-700 to-pink-700 text-white", text: "text-rose-600", badge: "bg-rose-100 text-rose-800" },
  amber: { headerBg: "bg-gradient-to-r from-amber-600 to-orange-600 text-white", text: "text-amber-600", badge: "bg-amber-100 text-amber-800" },
  slate: { headerBg: "bg-slate-800 text-white", text: "text-slate-800", badge: "bg-slate-200 text-slate-900" },
  violet: { headerBg: "bg-gradient-to-r from-violet-700 to-fuchsia-700 text-white", text: "text-violet-600", badge: "bg-violet-100 text-violet-800" },
};

export default function TemplateCreative({ data, accentColor }: Props) {
  const { personalInfo, education, experience, skills, projects, certifications, languages } = data;
  const theme = colorMap[accentColor] || colorMap.indigo;

  return (
    <div className="bg-white text-slate-800 text-xs leading-relaxed font-sans min-h-[1050px] shadow-sm overflow-hidden">
      {/* Top Banner Accent */}
      <header className={`${theme.headerBg} p-8`}>
        <h1 className="text-3xl font-black tracking-tight">{personalInfo.fullName || "Creative Candidate"}</h1>
        <p className="text-base font-medium opacity-90 mt-0.5">{personalInfo.jobTitle || "UX/UI Designer & Developer"}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs opacity-90">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{personalInfo.location}</span>}
          {personalInfo.website && <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" />{personalInfo.website}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Share2 className="w-3.5 h-3.5" />{personalInfo.linkedin}</span>}
          {personalInfo.github && <span className="flex items-center gap-1"><Code className="w-3.5 h-3.5" />{personalInfo.github}</span>}
        </div>
      </header>

      <div className="p-8 space-y-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-slate-700 text-xs leading-relaxed italic">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className={`text-xs font-black uppercase tracking-wider ${theme.text} mb-3 flex items-center gap-2`}>
              <span className="w-2 h-2 rounded-full bg-current inline-block" />
              Work History
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs sm:text-sm">
                    <span>{exp.position}</span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${theme.badge}`}>
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-600 mb-2">{exp.company}</div>
                  <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">{exp.description}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className={`text-xs font-black uppercase tracking-wider ${theme.text} mb-3 flex items-center gap-2`}>
              <span className="w-2 h-2 rounded-full bg-current inline-block" />
              Featured Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{proj.title}</h3>
                  {proj.techStack && <span className="text-[10px] font-mono text-slate-500 block mb-1">{proj.techStack}</span>}
                  <p className="text-xs text-slate-600">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Grid for Skills and Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.length > 0 && (
            <section>
              <h2 className={`text-xs font-black uppercase tracking-wider ${theme.text} mb-3 flex items-center gap-2`}>
                <span className="w-2 h-2 rounded-full bg-current inline-block" />
                Specialties
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((sk) => (
                  <span key={sk.id} className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-semibold text-xs">
                    {sk.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className={`text-xs font-black uppercase tracking-wider ${theme.text} mb-3 flex items-center gap-2`}>
                <span className="w-2 h-2 rounded-full bg-current inline-block" />
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600">{edu.institution} ({edu.startDate} – {edu.endDate})</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
