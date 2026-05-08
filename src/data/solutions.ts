export interface Solution {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  color: string;
  accentColor: string;
}

export const solutions: Solution[] = [
  {
    id: "operations-hub",
    icon: "LayoutDashboard",
    title: "Operations Hub",
    description: "Centralise every operational process into a single command surface. Monitor, manage, and act on what matters.",
    features: [
      "Real-time operational dashboard",
      "Cross-team task routing",
      "Process dependency mapping",
      "Operational health scoring",
    ],
    color: "rgba(74, 168, 255, 0.12)",
    accentColor: "#4AA8FF",
  },
  {
    id: "workflow-automation",
    icon: "Zap",
    title: "Workflow Automation",
    description: "Build intelligent workflows that execute without intervention. Reduce manual overhead and accelerate delivery.",
    features: [
      "No-code workflow builder",
      "Conditional logic and branching",
      "API trigger integrations",
      "Audit trail on every action",
    ],
    color: "rgba(124, 247, 255, 0.10)",
    accentColor: "#7CF7FF",
  },
  {
    id: "customer-intelligence",
    icon: "Users",
    title: "Customer Intelligence",
    description: "Deep customer profiling, segmentation, and behavioural analytics that inform every decision your team makes.",
    features: [
      "Unified customer profiles",
      "Behavioural segmentation engine",
      "Lifecycle stage tracking",
      "Churn prediction signals",
    ],
    color: "rgba(141, 255, 210, 0.10)",
    accentColor: "#8DFFD2",
  },
  {
    id: "analytics-suite",
    icon: "BarChart3",
    title: "Analytics Suite",
    description: "From raw data to actionable insight in seconds. Track performance across every dimension of your operation.",
    features: [
      "Custom KPI dashboards",
      "Cohort and funnel analysis",
      "Revenue attribution models",
      "Scheduled automated reports",
    ],
    color: "rgba(74, 168, 255, 0.12)",
    accentColor: "#4AA8FF",
  },
  {
    id: "payments-billing",
    icon: "CreditCard",
    title: "Payments & Billing",
    description: "End-to-end billing infrastructure for subscription, usage-based, or hybrid revenue models.",
    features: [
      "Subscription lifecycle management",
      "Automated invoice generation",
      "Multi-currency support",
      "Revenue recognition tools",
    ],
    color: "rgba(155, 168, 199, 0.10)",
    accentColor: "#9BA8C7",
  },
  {
    id: "risk-controls",
    icon: "ShieldCheck",
    title: "Risk Controls",
    description: "Enterprise-grade compliance, permissions, and risk management built into every workflow layer.",
    features: [
      "Role-based access control",
      "Compliance audit logging",
      "Anomaly detection rules",
      "Data residency controls",
    ],
    color: "rgba(255, 107, 122, 0.10)",
    accentColor: "#FF6B7A",
  },
  {
    id: "content-management",
    icon: "FileText",
    title: "Content Management",
    description: "Structure, publish, and govern content across your platform with precision and speed.",
    features: [
      "Structured content modelling",
      "Approval and review workflows",
      "Multi-channel publishing",
      "Version history and rollback",
    ],
    color: "rgba(124, 247, 255, 0.10)",
    accentColor: "#7CF7FF",
  },
  {
    id: "partner-portal",
    icon: "Network",
    title: "Partner Portal",
    description: "Give partners, resellers, and agencies their own secure workspace within your platform ecosystem.",
    features: [
      "White-label portal configuration",
      "Partner performance dashboards",
      "Document and resource library",
      "Commission and deal tracking",
    ],
    color: "rgba(141, 255, 210, 0.10)",
    accentColor: "#8DFFD2",
  },
  {
    id: "managed-services",
    icon: "Settings2",
    title: "Managed Services",
    description: "Full-service implementation, optimisation, and dedicated support from our platform experts.",
    features: [
      "Dedicated implementation team",
      "Quarterly business reviews",
      "Custom integration builds",
      "Priority incident response",
    ],
    color: "rgba(74, 168, 255, 0.12)",
    accentColor: "#4AA8FF",
  },
];
