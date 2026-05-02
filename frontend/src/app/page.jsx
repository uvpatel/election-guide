import SimulationCanvas from '@/components/SimulationCanvas';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="border-b border-slate-800 pb-6 mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
            Pulse of Democracy AI
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Modeling voter psychology, public sentiment, and election intelligence.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <SimulationCanvas />
            
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 shadow-xl">
              <h3 className="text-xl font-bold mb-4">Narrative War Room</h3>
              <div className="flex items-center justify-center h-48 border-2 border-dashed border-slate-700 rounded-lg text-slate-500">
                <p>Real-time narrative tracking visualization goes here.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 shadow-xl">
              <h3 className="text-xl font-bold mb-4">Active Personas</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center bg-slate-800 p-3 rounded">
                  <span>Gen Z Urban Student</span>
                  <span className="text-xs bg-emerald-900 text-emerald-400 px-2 py-1 rounded">Active</span>
                </li>
                <li className="flex justify-between items-center bg-slate-800 p-3 rounded">
                  <span>Rural Farmer</span>
                  <span className="text-xs bg-emerald-900 text-emerald-400 px-2 py-1 rounded">Active</span>
                </li>
                <li className="flex justify-between items-center bg-slate-800 p-3 rounded">
                  <span>Suburban Parent</span>
                  <span className="text-xs bg-emerald-900 text-emerald-400 px-2 py-1 rounded">Active</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-rose-400">Local Issue Alerts</h3>
              <div className="p-3 bg-rose-950/30 border border-rose-900 rounded text-sm text-rose-200">
                <strong>Alert:</strong> Spike in "water scarcity" mentions in Rural regions. 
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
