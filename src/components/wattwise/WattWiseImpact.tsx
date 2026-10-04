import { 
  Leaf, 
  TreePine, 
  Sun, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export function WattWiseImpact() {
  const badges = [
    {
      title: 'Solar Pioneer',
      description: 'Generated over 150 kWh of rooftop clean energy this month.',
      earned: true,
      date: 'Earned 3 days ago',
      color: 'from-amber-500/20 to-amber-600/10 text-amber-300 border-amber-500/40',
    },
    {
      title: 'Peak Shaver Pro',
      description: 'Reduced AC & geyser draw by >30% during 6 PM - 9 PM peak tariff surge.',
      earned: true,
      date: 'Earned this week',
      color: 'from-cyan-500/20 to-cyan-600/10 text-cyan-300 border-cyan-500/40',
    },
    {
      title: 'Zero Vampire Load',
      description: 'Cut all idle electronics standby consumption for 7 consecutive days.',
      earned: true,
      date: 'Earned yesterday',
      color: 'from-emerald-500/20 to-emerald-600/10 text-emerald-300 border-emerald-500/40',
    },
    {
      title: 'Net-Zero Hero',
      description: 'Export more renewable power to the utility grid than consumed in a billing cycle.',
      earned: false,
      date: 'Progress: 68% / 100%',
      color: 'from-slate-800/60 to-slate-900 text-slate-400 border-slate-700/60',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Carbon & Environmental Impact</h1>
        <p className="text-xs text-slate-400">Track carbon emissions avoided, solar self-consumption, and sustainability milestones</p>
      </div>

      {/* 3 Core Impact Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Carbon Offset */}
        <div className="p-6 rounded-2xl bg-[#091528] border border-emerald-500/30 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
            <Leaf className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-400 block pt-1">CO2 Emissions Avoided</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-white">142.4</span>
            <span className="text-sm font-semibold text-emerald-400">kg CO₂</span>
          </div>
          <p className="text-[11px] text-slate-400">Equivalent to driving 580 fewer km in a petrol car</p>
        </div>

        {/* Metric 2: Trees Equivalent */}
        <div className="p-6 rounded-2xl bg-[#091528] border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
            <TreePine className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-400 block pt-1">Tree Equivalent Absorbed</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-white">7.2</span>
            <span className="text-sm font-semibold text-emerald-400">Trees</span>
          </div>
          <p className="text-[11px] text-slate-400">Annual carbon sequestration capacity matched</p>
        </div>

        {/* Metric 3: Clean Energy Share */}
        <div className="p-6 rounded-2xl bg-[#091528] border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
            <Sun className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-400 block pt-1">Renewable Energy Mix</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-emerald-400">62%</span>
            <span className="text-sm font-semibold text-slate-300">Clean</span>
          </div>
          <p className="text-[11px] text-slate-400">Self-generated solar versus dirty coal grid import</p>
        </div>
      </div>

      {/* Sustainability Badges Section */}
      <div className="p-6 rounded-2xl bg-[#091528] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Household Sustainability Milestones</h2>
            <p className="text-xs text-slate-400">Unlocked achievements based on automated energy efficiency</p>
          </div>
          <span className="text-xs text-emerald-400 font-semibold">Tier: Eco Champion</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {badges.map((b) => (
            <div
              key={b.title}
              className={`p-4 rounded-xl border bg-gradient-to-br ${b.color} flex items-start gap-3.5 transition-all`}
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">{b.title}</h3>
                  {b.earned && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Unlocked
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300">{b.description}</p>
                <p className="text-[10px] text-slate-400 pt-1">{b.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
