'use client';

import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

const generateWaveData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: i,
    sentiment: 50 + Math.random() * 40 - 20,
    volatility: Math.random() * 100
  }));
};

export default function Home() {
  const [data, setData] = useState(generateWaveData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: prev[prev.length - 1].time + 1,
          sentiment: 50 + Math.random() * 40 - 20,
          volatility: Math.random() * 100
        });
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Global Sentiment
          </h1>
          <p className="text-slate-400 mt-2 text-lg uppercase tracking-widest text-xs font-bold">
            Live Intelligence Feed • System Active
          </p>
        </div>
      </header>

      {/* Ticker */}
      <div className="glass-card rounded-2xl p-4 flex items-center gap-4 overflow-hidden relative">
        <div className="bg-purple-500/20 text-neon-purple px-3 py-1 rounded text-xs font-bold whitespace-nowrap z-10 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" /> TRENDING NOW
        </div>
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap text-sm text-slate-300"
        >
          <span>🔥 Tax Reform policy surging in Urban areas</span>
          <span className="text-rose-400">⚠️ Disinformation detected in Region B</span>
          <span className="text-cyan-400">📊 Gen Z voter turnout predicted +12%</span>
          <span>🔥 Tax Reform policy surging in Urban areas</span>
          <span className="text-rose-400">⚠️ Disinformation detected in Region B</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Wave Graph */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 h-[400px] flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 flex gap-4 z-10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
              <span className="text-xs text-cyan-400 font-mono">LIVE SYNC</span>
            </div>
          </div>
          
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Activity className="text-cyan-400 w-5 h-5" />
            Public Pulse Index
          </h2>
          
          <div className="flex-1 -mx-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sentiment" 
                  stroke="#22d3ee" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSentiment)" 
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Stats */}
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-500/20 blur-2xl rounded-full group-hover:bg-purple-400/30 transition-colors"></div>
            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Volatility Index</h3>
            <div className="text-5xl font-black text-white">42.8<span className="text-xl text-purple-400 ml-1">%</span></div>
            <p className="text-xs text-slate-500 mt-2">Driven by recent policy debates</p>
          </div>

          <div className="glass-card rounded-3xl p-6 relative overflow-hidden group">
             <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-500/20 blur-2xl rounded-full group-hover:bg-rose-400/30 transition-colors"></div>
            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Active Threats
            </h3>
            <div className="text-3xl font-black text-white mt-2">3 <span className="text-sm font-normal text-slate-400">Narratives Flagged</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
