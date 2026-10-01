"use client";

import React, { useState } from "react";
import { TECHNICAL_SPECS } from "@/lib/data";
import ArchitectureDiagram from "./ArchitectureDiagram";
import {
  CheckCircle2,
  Layers,
  TrendingUp,
  Cpu,
  Shield,
  CheckSquare,
  Sparkles,
  ArrowRight,
  Code2,
  Terminal,
} from "lucide-react";

type BlueprintTab = "diagram" | "overview" | "annotation" | "testing" | "security";

const BLUEPRINT_MAP: Record<number, string> = {
  0: "autonomous-autopilot",
  1: "llm-alignment",
  2: "stripe-payments",
  3: "netflix-streaming",
  4: "uber-geospatial",
  5: "healthtech-security",
};

export default function CaseStudies() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeDetailTab, setActiveDetailTab] = useState<BlueprintTab>("diagram");
  const current = TECHNICAL_SPECS[activeIdx];
  const activeBlueprintId = BLUEPRINT_MAP[activeIdx] || "autonomous-autopilot";

  return (
    <section id="blueprints" className="relative py-24 bg-[#07080e] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono text-cyan-400">
            <Layers className="h-3.5 w-3.5" />
            <span>INDUSTRY BLUEPRINTS</span>
            <span>•</span>
            <span className="text-slate-400">JAVASCRIPT DYNAMIC DIAGRAMS</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Famous Project Blueprints &amp; Architecture Diagrams
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Interactive system architecture diagrams generated dynamically using JavaScript. Click on any pipeline stage to inspect data payloads, latency SLAs, and security protocols.
          </p>
        </div>

        {/* Blueprint Project Archetype Selector Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {TECHNICAL_SPECS.map((spec, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveIdx(idx);
                }}
                className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all ${
                  isSelected
                    ? "bg-[#111424] border-cyan-500/50 shadow-lg shadow-cyan-950/50 scale-[1.02]"
                    : "bg-[#0b0c14] border-white/5 hover:border-white/20 hover:bg-[#0f111c]"
                }`}
              >
                <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                  BLUEPRINT 0{idx + 1}
                </span>
                <span className="text-xs font-bold text-white mt-1 leading-snug">
                  {spec.archetype.split(" ")[0]} {spec.archetype.split(" ")[1]}
                </span>
                <span className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                  {spec.domain.split("&")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Blueprint Detailed Inspector */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#0d0f1b] p-6 sm:p-10 shadow-2xl">
          {/* Top Title & Archetype Badge */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block rounded-md bg-cyan-500/10 px-2.5 py-1 text-xs font-mono text-cyan-300 border border-cyan-500/30">
                  {current.archetype}
                </span>
                <span className="inline-block rounded-md bg-white/5 px-2.5 py-1 text-xs font-mono text-slate-300 border border-white/10">
                  {current.domain}
                </span>
              </div>
              <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
                {current.title}
              </h3>
            </div>

            {/* Sub-tab Pills */}
            <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-900/90 p-1 border border-white/5 self-start lg:self-auto">
              <button
                onClick={() => setActiveDetailTab("diagram")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  activeDetailTab === "diagram"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Architecture Diagram</span>
              </button>
              <button
                onClick={() => setActiveDetailTab("overview")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  activeDetailTab === "overview"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>Problem &amp; Solution</span>
              </button>
              <button
                onClick={() => setActiveDetailTab("annotation")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  activeDetailTab === "annotation"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Cpu className="h-3.5 w-3.5" />
                <span>Data Spec</span>
              </button>
              <button
                onClick={() => setActiveDetailTab("testing")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  activeDetailTab === "testing"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <CheckSquare className="h-3.5 w-3.5" />
                <span>QA &amp; Chaos</span>
              </button>
              <button
                onClick={() => setActiveDetailTab("security")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  activeDetailTab === "security"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Shield className="h-3.5 w-3.5" />
                <span>Threat Model</span>
              </button>
            </div>
          </div>

          {/* Sub-tab Content Render */}
          <div className="mt-8">
            {activeDetailTab === "diagram" && (
              <ArchitectureDiagram blueprintId={activeBlueprintId} />
            )}

            {activeDetailTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-6">
                  <div className="rounded-2xl border border-white/5 bg-[#121524] p-5">
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-rose-400 mb-2">
                      Engineering Bottleneck &amp; Challenge
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{current.challenge}</p>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-[#121524] p-5">
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-400 mb-2">
                      Kinetiq Spec Architectural Solution
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{current.solution}</p>
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-2xl border border-cyan-500/30 bg-cyan-950/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-4">
                      <TrendingUp className="h-4 w-4" />
                      <span>Target Benchmark Specifications</span>
                    </div>
                    <div className="space-y-3">
                      {current.benchmarks.map((res, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 mt-0.5">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-xs font-medium text-slate-200 leading-relaxed">
                            {res}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-cyan-500/20">
                    <span className="font-mono text-[11px] text-slate-400 block mb-2">
                      Toolchain / Core Stack:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {current.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="rounded bg-white/5 px-2 py-0.5 font-mono text-[11px] text-cyan-300 border border-cyan-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeDetailTab === "annotation" && (
              <div className="rounded-2xl border border-purple-500/30 bg-purple-950/10 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Cpu className="h-4 w-4" />
                  <span>Data Annotation &amp; Model Dataset Blueprint</span>
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {current.dataAnnotationSpec}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-purple-500/20 font-mono text-xs">
                  <div className="rounded-xl bg-[#090b14] p-3 border border-white/5">
                    <span className="text-slate-500 block">Consensus Target</span>
                    <span className="text-purple-300 font-bold text-sm">99.8%+ Agreement</span>
                  </div>
                  <div className="rounded-xl bg-[#090b14] p-3 border border-white/5">
                    <span className="text-slate-500 block">Validation Pipeline</span>
                    <span className="text-purple-300 font-bold text-sm">Automated Heuristic + Expert</span>
                  </div>
                  <div className="rounded-xl bg-[#090b14] p-3 border border-white/5">
                    <span className="text-slate-500 block">Delivery Format</span>
                    <span className="text-purple-300 font-bold text-sm">Parquet / JSON / YOLO / COCO</span>
                  </div>
                </div>
              </div>
            )}

            {activeDetailTab === "testing" && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <CheckSquare className="h-4 w-4" />
                  <span>QA Automation &amp; Chaos Engineering Suite</span>
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {current.qaTestingSuite}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-emerald-500/20 font-mono text-xs">
                  <div className="rounded-xl bg-[#090b14] p-3 border border-white/5">
                    <span className="text-slate-500 block">Test Parallelization</span>
                    <span className="text-emerald-300 font-bold text-sm">80+ Workers in CI</span>
                  </div>
                  <div className="rounded-xl bg-[#090b14] p-3 border border-white/5">
                    <span className="text-slate-500 block">Flakiness Target</span>
                    <span className="text-emerald-300 font-bold text-sm">&lt; 0.01% Reruns</span>
                  </div>
                  <div className="rounded-xl bg-[#090b14] p-3 border border-white/5">
                    <span className="text-slate-500 block">Stress Ingestion</span>
                    <span className="text-emerald-300 font-bold text-sm">Chaos Mesh Simulated</span>
                  </div>
                </div>
              </div>
            )}

            {activeDetailTab === "security" && (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-950/10 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Shield className="h-4 w-4" />
                  <span>Offensive Security &amp; Threat Audit Model</span>
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {current.securityThreatModel}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-amber-500/20 font-mono text-xs">
                  <div className="rounded-xl bg-[#090b14] p-3 border border-white/5">
                    <span className="text-slate-500 block">Vulnerability Standard</span>
                    <span className="text-amber-300 font-bold text-sm">OWASP Top 10 + API</span>
                  </div>
                  <div className="rounded-xl bg-[#090b14] p-3 border border-white/5">
                    <span className="text-slate-500 block">Remediation Delivery</span>
                    <span className="text-amber-300 font-bold text-sm">Verified Git Pull Request</span>
                  </div>
                  <div className="rounded-xl bg-[#090b14] p-3 border border-white/5">
                    <span className="text-slate-500 block">Compliance Alignment</span>
                    <span className="text-amber-300 font-bold text-sm">SOC 2 / ISO 27001 / HIPAA</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
