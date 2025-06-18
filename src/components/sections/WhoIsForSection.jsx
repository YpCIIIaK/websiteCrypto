import React from 'react';
import { Icon } from '@iconify/react';

const WhoIsForSection = () => (
  <section className="relative py-20 px-4 max-w-4xl mx-auto text-center">
    <div className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full blur-3xl z-0" style={{ backgroundColor: 'rgba(34, 197, 94, 0.18)' }}></div>
    <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full blur-3xl z-0" style={{ backgroundColor: 'rgba(34, 197, 94, 0.12)' }}></div>
    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-lg relative z-10">
      Who it's for
    </h2>
    <p className="text-xl text-white/90 mb-8 relative z-10">
      For amateur & time-poor crypto traders who want to protect their capital and stop impulse trading.
    </p>
    <div className="flex flex-col md:flex-row justify-center gap-8 relative z-10">
      <div className="relative bg-opacity-40 backdrop-blur-md border border-success rounded-2xl p-6 flex flex-col items-center" style={{backgroundColor:'rgba(34,197,94,0.10)',borderColor:'var(--success)'}}>
        <Icon icon="lucide:trending-down" className="text-4xl mb-2" style={{color:'var(--accent-light)',filter:'brightness(1.2) saturate(1.5)'}} />
        <div className="text-4xl font-extrabold text-success mb-2">~75%</div>
        <div className="text-base text-white/80">of new traders underperform buy & hold</div>
      </div>
      <div className="relative bg-opacity-40 backdrop-blur-md border border-success rounded-2xl p-6 flex flex-col items-center" style={{backgroundColor:'rgba(34,197,94,0.10)',borderColor:'var(--success)'}}>
        <Icon icon="lucide:bot" className="text-4xl mb-2" style={{color:'var(--success)',filter:'brightness(1.2) saturate(1.5)'}} />
        <div className="text-4xl font-extrabold text-success mb-2">67%</div>
        <div className="text-base text-white/80">trust AI to invest (FIS 2025)</div>
      </div>
    </div>
  </section>
);

export default WhoIsForSection; 