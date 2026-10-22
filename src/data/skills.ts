export interface Skill {
  name: string;
  icon?: string;
  level?: number;
  years?: string;
  featured?: boolean;
  projects?: string[];
  kbLink?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  accent: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Programming Languages & Runtimes",
    shortTitle: "Core Languages",
    description: "High-concurrency backend systems, strongly-typed enterprise architectures, and data-intensive services.",
    accent: "#00f2fe",
    skills: [
      { name: "GoLang", level: 96, years: "6+ yrs", featured: true, projects: ["ClarifAI", "Devotion", "Floowsynk"], kbLink: "#knowledge-base/learning-materials/go/concurrency-and-best-practices.md" },
      { name: "C#", level: 95, years: "10+ yrs", featured: true, projects: ["Enterprise Systems"], kbLink: "#knowledge-base/learning-materials/c-sharp/design-patterns.md" },
      { name: "TypeScript", level: 94, years: "7+ yrs", featured: true, projects: ["ClarifAI", "Devotion", "Floowsynk"] },
      { name: "Python", level: 88, years: "5+ yrs", featured: true, projects: ["AI Pipelines"] },
      { name: "JavaScript", level: 96, years: "13+ yrs", projects: ["ClarifAI", "Devotion", "Oasi", "Floowsynk"] },
      { name: "Node JS", level: 90, years: "8+ yrs", projects: ["Microservices"] },
      { name: "SQL / PostgreSQL", level: 94, years: "13+ yrs", featured: true, projects: ["ClarifAI", "Devotion", "Floowsynk"] }
    ]
  },
  {
    id: "ai",
    title: "AI, LLMs & Machine Learning",
    shortTitle: "AI & Agentic Systems",
    description: "Production RAG pipelines, multi-agent orchestration, local GPU inference, and speech intelligence.",
    accent: "#a855f7",
    skills: [
      { name: "Google ADK Agents", level: 94, years: "2+ yrs", featured: true, projects: ["Devotion"] },
      { name: "Ollama AI (Local LLM)", level: 95, years: "3+ yrs", featured: true, projects: ["ClarifAI", "Devotion"] },
      { name: "Gemini", level: 94, years: "3+ yrs", featured: true, projects: ["Devotion"] },
      { name: "OpenAI", level: 92, years: "4+ yrs", featured: true, projects: ["Enterprise AI"] },
      { name: "LangChain", level: 90, years: "3+ yrs", projects: ["RAG Pipelines"] },
      { name: "LlamaIndex", level: 88, years: "3+ yrs", projects: ["Document Indexing"] },
      { name: "QWEN", level: 87, years: "2+ yrs", projects: ["Local Inference"] },
      { name: "Custom Vision & Speech AI", level: 90, years: "4+ yrs", projects: ["ClarifAI"] }
    ]
  },
  {
    id: "cloud",
    title: "Cloud, DevOps & Distributed Systems",
    shortTitle: "Cloud & Architecture",
    description: "Event-driven microservices, message brokers, reverse proxies, and resilient cloud-native deployments.",
    accent: "#f59e0b",
    skills: [
      { name: "System Architecture", level: 96, years: "10+ yrs", featured: true, projects: ["ClarifAI", "Devotion", "Floowsynk"], kbLink: "#knowledge-base/learning-materials/system-design/microservices.md" },
      { name: "Kafka", level: 92, years: "5+ yrs", featured: true, projects: ["Floowsynk"], kbLink: "#knowledge-base/learning-materials/devops/kafka-concepts.md" },
      { name: "Docker Container", level: 95, years: "7+ yrs", featured: true, projects: ["ClarifAI", "Devotion", "Floowsynk"] },
      { name: "Azure & Container Apps", level: 93, years: "8+ yrs", featured: true, projects: ["Enterprise Cloud"] },
      { name: "Azure CI/CD & App Service", level: 92, years: "8+ yrs", projects: ["Enterprise Cloud"] },
      { name: "RabbitMQ", level: 90, years: "6+ yrs", projects: ["Distributed Queues"], kbLink: "#knowledge-base/learning-materials/devops/rabbitmq-concepts.md" },
      { name: "NGINX", level: 91, years: "8+ yrs", projects: ["Edge Gateways"], kbLink: "#knowledge-base/learning-materials/devops/nginx-reverse-proxy.md" },
      { name: "Jenkins", level: 88, years: "7+ yrs", kbLink: "#knowledge-base/learning-materials/devops/jenkins-concepts.md" },
      { name: "Redis", level: 93, years: "6+ yrs", featured: true, projects: ["Devotion", "Floowsynk"] }
    ]
  },
  {
    id: "frontend",
    title: "Front-End & Interactive 3D Web",
    shortTitle: "Front-End & 3D UX",
    description: "Reactive interfaces, WebGL/Three.js 3D visualizations, and cross-platform mobile experiences.",
    accent: "#10b981",
    skills: [
      { name: "Vue.js 3", level: 97, years: "7+ yrs", featured: true, projects: ["ClarifAI", "Devotion", "Oasi", "Floowsynk"], kbLink: "#knowledge-base/vue/best-practice-scalable-folder-structure.md" },
      { name: "React", level: 91, years: "6+ yrs", featured: true, kbLink: "#knowledge-base/react/best-practice-scalable-folder-structure.md" },
      { name: "Three.js / WebGL", level: 86, years: "3+ yrs", featured: true, projects: ["Portfolio 3D"] },
      { name: "HTML5 / Modern CSS", level: 96, years: "13+ yrs", projects: ["ClarifAI", "Devotion", "Oasi", "Floowsynk"] },
      { name: "Capacitor iOS / Swift", level: 85, years: "2+ yrs", projects: ["ClarifAI"] }
    ]
  },
  {
    id: "integration",
    title: "Enterprise Integration & Quality",
    shortTitle: "Integration & QA",
    description: "High-speed RPC protocols, enterprise iPaaS middleware, and automated test engineering.",
    accent: "#ec4899",
    skills: [
      { name: "gRPC / Protobuf", level: 92, years: "5+ yrs", featured: true, projects: ["Floowsynk"] },
      { name: "Boomi iPaaS", level: 90, years: "5+ yrs", projects: ["Enterprise Integration"] },
      { name: "Selenium Automation", level: 89, years: "8+ yrs" },
      { name: "NUnit / TDD", level: 92, years: "10+ yrs" }
    ]
  }
];
