"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  companySize: string;
  message: string;
  privacy: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  privacy?: string;
}

export default function DemoModal({ open, onClose }: DemoModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    role: "",
    companySize: "",
    message: "",
    privacy: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) {
      e.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email";
    }
    if (!form.company.trim()) e.company = "Company is required";
    if (!form.privacy) e.privacy = "Please agree to continue";
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
    }, 1000);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", company: "", role: "", companySize: "", message: "", privacy: false });
      setErrors({});
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="h-14 w-14 text-[#8DFFD2]" />
            </div>
            <DialogTitle className="text-2xl">Request received</DialogTitle>
            <p className="text-[rgba(244,247,251,0.68)] text-sm leading-relaxed">
              Thank you. A member of our team will reach out within one business day to schedule your personalised walkthrough.
            </p>
            <Button onClick={handleClose} className="mt-4 w-full">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Request a demo</DialogTitle>
              <DialogDescription>
                Book a personalised walkthrough of the Nexus platform tailored to your team and use case.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="demo-name">
                    Full name <span className="text-[#FF6B7A]" aria-hidden="true">*</span>
                  </Label>
                  <Input
                    id="demo-name"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                    aria-required="true"
                    aria-describedby={errors.name ? "demo-name-error" : undefined}
                    className={errors.name ? "border-[#FF6B7A]" : ""}
                  />
                  {errors.name && (
                    <p id="demo-name-error" className="text-xs text-[#FF6B7A]" role="alert">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="demo-email">
                    Work email <span className="text-[#FF6B7A]" aria-hidden="true">*</span>
                  </Label>
                  <Input
                    id="demo-email"
                    type="email"
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                    aria-required="true"
                    aria-describedby={errors.email ? "demo-email-error" : undefined}
                    className={errors.email ? "border-[#FF6B7A]" : ""}
                  />
                  {errors.email && (
                    <p id="demo-email-error" className="text-xs text-[#FF6B7A]" role="alert">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="demo-company">
                    Company <span className="text-[#FF6B7A]" aria-hidden="true">*</span>
                  </Label>
                  <Input
                    id="demo-company"
                    placeholder="Acme Corp"
                    value={form.company}
                    onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))}
                    aria-required="true"
                    className={errors.company ? "border-[#FF6B7A]" : ""}
                  />
                  {errors.company && (
                    <p className="text-xs text-[#FF6B7A]" role="alert">{errors.company}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="demo-role">Role</Label>
                  <Input
                    id="demo-role"
                    placeholder="Head of Operations"
                    value={form.role}
                    onChange={(e) => setForm(f => ({ ...f, role: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="demo-size">Company size</Label>
                <select
                  id="demo-size"
                  value={form.companySize}
                  onChange={(e) => setForm(f => ({ ...f, companySize: e.target.value }))}
                  className="flex h-11 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-sm text-[#F4F7FB] focus-visible:outline-none focus-visible:border-[#4AA8FF] transition-colors"
                >
                  <option value="" className="bg-[#080B14]">Select company size</option>
                  <option value="1-10" className="bg-[#080B14]">1–10 employees</option>
                  <option value="11-50" className="bg-[#080B14]">11–50 employees</option>
                  <option value="51-200" className="bg-[#080B14]">51–200 employees</option>
                  <option value="201-1000" className="bg-[#080B14]">201–1,000 employees</option>
                  <option value="1000+" className="bg-[#080B14]">1,000+ employees</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="demo-message">Message</Label>
                <Textarea
                  id="demo-message"
                  placeholder="Tell us about your platform needs or any questions you have..."
                  value={form.message}
                  onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form.privacy}
                    onChange={(e) => setForm(f => ({ ...f, privacy: e.target.checked }))}
                    className="mt-0.5 rounded border-white/20 bg-white/5 text-[#4AA8FF] focus:ring-[#4AA8FF] cursor-pointer"
                    aria-required="true"
                    aria-describedby={errors.privacy ? "privacy-error" : undefined}
                  />
                  <span className="text-xs text-[rgba(244,247,251,0.55)] leading-relaxed group-hover:text-[rgba(244,247,251,0.75)] transition-colors">
                    I agree to the{" "}
                    <a href="/privacy-policy" className="text-[#4AA8FF] hover:underline" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </a>{" "}
                    and consent to being contacted about Nexus products and services.{" "}
                    <span className="text-[#FF6B7A]" aria-hidden="true">*</span>
                  </span>
                </label>
                {errors.privacy && (
                  <p id="privacy-error" className="text-xs text-[#FF6B7A]" role="alert">{errors.privacy}</p>
                )}
              </div>

              <Button type="submit" className="w-full h-12" disabled={loading}>
                {loading ? "Sending..." : "Submit request"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
