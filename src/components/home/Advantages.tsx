"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import SectionBadge from "@/components/sections/SectionBadge";
import GlowBackground from "@/components/sections/GlowBackground";
import { advantages } from "@/data/advantages";
import { fadeUp, fadeRight, fadeLeft, staggerContainer, viewportOnce } from "@/lib/motion";

const AdvantageVisual = ({ index, accentColor }: { index: number; accentColor: string }) => {
  if (index === 0) {
    return (
      <div className="relative w-full h-full min-h-[220px] rounded-2xl overflow-hidden liquid-glass p-5 space-y-3">
        <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at 20% 0%, ${accentColor}20, transparent 55%)` }} aria-hidden="true" />
        <div className="relative text-[9px] text-[rgba(244,247,251,0.4)] uppercase tracking-widest mb-3">Workflow status</div>
        {[
          { name: "Customer onboarding", progress: 92, status: "Active" },
          { name: "Approval routing", progress: 78, status: "Active" },
          { name: "Billing cycle", progress: 65, status: "Queued" },
          { name: "Report generation", progress: 100, status: "Done" },
        ].map((w) => (
          <div key={w.name} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[rgba(244,247,251,0.6)]">{w.name}</span>
              <span className="text-[9px] font-semibold" style={{ color: w.status === "Done" ? "#8DFFD2" : accentColor }}>{w.status}</span>
            </div>
            <div className="h-1 rounded-full bg-white/8 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${w.progress}%`, background: w.status === "Done" ? "#8DFFD2" : accentColor }} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="relative w-full h-full min-h-[220px] rounded-2xl overflow-hidden liquid-glass p-5">
        <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 80% 0%, ${accentColor}18, transparent 55%)` }} aria-hidden="true" />
        <div className="text-[9px] text-[rgba(244,247,251,0.4)] uppercase tracking-widest mb-4">Scale overview</div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Markets", value: "12", trend: "+3 YTD" },
            { label: "Users", value: "8.2K", trend: "+340%" },
            { label: "Data points", value: "2.1B", trend: "+88%" },
            { label: "Modules", value: "40+", trend: "Modular" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-white/5 border border-white/8 p-3">
              <div className="text-[9px] text-[rgba(244,247,251,0.4)] mb-1">{s.label}</div>
              <div className="text-base font-display font-bold" style={{ color: accentColor }}>{s.value}</div>
              <div className="text-[9px] text-[rgba(244,247,251,0.35)] mt-0.5">{s.trend}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="relative w-full h-full min-h-[220px] rounded-2xl overflow-hidden liquid-glass p-5">
      <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 50% 0%, ${accentColor}18, transparent 55%)` }} aria-hidden="true" />
      <div className="text-[9px] text-[rgba(244,247,251,0.4)] uppercase tracking-widest mb-4">Platform metrics</div>
      <div className="space-y-3">
        {[
          { label: "Response time", value: "< 90ms", max: 95 },
          { label: "Automation rate", value: "94%", max: 94 },
          { label: "Integration health", value: "100%", max: 100 },
          { label: "Permission coverage", value: "Full", max: 100 },
        ].map((m) => (
          <div key={m.label} className="flex items-center justify-between gap-4">
            <span className="text-[11px] text-[rgba(244,247,251,0.55)] w-36 shrink-0">{m.label}</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${m.max}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${accentColor}, #7CF7FF)` }}
              />
            </div>
            <span className="text-[10px] font-semibold w-14 text-right shrink-0" style={{ color: accentColor }}>{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const accentColors = ["#4AA8FF", "#7CF7FF", "#8DFFD2"];

export default function Advantages() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #05070D, #040610)" }}
      aria-labelledby="advantages-heading"
    >
      <GlowBackground variant="section" />

      <div className="relative z-10 max-w-[1180px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <SectionBadge variant="cyan">Advantages</SectionBadge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="section-headline text-[#F4F7FB] max-w-[640px]"
            id="advantages-heading"
          >
            Built for teams that cannot afford slow systems.
          </motion.h2>
        </motion.div>

        <div className="space-y-20">
          {advantages.map((adv, idx) => (
            <motion.div
              key={adv.number}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Text side */}
              <motion.div
                variants={idx % 2 === 0 ? fadeRight : fadeLeft}
                className={idx % 2 === 1 ? "lg:order-2" : ""}
              >
                <div className="flex items-start gap-4 mb-6">
                  <span
                    className="text-5xl font-display font-bold leading-none tracking-tight opacity-20 select-none"
                    style={{ color: accentColors[idx] }}
                    aria-hidden="true"
                  >
                    {adv.number}
                  </span>
                  <div>
                    <h3
                      className="font-display font-bold text-[clamp(32px,3.5vw,52px)] text-[#F4F7FB] tracking-tight leading-none"
                      style={{ color: accentColors[idx] }}
                    >
                      {adv.title}
                    </h3>
                  </div>
                </div>
                <p className="text-lg text-[rgba(244,247,251,0.65)] leading-relaxed max-w-[480px] mb-8">
                  {adv.body}
                </p>
                <ul className="space-y-3" aria-label={`${adv.title} features`}>
                  {adv.bullets.map((b) => (
                    <motion.li
                      key={b}
                      variants={fadeUp}
                      className="flex items-start gap-3 text-sm text-[rgba(244,247,251,0.55)]"
                    >
                      <CheckCircle2
                        className="h-4 w-4 mt-0.5 shrink-0"
                        style={{ color: accentColors[idx] }}
                        aria-hidden="true"
                      />
                      {b}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Visual side */}
              <motion.div
                variants={idx % 2 === 0 ? fadeLeft : fadeRight}
                whileHover={{ rotateY: 2, rotateX: -1, scale: 1.01 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={idx % 2 === 1 ? "lg:order-1" : ""}
                style={{ transformStyle: "preserve-3d", perspective: "800px" }}
              >
                <AdvantageVisual index={idx} accentColor={accentColors[idx]} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
