import { Zap, Bell, Activity, Flame, ShieldCheck, Settings } from 'lucide-react';
import { ScreenId } from '../../types';

interface WattWiseNavbarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  liveWatts: number;
  unreadCount: number;
  isPeakSpikeSimulated: boolean;
  onTogglePeakSpike: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onQuickOptimize: () => void;
  quickRecommendationApplied: boolean;
  userAvatarUrl?: string;
}

export function WattWiseNavbar({
  currentScreen,
  onNavigate,
  liveWatts,
  unreadCount,
  isPeakSpikeSimulated,
  onTogglePeakSpike,
  onOpenNotifications,
  onOpenProfile,
  onQuickOptimize,
  quickRecommendationApplied,
  userAvatarUrl = '/wattwise-logo.jpg',
}: WattWiseNavbarProps) {
  const navLinks: { id: ScreenId; label: string }[] = [
    { id: 'home', label: 'Dashboard' },
    { id: 'live-monitoring', label: 'Live Grid' },
    { id: 'devices', label: 'Appliances' },
    { id: 'automation', label: 'Automations' },
    { id: 'insights', label: 'Analytics' },
    { id: 'impact', label: 'Carbon Impact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#060D1A]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            aria-label="WattWise Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5 shadow-[0_0_12px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_18px_rgba(6,182,212,0.6)] transition-all">
              <div className="w-full h-full bg-[#060D1A] rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              WattWise
            </span>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = currentScreen === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-950/60 font-semibold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions & system status */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Live Telemetry Ticker (tabular-nums) */}
          <button
            onClick={() => onNavigate('live-monitoring')}
            title="Real-time Live Load"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-xs hover:border-cyan-400 transition-colors cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="font-mono tabular-nums font-semibold text-white">
              {(liveWatts / 1000).toFixed(2)} kW
            </span>
            <span className="text-slate-400 text-[11px]">· 50 Hz</span>
          </button>

          {/* Spike Simulation Toggle Button */}
          <button
            onClick={onTogglePeakSpike}
            title={isPeakSpikeSimulated ? "Reset Peak Surge" : "Simulate Peak Surge (Heavy simultaneous load)"}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              isPeakSpikeSimulated
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${isPeakSpikeSimulated ? 'text-amber-400 animate-bounce' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">{isPeakSpikeSimulated ? 'Surge Active' : 'Simulate Spike'}</span>
            <span className="sm:hidden">Spike</span>
          </button>

          {/* Quick Eco Optimize */}
          <button
            onClick={onQuickOptimize}
            title="Auto-optimize AC & heavy loads"
            disabled={quickRecommendationApplied}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              quickRecommendationApplied
                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 opacity-80'
                : 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold hover:brightness-110 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
            }`}
          >
            {quickRecommendationApplied ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden lg:inline">Optimized</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                <span className="hidden lg:inline">Eco-Tune</span>
              </>
            )}
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            aria-label="View notifications"
            className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 relative transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Profile / Settings Button */}
          <button
            onClick={onOpenProfile}
            aria-label="Household settings"
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
          >
            <img
              src={userAvatarUrl}
              alt="User profile"
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-md object-cover border border-cyan-500/30"
              onError={(e) => {
                e.currentTarget.src = '/wattwise-logo.jpg';
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Nav Links Row for Small Screens */}
      <div className="md:hidden flex items-center gap-1 px-4 py-2 border-t border-slate-800/60 overflow-x-auto no-scrollbar">
        {navLinks.map((link) => {
          const isActive = currentScreen === link.id;
          return (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap cursor-pointer transition-colors ${
                isActive
                  ? 'text-cyan-400 bg-cyan-950/80 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
