import { useState } from 'react';
import { 
  LineChart, 
  TrendingDown, 
  Clock, 
  Calendar, 
  IndianRupee, 
  ArrowUpRight, 
  ArrowDownRight,
  PieChart,
  Zap,
  Info
} from 'lucide-react';
import { Appliance, TimeRange } from '../../types';

interface WattWiseInsightsProps {
  appliances: Appliance[];
  onSelectAppliance: (appliance: Appliance) => void;
}

export function WattWiseInsights({
  appliances,
  onSelectAppliance,
}: WattWiseInsightsProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('day');

  // Breakdown by category
  const categoryTotals: Record<string, number> = {};
  appliances.forEach((a) => {
    categoryTotals[a.category] = (categoryTotals[a.category] || 0) + a.todayKwh;
  });

  const totalKwh = Object.values(categoryTotals).reduce((a, b) => a + b, 0) || 12.6;

  // Comparison metrics based on range
  const rangeConfig = {
    day: { total: '12.6 kWh', cost: '₹164', delta: '-18%', trend: 'down', desc: 'vs yesterday' },
    week: { total: '94.2 kWh', cost: '₹1,220', delta: '-12%', trend: 'down', desc: 'vs last week' },
    month: { total: '388 kWh', cost: '₹4,980', delta: '+4%', trend: 'up', desc: 'vs last month' },
    year: { total: '4,420 kWh', cost: '₹57,400', delta: '-8%', trend: 'down', desc: 'vs 2025' },
  }[timeRange];

  return (
    <div className="space-y-6">
      {/* Header with Range Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Energy Analytics & Tariffs</h1>
          <p className="text-xs text-slate-400">Consumption trends, cost breakdowns, and Time-of-Use (ToU) tariff analysis</p>
        </div>

        {/* Time-Range Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 self-start sm:self-auto">
          {(['day', 'week', 'month', 'year'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors cursor-pointer ${
                timeRange === range
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#091528] border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Aggregated Energy</span>
            <span className={`font-semibold flex items-center gap-0.5 ${rangeConfig.trend === 'down' ? 'text-emerald-400' : 'text-amber-400'}`}>
              {rangeConfig.trend === 'down' ? <ArrowDownRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
              {rangeConfig.delta} {rangeConfig.desc}
            </span>
          </div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-white mt-2">
            {rangeConfig.total}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#091528] border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Electricity Expense</span>
            <span className="text-xs text-slate-400">ToU Billing Rate</span>
          </div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-amber-400 mt-2">
            {rangeConfig.cost}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#091528] border border-emerald-500/30">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Peak Hour Shaving</span>
            <span className="text-xs text-emerald-400 font-semibold">Active Rules</span>
          </div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-emerald-400 mt-2">
            3.4 kWh
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Shifted to off-peak night rate</p>
        </div>
      </div>

      {/* Mid Grid: Time of Use (ToU) Tariff Schedule + Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ToU Tariff Schedule (6 Cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-[#091528] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Time-of-Use (ToU) Tariff Slabs</h2>
              <p className="text-xs text-slate-400">Utility pricing tiers across 24-hour cycle</p>
            </div>
            <span className="text-xs text-cyan-400 font-mono">Tata Power Mumbai</span>
          </div>

          <div className="space-y-3 pt-2">
            {/* Slab 1: Off-Peak */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-white text-xs">Off-Peak Super Saver</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">11:00 PM – 06:00 AM (Best for EV & Laundry)</p>
              </div>
              <div className="text-right">
                <span className="text-base font-bold font-mono tabular-nums text-emerald-400">₹4.50</span>
                <span className="text-[10px] text-slate-500 block">/ unit (kWh)</span>
              </div>
            </div>

            {/* Slab 2: Normal Daylight */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span className="font-semibold text-white text-xs">Standard Daytime Rate</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">06:00 AM – 06:00 PM & 09:00 PM – 11:00 PM</p>
              </div>
              <div className="text-right">
                <span className="text-base font-bold font-mono tabular-nums text-white">₹8.00</span>
                <span className="text-[10px] text-slate-500 block">/ unit (kWh)</span>
              </div>
            </div>

            {/* Slab 3: Peak Surge */}
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="font-semibold text-amber-300 text-xs">Evening Peak Surge</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">06:00 PM – 09:00 PM (Highest grid stress)</p>
              </div>
              <div className="text-right">
                <span className="text-base font-bold font-mono tabular-nums text-amber-400">₹13.50</span>
                <span className="text-[10px] text-amber-400/80 block">/ unit (kWh)</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              WattWise automatically sheds non-critical heating and charges batteries during the ₹4.50 off-peak window.
            </span>
          </div>
        </div>

        {/* Appliance Category Split (6 Cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-[#091528] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Load Breakdown by Category</h2>
              <p className="text-xs text-slate-400">Consumption share of connected circuits</p>
            </div>
            <span className="text-xs font-mono tabular-nums text-slate-400">
              {totalKwh.toFixed(1)} kWh Total
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {Object.entries(categoryTotals).map(([cat, kwh]) => {
              const percent = Math.round((kwh / totalKwh) * 100);

              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="capitalize text-slate-300 font-medium">{cat}</span>
                    <span className="font-mono tabular-nums text-white">
                      {kwh.toFixed(1)} kWh ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-teal-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick appliance jump list */}
          <div className="pt-2 border-t border-slate-800">
            <span className="text-xs text-slate-400 block mb-2 font-medium">Top Consumers:</span>
            <div className="flex flex-wrap gap-2">
              {appliances.slice(0, 4).map((app) => (
                <button
                  key={app.id}
                  onClick={() => onSelectAppliance(app)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {app.name} ({app.todayKwh} kWh)
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
