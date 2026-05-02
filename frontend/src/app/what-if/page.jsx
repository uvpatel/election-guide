'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ArrowRight, BarChart3, Activity } from 'lucide-react';

export default function WhatIfScenario() {
  const [turnoutShift, setTurnoutShift] = useState(0);
  const [economyShift, setEconomyShift] = useState(0);
  const [youthShift, setYouthShift] = useState(0);

  // Simple math logic for instantaneous frontend demonstration
  const baseIncumbent = 50;
  const incumbentProb = Math.min(Math.max(baseIncumbent + (economyShift * 0.4) - (youthShift * 0.3) + (turnoutShift * 0.1), 0), 100);
  const challengerProb = 100 - incumbentProb;

  return (
    <div className="space-y-8 h-full flex flex-col animate-in fade-in duration-700">
      <header>
        <h1 className="text-4xl font-black tracking-tighter text-white flex items-center gap-4">
          <HelpCircle className="w-10 h-10 text-emerald-400" />
          "What If" Sandbox
        </h1>
        <p className="text-slate-400 mt-2">Instantly visualize how macroscopic shifts impact election probabilities.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        
        {/* Sliders Area */}
        <div className="glass-card rounded-3xl p-8 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 flex gap-4 z-10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-xs text-emerald-400 font-mono">LIVE CALCULATION</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-6">Macro Variables</h2>
          
          {/* Slider 1 */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-slate-300">Overall Turnout</span>
              <span className={turnoutShift > 0 ? "text-emerald-400" : turnoutShift < 0 ? "text-rose-400" : "text-slate-400"}>
                {turnoutShift > 0 ? '+' : ''}{turnoutShift}%
              </span>
            </div>
            <input 
              type="range" min="-20" max="20" 
              value={turnoutShift} 
              onChange={(e) => setTurnoutShift(Number(e.target.value))}
              className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Slider 2 */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-slate-300">Economic Confidence</span>
              <span className={economyShift > 0 ? "text-emerald-400" : economyShift < 0 ? "text-rose-400" : "text-slate-400"}>
                {economyShift > 0 ? '+' : ''}{economyShift}%
              </span>
            </div>
            <input 
              type="range" min="-30" max="30" 
              value={economyShift} 
              onChange={(e) => setEconomyShift(Number(e.target.value))}
              className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Slider 3 */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-slate-300">Gen Z Turnout</span>
              <span className={youthShift > 0 ? "text-emerald-400" : youthShift < 0 ? "text-rose-400" : "text-slate-400"}>
                {youthShift > 0 ? '+' : ''}{youthShift}%
              </span>
            </div>
            <input 
              type="range" min="-25" max="25" 
              value={youthShift} 
              onChange={(e) => setYouthShift(Number(e.target.value))}
              className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <button onClick={() => {setTurnoutShift(0); setEconomyShift(0); setYouthShift(0)}} className="mt-8 text-xs font-mono text-slate-500 hover:text-white transition-colors border border-slate-700 px-4 py-2 rounded">
            RESET VARIABLES
          </button>
        </div>

        {/* Live Result Area */}
        <div className="glass-card rounded-3xl p-8 flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-transparent pointer-events-none opacity-50"></div>
          
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-white relative z-10">
            <BarChart3 className="text-emerald-400 w-5 h-5" />
            Outcome Trajectory
          </h3>

          <div className="w-full max-w-md relative z-10">
            <div className="flex justify-between mb-2 text-sm font-bold">
              <span className="text-cyan-400 flex items-center gap-1">Incumbent <ArrowRight className="w-3 h-3"/> {incumbentProb.toFixed(1)}%</span>
              <span className="text-purple-400 flex items-center gap-1">{challengerProb.toFixed(1)}% <ArrowRight className="w-3 h-3"/> Challenger</span>
            </div>
            
            <div className="h-6 bg-slate-900 rounded-full overflow-hidden flex border border-white/10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
              <motion.div 
                className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                animate={{ width: `${incumbentProb}%` }}
                transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
              />
              <motion.div 
                className="h-full bg-purple-500 shadow-[0_0_15px_rgba(192,132,252,0.8)]"
                animate={{ width: `${challengerProb}%` }}
                transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
              />
            </div>
          </div>

          <div className="mt-12 w-full max-w-md bg-slate-900/80 p-5 rounded-xl border border-white/5 relative z-10">
            <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-3 h-3"/> Dynamic Analysis
            </h4>
            <p className="text-sm text-slate-300">
              {economyShift < 0 
                ? "Economic anxiety is acting as a major headwind for the incumbent, forcing numbers down." 
                : economyShift > 0 
                  ? "Strong economic confidence is creating a defensive firewall for the incumbent." 
                  : "The economy is currently a neutral factor."}
              {" "}
              {youthShift > 10 && "The massive surge in Gen Z turnout is heavily disproportionately favoring the challenger."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
