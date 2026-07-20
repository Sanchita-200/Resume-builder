"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema } from "@/schemas/resume";
import { PersonalInfo } from "@/types/resume";
import { User, Mail, Phone, MapPin, Globe, FileText, Share2, Code } from "lucide-react";

interface Props {
  data: PersonalInfo;
  onChange: (info: PersonalInfo) => void;
}

export default function PersonalInfoForm({ data, onChange }: Props) {
  const {
    register,
    formState: { errors },
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: data,
    mode: "onChange",
  });

  const handleFieldChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <form className="space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Personal Details
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Enter your contact details and a professional summary.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              {...register("fullName")}
              value={data.fullName}
              onChange={(e) => handleFieldChange("fullName", e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            />
          </div>
          {errors.fullName && (
            <p className="text-xs text-rose-500 mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Job Title *
          </label>
          <div className="relative">
            <FileText className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              {...register("jobTitle")}
              value={data.jobTitle}
              onChange={(e) => handleFieldChange("jobTitle", e.target.value)}
              placeholder="e.g. Senior Software Engineer"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            />
          </div>
          {errors.jobTitle && (
            <p className="text-xs text-rose-500 mt-1">{errors.jobTitle.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Email *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="email"
              {...register("email")}
              value={data.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              placeholder="alex@example.com"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              {...register("phone")}
              value={data.phone}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-rose-500 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Location *
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              {...register("location")}
              value={data.location}
              onChange={(e) => handleFieldChange("location", e.target.value)}
              placeholder="San Francisco, CA"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            />
          </div>
          {errors.location && (
            <p className="text-xs text-rose-500 mt-1">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Website / Portfolio
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              {...register("website")}
              value={data.website || ""}
              onChange={(e) => handleFieldChange("website", e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            LinkedIn Profile
          </label>
          <div className="relative">
            <Share2 className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              {...register("linkedin")}
              value={data.linkedin || ""}
              onChange={(e) => handleFieldChange("linkedin", e.target.value)}
              placeholder="linkedin.com/in/username"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            GitHub Profile
          </label>
          <div className="relative">
            <Code className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              {...register("github")}
              value={data.github || ""}
              onChange={(e) => handleFieldChange("github", e.target.value)}
              placeholder="github.com/username"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Professional Summary *
        </label>
        <textarea
          rows={4}
          {...register("summary")}
          value={data.summary}
          onChange={(e) => handleFieldChange("summary", e.target.value)}
          placeholder="Brief summary highlighting your background, expertise, and key accomplishments..."
          className="w-full p-3 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
        />
        {errors.summary && (
          <p className="text-xs text-rose-500 mt-1">{errors.summary.message}</p>
        )}
      </div>
    </form>
  );
}
