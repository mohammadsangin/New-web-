"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionBadge from "@/components/sections/SectionBadge";
import GlowBackground from "@/components/sections/GlowBackground";
import { blogPosts } from "@/data/blog";
import { fadeUp, staggerContainer, viewportOnce, easeOutExpo } from "@/lib/motion";

const categories = ["All", "Platform Thinking", "Product Strategy", "Operations", "Engineering", "Analytics", "Product Design"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <GlowBackground variant="hero" />
        <div className="relative z-10 max-w-[1180px] mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUp} className="mb-6">
              <SectionBadge>Blog</SectionBadge>
            </motion.div>
            <motion.h1 variants={fadeUp} className="hero-headline text-[#F4F7FB] mb-5" style={{ fontSize: "clamp(48px,6vw,96px)" }}>
              Latest thinking.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-[rgba(244,247,251,0.6)] max-w-[480px]">
              Insights on platform operations, automation, growth systems, and modern B2B infrastructure.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Category filters */}
      <div className="sticky top-[88px] z-20 bg-[#05070D]/90 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-[1180px] mx-auto px-6 py-4 flex gap-2 overflow-x-auto no-scrollbar" role="tablist" aria-label="Blog categories">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4AA8FF] ${
                activeCategory === cat
                  ? "bg-[#4AA8FF] text-[#05070D]"
                  : "bg-white/5 text-[rgba(244,247,251,0.55)] border border-white/10 hover:text-[#F4F7FB]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-6 py-16 space-y-16">
        {/* Featured post */}
        {featured && (
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="liquid-glass rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 hover:border-white/20 transition-colors">
                <div
                  className="relative h-[260px] lg:h-auto min-h-[260px]"
                  style={{ background: `linear-gradient(135deg, ${featured.gradientFrom}, ${featured.gradientTo})` }}
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 grid-texture opacity-20" />
                  <div className="absolute top-6 left-6">
                    <Badge variant="secondary">{featured.category}</Badge>
                  </div>
                </div>
                <div className="p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4 text-xs text-[rgba(244,247,251,0.4)]">
                    <span>{featured.date}</span>
                    <span>·</span>
                    <span>{featured.readTime}</span>
                  </div>
                  <h2 className="font-display font-bold text-2xl text-[#F4F7FB] tracking-tight mb-4 group-hover:text-[#7CF7FF] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-[rgba(244,247,251,0.55)] text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[rgba(244,247,251,0.45)] group-hover:text-[#4AA8FF] transition-colors">
                    Read article <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Post grid */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={viewportOnce}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Blog posts"
        >
          {rest.map((post) => (
            <motion.article key={post.slug} variants={fadeUp} role="listitem">
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="liquid-glass rounded-2xl overflow-hidden flex flex-col h-full hover:border-white/18 transition-colors">
                  <div
                    className="h-[160px] relative"
                    style={{ background: `linear-gradient(135deg, ${post.gradientFrom}, ${post.gradientTo})` }}
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 grid-texture opacity-20" />
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="text-[10px]">{post.category}</Badge>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-xs text-[rgba(244,247,251,0.38)] mb-3 flex items-center gap-2">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#F4F7FB] tracking-tight mb-3 group-hover:text-[#7CF7FF] transition-colors flex-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[rgba(244,247,251,0.5)] leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[rgba(244,247,251,0.4)] group-hover:text-[#4AA8FF] transition-colors">
                      Read <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
          className="liquid-glass rounded-2xl p-10 text-center"
        >
          <div
            className="absolute inset-0 rounded-2xl"
            style={{ background: "radial-gradient(circle at 50% 0%, rgba(74,168,255,0.10), transparent 60%)" }}
            aria-hidden="true"
          />
          <div className="relative">
            <h3 className="font-display font-bold text-2xl text-[#F4F7FB] mb-3">Stay current on platform thinking.</h3>
            <p className="text-[rgba(244,247,251,0.55)] mb-8 max-w-[400px] mx-auto text-sm">
              New articles on operations, automation, and B2B platform strategy — delivered to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-3 max-w-md mx-auto"
              aria-label="Newsletter signup"
            >
              <Input type="email" placeholder="Your work email" className="flex-1" aria-label="Work email" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}
