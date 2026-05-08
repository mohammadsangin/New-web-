"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionBadge from "@/components/sections/SectionBadge";
import GlowBackground from "@/components/sections/GlowBackground";
import { trustStats, partners } from "@/data/stats";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-bold text-[clamp(28px,3vw,48px)] text-[#F4F7FB] tracking-tight"
      >
        {value}
      </motion.div>
      <div className="text-sm text-[rgba(244,247,251,0.48)] mt-1">{label}</div>
    </div>
  );
}

export default function TrustSection() {
  return (
    <section
      className="relative py-24 overflow-hidden bg-[#030509]"
      aria-labelledby="trust-heading"
    >
      <GlowBackground variant="section" />

      <div className="relative z-10 max-w-[1180px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mb-14 text-center"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <SectionBadge variant="mint">Trusted platform architecture</SectionBadge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="section-headline text-[#F4F7FB] max-w-[700px] mx-auto"
            id="trust-heading"
          >
            Designed for serious operators.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg text-[rgba(244,247,251,0.55)] max-w-[500px] mx-auto">
            Designed for serious operators, growing teams, and enterprise workflows.
          </motion.p>
        </motion.div>

        {/* Main glass card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="liquid-glass rounded-3xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: quote + copy */}
            <div className="p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-white/8">
              <div
                className="text-5xl font-display font-bold text-[rgba(244,247,251,0.1)] mb-6 leading-none select-none"
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <p className="text-xl text-[rgba(244,247,251,0.75)] leading-relaxed mb-8 italic font-light">
                We replaced five disconnected tools with Nexus and had our operations team fully transitioned in under two weeks. The visibility we have now changed how we run the business.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4AA8FF] to-[#7CF7FF] flex items-center justify-center text-sm font-bold text-[#05070D]">
                  MR
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#F4F7FB]">M. Reynolds</div>
                  <div className="text-xs text-[rgba(244,247,251,0.45)]">VP Operations, VantaWorks</div>
                </div>
              </div>
            </div>

            {/* Right: stats */}
            <div className="p-10 lg:p-14">
              <div className="grid grid-cols-2 gap-8">
                {trustStats.map((s) => (
                  <AnimatedStat key={s.label} value={s.value} label={s.label} />
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-white/8">
                <p className="text-xs text-[rgba(244,247,251,0.38)] uppercase tracking-widest mb-4">Infrastructure highlights</p>
                <div className="space-y-2">
                  {[
                    "SOC 2 Type II compliant architecture",
                    "AES-256 encryption at rest and in transit",
                    "Regional data residency controls",
                    "Automated failover and redundancy",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-[rgba(244,247,251,0.55)]">
                      <span className="w-1 h-1 rounded-full bg-[#8DFFD2] shrink-0" aria-hidden="true" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Partner marquee */}
        <div className="mt-16 overflow-hidden" aria-label="Partner organisations">
          <p className="text-center text-xs text-[rgba(244,247,251,0.32)] uppercase tracking-widest mb-8">
            Trusted by teams at
          </p>
          <div className="relative">
            <div className="marquee-track">
              {partners.map((p, i) => (
                <span
                  key={`${p}-${i}`}
                  className="mx-10 font-display font-bold text-xl text-[rgba(244,247,251,0.18)] tracking-tight select-none whitespace-nowrap hover:text-[rgba(244,247,251,0.38)] transition-colors"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
