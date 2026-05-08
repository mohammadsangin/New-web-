import Hero from "@/components/home/Hero";
import PlatformSolutions from "@/components/home/PlatformSolutions";
import Advantages from "@/components/home/Advantages";
import TrustSection from "@/components/home/TrustSection";
import BlogPreview from "@/components/home/BlogPreview";
import FinalCTA from "@/components/home/FinalCTA";
import FAQAccordion from "@/components/sections/FAQAccordion";
import SectionBadge from "@/components/sections/SectionBadge";
import { faqItems } from "@/data/faq";

export default function HomePage() {
  const homeFAQ = faqItems.slice(0, 8);

  return (
    <>
      <Hero />
      <PlatformSolutions />
      <Advantages />
      <TrustSection />

      {/* FAQ preview section */}
      <section
        className="relative py-24 overflow-hidden bg-[#030509]"
        aria-labelledby="home-faq-heading"
      >
        <div
          className="glow-field rounded-full"
          style={{
            width: "500px", height: "300px",
            top: "0", left: "50%", transform: "translateX(-50%)",
            background: "radial-gradient(circle, rgba(74,168,255,0.10), transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[1180px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <SectionBadge className="mb-6">Quick answers</SectionBadge>
              <h2
                className="section-headline text-[#F4F7FB]"
                style={{ fontSize: "clamp(36px,4vw,64px)" }}
                id="home-faq-heading"
              >
                Quick answers.<br />Real clarity.
              </h2>
              <p className="mt-5 text-[rgba(244,247,251,0.55)] leading-relaxed max-w-[340px]">
                Everything you need to know about the Nexus platform, modules, and getting started.
              </p>
            </div>
            <FAQAccordion items={homeFAQ} />
          </div>
        </div>
      </section>

      <BlogPreview />
      <FinalCTA />
    </>
  );
}
