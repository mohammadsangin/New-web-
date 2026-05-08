"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Zap, BarChart3, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionBadge from "@/components/sections/SectionBadge";
import DemoModal from "@/components/sections/DemoModal";
import GlowBackground from "@/components/sections/GlowBackground";
import { heroStats } from "@/data/stats";
import { easeOutExpo, staggerContainer, fadeUp } from "@/lib/motion";

export default function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.5]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(useTransform(mouseX, [-1, 1], [-30, 30]), { stiffness: 60, damping: 20 });
  const glowY = useSpring(useTransform(mouseY, [-1, 1], [-20, 20]), { stiffness: 60, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const words = "Launch smarter. Scale faster. Control everything.".split(" ");

  return (
    <>
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
        style={{ paddingTop: "100px" }}
        aria-label="Hero section"
      >
        {/* Background glows */}
        <GlowBackground variant="hero" />

        {/* Cursor-reactive glow */}
        <motion.div
          className="glow-field rounded-full pointer-events-none"
          style={{
            x: glowX,
            y: glowY,
            width: "600px",
            height: "400px",
            top: "10%",
            left: "50%",
            marginLeft: "-300px",
            background: "radial-gradient(circle, rgba(74,168,255,0.12), transparent 60%)",
          }}
          aria-hidden="true"
        />

        {/* Grid texture */}
        <div className="absolute inset-0 grid-texture opacity-30" aria-hidden="true" />

        <div className="relative z-10 w-full max-w-[1180px] mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-16">
          {/* Left: copy */}
          <div className="flex-1 max-w-[600px]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="mb-8">
                <SectionBadge>AI-powered platform infrastructure</SectionBadge>
              </motion.div>

              <h1 className="hero-headline text-[#F4F7FB] mb-8" aria-label="Launch smarter. Scale faster. Control everything.">
                {words.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.15 + i * 0.055, duration: 0.65, ease: easeOutExpo }}
                    className="inline-block mr-[0.18em] last:mr-0"
                  >
                    {word.includes("smarter") || word.includes("faster") || word.includes("everything") ? (
                      <span className="text-gradient">{word}</span>
                    ) : word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                variants={fadeUp}
                className="text-lg text-[rgba(244,247,251,0.68)] leading-relaxed max-w-[480px] mb-10"
              >
                Nexus helps modern B2B teams manage operations, workflows, analytics, customers, and growth from one premium platform built for speed, clarity, and control.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-4"
              >
                <Button size="xl" onClick={() => setDemoOpen(true)} className="gap-2.5">
                  Request a demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="xl" variant="outline" asChild>
                  <Link href="/solutions">Explore solutions</Link>
                </Button>
              </motion.div>

              {/* Stats row */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-white/8">
                {heroStats.map((s) => (
                  <div key={s.label}>
                    <div className="font-display font-bold text-2xl text-[#F4F7FB] tracking-tight">{s.value}</div>
                    <div className="text-xs text-[rgba(244,247,251,0.48)] mt-0.5 tracking-wide">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right: 3D platform visual */}
          <div className="flex-1 w-full max-w-[560px] flex items-center justify-center">
            <motion.div
              style={{
                scale: visualScale,
                opacity: visualOpacity,
                y: visualY,
              }}
              className="relative w-full"
            >
              <motion.div
                initial={{ opacity: 0, x: 60, filter: "blur(16px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.4, duration: 0.9, ease: easeOutExpo }}
                className="relative"
                style={{ perspective: "1400px" }}
              >
                <PlatformDashboard />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-xs text-[rgba(244,247,251,0.32)] tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-[rgba(74,168,255,0.6)] to-transparent"
          />
        </motion.div>
      </section>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}

function PlatformDashboard() {
  return (
    <div
      className="relative w-full"
      style={{
        transform: "rotateX(8deg) rotateY(-14deg) rotateZ(1deg)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Main dashboard card */}
      <div className="relative liquid-glass rounded-2xl overflow-hidden" style={{ minHeight: "340px" }}>
        {/* Inner glow */}
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: "radial-gradient(circle at 30% 0%, rgba(74,168,255,0.18), transparent 50%)" }}
          aria-hidden="true"
        />

        {/* Header bar */}
        <div className="relative flex items-center justify-between px-5 py-3.5 border-b border-white/8">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B7A]" aria-hidden="true" />
            <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,200,80,0.8)]" aria-hidden="true" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#8DFFD2]" aria-hidden="true" />
          </div>
          <span className="text-[10px] text-[rgba(244,247,251,0.38)] font-mono tracking-wider">NEXUS COMMAND</span>
          <div className="flex items-center gap-2">
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#8DFFD2]/15 text-[#8DFFD2] border border-[#8DFFD2]/25 font-semibold">● LIVE</span>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-5 space-y-4">
          {/* Chart area */}
          <div className="relative h-[100px] rounded-xl bg-white/3 border border-white/6 overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{ background: "linear-gradient(180deg, rgba(74,168,255,0.15), transparent)" }}
              aria-hidden="true"
            />
            <svg className="absolute inset-0 w-full h-full" aria-hidden="true" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4AA8FF" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#4AA8FF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,80 C40,65 80,45 140,50 C180,54 220,30 280,25 C320,22 360,40 400,35 C440,30 480,15 520,18 L520,100 L0,100 Z"
                fill="url(#chartGrad)"
              />
              <path
                d="M0,80 C40,65 80,45 140,50 C180,54 220,30 280,25 C320,22 360,40 400,35 C440,30 480,15 520,18"
                fill="none"
                stroke="#4AA8FF"
                strokeWidth="1.5"
                className="mini-chart-line"
              />
            </svg>
            <div className="absolute top-3 left-4">
              <span className="text-[9px] text-[rgba(244,247,251,0.45)] uppercase tracking-widest">Revenue 30d</span>
              <div className="text-sm font-display font-bold text-[#F4F7FB] mt-0.5">$284,910</div>
              <span className="text-[9px] text-[#8DFFD2]">+12.4% vs prev</span>
            </div>
          </div>

          {/* Module grid */}
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { icon: <BarChart3 className="h-3.5 w-3.5" />, label: "Analytics", val: "99.1%", color: "#4AA8FF" },
              { icon: <Zap className="h-3.5 w-3.5" />, label: "Workflows", val: "247 active", color: "#7CF7FF" },
              { icon: <Shield className="h-3.5 w-3.5" />, label: "Risk", val: "All clear", color: "#8DFFD2" },
              { icon: <Users className="h-3.5 w-3.5" />, label: "Customers", val: "4,892", color: "#9BA8C7" },
              { icon: <BarChart3 className="h-3.5 w-3.5" />, label: "Uptime", val: "99.97%", color: "#4AA8FF" },
              { icon: <Zap className="h-3.5 w-3.5" />, label: "Ops Score", val: "94 / 100", color: "#7CF7FF" },
            ].map((m, i) => (
              <div
                key={i}
                className="rounded-xl p-3 border border-white/7 bg-white/4 flex flex-col gap-1.5"
                style={{ borderColor: `${m.color}15` }}
              >
                <div style={{ color: m.color }}>{m.icon}</div>
                <div className="text-[9px] text-[rgba(244,247,251,0.45)] uppercase tracking-wider">{m.label}</div>
                <div className="text-[11px] font-bold text-[#F4F7FB] font-display">{m.val}</div>
              </div>
            ))}
          </div>

          {/* Status pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Operations", status: "Optimal" },
              { label: "Billing", status: "Processing" },
              { label: "API", status: "Healthy" },
            ].map((p) => (
              <div
                key={p.label}
                className="flex items-center gap-1.5 rounded-full px-3 py-1 border border-white/8 bg-white/4"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: p.status === "Optimal" || p.status === "Healthy" ? "#8DFFD2" : "#7CF7FF",
                    boxShadow: `0 0 4px ${p.status === "Optimal" || p.status === "Healthy" ? "#8DFFD2" : "#7CF7FF"}`,
                  }}
                  aria-hidden="true"
                />
                <span className="text-[9px] text-[rgba(244,247,251,0.55)] font-medium">{p.label}</span>
                <span className="text-[9px] font-semibold" style={{
                  color: p.status === "Optimal" || p.status === "Healthy" ? "#8DFFD2" : "#7CF7FF"
                }}>{p.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating mini cards */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        className="absolute -top-8 -right-8 liquid-glass-soft rounded-2xl p-4 w-44 border border-white/12"
        style={{ transform: "rotateX(-4deg) rotateY(8deg) translateZ(32px)" }}
        aria-hidden="true"
      >
        <div className="text-[9px] text-[rgba(244,247,251,0.45)] uppercase tracking-wider mb-2">Today's Pipeline</div>
        <div className="text-xl font-display font-bold text-[#F4F7FB]">$1.2M</div>
        <div className="text-[10px] text-[#8DFFD2] mt-1">↑ 8.3% this week</div>
        <div className="mt-3 h-1 rounded-full bg-white/8 overflow-hidden">
          <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#4AA8FF] to-[#7CF7FF]" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 0.8 }}
        className="absolute -bottom-6 -left-10 liquid-glass-soft rounded-2xl p-4 w-40 border border-white/12"
        style={{ transform: "rotateX(2deg) rotateY(-8deg) translateZ(24px)" }}
        aria-hidden="true"
      >
        <div className="text-[9px] text-[rgba(244,247,251,0.45)] uppercase tracking-wider mb-2">Automation</div>
        <div className="text-xl font-display font-bold text-[#4AA8FF]">247</div>
        <div className="text-[10px] text-[rgba(244,247,251,0.55)] mt-1">Active workflows</div>
        <div className="flex gap-0.5 mt-3" aria-hidden="true">
          {[85, 60, 92, 78, 95, 70, 88].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${h * 0.28}px`, background: "rgba(74,168,255,0.55)" }}
            />
          ))}
        </div>
      </motion.div>

      {/* Orbit dots */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: "translateZ(48px)" }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-dashed border-white/6"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#4AA8FF] shadow-[0_0_8px_#4AA8FF]" />
        </motion.div>
      </div>
    </div>
  );
}
