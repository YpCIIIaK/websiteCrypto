import React from 'react';
import { Icon } from '@iconify/react';
import Button from '../buttons/Button.jsx';

const plans = [
  {
    name: 'Free / Explorer',
    price: '$0',
    best: 'Trying it out',
  },
  {
    name: 'Plus',
    price: '$12.99',
    best: 'Active hobbyist',
  },
  {
    name: 'Pro',
    price: '$39.99',
    best: 'Power trader / small fund',
  },
];

const planIcons = ["lucide:star","lucide:zap","lucide:rocket"];

const PricingSummarySection = () => (
  <section className="min-h-screen flex flex-col justify-center relative px-4 max-w-4xl mx-auto text-center">
    <div className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full blur-3xl z-0" style={{ backgroundColor: 'rgba(34, 197, 94, 0.18)' }}></div>
    <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full blur-3xl z-0" style={{ backgroundColor: 'rgba(34, 197, 94, 0.12)' }}></div>
    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white drop-shadow-lg relative z-10">
      Pricing
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center mb-8 relative z-10">
      {plans.map((plan, idx) => (
        <div key={plan.name} className="min-w-[220px] max-w-[260px] flex flex-col items-center justify-center relative bg-opacity-40 backdrop-blur-md border border-success rounded-2xl p-8" style={{backgroundColor:'rgba(34,197,94,0.10)',borderColor:'var(--success)'}}>
          <Icon icon={planIcons[idx]} className="text-4xl mb-2" style={{color:idx===0?'#FFD700':idx===1?'var(--success)':'var(--accent-light)',filter:'brightness(1.2) saturate(1.5)'}} />
          <div className="text-xl font-bold text-white mb-2">{plan.name}</div>
          <div className="text-3xl font-extrabold text-success mb-1">{plan.price}</div>
          <div className="text-white/80 text-base mb-2">Best for: <span className="font-semibold text-success">{plan.best}</span></div>
        </div>
      ))}
    </div>
    <div className="relative z-10">
      <a href="/pricing" style={{ textDecoration: 'none' }}>
        <Button text="View all pricing" />
      </a>
    </div>
  </section>
);

export default PricingSummarySection; 