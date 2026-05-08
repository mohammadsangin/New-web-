"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { navLinks } from "@/data/nav";
import { Button } from "@/components/ui/button";
import MobileMenu from "@/components/layout/MobileMenu";
import DemoModal from "@/components/sections/DemoModal";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 right-0 z-30 flex justify-center pointer-events-none"
        style={{ top: scrolled ? "10px" : "18px", transition: "top 0.3s ease" }}
        role="banner"
      >
        <nav
          className={cn(
            "pointer-events-auto flex items-center justify-between px-5 transition-all duration-300",
            "liquid-glass rounded-full",
            scrolled ? "h-[58px] border-white/20" : "h-[68px]"
          )}
          style={{ width: "min(1180px, calc(100vw - 32px))" }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-bold text-lg text-[#F4F7FB] tracking-tight shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4AA8FF] rounded-md"
          >
            Nexus<span className="text-[#4AA8FF]">.</span>
          </Link>

          {/* Center links — desktop */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                      isActive
                        ? "text-[#F4F7FB]"
                        : "text-[rgba(244,247,251,0.68)] hover:text-[#F4F7FB] hover:bg-white/6"
                    )}
                  >
                    {isActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#4AA8FF] shadow-[0_0_6px_#4AA8FF]"
                        aria-hidden="true"
                      />
                    )}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right — desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest px-3 py-1.5 rounded-full border border-white/14 bg-white/5 text-[rgba(244,247,251,0.48)]">
              EN
            </span>
            <Button
              size="sm"
              onClick={() => setDemoOpen(true)}
              className="font-semibold"
            >
              Request a demo
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden rounded-full p-2 text-[rgba(244,247,251,0.68)] hover:text-[#F4F7FB] hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4AA8FF]"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </motion.header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onOpenDemo={() => setDemoOpen(true)}
      />

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
