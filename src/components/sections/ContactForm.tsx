"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/motion";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 space-y-4"
      >
        <CheckCircle2 className="h-14 w-14 text-[#8DFFD2] mx-auto" />
        <h3 className="font-display font-bold text-xl text-[#F4F7FB]">Message sent</h3>
        <p className="text-[rgba(244,247,251,0.68)] text-sm">
          We will get back to you within one business day.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <motion.div variants={fadeUp} className="space-y-1.5">
          <Label htmlFor="contact-name">
            Full name <span className="text-[#FF6B7A]" aria-hidden="true">*</span>
          </Label>
          <Input
            id="contact-name"
            placeholder="Jane Smith"
            value={form.name}
            onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
            aria-required="true"
            className={errors.name ? "border-[#FF6B7A]" : ""}
          />
          {errors.name && <p className="text-xs text-[#FF6B7A]" role="alert">{errors.name}</p>}
        </motion.div>
        <motion.div variants={fadeUp} className="space-y-1.5">
          <Label htmlFor="contact-email">
            Work email <span className="text-[#FF6B7A]" aria-hidden="true">*</span>
          </Label>
          <Input
            id="contact-email"
            type="email"
            placeholder="jane@company.com"
            value={form.email}
            onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
            aria-required="true"
            className={errors.email ? "border-[#FF6B7A]" : ""}
          />
          {errors.email && <p className="text-xs text-[#FF6B7A]" role="alert">{errors.email}</p>}
        </motion.div>
      </div>

      <motion.div variants={fadeUp} className="space-y-1.5">
        <Label htmlFor="contact-company">Company</Label>
        <Input
          id="contact-company"
          placeholder="Your company name"
          value={form.company}
          onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))}
        />
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-1.5">
        <Label htmlFor="contact-message">
          Message <span className="text-[#FF6B7A]" aria-hidden="true">*</span>
        </Label>
        <Textarea
          id="contact-message"
          placeholder="Tell us about your platform needs, questions, or how we can help..."
          value={form.message}
          onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
          rows={5}
          aria-required="true"
          className={errors.message ? "border-[#FF6B7A]" : ""}
        />
        {errors.message && <p className="text-xs text-[#FF6B7A]" role="alert">{errors.message}</p>}
      </motion.div>

      <motion.div variants={fadeUp}>
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
          {loading ? "Sending..." : "Send message"}
        </Button>
      </motion.div>
    </motion.form>
  );
}
