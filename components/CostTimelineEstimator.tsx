"use client";

import React, { useState } from "react";
import { Calculator, Check, ArrowRight, Shield, Cpu, Code2, CheckCircle2, Clock, Users } from "lucide-react";

interface EstimatorProps {
  onProceedWithEstimate: (details: {
    services: string[];
    scale: string;
    urgency: string;
    estCost: string;
    estTimeline: string;
  }) => void;
}

export default function CostTimelineEstimator({ onProceedWithEstimate }: EstimatorProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Data Annotation",
    "App Testing & QA",
  ]);
  const [scale, setScale] = useState<"standard" | "growth" | "enterprise">("growth");
  const [urgency, setUrgency] = useState<"standard" | "accelerated" | "rapid">("standard");

  const toggleService = (name: string) => {
    if (selectedServices.includes(name)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== name));
      }
    } else {
      setSelectedServices([...selectedServices, name]);
    }
  };

  // Dynamic estimate formulas
  const baseServiceCost = selectedServices.length * 4200;
  const scaleMultiplier = scale === "standard" ? 1 : scale === "growth" ? 1.8 : 3.2;
  const urgencyMultiplier = urgency === "standard" ? 1 : urgency === "accelerated" ? 1.3 : 1.7;

  const totalMin = Math.round((baseServiceCost * scaleMultiplier * urgencyMultiplier) / 500) * 500;
  const totalMax = Math.round((totalMin * 1.35) / 500) * 500;

  const weeksMin = scale === "standard" ? 1 : scale === "growth" ? 2 : 4;
  const weeksMax = scale === "standard" ? 2 : scale === "growth" ? 4 : 8;

  const timelineString =
    urgency === "rapid"
      ? "Rapid 48-72h Pod Deploy"
      : `${weeksMin} - ${weeksMax} Weeks Delivery`;

  const costString = `$${totalMin.toLocaleString()} - $${totalMax.toLocaleString()}`;

  const podStaffing = () => {
    let count = selectedServices.length * 2;
    if (scale === "enterprise") count += 4;
    return `${count} - ${count + 3} Dedicated Technical Specialists`;
  };

  return (
    <section id="estimator" className="relative py-24 bg-[#090a12] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-3.5 py-1 text-xs font-mono text-purple-400">
            <Calculator className="h-3.5 w-3.5" />
            <span>TRANSPARENT SPEC ENGINE</span>
            <span>•</span>
            <span className="text-slate-400">INSTANT SCOPE ESTIMATOR</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Estimate Your Project Scope & Timeline
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Configure your technical requirements to generate an instantaneous engineering estimate and staffing roadmap.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Controls Config (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-8 rounded-3xl border border-white/10 bg-[#0d0f1b] p-6 sm:p-8">
            {/* Step 1: Select Services */}
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold">
                1. Select Desired Service Pods
              </label>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: "Data Annotation", desc: "Vision, NLP & RLHF labeling", icon: Cpu },
                  { name: "App Testing & QA", desc: "Playwright, Cypress & Mobile matrix", icon: CheckCircle2 },
                  { name: "Custom Programming", desc: "Full-Stack, Go, APIs & Cloud", icon: Code2 },
                  { name: "Security Audits", desc: "Penetration tests & Code audits", icon: Shield },
                ].map((item) => {
                  const isChecked = selectedServices.includes(item.name);
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => toggleService(item.name)}
                      className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                        isChecked
                          ? "border-cyan-500 bg-cyan-950/20 shadow-md"
                          : "border-white/5 bg-[#121524] hover:border-white/20"
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                          isChecked
                            ? "bg-cyan-500 text-slate-950 border-cyan-400"
                            : "bg-white/5 text-slate-400 border-white/10"
                        }`}
                      >
                        {isChecked ? <Check className="h-4 w-4 stroke-[3]" /> : <Icon className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{item.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Scale & Volume */}
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-purple-400 font-bold">
                2. Project Scale & Volume
              </label>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[
                  { id: "standard", label: "Startup / Pilot", sub: "Up to 50k samples / Single app suite" },
                  { id: "growth", label: "Growth / Mid-Scale", sub: "50k-500k samples / Multi-platform QA" },
                  { id: "enterprise", label: "Enterprise Scale", sub: "1M+ samples / Complex infra audit" },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setScale(tier.id as any)}
                    className={`rounded-2xl border p-3.5 text-left transition-all ${
                      scale === tier.id
                        ? "border-purple-500 bg-purple-950/30 text-white shadow"
                        : "border-white/5 bg-[#121524] text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-bold">{tier.label}</div>
                    <div className="text-[10px] text-slate-400 mt-1 hidden sm:block">{tier.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Deployment Speed */}
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold">
                3. Deployment Velocity & Turnaround
              </label>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[
                  { id: "standard", label: "Standard Sprint", badge: "2-4 Weeks" },
                  { id: "accelerated", label: "Accelerated", badge: "1-2 Weeks" },
                  { id: "rapid", label: "Emergency Pod", badge: "48-72 Hours" },
                ].map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => setUrgency(u.id as any)}
                    className={`rounded-2xl border p-3.5 text-center transition-all ${
                      urgency === u.id
                        ? "border-amber-500 bg-amber-950/30 text-white shadow"
                        : "border-white/5 bg-[#121524] text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-bold">{u.label}</div>
                    <span className="inline-block mt-1 text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                      {u.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time Calculation Summary Card (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-[#101426] to-[#0a0d18] p-6 sm:p-8 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-xs text-slate-400">SPECIFICATION SUMMARY</span>
                <span className="font-mono text-xs text-cyan-400 font-bold">EST-CALC #702</span>
              </div>

              {/* Estimated Budget */}
              <div>
                <span className="text-xs text-slate-400 font-mono">Estimated Investment Range</span>
                <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                  {costString}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  *Transparent sprint-based billing with no hidden licensing fees.
                </div>
              </div>

              {/* Key Specs Breakdown */}
              <div className="space-y-3 pt-4 border-t border-white/10 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-cyan-400" />
                    Target Timeline
                  </span>
                  <span className="text-white font-bold">{timelineString}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-400" />
                    Dedicated Pod Staffing
                  </span>
                  <span className="text-white font-bold">{podStaffing()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Selected Services ({selectedServices.length}):</span>
                  <span className="text-cyan-300 font-bold">
                    {selectedServices.join(", ")}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Service SLA Guarantee:</span>
                  <span className="text-emerald-400 font-bold">99.8% Precision / Verified PoC</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() =>
                  onProceedWithEstimate({
                    services: selectedServices,
                    scale,
                    urgency,
                    estCost: costString,
                    estTimeline: timelineString,
                  })
                }
                className="w-full flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <span>Proceed with This Estimate</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <div className="text-center mt-2 text-[11px] text-slate-400">
                Instantly pre-fills your technical discovery statement.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
