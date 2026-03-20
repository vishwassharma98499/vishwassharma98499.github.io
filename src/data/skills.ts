import type { SkillCategory } from "@/types";

export const skills: SkillCategory[] = [
  {
    id: "software-engineering",
    title: "Software Engineering",
    description:
      "Designing robust, scalable APIs, microservices, and full-stack applications. Clean architecture with observability, reliability, and graceful failure handling.",
    iconName: "code",
    tags: ["Python", "Node.js", "C++", "Java", "React", "TCL", "REST"],
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud & Infrastructure",
    description:
      "Production deployments on AWS and Kubernetes. Infrastructure-as-code, CI/CD pipelines, and containerised workloads at scale.",
    iconName: "cloud",
    tags: ["AWS", "Kubernetes", "Docker", "Terraform", "Jenkins"],
  },
  {
    id: "ai-ml",
    title: "AI / ML & LLMs",
    description:
      "Building RAG pipelines, integrating LLM services, and deploying AI copilots on specialised hardware. Production-ready ML systems.",
    iconName: "brain",
    tags: ["LangChain", "RAG", "HuggingFace", "PyTorch", "TensorFlow", "LLMs", "NLP", "CV"],
  },
  {
    id: "databases",
    title: "Databases & Data",
    description:
      "Relational and vector databases for diverse workloads. Caching layers, data pipelines, and optimised query patterns.",
    iconName: "database",
    tags: ["MySQL", "Redis", "ChromaDB"],
  },
  {
    id: "cad-engineering",
    title: "CAD & Engineering Tools",
    description:
      "Deep experience with enterprise CAD platforms and simulation tools for automotive and aerospace engineering workflows.",
    iconName: "wrench",
    tags: ["CATIA V5", "3DExperience", "Hyperworks", "NVIDIA Omniverse"],
  },
];
