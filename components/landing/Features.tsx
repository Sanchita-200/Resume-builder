import Link from "next/link";
import {
  FileText,
  Eye,
  LayoutTemplate,
  Download,
  Save,
  Moon,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function Features() {
  const featureList = [
    {
      icon: FileText,
      title: "Multi-Step Form Builder",
      description:
        "Structured step-by-step fields for Personal Info, Education, Experience, Skills, Projects, Certifications, and Languages.",
    },
    {
      icon: Eye,
      title: "Live Real-Time Preview",
      description:
        "Watch your resume render instantly side-by-side as you type every letter.",
    },
    {
      icon: LayoutTemplate,
      title: "5 Professional Templates",
      description:
        "Choose between Modern, Classic, Minimalist, Tech, and Creative templates with custom accent colors.",
    },
    {
      icon: Download,
      title: "1-Click PDF Export & Print",
      description:
        "Export high-quality vector PDFs or trigger clean browser printing with dedicated media print styles.",
    },
    {
      icon: Save,
      title: "Auto-Save to Local Storage",
      description:
        "Never lose your changes. All data is automatically saved locally in your browser with zero backend data risks.",
    },
    {
      icon: Moon,
      title: "Dark & Light Mode",
      description:
        "Seamlessly switch between modern dark mode and crisp light mode according to your preference.",
    },
  ];

  const templatesPreview = [
    { id: "modern", name: "Modern Crisp", tag: "Most Popular", color: "bg-indigo-600 shadow-indigo-500/20" },
    { id: "classic", name: "Classic Executive", tag: "ATS Standard", color: "bg-slate-700 shadow-slate-500/20" },
    { id: "minimal", name: "Minimalist Clean", tag: "Compact", color: "bg-emerald-600 shadow-emerald-500/20" },
    { id: "tech", name: "Tech / Developer", tag: "Sidebar Layout", color: "bg-blue-600 shadow-blue-500/20" },
    { id: "creative", name: "Creative Accent", tag: "High Impact", color: "bg-purple-600 shadow-purple-500/20" },
  ];

  return (
    <div className="py-16 md:py-24 space-y-24">
      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything You Need for a Winning Resume
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Crafted strictly to meet professional hiring standards with zero unnecessary fluff.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1.5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Templates Preview Showcase */}
      <section id="templates" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            5 Professional Resume Templates
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Click any template below to start editing directly with your preferred layout.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {templatesPreview.map((tmpl) => (
            <Link
              key={tmpl.id}
              href={`/builder?template=${tmpl.id}`}
              className="template-card-hover p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between hover:border-indigo-500/80 dark:hover:border-indigo-400/80 active:scale-95 shadow-sm group cursor-pointer"
            >
              <div>
                <div className={`h-36 rounded-xl ${tmpl.color} opacity-95 mb-4 flex flex-col items-center justify-center text-white text-xs font-mono font-semibold transition-all duration-300 group-hover:scale-[1.03] shadow-md p-3 text-center`}>
                  <span>{tmpl.name}</span>
                  <span className="mt-2.5 inline-flex items-center gap-1 text-[11px] bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-lg text-white font-sans backdrop-blur-xs transition-all duration-200 group-hover:scale-105">
                    Use Template <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tmpl.name}
                </h4>
                <span className="mt-1 inline-block text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  {tmpl.tag}
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Select & Edit</span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-indigo-600 dark:text-indigo-400" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
