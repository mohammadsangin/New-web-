"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionBadge from "@/components/sections/SectionBadge";
import GlowBackground from "@/components/sections/GlowBackground";
import DemoModal from "@/components/sections/DemoModal";
import { fadeUp, staggerContainer, viewportOnce, easeOutExpo } from "@/lib/motion";

const timeline = [
  { year: "2019", title: "Founded", description: "Nexus was founded to solve the fragmentation problem in B2B operations." },
  { year: "2020", title: "First 50 customers", description: "Operations Hub and Analytics Suite launched. First 50 enterprise teams onboarded." },
  { year: "2021", title: "Platform expansion", description: "Workflow Automation, Risk Controls, and Customer Intelligence modules introduced." },
  { year: "2022", title: "Global reach", description: "Expanded to 8 markets. Partner Portal and Payments modules launched." },
  { year: "2023", title: "Enterprise tier", description: "Managed Services launched. First Fortune 500 customers onboarded." },
  { year: "2024", title: "AI integration", description: "Intelligence layer added across all modules. Predictive analytics and automation recommendations." },
  { year: "2025", title: "12 markets", description: "Serving 1,200+ organisations across 12 markets with 40+ connected modules." },
];

const values = [
  {
    title: "Clarity over complexity",
    description: "We believe powerful systems do not have to be complicated. Every design decision starts with the question: does this make things clearer?",
  },
  {
    title: "Speed without sacrifice",
    description: "Fast implementation, fast performance, fast decisions. Speed is a design principle, not an afterthought.",
  },
  {
    title: "Trust as infrastructure",
    description: "Security, reliability, and data integrity are not features. They are the foundation on which everything else is built.",
  },
  {
    title: "Modular thinking",
    description: "No organisation is the same. We build for the reality of how businesses actually grow — step by step, module by module.",
  },
  {
    title: "Enterprise honesty",
    description: "We do not oversell. We tell you what the platform does, what it does not do, and what we are building next.",
  },
  {
    title: "Operators first",
    description: "We build for the people doing the work — not just the people buying the software. Usability is not optional.",
  },
];

const team = [
  { initials: "AR", name: "A. Richardson", role: "Chief Executive Officer", color: "#4AA8FF" },
  { initials: "SK", name: "S. Kapoor", role: "Chief Technology Officer", color: "#7CF7FF" },
  { initials: "ML", name: "M. Laurent", role: "Chief Product Officer", color: "#8DFFD2" },
  { initials: "JO", name: "J. Okafor", role: "VP Engineering", color: "#9BA8C7" },
  { initials: "EP", name: "E. Park", role: "VP Customer Success", color: "#4AA8FF" },
  { initials: "TN", name: "T. Nguyen", role: "Head of Design", color: "#7CF7FF" },
];

export default function AboutPage() {
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
              <SectionBadge>About Nexus</SectionBadge>
            </motion.div>
            <motion.h1 variants={fadeUp} className="hero-headline text-[#F4F7FB] mb-6" style={{ fontSize: "clamp(48px,6vw,96px)" }}>
              Built for operations<br />that cannot stand still.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-[rgba(244,247,251,0.6)] max-w-[520px] leading-relaxed">
              Nexus exists because modern B2B teams deserve a platform that moves as fast as they do — connected, visible, and in control.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-[#030509]" aria-labelledby="mission-heading">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer}>
              <motion.div variants={fadeUp} className="mb-6">
                <SectionBadge variant="cyan">Mission</SectionBadge>
              </motion.div>
              <motion.h2 variants={fadeUp} className="section-headline text-[#F4F7FB] mb-6" style={{ fontSize: "clamp(36px,4vw,68px)" }} id="mission-heading">
                One platform. Real control.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-[rgba(244,247,251,0.6)] leading-relaxed mb-6">
                Our mission is to give B2B operators complete visibility and control over every system that moves their business forward — without the complexity that typically comes with enterprise infrastructure.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[rgba(244,247,251,0.55)] leading-relaxed">
                We believe that the best software for serious teams should feel effortless, not burdensome. Every product decision we make is guided by that principle.
              </motion.p>
            </motion.div>
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
              className="liquid-glass rounded-2xl p-8 space-y-6"
            >
              {[
                { label: "Founded", value: "2019" },
                { label: "Customers", value: "1,200+" },
                { label: "Markets", value: "12 global" },
                { label: "Team size", value: "180+ people" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between border-b border-white/8 pb-4 last:border-0 last:pb-0">
                  <span className="text-sm text-[rgba(244,247,251,0.48)]">{s.label}</span>
                  <span className="font-display font-bold text-xl text-[#F4F7FB]">{s.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24" aria-labelledby="philosophy-heading">
        <div className="max-w-[1180px] mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer} className="mb-14">
            <motion.div variants={fadeUp} className="mb-6">
              <SectionBadge variant="mint">Philosophy</SectionBadge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="section-headline text-[#F4F7FB] max-w-[600px]" style={{ fontSize: "clamp(36px,4vw,68px)" }} id="philosophy-heading">
              Platform thinking, not tool thinking.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-lg text-[rgba(244,247,251,0.55)] max-w-[540px]">
              We build systems, not features. Every capability exists to serve a connected whole — not to tick a checklist.
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              "We ship slowly but deliberately — every release is production-ready.",
              "We invest in documentation the same way we invest in code.",
              "We do not charge for features you do not use.",
              "We tell customers when we cannot help them.",
              "We build for operators, not just administrators.",
              "We treat the API as a first-class product.",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
                transition={{ delay: i * 0.06 }}
                className="liquid-glass-soft rounded-xl p-6 border border-white/8"
              >
                <div className="text-sm text-[rgba(244,247,251,0.65)] leading-relaxed">{item}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[#030509]" aria-labelledby="timeline-heading">
        <div className="max-w-[1180px] mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer} className="mb-14">
            <motion.div variants={fadeUp} className="mb-6">
              <SectionBadge>Timeline</SectionBadge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="section-headline text-[#F4F7FB]" style={{ fontSize: "clamp(36px,4vw,68px)" }} id="timeline-heading">
              From launch to platform.
            </motion.h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-[#4AA8FF] via-[#7CF7FF] to-transparent" aria-hidden="true" />
            <div className="space-y-8 ml-12">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
                  transition={{ delay: i * 0.07 }}
                  className="relative"
                >
                  <div
                    className="absolute -left-[46px] top-1.5 w-3 h-3 rounded-full border-2 border-[#4AA8FF] bg-[#030509]"
                    aria-hidden="true"
                  />
                  <div className="flex items-start gap-6">
                    <span className="text-sm font-display font-bold text-[#4AA8FF] w-12 shrink-0 pt-0.5">{t.year}</span>
                    <div>
                      <h3 className="font-display font-bold text-[#F4F7FB] mb-1">{t.title}</h3>
                      <p className="text-sm text-[rgba(244,247,251,0.55)]">{t.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" aria-labelledby="values-heading">
        <div className="max-w-[1180px] mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer} className="mb-14">
            <motion.div variants={fadeUp} className="mb-6"><SectionBadge variant="cyan">Values</SectionBadge></motion.div>
            <motion.h2 variants={fadeUp} className="section-headline text-[#F4F7FB]" style={{ fontSize: "clamp(36px,4vw,68px)" }} id="values-heading">
              What we stand for.
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="liquid-glass rounded-2xl p-7 group"
              >
                <CheckCircle2 className="h-5 w-5 text-[#4AA8FF] mb-4" aria-hidden="true" />
                <h3 className="font-display font-bold text-lg text-[#F4F7FB] tracking-tight mb-3">{v.title}</h3>
                <p className="text-sm text-[rgba(244,247,251,0.55)] leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-[#030509]" aria-labelledby="team-heading">
        <div className="max-w-[1180px] mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer} className="mb-14">
            <motion.div variants={fadeUp} className="mb-6"><SectionBadge variant="mint">Team</SectionBadge></motion.div>
            <motion.h2 variants={fadeUp} className="section-headline text-[#F4F7FB] max-w-[500px]" style={{ fontSize: "clamp(36px,4vw,68px)" }} id="team-heading">
              The people behind the platform.
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
                transition={{ delay: i * 0.07 }}
                className="text-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-display font-bold text-[#05070D] mx-auto mb-4"
                  style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}88)` }}
                  aria-label={`${member.name} avatar`}
                >
                  {member.initials}
                </div>
                <div className="text-sm font-semibold text-[#F4F7FB]">{member.name}</div>
                <div className="text-xs text-[rgba(244,247,251,0.45)] mt-0.5">{member.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="section-headline text-[#F4F7FB] mb-6" style={{ fontSize: "clamp(36px,4vw,68px)" }}>
              Join 1,200+ teams on Nexus.
            </motion.h2>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <Button size="xl" onClick={() => setDemoOpen(true)}>Request a demo <ArrowRight className="h-4 w-4 ml-1" /></Button>
              <Button size="xl" variant="outline" asChild><Link href="/contact">Get in touch</Link></Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
