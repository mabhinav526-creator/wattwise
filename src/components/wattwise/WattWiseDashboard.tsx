import { useState } from 'react';
import { 
  Zap, 
  ArrowDownRight, 
  Sparkles, 
  Activity, 
  ChevronRight, 
  Sun, 
  Home as HomeIcon, 
  Cpu, 
  IndianRupee, 
  CheckCircle2, 
  AlertCircle,
  Wind,
  Refrigerator,
  Lightbulb,
  WashingMachine,
  Flame,
  Radio
} from 'lucide-react';
import { Appliance, EnergyRecommendation, ScreenId } from '../../types';

interface WattWiseDashboardProps {
  appliances: Appliance[];
  recommendations: EnergyRecommendation[];
  onToggleAppliance: (id: string) => void;
  onSelectAppliance: (appliance: Appliance) => void;
  onNavigate: (screen: ScreenId) => void;
  onApplyRecommendation: (id: string) => void;
  onQuickOptimize: () => void;
  quickRecommendationApplied: boolean;
  isPeakSpikeActive: boolean;
  heroImageUrl?: string;
}

export function WattWiseDashboard({
  appliances,
  recommendations,
  onToggleAppliance,
  onSelectAppliance,
  onNavigate,
  onApplyRecommendation,
  onQuickOptimize,
  quickRecommendationApplied,
  isPeakSpikeActive,
  heroImageUrl = '/src/assets/images/smart_home_solar_hero_1791089640514.jpg',
}: WattWiseDashboardProps) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'running' | 'climate' | 'kitchen'>('all');
  const [hoveredHour, setHoveredHour] = useState<string | null>(null);

  // Dynamic live wattage computation
  const liveActiveKw = appliances
    .filter((a) => a.status === 'on')
    .reduce((sum, a) => sum + a.powerKw, 0);

  const activeAppliancesCount = appliances.filter((a) => a.status === 'on').length;

  // Solar simulation: peak daylight yields 1.8 kW solar generation
  const solarGenKw = 1.8;
  const gridImportKw = Math.max(0, +(liveActiveKw - solarGenKw).toFixed(2));
  const solarCoveragePercent = liveActiveKw > 0 
    ? Math.min(100, Math.round((solarGenKw / liveActiveKw) * 100))
    : 100;

  // Daily estimated bill
  const estimatedBillToday = Math.round(12.6 * (isPeakSpikeActive ? 16.5 : 13.0));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'climate':
        return Wind;
      case 'kitchen':
        return Refrigerator;
      case 'lighting':
        return Lightbulb;
      case 'laundry':
        return WashingMachine;
      default:
        return Zap;
    }
  };

  const filteredAppliances = appliances.filter((a) => {
    if (activeCategoryFilter === 'running') return a.status === 'on';
    if (activeCategoryFilter === 'climate') return a.category === 'climate';
    if (activeCategoryFilter === 'kitchen') return a.category === 'kitchen';
    return true;
  });

  // 24-Hour Load Curve mock data with peak highlighted (6 PM - 9 PM)
  const hourlyLoadCurve = [
    { hour: '00:00', kw: 1.1, peak: false },
    { hour: '03:00', kw: 0.9, peak: false },
    { hour: '06:00', kw: 1.8, peak: false },
    { hour: '09:00', kw: 2.4, peak: false },
    { hour: '12:00', kw: 3.1, peak: false },
    { hour: '15:00', kw: 3.6, peak: false },
    { hour: '18:00', kw: isPeakSpikeActive ? 7.6 : 5.4, peak: true },
    { hour: '20:00', kw: isPeakSpikeActive ? 7.8 : 5.8, peak: true },
    { hour: '21:00', kw: isPeakSpikeActive ? 6.9 : 4.8, peak: true },
    { hour: '23:00', kw: 2.2, peak: false },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Panoramic Banner with Architectural Solar House Image */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#091426] shadow-xl min-h-[220px] md:min-h-[260px] flex items-end">
        {/* Background Image with Fallback */}
        <img
          src={heroImageUrl}
          alt="Modern solar-powered residence"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Measured Contrast Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060D1A] via-[#060D1A]/80 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#060D1A]/40 to-[#060D1A]/90 pointer-events-none" />

        {/* Content Overlay */}
        <div className="relative z-10 p-6 md:p-8 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            {/* Zero-Pill Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Grid Nominal
              </span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>Rooftop Solar 5.2 kWp Active</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-cyan-300">Net Zero Buffer 38%</span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white text-balance">
              Smart Energy Intelligence
            </h1>

            <p className="text-sm text-slate-300 line-clamp-2 max-w-xl">
              Real-time monitoring across 7 circuits. High-efficiency automated peak shaving active for evening tariff window.
            </p>
          </div>

          {/* Quick Action Button Box */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('live-monitoring')}
              className="px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Live Telemetry</span>
            </button>

            <button
              onClick={onQuickOptimize}
              disabled={quickRecommendationApplied}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-lg whitespace-nowrap ${
                quickRecommendationApplied
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                  : 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold hover:brightness-110 shadow-cyan-500/20'
              }`}
            >
              {quickRecommendationApplied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Eco Mode Active (-₹420/mo)</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Auto-Optimize AC (-20%)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Peak Surge Warning Alert Banner (if spike active) */}
      {isPeakSpikeActive && (
        <div className="p-4 rounded-xl bg-amber-950/50 border border-amber-500/40 text-amber-200 flex items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-amber-300">Simulated Peak Spike Engaged (7.8 kW Draw)</p>
              <p className="text-[11px] text-amber-400/80">Simultaneous load from Air Conditioner (5.6 kW) + Water Geyser (1.8 kW) during peak tariff.</p>
            </div>
          </div>
          <button
            onClick={onQuickOptimize}
            className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            Shed Heavy Load
          </button>
        </div>
      )}

      {/* 4 Core High-Density Telemetry Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Today's Consumption */}
        <div className="p-5 rounded-2xl bg-[#091528] border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Today's Energy</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
              <ArrowDownRight className="w-3.5 h-3.5" />
              18% vs yesterday
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-white">12.6</span>
            <span className="text-sm font-semibold text-cyan-400">kWh</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 w-[63%]" />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
            <span>Budget: 20 kWh</span>
            <span>63% utilized</span>
          </div>
        </div>

        {/* Metric 2: Real-Time Active Power */}
        <div className="p-5 rounded-2xl bg-[#091528] border border-cyan-500/30 hover:border-cyan-500/50 transition-all shadow-[0_0_20px_rgba(6,182,212,0.08)]">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Real-Time Power</span>
            <span className="flex items-center gap-1 text-[11px] text-cyan-300 font-semibold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              50 Hz Live
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-cyan-300">
              {liveActiveKw.toFixed(1)}
            </span>
            <span className="text-sm font-semibold text-cyan-400">kW</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {activeAppliancesCount} of {appliances.length} circuits drawing current
          </p>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-2 border-t border-slate-800/80 pt-2">
            <span>230.2 V RMS</span>
            <span>·</span>
            <span>PF 0.98</span>
          </div>
        </div>

        {/* Metric 3: Projected Daily Cost */}
        <div className="p-5 rounded-2xl bg-[#091528] border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Projected Daily Bill</span>
            <span className="text-amber-400 font-semibold text-xs">Standard Tariff</span>
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-bold text-amber-400">₹</span>
            <span className="text-3xl font-extrabold font-mono tabular-nums text-white">
              {estimatedBillToday}
            </span>
            <span className="text-xs text-slate-400">/day</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Est. Monthly: ₹{(estimatedBillToday * 30).toLocaleString()}
          </p>
          <div className="flex items-center justify-between text-[11px] text-emerald-400 mt-2 border-t border-slate-800/80 pt-2">
            <span>Potential Savings</span>
            <span className="font-semibold">-₹420/mo</span>
          </div>
        </div>

        {/* Metric 4: Solar Generation & Mix */}
        <div className="p-5 rounded-2xl bg-[#091528] border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Solar Generation</span>
            <span className="text-amber-300 font-semibold flex items-center gap-1 text-xs">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              Daylight
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-emerald-400">
              {solarGenKw.toFixed(1)}
            </span>
            <span className="text-sm font-semibold text-emerald-500">kW</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Supplying {solarCoveragePercent}% of active household load
          </p>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 border-t border-slate-800/80 pt-2">
            <span>Grid Import: {gridImportKw.toFixed(1)} kW</span>
            <span>Export: 0.0 kW</span>
          </div>
        </div>
      </div>

      {/* Mid Section: Interactive Power Flow + 24H Load Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Power Flow Schematic (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#091528] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Power Flow Network</h2>
              <p className="text-xs text-slate-400">Live energy distribution path</p>
            </div>
            <button
              onClick={() => onNavigate('live-monitoring')}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 cursor-pointer"
            >
              <span>Telemetry</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Graphical Flow Nodes */}
          <div className="grid grid-cols-3 gap-3 py-4 items-center">
            {/* Node 1: Solar Roof */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-center space-y-1">
              <div className="w-8 h-8 mx-auto rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Sun className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-medium text-slate-300">Rooftop PV</p>
              <p className="text-xs font-bold font-mono tabular-nums text-amber-300">1.8 kW</p>
            </div>

            {/* Central Node: Inverter / Hub */}
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-center space-y-1 relative">
              <div className="w-8 h-8 mx-auto rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                <Cpu className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-medium text-slate-300">Smart Inverter</p>
              <p className="text-xs font-bold font-mono tabular-nums text-cyan-300">
                {liveActiveKw.toFixed(1)} kW
              </p>
            </div>

            {/* Node 3: Home Circuits */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-center space-y-1">
              <div className="w-8 h-8 mx-auto rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <HomeIcon className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-medium text-slate-300">Home Load</p>
              <p className="text-xs font-bold font-mono tabular-nums text-emerald-300">
                {liveActiveKw.toFixed(1)} kW
              </p>
            </div>
          </div>

          {/* Grid Interconnect Status Box */}
          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-slate-300">Utility Grid Intertie:</span>
            </div>
            <span className="font-mono tabular-nums font-semibold text-slate-200">
              {gridImportKw > 0 ? `Importing ${gridImportKw} kW` : 'Self-Sustaining'}
            </span>
          </div>

          {/* Solar Offset Progress */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Clean Energy Ratio</span>
              <span className="font-semibold text-emerald-400 font-mono tabular-nums">
                {solarCoveragePercent}% Green
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden flex">
              <div
                className="bg-emerald-400 h-full transition-all duration-500"
                style={{ width: `${solarCoveragePercent}%` }}
              />
              <div
                className="bg-slate-700 h-full transition-all duration-500"
                style={{ width: `${100 - solarCoveragePercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 24-Hour Load Curve with Peak Window (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#091528] border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-white">24-Hour Load Profile</h2>
              <p className="text-xs text-slate-400">Peak tariff window (6 PM – 9 PM) highlighted in amber</p>
            </div>
            {hoveredHour && (
              <span className="text-xs font-mono tabular-nums text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-500/30">
                {hoveredHour}
              </span>
            )}
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-48 flex items-end gap-2 pt-6 pb-2 px-2 border-b border-slate-800">
            {hourlyLoadCurve.map((point) => {
              const maxScale = isPeakSpikeActive ? 8.5 : 6.5;
              const heightPercent = Math.min(100, Math.round((point.kw / maxScale) * 100));
              const isHovered = hoveredHour?.startsWith(point.hour);

              return (
                <div
                  key={point.hour}
                  className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
                  onMouseEnter={() => setHoveredHour(`${point.hour}: ${point.kw.toFixed(1)} kW ${point.peak ? '(Peak Tariff)' : ''}`)}
                  onMouseLeave={() => setHoveredHour(null)}
                >
                  <div className="w-full relative flex items-end justify-center h-full">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[28px] rounded-t-md transition-all duration-300 ${
                        point.peak
                          ? 'bg-gradient-to-t from-amber-600 to-amber-400 group-hover:brightness-125 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                          : 'bg-gradient-to-t from-cyan-600 to-cyan-400 group-hover:brightness-125'
                      } ${isHovered ? 'ring-2 ring-white scale-105' : ''}`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 group-hover:text-white transition-colors">
                    {point.hour.split(':')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Chart Legend / Metadata (Zero-Pill) */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-cyan-400" />
                Standard Hours (₹8.0/unit)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-amber-400" />
                Peak Tariff Surge (₹13.5/unit)
              </span>
            </div>
            <button
              onClick={() => onNavigate('insights')}
              className="text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer"
            >
              Detailed Analytics &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Active Circuits Matrix & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Appliances Circuit Matrix (8 Cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-[#091528] border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white">Household Circuits & Appliances</h2>
              <p className="text-xs text-slate-400">Direct remote circuit breakers and load controllers</p>
            </div>

            {/* Segmented Filter Control */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setActiveCategoryFilter('all')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeCategoryFilter === 'all'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All ({appliances.length})
              </button>
              <button
                onClick={() => setActiveCategoryFilter('running')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeCategoryFilter === 'running'
                    ? 'bg-cyan-950 text-cyan-300 font-semibold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Active ({activeAppliancesCount})
              </button>
              <button
                onClick={() => setActiveCategoryFilter('climate')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeCategoryFilter === 'climate'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Climate
              </button>
              <button
                onClick={() => setActiveCategoryFilter('kitchen')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeCategoryFilter === 'kitchen'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Kitchen
              </button>
            </div>
          </div>

          {/* Appliance Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {filteredAppliances.map((app) => {
              const Icon = getCategoryIcon(app.category);
              const isOn = app.status === 'on';

              return (
                <div
                  key={app.id}
                  className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between gap-3 ${
                    isOn
                      ? 'bg-slate-900/90 border-cyan-500/35 shadow-[0_0_15px_rgba(6,182,212,0.06)]'
                      : 'bg-slate-900/40 border-slate-800/80 opacity-75'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isOn
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <button
                          onClick={() => onSelectAppliance(app)}
                          className="text-sm font-semibold text-white hover:text-cyan-300 transition-colors text-left flex items-center gap-1 cursor-pointer"
                        >
                          <span>{app.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                        </button>
                        <p className="text-[11px] text-slate-400">{app.room}</p>
                      </div>
                    </div>

                    {/* Toggle Switch Button */}
                    <button
                      onClick={() => onToggleAppliance(app.id)}
                      role="switch"
                      aria-checked={isOn}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isOn ? 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'bg-slate-800'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isOn ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/70 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Power:</span>
                      <span className="font-mono tabular-nums font-bold text-white">
                        {isOn ? `${app.powerKw.toFixed(1)} kW` : '0.0 kW'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Today:</span>
                      <span className="font-mono tabular-nums text-slate-300">
                        {app.todayKwh} kWh
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-between items-center text-xs">
            <span className="text-slate-400">
              Showing {filteredAppliances.length} of {appliances.length} circuits
            </span>
            <button
              onClick={() => onNavigate('devices')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Manage All Devices</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AI Recommendations Spotlight (4 Cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-[#091528] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h2 className="text-base font-bold text-white">Energy Optimizations</h2>
            </div>
            <span className="text-xs text-emerald-400 font-semibold">Active AI</span>
          </div>

          <div className="space-y-3">
            {recommendations.slice(0, 3).map((rec) => (
              <div
                key={rec.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  rec.applied
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-white">{rec.title}</span>
                  <span className="font-mono tabular-nums font-bold text-emerald-400">
                    -₹{rec.potentialSavingsRupees}/mo
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                  {rec.description}
                </p>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-medium">
                    {rec.impactTag}
                  </span>

                  {rec.applied ? (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => onApplyRecommendation(rec.id)}
                      className="px-2.5 py-1 text-[11px] font-semibold rounded bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/40 transition-colors cursor-pointer"
                    >
                      Apply Fix
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('automation')}
            className="w-full py-2.5 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Automate Routines</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
