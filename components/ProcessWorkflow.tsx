"use client";

import React from "react";
import { WORKFLOW_STEPS } from "@/lib/data";
import { GitBranch, Shield, Zap, CheckCircle2, PackageCheck } from "lucide-react";

export default function ProcessWorkflow() {
  const icons = [GitBranch, Zap, Zap, Shield, PackageCheck];

  return (
    <section className="relative py-24 bg-[#090a12] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-3.5 py-1 text-xs font-mono text-cyan-400">
            <span>THE KINETIQ METHODOLOGY</span>
            <span>•</span>
            <span className="text-slate-400">ZERO ASSUMPTIONS</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How We Execute Mission-Critical Work
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            From initial dataset schemas or pentest threat scopes to final verifiable release packages, our methodology is built on transparency, speed, and strict mathematical consensus.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {WORKFLOW_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-2xl border border-white/5 bg-[#0d0f1b] p-6 hover:border-cyan-500/30 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between font-mono">
                  <span className="text-2xl font-black text-slate-600 group-hover:text-cyan-400 transition-colors">
                    {step.step}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-cyan-400 opacity-60 group-hover:opacity-100" />
                </div>
                <h3 className="mt-4 text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-cyan-400/80">
                Phase SLA Enforced
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
