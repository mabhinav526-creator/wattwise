import { ScreenId } from '../types';
import { 
  Home, 
  LineChart, 
  Wind, 
  Cpu, 
  Sparkles, 
  Bell, 
  LayoutGrid, 
  Leaf, 
  User, 
  Activity,
  ArrowRight,
  ShieldCheck,
  Smartphone
} from 'lucide-react';

interface DeckGalleryViewProps {
  onSelectScreen: (screen: ScreenId) => void;
}

export function DeckGalleryView({ onSelectScreen }: DeckGalleryViewProps) {
  const cards: {
    id: ScreenId;
    num: number;
    title: string;
    description: string;
    badge: string;
    icon: typeof Home;
    gradient: string;
  }[] = [
    {
      id: 'welcome',
      num: 1,
      title: 'Welcome Screen',
      description: 'Simple, clean and welcoming onboarding with smart home architectural vector art.',
      badge: 'Onboarding',
      icon: Smartphone,
      gradient: 'from-blue-900/60 to-cyan-950/60',
    },
    {
      id: 'home',
      num: 2,
      title: 'Home Dashboard',
      description: 'Quick overview of 12.6 kWh total usage, live kW draw, ₹164 estimated bill, and appliance gauges.',
      badge: 'Core Monitor',
      icon: Home,
      gradient: 'from-cyan-950/70 to-blue-950/70',
    },
    {
      id: 'insights',
      num: 3,
      title: 'Energy Insights',
      description: 'Day, Week, Month, Year consumption curves with peak hour callouts and top consumers.',
      badge: 'Analytics',
      icon: LineChart,
      gradient: 'from-indigo-950/70 to-cyan-950/70',
    },
    {
      id: 'appliance-detail',
      num: 4,
      title: 'Appliance Details',
      description: 'Deep dive into AC power draw (4.2 kW), hourly trend bars, and interactive temperature stepper.',
      badge: 'Precision Control',
      icon: Wind,
      gradient: 'from-cyan-950/70 to-slate-900/70',
    },
    {
      id: 'automation',
      num: 5,
      title: 'Automations',
      description: 'Smart rule triggers: Peak Hour Alert, Auto AC Control, Lights Off When Away, Smart Charging.',
      badge: 'Zero-Effort',
      icon: Cpu,
      gradient: 'from-blue-950/70 to-emerald-950/70',
    },
    {
      id: 'recommendations',
      num: 6,
      title: 'AI Recommendations',
      description: 'Personalized efficiency tips with one-click "Apply Now" saving up to 20% + interactive AI Advisor.',
      badge: 'AI Powered',
      icon: Sparkles,
      gradient: 'from-emerald-950/70 to-cyan-950/70',
    },
    {
      id: 'notifications',
      num: 7,
      title: 'Notifications',
      description: 'Stay updated with peak alerts, cycle completion notifications, and tariff window updates.',
      badge: 'Activity',
      icon: Bell,
      gradient: 'from-amber-950/50 to-slate-900/70',
    },
    {
      id: 'devices',
      num: 8,
      title: 'Device Manager',
      description: 'Unified control of all home circuits with active wattages and toggle switches.',
      badge: 'Circuits',
      icon: LayoutGrid,
      gradient: 'from-slate-900/80 to-blue-950/70',
    },
    {
      id: 'impact',
      num: 9,
      title: 'Your Impact',
      description: 'Real-time track of 32.4 kWh saved, ₹420 net savings, and interactive green forest tree.',
      badge: 'Sustainability',
      icon: Leaf,
      gradient: 'from-emerald-950/80 to-teal-950/70',
    },
    {
      id: 'profile',
      num: 10,
      title: 'Profile & Settings',
      description: 'WW home specs, 3BHK villa details, monthly energy budget slider, discom info.',
      badge: 'Settings',
      icon: User,
      gradient: 'from-blue-950/70 to-slate-900/80',
    },
    {
      id: 'live-monitoring',
      num: 11,
      title: 'Live Telemetry Waveform',
      description: 'Real-time oscilloscope wave, 230V voltage, 7.8A current, and 50Hz frequency health meter.',
      badge: 'Hardware Live',
      icon: Activity,
      gradient: 'from-cyan-950/80 to-slate-950/80',
    },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 text-white">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-2 p-1.5 pr-4 rounded-2xl bg-[#09182d] border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <img
              src="/wattwise-logo.jpg"
              alt="WattWise App Logo"
              className="w-10 h-10 rounded-xl object-cover border border-cyan-400/40 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div className="text-left">
              <span className="text-xs font-extrabold text-white block leading-tight">
                WattWise <span className="text-cyan-400 font-normal">OS</span>
              </span>
              <span className="text-[10px] text-cyan-300 font-mono-num">REDUCE • SAVE • SUSTAIN</span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          WattWise Unified Interface
        </h1>
        <p className="text-xs md:text-sm text-slate-300">
          Click any of the 11 functional screens below to launch it directly inside the mobile simulator.
        </p>
      </div>

      {/* Screen Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onSelectScreen(card.id)}
              className={`p-5 rounded-3xl bg-gradient-to-br ${card.gradient} border border-cyan-500/25 hover:border-cyan-400/60 shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-black text-xs flex items-center justify-center font-mono-num shadow-sm">
                      {card.num}
                    </span>
                    <span className="text-[11px] font-semibold text-cyan-300 px-2 py-0.5 rounded-full bg-slate-900/60 border border-slate-700">
                      {card.badge}
                    </span>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-slate-900/80 border border-slate-700 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                <span>Launch Screen</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
