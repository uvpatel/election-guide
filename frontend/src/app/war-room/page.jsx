'use client';

import { motion } from 'framer-motion';
import { Target, TrendingUp, AlertOctagon, Activity } from 'lucide-react';

export default function WarRoom() {
  return (
    <div className="space-y-8 h-full flex flex-col">
      <header>
        <h1 className="text-4xl font-black tracking-tighter text-white flex items-center gap-4">
          <Target className="w-10 h-10 text-rose-500" />
          Narrative War Room
        </h1>
        <p className="text-slate-400 mt-2">Real-time threat detection and organic discourse tracking.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        
        {/* Left Column: Active Threats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card rounded-2xl p-6 border-rose-500/30">
            <h3 className="text-rose-400 font-bold uppercase tracking-wider text-xs mb-4 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4" /> Detected Propaganda
            </h3>
            <div className="space-y-4">
              <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl">
                <span className="text-[10px] font-mono text-rose-300">CONFIDENCE: 94%</span>
                <p className="text-sm text-slate-200 mt-1">"Voter ID laws being bypassed in Northern Districts"</p>
                <div className="w-full bg-slate-900 h-1 mt-3 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full w-[94%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Live Discourse Stream */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 relative overflow-hidden flex flex-col">
           <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
            <Activity className="text-cyan-400 w-5 h-5" />
            Discourse Velocity
          </h2>
          
          <div className="flex-1 border-t border-b border-white/5 py-4 relative flex items-center justify-center">
            {/* Visual placeholder for complex node graph */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900 via-slate-900 to-transparent pointer-events-none"></div>
            
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
              className="w-64 h-64 border border-cyan-500/20 rounded-full flex items-center justify-center relative"
            >
              <div className="absolute w-full h-[1px] bg-cyan-500/20"></div>
              <div className="absolute h-full w-[1px] bg-cyan-500/20"></div>
              
              <motion.div className="absolute top-10 left-10 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)]"></motion.div>
              <motion.div className="absolute bottom-10 right-10 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]"></motion.div>
              <motion.div className="absolute top-20 right-8 w-5 h-5 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)]"></motion.div>
            </motion.div>
            
            <div className="absolute bottom-4 left-4 text-xs font-mono text-slate-500">
              CLUSTER MAPPING ACTIVE
            </div>
          </div>
        </div>

        {/* Right Column: Trending Topics */}
        <div className="lg:col-span-1 glass-card rounded-2xl p-6">
          <h3 className="text-cyan-400 font-bold uppercase tracking-wider text-xs mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Organic Trends
          </h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-sm text-slate-200">#EducationReform</span>
              <span className="text-xs text-cyan-400 font-mono">+42%</span>
            </li>
            <li className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-sm text-slate-200">Local Taxation</span>
              <span className="text-xs text-cyan-400 font-mono">+28%</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-sm text-slate-200">Public Transport</span>
              <span className="text-xs text-cyan-400 font-mono">+15%</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
