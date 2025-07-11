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

const iconColor = 'hsl(var(--success))';

const ProductFeaturesSection = () => (
  <section className="min-h-screen flex flex-col justify-center relative px-4 max-w-6xl mx-auto text-center">
    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl z-0"></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl z-0"></div>
    <h2 className="text-4xl md:text-5xl font-bold mb-10 text-text-base drop-shadow-lg relative z-10">
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
            className="relative bg-surface/40 backdrop-blur-md border border-success rounded-2xl p-6 flex-1 min-w-[220px] max-w-xs"
          >
            <div className="flex items-center gap-3 mb-4 justify-center">
              <Icon icon={f.icon} className="text-4xl text-success drop-shadow-lg" />
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-success/10 text-success">{f.tag}</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-text-base drop-shadow-lg">{f.title}</h3>
            <p className="text-base mb-4 text-text-muted">{f.desc}</p>
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
            className="relative bg-surface/40 backdrop-blur-md border border-success rounded-2xl p-6 flex-1 min-w-[220px] max-w-xs"
          >
            <div className="flex items-center gap-3 mb-4 justify-center">
              <Icon icon={f.icon} className="text-4xl text-success drop-shadow-lg" />
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-success/10 text-success">{f.tag}</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-text-base drop-shadow-lg">{f.title}</h3>
            <p className="text-base mb-4 text-text-muted">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductFeaturesSection; 