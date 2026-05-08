"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/data/nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onOpenDemo: () => void;
}

export default function MobileMenu({ open, onClose, onOpenDemo }: MobileMenuProps) {
  const pathname = usePathname();

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#05070D]/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[#080B14]/98 backdrop-blur-2xl border-l border-white/10 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <Link
                href="/"
                className="font-display font-bold text-lg text-[#F4F7FB] tracking-tight"
                onClick={onClose}
              >
                Nexus<span className="text-[#4AA8FF]">.</span>
              </Link>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-[rgba(244,247,251,0.48)] hover:text-[#F4F7FB] hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4AA8FF]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-6 py-8 space-y-1" aria-label="Mobile navigation links">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-colors",
                        isActive
                          ? "text-[#F4F7FB] bg-white/8 border border-white/10"
                          : "text-[rgba(244,247,251,0.68)] hover:text-[#F4F7FB] hover:bg-white/6"
                      )}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4AA8FF] shrink-0 shadow-[0_0_6px_#4AA8FF]" aria-hidden="true" />
                      )}
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="px-6 py-8 border-t border-white/8 space-y-3">
              <Button
                onClick={() => { onClose(); onOpenDemo(); }}
                className="w-full h-13"
                size="lg"
              >
                Request a demo
              </Button>
              <Button
                variant="outline"
                className="w-full h-12"
                asChild
              >
                <Link href="/solutions" onClick={onClose}>
                  Explore solutions
                </Link>
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
