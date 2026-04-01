export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages and Runtime Environments",
    skills: [
      { name: "GoLang" },
      { name: "C#" },
      { name: "Python" },
      { name: "JavaScript" },
      { name: "Node JS" },
      { name: "SQL" }
    ]
  },
  {
    title: "Front-End Frameworks and Technologies",
    skills: [
      { name: "Vue.js" },
      { name: "React" },
      { name: "Typescript" },
      { name: "HTML/CSS" }
    ]
  },
  {
    title: "Cloud, DevOps, and Infrastructure",
    skills: [
      { name: "Azure" },
      { name: "Azure CI/CD" },
      { name: "Docker Container" },
      { name: "NGINX" },
      { name: "RabbitMQ" },
      { name: "Jenkins" },
      { name: "System Architecture" },
      { name: "Container Apps in Azure" },
      { name: "Azure App Service" },
      { name: "Kafka" }
    ]
  },
  {
    title: "AI and Machine Learning Tools",
    skills: [
      { name: "Langchain" },
      { name: "OpenAI" },
      { name: "Llama_index" },
      { name: "Ollama AI" },
      { name: "Custom Vision AI" },
      { name: "Gemini" },
      { name: "QWEN" },
      { name: "ADK Agent" }
    ]
  },
  {
    title: "Integration and Other Tools",
    skills: [
      { name: "Boomi" },
      { name: "GRPC" },
      { name: "Selenium" },
      { name: "NUnit" }
    ]
  }
];
