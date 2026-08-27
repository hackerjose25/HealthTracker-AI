'use client';

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How does Health Tracker AI read scanned or handwritten documents?",
      a: "Health Tracker AI uses advanced OCR (Optical Character Recognition) paired with medical-domain LLMs. It interprets handwriting, scans, lab results, and complex tables, translating medical jargon into plain English."
    },
    {
      q: "Is my medical data safe and private?",
      a: "Absolutely. Security is our foundation. You can store your records 100% locally on your device with no cloud uploads, or choose to sync with end-to-end encryption (AES-256) backed by secure cloud vaults."
    },
    {
      q: "Do I need to pay to get started?",
      a: "No, Health Tracker AI offers a free tier that lets you upload up to 20 files to organize, synthesize, and search your timeline. Premium plans are available for extensive medical histories."
    },
    {
      q: "Can I share my medical timeline with my doctor?",
      a: "Yes. You can generate a temporary secure link or a local QR code. Doctors can scan it to view your structured timeline, key findings, and summary graphs instantly without installing the app."
    },
    {
      q: "Is this app a substitute for professional medical advice?",
      a: "No. Health Tracker AI is a personal health record organizer and information tool. It is designed to help you prepare for physician visits and identify historical trends, but never to diagnose or treat conditions."
    }
  ];

  return (
    <div className="cx-faq-accordion">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className={`cx-faq-item ${isOpen ? "open" : ""}`}>
            <button className="cx-faq-trigger" onClick={() => setOpenIndex(isOpen ? null : i)}>
              <span>{faq.q}</span>
              <ChevronDown size={18} className="cx-faq-chevron" />
            </button>
            <div className="cx-faq-content" style={{ maxHeight: isOpen ? "200px" : "0" }}>
              <p>{faq.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FAQAccordion;
