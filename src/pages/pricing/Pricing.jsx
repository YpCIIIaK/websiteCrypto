import React from 'react';
import Button from '../../components/buttons/Button';

const baseFeatures = [
  '3 Watch-list symbols',
  'Token Analysis',
  'Basic price ping alerts',
  '1 spot bot',
  'Ads shown',
];

const plusNew = [
  'Unlimited Watch-list symbols',
  'Portfolio Analysis',
  'AI Copilot',
  '5 spot bots',
  'Custom price & volume alerts',
  'API (60 req/min)',
  'Ad-free UI',
];

const proNew = [
  'Unlimited spot + derivatives',
  'Strategy + risk alerts',
  'API (180 req/min)',
];

const bestFor = [
  'Trying it out',
  'Active hobbyist',
  'Power trader / small fund',
];

const plans = [
  {
    name: 'Free / Explorer',
    price: '$0',
    period: 'per month',
    features: baseFeatures,
    best: bestFor[0],
    button: 'Start Free',
    highlight: false,
    note: null,
  },
  {
    name: 'Plus',
    price: '$12.99',
    period: 'per month',
    features: plusNew,
    best: bestFor[1],
    button: 'Get Plus',
    highlight: true,
    note: 'Everything from previous tier, plus:',
  },
  {
    name: 'Pro',
    price: '$39.99',
    period: 'per month',
    features: proNew,
    best: bestFor[2],
    button: 'Get Pro',
    highlight: false,
    note: 'Everything from previous tier, plus:',
  },
];

const check = <span style={{color: 'var(--success)', fontWeight: 700, fontSize: 18}}>✓</span>;

const Pricing = () => {
  return (
    <div className="min-h-screen bg-brand py-16 px-2">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 mt-10" style={{color: 'var(--success)'}}>Pricing</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <div
            key={plan.name}
            className={`rounded-2xl shadow-lg p-8 flex flex-col items-center border transition-all duration-300 ${
              plan.highlight
                ? 'border-[var(--success)] bg-[#245135] scale-105'
                : 'border-[#245135] bg-[#1a2a1e]'
            }`}
            style={plan.highlight ? {boxShadow: '0 0 0 2px var(--success), 0 8px 32px #0004'} : {}}
          >
            <h2 className="text-2xl font-bold mb-2 text-white">{plan.name}</h2>
            <div className="text-3xl font-extrabold mb-1" style={{color: 'var(--success)'}}>{plan.price}</div>
            <div className="text-sm text-gray-400 mb-2">{plan.period}</div>
            <ul className="w-full mb-6 space-y-2 text-left">
              {plan.note && (
                <li className="mb-2 text-white/80 font-semibold">{plan.note}</li>
              )}
              {plan.features.map((f, i) => (
                <li key={f} className="flex items-center gap-2 text-white/90">
                  {check} <span className="font-bold text-[var(--success)]">{f}</span>
                </li>
              ))}
              <li className="mt-4">
                <span className="block text-xs text-gray-400 mb-1">Best for:</span>
                <span className="font-bold text-white">{plan.best}</span>
              </li>
            </ul>
            <Button
              text={plan.button}
              variant={plan.highlight ? 'primary' : 'secondary'}
              onClick={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;