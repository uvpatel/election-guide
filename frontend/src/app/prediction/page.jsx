'use client';

import { motion } from 'framer-motion';
import { BarChart3, ChevronUp, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PredictionEngine() {
  const [incumbentProb, setIncumbentProb] = useState(48.5);
  const [challengerProb, setChallengerProb] = useState(51.5);

  // Simulate a live shifting probability meter
  useEffect(() => {
    const interval = setInterval(() => {
      const shift = (Math.random() * 2 - 1).toFixed(1);
      setIncumbentProb(prev => Math.min(Math.max(prev + parseFloat(shift), 0), 100));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setChallengerProb((100 - incumbentProb).toFixed(1));
  }, [incumbentProb]);

  return (
    <div className="space-y-8 h-full flex flex-col">
      <header>
        <h1 className="text-4xl font-black tracking-tighter text-white flex items-center gap-4">
          <BarChart3 className="w-10 h-10 text-purple-500" />
          Prediction Engine
        </h1>
        <p className="text-slate-400 mt-2">Macro-probabilistic outcomes based on simulated sentiment shifts.</p>
      </header>

      <div className="flex-1 glass-card rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl bg-purple-900/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="text-center mb-12 relative z-10">
          <h2 className="text-sm font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">Live Outcome Probability</h2>
          
          <div className="flex items-center justify-center gap-12 mt-8">
            {/* Incumbent */}
            <div className="flex flex-col items-center">
              <span className="text-6xl font-black text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                {incumbentProb.toFixed(1)}%
              </span>
              <span className="text-slate-300 mt-2 font-bold">Party A (Incumbent)</span>
              <div className="flex items-center gap-1 text-rose-400 text-sm mt-2 font-mono">
                <ChevronDown className="w-4 h-4" /> 1.2% this week
              </div>
            </div>

            <div className="text-4xl text-slate-700 font-light">VS</div>

            {/* Challenger */}
            <div className="flex flex-col items-center">
              <span className="text-6xl font-black text-purple-400 drop-shadow-[0_0_15px_rgba(192,132,252,0.5)]">
                {challengerProb}%
              </span>
              <span className="text-slate-300 mt-2 font-bold">Party B (Challenger)</span>
              <div className="flex items-center gap-1 text-emerald-400 text-sm mt-2 font-mono">
                <ChevronUp className="w-4 h-4" /> 1.2% this week
              </div>
            </div>
          </div>
        </div>

        {/* Probability Meter Bar */}
        <div className="w-full max-w-4xl mx-auto h-8 bg-slate-900 rounded-full overflow-hidden flex border border-white/10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] relative z-10">
          <motion.div 
            className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
            animate={{ width: `${incumbentProb}%` }}
            transition={{ type: "spring", bounce: 0.2, duration: 1 }}
          />
          <motion.div 
            className="h-full bg-purple-500 shadow-[0_0_15px_rgba(192,132,252,0.8)]"
            animate={{ width: `${challengerProb}%` }}
            transition={{ type: "spring", bounce: 0.2, duration: 1 }}
          />
        </div>

        {/* AI Explanation Popup Trigger area */}
        <div className="mt-12 max-w-2xl mx-auto bg-slate-900/80 p-6 rounded-2xl border border-white/5 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 font-bold text-sm uppercase">AI Synthesis</h3>
            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded font-mono">CONFIDENCE: HIGH</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            The recent spike in <span className="text-cyan-400">Urban Student</span> sentiment regarding the climate policy debate has slightly shifted the probability towards Party B. However, Party A retains a strong firewall in <span className="text-purple-400">Rural demographics</span>. The deciding factor will be voter turnout in suburban districts.
          </p>
        </div>

      </div>
    </div>
  );
}
