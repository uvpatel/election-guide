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
    const newSocket = io('http://localhost:8080');
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
      await fetch('http://localhost:8080/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ policyText, region })
      });
    } catch (e) {
      console.error(e);
      setIsSimulating(false);
    }
  };

  return (
    <div className="w-full bg-slate-900 rounded-xl p-6 border border-slate-700 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-4">Sentiment Simulator</h2>
      <div className="flex flex-col gap-4 mb-6">
        <textarea
          className="w-full bg-slate-800 text-slate-100 p-4 rounded-lg border border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          rows={3}
          placeholder="Enter a proposed policy (e.g., 'Free public transport for students')"
          value={policyText}
          onChange={(e) => setPolicyText(e.target.value)}
        />
        <div className="flex gap-4">
          <select 
            className="bg-slate-800 text-slate-200 p-3 rounded-lg border border-slate-600 outline-none"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="National">National</option>
            <option value="Urban">Urban Areas</option>
            <option value="Rural">Rural Areas</option>
          </select>
          <button 
            onClick={runSimulation}
            disabled={isSimulating}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50"
          >
            {isSimulating ? 'Simulating...' : 'Run Simulation'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {reactions.map((reaction, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-slate-800 rounded-lg border border-slate-700 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-emerald-400">{reaction.personaId}</span>
                <span className={`px-2 py-1 text-xs font-bold rounded ${reaction.sentimentDelta > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {reaction.sentimentDelta > 0 ? '+' : ''}{reaction.sentimentDelta} Sentiment
                </span>
              </div>
              <p className="text-slate-300 italic">"{reaction.reactionQuote}"</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
