import { useState } from 'react';
import { 
  ArrowLeft, 
  Wind, 
  Sparkles, 
  Minus, 
  Plus, 
  Leaf, 
  Zap, 
  Clock, 
  CheckCircle2, 
  Sliders,
  RotateCcw
} from 'lucide-react';
import { Appliance } from '../../types';

interface WattWiseApplianceDetailProps {
  appliance: Appliance;
  onBack: () => void;
  onToggleStatus: (id: string) => void;
  onUpdateAppliance: (updated: Appliance) => void;
}

export function WattWiseApplianceDetail({
  appliance,
  onBack,
  onToggleStatus,
  onUpdateAppliance,
}: WattWiseApplianceDetailProps) {
  const [optimizedToast, setOptimizedToast] = useState(false);

  const isOn = appliance.status === 'on';
  const currentTemp = appliance.temperature ?? 24;
  const isEco = appliance.ecoMode ?? false;

  const handleTempChange = (delta: number) => {
    const newTemp = Math.min(30, Math.max(18, currentTemp + delta));
    onUpdateAppliance({
      ...appliance,
      temperature: newTemp,
      // Lowering temperature increases power draw
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
  };

  const handleApplyEcoTune = () => {
    onUpdateAppliance({
      ...appliance,
      temperature: 24,
      ecoMode: true,
      fanSpeed: 'Auto',
      powerKw: +(appliance.nominalKw * 0.8).toFixed(1),
    });
    setOptimizedToast(true);
    setTimeout(() => setOptimizedToast(false), 3000);
  };

  // Hourly usage visualization
  const hourlyData = appliance.hourlyUsage;
  const maxKw = Math.max(...hourlyData.map((d) => d.kw), 4.5);

  const monthlyCost = Math.round(appliance.todayKwh * 30 * 8.5);

  return (
    <div className="space-y-6">
      {/* Back button and title */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Appliances</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">Circuit State:</span>
          <button
            onClick={() => onToggleStatus(appliance.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isOn
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {isOn ? 'Active (ON)' : 'Turn ON'}
          </button>
        </div>
      </div>

      {/* Main Grid: Control Panel + Hourly Consumption */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Device Control Console (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#091528] border border-cyan-500/30 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">{appliance.name}</h1>
              <p className="text-xs text-slate-400">{appliance.room} · Branch Relay #{appliance.id}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Zap className="w-6 h-6" />
            </div>
          </div>

          {/* Real-Time Power Draw Readout */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Instantaneous Load</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-extrabold font-mono tabular-nums text-cyan-300">
                  {isOn ? appliance.powerKw.toFixed(1) : '0.0'}
                </span>
                <span className="text-sm font-semibold text-cyan-400">kW</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block">Estimated Cost</span>
              <span className="text-sm font-bold font-mono tabular-nums text-white">
                ₹{monthlyCost} / mo
              </span>
            </div>
          </div>

          {/* Temperature & Comfort Controls (if Climate/Water) */}
          {(appliance.category === 'climate' || appliance.category === 'utility') && (
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Target Thermostat</span>
                <span className="text-xs font-mono tabular-nums text-cyan-400">
                  {currentTemp}°C {isEco ? '(Eco 24°)' : ''}
                </span>
              </div>

              {/* Stepper and Display */}
              <div className="flex items-center justify-center gap-6 py-2">
                <button
                  onClick={() => handleTempChange(-1)}
                  disabled={!isOn}
                  className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Minus className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center">
                  <span className="text-5xl font-extrabold font-mono tabular-nums text-white tracking-tight">
                    {currentTemp}°
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1">Celsius</span>
                </div>

                <button
                  onClick={() => handleTempChange(1)}
                  disabled={!isOn}
                  className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Mode Selector */}
              <div>
                <span className="text-xs font-semibold text-slate-400 block mb-2">Operating Mode</span>
                <div className="grid grid-cols-4 gap-2">
                  {['Cool', 'Eco', 'Fan', 'Dry'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        if (mode === 'Eco') {
                          handleEcoToggle();
                        } else {
                          onUpdateAppliance({ ...appliance, mode: mode as any });
                        }
                      }}
                      className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        (mode === 'Eco' && isEco) || appliance.mode === mode
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Eco-Tune Action */}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={handleApplyEcoTune}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:brightness-110 shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>Auto-Tune to Optimum 24°C (-20% Load)</span>
            </button>
            {optimizedToast && (
              <p className="text-[11px] text-emerald-400 text-center mt-2 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Optimized schedule and target temperature applied.</span>
              </p>
            )}
          </div>
        </div>

        {/* Right Column: 24-Hour Load Curve & Telemetry Parameters (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#091528] border border-slate-800 space-y-6">
          <div>
            <h2 className="text-base font-bold text-white">Daily Consumption Profile</h2>
            <p className="text-xs text-slate-400">Hourly power demand (kW) across daytime and peak tariff windows</p>
          </div>

          {/* Chart */}
          <div className="h-60 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-800">
            {hourlyData.map((pt) => {
              const heightPercent = Math.min(100, Math.round((pt.kw / maxKw) * 100));

              return (
                <div key={pt.hour} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-mono tabular-nums text-slate-400 group-hover:text-white transition-colors">
                    {pt.kw > 0 ? pt.kw.toFixed(1) : ''}
                  </span>
                  <div className="w-full relative flex items-end justify-center h-full">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[32px] rounded-t-lg transition-all duration-300 ${
                        pt.highlight
                          ? 'bg-gradient-to-t from-amber-600 to-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                          : 'bg-gradient-to-t from-cyan-600 to-cyan-400'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 group-hover:text-slate-200">
                    {pt.hour.replace(' ', '')}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Operational Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Today's Recorded kWh</span>
              <span className="text-lg font-bold font-mono tabular-nums text-white">
                {appliance.todayKwh} kWh
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">{appliance.percentage}% of total home</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Peak Demand Observed</span>
              <span className="text-lg font-bold font-mono tabular-nums text-amber-400">
                {appliance.nominalKw} kW
              </span>
              <span className="text-[10px] text-amber-400/80 block mt-0.5">Evening 6:00 PM surge</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Relay Health</span>
              <span className="text-lg font-bold font-mono tabular-nums text-emerald-400">
                100% OK
              </span>
              <span className="text-[10px] text-emerald-400/80 block mt-0.5">Zigbee 3.0 Connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
