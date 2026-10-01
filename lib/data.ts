export interface ServiceItem {
  id: string;
  name: string;
  shortTag: string;
  badge: string;
  headline: string;
  description: string;
  iconName: string;
  accentColor: "cyan" | "emerald" | "purple" | "amber";
  capabilities: {
    title: string;
    description: string;
    metrics: string;
  }[];
  techStack: string[];
  deliverables: string[];
  sla: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "data-annotation",
    name: "Data Annotation & AI Datasets",
    shortTag: "AI & ML Training Data",
    badge: "99.8% Ground-Truth Precision",
    headline: "High-density multi-modal labeling pipelines built for production AI models.",
    description:
      "From fine-grained computer vision masks to complex domain-expert RLHF (Reinforcement Learning from Human Feedback), Kinetiq Spec curates, annotates, and validates datasets that eliminate model drift and hallucinations.",
    iconName: "Binary",
    accentColor: "cyan",
    capabilities: [
      {
        title: "Computer Vision & 3D Spatial",
        description: "Polygonal segmentation, 3D LiDAR bounding cuboids, keypoints, and video tracking for autonomy and robotics.",
        metrics: "Sub-pixel accuracy",
      },
      {
        title: "RLHF, SFT & Red-Teaming",
        description: "Expert human prompt-response pair generation, ranking rubrics, adversarial safety probes, and multi-turn dialog review.",
        metrics: "Domain-vetted specialists",
      },
      {
        title: "Audio & Multi-Modal Alignment",
        description: "Time-coded acoustic transcription, phoneme marking, multilingual translation, and audio-visual synchronization.",
        metrics: "Millisecond time-alignment",
      },
      {
        title: "Automated QA & Consensus Voting",
        description: "Multi-annotator overlap consensus, automated algorithmic heuristic checks, and synthetic validation pipelines.",
        metrics: "99.8%+ consensus threshold",
      },
    ],
    techStack: ["CVAT", "Label Studio", "PyTorch", "Hugging Face", "FiftyOne", "Custom Python Engines"],
    deliverables: ["Annotated JSON/COCO/YOLO/Parquet formats", "Consensus & Inter-Annotator Agreement Reports", "Distribution Bias Audits"],
    sla: "Daily batch deliveries with continuous regression spot-checks",
  },
  {
    id: "app-testing",
    name: "App Testing & QA Assurance",
    shortTag: "E2E, Performance & Manual QA",
    badge: "Zero Critical Defect Escapes",
    headline: "Flawless software execution across real devices, edge networks, and heavy concurrency.",
    description:
      "We replace flaky tests and manual guesswork with industrial-grade automated suites, real-device cloud matrices, and exhaustive exploratory stress testing. We catch crashes, race conditions, and UX bottlenecks before your users do.",
    iconName: "CheckCircle2",
    accentColor: "emerald",
    capabilities: [
      {
        title: "Automated E2E Regression",
        description: "Robust Playwright, Cypress, and Appium suites integrated directly into your CI/CD pipelines with parallel worker distribution.",
        metrics: "94% test automation coverage",
      },
      {
        title: "Real Device & Cross-Browser Matrix",
        description: "Manual and automated validation across 80+ physical iOS, Android, and desktop configurations with native hardware verification.",
        metrics: "Zero platform variance",
      },
      {
        title: "Load, Stress & Chaos Engineering",
        description: "High-concurrency k6/JMeter stress testing to uncover memory leaks, database lockups, and microservice cascading failures.",
        metrics: "Simulate up to 250k RPS",
      },
      {
        title: "Exploratory & Edge-Case Discovery",
        description: "Senior QA engineers actively seeking out intermittent concurrency bugs, network dropouts, state desynchronization, and edge UX hurdles.",
        metrics: "Detailed video reproduction logs",
      },
    ],
    techStack: ["Playwright", "Cypress", "Appium", "k6", "JMeter", "GitHub Actions", "Docker", "Sentry"],
    deliverables: ["Executable E2E Test Suite Repository", "Automated Daily CI/CD Test Reports", "Defect Reproduction Matrix with Har Logs"],
    sla: "24h SLA for blocker defect isolation and repro recipes",
  },
  {
    id: "programming",
    name: "Custom Software Engineering",
    shortTag: "Full-Stack & Cloud Architecture",
    badge: "Mission-Critical Code Quality",
    headline: "Senior engineers architecting high-scale web platforms, APIs, and low-latency backends.",
    description:
      "When standard off-the-shelf software falls short, Kinetiq Spec engineers custom web apps, distributed microservices, ETL pipelines, and specialized internal tools with strict TypeScript, clean architecture, and rapid deployment cycles.",
    iconName: "Code2",
    accentColor: "purple",
    capabilities: [
      {
        title: "Full-Stack Web & Mobile Apps",
        description: "Production-ready architectures built with Next.js, React, Node.js, Go, or Python. Type-safe, accessible, and blindingly fast.",
        metrics: "Sub-50ms TTFB & Lighthouse 98+",
      },
      {
        title: "High-Throughput APIs & Microservices",
        description: "REST, GraphQL, and gRPC backends optimized for high concurrency, event streams (Kafka/RabbitMQ), and low-latency caching (Redis).",
        metrics: "Horizontally scalable",
      },
      {
        title: "Internal Tooling & Operations Dashboards",
        description: "Bespoke operational consoles, workflow automations, and custom ETL pipelines that save teams hundreds of manual engineering hours.",
        metrics: "Turnkey delivery",
      },
      {
        title: "Cloud Infrastructure & CI/CD Pipelines",
        description: "Infrastructure-as-Code via Terraform, container orchestration with Kubernetes, and airtight deployment pipelines on AWS/GCP.",
        metrics: "Zero-downtime rolling deploys",
      },
    ],
    techStack: ["Next.js", "TypeScript", "Node.js", "Go", "Python/FastAPI", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS"],
    deliverables: ["Clean, Documented Source Code Repository", "Terraform / Docker Deployment Manifests", "API Documentation & Postman Suites"],
    sla: "Agile 2-week sprints with transparent daily commits & weekly demos",
  },
  {
    id: "security-audits",
    name: "Security Audits & Penetration Testing",
    shortTag: "Offensive Security & Hardening",
    badge: "Certified Ethical Hackers & Red Team",
    headline: "Uncovering critical vulnerabilities before malicious actors exploit them.",
    description:
      "From black-box web app penetration testing and API exploit analysis to zero-trust cloud configuration audits and static code security reviews, we deliver comprehensive, executive-ready security assessments with verified remediation code.",
    iconName: "ShieldAlert",
    accentColor: "amber",
    capabilities: [
      {
        title: "Web & API Penetration Testing",
        description: "Exhaustive offensive testing covering OWASP Top 10, business logic bypasses, broken object-level authorization (BOLA), and SSRF.",
        metrics: "Manual + Automated depth",
      },
      {
        title: "Static & Dynamic Code Analysis (SAST/DAST)",
        description: "Line-by-line source code review uncovering SQL injection, cryptographic misconfigurations, race conditions, and secret leaks.",
        metrics: "Zero false-positive reporting",
      },
      {
        title: "Cloud & Infrastructure Hardening",
        description: "Deep posture reviews of AWS, GCP, and Kubernetes setups to eliminate over-privileged IAM roles, public S3 buckets, and exposed ports.",
        metrics: "CIS Benchmark compliance",
      },
      {
        title: "Compliance Readiness (SOC 2, ISO, HIPAA)",
        description: "Pre-audit gap evaluations and technical remediation steps to prepare your engineering team for formal SOC 2 Type II or ISO 27001.",
        metrics: "Audit-ready artifact packages",
      },
    ],
    techStack: ["Burp Suite Pro", "OWASP ZAP", "Semgrep", "Trivy", "SonarQube", "Kali Linux", "Wireshark", "Metasploit"],
    deliverables: ["Executive Risk Summary & Board-Ready Deck", "Technical Findings with Proof-of-Concept Exploit Steps", "Remediation Patch Pull Requests"],
    sla: "Immediate emergency notification for Critical (CVSS > 9.0) findings",
  },
];

export const STATS = [
  { label: "Ground-Truth Precision SLA", value: "99.8%", subtext: "Multi-annotator statistical consensus" },
  { label: "Test Automation Target", value: "95%+", subtext: "Full E2E regression coverage" },
  { label: "Security Verification Depth", value: "100%", subtext: "OWASP Top 10 + API threat vectors" },
  { label: "Rapid Pod Deployment SLA", value: "< 48h", subtext: "Direct senior specialist kickoff" },
];

export const TECHNICAL_SPECS = [
  {
    archetype: "Waymo / Tesla Autopilot Archetype",
    domain: "Autonomous Vehicles & Robotics",
    title: "Multi-Camera Vision & 3D LiDAR Perception Pipeline",
    service: "Data Annotation & AI Pipeline",
    challenge: "Processing 8 synchronized 4K HDR camera streams at 60 FPS alongside 3D LiDAR point clouds requiring sub-centimeter polygon segmentation, occlusion tracking, and temporal 3D bounding cuboids with zero latency budget drift.",
    solution: "Custom semi-automated pre-labeling heuristic filter coupled with multi-annotator consensus voting and programmatic IoU threshold verification pipelines.",
    dataAnnotationSpec: "3D LiDAR bounding cuboids, 2D polyline drivable-space segmentation, temporal object persistence IDs across 600-frame video sequences, and sub-pixel edge alignment.",
    qaTestingSuite: "Hardware-in-the-loop (HIL) automated test harness, sensor glare fuzzing, simulated adverse weather matrices (rain, dense fog, nighttime glare), and automated collision assertion suites.",
    securityThreatModel: "CAN bus packet injection defense, physical adversarial road decal perturbation detection, encrypted sensor telemetry transit (TLS 1.3 + mutual authentication), and tamper-evident firmware signing.",
    benchmarks: [
      "Target: 99.8%+ verified ground-truth IoU precision",
      "Throughput capability: 250k annotated frames/week per pod",
      "Formats: COCO, YOLOv9, ROS Bag, and Apache Parquet export",
      "Latency: Sub-12ms inference kernel execution SLA",
    ],
    techStack: ["PyTorch", "CVAT", "C++ / CUDA", "FiftyOne", "ROS2", "TensorRT", "Docker"],
    accent: "cyan",
  },
  {
    archetype: "OpenAI ChatGPT / Claude Archetype",
    domain: "Foundation AI & Generative LLMs",
    title: "RLHF, SFT & Adversarial Red-Teaming Alignment Pipeline",
    service: "Data Annotation & AI Pipeline",
    challenge: "Eliminating model hallucinations, training reward models against subtle sycophancy, and hardening multi-turn conversational agents against complex jailbreaks and prompt injections across 40+ languages.",
    solution: "Specialized domain-expert annotator pods delivering human-in-the-loop instruction tuning (SFT), pairwise preference ranking (DPO/PPO), and automated adversarial red-team probing.",
    dataAnnotationSpec: "Multi-turn dialog ranking, factual verification attribution tagging, reasoning step-by-step trace annotations, safety violation classification, and hallucination severity scoring.",
    qaTestingSuite: "Continuous regression benchmarks across MMLU, GSM8K, HumanEval, and HELM suites, streaming token latency profiling, and automated temperature sensitivity evaluation.",
    securityThreatModel: "Adversarial prompt injection mitigation, indirect SSRF execution prevention in tool-use agents, system prompt extraction defense, and training data PII/secret scrubbing.",
    benchmarks: [
      "Target: 99.9% human-expert agreement on safety rubrics",
      "Safety Pass Rate: 99.7% against OWASP Top 10 for LLMs",
      "SFT Delivery: 50,000 multi-turn verified pairs / month",
      "Streaming Response: < 35ms Time-To-First-Token (TTFT)",
    ],
    techStack: ["Hugging Face", "vLLM", "DeepSpeed", "PyTorch", "Label Studio", "Triton", "FastAPI"],
    accent: "purple",
  },
  {
    archetype: "Stripe Payment Infrastructure Archetype",
    domain: "FinTech & High-Assurance Banking",
    title: "Double-Entry Financial Ledger & Webhook Distribution Engine",
    service: "Custom Software Engineering",
    challenge: "Handling tens of thousands of concurrent transaction authorizations with strict serializability, zero floating-point arithmetic errors, and sub-100ms global webhook dispatches with guaranteed at-least-once delivery.",
    solution: "Immutable append-only double-entry ledger engine built with Go and PostgreSQL serializable isolation, distributed Redis event locks, and automated idempotency key resolution.",
    dataAnnotationSpec: "OCR receipt & banking statement entity extraction, synthetic transaction data generation for fraud detection model training, and automated KYC document anomaly labeling.",
    qaTestingSuite: "10,000 parallel worker race-condition chaos tests, network partition simulation with Chaos Mesh, banking API mock sandboxes, and automated currency conversion fuzzing.",
    securityThreatModel: "PCI-DSS Level 1 compliance isolation, hardware security module (HSM) key management, HMAC-SHA256 webhook cryptographic signing, and timing-attack-safe token comparisons.",
    benchmarks: [
      "Zero floating-point balance discrepancies across 10M+ mock transactions",
      "Idempotency: 100% duplicate charge deduplication guarantee",
      "Concurrency: 45,000 writes/sec with sub-25ms database commit latency",
      "Webhook Delivery: 99.999% SLA with exponential backoff retry mesh",
    ],
    techStack: ["Go 1.23", "PostgreSQL", "Redis", "Apache Kafka", "Docker", "Kubernetes", "Terraform"],
    accent: "emerald",
  },
  {
    archetype: "Netflix Global Video Streaming Archetype",
    domain: "Media Streaming & Edge Distribution",
    title: "Adaptive Video Transcoding & Low-Latency Edge Delivery Mesh",
    service: "App Testing & QA Assurance",
    challenge: "Delivering 4K Dolby Vision video streams to hundreds of millions of heterogeneous client devices under erratic network conditions with zero buffering stutter and strict DRM enforcement.",
    solution: "Distributed chunk-based video transcoding pipeline utilizing dynamic bitrate ladder encoding, HLS/DASH manifest optimization, and geo-distributed Anycast edge caching.",
    dataAnnotationSpec: "Automated video scene boundary classification, content moderation tagging, multi-lingual subtitle time-alignment, and audio loudness normalization verification.",
    qaTestingSuite: "Automated cross-device playback matrix across 80+ Smart TVs, iOS, Android, and Web browsers, network throttling tests (3G to 10Gbps fiber), and FairPlay/Widevine DRM playback verification.",
    securityThreatModel: "Signed streaming URLs with IP-binding, DRM token replay attack prevention, geo-fencing compliance enforcement, and edge DDoS layer-7 rate limiting.",
    benchmarks: [
      "Buffer Ratio: < 0.12% across 3G / 4G / 5G simulated edge profiles",
      "Cross-Platform QA: 100% pass rate across tested physical device matrix",
      "Transcoding Speed: 4x real-time parallel chunk processing",
      "Cold Start Startup Latency: < 280ms globally",
    ],
    techStack: ["FFmpeg", "Next.js", "Go", "AWS CloudFront", "Rust", "Playwright", "Grafana"],
    accent: "cyan",
  },
  {
    archetype: "Uber / DoorDash Geospatial Dispatch Archetype",
    domain: "Geospatial Telemetry & On-Demand Dispatch",
    title: "Hexagonal Spatial Indexing & Real-Time Driver Matching Engine",
    service: "Custom Software Engineering",
    challenge: "Ingesting real-time GPS pings from hundreds of thousands of active couriers every 3 seconds, evaluating dynamic surge pricing zones, and executing bipartite matching within a strict 500ms SLA window.",
    solution: "Engineered high-throughput geospatial dispatch platform leveraging Uber's H3 discrete global grid system, Redis GeoSets, and event-driven state machines in Go and TypeScript.",
    dataAnnotationSpec: "GPS trajectory noise smoothing, street segment speed profile labeling, pickup/drop-off point-of-interest boundary polygon verification, and route turn penalty dataset curation.",
    qaTestingSuite: "GPS drift fuzz testing, mobile app battery drain & background location stress testing, high-frequency WebSocket disconnection recovery tests, and massive surge load simulations (500k RPS).",
    securityThreatModel: "Driver/Passenger real-time location obfuscation, spoofed GPS coordinate detection, API endpoint rate limiting, and trip tampering fraud protection.",
    benchmarks: [
      "Spatial Indexing: Sub-5ms spatial query latency using H3 resolution 9 cells",
      "Matching SLA: 99.4% of driver matches calculated in < 350ms",
      "Socket Concurrency: 300,000 persistent WebSockets per cluster node",
      "Zero Telemetry Loss: Guaranteed durable event logging via Kafka",
    ],
    techStack: ["Uber H3", "Go", "TypeScript", "Redis", "Kafka", "PostGIS", "Docker", "k6"],
    accent: "purple",
  },
  {
    archetype: "Cloud HealthTech & EHR Security Archetype",
    domain: "Healthcare Telemetry & Enterprise SaaS",
    title: "HIPAA & SOC 2 Zero-Trust Penetration Audit & API Hardening",
    service: "Security Audits & Penetration Testing",
    challenge: "Securing multi-tenant electronic health record (EHR) platforms and clinical gRPC microservices against Broken Object Level Authorization (BOLA), unauthorized PHI access, and audit log tampering.",
    solution: "Aggressive white-box source audit, black-box penetration assessment, cryptographic verification of data-at-rest/in-transit, and automated CI/CD security gating.",
    dataAnnotationSpec: "Medical entity recognition (NER) dataset validation, clinical terminology standardization (ICD-10/SNOMED), and PHI de-identification dataset verification.",
    qaTestingSuite: "FHIR API compliance validation suite, concurrency stress testing on multi-gigabyte medical imaging (DICOM) transfer pipelines, and failover disaster recovery audits.",
    securityThreatModel: "Exhaustive OWASP Top 10 API testing, BOLA/IDOR vulnerability exploitation, JWT claim manipulation, automated secrets scanning, and KMS envelope encryption review.",
    benchmarks: [
      "Zero false-positive reporting with verified exploit Proof-of-Concepts (PoCs)",
      "100% remediated high/critical CVEs before external compliance audits",
      "Full HIPAA & SOC 2 Type II audit trail documentation package",
      "Immediate < 2-hour notification SLA for Critical (CVSS > 9.0) discoveries",
    ],
    techStack: ["Burp Suite Pro", "OWASP ZAP", "Semgrep", "Trivy", "Go", "Kubernetes", "AWS KMS"],
    accent: "amber",
  },
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Ingest & Spec Discovery",
    desc: "We analyze your system schemas, dataset guidelines, security threat vectors, or test matrices to produce an unambiguous technical specification.",
  },
  {
    step: "02",
    title: "Environment & Toolchain Setup",
    desc: "We configure dedicated sandbox environments, custom labeling schemas, automated CI test harnesses, or isolated pentest attack nodes.",
  },
  {
    step: "03",
    title: "Execution & Real-Time Telemetry",
    desc: "Our specialized pods execute the sprint. You receive live Slack/Discord webhook alerts, dashboard updates, and intermediate artifact drops.",
  },
  {
    step: "04",
    title: "Rigorous Verification & Hardening",
    desc: "Every annotation undergoes statistical consensus checks; every code change passes strict static analysis; every security report includes exploit PoCs.",
  },
  {
    step: "05",
    title: "Hand-off & Ongoing Assurance",
    desc: "We hand over clean data formats, turnkey test repositories, audited code PRs, and executive security sign-offs ready for production.",
  },
];

export const FAQS = [
  {
    q: "How does Kinetiq Spec guarantee data annotation accuracy?",
    a: "We utilize a multi-tier verification process: (1) Domain-specific trained annotators, (2) Algorithmic heuristic validation to catch geometric or semantic anomalies, and (3) A golden-standard consensus voting mechanism where overlapping samples are cross-evaluated by senior QA leads. We maintain a strict SLA guaranteeing 99.5%+ ground truth precision.",
  },
  {
    q: "How do you protect proprietary code and sensitive datasets (NDAs, HIPAA, PII)?",
    a: "Security is built into our agency DNA. We sign bilateral enterprise NDAs before receiving any technical artifacts. We support air-gapped VPC access, private self-hosted data labeling instances (CVAT / Label Studio inside your AWS/GCP perimeter), zero-retention policies, and all staff operate on hardened managed devices with strict DLP (Data Loss Prevention) controls.",
  },
  {
    q: "Can Kinetiq Spec integrate with our existing CI/CD pipelines for automated testing?",
    a: "Yes. Our QA engineers work directly inside your GitHub Actions, GitLab CI, CircleCI, or Jenkins. We construct containerized test suites (Playwright, Cypress, k6) that run on pull requests, post detailed defect reports and video artifacts directly to your PR comments, and block breaking merges automatically.",
  },
  {
    q: "What types of security audits do you offer?",
    a: "We perform Black-Box, Gray-Box, and White-Box Penetration Testing across Web Applications, Mobile Apps (iOS/Android), Cloud Infrastructure (AWS, Azure, GCP, Kubernetes), and APIs (REST, GraphQL, gRPC). We also deliver deep static source code audits (SAST) and compliance readiness audits for SOC 2 Type II, ISO 27001, and HIPAA.",
  },
  {
    q: "How quickly can a dedicated pod begin work?",
    a: "Depending on scope complexity, we can deploy an initial pod (1-5 senior engineers/annotators) within 48 to 72 hours following statement of work alignment. For urgent security penetration tests or release blocker QA, our rapid-response team can be operational within 24 hours.",
  },
];
