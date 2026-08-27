'use client';

import React from "react";

export function StatsSection() {
  return (
    <section className="cx-stats-bar">
      <div className="wrap cx-stats-grid">
        <div className="cx-stat-item">
          <div className="cx-stat-val">73%</div>
          <div className="cx-stat-lbl">of critical health patterns span multiple documents</div>
        </div>
        <div className="cx-stat-item">
          <div className="cx-stat-val">5 min</div>
          <div className="cx-stat-lbl">average time to digitize 10+ years of records</div>
        </div>
        <div className="cx-stat-item">
          <div className="cx-stat-val">100%</div>
          <div className="cx-stat-lbl">on-device storage option — offline & fully private</div>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
