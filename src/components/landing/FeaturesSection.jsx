'use client';

import React from "react";
import { Database, Brain, Activity, MessageSquare, Lock, Sparkles } from "lucide-react";
import { Reveal } from "@/src/components/ui/Reveal";

export function FeaturesSection() {
  return (
    <section className="cx-section dim">
      <div className="wrap">
        <Reveal>
          <div className="cx-kicker">Features</div>
          <h2>Built for patients, backed by advanced AI</h2>
          <p className="sub">Every feature is designed to bring visibility and continuity to your medical history.</p>
        </Reveal>

        <div className="cx-features-grid">
          <Reveal>
            <div className="cx-grid-card">
              <div className="cx-grid-icon"><Database size={24} /></div>
              <h3>Lifetime Secure Vault</h3>
              <p>Store clinical summaries, scans, and notes dated chronologically from birth onward.</p>
            </div>
          </Reveal>

          <Reveal delay={50}>
            <div className="cx-grid-card">
              <div className="cx-grid-icon"><Brain size={24} /></div>
              <h3>Medical-Domain AI</h3>
              <p>Powered by advanced models trained on clinical datasets for high-accuracy summaries.</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="cx-grid-card">
              <div className="cx-grid-icon"><Activity size={24} /></div>
              <h3>Longitudinal ML</h3>
              <p>Forecast 5-year risk trends using medical intelligence across different document points.</p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="cx-grid-card">
              <div className="cx-grid-icon"><MessageSquare size={24} /></div>
              <h3>Natural Language Chat</h3>
              <p>Ask plain-language questions across multiple medical files and get instant comparative insights.</p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="cx-grid-card">
              <div className="cx-grid-icon"><Lock size={24} /></div>
              <h3>Privacy First</h3>
              <p>Choose 100% on-device local execution or secure end-to-end encrypted cloud synchronization.</p>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="cx-grid-card">
              <div className="cx-grid-icon"><Sparkles size={24} /></div>
              <h3>Doctor-Ready Summaries</h3>
              <p>Export structured checklists and questions to make physician consultations productive.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
