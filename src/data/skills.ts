export type FlagshipProjectName = 'ClarifAI' | 'Devotion' | 'Oasi' | 'Floowsynk'

export interface Skill {
  name: string
  projects: FlagshipProjectName[]
  kbLink?: string
  kbLabel?: string
}

export interface SkillPillar {
  id: string
  title: string
  subtitle: string
  description: string
  icon: string
  accentClass: string
  skills: Skill[]
}

export const skillPillars: SkillPillar[] = [
  {
    id: 'ai-agents',
    title: 'AI, LLMs & Agentic Systems',
    subtitle: 'Production Inference & RAG',
    description:
      'Zero-hallucination citation engines, local GPU inference, multi-agent orchestration, and real-time speech pipelines.',
    icon: 'pi pi-sparkles',
    accentClass: 'from-indigo-500/20 to-purple-500/20 text-indigo-300',
    skills: [
      { name: 'Google ADK', projects: ['Devotion'] },
      { name: 'Ollama (Local LLM)', projects: ['ClarifAI', 'Devotion'] },
      { name: 'Gemini Flash', projects: ['Devotion'] },
      { name: 'OpenAI', projects: ['ClarifAI'] },
      { name: 'LangChain', projects: ['Devotion'] },
      { name: 'LlamaIndex', projects: ['Devotion'] },
      { name: 'Speech / Vision AI', projects: ['ClarifAI'] },
    ],
  },
  {
    id: 'backend-distributed',
    title: 'Languages & Distributed Backend',
    subtitle: 'High-Concurrency Core',
    description:
      'Fault-tolerant microservices, event-driven message pipelines, strongly-typed APIs, and low-latency data layers.',
    icon: 'pi pi-server',
    accentClass: 'from-cyan-500/20 to-indigo-500/20 text-cyan-300',
    skills: [
      {
        name: 'GoLang',
        projects: ['ClarifAI', 'Devotion', 'Floowsynk'],
        kbLink: '#knowledge-base/learning-materials/go/concurrency-and-best-practices.md',
        kbLabel: 'Go Concurrency Guide',
      },
      {
        name: 'C# / .NET',
        projects: ['Floowsynk'],
        kbLink: '#knowledge-base/learning-materials/c-sharp/design-patterns.md',
        kbLabel: 'C# Design Patterns',
      },
      { name: 'TypeScript', projects: ['ClarifAI', 'Devotion', 'Floowsynk'] },
      { name: 'Python', projects: ['ClarifAI', 'Devotion'] },
      {
        name: 'Kafka',
        projects: ['Floowsynk'],
        kbLink: '#knowledge-base/learning-materials/devops/kafka-pattern-event-sourcing.md',
        kbLabel: 'Kafka Event Sourcing',
      },
      { name: 'gRPC / Protobuf', projects: ['Floowsynk'] },
      { name: 'PostgreSQL', projects: ['ClarifAI', 'Devotion', 'Floowsynk'] },
      { name: 'Redis', projects: ['Devotion', 'Floowsynk'] },
    ],
  },
  {
    id: 'cloud-integration',
    title: 'Cloud, DevOps & Integration',
    subtitle: 'Resilient Infrastructure',
    description:
      'Containerized cloud deployments, automated CI/CD pipelines, edge reverse proxies, and enterprise middleware.',
    icon: 'pi pi-cloud',
    accentClass: 'from-purple-500/20 to-cyan-500/20 text-purple-300',
    skills: [
      {
        name: 'Docker',
        projects: ['ClarifAI', 'Devotion', 'Floowsynk'],
      },
      { name: 'Azure Container Apps', projects: ['Floowsynk'] },
      { name: 'CI/CD Pipelines', projects: ['ClarifAI', 'Devotion', 'Oasi', 'Floowsynk'] },
      {
        name: 'NGINX',
        projects: ['ClarifAI', 'Devotion', 'Floowsynk'],
        kbLink: '#knowledge-base/learning-materials/devops/nginx-reverse-proxy.md',
        kbLabel: 'NGINX Reverse Proxy',
      },
      {
        name: 'RabbitMQ',
        projects: ['Floowsynk'],
        kbLink: '#knowledge-base/learning-materials/devops/rabbitmq-concepts.md',
        kbLabel: 'RabbitMQ Architecture',
      },
      { name: 'Boomi iPaaS', projects: ['Floowsynk'] },
      {
        name: 'Microservices',
        projects: ['ClarifAI', 'Devotion', 'Floowsynk'],
        kbLink: '#knowledge-base/learning-materials/system-design/microservices.md',
        kbLabel: 'Microservices Guide',
      },
    ],
  },
  {
    id: 'frontend-ux',
    title: 'Frontend & Interactive UX',
    subtitle: 'Human-Centric Interfaces',
    description:
      'Accessible reactive web apps, node-graph canvases, WebGL/3D experiences, and native iOS hybrid delivery.',
    icon: 'pi pi-desktop',
    accentClass: 'from-indigo-500/20 to-cyan-500/20 text-indigo-300',
    skills: [
      {
        name: 'Vue 3',
        projects: ['ClarifAI', 'Devotion', 'Oasi', 'Floowsynk'],
        kbLink: '#knowledge-base/vue/best-practice-scalable-folder-structure.md',
        kbLabel: 'Scalable Vue 3 Guide',
      },
      {
        name: 'React',
        projects: ['Floowsynk'],
        kbLink: '#knowledge-base/react/best-practice-scalable-folder-structure.md',
        kbLabel: 'Scalable React Guide',
      },
      { name: 'Three.js / WebGL', projects: ['Floowsynk'] },
      { name: 'Tailwind / Modern CSS', projects: ['ClarifAI', 'Devotion', 'Oasi', 'Floowsynk'] },
      { name: 'Capacitor iOS / Swift', projects: ['ClarifAI'] },
    ],
  },
]
