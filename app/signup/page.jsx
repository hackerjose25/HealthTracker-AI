'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight, Lock, Mail, User } from 'lucide-react';
import { useHealth } from '@/src/context/HealthContext';

export default function SignupPage() {
  const [name, setName] = useState('YUGIN SANTHOSH');
  const [email, setEmail] = useState('yuginsanthosh1263@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const { login } = useHealth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    router.push('/dashboard');
  };

  return (
    <div className="cx" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
      <div className="cx-widget-card" style={{ maxWidth: 440, width: '100%', padding: 36, background: 'rgba(14, 34, 48, 0.7)', border: '1px solid var(--ink-line)', borderRadius: 20 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div className="cx-logo" style={{ justifyContent: 'center', marginBottom: 12 }}>
            Health Tracker AI
          </div>
          <div className="cx-badge" style={{ marginTop: 8 }}>
            <ShieldCheck size={13} /> Step 1: Account Registration
          </div>
          <h2 style={{ fontSize: 24, marginTop: 16, color: 'var(--text-light)' }}>Create your Patient Vault</h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 6 }}>
            Set up your AI health records timeline & risk predictions.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-muted)', marginBottom: 6 }}>
              FULL NAME
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--text-muted)' }} />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: 10,
                  border: '1px solid var(--ink-line)',
                  background: 'rgba(6, 18, 26, 0.8)',
                  color: 'var(--text-light)',
                  fontSize: 14,
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-muted)', marginBottom: 6 }}>
              EMAIL ADDRESS
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--text-muted)' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: 10,
                  border: '1px solid var(--ink-line)',
                  background: 'rgba(6, 18, 26, 0.8)',
                  color: 'var(--text-light)',
                  fontSize: 14,
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-muted)', marginBottom: 6 }}>
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--text-muted)' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: 10,
                  border: '1px solid var(--ink-line)',
                  background: 'rgba(6, 18, 26, 0.8)',
                  color: 'var(--text-light)',
                  fontSize: 14,
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="cx-btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: 12, padding: '14px' }}
          >
            Create Vault & Get Started <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'var(--text-muted)' }}>
          Already registered?{' '}
          <Link href="/login" style={{ color: 'var(--mint)', fontWeight: 500 }}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
