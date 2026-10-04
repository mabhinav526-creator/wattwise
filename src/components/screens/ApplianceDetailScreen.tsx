import { useState } from 'react';
import { 
  ArrowLeft, 
  Wind, 
  Sparkles, 
  Check, 
  Minus, 
  Plus, 
  Leaf, 
  Zap, 
  Clock, 
  IndianRupee 
} from 'lucide-react';
import { Appliance } from '../../types';

interface ApplianceDetailScreenProps {
  appliance: Appliance;
  onBack: () => void;
  onToggleStatus: (id: string) => void;
  onUpdateAppliance: (updated: Appliance) => void;
}

export function ApplianceDetailScreen({
  appliance,
  onBack,
  onToggleStatus,
  onUpdateAppliance,
}: ApplianceDetailScreenProps) {
  const [activeDayPeriod, setActiveDayPeriod] = useState<'today' | 'yesterday' | 'week'>('today');
  const [optimizedNotice, setOptimizedNotice] = useState(false);

  const isOn = appliance.status === 'on';
  const currentTemp = appliance.temperature ?? 24;
  const isEco = appliance.ecoMode ?? false;

  const handleTempChange = (delta: number) => {
    const newTemp = Math.min(30, Math.max(18, currentTemp + delta));
    onUpdateAppliance({
      ...appliance,
      temperature: newTemp,
      powerKw: +(appliance.nominalKw * (1 + (24 - newTemp) * 0.05)).toFixed(1),
    });
  };

  const handleEcoToggle = () => {
    const nextEco = !isEco;
    onUpdateAppliance({
      ...appliance,
      ecoMode: nextEco,
      temperature: nextEco ? 24 : currentTemp,
      powerKw: nextEco ? +(appliance.nominalKw * 0.8).toFixed(1) : appliance.nominalKw,
    });
    if (nextEco) {
      setOptimizedNotice(true);
      setTimeout(() => setOptimizedNotice(false), 3000);
    }
  };

  const hourlyData = appliance.hourlyUsage || [
    { hour: '12 AM', kw: 0.2 },
    { hour: '3 AM', kw: 0.2 },
    { hour: '6 AM', kw: 1.1 },
    { hour: '9 AM', kw: 1.8 },
    { hour: '12 PM', kw: 2.6 },
    { hour: '3 PM', kw: 3.4 },
    { hour: '6 PM', kw: 4.2, highlight: true },
    { hour: '9 PM', kw: 3.8 },
    { hour: '11 PM', kw: 1.4 },
  ];

  const maxKw = Math.max(...hourlyData.map((d) => d.kw), 4.5);

  return (
    <div className="p-4 space-y-4 text-rose-50 pb-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <button
          id="detail-back-btn"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-rose-300/60">
          Appliance Details
        </span>
        <div className="w-12" />
      </div>

      {/* Hero Device Card (Burgundy Velvet) */}
      <div className="rounded-3xl bg-gradient-to-br from-[#260616] via-[#1a040f] to-[#12020a] border border-rose-500/35 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(159,18,57,0.2)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
              isOn 
                ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]' 
                : 'bg-[#15030d] border border-rose-950 text-rose-400/40'
            }`}>
              <Wind className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">{appliance.name}</h1>
              <span className="text-xs text-rose-300/70">{appliance.room}</span>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            id="detail-toggle-btn"
            onClick={() => onToggleStatus(appliance.id)}
            className={`w-14 h-7 rounded-full p-0.5 transition-all duration-300 cursor-pointer relative shadow-sm ${
              isOn 
                ? 'bg-rose-600 shadow-[0_0_12px_rgba(225,29,72,0.6)]' 
                : 'bg-[#2a0618] border border-rose-900/50 shadow-inner'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center text-[9px] font-bold ${
                isOn ? 'translate-x-7 text-rose-600' : 'translate-x-0 text-slate-600'
              }`}
            >
              {isOn ? 'ON' : 'OFF'}
            </div>
          </button>
        </div>

        {/* Stats 2-column */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-rose-950/80">
          <div className="p-3 rounded-2xl bg-[#17030e] border border-rose-950">
            <div className="flex items-center gap-1.5 text-[11px] text-rose-300/70 mb-1">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              <span>Power Draw</span>
            </div>
            <div className="text-xl font-bold font-mono-num text-white">
              {isOn ? `${appliance.powerKw} kW` : '0.0 kW'}
            </div>
            <span className="text-[10px] text-rose-300/60">Nominal: {appliance.nominalKw} kW</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#17030e] border border-rose-950">
            <div className="flex items-center gap-1.5 text-[11px] text-rose-300/70 mb-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Today's Usage</span>
            </div>
            <div className="text-xl font-bold font-mono-num text-white">
              {appliance.todayKwh} kWh
            </div>
            <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
              <IndianRupee className="w-2.5 h-2.5" />
              ≈ ₹{Math.round(appliance.todayKwh * 13)} cost today
            </span>
          </div>
        </div>
      </div>

      {/* Usage Trend Bar Chart */}
      <div className="p-4 rounded-3xl bg-[#1a040e] border border-rose-950/90 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-rose-200/80">
            Usage Trend
          </h2>
          <div className="flex items-center gap-1 bg-[#14030a] px-2 py-1 rounded-lg border border-rose-950 text-[11px] text-rose-200">
            <select
              value={activeDayPeriod}
              onChange={(e) => setActiveDayPeriod(e.target.value as 'today' | 'yesterday' | 'week')}
              className="bg-transparent text-rose-400 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="today" className="bg-[#1a040e] text-rose-100">Today</option>
              <option value="yesterday" className="bg-[#1a040e] text-rose-100">Yesterday</option>
              <option value="week" className="bg-[#1a040e] text-rose-100">This Week</option>
            </select>
          </div>
        </div>

        {/* Hourly Bar Chart */}
        <div className="h-32 flex items-end justify-between gap-1.5 pt-4 px-1">
          {hourlyData.map((d, index) => {
            const heightPercent = Math.min(100, Math.max(12, (d.kw / maxKw) * 100));
            const isHighlighted = d.highlight || d.kw > 4.0;

            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-1 group relative">
                {/* Floating tooltip */}
                <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 px-1.5 py-0.5 rounded bg-[#18040d] border border-rose-500 text-[9px] font-mono-num font-bold text-rose-300 whitespace-nowrap shadow-md">
                  {d.kw} kW
                </div>

                {/* Bar */}
                <div className="w-full h-24 flex items-end justify-center">
                  <div
                    className={`w-full max-w-[14px] rounded-t-sm transition-all duration-500 group-hover:brightness-125 ${
                      isHighlighted
                        ? 'bg-gradient-to-t from-rose-600 via-rose-500 to-amber-400 shadow-[0_0_10px_rgba(225,29,72,0.5)]'
                        : 'bg-gradient-to-t from-[#260616] to-rose-900/60'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                {/* Time Label */}
                {index % 3 === 0 ? (
                  <span className="text-[9px] text-rose-300/60 font-medium whitespace-nowrap">
                    {d.hour}
                  </span>
                ) : (
                  <span className="text-[9px] text-transparent select-none">.</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Controls (Temperature & Mode) */}
      {appliance.category === 'climate' && (
        <div className="p-4 rounded-3xl bg-[#1b0410] border border-rose-950 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-200/80">
              Climate Control
            </span>
            <button
              id="ac-eco-toggle-btn"
              onClick={handleEcoToggle}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                isEco
                  ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                  : 'bg-[#14030a] border-rose-950 text-rose-300/50'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>Eco Mode</span>
            </button>
          </div>

          {/* Temperature Stepper */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#17030e] border border-rose-950">
            <button
              id="ac-temp-minus-btn"
              onClick={() => handleTempChange(-1)}
              disabled={!isOn || currentTemp <= 18}
              className="w-10 h-10 rounded-xl bg-[#250715] hover:bg-[#300a1c] text-rose-100 flex items-center justify-center disabled:opacity-30 cursor-pointer transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>

            <div className="text-center">
              <span className="text-3xl font-extrabold font-mono-num text-white">
                {currentTemp}°C
              </span>
              <span className="text-[10px] text-rose-300/70 block">Target Temperature</span>
            </div>

            <button
              id="ac-temp-plus-btn"
              onClick={() => handleTempChange(1)}
              disabled={!isOn || currentTemp >= 30}
              className="w-10 h-10 rounded-xl bg-[#250715] hover:bg-[#300a1c] text-rose-100 flex items-center justify-center disabled:opacity-30 cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Operating Mode Buttons */}
          <div className="grid grid-cols-4 gap-2 text-xs">
            {['Cool', 'Heat', 'Fan', 'Dry'].map((mode, i) => (
              <button
                key={mode}
                className={`py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  i === 0
                    ? 'bg-rose-600 text-white shadow-[0_0_10px_rgba(225,29,72,0.4)]'
                    : 'bg-[#17030e] text-rose-300/60 hover:text-white border border-rose-950'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {optimizedNotice && (
            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4" />
              <span>Eco set point (24°C) saves ~20% energy during peak hours!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
