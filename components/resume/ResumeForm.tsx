"use client";

import { useState } from "react";
import { useResumeData } from "@/hooks/useResumeData";
import PersonalInfoForm from "./PersonalInfoForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import SkillsForm from "./SkillsForm";
import ProjectsForm from "./ProjectsForm";
import CertificationsForm from "./CertificationsForm";
import LanguagesForm from "./LanguagesForm";
import AtsScoreModal from "@/components/ai/AtsScoreModal";
import CoverLetterModal from "@/components/ai/CoverLetterModal";
import {
  User,
  GraduationCap,
  Briefcase,
  Wrench,
  FolderGit2,
  Award,
  Languages,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Mail,
} from "lucide-react";

interface Props {
  resumeDataState: ReturnType<typeof useResumeData>;
}

export default function ResumeForm({ resumeDataState }: Props) {
  const {
    resumeData,
    activeStep,
    setActiveStep,
    updatePersonalInfo,
    setEducationList,
    setExperienceList,
    setSkillsList,
    setProjectsList,
    setCertificationsList,
    setLanguagesList,
    loadSampleData,
    resetResume,
  } = resumeDataState;

  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
  const [isCoverLetterModalOpen, setIsCoverLetterModalOpen] = useState(false);

  const steps = [
    { id: 0, title: "Personal Info", icon: User },
    { id: 1, title: "Education", icon: GraduationCap },
    { id: 2, title: "Experience", icon: Briefcase },
    { id: 3, title: "Skills", icon: Wrench },
    { id: 4, title: "Projects", icon: FolderGit2 },
    { id: 5, title: "Certifications", icon: Award },
    { id: 6, title: "Languages", icon: Languages },
  ];

  const renderActiveStepForm = () => {
    switch (activeStep) {
      case 0:
        return <PersonalInfoForm data={resumeData.personalInfo} onChange={updatePersonalInfo} />;
      case 1:
        return <EducationForm data={resumeData.education} onChange={setEducationList} />;
      case 2:
        return <ExperienceForm data={resumeData.experience} onChange={setExperienceList} />;
      case 3:
        return <SkillsForm data={resumeData.skills} onChange={setSkillsList} />;
      case 4:
        return <ProjectsForm data={resumeData.projects} onChange={setProjectsList} />;
      case 5:
        return <CertificationsForm data={resumeData.certifications} onChange={setCertificationsList} />;
      case 6:
        return <LanguagesForm data={resumeData.languages} onChange={setLanguagesList} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6">
        {/* Action Toolbar Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Resume Builder</span>
          </h2>

          <div className="flex flex-wrap items-center gap-2">
            {/* AI Tools Buttons */}
            <button
              type="button"
              onClick={() => setIsAtsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-900 rounded-lg transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>ATS Score</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCoverLetterModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-900 rounded-lg transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-indigo-500" />
              <span>AI Cover Letter</span>
            </button>

            <button
              type="button"
              onClick={loadSampleData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all duration-200 hover:scale-[1.03] active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Sample Data
            </button>

            <button
              type="button"
              onClick={resetResume}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-rose-500 rounded-lg transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Step Tabs Navigation */}
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-[1.02]"
                    : "bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Form Content with smooth step transition animation */}
        <div key={activeStep} className="min-h-[380px] animate-step-fade">
          {renderActiveStepForm()}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
          <button
            type="button"
            disabled={activeStep === 0}
            onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Step
          </button>

          <span className="text-xs font-medium text-slate-400">
            Step {activeStep + 1} of {steps.length}
          </span>

          <button
            type="button"
            disabled={activeStep === steps.length - 1}
            onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-sm shadow-indigo-500/20"
          >
            Next Step
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* AI Modals */}
      <AtsScoreModal
        isOpen={isAtsModalOpen}
        onClose={() => setIsAtsModalOpen(false)}
        resumeData={resumeData}
      />

      <CoverLetterModal
        isOpen={isCoverLetterModalOpen}
        onClose={() => setIsCoverLetterModalOpen(false)}
        resumeData={resumeData}
      />
    </>
  );
}