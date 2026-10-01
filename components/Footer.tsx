"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#06070b] text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-400 font-mono font-bold text-lg">
                K
              </div>
              <span className="font-mono text-lg font-bold tracking-wider text-white">
                KINETIQ<span className="text-cyan-400">.</span>SPEC
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Kinetiq Spec is an engineering and assurance agency delivering high-precision Data Annotation for AI, automated App Testing & QA, custom Software Development, and proactive Security Audits.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[11px] text-emerald-400">
                All Systems Operational • 99.99% Node Availability
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Navigate
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="#capabilities" className="hover:text-cyan-400 transition-colors">
                  Capabilities
                </Link>
              </li>
              <li>
                <Link href="#blueprints" className="hover:text-cyan-400 transition-colors">
                  Project Blueprints
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Standards */}
          <div className="space-y-3">
            <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Compliance & Security
            </div>
            <div className="space-y-2 text-[11px] text-slate-400">
              <div className="rounded-lg border border-white/5 bg-[#0b0d16] p-2.5">
                <span className="font-mono font-semibold text-white">SOC 2 Type II Ready</span>
                <p className="mt-0.5 text-slate-500">Continuous security controls & audit readiness</p>
              </div>
              <div className="rounded-lg border border-white/5 bg-[#0b0d16] p-2.5">
                <span className="font-mono font-semibold text-white">HIPAA & GDPR Aligned</span>
                <p className="mt-0.5 text-slate-500">Air-gapped VPCs and zero-retention policies</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[11px] text-slate-500">
            © {new Date().getFullYear()} Kinetiq Spec Inc. All technical rights reserved. High-rigor engineering.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
