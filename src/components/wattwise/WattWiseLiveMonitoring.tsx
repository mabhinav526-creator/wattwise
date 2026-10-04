import { useState, useEffect } from 'react';
import { 
  Zap, 
  Activity, 
  Thermometer, 
  Radio, 
  Cpu, 
  Sliders, 
  Gauge, 
  AlertTriangle,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { Appliance, LiveTelemetry } from '../../types';

interface WattWiseLiveMonitoringProps {
  appliances: Appliance[];
  onToggleAppliance: (id: string) => void;
  onSimulatePeakSpike: () => void;
  isPeakSpikeActive: boolean;
}

export function WattWiseLiveMonitoring({
  appliances,
  onToggleAppliance,
  onSimulatePeakSpike,
  isPeakSpikeActive,
}: WattWiseLiveMonitoringProps) {
  // Live dynamic active kW
  const baseActiveKw = appliances
    .filter((a) => a.status === 'on')
    .reduce((sum, a) => sum + a.powerKw, 0);

  const [telemetry, setTelemetry] = useState<LiveTelemetry>({
    voltage: 230.2,
    current: Math.max(0.5, +(baseActiveKw * 4.35).toFixed(2)),
    frequency: 50.01,
    temperature: 32.1,
    powerFactor: 0.98,
    gridStatus: isPeakSpikeActive ? 'peak' : 'normal',
  });

  const [waveOffset, setWaveOffset] = useState(0);

  // Animate dynamic fluctuations
  useEffect(() => {
    const timer = setInterval(() => {
      setWaveOffset((prev) => (prev + 1) % 360);
      setTelemetry((prev) => ({
        ...prev,
        voltage: +(230.0 + Math.sin(Date.now() / 1200) * 1.8).toFixed(1),
        current: Math.max(0.4, +(baseActiveKw * 4.35 + Math.sin(Date.now() / 900) * 0.15).toFixed(2)),
        frequency: +(50.0 + Math.sin(Date.now() / 2000) * 0.04).toFixed(2),
        temperature: +(32.0 + Math.sin(Date.now() / 4000) * 0.5).toFixed(1),
        gridStatus: isPeakSpikeActive ? 'peak' : 'normal',
      }));
    }, 100);

    return () => clearInterval(timer);
  }, [baseActiveKw, isPeakSpikeActive]);

  // Construct animated AC sine wave path
  const width = 600;
  const height = 90;
  const pointsCount = 60;
  let waveD = `M 0 ${height / 2}`;
  for (let i = 0; i <= pointsCount; i++) {
    const x = (i / pointsCount) * width;
    const rad = (i / 4) + waveOffset * 0.12;
    const y = height / 2 + Math.sin(rad) * 28 * (baseActiveKw > 0 ? 1 : 0.2);
    waveD += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }

  const maxCapacityKw = 10.0;
  const loadPercentage = Math.min(100, Math.round((baseActiveKw / maxCapacityKw) * 100));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Live Grid Telemetry</h1>
          <p className="text-xs text-slate-400">High-frequency real-time sub-meter readings & waveform analysis</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-xs font-semibold text-cyan-300">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>50.0 Hz Synced</span>
          </div>

          <button
            onClick={onSimulatePeakSpike}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              isPeakSpikeActive
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{isPeakSpikeActive ? 'Surge Simulated' : 'Trigger Surge Test'}</span>
          </button>
        </div>
      </div>

      {/* Main Radial Dial + Sine Wave Oscilloscope Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Big Radial Power Gauge (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#091528] border border-cyan-500/30 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.1)]">
          <div className="absolute top-4 left-4 text-xs font-medium text-slate-400">
            Main Panel Service Draw
          </div>

          {/* Radial SVG Arc */}
          <div className="relative w-56 h-56 my-4 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              {/* Background Track */}
              <circle
                cx="60"
                cy="60"
                r="48"
                fill="none"
                stroke="#17253d"
                strokeWidth="8"
                strokeDasharray="301"
              />
              {/* Dynamic Active Arc */}
              <circle
                cx="60"
                cy="60"
                r="48"
                fill="none"
                stroke={isPeakSpikeActive ? "url(#amberGrad)" : "url(#cyanWaveGrad)"}
                strokeWidth="8"
                strokeDasharray="301"
                strokeDashoffset={301 - (301 * loadPercentage) / 100}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
              <defs>
                <linearGradient id="cyanWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Readout */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-extrabold font-mono tabular-nums text-white tracking-tight">
                {baseActiveKw.toFixed(1)}
              </span>
              <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase mt-0.5">
                Kilowatts
              </span>
              <span className="text-[11px] text-slate-400 mt-1 font-mono tabular-nums">
                {loadPercentage}% of 10 kW Peak
              </span>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
            <div className="flex flex-col">
              <span className="text-slate-400">Breaker Capacity</span>
              <span className="font-mono tabular-nums font-semibold text-white">40 A / 230 V</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-slate-400">Headroom Remaining</span>
              <span className="font-mono tabular-nums font-semibold text-emerald-400">
                {(maxCapacityKw - baseActiveKw).toFixed(1)} kW
              </span>
            </div>
          </div>
        </div>

        {/* Real-Time AC Waveform Oscilloscope & Parameters (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#091528] border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">AC Waveform Analysis</h2>
              <p className="text-xs text-slate-400">Continuous 50 Hz sinusoidal line signal</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Phase 1 Voltage
              </span>
            </div>
          </div>

          {/* Oscilloscope Screen */}
          <div className="w-full h-36 rounded-xl bg-[#040914] border border-cyan-500/20 p-3 relative overflow-hidden flex items-center justify-center">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#091a33_1px,transparent_1px),linear-gradient(to_bottom,#091a33_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

            {/* Sinusoidal Wave SVG */}
            <svg className="w-full h-full relative z-10" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
              <path
                d={waveD}
                fill="none"
                stroke={isPeakSpikeActive ? "#f59e0b" : "#06b6d4"}
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-75"
              />
            </svg>

            {/* Scale watermark */}
            <div className="absolute bottom-2 right-3 text-[10px] font-mono tabular-nums text-slate-500 z-10">
              5 ms/div · 50 V/div
            </div>
          </div>

          {/* 6 Key Grid Quality Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">RMS Line Voltage</span>
              <span className="text-base font-bold font-mono tabular-nums text-white">
                {telemetry.voltage} V
              </span>
              <span className="text-[10px] text-emerald-400 block mt-0.5 font-medium">±0.4% Nominal</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Total Current Draw</span>
              <span className="text-base font-bold font-mono tabular-nums text-cyan-300">
                {telemetry.current} A
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Sum of 7 breakers</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Grid Frequency</span>
              <span className="text-base font-bold font-mono tabular-nums text-white">
                {telemetry.frequency} Hz
              </span>
              <span className="text-[10px] text-emerald-400 block mt-0.5 font-medium">Locked (50.00 Hz)</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Power Factor</span>
              <span className="text-base font-bold font-mono tabular-nums text-emerald-400">
                {telemetry.powerFactor}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Near unity (Optimal)</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Panel Temperature</span>
              <span className="text-base font-bold font-mono tabular-nums text-white">
                {telemetry.temperature} °C
              </span>
              <span className="text-[10px] text-emerald-400 block mt-0.5 font-medium">Cool (Normal)</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">THD Distortion</span>
              <span className="text-base font-bold font-mono tabular-nums text-white">
                1.8%
              </span>
              <span className="text-[10px] text-emerald-400 block mt-0.5 font-medium">&lt; 5% IEEE Standard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Circuit Stream Table with Instant Breaker Controls */}
      <div className="p-6 rounded-2xl bg-[#091528] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Real-Time Circuit Telemetry & Breakers</h2>
            <p className="text-xs text-slate-400">Sub-metered branch circuits with instantaneous remote relay switches</p>
          </div>
          <span className="text-xs text-slate-400 font-mono tabular-nums">
            Total Live: {(baseActiveKw * 1000).toFixed(0)} Watts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-3 font-semibold">Circuit / Device</th>
                <th className="pb-3 font-semibold">Room Location</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold text-right">Active Draw</th>
                <th className="pb-3 font-semibold text-right">Current (A)</th>
                <th className="pb-3 font-semibold text-right">Today's Total</th>
                <th className="pb-3 font-semibold text-center">Breaker Relay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {appliances.map((app) => {
                const isOn = app.status === 'on';
                const amps = isOn ? (app.powerKw * 1000 / 230).toFixed(1) : '0.0';

                return (
                  <tr key={app.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-3 font-semibold text-white flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isOn ? 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]' : 'bg-slate-700'}`} />
                      {app.name}
                    </td>
                    <td className="py-3 text-slate-300">{app.room}</td>
                    <td className="py-3 text-slate-400 capitalize">{app.category}</td>
                    <td className="py-3 text-right font-mono tabular-nums font-bold text-white">
                      {isOn ? `${app.powerKw.toFixed(2)} kW` : '0.00 kW'}
                    </td>
                    <td className="py-3 text-right font-mono tabular-nums text-slate-300">
                      {amps} A
                    </td>
                    <td className="py-3 text-right font-mono tabular-nums text-slate-300">
                      {app.todayKwh} kWh
                    </td>
                    <td className="py-3 text-center">
                      <button
                        onClick={() => onToggleAppliance(app.id)}
                        className={`px-3 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                          isOn
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500 hover:text-slate-950'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        {isOn ? 'Active (ON)' : 'Disabled (OFF)'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
