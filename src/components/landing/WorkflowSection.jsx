'use client';

import React from "react";
import Link from "next/link";
import { User, UploadCloud, Activity, ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/src/components/ui/Reveal";

export function WorkflowSection() {
  const steps = [
    {
      num: "01",
      title: "User Login",
      icon: User,
      badge: "Step 1",
      desc: "Log in securely to your patient health account with end-to-end zero-knowledge encryption.",
      bullets: ["Encrypted session", "Local or Cloud Vault", "Instant access"],
      link: "/login",
    },
    {
      num: "02",
      title: "Upload Medical Record",
      icon: UploadCloud,
      badge: "Step 2",
      desc: "Drag & drop your lab reports, prescriptions, MRI scans, or doctor notes in PDF, JPG, or PNG formats.",
      bullets: ["Drag & Drop ingestion", "Local Device or Remote Vault", "OCR text parsing"],
      link: "/upload",
    },
    {
      num: "03",
      title: "Get Diagnosis Report",
      icon: Activity,
      badge: "Step 3",
      desc: "View your synthesized AI diagnosis report with 4 disease risk predictions, biomarker trends, & recommendations.",
      bullets: ["Diabetes, Heart, Kidney, Liver scores", "Multi-year trend analysis", "Doctor sharing & QR export"],
      link: "/report",
    },
  ];

  return (
    <section className="cx-section dim" id="workflow">
      <div className="wrap">
        <Reveal>
          <div className="cx-kicker">Simple 3-Step User Journey</div>
          <h2>How to Get Your AI Health Diagnosis Report</h2>
          <p className="sub">
            Log in, upload your clinical documents, and instantly receive your comprehensive diagnosis & disease prediction report.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 48 }}>
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Reveal key={idx} delay={idx * 100}>
                <div
                  style={{
                    background: "rgba(14, 34, 48, 0.6)",
                    border: "1px solid var(--ink-line)",
                    borderRadius: 20,
                    padding: 32,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.25s ease",
                  }}
                  className="cx-grid-card"
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                      <span className="cx-badge" style={{ fontSize: 11 }}>
                        {s.badge}
                      </span>
                      <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 20, fontWeight: 600, color: "var(--mint)" }}>
                        {s.num}
                      </span>
                    </div>

                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(127, 231, 196, 0.1)", border: "1px solid rgba(127, 231, 196, 0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--mint)", marginBottom: 16 }}>
                      <Icon size={24} />
                    </div>

                    <h3 style={{ fontSize: 20, color: "var(--text-light)", marginBottom: 8 }}>{s.title}</h3>
                    <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.5, marginBottom: 18 }}>{s.desc}</p>

                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                      {s.bullets.map((b, bIdx) => (
                        <li key={bIdx} style={{ fontSize: 13, color: "var(--text-body)", display: "flex", alignItems: "center", gap: 8 }}>
                          <CheckCircle2 size={14} style={{ color: "var(--mint)", flexShrink: 0 }} /> {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={s.link} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "var(--mint)", fontWeight: 500, marginTop: "auto" }}>
                    Start {s.title} <ArrowRight size={14} />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WorkflowSection;
