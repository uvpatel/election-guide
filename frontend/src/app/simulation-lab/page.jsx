'use client';

import SimulationCanvas from '@/components/SimulationCanvas';
import { Zap } from 'lucide-react';

export default function SimulationLabPage() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
      <header>
        <h1 className="text-4xl font-black tracking-tighter text-white flex items-center gap-4">
          <Zap className="w-10 h-10 text-cyan-400" />
          Simulation Lab
        </h1>
        <p className="text-slate-400 mt-2">Inject events into the system to observe real-time persona reaction cascades.</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <SimulationCanvas />
      </div>
    </div>
  );
}
