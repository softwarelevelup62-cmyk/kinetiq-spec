"use client";

import React from "react";
import { ArrowRight, Shield, Zap, CheckCircle2, Mail, Terminal, Phone } from "lucide-react";

interface ContactSectionProps {
  onOpenModal: () => void;
}

export default function ContactSection({ onOpenModal }: ContactSectionProps) {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#090a12] via-[#0f1222] to-[#090a10] border-t border-white/10 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-[600px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono text-cyan-400">
          <Zap className="h-3.5 w-3.5" />
          <span>PODS READY FOR IMMEDIATE DEPLOYMENT</span>
        </div>

        <h2 className="mt-6 text-3xl sm:text-5xl font-black text-white tracking-tight">
          Ready to Elevate Your Data, Testing, Code & Security?
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Book an architectural discovery session with Kinetiq Spec. We deliver transparent scopes, guaranteed SLAs, and dedicated technical execution.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenModal}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Schedule Discovery Session</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        {/* Feature Badges */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#0d0f1b]/80 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Mutual NDA Protection</div>
              <div className="text-xs text-slate-400">Standard bilateral terms guaranteed</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#0d0f1b]/80 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">48h Rapid Pod Kickoff</div>
              <div className="text-xs text-slate-400">Zero weeks of recruitment drag</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#0d0f1b]/80 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Senior Engineers Only</div>
              <div className="text-xs text-slate-400">Vetted domain specialists & CEHs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
