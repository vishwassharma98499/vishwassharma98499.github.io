import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "hivecore",
    title: "HiveCore",
    description:
      "Multi-tenant AI agent platform with secure auth and RAG. Users create personalised knowledge bases, chat with LLMs, and engineer autonomous agents with role-based access control.",
    emoji: "🐝",
    techStack: ["JavaScript", "RAG", "Multi-tenant", "Auth"],
    repoUrl: "https://github.com/vishwassharma98499/hivecore",
    featured: true,
  },
  {
    id: "ragstack",
    title: "RAGStack",
    description:
      "Local RAG chatbot over PDFs with multi-LLM support, authentication, and streaming UI. Full-stack with FastAPI, React, ChromaDB, and Ollama/Groq integration.",
    emoji: "📚",
    techStack: ["TypeScript", "FastAPI", "React", "ChromaDB"],
    repoUrl: "https://github.com/vishwassharma98499/ragstack",
    featured: true,
  },
  {
    id: "gollama",
    title: "GoLlama",
    description:
      "Build and run LLMs locally using Go. A lightweight approach to local inference and RAG without heavy Python dependencies.",
    emoji: "🦙",
    techStack: ["Go", "LLM", "Local Inference"],
    repoUrl: "https://github.com/vishwassharma98499/local-llm-rag-gollama",
    featured: true,
  },
];
