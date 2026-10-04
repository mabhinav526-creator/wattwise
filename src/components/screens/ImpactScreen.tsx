import { ArrowLeft, Leaf, IndianRupee, CloudRain, Award, Sparkles } from 'lucide-react';
import { ScreenId } from '../../types';

interface ImpactScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export function ImpactScreen({ onNavigate }: ImpactScreenProps) {
  const savedKwh = 32.4;
  const moneySavedRupees = 420;
  const co2ReducedKg = 12.0;
  const monthlyGoalPercent = 68;

  return (
    <div className="p-4 space-y-4 text-white pb-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Environmental Impact
        </span>
        <div className="w-12" />
      </div>

      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Your Impact</h1>
        <p className="text-xs text-slate-400">Real-time view of your energy savings</p>
      </div>

      {/* Hero Achievement Card matching mockup */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0c2338] via-[#091a2e] to-[#051120] border border-emerald-500/35 p-5 shadow-[0_8px_32px_rgba(16,185,129,0.15)] flex flex-col items-center text-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        {/* Circular Saving Ring */}
        <div className="relative w-36 h-36 my-2 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="48"
              fill="none"
              stroke="#132338"
              strokeWidth="9"
            />
            <circle
              cx="60"
              cy="60"
              r="48"
              fill="none"
              stroke="url(#impactGrad)"
              strokeWidth="9"
              strokeDasharray="301"
              strokeDashoffset="95"
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="impactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Centered Big Value */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black font-mono-num text-white">
              {savedKwh}
            </span>
            <span className="text-xs font-semibold text-emerald-400">kWh</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Saved this week</span>
          </div>
        </div>

        {/* Positive Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mt-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Great job! You've saved 18% more energy this week.</span>
        </div>

        {/* 3 Metrics Cards Row */}
        <div className="grid grid-cols-3 gap-2 w-full mt-4 pt-4 border-t border-slate-800/80">
          <div className="p-2.5 rounded-2xl bg-slate-900/70 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block font-medium">Money Saved</span>
            <div className="flex items-center justify-center gap-0.5 mt-0.5">
              <IndianRupee className="w-3 h-3 text-emerald-400" />
              <span className="text-sm font-extrabold font-mono-num text-white">{moneySavedRupees}</span>
            </div>
            <span className="text-[9px] text-emerald-400 font-semibold">Net ₹ gain</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-900/70 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block font-medium">CO₂ Reduced</span>
            <div className="flex items-center justify-center gap-0.5 mt-0.5">
              <CloudRain className="w-3 h-3 text-cyan-400" />
              <span className="text-sm font-extrabold font-mono-num text-white">{co2ReducedKg}</span>
              <span className="text-[10px] text-cyan-400">kg</span>
            </div>
            <span className="text-[9px] text-cyan-300 font-semibold">Avoided</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-900/70 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block font-medium">Tree Impact</span>
            <div className="flex items-center justify-center gap-0.5 mt-0.5">
              <Leaf className="w-3 h-3 text-green-400" />
              <span className="text-sm font-extrabold font-mono-num text-white">1.4</span>
            </div>
            <span className="text-[9px] text-green-400 font-semibold">Trees planted eq.</span>
          </div>
        </div>
      </div>

      {/* Sustainability Goals & Vector Plant Illustration matching mockup */}
      <div className="p-4 rounded-3xl bg-[#09172a] border border-slate-800 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Sustainability Goals
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-400 font-mono-num">
            {monthlyGoalPercent}%
          </span>
        </div>

        <p className="text-xs text-slate-300">
          You're {monthlyGoalPercent}% towards your monthly goal! Only 18 kWh left to reach Green Certified badge.
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-700"
            style={{ width: `${monthlyGoalPercent}%` }}
          />
        </div>

        {/* Lush Green Plant Vector matching the mockup illustration */}
        <div className="relative h-28 w-full rounded-2xl bg-gradient-to-b from-[#0a1b2d] to-[#06121f] border border-emerald-500/20 overflow-hidden flex items-end justify-center">
          <svg viewBox="0 0 200 80" className="w-full h-full max-h-24">
            <defs>
              <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#064e3b" />
                <stop offset="100%" stopColor="#022c22" />
              </linearGradient>
              <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>

            {/* Rolling green hills */}
            <path d="M0,80 Q50,45 100,65 T200,55 L200,80 Z" fill="url(#hillGrad)" opacity="0.6" />
            <path d="M0,80 Q60,60 120,50 T200,70 L200,80 Z" fill="url(#hillGrad)" />

            {/* Center Growing Plant Sprout */}
            <path d="M100,70 Q98,40 100,28" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            
            {/* Sprout Leaves */}
            <path d="M100,38 Q85,32 86,22 Q96,24 100,38 Z" fill="url(#leafGrad)" />
            <path d="M100,34 Q115,28 114,18 Q104,20 100,34 Z" fill="url(#leafGrad)" />
            <circle cx="100" cy="24" r="3" fill="#6ee7b7" />

            {/* Side Saplings */}
            <path d="M60,75 Q58,55 60,45" stroke="#059669" strokeWidth="1.5" fill="none" />
            <path d="M60,52 Q50,48 51,42 Q58,44 60,52 Z" fill="#10b981" />
            
            <path d="M145,72 Q143,58 145,48" stroke="#059669" strokeWidth="1.5" fill="none" />
            <path d="M145,54 Q155,50 154,44 Q148,46 145,54 Z" fill="#10b981" />
          </svg>

          <span className="absolute bottom-2 left-3 text-[10px] font-semibold text-emerald-300">
            WattWise Micro-Forest Initiative
          </span>
        </div>
      </div>
    </div>
  );
}
