"use client";

import React from "react";
import Link from "next/link";
import { Linkedin, Twitter, Youtube, ArrowRight } from "lucide-react";
import { footerLinks } from "@/data/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const socialIcons: Record<string, React.ReactNode> = {
  "LinkedIn": <Linkedin className="h-4 w-4" />,
  "X / Twitter": <Twitter className="h-4 w-4" />,
  "YouTube": <Youtube className="h-4 w-4" />,
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-[#030509]" aria-label="Site footer">
      {/* Top CTA strip */}
      <div className="relative overflow-hidden border-b border-white/8">
        <div
          className="glow-field w-[500px] h-[200px] left-1/2 -translate-x-1/2 -top-10 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(74,168,255,0.18), transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-[1180px] mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[rgba(244,247,251,0.48)] mb-1">
              Platform infrastructure for modern teams
            </p>
            <p className="text-lg font-display font-bold text-[#F4F7FB] tracking-tight">
              Ready to get started?
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-2 w-full sm:w-auto"
            aria-label="Newsletter signup"
          >
            <Input
              type="email"
              placeholder="Enter your work email"
              className="w-full sm:w-72"
              aria-label="Work email for demo request"
            />
            <Button type="submit" className="shrink-0 gap-2">
              Request demo
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1180px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-display font-bold text-xl text-[#F4F7FB] tracking-tight"
            >
              Nexus<span className="text-[#4AA8FF]">.</span>
            </Link>
            <p className="mt-4 text-sm text-[rgba(244,247,251,0.48)] leading-relaxed max-w-[220px]">
              Premium B2B platform infrastructure. One system for every operation.
            </p>
            <div className="flex gap-3 mt-6">
              {footerLinks.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/12 bg-white/5 flex items-center justify-center text-[rgba(244,247,251,0.48)] hover:text-[#4AA8FF] hover:border-[#4AA8FF]/40 transition-colors"
                >
                  {socialIcons[s.label] ?? null}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[rgba(244,247,251,0.38)] mb-5">
              Company
            </h3>
            <ul className="space-y-3" role="list">
              {footerLinks.company.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-[rgba(244,247,251,0.55)] hover:text-[#4AA8FF] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[rgba(244,247,251,0.38)] mb-5">
              Solutions
            </h3>
            <ul className="space-y-3" role="list">
              {footerLinks.solutions.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-[rgba(244,247,251,0.55)] hover:text-[#4AA8FF] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[rgba(244,247,251,0.38)] mb-5">
              Resources
            </h3>
            <ul className="space-y-3" role="list">
              {footerLinks.resources.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-[rgba(244,247,251,0.55)] hover:text-[#4AA8FF] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[rgba(244,247,251,0.38)]">
            © 2026 Nexus. All rights reserved.
          </p>
          <p className="text-xs text-[rgba(244,247,251,0.28)] tracking-wide">
            Built for connected teams.
          </p>
        </div>
      </div>
    </footer>
  );
}
