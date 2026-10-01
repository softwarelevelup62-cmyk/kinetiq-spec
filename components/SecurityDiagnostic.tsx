"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Play,
  CheckCircle2,
  Lock,
  Globe,
  FileText,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

interface AuditFinding {
  severity: "Critical" | "High" | "Medium" | "Pass";
  category: string;
  finding: string;
  remediation: string;
}

export default function SecurityDiagnostic({
  onRequestFullAudit,
}: {
  onRequestFullAudit: (target: string) => void;
}) {
  const [targetUrl, setTargetUrl] = useState("api.enterprise-app.io");
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Evaluating TLS 1.3 Ciphers & HSTS Configuration...",
    "Probing CORS headers & CSRF protection...",
    "Testing for Broken Object Level Authorization (BOLA/IDOR)...",
    "Scanning public endpoints for exposed secrets & API keys...",
    "Benchmarking Rate-Limiting & DDoS resilience...",
  ];

  const sampleFindings: AuditFinding[] = [
    {
      severity: "High",
      category: "Authorization (BOLA)",
      finding: "Endpoint /v1/users/{uuid}/billing allows arbitrary object enumeration without tenant scope check.",
      remediation: "Enforce strict tenant ID claims in JWT validation middleware before DB lookup.",
    },
    {
      severity: "Medium",
      category: "CORS Misconfiguration",
      finding: "Access-Control-Allow-Origin set to wildcard (*) with Access-Control-Allow-Credentials: true.",
      remediation: "Explicitly whitelist authorized frontend origins and reject unverified referrers.",
    },
    {
      severity: "Pass",
      category: "Cryptographic Transport",
      finding: "TLS 1.3 strictly enforced with modern forward secrecy ciphers. HSTS preload enabled.",
      remediation: "Configured to industry gold standard.",
    },
    {
      severity: "Pass",
      category: "Secrets & Environment",
      finding: "No leaked .env files, public git trees, or exposed Swagger definitions on production roots.",
      remediation: "Continuous CI/CD secret scanning operational.",
    },
  ];

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (scanning) return;
    setScanning(true);
    setScanComplete(false);
    setCurrentStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);
      if (step >= steps.length) {
        clearInterval(interval);
        setScanning(false);
        setScanComplete(true);
      }
    }, 700);
  };

  return (
    <section id="security-scanner" className="relative py-24 bg-[#07080e] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs font-mono text-amber-400">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>OFFENSIVE SECURITY LAB</span>
            <span>•</span>
            <span className="text-slate-400">RAPID VULNERABILITY AUDITOR</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Simulate an API & App Security Audit
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Test how our Certified Ethical Hackers probe your endpoints for OWASP Top 10 vulnerabilities, unauthorized access risks, and misconfigured headers.
          </p>
        </div>

        <div className="mt-12 max-w-4xl mx-auto rounded-3xl border border-white/10 bg-[#0d0f1b] p-6 sm:p-10 shadow-2xl">
          {/* Scanner Input Form */}
          <form onSubmit={handleStartScan} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <Globe className="h-5 w-5 text-cyan-400" />
              </div>
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="api.yourcompany.com"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-white/10 bg-[#07080d] text-white font-mono text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>
            <button
              type="submit"
              disabled={scanning}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {scanning ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  <span>Auditing Surface...</span>
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4 fill-current" />
                  <span>Run Audit Simulation</span>
                </>
              )}
            </button>
          </form>

          {/* Scan Progress Bar & Live Telemetry */}
          {scanning && (
            <div className="mt-8 rounded-2xl border border-amber-500/20 bg-[#080911] p-6 font-mono text-xs">
              <div className="flex items-center justify-between text-amber-400 mb-2">
                <span>STAGE {currentStep + 1} OF {steps.length}</span>
                <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
              <p className="mt-3 text-slate-300 animate-pulse">
                {steps[currentStep] || "Finalizing exploit correlation matrix..."}
              </p>
            </div>
          )}

          {/* Results Summary & Breakdown */}
          {scanComplete && (
            <div className="mt-8 space-y-6">
              {/* Score header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono text-2xl font-extrabold">
                    B+
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Preliminary Security Score for {targetUrl}</h3>
                    <p className="text-xs text-slate-300">
                      1 High Severity Issue • 1 Medium Finding • 2 Controls Verified
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onRequestFullAudit(targetUrl)}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-slate-900 shadow hover:bg-slate-200 transition-all"
                >
                  <FileText className="h-4 w-4 text-slate-900" />
                  <span>Request Full Pentest Report</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Findings List */}
              <div className="space-y-3">
                <div className="font-mono text-xs uppercase text-slate-400">
                  Telemetry Vulnerability Log
                </div>
                {sampleFindings.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/5 bg-[#121524] p-4 text-xs space-y-2 hover:border-white/15 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-white">
                        {item.severity === "Pass" ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-amber-400" />
                        )}
                        <span>{item.category}</span>
                      </div>
                      <span
                        className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                          item.severity === "High"
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            : item.severity === "Medium"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        }`}
                      >
                        {item.severity}
                      </span>
                    </div>
                    <p className="text-slate-300">{item.finding}</p>
                    <div className="font-mono text-[11px] text-cyan-300 bg-white/5 p-2 rounded-lg">
                      <span className="text-slate-400">Fix Recommendation: </span>
                      {item.remediation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
