import React from "react";

export const metadata = {
  title: "Privacy Policy",
};

const sections = [
  {
    heading: "1. Who we are",
    body: `Nexus Platform Ltd ("Nexus", "we", "us", or "our") is a software company providing B2B platform infrastructure services. Our registered office is in London, United Kingdom. We are the data controller for the personal information we collect through our website and platform services.

For questions about this Privacy Policy or our data practices, please contact us at privacy@nexusplatform.io.`,
  },
  {
    heading: "2. Information we collect",
    body: `We collect information you provide to us directly, including when you request a demo, create an account, contact us, or subscribe to our communications. This may include your name, work email address, company name, job role, and any information you include in messages you send us.

We also collect information automatically when you use our website and platform, including usage data, device information, IP addresses, browser type, pages visited, and interaction data. We use cookies and similar tracking technologies for this purpose.

For platform customers, we may process data you provide as part of your use of the Nexus platform. In that context, you are the data controller and we are the data processor.`,
  },
  {
    heading: "3. How we use your information",
    body: `We use the information we collect to provide and improve our services, communicate with you about our products, respond to enquiries and support requests, send marketing communications where you have given consent, comply with legal obligations, and protect the security and integrity of our platform.

We process your information on the following legal bases: performance of a contract, legitimate interests, compliance with legal obligations, and consent where you have provided it.`,
  },
  {
    heading: "4. Data sharing",
    body: `We do not sell your personal information to third parties. We may share your information with service providers who assist us in operating our business (such as cloud infrastructure providers, analytics services, and communication tools), subject to appropriate data processing agreements.

We may disclose your information where required by law, to protect our legal rights, or in connection with a merger, acquisition, or sale of assets. In such cases, we will notify you if your data becomes subject to a different privacy policy.`,
  },
  {
    heading: "5. Data retention",
    body: `We retain your personal information for as long as necessary to fulfil the purposes described in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Account data is retained for the duration of your relationship with us and for a reasonable period thereafter.

Marketing data is retained until you withdraw consent or we determine it is no longer necessary for the purposes collected.`,
  },
  {
    heading: "6. International data transfers",
    body: `Nexus operates globally and your information may be transferred to and processed in countries other than your country of residence. When we transfer data from the European Economic Area to third countries, we implement appropriate safeguards including Standard Contractual Clauses approved by the European Commission.`,
  },
  {
    heading: "7. Your rights",
    body: `Depending on your location, you may have the following rights regarding your personal information: the right to access a copy of your data, the right to correct inaccurate data, the right to request deletion of your data, the right to restrict or object to processing, the right to data portability, and the right to withdraw consent at any time.

To exercise any of these rights, please contact us at privacy@nexusplatform.io. We will respond within 30 days. You also have the right to lodge a complaint with your local supervisory authority.`,
  },
  {
    heading: "8. Cookies",
    body: `We use cookies and similar technologies to operate our website, analyse usage, and support marketing activities. Essential cookies are necessary for the website to function. Analytics cookies help us understand how visitors interact with our website. Marketing cookies may be used to serve relevant communications.

You can control cookies through your browser settings. Disabling certain cookies may affect the functionality of our website.`,
  },
  {
    heading: "9. Security",
    body: `We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, disclosure, alteration, or destruction. These measures include encryption, access controls, and regular security assessments.

However, no method of transmission over the internet or electronic storage is completely secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.`,
  },
  {
    heading: "10. Children's privacy",
    body: `The Nexus platform and website are not directed at individuals under 18 years of age. We do not knowingly collect personal information from minors. If we become aware that we have collected personal information from a minor, we will take steps to delete that information.`,
  },
  {
    heading: "11. Changes to this policy",
    body: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will notify you of material changes by posting the updated policy on our website with a new effective date, and where appropriate, by email notification.

Your continued use of our services after changes are posted constitutes your acceptance of the updated policy.`,
  },
  {
    heading: "12. Contact us",
    body: `If you have questions about this Privacy Policy or wish to exercise your data rights, please contact:

Nexus Platform Ltd
Privacy Team
privacy@nexusplatform.io

We aim to respond to all enquiries within 30 days. For complex requests, we may need additional time and will inform you of this.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-12 overflow-hidden">
        <div
          className="glow-field rounded-full"
          style={{
            width: "500px", height: "300px", top: "-50px",
            left: "50%", transform: "translateX(-50%)",
            background: "radial-gradient(circle, rgba(74,168,255,0.10), transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[820px] mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[rgba(244,247,251,0.38)] mb-4">
            Legal
          </p>
          <h1
            className="font-display font-bold text-[#F4F7FB] mb-4"
            style={{ fontSize: "clamp(36px,5vw,72px)", letterSpacing: "-0.055em", lineHeight: "0.95" }}
          >
            Privacy Policy
          </h1>
          <p className="text-[rgba(244,247,251,0.55)] text-sm mt-6">
            Last updated: 1 January 2026
          </p>
          <p className="text-[rgba(244,247,251,0.55)] mt-4 leading-relaxed max-w-[540px]">
            This Privacy Policy describes how Nexus Platform Ltd collects, uses, and protects the personal information of visitors to our website and users of our platform services.
          </p>
        </div>
      </section>

      {/* Content */}
      <article
        className="max-w-[820px] mx-auto px-6 pb-24 space-y-12"
        aria-label="Privacy Policy content"
      >
        <div className="h-px bg-white/8" />

        {sections.map((section) => (
          <section key={section.heading} aria-labelledby={`privacy-${section.heading.replace(/\s+/g, "-").toLowerCase()}`}>
            <h2
              id={`privacy-${section.heading.replace(/\s+/g, "-").toLowerCase()}`}
              className="font-display font-bold text-lg text-[#F4F7FB] mb-4 tracking-tight"
            >
              {section.heading}
            </h2>
            <div className="space-y-4">
              {section.body.split("\n\n").map((para, i) => (
                <p key={i} className="text-[rgba(244,247,251,0.65)] leading-[1.8] text-[16px]">
                  {para}
                </p>
              ))}
            </div>
          </section>
        ))}

        <div className="h-px bg-white/8" />
        <p className="text-xs text-[rgba(244,247,251,0.35)] text-center">
          © 2026 Nexus Platform Ltd. All rights reserved.
        </p>
      </article>
    </>
  );
}
