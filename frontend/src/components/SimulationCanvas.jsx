'use client';

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';

export default function SimulationCanvas() {
  const [policyText, setPolicyText] = useState("");
  const [region, setRegion] = useState("National");
  const [isSimulating, setIsSimulating] = useState(false);
  const [reactions, setReactions] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('https://pulse-backend-164617921386.asia-south1.run.app');
    setSocket(newSocket);

    newSocket.on('simulation:start', (data) => {
      setReactions([]);
      setIsSimulating(true);
    });

    newSocket.on('simulation:update', (data) => {
      setReactions((prev) => [...prev, data]);
    });

    newSocket.on('simulation:complete', () => {
      setIsSimulating(false);
    });

    return () => newSocket.close();
  }, []);

  const runSimulation = async () => {
    if (!policyText) return;
    setIsSimulating(true);
    try {
      await fetch('https://pulse-backend-164617921386.asia-south1.run.app/api/simulate-sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventText: policyText, personas: [{ id: "P-847", demographic: "Gen Z Urban Student", core_values: ["climate", "education", "jobs"] }, { id: "P-219", demographic: "Rural Farmer", core_values: ["agriculture", "subsidies", "infrastructure"] }, { id: "P-551", demographic: "Suburban Parent", core_values: ["taxes", "healthcare", "safety"] }] })
      });
    } catch (e) {
      console.error(e);
      setIsSimulating(false);
    }
  };

  return (
    <div className="w-full glass-card rounded-3xl p-8 relative">
      <div className="absolute top-0 right-0 p-8 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`}></div>
        <span className="text-xs font-mono text-slate-400">ENGINE STATUS</span>
      </div>

      <h2 className="text-2xl font-bold text-white mb-6">Inject Scenario</h2>
      
      <div className="flex flex-col gap-6 mb-8">
        <textarea
          className="w-full bg-slate-900/50 text-slate-100 p-5 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none transition-all placeholder:text-slate-600"
          rows={3}
          placeholder="Enter a proposed policy, scandal, or event (e.g., 'A sudden 5% tax increase on digital services')"
          value={policyText}
          onChange={(e) => setPolicyText(e.target.value)}
        />
        <div className="flex gap-4">
          <select 
            className="bg-slate-900/50 text-slate-300 p-4 rounded-xl border border-white/10 outline-none focus:border-cyan-500/50"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="National">Scope: National</option>
            <option value="Urban">Scope: Urban Centers</option>
            <option value="Rural">Scope: Rural Districts</option>
          </select>
          <button 
            onClick={runSimulation}
            disabled={isSimulating}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
          >
            {isSimulating ? 'COMPUTING REACTION MATRIX...' : 'EXECUTE SIMULATION'}
          </button>
        </div>
      </div>

      <div className="space-y-4 relative">
        {reactions.length === 0 && !isSimulating && (
          <div className="h-32 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-slate-600 font-mono text-sm">
            WAITING FOR SCENARIO INPUT...
          </div>
        )}
        <AnimatePresence>
          {reactions.map((reaction, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-5 bg-slate-900/60 rounded-xl border border-white/5 flex flex-col gap-3 relative overflow-hidden"
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${reaction.sentimentDelta > 0 ? 'bg-emerald-400' : 'bg-rose-400'}`}></div>
              <div className="flex justify-between items-center pl-2">
                <span className="font-bold text-white tracking-wide">{reaction.personaId}</span>
                <span className={`px-3 py-1 text-xs font-black rounded-full border ${reaction.sentimentDelta > 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                  {reaction.sentimentDelta > 0 ? '▲' : '▼'} {Math.abs(reaction.sentimentDelta)} SHIFT
                </span>
              </div>
              <p className="text-slate-300 italic pl-2 font-serif">"{reaction.reactionQuote}"</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
