"use client";

import React, { useState } from "react";
import {
  Eye,
  Tag,
  ThumbsUp,
  ThumbsDown,
  Sliders,
  CheckCircle2,
  Sparkles,
  Code,
  Copy,
  Check,
  AlertTriangle,
  Volume2,
  Sun,
  CloudRain,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

type LabMode = "vision" | "rlhf" | "audio";

interface BoundingBox {
  id: string;
  category: "vehicle" | "pedestrian" | "cyclist" | "signal" | "obstacle";
  label: string;
  color: string;
  top: number; // percentage
  left: number; // percentage
  width: number; // percentage
  height: number; // percentage
  confidence: number; // percentage
  attributes: Record<string, string>;
}

const MASTER_BOXES: BoundingBox[] = [
  {
    id: "box-1",
    category: "vehicle",
    label: "Autonomous_EV",
    color: "#00f0ff",
    top: 38,
    left: 48,
    width: 34,
    height: 36,
    confidence: 99.8,
    attributes: { speed: "42 km/h", lane: "center", occlusion: "none" },
  },
  {
    id: "box-2",
    category: "pedestrian",
    label: "Pedestrian_Crossing",
    color: "#10b981",
    top: 30,
    left: 14,
    width: 16,
    height: 44,
    confidence: 98.4,
    attributes: { pose: "walking", crosswalk: "true", velocity: "1.2 m/s" },
  },
  {
    id: "box-3",
    category: "signal",
    label: "Traffic_Signal_Red",
    color: "#f59e0b",
    top: 12,
    left: 66,
    width: 10,
    height: 20,
    confidence: 96.2,
    attributes: { state: "stop_red", bulb_intensity: "high" },
  },
  {
    id: "box-4",
    category: "cyclist",
    label: "Urban_Cyclist",
    color: "#8b5cf6",
    top: 36,
    left: 32,
    width: 14,
    height: 38,
    confidence: 92.5,
    attributes: { helmet: "detected", path: "bike_lane" },
  },
  {
    id: "box-5",
    category: "obstacle",
    label: "Delivery_Robot",
    color: "#ec4899",
    top: 54,
    left: 24,
    width: 12,
    height: 18,
    confidence: 89.1,
    attributes: { propulsion: "electric", sidewalk: "true" },
  },
  {
    id: "box-6",
    category: "vehicle",
    label: "Distant_Vehicle",
    color: "#00f0ff",
    top: 34,
    left: 84,
    width: 13,
    height: 22,
    confidence: 82.4,
    attributes: { distance: "85m", lane: "opposite" },
  },
  {
    id: "box-7",
    category: "obstacle",
    label: "Construction_Pylon",
    color: "#ec4899",
    top: 60,
    left: 4,
    width: 8,
    height: 16,
    confidence: 76.8,
    attributes: { reflective_tape: "true", zone: "hazard" },
  },
  {
    id: "box-8",
    category: "pedestrian",
    label: "Occluded_Pedestrian",
    color: "#10b981",
    top: 35,
    left: 80,
    width: 10,
    height: 30,
    confidence: 68.5,
    attributes: { occlusion: "70%", shadow: "harsh" },
  },
];

export default function AnnotationLabDemo() {
  const [activeMode, setActiveMode] = useState<LabMode>("vision");

  // Vision Sliders State
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(80);
  const [boxPadding, setBoxPadding] = useState<number>(2); // px
  const [consensusQuorum, setConsensusQuorum] = useState<number>(3); // 1 to 5 leads
  const [weatherNoise, setWeatherNoise] = useState<number>(0); // 0 to 100%
  const [activeCategories, setActiveCategories] = useState<string[]>([
    "vehicle",
    "pedestrian",
    "cyclist",
    "signal",
    "obstacle",
  ]);
  const [selectedBoxId, setSelectedBoxId] = useState<string>("box-1");
  const [showJsonView, setShowJsonView] = useState(false);
  const [copied, setCopied] = useState(false);

  // RLHF Sliders State
  const [safetyGuardrailThreshold, setSafetyGuardrailThreshold] = useState<number>(0.7);
  const [selectedModel, setSelectedModel] = useState<"A" | "B" | null>(null);

  // Audio Sliders State
  const [timeSliceWindow, setTimeSliceWindow] = useState<number>(450); // ms
  const [vadSensitivity, setVadSensitivity] = useState<number>(75); // %

  // Category toggle
  const toggleCategory = (cat: string) => {
    if (activeCategories.includes(cat)) {
      if (activeCategories.length > 1) {
        setActiveCategories(activeCategories.filter((c) => c !== cat));
      }
    } else {
      setActiveCategories([...activeCategories, cat]);
    }
  };

  // Filter boxes based on sliders
  const visibleBoxes = MASTER_BOXES.filter((box) => {
    const categoryMatch = activeCategories.includes(box.category);
    const confidenceMatch = box.confidence >= confidenceThreshold;
    return categoryMatch && confidenceMatch;
  });

  const selectedBox =
    MASTER_BOXES.find((b) => b.id === selectedBoxId) || visibleBoxes[0] || MASTER_BOXES[0];

  const handleCopyJson = () => {
    const exportData = {
      manifest_version: "2.4.0",
      consensus_quorum: `${consensusQuorum}/5 Pod Leads`,
      confidence_threshold: `${confidenceThreshold}%`,
      padding_offset_px: boxPadding,
      weather_filter_applied: `${weatherNoise}%`,
      labeled_objects_count: visibleBoxes.length,
      annotations: visibleBoxes.map((b) => ({
        id: b.id,
        category: b.category,
        label: b.label,
        bbox: [b.left, b.top, b.width, b.height],
        confidence: b.confidence / 100,
        attributes: b.attributes,
      })),
    };
    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetSliders = () => {
    setConfidenceThreshold(80);
    setBoxPadding(2);
    setConsensusQuorum(3);
    setWeatherNoise(0);
    setActiveCategories(["vehicle", "pedestrian", "cyclist", "signal", "obstacle"]);
    setSafetyGuardrailThreshold(0.7);
    setTimeSliceWindow(450);
    setVadSensitivity(75);
  };

  // Dynamic consensus label
  const getConsensusBadge = () => {
    if (consensusQuorum >= 4) return { text: "Gold Master (99.8%)", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" };
    if (consensusQuorum === 3) return { text: "Standard Pass (98.2%)", color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" };
    return { text: "Preliminary Review (91.0%)", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" };
  };

  return (
    <section id="annotation-lab" className="relative py-24 bg-[#090a12] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono text-cyan-400">
            <Sliders className="h-3.5 w-3.5" />
            <span>INTERACTIVE ANNOTATION STUDIO</span>
            <span>•</span>
            <span className="text-slate-400">REAL-TIME TELEMETRY SLIDERS</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Interactive Data Annotation Controls
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Use the simple sliders below to adjust detection confidence thresholds, multi-annotator consensus quorums, boundary padding, and adverse sensor conditions in real time.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <div className="inline-flex rounded-xl bg-slate-900/90 p-1.5 border border-white/10">
            <button
              onClick={() => setActiveMode("vision")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeMode === "vision"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Eye className="h-4 w-4" />
              <span>Vision & Spatial Bounding</span>
            </button>
            <button
              onClick={() => setActiveMode("rlhf")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeMode === "rlhf"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Tag className="h-4 w-4" />
              <span>RLHF & Safety Guardrails</span>
            </button>
            <button
              onClick={() => setActiveMode("audio")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeMode === "audio"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Volume2 className="h-4 w-4" />
              <span>Audio & Diarization Slices</span>
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#0d0f1b] p-4 sm:p-8 shadow-2xl">
          {/* TAB 1: COMPUTER VISION & SPATIAL SLIDERS */}
          {activeMode === "vision" && (
            <div className="space-y-6">
              {/* Sliders Control Bar */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl border border-white/10 bg-[#090b14]">
                {/* Slider 1: Confidence Cutoff */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Confidence Cutoff:</span>
                    <span className="text-cyan-400 font-bold">{confidenceThreshold}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="99"
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>50% (Permissive)</span>
                    <span>99% (Gold Only)</span>
                  </div>
                </div>

                {/* Slider 2: Box Boundary Padding */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">BBox Margin Padding:</span>
                    <span className="text-purple-400 font-bold">
                      {boxPadding >= 0 ? `+${boxPadding}px` : `${boxPadding}px`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-4"
                    max="12"
                    value={boxPadding}
                    onChange={(e) => setBoxPadding(Number(e.target.value))}
                    className="w-full accent-purple-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Tight Sub-Pixel</span>
                    <span>Generous Padding</span>
                  </div>
                </div>

                {/* Slider 3: Consensus Quorum */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Consensus Quorum:</span>
                    <span className="text-emerald-400 font-bold">{consensusQuorum} of 5 Leads</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={consensusQuorum}
                    onChange={(e) => setConsensusQuorum(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>1 (Draft)</span>
                    <span>5 (Max Rigor)</span>
                  </div>
                </div>

                {/* Slider 4: Weather & Sensor Degradation */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Sensor Noise / Fog:</span>
                    <span className="text-amber-400 font-bold">{weatherNoise}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    value={weatherNoise}
                    onChange={(e) => setWeatherNoise(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Clear Day</span>
                    <span>Adverse Fog / Glare</span>
                  </div>
                </div>
              </div>

              {/* Class Filter Chips & Reset */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 mr-1">Class Toggles:</span>
                  {[
                    { id: "vehicle", label: "Vehicles", color: "border-cyan-500/40 text-cyan-300" },
                    { id: "pedestrian", label: "Pedestrians", color: "border-emerald-500/40 text-emerald-300" },
                    { id: "cyclist", label: "Cyclists", color: "border-purple-500/40 text-purple-300" },
                    { id: "signal", label: "Traffic Signals", color: "border-amber-500/40 text-amber-300" },
                    { id: "obstacle", label: "Obstacles", color: "border-pink-500/40 text-pink-300" },
                  ].map((chip) => {
                    const active = activeCategories.includes(chip.id);
                    return (
                      <button
                        key={chip.id}
                        onClick={() => toggleCategory(chip.id)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-all border ${
                          active
                            ? `bg-white/10 ${chip.color} shadow-sm font-semibold`
                            : "bg-transparent border-white/5 text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {chip.label}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400">
                    Active Bounding Boxes:{" "}
                    <strong className="text-white">{visibleBoxes.length}</strong> /{" "}
                    {MASTER_BOXES.length}
                  </span>
                  <button
                    onClick={handleResetSliders}
                    className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Canvas & Inspector Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Viewport */}
                <div className="lg:col-span-2 relative min-h-[420px] rounded-2xl border border-white/10 bg-[#06070a] overflow-hidden flex flex-col justify-between p-4">
                  {/* Cyber Camera Grid */}
                  <div className="absolute inset-0 bg-grid-cyber opacity-30 pointer-events-none" />

                  {/* Synthetic Sensor Noise Filter Overlay */}
                  <div
                    style={{
                      opacity: weatherNoise / 100,
                      backdropFilter: `blur(${weatherNoise * 0.05}px) contrast(${100 - weatherNoise * 0.4}%)`,
                      backgroundColor: `rgba(20, 24, 38, ${weatherNoise * 0.008})`,
                    }}
                    className="absolute inset-0 pointer-events-none transition-all duration-200 z-10"
                  />

                  {/* Top HUD */}
                  <div className="relative z-20 flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1 rounded-md border border-cyan-500/30 text-cyan-400">
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                      <span>HD_LIDAR_FEED: SEQ#2094</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md border font-mono text-[11px] ${getConsensusBadge().color}`}>
                        {getConsensusBadge().text}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Bounding Boxes Canvas */}
                  <div className="relative flex-1 w-full my-4 z-20 min-h-[300px]">
                    {visibleBoxes.map((box) => {
                      const isSelected = selectedBox.id === box.id;
                      return (
                        <div
                          key={box.id}
                          onClick={() => setSelectedBoxId(box.id)}
                          style={{
                            top: `calc(${box.top}% - ${boxPadding}px)`,
                            left: `calc(${box.left}% - ${boxPadding}px)`,
                            width: `calc(${box.width}% + ${boxPadding * 2}px)`,
                            height: `calc(${box.height}% + ${boxPadding * 2}px)`,
                            borderColor: box.color,
                          }}
                          className={`absolute cursor-pointer border-2 rounded-lg transition-all duration-150 ${
                            isSelected
                              ? "bg-cyan-500/20 shadow-[0_0_30px_rgba(0,240,255,0.45)] scale-[1.01] z-30"
                              : "bg-white/5 hover:bg-white/10 z-20"
                          }`}
                        >
                          {/* Label tag */}
                          <div
                            style={{ backgroundColor: box.color }}
                            className="absolute -top-6 left-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-slate-950 flex items-center gap-1 shadow-md"
                          >
                            <span>{box.label}</span>
                            <span>({box.confidence}%)</span>
                          </div>

                          {/* Sub-pixel alignment corner crosshairs */}
                          <div className="absolute -top-1 -left-1 h-2 w-2 bg-white rounded-full" />
                          <div className="absolute -top-1 -right-1 h-2 w-2 bg-white rounded-full" />
                          <div className="absolute -bottom-1 -left-1 h-2 w-2 bg-white rounded-full" />
                          <div className="absolute -bottom-1 -right-1 h-2 w-2 bg-white rounded-full" />
                        </div>
                      );
                    })}

                    {visibleBoxes.length === 0 && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-slate-500 font-mono text-xs">
                        <AlertTriangle className="h-6 w-6 text-amber-400 mb-2" />
                        <span>All annotations filtered out by current Confidence Cutoff ({confidenceThreshold}%).</span>
                        <span className="text-slate-600 mt-1">Lower the slider above to restore detections.</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Canvas Footer */}
                  <div className="relative z-20 flex items-center justify-between font-mono text-xs text-slate-400">
                    <div>
                      Sub-pixel margin: {boxPadding >= 0 ? `+${boxPadding}px` : `${boxPadding}px`} • 60 FPS
                    </div>
                    <button
                      onClick={() => setShowJsonView(!showJsonView)}
                      className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-800/80 px-3 py-1.5 text-slate-200 hover:text-white"
                    >
                      <Code className="h-3.5 w-3.5 text-cyan-400" />
                      <span>{showJsonView ? "View Canvas" : "Export COCO JSON"}</span>
                    </button>
                  </div>
                </div>

                {/* Sidebar Inspector & Export */}
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-[#121524] p-5">
                    <div className="flex items-center justify-between font-mono text-xs text-slate-400 mb-3">
                      <span>TELEMETRY METRICS</span>
                      <button
                        onClick={handleCopyJson}
                        className="flex items-center gap-1 text-cyan-400 hover:underline"
                      >
                        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        <span>{copied ? "Copied!" : "Copy Spec"}</span>
                      </button>
                    </div>

                    {showJsonView ? (
                      <pre className="p-3 rounded-xl bg-[#090b14] text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-[320px]">
{JSON.stringify(
  {
    metadata: {
      consensus_quorum: `${consensusQuorum}/5 leads`,
      confidence_cutoff: `${confidenceThreshold}%`,
      padding_offset: `${boxPadding}px`,
      noise_factor: `${weatherNoise}%`,
      active_boxes: visibleBoxes.length,
    },
    active_target: {
      id: selectedBox.id,
      label: selectedBox.label,
      confidence: selectedBox.confidence / 100,
      bbox: [selectedBox.left, selectedBox.top, selectedBox.width, selectedBox.height],
      attributes: selectedBox.attributes,
    },
  },
  null,
  2
)}
                      </pre>
                    ) : (
                      <div className="space-y-3 font-mono text-xs">
                        <div>
                          <span className="text-slate-400">Selected Target</span>
                          <div className="mt-1 text-sm font-bold text-white flex items-center gap-2">
                            <span
                              style={{ backgroundColor: selectedBox.color }}
                              className="h-2.5 w-2.5 rounded-full"
                            />
                            {selectedBox.label}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                          <div>
                            <span className="text-slate-500">Confidence</span>
                            <div className="text-cyan-400 font-bold">{selectedBox.confidence}%</div>
                          </div>
                          <div>
                            <span className="text-slate-500">Class Category</span>
                            <div className="text-white capitalize">{selectedBox.category}</div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/5 space-y-1.5">
                          <span className="text-slate-500 block mb-1">Attributes</span>
                          {Object.entries(selectedBox.attributes).map(([k, v]) => (
                            <div key={k} className="flex justify-between text-slate-300">
                              <span className="text-slate-500">{k}:</span>
                              <span className="text-cyan-200">{v}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-white/5">
                          <span className="text-slate-500 block mb-1">Pod Consensus Verification</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((lead) => (
                              <div
                                key={lead}
                                className={`flex-1 text-center py-1 rounded text-[10px] ${
                                  lead <= consensusQuorum
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                    : "bg-white/5 text-slate-600 border border-white/5"
                                }`}
                              >
                                L{lead}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-4 text-xs">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
                      <Sparkles className="h-4 w-4" />
                      <span>Programmatic Consensus Verification</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      Our validation engine checks IoU overlap between multiple independent annotator passes to ensure 99.8% precision before final dataset export.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RLHF & LLM SAFETY GUARDRAILS SLIDER */}
          {activeMode === "rlhf" && (
            <div className="space-y-6">
              {/* Slider for RLHF Guardrail Threshold */}
              <div className="p-5 rounded-2xl border border-purple-500/30 bg-purple-950/15 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono uppercase text-purple-400 font-bold block">
                      RLHF Guardrail Sensitivity Slider
                    </span>
                    <span className="text-xs text-slate-400">
                      Slide to adjust required alignment threshold for model safety, sycophancy, and hallucination penalties.
                    </span>
                  </div>
                  <div className="font-mono text-sm font-bold text-purple-300 bg-purple-500/20 px-3 py-1 rounded-lg border border-purple-500/40">
                    Threshold: {safetyGuardrailThreshold.toFixed(2)}
                  </div>
                </div>

                <input
                  type="range"
                  min="0.2"
                  max="0.95"
                  step="0.05"
                  value={safetyGuardrailThreshold}
                  onChange={(e) => setSafetyGuardrailThreshold(Number(e.target.value))}
                  className="w-full accent-purple-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />

                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>0.20 (Permissive / Creative)</span>
                  <span>0.70 (Standard Enterprise)</span>
                  <span>0.95 (Zero-Tolerance Hardened)</span>
                </div>
              </div>

              {/* Sample Prompt */}
              <div className="rounded-2xl border border-white/10 bg-[#090b14] p-5">
                <div className="font-mono text-xs text-purple-400 uppercase tracking-wider mb-2">
                  Sample Multi-Turn Prompt (Security & Code Architecture Benchmark)
                </div>
                <p className="text-white font-mono text-sm">
                  &quot;Write a secure Node.js session validation middleware that prevents timing attacks and SQL injection.&quot;
                </p>
              </div>

              {/* Models Candidate Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Candidate A */}
                <div
                  onClick={() => setSelectedModel("A")}
                  className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                    selectedModel === "A"
                      ? "border-cyan-500 bg-cyan-500/10 shadow-lg"
                      : "border-white/10 bg-[#121524] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      MODEL CANDIDATE A (Safety Score: 0.96)
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      {0.96 >= safetyGuardrailThreshold ? "✔ PASSES GUARDRAIL" : "⚠ FLAGGED"}
                    </span>
                  </div>
                  <pre className="p-3 rounded-xl bg-[#07080f] text-xs font-mono text-slate-300 overflow-x-auto">
{`const crypto = require('crypto');

function validateSession(req, res, next) {
  const token = req.headers['x-session-token'];
  if (!token || token.length !== 64) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  const expected = Buffer.from(process.env.SESSION_SECRET);
  const actual = Buffer.from(token);
  // Mitigates execution timing leakage
  if (!crypto.timingSafeEqual(expected, actual)) {
    return res.status(401).end();
  }
  next();
}`}
                  </pre>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Timing-safe equal verified</span>
                    <button className="flex items-center gap-1 font-semibold text-cyan-300">
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span>Select Preferred Pair</span>
                    </button>
                  </div>
                </div>

                {/* Candidate B */}
                <div
                  onClick={() => setSelectedModel("B")}
                  className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                    selectedModel === "B"
                      ? "border-rose-500 bg-rose-500/10 shadow-lg"
                      : "border-white/10 bg-[#121524] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-amber-400">
                      MODEL CANDIDATE B (Safety Score: 0.52)
                    </span>
                    <span className="text-xs font-mono text-rose-400 font-bold">
                      {0.52 >= safetyGuardrailThreshold ? "✔ PASSES" : "✖ REJECTED BY SLIDER"}
                    </span>
                  </div>
                  <pre className="p-3 rounded-xl bg-[#07080f] text-xs font-mono text-slate-300 overflow-x-auto">
{`function validateSession(req, res, next) {
  const token = req.headers['x-session-token'];
  // VULNERABLE: Direct string comparison leaks execution timing
  if (token === process.env.SESSION_SECRET) {
    return next();
  }
  res.status(401).send('Unauthorized');
}`}
                  </pre>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-rose-400 font-mono">Timing attack vulnerability</span>
                    <button className="flex items-center gap-1 font-semibold text-rose-400">
                      <ThumbsDown className="h-3.5 w-3.5" />
                      <span>Flag Safety Defect</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AUDIO & DIARIZATION SLIDERS */}
          {activeMode === "audio" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/15">
                {/* Audio Time Slice Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Time Slice Resolution:</span>
                    <span className="text-emerald-400 font-bold">{timeSliceWindow} ms</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={timeSliceWindow}
                    onChange={(e) => setTimeSliceWindow(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>100ms (Phoneme level)</span>
                    <span>1000ms (Utterance level)</span>
                  </div>
                </div>

                {/* VAD Sensitivity Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Vocal Activity (VAD) Sensitivity:</span>
                    <span className="text-cyan-400 font-bold">{vadSensitivity}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="99"
                    value={vadSensitivity}
                    onChange={(e) => setVadSensitivity(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Low (Ignores whisper)</span>
                    <span>High (Includes breath)</span>
                  </div>
                </div>
              </div>

              {/* Waveform Visualization Mock */}
              <div className="rounded-2xl border border-white/10 bg-[#06070a] p-6 space-y-4 font-mono">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>AUDIO_DIARIZATION_STREAM: 48kHz Stereo FLAC</span>
                  <span className="text-emerald-400">Slice: {timeSliceWindow}ms</span>
                </div>

                {/* Waveform bars */}
                <div className="h-20 flex items-center justify-between gap-1 overflow-hidden px-2">
                  {[40, 65, 80, 25, 90, 75, 30, 45, 95, 60, 35, 85, 70, 50, 65, 30, 80, 95, 45, 60, 20, 75, 85, 30, 55, 90, 40, 20, 80, 65].map(
                    (val, i) => (
                      <div
                        key={i}
                        style={{ height: `${Math.min(100, val * (vadSensitivity / 60))}%` }}
                        className={`w-full rounded-full transition-all duration-200 ${
                          i < 12
                            ? "bg-cyan-400"
                            : i < 20
                            ? "bg-purple-400"
                            : "bg-emerald-400"
                        }`}
                      />
                    )
                  )}
                </div>

                {/* Diarization Tracks */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-2">
                  <div className="p-2.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10">
                    <span className="text-cyan-400 font-bold block">Speaker_01 (Host)</span>
                    <span className="text-slate-400 text-[11px]">0.00s - 3.42s [Confidence: 99.4%]</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-purple-500/30 bg-purple-500/10">
                    <span className="text-purple-400 font-bold block">Speaker_02 (Guest)</span>
                    <span className="text-slate-400 text-[11px]">3.42s - 6.18s [Confidence: 98.7%]</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10">
                    <span className="text-emerald-400 font-bold block">Acoustic Ambient</span>
                    <span className="text-slate-400 text-[11px]">Noise Floor: -48dB (Filtered)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
