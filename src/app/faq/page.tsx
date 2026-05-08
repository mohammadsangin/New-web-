"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionBadge from "@/components/sections/SectionBadge";
import GlowBackground from "@/components/sections/GlowBackground";
import FAQAccordion from "@/components/sections/FAQAccordion";
import DemoModal from "@/components/sections/DemoModal";
import { faqItems, faqCategories } from "@/data/faq";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [demoOpen, setDemoOpen] = useState(false);

  const filtered = activeCategory === "All"
    ? faqItems
    : faqItems.filter((item) => item.category === activeCategory);

  const grouped = faqCategories
    .filter((c) => c !== "All")
    .map((cat) => ({
      category: cat,
      items: faqItems.filter((i) => i.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <GlowBackground variant="hero" />
        <div className="relative z-10 max-w-[1180px] mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUp} className="mb-6">
              <SectionBadge>FAQ</SectionBadge>
            </motion.div>
            <motion.h1 variants={fadeUp} className="hero-headline text-[#F4F7FB] mb-6" style={{ fontSize: "clamp(48px,6vw,96px)" }}>
              Questions, answered.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-[rgba(244,247,251,0.6)] max-w-[460px] leading-relaxed">
              Everything you need to know about the Nexus platform, modules, security, and getting started.
            </motion.p>

            {/* Search visual — decorative */}
            <motion.div variants={fadeUp} className="mt-10 max-w-md">
              <div className="relative flex items-center gap-3 px-5 py-3.5 rounded-xl border border-white/12 bg-white/5 text-[rgba(244,247,251,0.35)]">
                <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="text-sm">Search questions...</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1180px] mx-auto px-6 pb-24">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-14" role="tablist" aria-label="FAQ categories">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4AA8FF] ${
                activeCategory === cat
                  ? "bg-[#4AA8FF] text-[#05070D]"
                  : "bg-white/5 border border-white/12 text-[rgba(244,247,251,0.55)] hover:text-[#F4F7FB]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {activeCategory === "All" ? (
          /* Grouped by category */
          <div className="space-y-16">
            {grouped.map((group) => (
              <motion.section
                key={group.category}
                initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer}
                aria-labelledby={`faq-cat-${group.category}`}
              >
                <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                  <h2
                    className="font-display font-bold text-xl text-[#F4F7FB]"
                    id={`faq-cat-${group.category}`}
                  >
                    {group.category}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-white/6 border border-white/10 text-xs text-[rgba(244,247,251,0.45)]">
                    {group.items.length}
                  </span>
                </motion.div>
                <FAQAccordion items={group.items} />
              </motion.section>
            ))}
          </div>
        ) : (
          /* Filtered */
          <div>
            <motion.p
              initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
              className="text-sm text-[rgba(244,247,251,0.45)] mb-8"
            >
              {filtered.length} question{filtered.length !== 1 ? "s" : ""} in {activeCategory}
            </motion.p>
            <FAQAccordion items={filtered} />
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
          className="mt-20 liquid-glass rounded-2xl p-10 text-center"
        >
          <div className="relative">
            <h3 className="font-display font-bold text-2xl text-[#F4F7FB] mb-4">
              Still have questions?
            </h3>
            <p className="text-[rgba(244,247,251,0.55)] mb-8 max-w-[380px] mx-auto text-sm">
              Our team is happy to answer anything not covered here. Book a demo or send us a message.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={() => setDemoOpen(true)}>
                Request a demo <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
