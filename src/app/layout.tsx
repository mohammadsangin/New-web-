import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nexus — Premium B2B Platform Infrastructure",
    template: "%s | Nexus",
  },
  description:
    "Nexus helps modern B2B teams manage operations, workflows, analytics, customers, and growth from one premium platform built for speed, clarity, and control.",
  keywords: ["B2B platform", "operations", "workflow automation", "analytics", "enterprise"],
  openGraph: {
    type: "website",
    title: "Nexus — Premium B2B Platform Infrastructure",
    description:
      "One platform for every operation. Nexus connects your teams, workflows, and growth systems.",
    siteName: "Nexus",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus — Premium B2B Platform Infrastructure",
    description: "One platform for every operation.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-[#05070D] text-[#F4F7FB] antialiased overflow-x-hidden">
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
