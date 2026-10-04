/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ScreenId, Appliance, AutomationRule, EnergyRecommendation, NotificationItem } from './types';
import { 
  initialAppliances, 
  initialAutomations, 
  initialRecommendations, 
  initialNotifications 
} from './data/initialData';
import { TopStatusBar } from './components/TopStatusBar';
import { BottomNavBar } from './components/BottomNavBar';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { InsightsScreen } from './components/screens/InsightsScreen';
import { ApplianceDetailScreen } from './components/screens/ApplianceDetailScreen';
import { AutomationScreen } from './components/screens/AutomationScreen';
import { RecommendationsScreen } from './components/screens/RecommendationsScreen';
import { DevicesScreen } from './components/screens/DevicesScreen';
import { ImpactScreen } from './components/screens/ImpactScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { LiveMonitoringScreen } from './components/screens/LiveMonitoringScreen';
import { CommandCenterView } from './components/CommandCenterView';
import { 
  Zap, 
  Flame, 
  RotateCcw, 
  Smartphone, 
  LayoutDashboard,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from './utils/sound';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [viewMode, setViewMode] = useState<'mobile' | 'dashboard'>('mobile');

  const [appliances, setAppliances] = useState<Appliance[]>(initialAppliances);
  const [automations, setAutomations] = useState<AutomationRule[]>(initialAutomations);
  const [recommendations, setRecommendations] = useState<EnergyRecommendation[]>(initialRecommendations);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [selectedApplianceId, setSelectedApplianceId] = useState<string>('ac-1');
  const [quickRecommendationApplied, setQuickRecommendationApplied] = useState<boolean>(false);
  const [isPeakSpikeActive, setIsPeakSpikeActive] = useState<boolean>(false);
  const [hardwareData, setHardwareData] = useState({
  voltage: 0,
  current: 0,
  power: 0,
  status: 'OFF'
});

  // Selected appliance object for deep-dive detail inspector
  const selectedAppliance = appliances.find((a) => a.id === selectedApplianceId) || appliances[0];

  // Play premium iPhone tap sound on every click across the app
  useEffect(() => {
    const handleGlobalClick = () => {
      soundFx.playIPhoneTapSound();
    };

    window.addEventListener('click', handleGlobalClick, { capture: true });
    return () => {
      window.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, []);
  useEffect(() => {
  const fetchHardwareData = async () => {
    try {
      const response = await fetch('/api/sensor');

      if (!response.ok) return;

      const result = await response.json();

      if (result.success && result.data) {
        setHardwareData(result.data);
      }
    } catch (error) {
      console.error('Hardware data error:', error);
    }
  };

  fetchHardwareData();

  const interval = setInterval(fetchHardwareData, 3000);

  return () => clearInterval(interval);
}, []);

  // Unread notifications count
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Real-time live total watts computed dynamically from active appliances
const applianceWatts = appliances
  .filter((a) => a.status === 'on')
  .reduce((sum, a) => sum + a.powerKw * 1000, 0);

const liveTotalWatts =
  hardwareData.power > 0
    ? hardwareData.power
    : applianceWatts;

  // Toggle appliance ON / OFF
  const handleToggleAppliance = (id: string) => {
    setAppliances((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          const nextStatus = app.status === 'on' ? 'off' : 'on';
          soundFx.playChime(nextStatus === 'on' ? 'futuristic' : 'gentle');
          return {
            ...app,
            status: nextStatus,
            powerKw: nextStatus === 'on' ? app.nominalKw : 0.0,
          };
        }
        return app;
      })
    );
  };

  // Select appliance and navigate to details screen
  const handleSelectAppliance = (appliance: Appliance) => {
    setSelectedApplianceId(appliance.id);
    setCurrentScreen('appliance-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update specific appliance properties (e.g. temp, eco mode)
  const handleUpdateAppliance = (updated: Appliance) => {
    setAppliances((prev) =>
      prev.map((app) => (app.id === updated.id ? updated : app))
    );
  };

  // Toggle automation rule
  const handleToggleRule = (id: string) => {
    setAutomations((prev) =>
      prev.map((rule) => {
        if (rule.id === id) {
          soundFx.playChime('gentle');
          return { ...rule, enabled: !rule.enabled };
        }
        return rule;
      })
    );
  };

  // Add custom automation rule
  const handleAddRule = (rule: AutomationRule) => {
    setAutomations((prev) => [rule, ...prev]);
    soundFx.playChime('futuristic');
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Automation Enabled',
        description: `Rule "${rule.title}" added to active grid policies.`,
        timeAgo: 'Just now',
        type: 'success',
        read: false,
      },
      ...prev,
    ]);
  };

  // Add custom appliance
  const handleAddAppliance = (newApp: Appliance) => {
    setAppliances((prev) => [...prev, newApp]);
    soundFx.playChime('futuristic');
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Circuit Added',
        description: `${newApp.name} connected in ${newApp.room} (${newApp.nominalKw} kW).`,
        timeAgo: 'Just now',
        type: 'success',
        read: false,
      },
      ...prev,
    ]);
  };

  // Apply single recommendation
  const handleApplyRecommendation = (id: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, applied: true } : r))
    );

    if (id === 'rec-1') {
      setQuickRecommendationApplied(true);
      // Auto-tune AC to 24°C eco mode
      setAppliances((prev) =>
        prev.map((a) =>
          a.id === 'ac-1'
            ? { ...a, temperature: 24, ecoMode: true, powerKw: 3.4 }
            : a
        )
      );
    }

    soundFx.playChime('futuristic');
    confetti({
      particleCount: 65,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#10b981', '#38bdf8'],
    });

    const rec = recommendations.find((r) => r.id === id);
    if (rec) {
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: 'Optimization Applied',
          description: `${rec.title} activated. Saving approx. ₹${rec.potentialSavingsRupees}/month.`,
          timeAgo: 'Just now',
          type: 'success',
          read: false,
        },
        ...prev,
      ]);
    }
  };

  // Apply quick home recommendation
  const handleApplyQuickRecommendation = () => {
    handleApplyRecommendation('rec-1');
  };

  // Notifications management
  const handleDismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Simulation: Trigger Peak Surge for Hackathon Demo
  const handleSimulatePeakSpike = () => {
    if (!isPeakSpikeActive) {
      setIsPeakSpikeActive(true);
      soundFx.playChime('radar');
      setAppliances((prev) =>
        prev.map((a) => {
          if (a.id === 'ac-1') return { ...a, status: 'on', powerKw: 5.6 };
          if (a.id === 'heater-1') return { ...a, status: 'on', powerKw: 1.8 };
          if (a.id === 'lights-1') return { ...a, status: 'on', powerKw: 0.4 };
          return a;
        })
      );

      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: 'Peak Load Surge Detected',
          description: 'High simultaneous draw (AC + Water Geyser). Real-time load jumped to 7.8 kW.',
          timeAgo: 'Just now',
          type: 'alert',
          read: false,
        },
        ...prev,
      ]);
    } else {
      setIsPeakSpikeActive(false);
      soundFx.playChime('gentle');
      setAppliances((prev) =>
        prev.map((a) => {
          if (a.id === 'ac-1') return { ...a, status: 'on', powerKw: 4.2 };
          if (a.id === 'heater-1') return { ...a, status: 'off', powerKw: 0.0 };
          return a;
        })
      );
    }
  };

  // Reset to default mock data
  const handleResetData = () => {
    setAppliances(initialAppliances);
    setAutomations(initialAutomations);
    setRecommendations(initialRecommendations);
    setNotifications(initialNotifications);
    setQuickRecommendationApplied(false);
    setIsPeakSpikeActive(false);
    soundFx.playChime('gentle');
  };

  // Render the active WattWise screen
  const renderScreenContent = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onStart={() => setCurrentScreen('home')}
            onNavigate={(s) => setCurrentScreen(s)}
          />
        );
      case 'home':
        return (
          <HomeScreen
            appliances={appliances}
            onToggleAppliance={handleToggleAppliance}
            onSelectAppliance={handleSelectAppliance}
            onNavigate={(s) => setCurrentScreen(s)}
            onApplyQuickRecommendation={handleApplyQuickRecommendation}
            quickRecommendationApplied={quickRecommendationApplied}
            unreadNotificationsCount={unreadCount}
          />
        );
      case 'insights':
        return (
          <InsightsScreen
            onNavigate={(s) => setCurrentScreen(s)}
            onSelectAppliance={handleSelectAppliance}
            appliances={appliances}
          />
        );
      case 'appliance-detail':
        return (
          <ApplianceDetailScreen
            appliance={selectedAppliance}
            onBack={() => setCurrentScreen('devices')}
            onToggleStatus={handleToggleAppliance}
            onUpdateAppliance={handleUpdateAppliance}
          />
        );
      case 'automation':
        return (
          <AutomationScreen
            automations={automations}
            onToggleRule={handleToggleRule}
            onAddRule={handleAddRule}
          />
        );
      case 'recommendations':
        return (
          <RecommendationsScreen
            recommendations={recommendations}
            onApplyRecommendation={handleApplyRecommendation}
            onNavigate={(s) => setCurrentScreen(s)}
          />
        );
      case 'devices':
        return (
          <DevicesScreen
            appliances={appliances}
            onToggleAppliance={handleToggleAppliance}
            onSelectAppliance={handleSelectAppliance}
            onNavigate={(s) => setCurrentScreen(s)}
            onAddAppliance={handleAddAppliance}
          />
        );
      case 'impact':
        return <ImpactScreen onNavigate={(s) => setCurrentScreen(s)} />;
      case 'notifications':
        return (
          <NotificationsScreen
            notifications={notifications}
            onNavigate={(s) => setCurrentScreen(s)}
            onMarkAllRead={handleMarkAllRead}
            onDismissNotification={handleDismissNotification}
          />
        );
      case 'profile':
        return <ProfileScreen onNavigate={(s) => setCurrentScreen(s)} />;
      case 'live-monitoring':
        return (
          <LiveMonitoringScreen
            onNavigate={(s) => setCurrentScreen(s)}
            appliances={appliances}
          />
        );
      default:
        return (
          <HomeScreen
            appliances={appliances}
            onToggleAppliance={handleToggleAppliance}
            onSelectAppliance={handleSelectAppliance}
            onNavigate={(s) => setCurrentScreen(s)}
            onApplyQuickRecommendation={handleApplyQuickRecommendation}
            quickRecommendationApplied={quickRecommendationApplied}
            unreadNotificationsCount={unreadCount}
          />
        );
    }
  };

  const screensList: { id: ScreenId; label: string }[] = [
    { id: 'home', label: '1. Home Dashboard' },
    { id: 'live-monitoring', label: '2. Live Grid Telemetry' },
    { id: 'devices', label: '3. Appliances & Circuits' },
    { id: 'appliance-detail', label: '4. AC Thermostat Control' },
    { id: 'automation', label: '5. Automations Engine' },
    { id: 'insights', label: '6. Analytics & Tariffs' },
    { id: 'recommendations', label: '7. AI Optimizations' },
    { id: 'impact', label: '8. Carbon & Solar Impact' },
    { id: 'notifications', label: '9. Alerts & Notifications' },
    { id: 'profile', label: '10. Household Profile' },
    { id: 'welcome', label: '11. Onboarding Screen' },
  ];

  return (
    <div className="min-h-screen bg-[#0d0206] text-rose-50 flex flex-col font-sans selection:bg-rose-600 selection:text-white">
      {/* Hackathon Presenter Header (Burgundy Velvet) */}
      <header className="sticky top-0 z-40 bg-[#14030a]/95 backdrop-blur-md border-b border-rose-950/80 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Brand & Live Load Ticker */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentScreen('home');
                setViewMode('mobile');
              }}
              className="flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 via-rose-600 to-amber-500 p-0.5 shadow-[0_0_15px_rgba(244,63,94,0.45)]">
                <div className="w-full h-full bg-[#14030a] rounded-[10px] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-rose-400" />
                </div>
              </div>
              <span className="text-base font-bold text-white tracking-tight">WattWise</span>
            </button>

            {/* Live Watts Indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-950/70 border border-rose-500/40 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              <span className="font-bold text-rose-300">{(liveTotalWatts / 1000).toFixed(1)} kW</span>
              <span className="text-rose-400/60 text-[10px]">· 50 Hz</span>
            </div>
          </div>

          {/* Center: Hackathon Screen Selector Jumps */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={currentScreen}
                onChange={(e) => {
                  setCurrentScreen(e.target.value as ScreenId);
                  setViewMode('mobile');
                }}
                className="pl-3 pr-8 py-1.5 bg-[#1a040e] border border-rose-900/70 hover:border-rose-500/80 rounded-xl text-xs font-medium text-rose-100 focus:outline-none focus:border-rose-500 cursor-pointer appearance-none shadow-sm"
              >
                {screensList.map((s) => (
                  <option key={s.id} value={s.id} className="bg-[#1a040e] text-rose-100">
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-rose-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* View Mode Switcher: Mobile App vs Command Center */}
            <div className="flex items-center gap-1 p-1 bg-[#1a040e] rounded-xl border border-rose-950 text-xs">
              <button
                onClick={() => setViewMode('mobile')}
                className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'mobile'
                    ? 'bg-rose-600 text-white font-bold shadow-[0_0_12px_rgba(225,29,72,0.45)]'
                    : 'text-rose-300/60 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>App View</span>
              </button>

              <button
                onClick={() => setViewMode('dashboard')}
                className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'dashboard'
                    ? 'bg-rose-600 text-white font-bold shadow-[0_0_12px_rgba(225,29,72,0.45)]'
                    : 'text-rose-300/60 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Executive View</span>
              </button>
            </div>
          </div>

          {/* Right: Interactive Hackathon Simulation Actions */}
          <div className="flex items-center gap-2">
            {/* Simulate Spike Stress-Test */}
            <button
              onClick={handleSimulatePeakSpike}
              title={isPeakSpikeActive ? "Surge engaged - click to normalize" : "Simulate peak load spike (7.8 kW)"}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                isPeakSpikeActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.5)] animate-pulse'
                  : 'bg-rose-950/60 hover:bg-rose-900/60 text-amber-300 border border-amber-500/40'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{isPeakSpikeActive ? 'Surge Active (7.8 kW)' : 'Simulate Surge'}</span>
            </button>

            {/* Reset Demo Data */}
            <button
              onClick={handleResetData}
              title="Reset to default baseline demo state"
              className="p-1.5 rounded-xl bg-[#1a040e] hover:bg-[#250715] text-rose-300 hover:text-white border border-rose-900/60 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Presentation Stage */}
      <main className="flex-1 flex flex-col items-center justify-center p-0 sm:p-4 md:p-6">
        {viewMode === 'mobile' ? (
          /* Pure WattWise App Container (Burgundy Velvet Theme) */
          <div className="w-full max-w-md bg-[#130309] sm:rounded-[36px] sm:border sm:border-rose-900/60 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_50px_rgba(159,18,57,0.22)] flex flex-col justify-between overflow-hidden min-h-[780px] sm:min-h-[820px] relative">
            {/* Top Status Header */}
            <TopStatusBar />

            {/* Scrollable Screen Content */}
            <div className="flex-1 overflow-y-auto relative no-scrollbar">
              {renderScreenContent()}
            </div>

            {/* Authentic WattWise Bottom Navigation Bar */}
            {currentScreen !== 'welcome' && (
              <BottomNavBar
                currentScreen={currentScreen}
                onNavigate={(s) => {
                  soundFx.playIPhoneTapSound();
                  setCurrentScreen(s);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                unreadCount={unreadCount}
              />
            )}
          </div>
        ) : (
          /* Executive Dashboard / Command Center View */
          <div className="w-full max-w-7xl">
            <CommandCenterView
              appliances={appliances}
              automations={automations}
              recommendations={recommendations}
              onToggleAppliance={handleToggleAppliance}
              onSelectAppliance={handleSelectAppliance}
              onToggleRule={handleToggleRule}
              onApplyRecommendation={handleApplyRecommendation}
              onNavigateToMobileScreen={(s) => {
                setCurrentScreen(s);
                setViewMode('mobile');
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
