"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Send, Shield, Sparkles, Clock, Lock } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillService?: string;
  prefillDetails?: {
    services?: string[];
    scale?: string;
    urgency?: string;
    estCost?: string;
    estTimeline?: string;
  };
}

export default function ContactModal({
  isOpen,
  onClose,
  prefillService,
  prefillDetails,
}: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("Immediate (< 1 week)");
  const [budget, setBudget] = useState("$10k - $25k");
  const [message, setMessage] = useState("");
  const [requireNda, setRequireNda] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  useEffect(() => {
    if (prefillDetails?.services && prefillDetails.services.length > 0) {
      setServices(prefillDetails.services);
      if (prefillDetails.estTimeline) {
        setTimeline(prefillDetails.estTimeline);
      }
      if (prefillDetails.estCost) {
        setMessage(
          `Estimated Scope: ${prefillDetails.services.join(", ")} | Budget Range: ${prefillDetails.estCost} | Urgency: ${prefillDetails.urgency}`
        );
      }
    } else if (prefillService) {
      setServices([prefillService]);
    } else {
      setServices(["Data Annotation"]);
    }
  }, [prefillService, prefillDetails]);

  if (!isOpen) return null;

  const handleToggleService = (sName: string) => {
    if (services.includes(sName)) {
      if (services.length > 1) {
        setServices(services.filter((s) => s !== sName));
      }
    } else {
      setServices([...services, sName]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `KQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefId(generatedId);
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0d0f1b] p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Project Spec Received</h3>
            <div className="inline-block rounded-lg bg-white/5 px-4 py-1.5 font-mono text-sm text-cyan-300 border border-cyan-500/30">
              Reference ID: {refId}
            </div>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{name || "Partner"}</strong>. A Senior Solutions Architect from Kinetiq Spec has been dispatched to review your technical requirements.
            </p>
            <div className="rounded-xl border border-white/5 bg-[#121524] p-4 text-xs font-mono text-slate-400 max-w-md mx-auto text-left space-y-1">
              <div className="text-cyan-400 font-bold mb-1">Next Immediate Steps:</div>
              <div>1. Pre-execution bilateral NDA execution (if requested).</div>
              <div>2. 30-min Technical Discovery call with Pod Lead.</div>
              <div>3. Fixed Statement of Work & initial sandbox deployment within 24 hours.</div>
            </div>
            <button
              onClick={resetAndClose}
              className="mt-4 rounded-xl bg-cyan-500 px-6 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-400 transition-colors"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>RAPID DISPATCH INTAKE</span>
            </div>
            <h3 className="text-2xl font-black text-white">
              Request Project Proposal / Audit
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Speak directly with our senior engineering and security leads. No pushy sales reps.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                  Select Required Services
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Data Annotation",
                    "App Testing & QA",
                    "Custom Programming",
                    "Security Audits",
                  ].map((s) => {
                    const active = services.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleToggleService(s)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                          active
                            ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300"
                            : "bg-[#121524] border-white/5 text-slate-400 hover:text-white"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Work Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#07080d] text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@enterprise.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#07080d] text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Company & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Autonomous / FinTech Inc."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#07080d] text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Target Timeline</label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#07080d] text-white text-sm focus:border-cyan-400 focus:outline-none"
                  >
                    <option>Immediate (Urgent 48h Pod)</option>
                    <option>1 - 2 Weeks</option>
                    <option>2 - 4 Weeks</option>
                    <option>1 - 3 Months</option>
                  </select>
                </div>
              </div>

              {/* Project Scope Description */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Project Scope / Technical Details
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your dataset requirements, target apps for QA, codebase architecture, or pentest scope..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#07080d] text-white text-sm focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>

              {/* NDA Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="nda-checkbox"
                  checked={requireNda}
                  onChange={(e) => setRequireNda(e.target.checked)}
                  className="rounded border-white/20 bg-slate-800 text-cyan-400 focus:ring-cyan-400 h-4 w-4"
                />
                <label htmlFor="nda-checkbox" className="text-xs text-slate-300 flex items-center gap-1.5 cursor-pointer">
                  <Lock className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Send standard mutual NDA before sharing confidential repository access or datasets</span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  <Send className="mr-2 h-4 w-4" />
                  <span>Dispatch Technical Inquiry</span>
                </button>
                <div className="mt-2 text-center font-mono text-[10px] text-slate-500">
                  Guaranteed confidential • Zero spam • Direct engineer response in &lt; 4 hours
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
