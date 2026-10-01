"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Layers, Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  onOpenContact: (prefillService?: string) => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#090a10]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center space-x-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/40 shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-transform duration-300 group-hover:scale-105">
            <span className="font-mono text-xl font-black text-cyan-400">K</span>
            <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
            <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xl font-extrabold tracking-wider text-white">
                KINETIQ<span className="text-cyan-400">.</span>SPEC
              </span>
            </div>
            <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
              DATA • QA • CODE • SEC
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <Link href="#capabilities" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 font-semibold">
            Capabilities
          </Link>
          <Link href="#blueprints" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 font-semibold">
            <Layers className="h-4 w-4 text-cyan-400" />
            Project Blueprints
          </Link>
        </nav>

        {/* Right Action & System Status */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Pods Active: 24/7</span>
          </div>
          <button
            onClick={() => onOpenContact()}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Request Spec / Audit</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#0c0e17] px-4 py-6 space-y-4">
          <div className="flex flex-col space-y-3 font-medium text-slate-200">
            <Link
              href="#capabilities"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/80 font-semibold"
            >
              Capabilities
            </Link>
            <Link
              href="#blueprints"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/80 flex items-center gap-2 font-semibold text-cyan-300"
            >
              <Layers className="h-4 w-4 text-cyan-400" />
              Project Blueprints & Diagrams
            </Link>
          </div>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25"
            >
              <span>Request Spec / Audit</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
