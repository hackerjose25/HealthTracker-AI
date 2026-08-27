'use client';

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/src/components/ui/Reveal";
import { MagneticButton } from "@/src/components/ui/MagneticButton";

export function WaitlistCTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="cx-cta" id="join">
      <div className="wrap">
        <Reveal>
          <div className="cx-kicker" style={{ justifyContent: "center", display: "flex" }}>Early Access</div>
          <h2>Be the first to experience Health Tracker AI.</h2>
          <p className="sub">We are building the future of personal health intelligence in the open. Request early access below.</p>
          <div className="cx-cta-container">
            {!submitted ? (
              <form className="cx-form" onSubmit={handleSubmit}>
                <input
                  className="cx-input"
                  type="email"
                  required
                  placeholder="enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                />
                <MagneticButton type="submit" onClick={handleSubmit} className="cx-btn-primary">
                  Join Waitlist <ArrowRight size={16} />
                </MagneticButton>
              </form>
            ) : (
              <div className="cx-success"><Check size={18} /> You're on the list — we will reach out soon.</div>
            )}
            <p className="cx-form-note">Health Tracker AI is in early development. This preview demonstrates upcoming core product capabilities.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default WaitlistCTASection;
