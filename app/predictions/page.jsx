'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import { Activity, Heart, ShieldAlert, CheckCircle2, TrendingUp, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import { useHealth } from '@/src/context/HealthContext';

export default function PredictionsPage() {
  const { predictions, patient } = useHealth();
  const [selectedDisease, setSelectedDisease] = useState(predictions[0]);

  return (
    <DashboardLayout>
      <div style={{ marginBottom: 24 }}>
        <div className="cx-kicker" style={{ gap: 8 }}>
          <Activity size={14} /> STEP 4: DISPLAY IN WEBAPP — DISEASE PREDICTIONS
        </div>
        <h1 style={{ fontSize: 28, color: 'var(--text-light)' }}>Disease Prediction Engine Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 15, marginTop: 4 }}>
          Disease-specific ML algorithms running over patient feature vectors & semantic vector embeddings.
        </p>
      </div>

      {/* 4 DISEASE CARDS GRID */}
      <div className="dash-grid-4" style={{ marginBottom: 24 }}>
        {predictions.map((p) => {
          const isSelected = selectedDisease?.id === p.id;
          return (
            <div
              key={p.id}
              onClick={() => setSelectedDisease(p)}
              style={{
                padding: 20,
                borderRadius: 16,
                border: `1px solid ${isSelected ? 'var(--mint)' : 'var(--ink-line)'}`,
                background: isSelected ? 'rgba(127, 231, 196, 0.08)' : 'rgba(14, 34, 48, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-muted)' }}>
                  {p.category}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: 'IBM Plex Mono, monospace',
                    background: 'rgba(127, 231, 196, 0.15)',
                    color: 'var(--mint)',
                    padding: '2px 8px',
                    borderRadius: 100,
                  }}
                >
                  {p.status}
                </span>
              </div>

              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-light)', marginBottom: 14 }}>
                {p.disease}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 36, fontWeight: 600, color: 'var(--mint)' }}>
                  {p.riskScore}%
                </span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Risk Score</span>
              </div>

              <div className="cx-risk-bar-track" style={{ marginTop: 12 }}>
                <div className="cx-risk-bar-fill" style={{ width: `${p.riskScore}%`, background: 'var(--mint)' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* SELECTED DISEASE PREDICTION DETAIL */}
      {selectedDisease && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div className="dash-card-title">
              <Sparkles size={18} style={{ color: 'var(--mint)' }} />
              Model Deep Dive: {selectedDisease.disease}
            </div>
            <span style={{ fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--mint)' }}>
              PROBABILITY: {selectedDisease.probability}
            </span>
          </div>

          <div className="dash-grid-2">
            {/* LEFT: CONTRIBUTING RISK FACTORS */}
            <div>
              <h3 style={{ fontSize: 16, color: 'var(--text-light)', marginBottom: 12 }}>
                Explanation & Contributing Risk Factors
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {selectedDisease.factors.map((f, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: 10,
                      background: 'rgba(6, 18, 26, 0.6)',
                      border: '1px solid var(--ink-line)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--mint)' }} />
                      <span style={{ fontSize: 14, color: 'var(--text-light)' }}>{f.name}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-light)' }}>{f.status}</div>
                      <div style={{ fontSize: 11, color: 'var(--mint)' }}>{f.impact} Impact</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: CLINICAL RECOMMENDATIONS */}
            <div>
              <h3 style={{ fontSize: 16, color: 'var(--text-light)', marginBottom: 12 }}>
                AI Clinical Recommendations & Preventative Strategy
              </h3>

              <div
                style={{
                  background: 'rgba(6, 18, 26, 0.6)',
                  padding: 20,
                  borderRadius: 14,
                  border: '1px solid var(--ink-line)',
                }}
              >
                <p style={{ color: 'var(--text-light)', fontSize: 14, lineHeight: 1.5, marginBottom: 16 }}>
                  {selectedDisease.summary}
                </p>

                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: 'var(--mint)', marginBottom: 10 }}>
                  RECOMMENDED ACTION PLAN
                </div>

                <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7 }}>
                  {selectedDisease.recommendations.map((rec, idx) => (
                    <li key={idx} style={{ marginBottom: 6 }}>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
