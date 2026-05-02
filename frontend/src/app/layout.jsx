import './globals.css'
import Link from 'next/link'
import { Activity, Users, Zap, Target, BarChart3 } from 'lucide-react'

export const metadata = {
  title: 'Pulse of Democracy AI',
  description: 'Next-generation civic intelligence engine',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="flex h-screen overflow-hidden antialiased bg-slate-950 text-slate-50 selection:bg-cyan-500/30">
        
        {/* Futuristic Sidebar */}
        <nav className="w-20 md:w-64 border-r border-white/10 glass-panel flex flex-col justify-between z-50">
          <div className="p-4 md:p-6 space-y-8">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                <Activity className="text-white w-5 h-5" />
              </div>
              <span className="hidden md:block font-bold text-lg tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Pulse AI
              </span>
            </div>

            <ul className="space-y-4">
              <NavItem href="/" icon={<Activity />} label="Dashboard" />
              <NavItem href="/persona-lab" icon={<Users />} label="Persona Lab" />
              <NavItem href="/simulation-lab" icon={<Zap />} label="Simulation" />
              <NavItem href="/war-room" icon={<Target />} label="War Room" />
              <NavItem href="/prediction" icon={<BarChart3 />} label="Predictor" />
            </ul>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto relative scroll-smooth">
          {/* Subtle background grid pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
          
          <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}

function NavItem({ href, icon, label }) {
  return (
    <li>
      <Link href={href} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group text-slate-400 hover:text-cyan-400">
        <span className="group-hover:scale-110 transition-transform group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
          {icon}
        </span>
        <span className="hidden md:block font-medium">{label}</span>
      </Link>
    </li>
  )
}
