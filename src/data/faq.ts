export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    id: "what-is-nexus",
    category: "Platform",
    question: "What is Nexus?",
    answer: "Nexus is a premium B2B platform built for modern teams that need to manage operations, workflows, analytics, customer intelligence, and growth infrastructure from a single, unified interface. It replaces fragmented point solutions with one connected system designed for speed, clarity, and enterprise-grade control.",
  },
  {
    id: "choose-modules",
    category: "Modules",
    question: "Can I choose only the modules I need?",
    answer: "Yes. Nexus is built on a modular architecture, which means you activate only the capabilities your team requires at any given stage. Each module integrates seamlessly with the others, so as your needs grow, you simply unlock additional functionality without rebuilding your workflows.",
  },
  {
    id: "launch-speed",
    category: "Platform",
    question: "How fast can a team launch?",
    answer: "Most teams complete their initial setup and begin operating within 48 hours of signing. Our structured onboarding process, combined with guided configuration tools, eliminates the typical weeks-long implementation cycle associated with enterprise platforms. Dedicated implementation support is available for larger deployments.",
  },
  {
    id: "integrations",
    category: "Platform",
    question: "Does it support integrations?",
    answer: "Nexus offers 40+ native integrations with leading business tools including CRM systems, data warehouses, communication platforms, payment processors, and analytics services. Additionally, our open API and webhook infrastructure allows you to connect any custom or proprietary system your organisation relies on.",
  },
  {
    id: "scalability",
    category: "Platform",
    question: "Is the platform scalable?",
    answer: "Nexus is architected for scale from the ground up. The infrastructure automatically scales to handle increased workloads, user volumes, and data throughput. Our largest customers operate across multiple regions and business units on the same platform instance with no degradation in performance.",
  },
  {
    id: "non-technical",
    category: "Platform",
    question: "Can non-technical teams use it?",
    answer: "Absolutely. While Nexus provides deep technical extensibility for engineering teams, the core platform is designed for operators, analysts, marketers, and business leaders. No-code workflow builders, visual dashboards, and plain-language configuration tools ensure every team member can work effectively from day one.",
  },
  {
    id: "onboarding-support",
    category: "Support",
    question: "Do you provide onboarding and support?",
    answer: "Every Nexus customer receives structured onboarding support, including configuration guidance, team training, and dedicated review sessions. Ongoing support is available via our support portal, with priority response channels for enterprise accounts. Our platform experts are available to assist with complex deployments and integrations.",
  },
  {
    id: "request-demo",
    category: "Demo",
    question: "How do we request a demo?",
    answer: "You can request a personalised demo directly from our website by clicking the 'Request a demo' button. A member of our team will reach out within one business day to schedule a walkthrough tailored to your industry, team size, and specific operational challenges. There is no obligation or sales pressure involved.",
  },
  {
    id: "security",
    category: "Security",
    question: "How does Nexus handle data security?",
    answer: "Security is foundational to the Nexus platform. We maintain SOC 2 Type II compliance, AES-256 encryption at rest and in transit, and strict data residency controls. Role-based access, single sign-on (SSO), and granular audit logging are included across all plans. Our infrastructure is monitored 24/7 with automated incident response.",
  },
  {
    id: "pricing",
    category: "Pricing",
    question: "How is Nexus priced?",
    answer: "Nexus is priced on a modular basis aligned to the capabilities your team activates and the scale of your operation. Rather than rigid seat-count pricing, we structure plans around value delivered. Detailed pricing is discussed during the demo process once we understand your specific requirements and scale.",
  },
  {
    id: "data-migration",
    category: "Platform",
    question: "Can we migrate existing data into the platform?",
    answer: "Yes. Nexus includes structured data import tools and our implementation team provides hands-on migration support. We support imports from CSV, common database formats, and direct migration from popular platforms in your category. Data integrity validation is performed at every step of the migration process.",
  },
  {
    id: "uptime",
    category: "Security",
    question: "What is the platform uptime guarantee?",
    answer: "We target 99.95% uptime across all platform services, backed by our infrastructure redundancy architecture. Real-time platform status is published on our public status page. Enterprise agreements include formal SLA commitments with defined response and resolution time targets for any service disruptions.",
  },
];

export const faqCategories = ["All", "Platform", "Modules", "Security", "Support", "Pricing", "Demo"];
