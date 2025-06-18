import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Button from '../buttons/Button.jsx';

const WhatIsVortanSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl z-0" style={{ backgroundColor: 'rgba(34, 197, 94, 0.18)' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] rounded-full blur-3xl z-0" style={{ backgroundColor: 'rgba(34, 197, 94, 0.12)' }}></div>
      <motion.div
        initial={{ opacity:0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-2 flex justify-center"
      >
        <span
          className="px-4 py-1.5 rounded-full text-sm font-bold inline-flex items-center shadow"
          style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'var(--success)' }}
        >
          <Icon icon="lucide:zap" className="mr-1.5" /> AI-powered
        </span>
      </motion.div>
      <motion.h1
        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: 'linear-gradient(to right, #fff, #22C55E)' }}
        >
          AI-powered crypto analytics & trading assistant
        </span>
      </motion.h1>
      <motion.p
        className="text-2xl md:text-3xl mb-10 max-w-2xl mx-auto text-white drop-shadow"
        style={{ color: '#fff' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Vortan helps retail traders make smarter decisions with real-time price forecasting, volatility insights, and an AI copilot for strategy — no coding needed.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="relative z-10">
        <a href="#waitlist" style={{ textDecoration: 'none' }}>
          <Button text="Get early access" />
        </a>
      </motion.div>
    </section>
  );
};

export default WhatIsVortanSection; 