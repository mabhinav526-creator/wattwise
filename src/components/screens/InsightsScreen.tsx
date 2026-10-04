import { useState } from 'react';
import { 
  ArrowDownRight, 
  Zap, 
  Wind, 
  Refrigerator, 
  WashingMachine, 
  Lightbulb, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';
import { Appliance, ScreenId, TimeRange } from '../../types';

interface InsightsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectAppliance: (appliance: Appliance) => void;
  appliances: Appliance[];
}

export function InsightsScreen({ onNavigate, onSelectAppliance, appliances }: InsightsScreenProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('day');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  // Time range data config
  const dataConfig = {
    day: {
      total: '12.6',
      unit: 'kWh',
      diffText: '18% vs. yesterday',
      isPositive: true,
      peakLabel: '6.8 kWh at 6:00 PM',
      points: [
        { label: '6 AM', val: 25, kw: '1.5 kW' },
        { label: '9 AM', val: 35, kw: '2.4 kW' },
        { label: '12 PM', val: 55, kw: '3.8 kW' },
        { label: '3 PM', val: 62, kw: '4.2 kW' },
        { label: '6 PM', val: 95, kw: '6.8 kW', peak: true },
        { label: '9 PM', val: 70, kw: '5.1 kW' },
        { label: '12 AM', val: 30, kw: '2.0 kW' },
      ],
      timeMarkers: ['6 AM', '12 PM', '6 PM', '12 AM'],
    },
    week: {
      total: '84.2',
      unit: 'kWh',
      diffText: '12% vs. last week',
      isPositive: true,
      peakLabel: '18.4 kWh on Thursday',
      points: [
        { label: 'Mon', val: 40, kw: '11.2 kWh' },
        { label: 'Tue', val: 52, kw: '13.4 kWh' },
        { label: 'Wed', val: 45, kw: '12.0 kWh' },
        { label: 'Thu', val: 90, kw: '18.4 kWh', peak: true },
        { label: 'Fri', val: 65, kw: '14.8 kWh' },
        { label: 'Sat', val: 58, kw: '13.1 kWh' },
        { label: 'Sun', val: 48, kw: '11.3 kWh' },
      ],
      timeMarkers: ['Mon', 'Wed', 'Fri', 'Sun'],
    },
    month: {
      total: '342.0',
      unit: 'kWh',
      diffText: '9% vs. last month',
      isPositive: true,
      peakLabel: 'Week 2 Peak 94 kWh',
      points: [
        { label: 'W1', val: 60, kw: '82 kWh' },
        { label: 'W2', val: 92, kw: '94 kWh', peak: true },
        { label: 'W3', val: 75, kw: '86 kWh' },
        { label: 'W4', val: 68, kw: '80 kWh' },
      ],
      timeMarkers: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    },
    year: {
      total: '4,120',
      unit: 'kWh',
      diffText: '15% vs. previous year',
      isPositive: true,
      peakLabel: 'Peak Summer July 480 kWh',
      points: [
        { label: 'Q1', val: 50, kw: '920 kWh' },
        { label: 'Q2', val: 95, kw: '1,350 kWh', peak: true },
        { label: 'Q3', val: 70, kw: '1,050 kWh' },
        { label: 'Q4', val: 55, kw: '800 kWh' },
      ],
      timeMarkers: ['Q1', 'Q2', 'Q3', 'Q4'],
    },
  };

  const currentData = dataConfig[timeRange];

  // SVG Area path generator for smooth curve with proper boundary margins
  const points = currentData.points;
  const svgWidth = 340;
  const svgHeight = 140;
  const padX = 16;
  const padTop = 20;
  const padBottom = 20;
  const plotWidth = svgWidth - padX * 2;
  const plotHeight = svgHeight - padTop - padBottom;
  const stepX = plotWidth / (points.length - 1);

  const coordinates = points.map((p, i) => {
    const x = padX + i * stepX;
    const y = padTop + plotHeight - (p.val / 100) * plotHeight;
    return { x, y, ...p };
  });

  // Construct smooth bezier SVG path
  let pathD = `M ${coordinates[0].x} ${coordinates[0].y}`;
  for (let i = 0; i < coordinates.length - 1; i++) {
    const p0 = coordinates[i];
    const p1 = coordinates[i + 1];
    const midX = (p0.x + p1.x) / 2;
    pathD += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  const fillPathD = `${pathD} L ${coordinates[coordinates.length - 1].x} ${svgHeight - padBottom + 12} L ${coordinates[0].x} ${svgHeight - padBottom + 12} Z`;

  const topConsumers = [
    { name: 'Air Conditioner', category: 'climate', percent: 33, kwh: '4.2 kWh', icon: Wind, id: 'ac-1' },
    { name: 'Smart Fridge', category: 'kitchen', percent: 9, kwh: '1.1 kWh', icon: Refrigerator, id: 'fridge-1' },
    { name: 'Washing Machine', category: 'laundry', percent: 6, kwh: '0.8 kWh', icon: WashingMachine, id: 'washer-1' },
    { name: 'Lighting Circuits', category: 'lighting', percent: 3, kwh: '0.4 kWh', icon: Lightbulb, id: 'lights-1' },
  ];

  return (
    <div className="p-4 space-y-4 text-rose-50 pb-6">
      {/* Title Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Insights</h1>
        <p className="text-xs text-rose-300/70">Understand your energy patterns</p>
      </div>

      {/* Time Range Selector Tabs */}
      <div className="grid grid-cols-4 p-1 rounded-2xl bg-[#18040d] border border-rose-950">
        {(['day', 'week', 'month', 'year'] as TimeRange[]).map((tab) => (
          <button
            key={tab}
            id={`insights-tab-${tab}`}
            onClick={() => {
              setTimeRange(tab);
              setHoveredPointIndex(null);
            }}
            className={`py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
              timeRange === tab
                ? 'bg-rose-600 text-white shadow-[0_0_12px_rgba(225,29,72,0.45)]'
                : 'text-rose-300/50 hover:text-rose-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Energy Usage Chart Card (Burgundy Velvet) */}
      <div className="rounded-3xl bg-gradient-to-br from-[#260616] via-[#1a040f] to-[#12020a] border border-rose-500/35 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(159,18,57,0.18)] relative overflow-hidden">
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="text-[11px] text-rose-300/70 font-medium">Energy Usage</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl font-black font-mono-num text-white">
                {currentData.total}
              </span>
              <span className="text-xs font-semibold text-rose-400">{currentData.unit}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 mt-0.5">
              <ArrowDownRight className="w-3 h-3" />
              <span>{currentData.diffText}</span>
            </div>
          </div>

          {/* Peak Callout Badge (Red Highlight) */}
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-red-950/80 border border-red-500/50 text-red-300 px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.25)]">
              <Zap className="w-3 h-3 text-red-400 animate-pulse" />
              {currentData.peakLabel}
            </span>
          </div>
        </div>

        {/* SVG Bezier Area Chart with glowing burgundy-rose line */}
        <div className="relative h-40 w-full mt-2 select-none">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="burgundyAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e11d48" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#881337" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#12020a" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="burgundyStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fb7185" />
                <stop offset="50%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>

            {/* Subtle horizontal grid guide lines */}
            <line x1={padX} y1={padTop} x2={svgWidth - padX} y2={padTop} stroke="#4c0519" strokeDasharray="3 3" strokeOpacity="0.4" />
            <line x1={padX} y1={padTop + plotHeight * 0.5} x2={svgWidth - padX} y2={padTop + plotHeight * 0.5} stroke="#4c0519" strokeDasharray="3 3" strokeOpacity="0.4" />
            <line x1={padX} y1={padTop + plotHeight} x2={svgWidth - padX} y2={padTop + plotHeight} stroke="#4c0519" strokeDasharray="3 3" strokeOpacity="0.4" />

            {/* Gradient Fill under the curve */}
            <path d={fillPathD} fill="url(#burgundyAreaGrad)" />

            {/* Stroke Curve */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#burgundyStrokeGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_10px_rgba(244,63,94,0.6)]"
            />

            {/* Data points & Interactive peak dots */}
            {coordinates.map((pt, idx) => (
              <g key={idx} className="group">
                {pt.peak && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="10"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    className="animate-ping"
                    opacity="0.8"
                  />
                )}
                {/* Active indicator ring when hovered */}
                {hoveredPointIndex === idx && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="8"
                    fill="none"
                    stroke={pt.peak ? '#ef4444' : '#fb7185'}
                    strokeWidth="2"
                    opacity="0.8"
                  />
                )}
                {/* Visual node circle: RED for peak high usage, rose-burgundy for regular */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={pt.peak ? '6.5' : hoveredPointIndex === idx ? '5.5' : '4'}
                  fill={pt.peak ? '#ef4444' : '#4c0519'}
                  stroke={pt.peak ? '#ffffff' : '#fb7185'}
                  strokeWidth={pt.peak ? '2.5' : '2'}
                  className="transition-all"
                  style={pt.peak ? { filter: 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.85))' } : undefined}
                />
                {/* Generous invisible touch/click hit area */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="16"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPointIndex(idx)}
                  onClick={() => setHoveredPointIndex(idx)}
                />
              </g>
            ))}
          </svg>

          {/* Interactive Hover / Tap Tooltip */}
          {hoveredPointIndex !== null && coordinates[hoveredPointIndex] && (
            <div
              className={`absolute -top-3 px-3 py-1.5 rounded-xl border text-xs font-bold shadow-2xl flex items-center gap-1.5 z-20 pointer-events-none transition-all backdrop-blur-md ${
                coordinates[hoveredPointIndex].peak
                  ? 'bg-[#18040d]/95 border-red-500 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.35)]'
                  : 'bg-[#18040d]/95 border-rose-500 text-rose-200'
              }`}
              style={{
                left: `${(coordinates[hoveredPointIndex].x / svgWidth) * 100}%`,
                transform: 'translateX(-50%)',
              }}
            >
              <span className="text-rose-300/80 font-medium">{coordinates[hoveredPointIndex].label}:</span>
              <span className={`font-mono-num ${coordinates[hoveredPointIndex].peak ? 'text-red-400 font-extrabold' : 'text-white'}`}>
                {coordinates[hoveredPointIndex].kw}
              </span>
              {coordinates[hoveredPointIndex].peak && (
                <span className="text-[9px] bg-red-950 text-red-400 border border-red-500/50 px-1 py-0.2 rounded font-semibold ml-0.5">
                  PEAK
                </span>
              )}
            </div>
          )}
        </div>

        {/* X Axis Time Markers */}
        <div className="flex justify-between text-[10px] font-medium text-rose-300/60 pt-2 border-t border-rose-950/80">
          {currentData.timeMarkers.map((marker, idx) => (
            <span key={idx}>{marker}</span>
          ))}
        </div>
      </div>

      {/* AI Anomaly Alert Card */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#240615] to-[#18040d] border border-amber-500/35 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
          <AlertCircle className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-200">Peak Usage Spike Detected</span>
            <span className="text-[10px] text-rose-300/60">6:00 – 9:00 PM</span>
          </div>
          <p className="text-[11px] text-rose-200/80 mt-0.5 leading-snug">
            Air conditioner ran at 22°C for 3 continuous hours, drawing 35% more power than typical weekdays.
          </p>
          <button
            onClick={() => {
              const ac = appliances.find((a) => a.category === 'climate');
              if (ac) onSelectAppliance(ac);
            }}
            className="mt-2 text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
          >
            <span>Inspect AC controls & schedule</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Top Consumers Breakdown */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-rose-200/80">
            Top Consumers
          </h2>
          <span className="text-[11px] text-rose-300/60">Share of total power</span>
        </div>

        <div className="space-y-2">
          {topConsumers.map((item) => {
            const Icon = item.icon;
            const fullAppliance = appliances.find((a) => a.id === item.id);

            return (
              <div
                key={item.name}
                onClick={() => fullAppliance && onSelectAppliance(fullAppliance)}
                className="p-3 rounded-2xl bg-[#1b0410] hover:bg-[#250716] border border-rose-950/80 hover:border-rose-800/60 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-white group-hover:text-rose-300 transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-rose-300/60 block">{item.kwh} today</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono-num text-rose-300">
                    {item.percent}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#14030a] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-700"
                    style={{ width: `${item.percent * 2.5}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Optimization Tip Callout */}
      <div className="p-3 rounded-2xl bg-[#1a040e] border border-rose-950 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-[11px] text-rose-200/90">
            Setting AC to 24°C instead of 20°C saves up to 15% monthly energy.
          </span>
        </div>
        <button
          onClick={() => onNavigate('recommendations')}
          className="text-xs font-semibold text-rose-400 hover:text-rose-300 shrink-0 ml-2 cursor-pointer"
        >
          Details →
        </button>
      </div>
    </div>
  );
}
