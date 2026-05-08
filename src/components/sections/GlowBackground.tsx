import React from "react";

interface GlowBackgroundProps {
  variant?: "hero" | "section" | "cta";
}

export default function GlowBackground({ variant = "section" }: GlowBackgroundProps) {
  if (variant === "hero") {
    return (
      <>
        <div
          className="glow-field rounded-full"
          style={{
            width: "900px",
            height: "600px",
            top: "-120px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(circle at 50% 0%, rgba(74,168,255,0.28), transparent 38%)",
          }}
          aria-hidden="true"
        />
        <div
          className="glow-field rounded-full"
          style={{
            width: "500px",
            height: "400px",
            top: "20%",
            right: "-100px",
            background: "radial-gradient(circle at 80% 20%, rgba(124,247,255,0.16), transparent 32%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 noise-overlay"
          aria-hidden="true"
        />
      </>
    );
  }

  if (variant === "cta") {
    return (
      <>
        <div
          className="glow-field rounded-full animate-breathe"
          style={{
            width: "700px",
            height: "500px",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(circle, rgba(74,168,255,0.32), transparent 55%)",
          }}
          aria-hidden="true"
        />
        <div
          className="glow-field rounded-full"
          style={{
            width: "400px",
            height: "300px",
            bottom: "-50px",
            right: "15%",
            background: "radial-gradient(circle, rgba(124,247,255,0.18), transparent 60%)",
          }}
          aria-hidden="true"
        />
      </>
    );
  }

  return (
    <div
      className="glow-field rounded-full"
      style={{
        width: "600px",
        height: "400px",
        top: "0",
        left: "50%",
        transform: "translateX(-50%)",
        background: "radial-gradient(circle at 50% 0%, rgba(74,168,255,0.14), transparent 55%)",
      }}
      aria-hidden="true"
    />
  );
}
