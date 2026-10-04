import { useState } from 'react';
import { 
  Bell, 
  Zap, 
  Home as HomeIcon, 
  ArrowDownRight, 
  Sparkles, 
  Activity, 
  ChevronRight,
  Wind,
  Refrigerator,
  Lightbulb,
  WashingMachine,
  CheckCircle2
} from 'lucide-react';
import { Appliance, ScreenId } from '../../types';

interface HomeScreenProps {
  appliances: Appliance[];
  onToggleAppliance: (id: string) => void;
  onSelectAppliance: (appliance: Appliance) => void;
  onNavigate: (screen: ScreenId) => void;
  onApplyQuickRecommendation: () => void;
  quickRecommendationApplied: boolean;
  unreadNotificationsCount: number;
}

export function HomeScreen({
  appliances,
  onToggleAppliance,
  onSelectAppliance,
  onNavigate,
  onApplyQuickRecommendation,
  quickRecommendationApplied,
  unreadNotificationsCount,
}: HomeScreenProps) {
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'running'>('all');

  // Compute live current power dynamically from running appliances
  const liveActiveKw = appliances
    .filter((a) => a.status === 'on')
    .reduce((sum, a) => sum + a.powerKw, 0);

  // Dynamic calculated estimated bill for today
  const estimatedBillToday = Math.round(12.6 * 13.0); // ~₹164 base with dynamic factor

  const getApplianceIcon = (category: string) => {
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

  const displayedAppliances = activeTabFilter === 'running' 
    ? appliances.filter(a => a.status === 'on') 
    : appliances.slice(0, 4);

  return (
    <div className="p-4 space-y-4 text-rose-50 pb-6">
      {/* Top Greeting Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-rose-300/70 font-medium">
            <span>Good Morning,</span>
            <span className="text-amber-400">☀️</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            WW
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40">
              Efficient
            </span>
          </h1>
          <p className="text-[11px] text-rose-300/70">Your home is running efficiently.</p>
        </div>

        <div className="flex items-center gap-2">
          {/* WattWise App Logo Profile Link */}
          <button
            id="home-logo-btn"
            onClick={() => onNavigate('profile')}
            title="WattWise OS"
            className="p-1 rounded-xl bg-[#1a040e] hover:bg-[#250715] border border-rose-500/40 transition-all cursor-pointer flex items-center justify-center shadow-[0_0_10px_rgba(244,63,94,0.25)]"
          >
            <img
              src="/wattwise-logo.jpg"
              alt="WattWise Logo"
              className="w-6 h-6 rounded-lg object-cover"
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Live Wave Telemetry Quick Button */}
          <button
            id="home-telemetry-btn"
            onClick={() => onNavigate('live-monitoring')}
            title="View Live Grid Telemetry"
            className="p-2 rounded-xl bg-[#1a040e] hover:bg-[#250715] border border-rose-500/40 text-rose-300 transition-all flex items-center gap-1 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-rose-400 animate-pulse" />
            <span className="text-[10px] font-mono-num font-bold">230V</span>
          </button>

          {/* Notifications Bell */}
          <button
            id="home-notif-btn"
            onClick={() => onNavigate('notifications')}
            className="p-2 rounded-xl bg-[#1a040e] hover:bg-[#250715] border border-rose-950 text-rose-300 relative transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center animate-bounce shadow-md">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Hero Energy Usage Card with Circular Gauge */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#260616] via-[#1a040f] to-[#12020a] border border-rose-500/35 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_25px_rgba(225,29,72,0.18)] overflow-hidden">
        {/* Subtle background radial glow */}
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-rose-500/15 blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-rose-300/80">Total Energy Usage</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
            <ArrowDownRight className="w-3 h-3" />
            18% than yesterday
          </span>
        </div>

        {/* Main numbers and Circular Gauge */}
        <div className="flex items-center justify-between py-1">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tracking-tight font-mono-num text-white">
                12.6
              </span>
              <span className="text-base font-medium text-rose-300">kWh</span>
            </div>
            <p className="text-[11px] text-rose-300/70 mt-0.5">Today's recorded consumption</p>
          </div>

          {/* Glowing Circular Gauge with House Icon */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            {/* SVG Ring Meter */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="#2a0818"
                strokeWidth="6"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="url(#burgundyRoseGrad)"
                strokeWidth="6"
                strokeDasharray="201"
                strokeDashoffset="60"
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]"
              />
              <defs>
                <linearGradient id="burgundyRoseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
            </svg>

            {/* Centered House Icon */}
            <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-[#240615] border border-rose-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.35)]">
              <HomeIcon className="w-4 h-4 text-rose-300" />
            </div>
          </div>
        </div>

        {/* Sub metrics grid */}
        <div className="grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-rose-950/80">
          <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-[#17030e] border border-rose-950">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300">
              <Zap className="w-4 h-4 animate-pulse text-rose-400" />
            </div>
            <div>
              <span className="text-[10px] text-rose-300/70 block">Current Power</span>
              <span className="text-xs font-bold font-mono-num text-white">
                {liveActiveKw.toFixed(1)} kW
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-[#17030e] border border-rose-950">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <span className="text-xs font-bold">₹</span>
            </div>
            <div>
              <span className="text-[10px] text-rose-300/70 block">Estimated Bill</span>
              <span className="text-xs font-bold font-mono-num text-white">
                ₹ {estimatedBillToday}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Smart Suggestion Banner */}
      <div className={`p-3.5 rounded-2xl border transition-all ${
        quickRecommendationApplied
          ? 'bg-emerald-950/30 border-emerald-500/40'
          : 'bg-gradient-to-r from-[#2a0617] to-[#1c0410] border-rose-500/35 shadow-[0_4px_20px_rgba(225,29,72,0.18)]'
      }`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300 shrink-0 mt-0.5 shadow-sm">
            <Sparkles className="w-4 h-4 text-rose-300" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-rose-200">Smart Recommendation</h2>
              <span className="text-[10px] font-semibold text-emerald-400">Save 20%</span>
            </div>
            <p className="text-[11px] text-rose-200/80 mt-0.5 leading-snug">
              {quickRecommendationApplied
                ? 'AC schedule adjusted to Eco 24°C during peak hours (6-9 PM). Target savings activated!'
                : 'Reduce AC load by setting scheduled eco-temperature during 6 PM - 9 PM peak tariff.'}
            </p>
            
            <div className="mt-2.5 flex items-center justify-between">
              {quickRecommendationApplied ? (
                <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Applied (Saving ~₹420/mo)</span>
                </div>
              ) : (
                <button
                  id="home-apply-rec-btn"
                  onClick={onApplyQuickRecommendation}
                  className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-[0_0_12px_rgba(225,29,72,0.45)]"
                >
                  <span>Apply Now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                id="home-view-all-recs-btn"
                onClick={() => onNavigate('recommendations')}
                className="text-[11px] text-rose-300/70 hover:text-rose-200 transition-colors cursor-pointer"
              >
                View all tips →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Appliance Usage List */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-rose-200/80">
            Live Appliance Usage
          </h2>
          <div className="flex items-center gap-1 bg-[#1a040e] p-0.5 rounded-lg border border-rose-950">
            <button
              onClick={() => setActiveTabFilter('all')}
              className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-colors cursor-pointer ${
                activeTabFilter === 'all' ? 'bg-rose-600/30 text-rose-200 border border-rose-500/40 font-bold' : 'text-rose-300/50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTabFilter('running')}
              className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-colors cursor-pointer ${
                activeTabFilter === 'running' ? 'bg-rose-600/30 text-rose-200 border border-rose-500/40 font-bold' : 'text-rose-300/50'
              }`}
            >
              Active
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {displayedAppliances.map((appliance) => {
            const Icon = getApplianceIcon(appliance.category);
            const isOn = appliance.status === 'on';

            return (
              <div
                key={appliance.id}
                id={`appliance-card-${appliance.id}`}
                className="p-3 rounded-2xl bg-[#1b0410] hover:bg-[#240616] border border-rose-950/80 hover:border-rose-800/60 transition-all group"
              >
                <div className="flex items-center justify-between">
                  {/* Left Icon & Name */}
                  <button
                    onClick={() => onSelectAppliance(appliance)}
                    className="flex items-center gap-3 text-left flex-1 cursor-pointer"
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      isOn 
                        ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.3)]' 
                        : 'bg-[#15030d] border border-rose-950 text-rose-400/40'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white group-hover:text-rose-300 transition-colors">
                          {appliance.name}
                        </span>
                        {appliance.temperature && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 font-mono-num border border-rose-900/60">
                            {appliance.temperature}°C
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-rose-300/60">
                        {appliance.room} • {isOn ? `${appliance.powerKw} kW` : 'Standby'}
                      </span>
                    </div>
                  </button>

                  {/* Right Percentage & Interactive Toggle */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold font-mono-num text-rose-200/90">
                      {appliance.percentage}%
                    </span>

                    {/* Toggle Button */}
                    <button
                      id={`toggle-appliance-${appliance.id}`}
                      onClick={() => onToggleAppliance(appliance.id)}
                      className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 cursor-pointer relative shadow-sm ${
                        isOn 
                          ? 'bg-rose-600 shadow-[0_0_12px_rgba(225,29,72,0.6)]' 
                          : 'bg-[#2a0618] border border-rose-900/50 shadow-inner'
                      }`}
                      aria-label={`Toggle ${appliance.name}`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                          isOn ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#15030d] rounded-full h-1.5 mt-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isOn ? 'bg-gradient-to-r from-rose-500 to-amber-400' : 'bg-rose-950/40'
                    }`}
                    style={{ width: `${isOn ? appliance.percentage : 0}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Devices Link */}
        <button
          id="home-view-devices-btn"
          onClick={() => onNavigate('devices')}
          className="w-full mt-2 py-2 rounded-xl text-center text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>Manage all appliances & circuits</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Quick Row: Your Impact & Carbon */}
      <div
        onClick={() => onNavigate('impact')}
        className="p-3 rounded-2xl bg-gradient-to-r from-[#240616] via-[#1a040f] to-[#14030a] border border-rose-500/30 flex items-center justify-between cursor-pointer hover:border-rose-400/60 transition-all shadow-md"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
            <span className="text-xs font-bold">🌱</span>
          </div>
          <div>
            <span className="text-xs font-bold text-white">Your Environmental Impact</span>
            <span className="text-[10px] text-emerald-300 block">32.4 kWh saved • 12 kg CO₂ avoided</span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-emerald-400" />
      </div>
    </div>
  );
}
