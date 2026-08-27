'use client';

import React from "react";
import { Reveal } from "@/src/components/ui/Reveal";

export function HowItWorksSection() {
  return (
    <section className="cx-section" id="how">
      <div className="wrap">
        <Reveal>
          <div className="cx-kicker">How It Works</div>
          <h2>Three steps to permanent health clarity.</h2>
          <p className="sub">Our AI workflow simplifies record organization, analysis, and early warnings.</p>
        </Reveal>

        <div className="cx-steps-timeline">
          <div className="cx-timeline-line" />

          <Reveal>
            <div className="cx-step-item">
              <div className="cx-step-num">01</div>
              <div className="cx-step-text">
                <h3>Upload any health document</h3>
                <p>Drag in PDFs, snap photos of prescriptions, or upload lab reports. Health Tracker AI automatically parses the clinical text, dates the record, and adds it to your timeline.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="cx-step-item">
              <div className="cx-step-num">02</div>
              <div className="cx-step-text">
                <h3>AI reads and synthesizes your history</h3>
                <p>Our medical-domain LLM compares old and new data. It highlights changes, translates confusing clinical terms, and cross-references multiple reports to spot trendlines.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="cx-step-item">
              <div className="cx-step-num">03</div>
              <div className="cx-step-text">
                <h3>Receive active health insights</h3>
                <p>Get automatic risk assessments and prepare focused questions for your doctor. Health Tracker AI points out anomalies and schedules routine check-up alerts.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
