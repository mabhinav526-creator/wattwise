import { useState } from 'react';
import { 
  Zap, 
  Leaf, 
  Cpu, 
  Wind, 
  Activity, 
  Sparkles, 
  ArrowDownRight, 
  CheckCircle2, 
  IndianRupee,
  Clock,
  Radio,
  Gauge
} from 'lucide-react';
import { Appliance, AutomationRule, EnergyRecommendation, ScreenId } from '../types';

interface CommandCenterViewProps {
  appliances: Appliance[];
  automations: AutomationRule[];
  recommendations: EnergyRecommendation[];
  onToggleAppliance: (id: string) => void;
  onSelectAppliance: (appliance: Appliance) => void;
  onToggleRule: (id: string) => void;
  onApplyRecommendation: (id: string) => void;
  onNavigateToMobileScreen: (screen: ScreenId) => void;
}

export function CommandCenterView({
  appliances,
  automations,
  recommendations,
  onToggleAppliance,
  onSelectAppliance,
  onToggleRule,
  onApplyRecommendation,
  onNavigateToMobileScreen,
}: CommandCenterViewProps) {
  const [chartRange, setChartRange] = useState<'day' | 'week' | 'month'>('day');

  const liveActiveKw = appliances
    .filter((a) => a.status === 'on')
    .reduce((sum, a) => sum + a.powerKw, 0);

  const activeAppliancesCount = appliances.filter((a) => a.status === 'on').length;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6 text-white">
      {/* Top Banner Metric Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Metric 1: Total Today */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-[#0c203b] to-[#071325] border border-cyan-500/30 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Today's Consumption</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
              <ArrowDownRight className="w-3 h-3" />
              18% vs yesterday
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black font-mono-num text-white">12.6</span>
            <span className="text-sm font-semibold text-cyan-400">kWh</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 w-[62%]" />
          </div>
        </div>

        {/* Metric 2: Live Current Power */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-[#0c203b] to-[#071325] border border-cyan-500/30 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Real-Time Power</span>
            <span className="inline-flex items-center gap-1 text-[10px] text-cyan-300 font-semibold bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-500/40">
              <Radio className="w-3 h-3 animate-pulse text-cyan-400" />
              50 Hz Live
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black font-mono-num text-cyan-300">
              {liveActiveKw.toFixed(1)}
            </span>
            <span className="text-sm font-semibold text-cyan-400">kW</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {activeAppliancesCount} of {appliances.length} circuits drawing power
          </p>
        </div>

        {/* Metric 3: Estimated Daily Bill */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-[#0c203b] to-[#071325] border border-cyan-500/30 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Projected Daily Bill</span>
            <span className="text-amber-400 font-semibold text-xs">Standard Tariff</span>
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <IndianRupee className="w-6 h-6 text-amber-400" />
            <span className="text-3xl font-black font-mono-num text-white">164</span>
            <span className="text-xs text-slate-400">/day</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Projected Monthly: <span className="text-white font-semibold">₹1,638</span>
          </p>
        </div>

        {/* Metric 4: Impact & Carbon */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-[#0c2838] to-[#071822] border border-emerald-500/35 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Weekly Savings Impact</span>
            <span className="text-emerald-400 font-semibold">🌱 Green Score 94</span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black font-mono-num text-emerald-300">32.4</span>
            <span className="text-sm font-semibold text-emerald-400">kWh</span>
          </div>
          <p className="text-[11px] text-emerald-300 mt-2">
            Saved ₹420 • 12 kg CO₂ avoided
          </p>
        </div>
      </div>

      {/* 3-Column Command Center Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (4 cols): Device Controls & Real-Time Circuits */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-3xl bg-[#081426] border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Smart Appliance Circuits</span>
              </h2>
              <button
                onClick={() => onNavigateToMobileScreen('devices')}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
              >
                Full List →
              </button>
            </div>

            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {appliances.map((appliance) => {
                const isOn = appliance.status === 'on';

                return (
                  <div
                    key={appliance.id}
                    className="p-3 rounded-2xl bg-[#0b1b32] hover:bg-[#0e2340] border border-slate-800/80 transition-all flex items-center justify-between"
                  >
                    <div
                      onClick={() => onSelectAppliance(appliance)}
                      className="cursor-pointer flex items-center gap-3 flex-1"
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isOn ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/40' : 'bg-slate-800 text-slate-500'
                      }`}>
                        <Wind className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">{appliance.name}</span>
                        <span className="text-[10px] text-slate-400">
                          {appliance.room} • {isOn ? `${appliance.powerKw} kW` : 'Standby'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleAppliance(appliance.id)}
                      className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 cursor-pointer relative shadow-sm ${
                        isOn 
                          ? 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]' 
                          : 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.4)]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                          isOn ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center Column (5 cols): Usage Trends & Smart Suggestions */}
        <div className="lg:col-span-5 space-y-4">
          {/* Trends Card */}
          <div className="p-5 rounded-3xl bg-[#081426] border border-cyan-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white">Consumption Curve</h2>
                <span className="text-xs text-slate-400">Peak hour detection & timeline</span>
              </div>

              <div className="flex gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                {(['day', 'week', 'month'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setChartRange(r)}
                    className={`px-2.5 py-1 rounded-lg capitalize font-semibold transition-all ${
                      chartRange === r ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic SVG Curve for Command Center */}
            <div className="h-44 w-full bg-slate-950/60 rounded-2xl p-2 border border-slate-800 flex flex-col justify-center relative">
              {chartRange === 'day' && (
                <svg viewBox="0 0 400 150" className="w-full h-full">
                  <defs>
                    <linearGradient id="cmdAreaGradDay" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 20 120 C 70 120, 110 95, 150 90 C 190 85, 230 75, 270 45 C 300 25, 330 20, 350 45 C 365 65, 380 90, 385 100 L 385 140 L 20 140 Z"
                    fill="url(#cmdAreaGradDay)"
                  />
                  <path
                    d="M 20 120 C 70 120, 110 95, 150 90 C 190 85, 230 75, 270 45 C 300 25, 330 20, 350 45 C 365 65, 380 90, 385 100"
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="330" cy="22" r="6" fill="#ef4444" stroke="#fff" strokeWidth="2" />
                  <circle cx="330" cy="22" r="10" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-ping" opacity="0.75" />
                  <text x="210" y="18" fill="#f87171" fontSize="11" fontWeight="bold">Peak 6.8 kW @ 6:00 PM</text>
                </svg>
              )}

              {chartRange === 'week' && (
                <svg viewBox="0 0 400 150" className="w-full h-full">
                  <defs>
                    <linearGradient id="cmdAreaGradWeek" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 20 110 C 60 90, 120 70, 170 85 C 220 100, 270 30, 320 40 C 350 50, 375 75, 385 85 L 385 140 L 20 140 Z"
                    fill="url(#cmdAreaGradWeek)"
                  />
                  <path
                    d="M 20 110 C 60 90, 120 70, 170 85 C 220 100, 270 30, 320 40 C 350 50, 375 75, 385 85"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="280" cy="32" r="6" fill="#ef4444" stroke="#fff" strokeWidth="2" />
                  <circle cx="280" cy="32" r="10" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-ping" opacity="0.75" />
                  <text x="165" y="24" fill="#f87171" fontSize="11" fontWeight="bold">Peak Friday (18.4 kWh)</text>
                </svg>
              )}

              {chartRange === 'month' && (
                <svg viewBox="0 0 400 150" className="w-full h-full">
                  <defs>
                    <linearGradient id="cmdAreaGradMonth" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#818cf8" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 20 95 C 80 80, 140 110, 200 65 C 260 25, 320 50, 385 60 L 385 140 L 20 140 Z"
                    fill="url(#cmdAreaGradMonth)"
                  />
                  <path
                    d="M 20 95 C 80 80, 140 110, 200 65 C 260 25, 320 50, 385 60"
                    fill="none"
                    stroke="#818cf8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="245" cy="35" r="6" fill="#ef4444" stroke="#fff" strokeWidth="2" />
                  <circle cx="245" cy="35" r="10" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-ping" opacity="0.75" />
                  <text x="135" y="24" fill="#f87171" fontSize="11" fontWeight="bold">Week 3 Heatwave Peak (112 kWh)</text>
                </svg>
              )}
            </div>

            <div className="flex justify-between text-xs text-slate-400 px-2">
              {chartRange === 'day' ? (
                <>
                  <span>6 AM</span>
                  <span>12 PM</span>
                  <span>6 PM (Peak Tariff)</span>
                  <span>12 AM</span>
                </>
              ) : chartRange === 'week' ? (
                <>
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri (Peak)</span>
                  <span>Sun</span>
                </>
              ) : (
                <>
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3 (Peak)</span>
                  <span>Week 4</span>
                </>
              )}
            </div>
          </div>

          {/* AI Energy Recommendation Card */}
          <div className="p-4 rounded-3xl bg-gradient-to-r from-[#0a1f38] to-[#08172c] border border-cyan-500/35 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Active AI Recommendation
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-400">Save 20%</span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">
              Your AC is operating at 22°C during high-demand grid hours (6-9 PM). Elevating to 24°C with Eco Mode saves ₹420/month.
            </p>

            <button
              onClick={() => onApplyRecommendation('rec-1')}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
            >
              <span>Apply Schedule Optimization</span>
            </button>
          </div>
        </div>

        {/* Right Column (3 cols): Live Telemetry & Automations */}
        <div className="lg:col-span-3 space-y-4">
          {/* Live Grid Metrics */}
          <div className="p-4 rounded-3xl bg-[#081426] border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Grid Telemetry</span>
              </h2>
              <span className="text-[10px] text-emerald-400 font-semibold">Normal</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Voltage</span>
                <span className="font-mono-num font-bold text-white">230.2 V</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Frequency</span>
                <span className="font-mono-num font-bold text-white">50.0 Hz</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Current</span>
                <span className="font-mono-num font-bold text-white">{(liveActiveKw * 4.35).toFixed(1)} A</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Ambient Temp</span>
                <span className="font-mono-num font-bold text-white">32°C</span>
              </div>
            </div>
          </div>

          {/* Active Automations */}
          <div className="p-4 rounded-3xl bg-[#081426] border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Automations ({automations.filter((a) => a.enabled).length})
              </h2>
              <button
                onClick={() => onNavigateToMobileScreen('automation')}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
              >
                Configure →
              </button>
            </div>

            <div className="space-y-2">
              {automations.slice(0, 3).map((rule) => (
                <div
                  key={rule.id}
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <span className="font-medium text-slate-200">{rule.title}</span>
                  <button
                    onClick={() => onToggleRule(rule.id)}
                    className={`w-9 h-5 rounded-full p-0.5 relative transition-all duration-300 cursor-pointer ${
                      rule.enabled 
                        ? 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]' 
                        : 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.4)]'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                        rule.enabled ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
