'use client';

import React from "react";
import { Reveal } from "@/src/components/ui/Reveal";
import { FAQAccordion } from "./FAQAccordion";

export function FAQSection() {
  return (
    <section className="cx-section dim">
      <div className="wrap">
        <Reveal>
          <div className="cx-kicker" style={{ display: "flex", justifyContent: "center" }}>FAQ</div>
          <h2 style={{ textAlign: "center", margin: "0 auto" }}>Frequently Asked Questions</h2>
          <p className="sub" style={{ textAlign: "center", margin: "18px auto 0" }}>Answers to common questions about security, features, and platform usage.</p>
        </Reveal>
        <Reveal delay={100}>
          <FAQAccordion />
        </Reveal>
      </div>
    </section>
  );
}

export default FAQSection;
