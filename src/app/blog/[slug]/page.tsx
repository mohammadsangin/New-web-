"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionBadge from "@/components/sections/SectionBadge";
import DemoModal from "@/components/sections/DemoModal";
import { blogPosts } from "@/data/blog";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";
  const post = blogPosts.find((p) => p.slug === slug);
  const [demoOpen, setDemoOpen] = useState(false);

  if (!post) {
    notFound();
  }

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const paragraphs = post.content
    .trim()
    .split("\n\n")
    .filter(Boolean);

  return (
    <>
      {/* Article hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div
          className="glow-field rounded-full"
          style={{
            width: "700px", height: "400px", top: "-50px", left: "50%", transform: "translateX(-50%)",
            background: `radial-gradient(circle, ${post.gradientFrom.replace("0.3", "0.15")}, transparent 55%)`,
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[820px] mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUp}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-[rgba(244,247,251,0.45)] hover:text-[#F4F7FB] transition-colors mb-8"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to blog
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <Badge variant="secondary">{post.category}</Badge>
              <span className="text-xs text-[rgba(244,247,251,0.38)]">{post.date}</span>
              <span className="text-xs text-[rgba(244,247,251,0.38)]">·</span>
              <span className="text-xs text-[rgba(244,247,251,0.38)]">{post.readTime}</span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-display font-bold text-[#F4F7FB] tracking-tight mb-6 leading-tight"
              style={{ fontSize: "clamp(32px,4.5vw,60px)", lineHeight: "1.05", letterSpacing: "-0.045em" }}
            >
              {post.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-[rgba(244,247,251,0.6)] leading-relaxed">
              {post.excerpt}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Hero image placeholder */}
      <div className="max-w-[820px] mx-auto px-6 mb-16">
        <div
          className="w-full h-[320px] rounded-2xl"
          style={{ background: `linear-gradient(135deg, ${post.gradientFrom}, ${post.gradientTo})` }}
          role="img"
          aria-label={`Cover image for ${post.title}`}
        >
          <div className="w-full h-full grid-texture opacity-20 rounded-2xl" aria-hidden="true" />
        </div>
      </div>

      {/* Article body */}
      <article
        className="max-w-[820px] mx-auto px-6 pb-24"
        aria-label={`Article: ${post.title}`}
      >
        <div className="prose-custom space-y-6">
          {paragraphs.map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <motion.h2
                  key={i}
                  initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
                  className="font-display font-bold text-[#F4F7FB] mt-12 mb-4"
                  style={{ fontSize: "clamp(22px,2.5vw,34px)", letterSpacing: "-0.04em" }}
                >
                  {block.replace("## ", "")}
                </motion.h2>
              );
            }
            return (
              <motion.p
                key={i}
                initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
                className="text-[rgba(244,247,251,0.68)] leading-[1.8] text-[17px]"
              >
                {block}
              </motion.p>
            );
          })}
        </div>

        {/* CTA inside article */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
          className="mt-16 liquid-glass rounded-2xl p-8 text-center"
        >
          <div className="relative">
            <SectionBadge className="mb-4 inline-block">Platform demo</SectionBadge>
            <h3 className="font-display font-bold text-2xl text-[#F4F7FB] mb-4">
              See Nexus in action.
            </h3>
            <p className="text-[rgba(244,247,251,0.55)] mb-6 max-w-[380px] mx-auto text-sm">
              Book a personalised walkthrough tailored to your team and use case.
            </p>
            <Button size="lg" onClick={() => setDemoOpen(true)}>
              Request a demo <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </motion.div>
      </article>

      {/* Related posts */}
      <section className="max-w-[1180px] mx-auto px-6 pb-24" aria-labelledby="related-heading">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer}>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-2xl text-[#F4F7FB] mb-8"
            id="related-heading"
          >
            Related articles
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((p) => (
              <motion.div key={p.slug} variants={fadeUp}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <div className="liquid-glass rounded-2xl overflow-hidden hover:border-white/18 transition-colors">
                    <div
                      className="h-[120px]"
                      style={{ background: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` }}
                      aria-hidden="true"
                    />
                    <div className="p-5">
                      <div className="text-[10px] text-[rgba(244,247,251,0.38)] mb-2">{p.date} · {p.readTime}</div>
                      <h3 className="font-display font-bold text-[#F4F7FB] text-base tracking-tight group-hover:text-[#7CF7FF] transition-colors">
                        {p.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
