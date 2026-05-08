export interface Advantage {
  number: string;
  title: string;
  body: string;
  bullets: string[];
}

export const advantages: Advantage[] = [
  {
    number: "01",
    title: "Intuitive",
    body: "Complex workflows become simple. Every control, metric, and action is designed to feel obvious from the first login.",
    bullets: [
      "Zero-friction onboarding in under 30 minutes",
      "Context-aware navigation that adapts to your role",
      "Inline guidance without leaving the workflow",
      "Consistent interaction patterns across every module",
    ],
  },
  {
    number: "02",
    title: "Scalable",
    body: "From first market to global expansion, the system is designed to grow without redesigning your operations every six months.",
    bullets: [
      "Modular architecture — activate only what you need",
      "Multi-region and multi-entity support built in",
      "Automatic performance scaling under load",
      "Designed for 10-person teams and 10,000-person organisations",
    ],
  },
  {
    number: "03",
    title: "Powerful",
    body: "Enterprise-grade performance, automation, reporting, permissions, integrations, and operational visibility in one unified platform.",
    bullets: [
      "API-first architecture with full extensibility",
      "Sub-100ms response times across the platform",
      "40+ native integrations with leading tools",
      "Granular permission controls at every level",
    ],
  },
];
