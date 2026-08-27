'use client';

import React from "react";
import { AlertCircle, Sparkles } from "lucide-react";
import { Reveal } from "@/src/components/ui/Reveal";

export function ProblemSection() {
  return (
    <section className="cx-section" id="product">
      <div className="wrap">
        <Reveal>
          <div className="cx-kicker">The Problem</div>
          <h2>Your health history is scattered across portals, PDFs, and paper files.</h2>
          <p className="sub">
            One clinic has your blood work. Another has your MRI scan. Because these documents are isolated,
            critical health trends go unnoticed until they become symptoms.
          </p>
        </Reveal>

        <div className="cx-problem-split">
          <Reveal>
            <div className="cx-compare-card problem-before">
              <div className="cx-compare-title">
                <span>Cryptic & Scattered Files</span>
                <AlertCircle size={16} style={{ color: "var(--coral)" }} />
              </div>
              <div className="cx-files-list">
                <div className="cx-file-item error">
                  <span className="cx-file-icon">📄</span>
                  <span className="cx-file-name">scan_9023_final_copy.pdf</span>
                  <span className="cx-file-meta">Unknown date</span>
                </div>
                <div className="cx-file-item error">
                  <span className="cx-file-icon">📄</span>
                  <span className="cx-file-name">IMG_29841.jpg</span>
                  <span className="cx-file-meta">Photo gallery</span>
                </div>
                <div className="cx-file-item error">
                  <span className="cx-file-icon">📄</span>
                  <span className="cx-file-name">blood_report_2021_rev3.pdf</span>
                  <span className="cx-file-meta">Email attachment</span>
                </div>
              </div>
              <p className="cx-compare-note">Isolated data — no timeline, no trends, no context.</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="cx-compare-card now problem-after">
              <div className="cx-compare-title">
                <span>Organized by Health Tracker AI</span>
                <Sparkles size={16} style={{ color: "var(--mint)" }} />
              </div>
              <div className="cx-files-list">
                <div className="cx-file-item success">
                  <span className="cx-file-icon">🩺</span>
                  <span className="cx-file-name">Mayo Clinic / Lumbar Spine MRI</span>
                  <span className="cx-file-meta">Mar 02, 2023</span>
                </div>
                <div className="cx-file-item success">
                  <span className="cx-file-icon">🧪</span>
                  <span className="cx-file-name">LabCorp / Comprehensive Blood Panel</span>
                  <span className="cx-file-meta">Oct 14, 2021</span>
                </div>
                <div className="cx-file-item success">
                  <span className="cx-file-icon">💊</span>
                  <span className="cx-file-name">Stanford Health / Cardiac Stress Report</span>
                  <span className="cx-file-meta">Jan 19, 2025</span>
                </div>
              </div>
              <p className="cx-compare-note">Chronological health history organized as a single continuous story.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default ProblemSection;
