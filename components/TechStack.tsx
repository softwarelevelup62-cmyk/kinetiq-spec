"use client";

import React from "react";
import { Terminal, Database, CheckCircle2, Shield, Code2 } from "lucide-react";

export default function TechStack() {
  const categories = [
    {
      name: "AI & Data Annotation",
      icon: Database,
      accent: "text-cyan-400 border-cyan-500/30",
      items: ["CVAT", "Label Studio", "PyTorch", "Hugging Face", "FiftyOne", "COCO / YOLO", "Parquet", "Whisper"],
    },
    {
      name: "App Testing & QA",
      icon: CheckCircle2,
      accent: "text-emerald-400 border-emerald-500/30",
      items: ["Playwright", "Cypress", "Appium", "k6", "JMeter", "BrowserStack", "Sentry", "Postman"],
    },
    {
      name: "Custom Software & Cloud",
      icon: Code2,
      accent: "text-purple-400 border-purple-500/30",
      items: ["Next.js 15", "TypeScript", "Go / gRPC", "Python / FastAPI", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS / GCP"],
    },
    {
      name: "Offensive Security & Auditing",
      icon: Shield,
      accent: "text-amber-400 border-amber-500/30",
      items: ["Burp Suite Pro", "OWASP ZAP", "Semgrep", "Trivy", "Kali Linux", "Wireshark", "Metasploit", "SonarQube"],
    },
  ];

  return (
    <section className="relative py-20 bg-[#07080e] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-500">
            Enterprise Toolchains & Standards
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
            Built on Industry Standard Technologies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border border-white/5 bg-[#0d0f1b] p-6 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-xl border bg-white/5 ${cat.accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-sm text-white">{cat.name}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="rounded-md border border-white/5 bg-slate-900/60 px-2 py-1 font-mono text-[11px] text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
