'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import { UploadCloud, FileText, HardDrive, Cloud, ArrowRight } from 'lucide-react';
import { useHealth } from '@/src/context/HealthContext';

export default function UploadPage() {
  const { addDocument, storagePreference, setStoragePreference, documents } = useHealth();
  const [fileName, setFileName] = useState('');
  const [category, setCategory] = useState('Lab Report');
  const [provider, setProvider] = useState('Mayo Clinic');
  const router = useRouter();

  const handleSimulatedUpload = (e) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    addDocument({
      name: fileName,
      category: category,
      provider: provider,
      type: fileName.toLowerCase().endsWith('.jpg') || fileName.toLowerCase().endsWith('.png') ? 'IMAGE' : 'PDF',
    });

    setFileName('');
    router.push('/processing');
  };

  const handleProceedToProcessing = () => {
    router.push('/processing');
  };

  return (
    <DashboardLayout>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, color: 'var(--text-light)' }}>Upload Clinical Documents</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, marginTop: 4 }}>
            Upload lab reports, prescriptions, or imaging scans to begin AI diagnosis processing.
          </p>
        </div>

        <button onClick={handleProceedToProcessing} className="cx-btn-primary" style={{ padding: '12px 22px' }}>
          Process Records & View Diagnosis <ArrowRight size={16} />
        </button>
      </div>

      {/* STORAGE SELECTION TOGGLE */}
      <div className="dash-card">
        <div className="dash-card-header">
          <div className="dash-card-title">
            <HardDrive size={18} style={{ color: 'var(--mint)' }} />
            Select Storage Target Destination
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <button
            type="button"
            onClick={() => setStoragePreference('local')}
            style={{
              padding: 20,
              borderRadius: 14,
              border: `1px solid ${storagePreference === 'local' ? 'var(--mint)' : 'var(--ink-line)'}`,
              background: storagePreference === 'local' ? 'rgba(127, 231, 196, 0.08)' : 'rgba(6, 18, 26, 0.6)',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 14,
            }}
          >
            <HardDrive size={24} style={{ color: storagePreference === 'local' ? 'var(--mint)' : 'var(--text-muted)' }} />
            <div>
              <div style={{ color: 'var(--text-light)', fontWeight: 600, fontSize: 15 }}>Local Device Storage</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                Records remain strictly on your physical machine. 100% offline & local processing.
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setStoragePreference('cloud')}
            style={{
              padding: 20,
              borderRadius: 14,
              border: `1px solid ${storagePreference === 'cloud' ? 'var(--mint)' : 'var(--ink-line)'}`,
              background: storagePreference === 'cloud' ? 'rgba(127, 231, 196, 0.08)' : 'rgba(6, 18, 26, 0.6)',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 14,
            }}
          >
            <Cloud size={24} style={{ color: storagePreference === 'cloud' ? 'var(--mint)' : 'var(--text-muted)' }} />
            <div>
              <div style={{ color: 'var(--text-light)', fontWeight: 600, fontSize: 15 }}>Remote / Cloud Storage (AES-256)</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                End-to-end encrypted cloud vault. Syncs seamlessly across phone, web, and doctor links.
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* DROPZONE FORM */}
      <div className="dash-card">
        <form onSubmit={handleSimulatedUpload}>
          <div className="upload-dropzone">
            <UploadCloud size={48} style={{ color: 'var(--mint)', marginBottom: 16 }} />
            <h3 style={{ fontSize: 20, color: 'var(--text-light)', marginBottom: 8 }}>
              Drag & Drop your Medical File here
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, maxWidth: 460, margin: '0 auto 20px' }}>
              Supports PDF, JPG, PNG files (Blood panels, Scans, Discharge summaries, Prescriptions).
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', maxWidth: 600, margin: '0 auto', flexWrap: 'wrap' }}>
              <input
                type="text"
                required
                placeholder="Enter document title (e.g. Stanford Cardiology Echo 2026.pdf)..."
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: 260,
                  padding: '12px 16px',
                  borderRadius: 10,
                  border: '1px solid var(--ink-line)',
                  background: 'rgba(14, 34, 48, 0.8)',
                  color: 'var(--text-light)',
                  fontSize: 14,
                }}
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  padding: '12px 16px',
                  borderRadius: 10,
                  border: '1px solid var(--ink-line)',
                  background: 'rgba(14, 34, 48, 0.8)',
                  color: 'var(--text-light)',
                  fontSize: 14,
                }}
              >
                <option value="Lab Report">Lab Report</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Radiology">Radiology</option>
                <option value="Prescription">Prescription</option>
                <option value="Immunization">Immunization</option>
              </select>
              <button type="submit" className="cx-btn-primary" style={{ padding: '12px 24px' }}>
                Upload & Process <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* REPOSITORY OVERVIEW */}
      <div className="dash-card">
        <div className="dash-card-header">
          <div className="dash-card-title">
            <FileText size={18} style={{ color: 'var(--mint)' }} />
            Ready Files for AI Processing ({documents.length} Files)
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {documents.map((doc) => (
            <div
              key={doc.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                borderRadius: 10,
                background: 'rgba(6, 18, 26, 0.6)',
                border: '1px solid rgba(30, 61, 75, 0.5)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span
                  style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: 11,
                    background: doc.type === 'PDF' ? 'rgba(228, 87, 46, 0.15)' : 'rgba(127, 231, 196, 0.15)',
                    color: doc.type === 'PDF' ? 'var(--coral)' : 'var(--mint)',
                    padding: '4px 8px',
                    borderRadius: 6,
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {doc.type}
                </span>
                <div>
                  <div style={{ color: 'var(--text-light)', fontWeight: 500, fontSize: 14 }}>{doc.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {doc.provider} • {doc.date} • Storage: <strong style={{ color: 'var(--mint)' }}>{doc.storageLocation}</strong>
                  </div>
                </div>
              </div>

              <span
                style={{
                  fontSize: 11,
                  fontFamily: 'IBM Plex Mono, monospace',
                  color: 'var(--mint)',
                  background: 'rgba(127, 231, 196, 0.1)',
                  padding: '4px 10px',
                  borderRadius: 100,
                  border: '1px solid rgba(127,231,196,0.2)',
                }}
              >
                ● Ready for AI
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
