'use client';

import React from "react";
import { Reveal } from "@/src/components/ui/Reveal";
import { TabShowcase } from "./TabShowcase";

export function ShowcaseSection() {
  return (
    <section className="cx-section dim">
      <div className="wrap">
        <Reveal>
          <div className="cx-kicker">Interactive Showcase</div>
          <h2 className="center">Explore the core platform capabilities</h2>
          <p className="sub center">Switch between views to see how Health Tracker AI interprets your clinical journey.</p>
        </Reveal>
        <Reveal delay={100}>
          <TabShowcase />
        </Reveal>
      </div>
    </section>
  );
}

export default ShowcaseSection;
