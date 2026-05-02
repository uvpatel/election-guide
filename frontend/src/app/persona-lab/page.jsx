'use client';

import { motion } from 'framer-motion';
import { Users, Brain, Shield, Target } from 'lucide-react';
import { useState } from 'react';

const MOCK_PERSONAS = [
  {
    id: "P-847",
    name: "Gen Z Urban Student",
    sentiment: 68,
    traits: ["Climate First", "Digital Native", "Debt Conscious"],
    color: "from-cyan-400 to-blue-500",
    iconColor: "text-cyan-400"
  },
  {
    id: "P-219",
    name: "Rural Agricultural Worker",
    sentiment: 42,
    traits: ["Tradition Focus", "Subsidies", "Local Economy"],
    color: "from-emerald-400 to-green-600",
    iconColor: "text-emerald-400"
  },
  {
    id: "P-551",
    name: "Suburban Parent",
    sentiment: 55,
    traits: ["Tax Sensitive", "Education", "Safety"],
    color: "from-purple-400 to-pink-500",
    iconColor: "text-purple-400"
  }
];

export default function PersonaLab() {
  const [selected, setSelected] = useState(MOCK_PERSONAS[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="space-y-8 h-full flex flex-col">
      <header>
        <h1 className="text-4xl font-black tracking-tighter text-white flex items-center gap-4">
          <Users className="w-10 h-10 text-cyan-400" />
          Persona Lab
        </h1>
        <p className="text-slate-400 mt-2">AI-Generated demographic psychological modeling.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        {/* List of Personas */}
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-slate-300 uppercase tracking-widest text-sm">Active Models</h2>
            <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors">
              + Generate New
            </button>
          </div>
          
          {MOCK_PERSONAS.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelected(p)}
              className={`p-4 rounded-xl cursor-pointer border transition-all ${
                selected.id === p.id 
                ? 'bg-slate-800/80 border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
                : 'bg-slate-900/40 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-slate-500">{p.id}</span>
                <span className={`text-xs font-bold ${p.iconColor}`}>Base Sent: {p.sentiment}</span>
              </div>
              <h3 className="font-bold text-lg">{p.name}</h3>
            </motion.div>
          ))}
        </div>

        {/* Detailed Inspection Canvas */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-8 relative overflow-hidden flex flex-col">
          <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${selected.color}`}></div>
          
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-3xl font-black text-white">{selected.name}</h2>
              <span className="text-slate-400 font-mono mt-1 block">ID: {selected.id} | Conf: 0.94</span>
            </div>
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selected.color} opacity-20 flex items-center justify-center`}>
              <Brain className={`w-8 h-8 ${selected.iconColor}`} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-950/50 rounded-xl p-5 border border-white/5">
              <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" /> Core Priorities
              </h4>
              <div className="flex flex-wrap gap-2">
                {selected.traits.map(t => (
                  <span key={t} className="px-3 py-1 bg-white/5 rounded-full text-sm text-slate-300 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-950/50 rounded-xl p-5 border border-white/5">
              <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Defense Mechanisms
              </h4>
              <p className="text-sm text-slate-400">
                Highly skeptical of centralized authority. Requires peer-verified data sources for trust acquisition.
              </p>
            </div>
          </div>

          <div className="flex-1 bg-slate-950/80 rounded-xl border border-slate-800 p-6 relative">
            <div className="absolute top-0 left-6 -translate-y-1/2 bg-slate-900 px-2 text-xs font-mono text-cyan-400">AI SYNTHESIS</div>
            <p className="text-slate-300 leading-relaxed text-sm">
              <span className="text-cyan-400 font-bold">Analysis:</span> This persona demonstrates a highly volatile sentiment curve when presented with macroeconomic policy shifts. Based on latest embeddings, they are 42% more likely to respond negatively to tax increases unless explicitly tied to localized educational funding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
