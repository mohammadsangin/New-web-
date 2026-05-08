"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Zap, Users, BarChart3, CreditCard,
  ShieldCheck, FileText, Network, Settings2, ArrowRight, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionBadge from "@/components/sections/SectionBadge";
import GlowBackground from "@/components/sections/GlowBackground";
import DemoModal from "@/components/sections/DemoModal";
import { solutions } from "@/data/solutions";
import { fadeUp, staggerContainer, viewportOnce, easeOutExpo } from "@/lib/motion";

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="h-6 w-6" />,
  Zap: <Zap className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  BarChart3: <BarChart3 className="h-6 w-6" />,
  CreditCard: <CreditCard className="h-6 w-6" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6" />,
  FileText: <FileText className="h-6 w-6" />,
  Network: <Network className="h-6 w-6" />,
  Settings2: <Settings2 className="h-6 w-6" />,
};

const integrations = [
  "Salesforce", "HubSpot", "Stripe", "AWS", "Slack",
  "Zapier", "PostgreSQL", "Snowflake", "Segment", "Intercom",
];

export default function SolutionsPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-28 pb-20">
        <GlowBackground variant="hero" />
        <div className="absolute inset-0 grid-texture opacity-20" aria-hidden="true" />
        <div className="relative z-10 max-w-[1180px] mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUp} className="mb-6">
              <SectionBadge>Platform solutions</SectionBadge>
            </motion.div>
            <motion.h1 variants={fadeUp} className="hero-headline text-[#F4F7FB] mb-6" style={{ fontSize: "clamp(48px,6vw,96px)" }}>
              Solutions for every<br />part of your operation.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-[rgba(244,247,251,0.6)] max-w-[520px] leading-relaxed mb-10">
              Nine modular capabilities designed to work independently or as a unified system. Activate what you need, when you need it.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => setDemoOpen(true)}>
                Request a demo <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Talk to sales</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="py-24 bg-[#030509]" aria-labelledby="solutions-grid-heading">
        <div className="max-w-[1180px] mx-auto px-6">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
            className="sr-only" id="solutions-grid-heading"
          >
            All platform solutions
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOnce}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {solutions.map((sol) => (
              <motion.div
                key={sol.id}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
                className="group liquid-glass rounded-2xl p-8 relative overflow-hidden flex flex-col"
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at 20% 0%, ${sol.accentColor}10, transparent 55%)` }}
                  aria-hidden="true"
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shrink-0"
                  style={{ background: `${sol.accentColor}15`, color: sol.accentColor }}
                  aria-hidden="true"
                >
                  {iconMap[sol.icon]}
                </div>
                <h3 className="font-display font-bold text-xl text-[#F4F7FB] tracking-tight mb-3">
                  {sol.title}
                </h3>
                <p className="text-sm text-[rgba(244,247,251,0.55)] leading-relaxed mb-6 flex-1">
                  {sol.description}
                </p>
                <ul className="space-y-2.5 mb-7" aria-label={`${sol.title} features`}>
                  {sol.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[rgba(244,247,251,0.5)]">
                      <CheckCircle2
                        className="h-3.5 w-3.5 mt-0.5 shrink-0"
                        style={{ color: sol.accentColor }}
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setDemoOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[rgba(244,247,251,0.4)] group-hover:text-[#4AA8FF] transition-colors"
                >
                  See it in action
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modular architecture section */}
      <section className="py-24 overflow-hidden" aria-labelledby="architecture-heading">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer}>
              <motion.div variants={fadeUp} className="mb-6">
                <SectionBadge variant="cyan">Architecture</SectionBadge>
              </motion.div>
              <motion.h2 variants={fadeUp} className="section-headline text-[#F4F7FB] mb-6" style={{ fontSize: "clamp(36px,4vw,68px)" }} id="architecture-heading">
                Modular by design. Unified by default.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[rgba(244,247,251,0.6)] leading-relaxed mb-8">
                Every module in Nexus shares the same data model, authentication layer, and reporting surface. There is no integration tax — everything works together from the moment you activate it.
              </motion.p>
              {[
                "Single data model across all modules",
                "Unified permission and access control",
                "Consistent API across every capability",
                "Real-time data sync between modules",
              ].map((item) => (
                <motion.div key={item} variants={fadeUp} className="flex items-center gap-3 mb-3 text-sm text-[rgba(244,247,251,0.55)]">
                  <CheckCircle2 className="h-4 w-4 text-[#4AA8FF] shrink-0" aria-hidden="true" />
                  {item}
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
              className="liquid-glass rounded-2xl p-8"
            >
              <div className="text-[9px] uppercase tracking-widest text-[rgba(244,247,251,0.38)] mb-6">Module connection map</div>
              <div className="grid grid-cols-3 gap-3">
                {solutions.map((s) => (
                  <div
                    key={s.id}
                    className="rounded-xl p-3 border text-center"
                    style={{ background: `${s.accentColor}08`, borderColor: `${s.accentColor}25` }}
                  >
                    <div className="flex justify-center mb-2" style={{ color: s.accentColor }} aria-hidden="true">
                      {iconMap[s.icon]}
                    </div>
                    <div className="text-[9px] text-[rgba(244,247,251,0.5)] font-medium leading-tight">{s.title}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 bg-[#030509]" aria-labelledby="integrations-heading">
        <div className="max-w-[1180px] mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="flex justify-center mb-6">
              <SectionBadge variant="mint">Integrations</SectionBadge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="section-headline text-[#F4F7FB] mb-5" style={{ fontSize: "clamp(32px,3.5vw,64px)" }} id="integrations-heading">
              Connects with your existing stack.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[rgba(244,247,251,0.55)] mb-12 max-w-[480px] mx-auto">
              40+ native integrations. Open API for everything else.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
              {integrations.map((i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full border border-white/12 bg-white/5 text-sm text-[rgba(244,247,251,0.6)] font-medium"
                >
                  {i}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="section-headline text-[#F4F7FB] mb-6" style={{ fontSize: "clamp(36px,4vw,72px)" }}>
              See the full platform in action.
            </motion.h2>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <Button size="xl" onClick={() => setDemoOpen(true)}>Request a demo <ArrowRight className="h-4 w-4 ml-1" /></Button>
              <Button size="xl" variant="outline" asChild><Link href="/contact">Contact sales</Link></Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
