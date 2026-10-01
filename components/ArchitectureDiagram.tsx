"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Lock,
  Cpu,
  Zap,
  Layers,
  ArrowRight,
  Database,
  Radio,
  Server,
  Activity,
  Code2,
} from "lucide-react";

export interface DiagramNode {
  id: string;
  name: string;
  role: string;
  protocol: string;
  latency: string;
  security: string;
  tech: string;
  status: "active" | "standby" | "optimizing";
  details: string;
  payloadSample: string;
}

export interface BlueprintDiagramData {
  blueprintId: string;
  title: string;
  archetype: string;
  pipelineType: string;
  nodes: DiagramNode[];
}

export const DIAGRAM_BLUEPRINTS: Record<string, BlueprintDiagramData> = {
  "autonomous-autopilot": {
    blueprintId: "autonomous-autopilot",
    title: "Multi-Camera Vision & 3D LiDAR Perception Pipeline",
    archetype: "Waymo / Tesla Autopilot Archetype",
    pipelineType: "Real-Time Sensor Fusion & Spatial Inference Mesh",
    nodes: [
      {
        id: "node-1",
        name: "8x 4K HDR Camera & LiDAR Array",
        role: "Sensory Data Ingestion",
        protocol: "GMSL2 / PCIe Raw Bus",
        latency: "0.4 ms",
        security: "Hardware Tamper Protection",
        tech: "Sony IMX Sensors + Hesai LiDAR",
        status: "active",
        details: "Ingesting 60 FPS raw Bayer format frames alongside 3D point cloud packets with zero CPU copy overhead.",
        payloadSample: '{"frame_id": 98402, "timestamp_us": 172763400012, "channels": 8, "lidar_points": 142000}',
      },
      {
        id: "node-2",
        name: "Hardware Calibration & Time-Sync",
        role: "Spatial Temporal Alignment",
        protocol: "PTP IEEE 1588 / DMA",
        latency: "0.8 ms",
        security: "Kernel Clock Verification",
        tech: "Xilinx FPGA / PTP v2",
        status: "active",
        details: "Sub-microsecond synchronization reconciling camera shutter exposure and LiDAR beam firing angles.",
        payloadSample: '{"sync_drift_ns": 42, "status": "LOCKED", "calibrated_matrices": "intrinsics_v4.bin"}',
      },
      {
        id: "node-3",
        name: "TensorRT / CUDA Neural Backbone",
        role: "Feature Extraction & Embeddings",
        protocol: "CUDA Streams / Shared Mem",
        latency: "5.2 ms",
        security: "Memory Enclave Guardrails",
        tech: "NVIDIA TensorRT 10.0 / FP8",
        status: "active",
        details: "Multi-scale Transformer backbone extracting high-density 2D/3D feature vectors from 8 surrounding perspectives.",
        payloadSample: '{"model": "Kinetiq-OccFormer-v3", "batch_size": 1, "fp8_quantized": true, "gpu_util": "91%"}',
      },
      {
        id: "node-4",
        name: "3D Spatial Occupancy & Bounding",
        role: "Volumetric World Model",
        protocol: "Zero-Copy IPC Buffer",
        latency: "3.1 ms",
        security: "Sub-pixel IoU Consensus",
        tech: "3D Bounding Cuboids & Polygons",
        status: "active",
        details: "Discretizes 3D space into voxel grids, resolving occluded pedestrians, cyclists, and lane boundaries.",
        payloadSample: '{"voxels_active": 48200, "detected_objects": 18, "min_consensus_iou": 0.9984}',
      },
      {
        id: "node-5",
        name: "Temporal Tracking & Object ID Lock",
        role: "Motion Prediction & Trajectory",
        protocol: "ROS2 DDS FastRTPS",
        latency: "1.4 ms",
        security: "Anti-Decal Adversarial Filter",
        tech: "Kalman Filter + ByteTrack",
        status: "active",
        details: "Assigns persistent IDs and velocity vectors across 600-frame video windows to foresee cut-ins and braking.",
        payloadSample: '{"tracked_agents": [{"id": "VEH_42", "vx_mps": 14.2, "vy_mps": -0.4, "ttc_sec": 4.8}]}',
      },
      {
        id: "node-6",
        name: "Trajectory Planning & Actuation",
        role: "Safe Path Execution",
        protocol: "CAN-FD / Automotive Ethernet",
        latency: "0.9 ms",
        security: "Dual-Bus Fail-Safe Lockout",
        tech: "C++20 Zero-Allocation Engine",
        status: "active",
        details: "Outputs micro-steering angles, brake torque commands, and acceleration curves with hardware interlocks.",
        payloadSample: '{"steering_rad": -0.042, "accel_mps2": 0.12, "emergency_brake_armed": false}',
      },
    ],
  },
  "llm-alignment": {
    blueprintId: "llm-alignment",
    title: "RLHF, SFT & Adversarial Red-Teaming Alignment Pipeline",
    archetype: "OpenAI ChatGPT / Claude Archetype",
    pipelineType: "Distributed Model Alignment & Evaluation Pipeline",
    nodes: [
      {
        id: "node-1",
        name: "Raw Foundation Weights & Prompts",
        role: "Base Model Checkpoint",
        protocol: "NFS / S3 High-Throughput",
        latency: "12 ms",
        security: "KMS Envelope Decryption",
        tech: "PyTorch / Megatron-LM",
        status: "active",
        details: "Unaligned base model weights loaded across multi-node H100 GPU clusters with distributed checkpointing.",
        payloadSample: '{"checkpoint": "70B_base_v1.bin", "shards": 8, "tensor_parallel": 4, "context_len": 128000}',
      },
      {
        id: "node-2",
        name: "SFT Domain Specialist Pods",
        role: "Supervised Fine-Tuning Curation",
        protocol: "Internal REST / Parquet",
        latency: "8 ms",
        security: "Bilateral NDA & PII Scrubber",
        tech: "Domain-Expert Humans + SFT",
        status: "active",
        details: "Expert annotators curate multi-turn dialogue trees, reasoning traces, and high-density instruction pairs.",
        payloadSample: '{"verified_pairs": 50000, "quality_rubric": "Senior_Staff_Eng", "hallucination_rate": 0.001}',
      },
      {
        id: "node-3",
        name: "Reward Model Scoring (DPO / PPO)",
        role: "Preference Optimization",
        protocol: "gRPC Streaming",
        latency: "18 ms",
        security: "Sycophancy Penalty Check",
        tech: "Direct Preference Optimization",
        status: "active",
        details: "Computes scalar reward scores based on human pairwise preferences, penalizing verbose hallucinated outputs.",
        payloadSample: '{"margin_loss": 0.142, "reward_spread": 2.84, "chosen_prob": 0.94, "rejected_prob": 0.06}',
      },
      {
        id: "node-4",
        name: "Adversarial Red-Team Engine",
        role: "Automated Safety Probing",
        protocol: "Async Python / Ray",
        latency: "22 ms",
        security: "OWASP LLM Top 10 Attack Suite",
        tech: "PyRIT / Custom Red-Teaming",
        status: "active",
        details: "Injects multi-turn jailbreaks, prompt extraction payloads, and indirect prompt injection vectors to harden policy.",
        payloadSample: '{"attacks_tested": 14200, "jailbreak_leakage": 0.00, "refusal_precision": 0.998}',
      },
      {
        id: "node-5",
        name: "vLLM / Triton Inference Cluster",
        role: "Distributed Serving",
        protocol: "HTTP/2 PagedAttention",
        latency: "14 ms",
        security: "Role-Based Token Isolation",
        tech: "vLLM + Triton Inference Server",
        status: "active",
        details: "PagedAttention memory management maximizes throughput while delivering sub-35ms time-to-first-token.",
        payloadSample: '{"ttft_ms": 28, "tokens_per_sec": 142, "cache_hit_ratio": "88.4%", "active_requests": 64}',
      },
      {
        id: "node-6",
        name: "Guardrail Filter & SSE Token Stream",
        role: "Egress Output Verification",
        protocol: "Server-Sent Events (SSE)",
        latency: "2.1 ms",
        security: "Real-Time Regex & Toxicity Block",
        tech: "NeMo Guardrails + Edge Proxy",
        status: "active",
        details: "Sanitizes tokens before reaching the client; blocks secret leakage and enforces corporate safety policies.",
        payloadSample: '{"token": "return crypto.timingSafeEqual...", "flagged": false, "toxicity_score": 0.001}',
      },
    ],
  },
  "stripe-payments": {
    blueprintId: "stripe-payments",
    title: "Double-Entry Financial Ledger & Webhook Distribution Engine",
    archetype: "Stripe Payment Infrastructure Archetype",
    pipelineType: "High-Assurance Transactional & Event-Driven Engine",
    nodes: [
      {
        id: "node-1",
        name: "API Gateway & Signature Auth",
        role: "Edge Ingress & Validation",
        protocol: "HTTPS / TLS 1.3 Strict",
        latency: "4.2 ms",
        security: "HMAC-SHA256 Request Signing",
        tech: "Envoy Proxy + Cloudflare",
        status: "active",
        details: "Terminates mTLS, enforces IP rate limits, and validates API keys using constant-time cryptographic checks.",
        payloadSample: '{"method": "POST", "path": "/v1/charges", "idempotency_key": "idemp_9921_alpha"}',
      },
      {
        id: "node-2",
        name: "Redis Idempotency Mutex Lock",
        role: "Duplicate Charge Deduplication",
        protocol: "RESP3 Protocol",
        latency: "1.1 ms",
        security: "Distributed Key TTL Mutex",
        tech: "Redis Cluster / Redlock",
        status: "active",
        details: "Guarantees zero double-charging by atomically locking on idempotency keys across all parallel distributed workers.",
        payloadSample: '{"lock_acquired": true, "key": "idemp_9921_alpha", "lease_time_ms": 5000}',
      },
      {
        id: "node-3",
        name: "PCI-DSS Tokenization HSM Vault",
        role: "Cardholder Data Isolation",
        protocol: "Encrypted RPC / mTLS",
        latency: "6.5 ms",
        security: "PCI-DSS Level 1 Hardware Enclave",
        tech: "AWS CloudHSM / Vault",
        status: "active",
        details: "Replaces primary account numbers (PAN) with surrogate tokens inside isolated, air-gapped security enclaves.",
        payloadSample: '{"token": "tok_1N3k4fJ2eZbKY", "brand": "visa", "last4": "4242", "fingerprint": "fp_8829"}',
      },
      {
        id: "node-4",
        name: "Immutable Double-Entry Ledger",
        role: "Financial Balance Accounting",
        protocol: "PostgreSQL Serializable TX",
        latency: "8.4 ms",
        security: "Zero Floating-Point Strictness",
        tech: "Go 1.23 Ledger Core",
        status: "active",
        details: "Every dollar is recorded as matching debit and credit ledger postings in 64-bit integer cents. No floating point.",
        payloadSample: '{"entries": [{"account": "acct_customer", "debit": 4500}, {"account": "acct_merchant", "credit": 4500}]}',
      },
      {
        id: "node-5",
        name: "Kafka Webhook Event Stream",
        role: "At-Least-Once Delivery Queue",
        protocol: "Kafka Binary Protocol",
        latency: "2.8 ms",
        security: "Encrypted Topic Partitions",
        tech: "Apache Kafka + Strimzi",
        status: "active",
        details: "Guarantees durable publish-subscribe event queuing with partition keys matching merchant IDs.",
        payloadSample: '{"topic": "payment_intents.succeeded", "partition": 4, "offset": 1089201, "signed": true}',
      },
      {
        id: "node-6",
        name: "Webhook Delivery Mesh & Retry",
        role: "Merchant Callback Dispatch",
        protocol: "HTTPS Webhook + HMAC Sign",
        latency: "18 ms",
        security: "Timestamp Replay Defense",
        tech: "Go Worker Pool + Exponential Backoff",
        status: "active",
        details: "Dispatches HTTP POST webhooks with signed headers; retries with jittered exponential backoff over 72 hours.",
        payloadSample: '{"signature": "t=1727634000,v1=9a8f...3c", "attempt": 1, "response_status": 200}',
      },
    ],
  },
  "netflix-streaming": {
    blueprintId: "netflix-streaming",
    title: "Adaptive Video Transcoding & Low-Latency Edge Delivery Mesh",
    archetype: "Netflix Global Video Streaming Archetype",
    pipelineType: "High-Throughput Parallel Transcoding & Edge Distribution",
    nodes: [
      {
        id: "node-1",
        name: "Raw Mezzanine Master Ingestion",
        role: "Source Video Ingestion",
        protocol: "Aspera / S3 Multi-Part",
        latency: "15 ms",
        security: "Pre-Release Digital Watermarking",
        tech: "ProRes 4444 Master / HDR10+",
        status: "active",
        details: "Accepts massive multi-terabyte raw video masters with forensic audio/video watermarking before processing.",
        payloadSample: '{"asset_id": "vid_88290", "resolution": "3840x2160", "color_space": "BT.2020", "audio": "Dolby Atmos"}',
      },
      {
        id: "node-2",
        name: "Parallel Chunk Splitter",
        role: "Micro-Chunk Decomposition",
        protocol: "POSIX Shared Shards",
        latency: "3.2 ms",
        security: "Chunk Hash Validation",
        tech: "Go / FFmpeg libavformat",
        status: "active",
        details: "Splits full-length feature films into 4-second GOP-aligned video chunks for massively distributed parallel transcoding.",
        payloadSample: '{"chunks_total": 1820, "chunk_id": "chunk_0412", "duration_sec": 4.0, "keyframe": true}',
      },
      {
        id: "node-3",
        name: "Dynamic Bitrate Transcode Ladder",
        role: "Multi-Codec Compression",
        protocol: "Kubernetes GPU Workers",
        latency: "45 ms",
        security: "Encrypted Workload Pods",
        tech: "AV1 / HEVC / H.264 / NVENC",
        status: "active",
        details: "Encodes each chunk into 12 distinct resolution/bitrate tiers dynamically optimized for scene perceptual complexity.",
        payloadSample: '{"ladder": ["2160p_12Mbps_AV1", "1080p_4Mbps_HEVC", "720p_1.5Mbps_H264", "480p_500kbps_H264"]}',
      },
      {
        id: "node-4",
        name: "DRM Licensing & Key Packaging",
        role: "Content Protection",
        protocol: "SPEKE v2 / Common Encryption",
        latency: "5.4 ms",
        security: "Widevine L1 / FairPlay DRM",
        tech: "CENC (Common Encryption) + AES-128",
        status: "active",
        details: "Applies hardware-backed cryptographic DRM licenses allowing playback only inside certified secure client hardware.",
        payloadSample: '{"scheme": "cbcs", "key_id": "kid_49f8...2b", "systems": ["Widevine_L1", "Apple_FairPlay"]}',
      },
      {
        id: "node-5",
        name: "Anycast Edge CDN Delivery Mesh",
        role: "Global Geo-Caching",
        protocol: "HTTP/3 over QUIC",
        latency: "8.2 ms",
        security: "IP-Bound Signed URLs",
        tech: "Cloudflare / Fastly Anycast",
        status: "active",
        details: "Caches segmented video chunks in local Internet Exchange Points (IXPs) worldwide for sub-10ms edge response.",
        payloadSample: '{"edge_pop": "FRA-01", "cache_status": "HIT", "quic_rtt_ms": 6.8, "throughput_mbps": 128}',
      },
      {
        id: "node-6",
        name: "Heterogeneous Player Playback",
        role: "Client Execution & Metrics",
        protocol: "HLS / MPEG-DASH Manifest",
        latency: "1.2 ms",
        security: "Hardware Decryption Path",
        tech: "ExoPlayer / AVPlayer / Shaka",
        status: "active",
        details: "Client player automatically switches bitrates based on real-time bandwidth telemetry with zero buffer stalls.",
        payloadSample: '{"current_profile": "2160p_AV1", "buffer_health_sec": 38.2, "frame_drops": 0}',
      },
    ],
  },
  "uber-geospatial": {
    blueprintId: "uber-geospatial",
    title: "Hexagonal Spatial Indexing & Real-Time Driver Matching Engine",
    archetype: "Uber / DoorDash Geospatial Dispatch Archetype",
    pipelineType: "High-Frequency Geospatial Telemetry & Matchmaking",
    nodes: [
      {
        id: "node-1",
        name: "Mobile Courier Telemetry Ingestion",
        role: "GPS Location Stream",
        protocol: "Persistent WebSockets (WSS)",
        latency: "12 ms",
        security: "Passenger Location Privacy Masking",
        tech: "Node.js / Go Socket Gateway",
        status: "active",
        details: "Ingests location pings every 3 seconds from 300k+ active drivers with jitter filtering and battery-saving coalescing.",
        payloadSample: '{"courier_id": "drv_884", "lat": 37.7749, "lng": -122.4194, "bearing": 184.2, "speed_mps": 9.4}',
      },
      {
        id: "node-2",
        name: "H3 Hexagonal Spatial Indexer",
        role: "Discrete Global Grid Mapping",
        protocol: "In-Memory C Extension",
        latency: "1.4 ms",
        security: "Spatial Boundary Obfuscation",
        tech: "Uber H3 Spatial Grid (Res 9)",
        status: "active",
        details: "Converts latitude/longitude coordinates into discrete hexagonal cells (H3 index) for sub-millisecond k-ring lookups.",
        payloadSample: '{"h3_index": "8928308280fffff", "resolution": 9, "neighbor_cells": 6, "cell_diameter_m": 174}',
      },
      {
        id: "node-3",
        name: "Dynamic Surge & Demand Density",
        role: "Pricing State Machine",
        protocol: "gRPC Streaming",
        latency: "4.8 ms",
        security: "Anti-Spoofing Fraud Verification",
        tech: "Go / Redis TimeSeries",
        status: "active",
        details: "Calculates local supply-to-demand ratios per hexagonal cell to determine surge pricing multipliers.",
        payloadSample: '{"h3_cell": "8928308280fffff", "active_demand": 142, "available_drivers": 38, "multiplier": 1.6}',
      },
      {
        id: "node-4",
        name: "Bipartite Matchmaking Optimizer",
        role: "Optimal Courier Assignment",
        protocol: "Memory Graph IPC",
        latency: "6.2 ms",
        security: "Zero Driver Starvation Logic",
        tech: "Hungarian / Min-Cost Max-Flow",
        status: "active",
        details: "Solves global combinatorial optimization problem every 2 seconds to minimize aggregate pickup ETA across all riders.",
        payloadSample: '{"batch_size": 84, "matches_computed": 82, "avg_pickup_eta_sec": 240, "solver_time_ms": 5.4}',
      },
      {
        id: "node-5",
        name: "Durable Route Audit Event Log",
        role: "Telemetry Persistence",
        protocol: "Kafka / Schema Registry",
        latency: "3.1 ms",
        security: "End-to-End Cryptographic Audit",
        tech: "Apache Kafka + PostGIS",
        status: "active",
        details: "Persists immutable trip trajectory breadcrumbs and financial charge records into auditable spatial databases.",
        payloadSample: '{"event": "trip.matched", "trip_id": "trip_9921", "route_polyline_len": 4820, "fare_est": 18.50}',
      },
      {
        id: "node-6",
        name: "Push Dispatch & Turn-by-Turn Feed",
        role: "Client Notification Delivery",
        protocol: "HTTP/2 APNs / FCM",
        latency: "14 ms",
        security: "Cryptographic Push Payload Auth",
        tech: "Apple APNs / Google FCM",
        status: "active",
        details: "Sends immediate dispatch offer notification to winning courier device with strict 15-second response countdown.",
        payloadSample: '{"push_sent": true, "driver_id": "drv_884", "countdown_sec": 15, "eta_mins": 4}',
      },
    ],
  },
  "healthtech-security": {
    blueprintId: "healthtech-security",
    title: "HIPAA & SOC 2 Zero-Trust Penetration Audit & API Hardening",
    archetype: "Cloud HealthTech & EHR Security Archetype",
    pipelineType: "Zero-Trust Cryptographic Infrastructure & Compliance Mesh",
    nodes: [
      {
        id: "node-1",
        name: "mTLS Ingress Gateway & WAF",
        role: "Zero-Trust Perimeter",
        protocol: "TLS 1.3 Strict Mutual Auth",
        latency: "3.8 ms",
        security: "Automated Certificate Pinning",
        tech: "Envoy Proxy + Cloudflare WAF",
        status: "active",
        details: "Requires verified client certificates for all hospital telemetry nodes. Rejects cipher suites lacking forward secrecy.",
        payloadSample: '{"tls_version": "TLSv1.3", "cipher": "TLS_AES_256_GCM_SHA384", "client_cert_verified": true}',
      },
      {
        id: "node-2",
        name: "BOLA & IDOR Authorization Guard",
        role: "Object-Level Access Control",
        protocol: "Go Middleware Interceptor",
        latency: "1.2 ms",
        security: "Tenant & Patient Scoped RBAC",
        tech: "Open Policy Agent (OPA) / Rego",
        status: "active",
        details: "Intercepts every API call to verify the requesting provider possesses cryptographic access rights to the specific patient ID.",
        payloadSample: '{"decision": "ALLOW", "provider_id": "dr_448", "patient_id": "pat_9912", "dept_match": true}',
      },
      {
        id: "node-3",
        name: "Internal gRPC Service Mesh",
        role: "Secure Inter-Service Transport",
        protocol: "gRPC over HTTP/2 with SPIFFE",
        latency: "2.4 ms",
        security: "SPIFFE/SPIRE Workload Identities",
        tech: "Istio / Linkerd Service Mesh",
        status: "active",
        details: "All internal microservice calls are encrypted and authenticated via ephemeral X.509 SVID tokens. Zero plaintext traffic.",
        payloadSample: '{"service_caller": "spiffe://prod/billing", "service_callee": "spiffe://prod/ehr", "mtls": true}',
      },
      {
        id: "node-4",
        name: "KMS Envelope Encryption Engine",
        role: "Field-Level PHI Cryptography",
        protocol: "KMS API / AES-256-GCM",
        latency: "4.1 ms",
        security: "Customer-Managed Key (CMK)",
        tech: "AWS KMS / HashiCorp Vault",
        status: "active",
        details: "Encrypts sensitive patient fields (SSN, medical diagnoses, biometric scans) with distinct ephemeral data keys.",
        payloadSample: '{"ciphertext": "AQIDAHhG...9K", "key_id": "arn:aws:kms:us-east-1:cmk_ehr_01", "algorithm": "AES_GCM_256"}',
      },
      {
        id: "node-5",
        name: "Immutable Append-Only Audit Trail",
        role: "HIPAA Non-Repudiation Logging",
        protocol: "Cryptographic Merkle Tree",
        latency: "3.5 ms",
        security: "WORM (Write Once Read Many)",
        tech: "AWS QLDB / Immutable S3 Object Lock",
        status: "active",
        details: "Every access to medical records is signed and recorded into a cryptographically verifiable Merkle audit ledger.",
        payloadSample: '{"audit_hash": "sha256_8a9f...3c", "prev_hash": "sha256_11b2...0e", "immutable_lock_years": 7}',
      },
      {
        id: "node-6",
        name: "SOC 2 Type II Compliance Gating",
        role: "Continuous Security Assurance",
        protocol: "Automated SAST/DAST CI/CD",
        latency: "0.5 ms",
        security: "Automated CIS Benchmark Audit",
        tech: "Semgrep / Trivy / SonarQube",
        status: "active",
        details: "Continuous scanner blocks breaking changes, secrets in git, or over-privileged IAM roles before production release.",
        payloadSample: '{"findings_high": 0, "findings_critical": 0, "soc2_controls_verified": 68, "status": "COMPLIANT"}',
      },
    ],
  },
};

export default function ArchitectureDiagram({
  blueprintId,
}: {
  blueprintId: string;
}) {
  const data = DIAGRAM_BLUEPRINTS[blueprintId] || DIAGRAM_BLUEPRINTS["autonomous-autopilot"];
  const [selectedNodeId, setSelectedNodeId] = useState<string>(data.nodes[0]?.id || "node-1");
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  // Update selected node when blueprint changes
  useEffect(() => {
    setSelectedNodeId(data.nodes[0]?.id || "node-1");
    setActiveStep(0);
    setIsSimulating(false);
  }, [blueprintId]);

  // Run simulated step traversal in JavaScript
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulating) {
      timer = setTimeout(() => {
        if (activeStep < data.nodes.length - 1) {
          const nextStep = activeStep + 1;
          setActiveStep(nextStep);
          setSelectedNodeId(data.nodes[nextStep].id);
        } else {
          setIsSimulating(false);
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isSimulating, activeStep, data.nodes]);

  const handleStartSimulation = () => {
    setActiveStep(0);
    setSelectedNodeId(data.nodes[0].id);
    setIsSimulating(true);
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setActiveStep(0);
    setSelectedNodeId(data.nodes[0].id);
  };

  const selectedNode =
    data.nodes.find((n) => n.id === selectedNodeId) || data.nodes[0];

  return (
    <div className="rounded-3xl border border-white/10 bg-[#07080f] p-4 sm:p-7 shadow-2xl">
      {/* Diagram Header / Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold">
              JavaScript Dynamic Architecture Topology
            </span>
          </div>
          <h4 className="text-lg sm:text-xl font-extrabold text-white mt-1">
            {data.title}
          </h4>
          <span className="text-xs text-slate-400 font-mono">
            Archetype: <strong className="text-slate-200">{data.archetype}</strong> • {data.pipelineType}
          </span>
        </div>

        {/* Simulation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleStartSimulation}
            disabled={isSimulating}
            className="flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-3.5 py-2 text-xs font-mono font-bold text-cyan-300 hover:bg-cyan-500/20 disabled:opacity-50 transition-all shadow-sm"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>{isSimulating ? `Packet at Node ${activeStep + 1}...` : "Simulate Flow"}</span>
          </button>
          <button
            onClick={handleResetSimulation}
            className="flex items-center gap-1 rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Interactive JavaScript Node Grid View */}
      <div className="mt-6">
        <div className="text-[11px] font-mono text-slate-500 mb-3 flex items-center justify-between">
          <span>CLICK ANY NODE TO INSPECT TELEMETRY &amp; SECURITY PROTOCOLS:</span>
          <span className="text-cyan-400">{data.nodes.length} Microservices / Pipeline Stages</span>
        </div>

        {/* Dynamic Nodes Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.nodes.map((node, index) => {
            const isSelected = selectedNode.id === node.id;
            const isCurrentSimulationStep = isSimulating && activeStep === index;
            const isPastSimulationStep = isSimulating && activeStep > index;

            return (
              <div
                key={node.id}
                onClick={() => {
                  setSelectedNodeId(node.id);
                  setActiveStep(index);
                }}
                className={`relative cursor-pointer rounded-2xl border p-4 transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#11152a] border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.25)] scale-[1.02] z-10"
                    : isCurrentSimulationStep
                    ? "bg-[#161a33] border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                    : isPastSimulationStep
                    ? "bg-[#0c0e18] border-emerald-500/40 text-slate-300"
                    : "bg-[#0b0c15] border-white/5 hover:border-white/20 hover:bg-[#0f111e]"
                }`}
              >
                {/* Step pill & latency */}
                <div className="flex items-center justify-between font-mono text-[11px] mb-2">
                  <span
                    className={`px-2 py-0.5 rounded font-bold ${
                      isSelected
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                        : "bg-white/5 text-slate-400"
                    }`}
                  >
                    STAGE 0{index + 1}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Activity className="h-3 w-3 text-cyan-400" />
                    {node.latency}
                  </span>
                </div>

                {/* Node Name & Role */}
                <div>
                  <h5 className="text-sm font-bold text-white leading-snug">
                    {node.name}
                  </h5>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    {node.role}
                  </span>
                </div>

                {/* Node Protocol & Security Badge */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-cyan-400 truncate max-w-[130px]">
                    {node.protocol.split("/")[0]}
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    <span>Protected</span>
                  </span>
                </div>

                {/* Pulse indicator when active */}
                {isCurrentSimulationStep && (
                  <div className="absolute -top-1.5 -right-1.5 h-3 w-3 rounded-full bg-cyan-400 animate-ping" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Node Deep Inspector Bar */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-[#0d0f1c] p-5 font-mono">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold mb-1">
              <Zap className="h-3.5 w-3.5" />
              <span>SELECTED NODE INSPECTION: {selectedNode.name}</span>
            </div>
            <p className="text-xs text-slate-300 font-sans">
              {selectedNode.details}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="rounded bg-white/5 px-2.5 py-1 text-slate-300 border border-white/10">
              Protocol: <strong className="text-cyan-300">{selectedNode.protocol}</strong>
            </span>
            <span className="rounded bg-white/5 px-2.5 py-1 text-slate-300 border border-white/10">
              Latency SLA: <strong className="text-emerald-300">{selectedNode.latency}</strong>
            </span>
            <span className="rounded bg-white/5 px-2.5 py-1 text-slate-300 border border-white/10">
              Engine: <strong className="text-purple-300">{selectedNode.tech}</strong>
            </span>
          </div>
        </div>

        {/* Live Payload Preview */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Code2 className="h-3.5 w-3.5 text-cyan-400" />
              <span>Simulated In-Transit Packet Payload:</span>
            </span>
            <span className="text-emerald-400">Security: {selectedNode.security}</span>
          </div>
          <pre className="p-3 rounded-xl bg-[#06070a] text-xs text-cyan-300 overflow-x-auto border border-white/5">
            {selectedNode.payloadSample}
          </pre>
        </div>
      </div>
    </div>
  );
}
