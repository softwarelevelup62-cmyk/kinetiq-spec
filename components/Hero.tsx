"use client";

import React from "react";
import { ArrowRight, Shield, Sparkles, CheckCircle2, Code2, Database } from "lucide-react";

interface HeroProps {
  onOpenContact: (prefillService?: string) => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
      {/* Background Cyber Grid & Radial Glows */}
      <div className="absolute inset-0 bg-grid-cyber opacity-70 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-purple-600/10 blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Status Pill Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs font-medium tracking-wide text-cyan-300">
              MISSION-CRITICAL SOFTWARE & AI ASSURANCE
            </span>
            <span className="hidden sm:inline text-xs text-slate-500">•</span>
            <span className="hidden sm:inline font-mono text-xs text-slate-400">
              SLA-BACKED TECHNICAL PODS
            </span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            High-Velocity Engineering,{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
              Bulletproof QA
            </span>{" "}
            & Precision{" "}
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              AI Data
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            <strong className="text-white font-semibold">Kinetiq Spec</strong> deploys dedicated technical pods to deliver
            high-density <span className="text-cyan-300">Data Annotation</span> for AI, exhaustive{" "}
            <span className="text-emerald-300">App Testing & QA</span>, custom{" "}
            <span className="text-purple-300">Full-Stack Programming</span>, and proactive{" "}
            <span className="text-amber-300">Security Audits</span>.
          </p>
        </div>

        {/* Hero Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onOpenContact()}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-[0_0_35px_rgba(0,240,255,0.35)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(0,240,255,0.55)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Request Project Spec / Audit</span>
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <a
            href="#capabilities"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 px-8 py-4 text-base font-semibold text-slate-200 backdrop-blur-md transition-all duration-200 hover:border-cyan-500/40 hover:bg-slate-800/80 hover:text-white"
          >
            <span>Explore 4 Core Pillars</span>
          </a>
        </div>

        {/* Quick Highlights Strip */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-slate-900/40 p-3.5 backdrop-blur-sm">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <div className="font-mono text-xs text-slate-400">Annotation Precision</div>
              <div className="font-mono text-sm font-bold text-white">99.8% Ground Truth</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-slate-900/40 p-3.5 backdrop-blur-sm">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <div className="font-mono text-xs text-slate-400">QA Pass Target</div>
              <div className="font-mono text-sm font-bold text-white">Zero Escaped Bugs</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-slate-900/40 p-3.5 backdrop-blur-sm">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <div className="font-mono text-xs text-slate-400">Tech Architecture</div>
              <div className="font-mono text-sm font-bold text-white">Strict TypeScript & Cloud</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-slate-900/40 p-3.5 backdrop-blur-sm">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="font-mono text-xs text-slate-400">Security Stance</div>
              <div className="font-mono text-sm font-bold text-white">OWASP & SOC 2 Ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
