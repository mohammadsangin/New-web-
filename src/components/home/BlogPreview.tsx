"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionBadge from "@/components/sections/SectionBadge";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blog";
import { fadeUp, staggerContainer, viewportOnce, easeOutExpo } from "@/lib/motion";

export default function BlogPreview() {
  const featured = blogPosts.slice(0, 3);

  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #040610, #05070D)" }}
      aria-labelledby="blog-heading"
    >
      {/* Section glow */}
      <div
        className="glow-field rounded-full"
        style={{
          width: "500px", height: "350px",
          top: "0", left: "50%", transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(124,247,255,0.10), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1180px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <motion.div variants={fadeUp} className="mb-6">
              <SectionBadge variant="cyan">Latest thinking</SectionBadge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="section-headline text-[#F4F7FB] max-w-[500px]"
              id="blog-heading"
            >
              Platform insights.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-[rgba(244,247,251,0.55)] max-w-[420px]">
              Insights on platform operations, automation, growth systems, and modern B2B infrastructure.
            </motion.p>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm font-semibold text-[rgba(244,247,251,0.55)] hover:text-[#4AA8FF] transition-colors group whitespace-nowrap"
            >
              All articles
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {featured.map((post) => (
            <motion.article
              key={post.slug}
              variants={fadeUp}
              className="group"
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="liquid-glass rounded-2xl overflow-hidden flex flex-col h-full hover:border-white/20 transition-colors duration-300">
                  {/* Image placeholder */}
                  <div
                    className="relative h-[180px] overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${post.gradientFrom}, ${post.gradientTo})`,
                    }}
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 grid-texture opacity-20" />
                    <motion.div
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.5, ease: easeOutExpo }}
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(135deg, ${post.gradientFrom}, ${post.gradientTo})` }}
                    />
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="text-[10px]">{post.category}</Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs text-[rgba(244,247,251,0.38)]">{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" aria-hidden="true" />
                      <span className="text-xs text-[rgba(244,247,251,0.38)]">{post.readTime}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#F4F7FB] tracking-tight leading-tight mb-3 group-hover:text-[#7CF7FF] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[rgba(244,247,251,0.55)] leading-relaxed flex-1 mb-5">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[rgba(244,247,251,0.45)] group-hover:text-[#4AA8FF] transition-colors">
                      Read article
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
