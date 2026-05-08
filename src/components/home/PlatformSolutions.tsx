"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  LayoutDashboard, Zap, Users, BarChart3, CreditCard,
  ShieldCheck, FileText, Network, Settings2, ArrowRight
} from "lucide-react";
import SectionBadge from "@/components/sections/SectionBadge";
import GlowBackground from "@/components/sections/GlowBackground";
import { solutions } from "@/data/solutions";
import { fadeUp, staggerContainer, cardHover, viewportOnce, easeOutExpo } from "@/lib/motion";

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="h-5 w-5" />,
  Zap: <Zap className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  BarChart3: <BarChart3 className="h-5 w-5" />,
  CreditCard: <CreditCard className="h-5 w-5" />,
  ShieldCheck: <ShieldCheck className="h-5 w-5" />,
  FileText: <FileText className="h-5 w-5" />,
  Network: <Network className="h-5 w-5" />,
  Settings2: <Settings2 className="h-5 w-5" />,
};

const MiniUIPreview = ({ accentColor, index }: { accentColor: string; index: number }) => {
  const previews = [
    // Operations Hub — mini dashboard
    <div key="ops" className="space-y-2" aria-hidden="true">
      <div className="flex gap-1.5">
        {[70, 45, 85, 60, 92].map((h, i) => (
          <div key={i} className="flex-1 rounded-sm" style={{ height: `${h * 0.32}px`, background: `${accentColor}50` }} />
        ))}
      </div>
      <div className="h-px bg-white/8" />
      <div className="flex items-center justify-between">
        <div className="h-1.5 w-16 rounded bg-white/12" />
        <span className="text-[9px]" style={{ color: accentColor }}>+12%</span>
      </div>
    </div>,
    // Workflow Automation
    <div key="workflow" className="space-y-2" aria-hidden="true">
      {[60, 80, 45].map((w, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: accentColor }} />
          <div className="h-1.5 rounded-full" style={{ width: `${w}%`, background: `${accentColor}45` }} />
        </div>
      ))}
    </div>,
    // Customer Intelligence
    <div key="customer" className="space-y-2" aria-hidden="true">
      <div className="grid grid-cols-2 gap-1.5">
        {["4,892", "94.2%", "D+14", "3.4×"].map((v, i) => (
          <div key={i} className="rounded-lg bg-white/6 p-2 text-center">
            <div className="text-[10px] font-bold" style={{ color: accentColor }}>{v}</div>
          </div>
        ))}
      </div>
    </div>,
    // Analytics
    <div key="analytics" className="space-y-2" aria-hidden="true">
      <svg width="100%" height="40" aria-hidden="true">
        <polyline
          points="0,35 20,28 40,20 60,22 80,10 100,14 120,8"
          fill="none"
          stroke={accentColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex gap-2">
        {["Visits", "Revenue", "CAC"].map((l) => (
          <span key={l} className="text-[8px] text-[rgba(244,247,251,0.4)] uppercase tracking-wide">{l}</span>
        ))}
      </div>
    </div>,
    // Billing
    <div key="billing" className="space-y-2" aria-hidden="true">
      <div className="text-sm font-bold font-display" style={{ color: accentColor }}>$284K</div>
      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
        <div className="h-full rounded-full w-[78%]" style={{ background: accentColor }} />
      </div>
      <div className="text-[9px] text-[rgba(244,247,251,0.4)]">Monthly target: 78%</div>
    </div>,
    // Risk
    <div key="risk" className="space-y-1.5" aria-hidden="true">
      {[
        { l: "Auth", v: "Pass" },
        { l: "Compliance", v: "Pass" },
        { l: "Anomalies", v: "None" },
      ].map((r) => (
        <div key={r.l} className="flex items-center justify-between">
          <span className="text-[9px] text-[rgba(244,247,251,0.4)]">{r.l}</span>
          <span className="text-[9px] font-semibold" style={{ color: accentColor }}>{r.v}</span>
        </div>
      ))}
    </div>,
    // Content
    <div key="content" className="space-y-1.5" aria-hidden="true">
      {[80, 55, 65].map((w, i) => (
        <div key={i} className="h-2 rounded bg-white/8" style={{ width: `${w}%` }} />
      ))}
      <div className="flex gap-1 mt-2">
        <div className="px-2 py-0.5 rounded-full text-[8px] border border-white/12 text-[rgba(244,247,251,0.4)]">Draft</div>
        <div className="px-2 py-0.5 rounded-full text-[8px]" style={{ background: `${accentColor}20`, color: accentColor }}>Live</div>
      </div>
    </div>,
    // Partner
    <div key="partner" className="space-y-2" aria-hidden="true">
      <div className="text-[9px] text-[rgba(244,247,251,0.4)]">Active partners</div>
      <div className="text-lg font-bold font-display" style={{ color: accentColor }}>42</div>
      <div className="grid grid-cols-3 gap-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-6 rounded bg-white/6 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white/20" />
          </div>
        ))}
      </div>
    </div>,
    // Managed
    <div key="managed" className="space-y-2" aria-hidden="true">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentColor }} />
        <span className="text-[9px]" style={{ color: accentColor }}>Expert assigned</span>
      </div>
      <div className="text-[9px] text-[rgba(244,247,251,0.4)]">Next review in 3 days</div>
      <div className="h-1 rounded-full bg-white/8 overflow-hidden">
        <div className="h-full rounded-full w-[65%]" style={{ background: `${accentColor}60` }} />
      </div>
    </div>,
  ];
  return previews[index % previews.length] ?? null;
};

export default function PlatformSolutions() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start end", "end start"] });
  const railX = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      className="relative py-28 overflow-hidden bg-[#030509]"
      aria-labelledby="solutions-heading"
    >
      <GlowBackground variant="section" />
      <div className="absolute inset-0 grid-texture opacity-20" aria-hidden="true" />

      <div className="relative z-10 max-w-[1180px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mb-14"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <SectionBadge>Platform solutions</SectionBadge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="section-headline text-[#F4F7FB] max-w-[700px]" id="solutions-heading">
            One platform.<br />Every system connected.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg text-[rgba(244,247,251,0.55)] max-w-[520px]">
            Modular tools for teams that need speed, visibility, automation, and control without stitching together disconnected software.
          </motion.p>
        </motion.div>
      </div>

      {/* Rail */}
      <div ref={railRef} className="relative overflow-hidden">
        <motion.div
          style={{ x: railX }}
          className="relative z-10 px-6"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1180px] mx-auto"
          >
            {solutions.map((sol, idx) => (
              <motion.div
                key={sol.id}
                variants={fadeUp}
                whileHover={cardHover}
                className="group relative liquid-glass rounded-2xl p-6 cursor-pointer overflow-hidden flex flex-col"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Card glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 30% 0%, ${sol.accentColor}12, transparent 60%)` }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 rounded-2xl border opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ borderColor: `${sol.accentColor}35` }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 shrink-0"
                  style={{ background: `${sol.accentColor}15`, color: sol.accentColor }}
                  aria-hidden="true"
                >
                  {iconMap[sol.icon]}
                </div>

                <h3 className="font-display font-bold text-xl text-[#F4F7FB] tracking-tight mb-2">
                  {sol.title}
                </h3>
                <p className="text-sm text-[rgba(244,247,251,0.55)] leading-relaxed mb-5 flex-1">
                  {sol.description}
                </p>

                {/* Mini UI preview */}
                <div className="rounded-xl bg-white/4 border border-white/7 p-3 mb-5 min-h-[72px]">
                  <MiniUIPreview accentColor={sol.accentColor} index={idx} />
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-between">
                  <Link
                    href="/solutions"
                    className="text-xs font-semibold tracking-widest uppercase text-[rgba(244,247,251,0.45)] group-hover:text-[#F4F7FB] transition-colors flex items-center gap-1.5"
                    aria-label={`Learn more about ${sol.title}`}
                  >
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Mobile swipe hint */}
        <div className="flex lg:hidden justify-center mt-6" aria-hidden="true">
          <span className="text-xs text-[rgba(244,247,251,0.35)] tracking-widest uppercase">Scroll to explore</span>
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
        className="flex justify-center mt-14"
      >
        <Link
          href="/solutions"
          className="flex items-center gap-2 text-sm font-semibold text-[rgba(244,247,251,0.55)] hover:text-[#4AA8FF] transition-colors group"
        >
          View all solutions
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  );
}
