"use client";

import React, { useState } from "react";
import { SERVICES, ServiceItem } from "@/lib/data";
import {
  Binary,
  CheckCircle2,
  Code2,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Layers,
  FileCheck,
  Clock,
  ShieldCheck,
} from "lucide-react";

interface ServiceSectionProps {
  onSelectService: (serviceName: string) => void;
}

export default function ServiceSection({ onSelectService }: ServiceSectionProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("data-annotation");

  const currentService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  const getAccentBorder = (accent: string) => {
    switch (accent) {
      case "cyan":
        return "border-cyan-500/40 text-cyan-400";
      case "emerald":
        return "border-emerald-500/40 text-emerald-400";
      case "purple":
        return "border-purple-500/40 text-purple-400";
      case "amber":
        return "border-amber-500/40 text-amber-400";
      default:
        return "border-cyan-500/40 text-cyan-400";
    }
  };

  const getGlowBg = (accent: string) => {
    switch (accent) {
      case "cyan":
        return "hover:border-cyan-500/40 hover:shadow-cyan-500/10";
      case "emerald":
        return "hover:border-emerald-500/40 hover:shadow-emerald-500/10";
      case "purple":
        return "hover:border-purple-500/40 hover:shadow-purple-500/10";
      case "amber":
        return "hover:border-amber-500/40 hover:shadow-amber-500/10";
      default:
        return "hover:border-cyan-500/40 hover:shadow-cyan-500/10";
    }
  };

  return (
    <section id="capabilities" className="relative py-24 border-t border-white/10 bg-[#07080e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-3.5 py-1 text-xs font-mono text-cyan-400">
            <span>CORE PILLARS</span>
            <span>•</span>
            <span className="text-slate-400">FULL-CYCLE TECHNICAL EXECUTION</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Specialized Engineering & Assurance Services
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Whether you are training next-generation foundation models, hardening cloud microservices, or launching mission-critical mobile apps, our dedicated pods deliver production-grade results.
          </p>
        </div>

        {/* Pillar Switcher Navigation */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {SERVICES.map((service) => {
            const isSelected = service.id === selectedServiceId;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                className={`flex flex-col text-left p-5 rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? "bg-[#111422] border-cyan-500/50 shadow-lg shadow-cyan-950/50 scale-[1.02]"
                    : "bg-[#0c0d16] border-white/5 hover:border-white/20 hover:bg-[#10121d]"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                      service.accentColor === "cyan"
                        ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                        : service.accentColor === "emerald"
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : service.accentColor === "purple"
                        ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                        : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                    }`}
                  >
                    {service.id === "data-annotation" && <Binary className="h-5 w-5" />}
                    {service.id === "app-testing" && <CheckCircle2 className="h-5 w-5" />}
                    {service.id === "programming" && <Code2 className="h-5 w-5" />}
                    {service.id === "security-audits" && <ShieldAlert className="h-5 w-5" />}
                  </div>
                  {isSelected && (
                    <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </div>
                <div className="mt-4">
                  <span className="font-mono text-xs text-slate-400">{service.shortTag}</span>
                  <h3 className="mt-1 text-base font-bold text-white">{service.name}</h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Service Detailed Showcase Card */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#0d0f1a] p-6 sm:p-10 shadow-2xl">
          {/* Header row of card */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 font-mono text-xs text-cyan-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{currentService.badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {currentService.headline}
              </h3>
              <p className="text-slate-300 max-w-3xl leading-relaxed text-sm sm:text-base">
                {currentService.description}
              </p>
            </div>

            <button
              onClick={() => onSelectService(currentService.name)}
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>Deploy {currentService.name.split(" ")[0]} Pod</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>

          {/* Capabilities Grid */}
          <div className="mt-8">
            <div className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-4">
              Core Technical Capabilities
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentService.capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/5 bg-[#121524] p-5 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white">{cap.title}</h4>
                    <span className="font-mono text-xs rounded bg-white/5 px-2.5 py-0.5 text-cyan-300 border border-cyan-500/20">
                      {cap.metrics}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack & Deliverables Strip */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-white/10">
            {/* Tech Stack */}
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-400 mb-3">
                <Layers className="h-4 w-4 text-cyan-400" />
                <span>Primary Toolchains</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentService.techStack.map((tool, i) => (
                  <span
                    key={i}
                    className="rounded-lg border border-white/10 bg-slate-900/60 px-2.5 py-1 text-xs font-mono text-slate-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-400 mb-3">
                <FileCheck className="h-4 w-4 text-emerald-400" />
                <span>Verified Deliverables</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {currentService.deliverables.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SLA Commitment */}
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-400 mb-3">
                <Clock className="h-4 w-4 text-amber-400" />
                <span>Turnaround SLA</span>
              </div>
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5">
                <div className="text-xs font-medium text-amber-300 leading-relaxed">
                  {currentService.sla}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
