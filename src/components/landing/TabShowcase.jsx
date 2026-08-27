'use client';

import React, { useState } from "react";
import { CheckCircle2, MessageSquare, TrendingUp } from "lucide-react";

export function TabShowcase() {
  const [activeTab, setActiveTab] = useState("timeline");

  const tabs = [
    {
      id: "timeline",
      label: "Timeline View",
      title: "Your entire medical history, chronologically indexed",
      desc: "Every blood report, MRI scan, and prescription dated and linked. Easily visualize your patient journey without searching through old emails or folders.",
      widget: (
        <div className="cx-widget-card showcase-widget">
          <div className="cx-widget-header">
            <span>TIMELINE INDEX</span>
            <span style={{ color: "var(--mint)" }}>34 RECORDS CONNECTED</span>
          </div>
          <div className="cx-widget-timeline-item">
            <CheckCircle2 size={16} style={{ color: "var(--mint)" }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: "var(--text-light)", fontWeight: 500 }}>Comprehensive Blood Panel</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Oct 14, 2021 • LabCorp</div>
            </div>
            <span style={{ fontSize: 11, background: "rgba(127,231,196,0.1)", color: "var(--mint)", padding: "2px 8px", borderRadius: 4 }}>Linked</span>
          </div>
          <div className="cx-widget-timeline-item">
            <CheckCircle2 size={16} style={{ color: "var(--mint)" }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: "var(--text-light)", fontWeight: 500 }}>MRI Lumbar Spine</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Mar 02, 2023 • Mayo Clinic</div>
            </div>
            <span style={{ fontSize: 11, background: "rgba(127,231,196,0.1)", color: "var(--mint)", padding: "2px 8px", borderRadius: 4 }}>Linked</span>
          </div>
          <div className="cx-widget-timeline-item">
            <CheckCircle2 size={16} style={{ color: "var(--mint)" }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: "var(--text-light)", fontWeight: 500 }}>Cardiac Stress Echocardiogram</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Jan 19, 2025 • Stanford Health</div>
            </div>
            <span style={{ fontSize: 11, background: "rgba(228,87,46,0.15)", color: "var(--coral)", padding: "2px 8px", borderRadius: 4 }}>New Record</span>
          </div>
        </div>
      )
    },
    {
      id: "analysis",
      label: "AI Analysis",
      title: "Ask medical-domain AI across multiple documents",
      desc: "Connect the dots. Ask things like 'Did my cholesterol increase from 2021 to 2024?' and let our clinical-grade AI compare and analyze trends over time.",
      widget: (
        <div className="cx-widget-card showcase-widget">
          <div className="cx-widget-header">
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><MessageSquare size={13} /> ASSISTANT CHAT</span>
            <span style={{ color: "var(--mint)" }}>MULTI-DOC READ</span>
          </div>
          <div className="cx-widget-chat-bubble user">
            "Compare my 2021 blood work with my 2024 panel — did my HbA1c change?"
          </div>
          <div className="cx-widget-chat-bubble">
            <div style={{ fontSize: 11, color: "var(--mint)", marginBottom: 4, fontWeight: 600 }}>Health Tracker AI</div>
            Your HbA1c improved from <strong>5.9% (2021)</strong> to <strong>5.4% (2024)</strong>, moving out of pre-diabetic range following your prescribed dietary adjustments.
          </div>
        </div>
      )
    },
    {
      id: "forecast",
      label: "Risk Forecast",
      title: "Predictive health intelligence over a 5-year horizon",
      desc: "Health Tracker AI continuously evaluates your trajectory. Identify potential risks before they turn into diagnoses and receive proactive preventive strategies.",
      widget: (
        <div className="cx-widget-card showcase-widget">
          <div className="cx-widget-header">
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><TrendingUp size={13} style={{ color: "var(--mint)" }} /> FORECAST MODEL</span>
            <span style={{ color: "var(--mint)" }}>5-YEAR HORIZON</span>
          </div>
          <div className="cx-widget-risk-meter">
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: "var(--text-light)" }}>Cardiovascular Risk Profile</span>
                <span style={{ color: "var(--mint)", fontWeight: 600 }}>Optimal • Low (8%)</span>
              </div>
              <div className="cx-risk-bar-track">
                <div className="cx-risk-bar-fill" style={{ width: "12%", background: "var(--mint)" }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: "var(--text-light)" }}>Metabolic Trend Stability</span>
                <span style={{ color: "var(--mint)", fontWeight: 600 }}>94% Positive</span>
              </div>
              <div className="cx-risk-bar-track">
                <div className="cx-risk-bar-fill" style={{ width: "94%", background: "linear-gradient(90deg, var(--mint), #52c29d)" }} />
              </div>
            </div>
            <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 4, background: "rgba(14, 34, 48, 0.6)", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(30, 61, 75, 0.6)" }}>
              💡 Recommended action: Schedule routine 2-year lipid panel screening in Q3 2026.
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <div className="cx-showcase">
      <div className="cx-showcase-tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`cx-showcase-tab ${activeTab === t.id ? "active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="cx-showcase-content">
        <div className="cx-showcase-text">
          <h3>{currentTab.title}</h3>
          <p>{currentTab.desc}</p>
        </div>
        <div className="cx-showcase-visual">
          {currentTab.widget}
        </div>
      </div>
    </div>
  );
}

export default TabShowcase;
