'use client';

import React from 'react';
import Link from 'next/link';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import {
  User,
  UploadCloud,
  Cpu,
  FileText,
  Activity,
  FileSpreadsheet,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Database,
  Heart,
} from 'lucide-react';
import { useHealth } from '@/src/context/HealthContext';

export default function DashboardPage() {
  const { patient, documents, predictions, storagePreference } = useHealth();

  return (
    <DashboardLayout>
      {/* WELCOME BANNER */}
      <div
        className="dash-card"
        style={{
          background: 'radial-gradient(120% 120% at 0% 0%, rgba(20, 50, 70, 0.8) 0%, rgba(8, 22, 32, 0.95) 100%)',
          border: '1px solid rgba(127, 231, 196, 0.3)',
          padding: 32,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div className="cx-eyebrow" style={{ marginBottom: 12 }}>
              <span className="dot" /> Active Patient: {patient.name} ({patient.id})
            </div>
            <h1 style={{ fontSize: 32, color: 'var(--text-light)' }}>
              Health Tracker AI — System Architecture Workflow
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 640, marginTop: 8 }}>
              End-to-end medical records pipeline connecting user login, record ingestion, Cloud VM LLM extraction, vector embeddings, and 4 disease prediction models.
            </p>
          </div>

          <Link href="/upload" className="cx-btn-primary">
            Upload New Record <UploadCloud size={16} />
          </Link>
        </div>
      </div>

      {/* QUICK METRICS GRID */}
      <div className="dash-grid-4" style={{ marginBottom: 28 }}>
        <div className="dash-card" style={{ marginBottom: 0 }}>
          <div style={{ fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-muted)' }}>STEP 1: AUTHENTICATION</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-light)', marginTop: 4 }}>Logged In</div>
          <div style={{ fontSize: 12, color: 'var(--mint)', marginTop: 4 }}>✓ Zero-Knowledge Vault Active</div>
        </div>

        <div className="dash-card" style={{ marginBottom: 0 }}>
          <div style={{ fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-muted)' }}>STEP 2: STORAGE</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-light)', marginTop: 4 }}>{documents.length} Records</div>
          <div style={{ fontSize: 12, color: 'var(--mint)', marginTop: 4 }}>Target: {storagePreference === 'cloud' ? 'Cloud Vault' : 'Local Storage'}</div>
        </div>

        <div className="dash-card" style={{ marginBottom: 0 }}>
          <div style={{ fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-muted)' }}>STEP 3: CLOUD VM AI</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--mint)', marginTop: 4 }}>GPU Active</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>LLM & 768-Dim Vector Store</div>
        </div>

        <div className="dash-card" style={{ marginBottom: 0 }}>
          <div style={{ fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-muted)' }}>STEP 4: DISEASE PREDICTIONS</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--mint)', marginTop: 4 }}>4 Models Evaluated</div>
          <div style={{ fontSize: 12, color: 'var(--mint)', marginTop: 4 }}>Lowest Cardiac Risk: 12%</div>
        </div>
      </div>

      {/* SYSTEM ARCHITECTURE WORKFLOW MAP */}
      <div className="dash-card">
        <div className="dash-card-header">
          <div className="dash-card-title">
            <Cpu size={20} style={{ color: 'var(--mint)' }} />
            System Architecture Workflow Overview (Interactive Diagram Map)
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {/* STEP 1 */}
          <Link href="/login" style={{ display: 'block' }}>
            <div style={{ background: 'rgba(6, 18, 26, 0.7)', padding: 18, borderRadius: 14, border: '1px solid var(--ink-line)', height: '100%' }}>
              <div style={{ fontSize: 11, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--mint)', marginBottom: 6 }}>
                1. USER LOGIN
              </div>
              <User size={24} style={{ color: 'var(--text-light)', marginBottom: 10 }} />
              <div style={{ fontWeight: 600, color: 'var(--text-light)', fontSize: 14 }}>User Authentication</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                Secure login portal & zero-knowledge patient sessions.
              </div>
            </div>
          </Link>

          {/* STEP 2 */}
          <Link href="/upload" style={{ display: 'block' }}>
            <div style={{ background: 'rgba(6, 18, 26, 0.7)', padding: 18, borderRadius: 14, border: '1px solid var(--ink-line)', height: '100%' }}>
              <div style={{ fontSize: 11, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--mint)', marginBottom: 6 }}>
                2. UPLOAD RECORDS
              </div>
              <UploadCloud size={24} style={{ color: 'var(--mint)', marginBottom: 10 }} />
              <div style={{ fontWeight: 600, color: 'var(--text-light)', fontSize: 14 }}>Upload & Storage</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                Ingest PDF/JPG/PNG files to Local Device or Cloud Vault.
              </div>
            </div>
          </Link>

          {/* STEP 3 */}
          <Link href="/pipeline" style={{ display: 'block' }}>
            <div style={{ background: 'rgba(6, 18, 26, 0.7)', padding: 18, borderRadius: 14, border: '1px solid rgba(127, 231, 196, 0.3)', height: '100%' }}>
              <div style={{ fontSize: 11, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--mint)', marginBottom: 6 }}>
                3. DATA PIPELINE (CLOUD VM)
              </div>
              <Cpu size={24} style={{ color: 'var(--mint)', marginBottom: 10 }} />
              <div style={{ fontWeight: 600, color: 'var(--text-light)', fontSize: 14 }}>AI Processing Engine</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                Medical LLM extraction, vector embeddings, & ML model inference.
              </div>
            </div>
          </Link>

          {/* STEP 4 */}
          <Link href="/predictions" style={{ display: 'block' }}>
            <div style={{ background: 'rgba(6, 18, 26, 0.7)', padding: 18, borderRadius: 14, border: '1px solid var(--ink-line)', height: '100%' }}>
              <div style={{ fontSize: 11, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--mint)', marginBottom: 6 }}>
                4. RESULTS WEBAPP
              </div>
              <Activity size={24} style={{ color: 'var(--coral)', marginBottom: 10 }} />
              <div style={{ fontWeight: 600, color: 'var(--text-light)', fontSize: 14 }}>Display in Webapp</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                Timeline, disease risk scores, comparative reports, & chat.
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* QUICK LINKS TO WORKFLOW MODULES */}
      <div className="dash-grid-2">
        <div className="dash-card">
          <div className="dash-card-header">
            <div className="dash-card-title">
              <FileText size={18} style={{ color: 'var(--mint)' }} />
              Recent Patient Records ({documents.length})
            </div>
            <Link href="/timeline" style={{ fontSize: 13, color: 'var(--mint)' }}>View Timeline →</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {documents.slice(0, 3).map((doc) => (
              <div key={doc.id} style={{ padding: 12, borderRadius: 8, background: 'rgba(6, 18, 26, 0.6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                <div>
                  <div style={{ color: 'var(--text-light)', fontWeight: 500 }}>{doc.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{doc.date} • {doc.provider}</div>
                </div>
                <span style={{ fontSize: 11, color: 'var(--mint)', background: 'rgba(127,231,196,0.1)', padding: '2px 8px', borderRadius: 4 }}>Processed</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-header">
            <div className="dash-card-title">
              <Activity size={18} style={{ color: 'var(--mint)' }} />
              Disease Specific ML Predictions
            </div>
            <Link href="/predictions" style={{ fontSize: 13, color: 'var(--mint)' }}>View Details →</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {predictions.map((p) => (
              <div key={p.id} style={{ padding: 12, borderRadius: 8, background: 'rgba(6, 18, 26, 0.6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                <span style={{ color: 'var(--text-light)', fontWeight: 500 }}>{p.disease}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 11, color: 'var(--mint)', fontFamily: 'IBM Plex Mono, monospace' }}>Risk: {p.riskScore}%</span>
                  <span style={{ fontSize: 11, background: 'rgba(127,231,196,0.15)', color: 'var(--mint)', padding: '2px 6px', borderRadius: 4 }}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
