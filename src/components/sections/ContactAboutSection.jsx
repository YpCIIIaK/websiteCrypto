import React from 'react';
import { Icon } from '@iconify/react';

const ContactAboutSection = () => (
  <section className="relative py-20 px-4 max-w-3xl mx-auto text-center">
    <div className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full blur-3xl z-0" style={{ backgroundColor: 'rgba(34, 197, 94, 0.18)' }}></div>
    <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full blur-3xl z-0" style={{ backgroundColor: 'rgba(34, 197, 94, 0.12)' }}></div>
    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white drop-shadow-lg relative z-10">
      Contact & About
    </h2>
    <p className="text-lg text-white/90 mb-6 relative z-10">
      Why we're building Vortan: Most new traders lose money due to inexperience, lack of forecasting, and technical barriers. Vortan solves this with analytics, AI-powered forecasts, an assistant, and smart bots — making advanced trading accessible to everyone.
    </p>
    <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-6 mb-6 relative z-10">
      <div className="min-w-[280px] max-w-[380px] flex flex-col items-center justify-center relative bg-opacity-40 backdrop-blur-md border border-success rounded-2xl p-6" style={{backgroundColor:'rgba(34,197,94,0.10)',borderColor:'var(--success)'}}>
        <div className="text-lg font-bold text-success mb-2">Email</div>
        <a href="mailto:baikurazov@vortan.org" className="inline-flex items-center gap-2 font-bold text-lg bg-success text-white px-6 py-3 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition mb-2">
          <Icon icon="lucide:mail" className="text-2xl" style={{color:'#fff'}} /> baikurazov@vortan.org
        </a>
        <a href="mailto:vladimirov@vortan.org" className="inline-flex items-center gap-2 font-bold text-lg bg-success text-white px-6 py-3 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition">
          <Icon icon="lucide:mail" className="text-2xl" style={{color:'#fff'}} /> vladimirov@vortan.org
        </a>
      </div>
      <div className="min-w-[220px] max-w-[260px] flex flex-col items-center justify-center relative bg-opacity-40 backdrop-blur-md border border-success rounded-2xl p-6" style={{backgroundColor:'rgba(34,197,94,0.10)',borderColor:'var(--success)'}}>
        <div className="text-lg font-bold text-success mb-2">GitHub</div>
        <a href="https://github.com/YpCIIIaK" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-lg text-success px-6 py-3 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition mb-2 bg-white">
          <Icon icon="mdi:github" className="text-2xl" style={{color:'var(--success)'}} /> @YpCIIIaK
        </a>
        <a href="https://github.com/ruhalis" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-lg text-success px-6 py-3 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition bg-white">
          <Icon icon="mdi:github" className="text-2xl" style={{color:'var(--success)'}} /> @ruhalis
        </a>
      </div>
      <div className="min-w-[220px] max-w-[260px] flex flex-col items-center justify-center relative bg-opacity-40 backdrop-blur-md border border-success rounded-2xl p-6" style={{backgroundColor:'rgba(34,197,94,0.10)',borderColor:'var(--success)'}}>
        <div className="text-lg font-bold text-success mb-2">Telegram</div>
        <a href="https://t.me/bigboyvova" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-lg text-success px-6 py-3 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition mb-2 bg-white">
          <Icon icon="mdi:telegram" className="text-2xl" style={{color:'var(--success)'}} /> @bigboyvova
        </a>
        <a href="https://t.me/ruhalis" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-lg text-success px-6 py-3 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition bg-white">
          <Icon icon="mdi:telegram" className="text-2xl" style={{color:'var(--success)'}} /> @ruhalis
        </a>
      </div>
    </div>
    <a href="/pitchdeck.pdf" download className="inline-flex items-center gap-2 font-bold text-lg bg-success text-white px-8 py-3 rounded-2xl shadow-lg hover:opacity-90 active:scale-95 transition mt-4">
      <Icon icon="lucide:file-text" className="text-2xl" style={{color:'#fff'}} /> Download Pitch Deck
    </a>
  </section>
);

export default ContactAboutSection; 