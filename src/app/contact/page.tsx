"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionBadge from "@/components/sections/SectionBadge";
import GlowBackground from "@/components/sections/GlowBackground";
import ContactForm from "@/components/sections/ContactForm";

const supportCards = [
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Email us",
    value: "hello@nexusplatform.io",
    description: "General enquiries and sales",
    color: "#4AA8FF",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    title: "Support",
    value: "support@nexusplatform.io",
    description: "Platform support and technical help",
    color: "#7CF7FF",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Headquarters",
    value: "London, United Kingdom",
    description: "Regional offices in 4 markets",
    color: "#8DFFD2",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <GlowBackground variant="hero" />
        <div className="relative z-10 max-w-[1180px] mx-auto px-6">
          <div className="mb-6">
            <SectionBadge>Get in touch</SectionBadge>
          </div>
          <h1
            className="hero-headline text-[#F4F7FB] mb-6"
            style={{ fontSize: "clamp(48px,6vw,96px)" }}
          >
            Talk to our team.
          </h1>
          <p className="text-xl text-[rgba(244,247,251,0.6)] max-w-[480px] leading-relaxed">
            Whether you have a question about the platform, want to explore a partnership, or are ready to book a demo — we would like to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-[1180px] mx-auto px-6 pb-24 space-y-16">
        {/* Support cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {supportCards.map((card) => (
            <div
              key={card.title}
              className="liquid-glass rounded-2xl p-6 group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${card.color}15`, color: card.color }}
                aria-hidden="true"
              >
                {card.icon}
              </div>
              <h3 className="font-display font-semibold text-[#F4F7FB] mb-1">{card.title}</h3>
              <p className="text-sm font-medium text-[#4AA8FF] mb-1">{card.value}</p>
              <p className="text-xs text-[rgba(244,247,251,0.45)]">{card.description}</p>
            </div>
          ))}
        </div>

        {/* Contact form area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <div>
            <h2 className="font-display font-bold text-[#F4F7FB] mb-4" style={{ fontSize: "clamp(28px,3vw,48px)", letterSpacing: "-0.04em" }}>
              Send us a message.
            </h2>
            <p className="text-[rgba(244,247,251,0.55)] leading-relaxed mb-8">
              Fill out the form and a member of our team will respond within one business day. For urgent platform support, use the support email above.
            </p>
            <div className="space-y-4">
              {[
                "Response within one business day",
                "No sales pressure — just honest conversation",
                "Tailored guidance based on your specific needs",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-[rgba(244,247,251,0.55)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4AA8FF] shrink-0" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-white/8">
              <p className="text-sm text-[rgba(244,247,251,0.45)] mb-4">Looking for a demo instead?</p>
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#4AA8FF] hover:text-[#7CF7FF] transition-colors"
              >
                Request a demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right: form */}
          <div className="liquid-glass rounded-2xl p-8">
            <ContactForm />
          </div>
        </div>

        {/* FAQ shortcut */}
        <div className="liquid-glass rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-[#F4F7FB] mb-1">Have a quick question?</h3>
            <p className="text-sm text-[rgba(244,247,251,0.55)]">Check our FAQ for instant answers on platform, pricing, and setup.</p>
          </div>
          <Link href="/faq">
            <div className="px-5 py-2.5 rounded-full border border-white/18 bg-white/6 text-sm font-semibold text-[#F4F7FB] hover:bg-white/12 transition-colors whitespace-nowrap flex items-center gap-2">
              Visit FAQ <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
