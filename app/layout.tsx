import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume Builder - Create ATS-Friendly Professional Resumes",
  description:
    "Build professional resumes with live real-time preview, 5 modern templates, local storage auto-save, and instant PDF download. 100% free and private.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col font-sans antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
