import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: 'lucide:bar-chart-2',
    title: 'Token analytics',
    desc: 'Deep analytics for tokens and markets, all in one place.',
    tag: 'analytics',
  },
  {
    icon: 'lucide:activity',
    title: 'Price forecasts',
    desc: 'AI-powered price predictions for smarter trading.',
    tag: 'forecast',
  },
  {
    icon: 'lucide:bot',
    title: 'AI Copilot',
    desc: 'Chat-based assistant for trading help and insights.',
    tag: 'copilot',
  },
  {
    icon: 'lucide:flask-conical',
    title: 'Backtesting',
    desc: 'Test your strategies on historical data instantly.',
    tag: 'backtest',
  },
  {
    icon: 'lucide:zap',
    title: 'Smart trading bot',
    desc: 'Automate multi-token trading with a single smart bot.',
    tag: 'automation',
  },
];

const iconColor = 'var(--success)';

const ProductFeaturesSection = () => (
  <section className="relative py-24 px-4 max-w-6xl mx-auto text-center">
    <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl z-0" style={{ backgroundColor: 'rgba(34, 197, 94, 0.18)' }}></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl z-0" style={{ backgroundColor: 'rgba(34, 197, 94, 0.12)' }}></div>
    <h2 className="text-4xl md:text-5xl font-bold mb-10 text-white drop-shadow-lg relative z-10">
      What we offer
    </h2>
    <div className="flex flex-col items-center gap-8 mb-12 relative z-10">
      <div className="flex flex-row justify-center gap-8 w-full max-w-4xl">
        {features.slice(0,3).map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative bg-opacity-40 backdrop-blur-md border border-success rounded-2xl p-6 flex-1 min-w-[220px] max-w-xs"
            style={{backgroundColor:'rgba(34,197,94,0.10)',borderColor:'var(--success)'}}
          >
            <div className="flex items-center gap-3 mb-4 justify-center">
              <Icon icon={f.icon} className="text-4xl drop-shadow-lg" style={{ color: iconColor, filter: 'brightness(1.2) saturate(1.5)' }} />
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold" style={{backgroundColor:'rgba(34,197,94,0.12)',color:'var(--success)'}}>{f.tag}</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white drop-shadow-lg">{f.title}</h3>
            <p className="text-base mb-4 text-white/90" style={{ color: '#EAF7F0' }}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-row justify-center gap-8 w-full max-w-2xl">
        {features.slice(3).map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (i+3) * 0.15 }}
            className="relative bg-opacity-40 backdrop-blur-md border border-success rounded-2xl p-6 flex-1 min-w-[220px] max-w-xs"
            style={{backgroundColor:'rgba(34,197,94,0.10)',borderColor:'var(--success)'}}
          >
            <div className="flex items-center gap-3 mb-4 justify-center">
              <Icon icon={f.icon} className="text-4xl drop-shadow-lg" style={{ color: iconColor, filter: 'brightness(1.2) saturate(1.5)' }} />
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold" style={{backgroundColor:'rgba(34,197,94,0.12)',color:'var(--success)'}}>{f.tag}</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white drop-shadow-lg">{f.title}</h3>
            <p className="text-base mb-4 text-white/90" style={{ color: '#EAF7F0' }}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductFeaturesSection; 