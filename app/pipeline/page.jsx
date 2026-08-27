'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import { Cpu, Database, Activity, Code, CheckCircle2, ArrowRight, ShieldCheck, Play, Sparkles } from 'lucide-react';
import { useHealth } from '@/src/context/HealthContext';

export default function PipelinePage() {
  const { pipelineSteps, documents, patient, predictions } = useHealth();
  const [activeTab, setActiveTab] = useState('llm');

  const selectedDoc = documents[0];

  return (
    <DashboardLayout>
      <div style={{ marginBottom: 24 }}>
        <div className="cx-kicker" style={{ gap: 8 }}>
          <Cpu size={14} /> STEP 3: DATA PIPELINE (AI PROCESSING) — RUNS IN CLOUD VM
        </div>
        <h1 style={{ fontSize: 28, color: 'var(--text-light)' }}>AI Infrastructure & Processing Pipeline</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 15, marginTop: 4 }}>
          Inspect how the Cloud VM Medical LLM extracts entities, generates vector embeddings, and executes disease prediction algorithms.
        </p>
      </div>

      {/* CLOUD VM INFRASTRUCTURE STATUS BAR */}
      <div className="dash-card" style={{ background: 'radial-gradient(120% 120% at 0% 0%, rgba(20, 50, 70, 0.7) 0%, rgba(8, 22, 32, 0.9) 100%)', border: '1px solid rgba(127, 231, 196, 0.3)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, textTransform: 'uppercase', fontFamily: 'IBM Plex Mono, monospace', fontSize: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Cpu size={24} style={{ color: 'var(--mint)' }} />
            <div>
              <div style={{ color: 'var(--text-muted)' }}>LLM INFERENCE (GPU)</div>
              <div style={{ color: 'var(--mint)', fontWeight: 600, fontSize: 14 }}>NVIDIA H100 • Active</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Database size={24} style={{ color: 'var(--mint)' }} />
            <div>
              <div style={{ color: 'var(--text-muted)' }}>VECTOR DATABASE STORE</div>
              <div style={{ color: 'var(--mint)', fontWeight: 600, fontSize: 14 }}>768-Dim Index • Ready</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Activity size={24} style={{ color: 'var(--mint)' }} />
            <div>
              <div style={{ color: 'var(--text-muted)' }}>ML RUNTIME (CPU/GPU)</div>
              <div style={{ color: 'var(--mint)', fontWeight: 600, fontSize: 14 }}>4 Disease Models Loaded</div>
            </div>
          </div>
        </div>
      </div>

      {/* PIPELINE NAVIGATION TABS */}
      <div className="dash-card">
        <div className="cx-showcase-tabs" style={{ marginBottom: 20 }}>
          <button
            className={`cx-showcase-tab ${activeTab === 'llm' ? 'active' : ''}`}
            onClick={() => setActiveTab('llm')}
          >
            3.1 LLM Analysis & Extraction
          </button>
          <button
            className={`cx-showcase-tab ${activeTab === 'vectors' ? 'active' : ''}`}
            onClick={() => setActiveTab('vectors')}
          >
            3.2 Feature Vector & Embeddings
          </button>
          <button
            className={`cx-showcase-tab ${activeTab === 'models' ? 'active' : ''}`}
            onClick={() => setActiveTab('models')}
          >
            3.3 & 3.4 Disease Prediction Engine
          </button>
        </div>

        {/* TAB 3.1: LLM ANALYSIS */}
        {activeTab === 'llm' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sparkles size={16} style={{ color: 'var(--mint)' }} />
                Structured JSON Output per Patient (Extracted from Raw Documents)
              </h3>
              <span style={{ fontSize: 11, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--mint)' }}>
                Target: {selectedDoc?.name}
              </span>
            </div>

            <pre
              style={{
                background: 'rgba(6, 18, 26, 0.9)',
                border: '1px solid var(--ink-line)',
                borderRadius: 12,
                padding: 20,
                color: 'var(--mint)',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: 13,
                maxHeight: 360,
                overflowY: 'auto',
                lineHeight: 1.5,
              }}
            >
              {JSON.stringify(
                {
                  patientId: patient.id,
                  documentSource: selectedDoc?.name,
                  extractedAt: new Date().toISOString(),
                  structuredJSON: selectedDoc?.extractedJSON || {},
                  clinicalEntitiesNormalized: [
                    { rawText: "Sinus Bradycardia", code: "ICD-10 I49.8", category: "Diagnosis" },
                    { rawText: "Total Cholesterol 215", code: "LOINC 2093-3", category: "Lab Test" },
                    { rawText: "HbA1c 5.9%", code: "LOINC 4548-4", category: "Lab Test" },
                  ],
                },
                null,
                2
              )}
            </pre>
          </div>
        )}

        {/* TAB 3.2: FEATURE VECTORS */}
        {activeTab === 'vectors' && (
          <div>
            <h3 style={{ fontSize: 18, color: 'var(--text-light)', marginBottom: 14 }}>
              Feature Vectors & Semantic Embeddings Extraction
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20 }}>
              The Medical LLM encodes patient records into structured numeric arrays (Feature Vectors) and 768-dimensional dense vector embeddings.
            </p>

            <div className="dash-grid-2">
              <div style={{ background: 'rgba(6, 18, 26, 0.7)', padding: 18, borderRadius: 12, border: '1px solid var(--ink-line)' }}>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: 'var(--mint)', marginBottom: 8 }}>
                  FEATURE VECTOR (Per Patient Numeric Array)
                </div>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13, color: 'var(--text-light)', background: 'rgba(14, 34, 48, 0.8)', padding: 12, borderRadius: 8 }}>
                  [ 0.21, 1.45, 0.33, 5.90, 118.0, 76.0, 0.95, 62.0, 24.0, 0.12, -0.45, 0.88 ]
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                  Normalized features: [Age, BMI, Glucose, HbA1c, Systolic BP, Diastolic BP, Creatinine, EF, ALT, AST, Risk Baseline, Weight Trajectory]
                </div>
              </div>

              <div style={{ background: 'rgba(6, 18, 26, 0.7)', padding: 18, borderRadius: 12, border: '1px solid var(--ink-line)' }}>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: 'var(--mint)', marginBottom: 8 }}>
                  SEMANTIC VECTOR EMBEDDINGS (768-Dim Index)
                </div>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13, color: 'var(--text-light)', background: 'rgba(14, 34, 48, 0.8)', padding: 12, borderRadius: 8, wordBreak: 'break-all' }}>
                  [ 0.1245, -0.7782, 1.0234, 0.0451, -0.1982, 0.3341, 0.8912, -0.4412, ... (760 dimensions remaining) ]
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                  Used for cross-document similarity search, multi-year lab comparison, & disease inference.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3.3 & 3.4: DISEASE PREDICTION MODELS */}
        {activeTab === 'models' && (
          <div>
            <h3 style={{ fontSize: 18, color: 'var(--text-light)', marginBottom: 14 }}>
              3.4 Disease-Specific Prediction Models (Separate Algorithms per Disease)
            </h3>
            <div className="dash-grid-2">
              {predictions.map((p) => (
                <div
                  key={p.id}
                  style={{
                    background: 'rgba(6, 18, 26, 0.7)',
                    padding: 20,
                    borderRadius: 14,
                    border: '1px solid rgba(127, 231, 196, 0.2)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ color: 'var(--text-light)', fontWeight: 600, fontSize: 16 }}>{p.disease}</span>
                    <span className="cx-badge" style={{ fontSize: 11 }}>
                      Risk Score: {p.riskScore}%
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 12 }}>
                    {p.summary}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--mint)', fontFamily: 'IBM Plex Mono, monospace' }}>
                    <span>Probability: {p.probability}</span>
                    <span>Status: {p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
