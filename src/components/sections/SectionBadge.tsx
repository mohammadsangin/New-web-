import React from "react";
import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "blue" | "cyan" | "mint";
}

export default function SectionBadge({ children, className, variant = "blue" }: SectionBadgeProps) {
  const colors = {
    blue: "border-[#4AA8FF]/30 bg-[#4AA8FF]/8 text-[#4AA8FF]",
    cyan: "border-[#7CF7FF]/30 bg-[#7CF7FF]/8 text-[#7CF7FF]",
    mint: "border-[#8DFFD2]/30 bg-[#8DFFD2]/8 text-[#8DFFD2]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-widest uppercase",
        colors[variant],
        className
      )}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: variant === "blue" ? "#4AA8FF" : variant === "cyan" ? "#7CF7FF" : "#8DFFD2",
          boxShadow: `0 0 6px ${variant === "blue" ? "#4AA8FF" : variant === "cyan" ? "#7CF7FF" : "#8DFFD2"}`,
        }}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
