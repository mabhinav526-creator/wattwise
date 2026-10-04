import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Zap, 
  Gauge, 
  Activity, 
  Thermometer, 
  CheckCircle2, 
  Radio
} from 'lucide-react';
import { ScreenId, LiveTelemetry, Appliance } from '../../types';

interface LiveMonitoringScreenProps {
  onNavigate: (screen: ScreenId) => void;
  appliances: Appliance[];
}

export function LiveMonitoringScreen({ onNavigate, appliances }: LiveMonitoringScreenProps) {
  // Live dynamic power from active appliances
  const baseActiveKw = appliances
    .filter((a) => a.status === 'on')
    .reduce((sum, a) => sum + a.powerKw, 0);

  const [telemetry, setTelemetry] = useState<LiveTelemetry>({
    voltage: 230.2,
    current: Math.max(0.5, +(baseActiveKw * 4.35).toFixed(2)),
    frequency: 50.01,
    temperature: 32.1,
    powerFactor: 0.98,
    gridStatus: 'normal',
  });

  const [waveOffset, setWaveOffset] = useState(0);

  // Animate telemetry fluctuations subtly for realism
  useEffect(() => {
    const timer = setInterval(() => {
      setWaveOffset((prev) => (prev + 1) % 360);
      setTelemetry((prev) => ({
        ...prev,
        voltage: +(230 + (Math.sin(Date.now() / 1500) * 1.5)).toFixed(1),
        current: Math.max(0.4, +(baseActiveKw * 4.35 + Math.sin(Date.now() / 1000) * 0.1).toFixed(2)),
        frequency: +(50.0 + Math.sin(Date.now() / 2000) * 0.04).toFixed(2),
        temperature: +(32.0 + Math.sin(Date.now() / 5000) * 0.4).toFixed(1),
      }));
    }, 120);

    return () => clearInterval(timer);
  }, [baseActiveKw]);

  // Construct animated sinusoidal wave
  const width = 300;
  const height = 50;
  const pointsCount = 40;
  let waveD = `M 0 ${height / 2}`;
  for (let i = 0; i <= pointsCount; i++) {
    const x = (i / pointsCount) * width;
    const rad = (i / 4) + waveOffset * 0.15;
    const y = height / 2 + Math.sin(rad) * 16 * (baseActiveKw > 0 ? 1 : 0.2);
    waveD += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }

  return (
    <div className="p-4 space-y-4 text-rose-50 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1 text-xs font-semibold text-rose-300 hover:text-white p-1 rounded-lg hover:bg-rose-950/60 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-rose-300/60">
          Live Telemetry
        </span>
        <div className="w-12" />
      </div>

      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Live Monitoring</h1>
        <p className="text-xs text-rose-300/70">Real-time view of your home's energy grid</p>
      </div>

      {/* Main Big Dial Gauge (Burgundy Velvet Theme) */}
      <div className="rounded-3xl bg-gradient-to-br from-[#260616] via-[#1a040f] to-[#12020a] border border-rose-500/35 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(159,18,57,0.2)] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute w-56 h-56 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

        {/* Live Broadcast Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-[10px] font-semibold text-rose-300">
          <Radio className="w-3 h-3 text-rose-400 animate-pulse" />
          <span>LIVE 50Hz</span>
        </div>

        {/* Radial Arc Gauge */}
        <div className="relative w-44 h-44 my-2 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            {/* Background Track */}
            <circle
              cx="60"
              cy="60"
              r="48"
              fill="none"
              stroke="#2c0719"
              strokeWidth="8"
            />
            {/* Active Glow Arc */}
            <circle
              cx="60"
              cy="60"
              r="48"
              fill="none"
              stroke="url(#burgundyDialGrad)"
              strokeWidth="8"
              strokeDasharray="301"
              strokeDashoffset={Math.max(40, 301 - (baseActiveKw / 8) * 301)}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]"
            />
            <defs>
              <linearGradient id="burgundyDialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central Power Meter */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Zap className="w-6 h-6 text-rose-400 animate-pulse mb-1 drop-shadow-[0_0_10px_rgba(244,63,94,0.6)]" />
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black font-mono-num text-white">
                {baseActiveKw.toFixed(1)}
              </span>
              <span className="text-sm font-semibold text-rose-300">kW</span>
            </div>
            <span className="text-[11px] text-rose-300/70 mt-0.5">Current Power</span>
          </div>
        </div>

        {/* Real-time Oscilloscope Sine Wave */}
        <div className="w-full mt-2 pt-2 border-t border-rose-950/80">
          <div className="flex items-center justify-between text-[10px] text-rose-300/70 mb-1 px-1">
            <span>Waveform Telemetry (Phase 1)</span>
            <span className="font-mono-num text-rose-300">THD: 1.4%</span>
          </div>
          <div className="h-12 w-full rounded-xl bg-[#14030a] border border-rose-950 px-2 flex items-center overflow-hidden">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
              <path
                d={waveD}
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2"
                strokeLinecap="round"
                className="drop-shadow-[0_0_6px_rgba(244,63,94,0.8)]"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 4 Telemetry Metrics Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3.5 rounded-2xl bg-[#18040d] border border-rose-950 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center justify-center">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-rose-300/70 block">Voltage</span>
            <span className="text-base font-bold font-mono-num text-white">
              {telemetry.voltage} V
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#18040d] border border-rose-950 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-rose-300/70 block">Current</span>
            <span className="text-base font-bold font-mono-num text-white">
              {telemetry.current} A
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#18040d] border border-rose-950 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-rose-300/70 block">Frequency</span>
            <span className="text-base font-bold font-mono-num text-white">
              {telemetry.frequency} Hz
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#18040d] border border-rose-950 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center justify-center">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-rose-300/70 block">Temperature</span>
            <span className="text-base font-bold font-mono-num text-white">
              {telemetry.temperature}°C
            </span>
          </div>
        </div>
      </div>

      {/* System Normal Status Badge matching mockup */}
      <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">System Normal</span>
            <span className="text-[11px] text-emerald-300">All appliances & circuit breakers running smoothly.</span>
          </div>
        </div>

        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
      </div>
    </div>
  );
}
