import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Kinetiq Spec | AI Data Annotation, QA Testing, Engineering & Security Audits",
  description:
    "Kinetiq Spec is a high-velocity engineering and assurance agency delivering high-precision Data Annotation for AI, rigorous App & Automated QA Testing, Custom Software Engineering, and Comprehensive Security Audits.",
  keywords: [
    "Data Annotation",
    "App Testing",
    "QA Engineering",
    "Security Audits",
    "Penetration Testing",
    "Software Engineering",
    "AI Training Data",
    "RLHF",
    "Kinetiq Spec",
  ],
  authors: [{ name: "Kinetiq Spec Technical Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#090a10] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
