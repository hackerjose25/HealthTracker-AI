'use client';

import React, { useState } from "react";
import { ShieldCheck, Lock, Check } from "lucide-react";
import { Reveal } from "@/src/components/ui/Reveal";

export function PrivacySection() {
  const [tab, setTab] = useState("device");

  return (
    <section className="cx-section" id="privacy">
      <div className="wrap">
        <div className="cx-privacy-layout">
          <Reveal>
            <div className="cx-privacy-info">
              <div className="cx-kicker">Privacy By Design</div>
              <h2>Your clinical data is yours alone. Period.</h2>
              <p className="sub" style={{ marginTop: 12 }}>
                We don't train models on your personal files, and we never sell your health history. Choose where your records reside.
              </p>

              <div className="cx-trust-badges">
                <div className="cx-badge"><ShieldCheck size={14} /> Zero-Knowledge</div>
                <div className="cx-badge"><Lock size={14} /> AES-256 Encrypted</div>
                <div className="cx-badge"><Check size={14} /> HIPAA Aligned</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="cx-toggle-card">
              <div className="cx-toggle-head">
                <div className={`cx-toggle-slider ${tab === "cloud" ? "cloud" : ""}`} />
                <button
                  className={`cx-toggle-btn ${tab === "device" ? "on" : ""}`}
                  onClick={() => setTab("device")}
                >
                  On This Device
                </button>
                <button
                  className={`cx-toggle-btn ${tab === "cloud" ? "on" : ""}`}
                  onClick={() => setTab("cloud")}
                >
                  Synced To Cloud
                </button>
              </div>
              <div className="cx-toggle-body" key={tab}>
                {tab === "device" ? (
                  <>
                    Records remain strictly local to your computer or phone. Zero network communication occurs without your consent.
                    <ul>
                      <li><Check /> No account or sign-in required</li>
                      <li><Check /> Works 100% offline without internet</li>
                      <li><Check /> You hold complete control of your data files</li>
                    </ul>
                  </>
                ) : (
                  <>
                    Records are end-to-end encrypted and synced via secure vaults, accessible across all your authorized devices.
                    <ul>
                      <li><Check /> Reach your timeline from phone, tablet, or web</li>
                      <li><Check /> AES-256 encryption at rest and TLS 1.3 in transit</li>
                      <li><Check /> One-click export or permanent deletion anytime</li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default PrivacySection;
