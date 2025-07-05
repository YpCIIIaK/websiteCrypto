import React from 'react';
import { Icon } from '@iconify/react';
import Button from '../buttons/Button.jsx';

const ContactAboutSection = () => (
  <section className="min-h-screen flex flex-col justify-center relative px-4 max-w-3xl mx-auto text-center mb-16">
    <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl z-0"></div>
    <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl z-0"></div>
    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-text-base drop-shadow-lg relative z-10">
      Contact & About
    </h2>
    <p className="text-lg text-text-muted mb-6 relative z-10">
      Why we're building Vortan: Most new traders lose money due to inexperience, lack of forecasting, and technical barriers. Vortan solves this with analytics, AI-powered forecasts, an assistant, and smart bots — making advanced trading accessible to everyone.
    </p>
    <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-6 mb-8 relative z-10">
      <div className="min-w-[280px] max-w-[380px] flex flex-col items-center justify-center relative bg-surface/40 backdrop-blur-md border border-success rounded-2xl p-6">
        <div className="text-lg font-bold text-success mb-2">Email</div>
        <a href="mailto:baikurazov@vortan.org" className="inline-flex items-center gap-2 font-bold text-lg bg-success text-white px-6 py-3 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition mb-2">
          <Icon icon="lucide:mail" className="text-2xl" /> baikurazov@vortan.org
        </a>
        <a href="mailto:vladimirov@vortan.org" className="inline-flex items-center gap-2 font-bold text-lg bg-success text-white px-6 py-3 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition">
          <Icon icon="lucide:mail" className="text-2xl" /> vladimirov@vortan.org
        </a>
      </div>
      <div className="min-w-[220px] max-w-[260px] flex flex-col items-center justify-center relative bg-surface/40 backdrop-blur-md border border-success rounded-2xl p-6">
        <div className="text-lg font-bold text-success mb-2">GitHub</div>
        <a href="https://github.com/YpCIIIaK" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-lg text-success px-6 py-3 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition mb-2 bg-white">
          <Icon icon="mdi:github" className="text-2xl text-success" /> @YpCIIIaK
        </a>
        <a href="https://github.com/ruhalis" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-lg text-success px-6 py-3 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition bg-white">
          <Icon icon="mdi:github" className="text-2xl text-success" /> @ruhalis
        </a>
      </div>
      <div className="min-w-[280px] max-w-[380px] flex flex-col items-center justify-center relative bg-surface/40 backdrop-blur-md border border-success rounded-2xl p-6">
        <div className="text-lg font-bold text-success mb-2">LinkedIn</div>
        <a href="https://www.linkedin.com/in/arlan-baikurazov/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-lg text-success px-6 py-3 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition mb-2 bg-white">
          <Icon icon="mdi:linkedin" className="text-2xl text-success" /> @arlan-baikurazov
        </a>
        <a href="https://www.linkedin.com/in/vladimir-vladimirov-b635602b6/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-lg text-success px-6 py-3 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition bg-white">
          <Icon icon="mdi:linkedin" className="text-2xl text-success" /> @vladimir-vladimirov
        </a>
      </div>
    </div>
    <div className="relative z-10 mt-4">
      <a href="/pitchdeck.pdf" download style={{ textDecoration: 'none' }}>
        <Button>Download Pitch Deck</Button>
      </a>
    </div>
  </section>
);

export default ContactAboutSection; 