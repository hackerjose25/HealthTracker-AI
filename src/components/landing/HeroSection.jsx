'use client';

import React from "react";
import Link from "next/link";
import { ArrowRight, LogIn, UploadCloud } from "lucide-react";
import { MagneticButton } from "@/src/components/ui/MagneticButton";
import { TraceHero } from "./TraceHero";

export function HeroSection({ heroRef, onMouseMove }) {
  return (
    <header className="cx-hero" ref={heroRef} onMouseMove={onMouseMove}>
      <div className="cx-hero-inner">
        <div className="cx-eyebrow">
          <span className="dot" />
          AI-integrated health records & disease predictions
        </div>
        <h1>
          Every record you've ever had, read as <em>one</em> story.
        </h1>
        <p className="lede">
          Log in, upload your medical reports, and get your AI diagnosis & risk prediction report in seconds.
        </p>
        <div className="cx-hero-ctas">
          <MagneticButton href="/login" className="cx-btn-primary">
            Get Started <ArrowRight size={16} />
          </MagneticButton>
          
        </div>
        <TraceHero />
      </div>
    </header>
  );
}

export default HeroSection;
