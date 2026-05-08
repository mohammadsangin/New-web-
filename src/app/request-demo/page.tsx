"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SectionBadge from "@/components/sections/SectionBadge";
import GlowBackground from "@/components/sections/GlowBackground";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const benefits = [
  "Personalised platform walkthrough — not a generic demo",
  "Tailored to your industry, team size, and challenges",
  "No commitment required",
  "Response within one business day",
  "Meet the implementation team you will actually work with",
];

const stats = [
  { value: "48h", label: "Average time to first go-live" },
  { value: "4.8×", label: "Operations efficiency gain" },
  { value: "99.95%", label: "Platform uptime target" },
  { value: "1,200+", label: "Teams on Nexus" },
];

export default function RequestDemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", company: "", role: "",
    companySize: "", message: "", privacy: false,
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; company?: string; privacy?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.company.trim()) e.company = "Required";
    if (!form.privacy) e.privacy = "Please agree to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1000);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-12 overflow-hidden">
        <GlowBackground variant="hero" />
        <div className="relative z-10 max-w-[1180px] mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUp} className="mb-6">
              <SectionBadge>Request a demo</SectionBadge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="hero-headline text-[#F4F7FB]"
              style={{ fontSize: "clamp(48px,5.5vw,88px)" }}
            >
              See Nexus in action.
            </motion.h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1180px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: persuasive copy */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer}
            className="lg:sticky lg:top-28"
          >
            <motion.h2
              variants={fadeUp}
              className="font-display font-bold text-[#F4F7FB] mb-6"
              style={{ fontSize: "clamp(28px,3vw,48px)", letterSpacing: "-0.04em" }}
            >
              A personalised walkthrough.<br />No fluff. Real answers.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[rgba(244,247,251,0.6)] leading-relaxed mb-8">
              Our demos are not scripted sales pitches. We will show you the exact modules that solve your operational challenges and give you a realistic picture of what implementation looks like.
            </motion.p>
            <motion.ul variants={staggerContainer} className="space-y-3 mb-10">
              {benefits.map((b) => (
                <motion.li key={b} variants={fadeUp} className="flex items-start gap-3 text-sm text-[rgba(244,247,251,0.55)]">
                  <CheckCircle2 className="h-4 w-4 text-[#4AA8FF] mt-0.5 shrink-0" aria-hidden="true" />
                  {b}
                </motion.li>
              ))}
            </motion.ul>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-5">
              {stats.map((s) => (
                <div key={s.label} className="liquid-glass-soft rounded-xl p-5">
                  <div className="font-display font-bold text-2xl text-[#4AA8FF] mb-1">{s.value}</div>
                  <div className="text-xs text-[rgba(244,247,251,0.48)]">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
          >
            <div className="liquid-glass rounded-2xl p-8 sm:p-10">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <CheckCircle2 className="h-14 w-14 text-[#8DFFD2] mx-auto" />
                  <h3 className="font-display font-bold text-2xl text-[#F4F7FB]">Request received</h3>
                  <p className="text-[rgba(244,247,251,0.6)] text-sm leading-relaxed">
                    Thank you. We will reach out within one business day to confirm your demo time.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="rd-name">Full name <span className="text-[#FF6B7A]" aria-hidden="true">*</span></Label>
                      <Input id="rd-name" placeholder="Jane Smith" value={form.name}
                        onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                        className={errors.name ? "border-[#FF6B7A]" : ""} />
                      {errors.name && <p className="text-xs text-[#FF6B7A]" role="alert">{errors.name}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="rd-email">Work email <span className="text-[#FF6B7A]" aria-hidden="true">*</span></Label>
                      <Input id="rd-email" type="email" placeholder="jane@company.com" value={form.email}
                        onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                        className={errors.email ? "border-[#FF6B7A]" : ""} />
                      {errors.email && <p className="text-xs text-[#FF6B7A]" role="alert">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="rd-company">Company <span className="text-[#FF6B7A]" aria-hidden="true">*</span></Label>
                      <Input id="rd-company" placeholder="Acme Corp" value={form.company}
                        onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))}
                        className={errors.company ? "border-[#FF6B7A]" : ""} />
                      {errors.company && <p className="text-xs text-[#FF6B7A]" role="alert">{errors.company}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="rd-role">Role</Label>
                      <Input id="rd-role" placeholder="Head of Operations" value={form.role}
                        onChange={(e) => setForm(f => ({ ...f, role: e.target.value }))} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="rd-size">Company size</Label>
                    <select id="rd-size" value={form.companySize}
                      onChange={(e) => setForm(f => ({ ...f, companySize: e.target.value }))}
                      className="flex h-11 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-sm text-[#F4F7FB] focus-visible:outline-none focus-visible:border-[#4AA8FF] transition-colors">
                      <option value="" className="bg-[#080B14]">Select company size</option>
                      <option value="1-10" className="bg-[#080B14]">1–10 employees</option>
                      <option value="11-50" className="bg-[#080B14]">11–50 employees</option>
                      <option value="51-200" className="bg-[#080B14]">51–200 employees</option>
                      <option value="201-1000" className="bg-[#080B14]">201–1,000 employees</option>
                      <option value="1000+" className="bg-[#080B14]">1,000+ employees</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="rd-message">What are you trying to solve?</Label>
                    <Textarea id="rd-message" rows={4}
                      placeholder="Tell us about your current setup, challenges, or what you are hoping to achieve with Nexus..."
                      value={form.message}
                      onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={form.privacy}
                        onChange={(e) => setForm(f => ({ ...f, privacy: e.target.checked }))}
                        className="mt-0.5 rounded border-white/20 bg-white/5 text-[#4AA8FF] focus:ring-[#4AA8FF]"
                        aria-required="true" />
                      <span className="text-xs text-[rgba(244,247,251,0.55)] leading-relaxed">
                        I agree to the{" "}
                        <a href="/privacy-policy" className="text-[#4AA8FF] hover:underline">Privacy Policy</a>
                        {" "}and consent to being contacted about Nexus.{" "}
                        <span className="text-[#FF6B7A]" aria-hidden="true">*</span>
                      </span>
                    </label>
                    {errors.privacy && <p className="text-xs text-[#FF6B7A]" role="alert">{errors.privacy}</p>}
                  </div>
                  <Button type="submit" size="lg" className="w-full gap-2" disabled={loading}>
                    {loading ? "Submitting..." : "Request your demo"}
                    {!loading && <ArrowRight className="h-4 w-4" />}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
