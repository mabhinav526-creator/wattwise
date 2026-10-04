import { ArrowRight, Zap, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import { ScreenId } from '../../types';

interface WelcomeScreenProps {
  onStart: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="relative h-full flex flex-col justify-between p-6 bg-gradient-to-b from-[#071328] via-[#091834] to-[#040a17] text-white overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-12 -left-20 w-72 h-72 rounded-full bg-cyan-600/15 blur-[90px] pointer-events-none" />
      <div className="absolute top-48 -right-20 w-80 h-80 rounded-full bg-emerald-600/10 blur-[100px] pointer-events-none" />

      {/* Top Brand Tag */}
      <div className="pt-2 z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/40 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <img
            src="/wattwise-logo.jpg"
            alt="WattWise Logo"
            className="w-5 h-5 rounded-md object-cover border border-cyan-400/40"
            referrerPolicy="no-referrer"
          />
          <span className="text-xs font-bold tracking-wide text-cyan-300">WattWise OS 3.2</span>
        </div>

        <span className="text-[10px] text-slate-400 font-mono-num">REDUCE • SAVE • SUSTAIN</span>
      </div>

      {/* Center Illustrated Smart Home Art */}
      <div className="my-auto z-10 flex flex-col items-center text-center">
        <div className="relative w-64 h-56 mb-6 flex items-center justify-center">
          {/* Stylized Modern House Illustration with Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-950/60 via-slate-900/80 to-blue-950/60 border border-cyan-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center">
            {/* Architectural SVG vector house with glowing solar & warm lights */}
            <svg viewBox="0 0 240 180" className="w-full h-full p-3 drop-shadow-lg">
              <defs>
                <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="solarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="warmWindow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>

              {/* Night Sky Stars */}
              <circle cx="20" cy="25" r="1" fill="#94a3b8" />
              <circle cx="85" cy="18" r="1.5" fill="#38bdf8" />
              <circle cx="160" cy="30" r="1" fill="#94a3b8" />
              <circle cx="220" cy="20" r="1.5" fill="#38bdf8" />

              {/* House Main Body */}
              <polygon points="120,30 210,80 210,165 30,165 30,80" fill="url(#roofGrad)" stroke="#334155" strokeWidth="1.5" />
              
              {/* Solar Panels on Roof */}
              <polygon points="120,38 185,75 165,85 105,48" fill="url(#solarGrad)" opacity="0.85" stroke="#38bdf8" strokeWidth="0.8" />
              <line x1="125" y1="49" x2="145" y2="79" stroke="#083344" strokeWidth="1" />
              <line x1="145" y1="60" x2="165" y2="90" stroke="#083344" strokeWidth="1" />

              {/* Ground & Driveway */}
              <rect x="15" y="165" width="210" height="6" rx="3" fill="#1e293b" />

              {/* Windows with warm glowing interior lights (turns glowing on and off every 2s) */}
              <g className="animate-window-glow">
                {/* Left Window Glow */}
                <rect
                  x="48"
                  y="95"
                  width="34"
                  height="42"
                  rx="3"
                  fill="url(#warmWindow)"
                />
                {/* Right Window Glow */}
                <rect
                  x="100"
                  y="95"
                  width="36"
                  height="42"
                  rx="3"
                  fill="url(#warmWindow)"
                />
              </g>

              {/* Window Frame Panes (Frames stay crisp while light glows on/off) */}
              <line x1="65" y1="95" x2="65" y2="137" stroke="#78350f" strokeWidth="1.5" />
              <line x1="48" y1="116" x2="82" y2="116" stroke="#78350f" strokeWidth="1.5" />
              <line x1="118" y1="95" x2="118" y2="137" stroke="#78350f" strokeWidth="1.5" />
              
              {/* Smart Entrance Door */}
              <rect x="155" y="105" width="30" height="60" rx="2" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
              <circle cx="162" cy="136" r="2" fill="#06b6d4" />

              {/* Energy Aura Pulse around the house */}
              <circle cx="120" cy="100" r="75" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
            </svg>

            {/* App Logo Emblem in Center of Welcome Screen */}
            <div className="absolute -bottom-4 px-3 py-1 rounded-2xl bg-[#08172c] border border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2">
              <img
                src="/wattwise-logo.jpg"
                alt="WattWise App Logo"
                className="w-7 h-7 rounded-lg object-cover border border-cyan-400/40"
                referrerPolicy="no-referrer"
              />
              <span className="text-xs font-extrabold tracking-tight text-white">
                WattWise <span className="text-cyan-400 font-normal">OS</span>
              </span>
            </div>
          </div>
        </div>

        {/* Headline & Subtitle matching the mockup */}
        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
          Smarter Homes.<br />
          <span className="text-cyan-400">Greener Tomorrow.</span>
        </h1>

        <p className="text-xs text-slate-300 max-w-[280px] leading-relaxed mb-6">
          Track your real-time electricity usage, unlock AI-driven insights, and automate appliance savings effortlessly.
        </p>

        {/* Feature Pills */}
        <div className="grid grid-cols-2 gap-2 w-full max-w-[300px] mb-2 text-left">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200">
            <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="text-[11px] font-medium">Real-Time kW</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-[11px] font-medium">AI Optimization</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-[11px] font-medium">Peak Shifting</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200">
            <Leaf className="w-3.5 h-3.5 text-green-400 shrink-0" />
            <span className="text-[11px] font-medium">Lower Carbon</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="z-10 flex flex-col gap-3 pt-2">
        <button
          id="welcome-get-started-btn"
          onClick={onStart}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          id="welcome-login-btn"
          onClick={onStart}
          className="text-xs text-slate-400 hover:text-cyan-300 transition-colors py-1 cursor-pointer"
        >
          Already have an account? <span className="text-cyan-400 font-semibold underline underline-offset-2">Log In</span>
        </button>
      </div>
    </div>
  );
}
