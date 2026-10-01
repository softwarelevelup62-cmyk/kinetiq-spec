"use client";

import React, { useState, useEffect } from "react";
import { Terminal, CheckCircle2, ShieldCheck, Cpu, Code2, Play, RefreshCw, Copy, Check } from "lucide-react";

type ConsoleTab = "annotation" | "testing" | "programming" | "security";

interface LogEntry {
  time: string;
  type: "info" | "success" | "warn" | "error" | "accent";
  text: string;
}

const LOGS_BY_TAB: Record<ConsoleTab, LogEntry[]> = {
  annotation: [
    { time: "13:20:01", type: "info", text: "Ingesting 3D LiDAR point cloud batch: /datasets/lidar_v4_seq981.bin" },
    { time: "13:20:02", type: "info", text: "Applying semi-automated spatial bounding proposal (Model: Kinetiq-Spatial-YOLOv9)" },
    { time: "13:20:03", type: "accent", text: "[POD-A2] Expert annotator verified 38 object cuboids [Pedestrian: 12, Cyclist: 4, Vehicle: 22]" },
    { time: "13:20:04", type: "info", text: "Running multi-annotator consensus voting matrix across 3 independent pods..." },
    { time: "13:20:05", type: "success", text: "✔ Consensus agreement achieved: 99.84% IoU (Intersection-over-Union)" },
    { time: "13:20:06", type: "accent", text: "Exporting validated manifest: parquet://kinetiq-spec-gold/batch-981.parquet [Signed SHA-256]" },
    { time: "13:20:07", type: "success", text: "✔ Ground truth artifact dispatched to secure repository bucket via KMS encryption." },
  ],
  testing: [
    { time: "13:20:01", type: "info", text: "$ npx playwright test --workers=8 --config=playwright.config.ts" },
    { time: "13:20:02", type: "info", text: "[Chromium/WebKit/Mobile-Chrome] Launching 80 cross-browser test matrix workers..." },
    { time: "13:20:03", type: "accent", text: "Running: auth.biometric-sso.spec.ts → OAuth PKCE exchange verified (34ms)" },
    { time: "13:20:04", type: "accent", text: "Running: checkout.idempotency.spec.ts → 1,000 parallel payment calls injected" },
    { time: "13:20:05", type: "success", text: "✔ Zero double-charge race conditions detected. Mutex locks held as expected." },
    { time: "13:20:06", type: "info", text: "Performance profiling: TTFB 24ms | CLS 0.001 | INP 18ms (99th percentile)" },
    { time: "13:20:07", type: "success", text: "✔ 428 / 428 passed (100% test suite health). Artifact video traces generated." },
  ],
  programming: [
    { time: "13:20:01", type: "info", text: "$ pnpm run build && tsc --noEmit && cargo build --release" },
    { time: "13:20:02", type: "accent", text: "Compiling Next.js 15 Server Components & Edge Handlers..." },
    { time: "13:20:03", type: "info", text: "Building high-performance telemetry microservice in Go 1.23 + gRPC" },
    { time: "13:20:04", type: "success", text: "✔ Zero TypeScript compilation errors. Strict null checks satisfied (100% coverage)." },
    { time: "13:20:05", type: "accent", text: "Docker multi-stage build: Layer cached. Final image footprint: 28.4 MB" },
    { time: "13:20:06", type: "info", text: "Deploying to Kubernetes cluster (us-east-1) via Helm rollout..." },
    { time: "13:20:07", type: "success", text: "✔ Deployment healthy: 24 pods online. Traffic shifted with 0ms downtime." },
  ],
  security: [
    { time: "13:20:01", type: "info", text: "$ kinetiq-sec audit --target api.staging.production.internal --depth deep" },
    { time: "13:20:02", type: "info", text: "Probing TLS 1.3 cipher suite, CORS wildcards, and CSP headers..." },
    { time: "13:20:03", type: "warn", text: "⚠ Anomaly detected: /api/v2/organizations/{id}/members exposed without BOLA check" },
    { time: "13:20:04", type: "accent", text: "Simulating adversarial token tampering (CVSS 8.6 IDOR vulnerability identified)" },
    { time: "13:20:05", type: "info", text: "Synthesizing remediation patch: applying row-level RBAC policy + JWT claim validation" },
    { time: "13:20:06", type: "success", text: "✔ Patch verified against exploit test case: IDOR vector neutralized." },
    { time: "13:20:07", type: "success", text: "✔ Penetration Report generated: SOC 2 Type II compliance check PASSED." },
  ],
};

export default function LiveConsole() {
  const [activeTab, setActiveTab] = useState<ConsoleTab>("annotation");
  const [isSimulating, setIsSimulating] = useState(false);
  const [visibleLogs, setVisibleLogs] = useState<LogEntry[]>(LOGS_BY_TAB["annotation"]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setVisibleLogs(LOGS_BY_TAB[activeTab]);
  }, [activeTab]);

  const handleRerun = () => {
    setIsSimulating(true);
    setVisibleLogs([]);
    const fullLogs = LOGS_BY_TAB[activeTab];
    fullLogs.forEach((log, index) => {
      setTimeout(() => {
        setVisibleLogs((prev) => [...prev, log]);
        if (index === fullLogs.length - 1) {
          setIsSimulating(false);
        }
      }, (index + 1) * 350);
    });
  };

  const handleCopyLogs = () => {
    const text = visibleLogs.map((l) => `[${l.time}] ${l.text}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="console" className="relative mx-auto max-w-5xl rounded-2xl border border-white/10 bg-[#0c0e18] p-4 sm:p-6 shadow-2xl shadow-cyan-950/40">
      {/* Glow ambient background */}
      <div className="absolute -top-20 -left-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      {/* Terminal Title Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="flex items-center space-x-2 font-mono text-xs text-slate-400">
            <Terminal className="h-3.5 w-3.5 text-cyan-400" />
            <span>kinetiq-spec-telemetry@v2.4.0: runtime-active</span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-900/90 p-1 border border-white/5">
          <button
            onClick={() => setActiveTab("annotation")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeTab === "annotation"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Cpu className="h-3.5 w-3.5" />
            Data Pipeline
          </button>
          <button
            onClick={() => setActiveTab("testing")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeTab === "testing"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            App QA Tests
          </button>
          <button
            onClick={() => setActiveTab("programming")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeTab === "programming"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            Code & Build
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeTab === "security"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Security Audit
          </button>
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="relative mt-4 min-h-[260px] max-h-[360px] overflow-y-auto rounded-xl bg-[#07080d] p-4 font-mono text-xs sm:text-sm leading-relaxed border border-white/5">
        <div className="space-y-2">
          {visibleLogs.map((log, i) => (
            <div key={i} className="flex items-start gap-2.5 animate-fadeIn">
              <span className="text-slate-500 select-none">[{log.time}]</span>
              {log.type === "info" && <span className="text-slate-300">{log.text}</span>}
              {log.type === "success" && <span className="text-emerald-400 font-semibold">{log.text}</span>}
              {log.type === "warn" && <span className="text-amber-400 font-semibold">{log.text}</span>}
              {log.type === "accent" && (
                <span className="text-cyan-300 font-medium">
                  {log.text}
                </span>
              )}
            </div>
          ))}

          {isSimulating && (
            <div className="flex items-center gap-2 text-cyan-400 animate-pulse pt-1">
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              <span>Streaming telemetry nodes...</span>
            </div>
          )}
        </div>
      </div>

      {/* Terminal Footer Controls */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Real-time agentic execution engine • Consensus validated</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyLogs}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700/60 hover:text-white transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied!" : "Copy Trace"}</span>
          </button>
          <button
            onClick={handleRerun}
            disabled={isSimulating}
            className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-400 hover:bg-cyan-500/20 transition-all disabled:opacity-50"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Re-run Simulation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
