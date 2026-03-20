import type { TimelineEntry } from "@/types";

export const experience: TimelineEntry[] = [
  {
    company: "Accenture",
    role: "Senior Software Engineer",
    location: "Munich, Germany",
    dateRange: "Mar 2022 — Present",
    projects: [
      {
        title: "Glodd — Gen AI Copilot (Local LLM)",
        bullets: [
          "Architected end-to-end backend services for a production AI copilot with clean RESTful APIs designed for reliability and observability",
          "Integrated multiple external systems and LLM services via well-defined API boundaries, handling partial data, retries, and graceful failure modes",
          "Implemented a RAG pipeline using LangChain optimised for low-latency on Intel Gaudi 2 with HuggingFace TGI/TEI",
          "Orchestrated deployment on Kubernetes with Docker, ensuring reliability under load",
          "Managed IaC and CI/CD for automated, consistent delivery",
        ],
        techStack: [
          "Python",
          "Node.js",
          "Nginx",
          "Redis",
          "Docker",
          "K8s",
          "LangChain",
          "Intel Gaudi 2",
        ],
      },
      {
        title: "Semiconductor Factory Layout Optimiser",
        bullets: [
          "Designed an A* search algorithm for real-time route optimisation between pipe systems",
          "Built custom bin packing algorithm for constraint-based placement of factory assets",
          "Created microservice architecture with GPU support for real-time complex optimisation",
          "Integrated with NVIDIA Omniverse for real-time 3D visualisation",
        ],
        techStack: ["Python", "NVIDIA Omniverse", "Docker", "K8s", "DSA"],
      },
      {
        title: "Airbus — Insulation Blanket Tool & Rainbow Framework",
        bullets: [
          "Developed CATIA V5 add-in with 3D-to-2D geometry conversion algorithms in C++",
          "Architected configurator for Airbus A350 Freighter tool deployment",
          "Implemented sorting algorithms for 3D stress model elements per specification requirements",
        ],
        techStack: ["C++", "Java", "CATIA V5", "Hyperworks", "Python", "TCL"],
      },
    ],
  },
  {
    company: "Technia (Addnode Group)",
    role: "Application Developer",
    location: "Pune, India",
    dateRange: "Jul 2018 — Dec 2021",
    projects: [
      {
        title: "Honda K6V6 — 3DEXPERIENCE Migration",
        bullets: [
          "Migrated Honda PDM system from CATIA V5 to cloud-based 3DExperience platform",
          "Owned feature development for configuration management (evolution & effectivity)",
          "Used C++ JSON parser module for input attributes on product structures",
        ],
        techStack: ["C++", "Java", "3DExperience", "JSON", "Bitbucket"],
      },
      {
        title: "xCompare & Automated Test Suite",
        bullets: [
          "Developed CAD comparison tool features and version control pipeline",
          "Built an automation suite for regression testing (HTML, XML, image comparison via NumPy)",
          "Deployed on Jenkins for continuous integration",
        ],
        techStack: ["C++", "Python", "Jenkins", "NumPy", "HTML/CSS"],
      },
    ],
  },
];
