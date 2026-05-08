"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlowBackground from "@/components/sections/GlowBackground";
import DemoModal from "@/components/sections/DemoModal";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const FloatingCard = ({ delay, x, y, content }: { delay: number; x: number; y: number; content: React.ReactNode }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ repeat: Infinity, duration: 4 + delay, ease: "easeInOut", delay }}
    className="absolute liquid-glass-soft rounded-2xl p-4 border border-white/10 hidden lg:block pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%` }}
    aria-hidden="true"
  >
    {content}
  </motion.div>
);

export default function FinalCTA() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section
        className="relative py-32 overflow-hidden bg-[#030509]"
        aria-labelledby="cta-heading"
      >
        <GlowBackground variant="cta" />
        <div className="absolute inset-0 grid-texture opacity-15" aria-hidden="true" />

        {/* Floating background cards */}
        <FloatingCard delay={0} x={5} y={20} content={
          <div className="w-40 space-y-2">
            <div className="text-[9px] text-[rgba(244,247,251,0.4)] uppercase tracking-wider">Active workflows</div>
            <div className="text-xl font-bold font-display text-[#4AA8FF]">247</div>
            <div className="h-1 rounded-full bg-white/8 overflow-hidden">
              <div className="h-full w-[82%] rounded-full bg-[#4AA8FF]" />
            </div>
          </div>
        } />
        <FloatingCard delay={1.2} x={72} y={12} content={
          <div className="w-36 space-y-2">
            <div className="text-[9px] text-[rgba(244,247,251,0.4)] uppercase tracking-wider">Uptime</div>
            <div className="text-xl font-bold font-display text-[#8DFFD2]">99.97%</div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DFFD2] shadow-[0_0_4px_#8DFFD2]" />
              <span className="text-[9px] text-[#8DFFD2]">All systems nominal</span>
            </div>
          </div>
        } />
        <FloatingCard delay={0.6} x={80} y={55} content={
          <div className="w-40 space-y-2">
            <div className="text-[9px] text-[rgba(244,247,251,0.4)] uppercase tracking-wider">Pipeline</div>
            <div className="text-xl font-bold font-display text-[#7CF7FF]">$2.4M</div>
            <div className="text-[9px] text-[rgba(244,247,251,0.4)]">This quarter</div>
          </div>
        } />

        {/* Main content */}
        <div className="relative z-10 max-w-[1180px] mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-[rgba(244,247,251,0.38)] mb-8">
              Start today
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="section-headline text-[#F4F7FB] mx-auto mb-8"
              style={{ maxWidth: "800px" }}
              id="cta-heading"
            >
              Ready to build your{" "}
              <span className="text-gradient">command centre?</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-xl text-[rgba(244,247,251,0.55)] max-w-[520px] mx-auto mb-12 leading-relaxed"
            >
              Book a tailored walkthrough and see how Nexus can connect your systems, teams, and growth engine.
            </motion.p>

            {/* CTA panel */}
            <motion.div variants={fadeUp} className="flex justify-center">
              <div className="liquid-glass rounded-3xl p-8 sm:p-10 max-w-xl w-full">
                {/* Inner glow */}
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(74,168,255,0.12), transparent 60%)" }}
                  aria-hidden="true"
                />
                <div className="relative space-y-4">
                  <Button
                    size="xl"
                    className="w-full gap-2.5"
                    onClick={() => setDemoOpen(true)}
                  >
                    Request a demo
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    size="xl"
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <Link href="/contact">Contact sales</Link>
                  </Button>
                  <p className="text-xs text-[rgba(244,247,251,0.35)] text-center pt-2">
                    No commitment required. Response within one business day.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
