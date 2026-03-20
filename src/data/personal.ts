import type { PersonalInfo, ContactLink, AvailabilityInfo, NavItem, Metric } from "@/types";

export const personalInfo: PersonalInfo = {
  name: "Vishwas Sharma",
  initials: "VS",
  title: "Senior Backend\n& AI Engineer",
  subtitle:
    "I design and operate production-grade backend systems, cloud infrastructure, and AI/ML-powered platforms. Based in Munich — building reliable software for demanding industries.",
  location: "Munich, Germany",
  tagline: "Open to new opportunities",
  avatarUrl: "/assets/profile.jpg",
  resumeUrl: "/assets/Vishwas_Sharma_Resume.pdf",
};

export const navItems: NavItem[] = [
  { label: "Expertise", href: "#expertise" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Education", href: "#education" },
  { label: "Get in Touch", href: "#contact", isCta: true },
];

export const heroMetrics: Metric[] = [
  { value: 7, suffix: "+", label: "Years Experience", isAnimated: true, target: 7 },
  { value: 7, label: "Certifications", isAnimated: true, target: 7 },
  { value: "AWS", label: "K8s · Docker · AI/ML" },
  { value: "B1", label: "German · EU Work Permit" },
];

export const contactLinks: ContactLink[] = [
  {
    platform: "Email",
    emoji: "✉️",
    label: "Email",
    value: "vishwas.sharma.98499@gmail.com",
    href: "mailto:vishwas.sharma.98499@gmail.com",
  },
  {
    platform: "LinkedIn",
    emoji: "💼",
    label: "LinkedIn",
    value: "vishwas-sharma-profile",
    href: "https://www.linkedin.com/in/vishwas-sharma-profile/",
  },
  {
    platform: "GitHub",
    emoji: "🐙",
    label: "GitHub",
    value: "vishwassharma98499",
    href: "https://github.com/vishwassharma98499",
  },
];

export const availability: AvailabilityInfo = {
  status: "open",
  description:
    "I'm open to senior backend engineering and AI/ML engineering roles. I value well-structured teams, real technical challenges, and the opportunity to build products that matter.",
  details: [
    { label: "Location", value: "Munich, Germany" },
    { label: "Languages", value: "English, Deutsch (B1)" },
    { label: "Work Permit", value: "EU Eligible" },
    { label: "Remote", value: "Hybrid / On-site / Remote" },
  ],
};
