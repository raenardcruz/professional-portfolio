import clarifai from "../assets/clarifai.png"
import devotion from "../assets/devotion.png"
import floowsynk from "../assets/floowsynk.png"
import oasi from "../assets/oasi.png"

const clarifaiVideo = "https://r2.raenardcruz.com/Videos/Clarifai%20Product%20Demo.mp4"
const devotionVideo = "https://r2.raenardcruz.com/Videos/devotion-saas-demo.mp4"
const oasiVideo = "https://r2.raenardcruz.com/Videos/oasi-explainer.mp4"

export interface ProjectMetric {
    label: string;
    value: string;
}

export interface Project {
    id: number;
    slug: string;
    title: string;
    subtitle: string;
    category: string;
    description: string;
    architectureSummary: string;
    image: string;
    video?: string;
    videoLabel?: string;
    technologies: string[];
    metrics: ProjectMetric[];
    highlights: string[];
    accentHex: string;
    secondaryHex: string;
    link: string;
}

export const projects: Project[] = [
    {
        id: 1,
        slug: "clarifai",
        title: "ClarifAI",
        subtitle: "Multi-Language Audio & Meeting Intelligence",
        category: "AI & Voice SaaS",
        description: "An AI-powered audio intelligence platform that turns live recordings or uploaded media into multi-language transcripts (English, Japanese, Tagalog) with speaker diarization and instant executive summaries.",
        architectureSummary: "Decoupled 3-tier architecture powered by Vue 3, a Go (Gin) asynchronous goroutine pipeline, Capacitor iOS native Swift background audio engine, Speechmatics diarization, and local Ollama LLM inference.",
        image: clarifai,
        video: clarifaiVideo,
        videoLabel: "Product Walkthrough (0:41)",
        technologies: ["Vue 3", "Go (Gin)", "PostgreSQL", "Ollama AI", "Speechmatics API", "Capacitor iOS", "Swift", "FFmpeg", "Cloudflare Tunnel"],
        metrics: [
            { label: "Languages in 1 Take", value: "EN / JP / TL" },
            { label: "Processing Engine", value: "Go Goroutines" },
            { label: "AI Summarization", value: "< 3s Local LLM" }
        ],
        highlights: [
            "Live browser & native iOS background audio recording with offline-first chunk streaming",
            "Automatic multi-language detection & speaker diarization within a single conversation",
            "One-click AI Executive Summaries, key takeaways, and structured action items"
        ],
        accentHex: "#a855f7",
        secondaryHex: "#3b82f6",
        link: "https://clarifai.raenardcruz.com"
    },
    {
        id: 2,
        slug: "devotion",
        title: "Devotion",
        subtitle: "The Liturgical Intelligence Platform",
        category: "AI Spiritual Companion",
        description: "A digital sanctuary for the Catholic faith featuring daily Mass readings, 1962 Latin Missa PDF generation, Magisterium AI with zero-hallucination Vatican citations, and guided interactive devotionals.",
        architectureSummary: "Built with Go and Vue.js utilizing Google ADK Agents and hot-swappable Multi-Model AI orchestration (100% local Ollama Gemma 4 GPUs or cloud Gemini Flash) with Redis semantic caching.",
        image: devotion,
        video: devotionVideo,
        videoLabel: "SaaS Platform Demo (0:59)",
        technologies: ["Vue.js", "Go", "Google ADK Agents", "Ollama (Gemma 4)", "Gemini Flash", "PostgreSQL", "Redis", "REST API", "Cloudflare Tunnel"],
        metrics: [
            { label: "Citation Accuracy", value: "98.7% Match" },
            { label: "Inference Latency", value: "340ms Local" },
            { label: "Sacred Tradition", value: "2,000+ Yrs" }
        ],
        highlights: [
            "Magisterium AI Sanctuary strictly anchored in Church Councils, Papal Encyclicals, and CCC",
            "Hot-swappable local Ollama GPU and Google Gemini inference with encrypted relational vault",
            "Interactive tactile bead tracking for Scriptural Rosary, St. Michael, and Divine Mercy chaplets"
        ],
        accentHex: "#f59e0b",
        secondaryHex: "#ef4444",
        link: "https://devotion.raenardcruz.com/#/"
    },
    {
        id: 3,
        slug: "oasi",
        title: "Oasi Di Gioia Per Bambine",
        subtitle: "Sanctuary & Child-Protection Platform",
        category: "Social Impact & Compliance",
        description: "A secure pro-bono digital ecosystem for a DSWD-accredited girls' orphanage in Muntinlupa City, balancing compassionate storytelling and donor transparency with rigorous child-privacy compliance.",
        architectureSummary: "Edge-deployed Vue.js web platform on Cloudflare Pages engineered for sub-second global load times, strict child-protection media anonymization, and high-conversion donor journeys.",
        image: oasi,
        video: oasiVideo,
        videoLabel: "Mission & Impact Explainer (0:35)",
        technologies: ["Vue.js", "Cloudflare Pages", "Edge CDN", "Responsive UI/UX", "WCAG Accessibility"],
        metrics: [
            { label: "Direct to Care", value: "100% Non-Profit" },
            { label: "Core Focus Window", value: "Ages 3–7" },
            { label: "Care Pillars", value: "4 Holistic" }
        ],
        highlights: [
            "Showcases the 4 holistic care pillars: Residential Haven, Education, Medical/Trauma Care, and Adoption",
            "Engineered with psychological storytelling & donor transparency to maximize philanthropic conversion",
            "DSWD-accredited compliance protecting vulnerable children's identities while inspiring sponsors"
        ],
        accentHex: "#10b981",
        secondaryHex: "#06b6d4",
        link: "https://oasi.raenardcruz.com/#/"
    },
    {
        id: 4,
        slug: "floowsynk",
        title: "Floowsynk Web App",
        subtitle: "Visual Workflow Automation & Orchestration",
        category: "Distributed Systems",
        description: "A high-performance node-based workflow automation and orchestration platform built with Go and Vue.js to design, connect, and execute complex asynchronous business pipelines.",
        architectureSummary: "Event-driven microservices orchestration using Go, Kafka message streaming, gRPC inter-service communication, Redis state caching, and PostgreSQL persistence in Dockerized environments.",
        image: floowsynk,
        technologies: ["Vue.js", "Go", "Kafka", "gRPC", "PostgreSQL", "Redis", "Docker", "REST API", "Cloudflare Tunnel"],
        metrics: [
            { label: "Execution Model", value: "Event-Driven" },
            { label: "IPC Protocol", value: "gRPC + Kafka" },
            { label: "Canvas UX", value: "Node-Graph" }
        ],
        highlights: [
            "Interactive drag-and-drop visual DAG node editor for chaining REST APIs, variables, and transforms",
            "High-throughput asynchronous execution powered by Apache Kafka and Go worker pools",
            "Real-time execution state telemetry with Redis caching and resilient retry policies"
        ],
        accentHex: "#00f2fe",
        secondaryHex: "#4facfe",
        link: "https://floowsynk.raenardcruz.com"
    }
]