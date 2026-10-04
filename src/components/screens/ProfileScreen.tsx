import { useState } from 'react';
import { 
  Home, 
  Target, 
  Cpu, 
  Settings, 
  HelpCircle, 
  ChevronRight, 
  Check, 
  IndianRupee, 
  ShieldCheck, 
  LogOut,
  Phone,
  Mail,
  Copy,
  ExternalLink,
  X,
  Globe,
  Coins,
  Volume2,
  VolumeX,
  Play
} from 'lucide-react';
import { ScreenId } from '../../types';
import { soundFx } from '../../utils/sound';

interface ProfileScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [activeModal, setActiveModal] = useState<'home' | 'goals' | 'support' | 'settings' | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [targetBudgetRupees, setTargetBudgetRupees] = useState(1500);
  const [targetKwh, setTargetKwh] = useState(250);
  const [homeType, setHomeType] = useState('3 BHK Residential Apartment');
  const [provider, setProvider] = useState('Tata Power / State Discom (Smart Net Meter)');

  // App Settings state
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi' | 'zh' | 'es' | 'fr' | 'ru'>('en');
  const [selectedCurrency, setSelectedCurrency] = useState<'inr' | 'usd' | 'eur' | 'gbp' | 'chf'>('inr');
  const [selectedSound, setSelectedSound] = useState<'futuristic' | 'gentle' | 'radar' | 'cyber' | 'none'>('futuristic');
  const [pushNotifications, setPushNotifications] = useState(true);
  const [savedSettingsNotice, setSavedSettingsNotice] = useState(false);

  const languages = [
    { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
    { code: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳' },
    { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
    { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
  ];

  const currencies = [
    { code: 'inr', name: 'Rupees', symbol: '₹', sub: 'INR - Indian Rupee' },
    { code: 'usd', name: 'USD', symbol: '$', sub: 'USD - United States Dollar' },
    { code: 'eur', name: 'Euro', symbol: '€', sub: 'EUR - European Euro' },
    { code: 'gbp', name: 'Pounds', symbol: '£', sub: 'GBP - British Pound' },
    { code: 'chf', name: 'Swiss Franc', symbol: 'CHF', sub: 'CHF - Swiss Franc' },
  ];

  const sounds = [
    { id: 'futuristic', name: 'WattWise Synth', desc: 'Sleek rising dual harmonic ping' },
    { id: 'gentle', name: 'Warm Marimba', desc: 'Soft acoustic eco tone' },
    { id: 'radar', name: 'Pulse Radar', desc: 'Sci-fi high-energy sweep' },
    { id: 'cyber', name: 'Cyber Blip', desc: 'Triple micro-voltage cadence' },
    { id: 'none', name: 'Mute / Silent', desc: 'No sound notification' },
  ];

  const handlePlaySoundPreview = (soundId: 'futuristic' | 'gentle' | 'radar' | 'cyber' | 'none') => {
    soundFx.playChime(soundId);
  };

  const handleSaveSettings = () => {
    if (selectedSound !== 'none') {
      soundFx.playChime(selectedSound);
    }
    setSavedSettingsNotice(true);
    setTimeout(() => {
      setSavedSettingsNotice(false);
      setActiveModal(null);
    }, 1000);
  };

  const currentLangObj = languages.find((l) => l.code === selectedLanguage) || languages[0];
  const currentCurrObj = currencies.find((c) => c.code === selectedCurrency) || currencies[0];

  const menuItems = [
    {
      id: 'home-info',
      title: 'Home Information',
      subtitle: 'Manage your home & smart meter specs',
      icon: Home,
      action: () => setActiveModal('home'),
    },
    {
      id: 'energy-goals',
      title: 'Energy Goals',
      subtitle: 'Set your monthly saving budget & kWh caps',
      icon: Target,
      action: () => setActiveModal('goals'),
    },
    {
      id: 'device-mgmt',
      title: 'Device Management',
      subtitle: 'Manage 7 paired relays & sensors',
      icon: Cpu,
      action: () => onNavigate('devices'),
    },
    {
      id: 'app-settings',
      title: 'App Settings',
      subtitle: `${currentLangObj.name} • ${currentCurrObj.name} (${currentCurrObj.symbol}) • Sound`,
      icon: Settings,
      action: () => setActiveModal('settings'),
    },
    {
      id: 'help-support',
      title: 'Help & Support',
      subtitle: '+91 9326624680 • mabhinav526@gmail.com',
      icon: HelpCircle,
      action: () => setActiveModal('support'),
    },
  ];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  return (
    <div className="p-4 space-y-4 text-white pb-6">
      {/* Title Header */}
      <div className="pt-1">
        <h1 className="text-xl font-bold tracking-tight text-white">Profile</h1>
        <p className="text-xs text-slate-400">Manage your home, goals and app settings</p>
      </div>

      {/* User Card matching mockup (Burgundy Velvet Theme) */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-[#260616] via-[#1a040f] to-[#12020a] border border-rose-500/35 shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(159,18,57,0.2)] flex items-center gap-4">
        {/* WW Circle Avatar & App Logo Indicator */}
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-200 font-extrabold text-lg shadow-[0_0_15px_rgba(244,63,94,0.35)]">
            WW
          </div>
          <img
            src="/wattwise-logo.jpg"
            alt="WattWise App Logo"
            className="w-5 h-5 rounded-md object-cover border border-rose-500/60 shadow-[0_0_8px_rgba(244,63,94,0.5)] absolute -bottom-1 -right-1"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-white">WW</h2>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold">
              Pro Home
            </span>
          </div>
          <span className="text-xs text-rose-300/70 block mt-0.5">ww@wattwise.com</span>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
            <ShieldCheck className="w-3 h-3" />
            Smart Gateway Online • 99.8% Uptime
          </span>
        </div>
      </div>

      {/* Current Goal Summary Pill */}
      <div className="p-3.5 rounded-2xl bg-[#18040d] border border-rose-950 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">Monthly Target</span>
          <span className="text-sm font-bold text-white flex items-center gap-1">
            <span className="text-emerald-400 font-bold">{currentCurrObj.symbol}</span>
            <span>{targetBudgetRupees}</span>
            <span className="text-xs text-slate-400 font-normal">/ {targetKwh} kWh</span>
          </span>
        </div>
        <button
          onClick={() => setActiveModal('goals')}
          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Edit Goal →
        </button>
      </div>

      {/* Profile Menu List matching mockup */}
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className="w-full p-3.5 rounded-2xl bg-[#091527] hover:bg-[#0c1d35] border border-slate-800/80 hover:border-cyan-500/30 flex items-center justify-between text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 group-hover:bg-cyan-500/20 border border-slate-700/60 group-hover:border-cyan-500/40 text-slate-300 group-hover:text-cyan-300 flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {item.subtitle}
                  </span>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            </button>
          );
        })}
      </div>

      {/* Logout / Reset Demo */}
      <button
        onClick={() => onNavigate('welcome')}
        className="w-full py-2.5 rounded-2xl border border-slate-800 text-xs font-semibold text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
      >
        <LogOut className="w-4 h-4" />
        <span>Return to Welcome Screen</span>
      </button>

      {/* Goals Modal */}
      {activeModal === 'goals' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#0a1628] border border-cyan-500/40 p-5 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" />
              Set Monthly Energy Target
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Budget Cap ({currentCurrObj.symbol} / month)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="800"
                    max="4000"
                    step="100"
                    value={targetBudgetRupees}
                    onChange={(e) => setTargetBudgetRupees(Number(e.target.value))}
                    className="flex-1 accent-cyan-400"
                  />
                  <span className="text-xs font-mono-num font-bold text-cyan-300 w-16 text-right">
                    {currentCurrObj.symbol}{targetBudgetRupees}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Energy Consumption Cap (kWh)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="150"
                    max="600"
                    step="10"
                    value={targetKwh}
                    onChange={(e) => setTargetKwh(Number(e.target.value))}
                    className="flex-1 accent-emerald-400"
                  />
                  <span className="text-xs font-mono-num font-bold text-emerald-300 w-16 text-right">
                    {targetKwh} kWh
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold flex items-center justify-center gap-1"
            >
              <Check className="w-4 h-4" />
              <span>Save Target</span>
            </button>
          </div>
        </div>
      )}

      {/* Home Info Modal */}
      {activeModal === 'home' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#0a1628] border border-cyan-500/40 p-5 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Home className="w-4 h-4 text-cyan-400" />
              Home Information
            </h3>

            <div className="space-y-2.5 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Property Type</label>
                <input
                  type="text"
                  value={homeType}
                  onChange={(e) => setHomeType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Grid & Discom Provider</label>
                <input
                  type="text"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 text-slate-300 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Meter Serial</span>
                <span className="font-mono-num font-semibold text-cyan-300">#WW-IN-8921-X9</span>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Help & Support Modal */}
      {activeModal === 'support' && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#0a1628] border border-cyan-500/40 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Help & Support</h3>
                  <span className="text-[10px] text-slate-400">WattWise Technical & Account Desk</span>
                </div>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Reach out to our customer support engineer directly for smart meter syncing, billing questions, or hardware relay assistance.
            </p>

            {/* Support Contacts */}
            <div className="space-y-2.5">
              {/* Primary Phone Support */}
              <div className="p-3 rounded-2xl bg-[#071324] border border-cyan-500/30 hover:border-cyan-400/60 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                        Primary Phone Support
                      </span>
                      <span className="text-sm font-bold text-white font-mono-num">
                        +91 9326624680
                      </span>
                    </div>
                  </div>

                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold">
                    Live
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href="tel:9326624680"
                    className="flex-1 py-1.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Now</span>
                  </a>

                  <button
                    onClick={() => handleCopy('9326624680', 'phone')}
                    className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedItem === 'phone' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Gmail Support */}
              <div className="p-3 rounded-2xl bg-[#071324] border border-cyan-500/30 hover:border-cyan-400/60 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                        Gmail Support
                      </span>
                      <span className="text-xs font-bold text-cyan-300 font-mono-num break-all">
                        mabhinav526@gmail.com
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href="mailto:mabhinav526@gmail.com?subject=WattWise%20Support%20Request&body=Hi%20Abhinav,%0A%0AI%20need%20assistance%20with%20my%20WattWise%20account:%0A"
                    className="flex-1 py-1.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Send Email</span>
                  </a>

                  <button
                    onClick={() => handleCopy('mabhinav526@gmail.com', 'email')}
                    className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedItem === 'email' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Hours note */}
            <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Support Hours:</span>
              <span className="text-slate-300 font-medium">9:00 AM – 8:00 PM IST (Mon–Sat)</span>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* App Settings Modal */}
      {activeModal === 'settings' && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-sm rounded-3xl bg-[#0a1628] border border-cyan-500/40 p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 sticky top-0 bg-[#0a1628] z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">App Settings</h3>
                  <span className="text-[10px] text-slate-400">Personalize display & audio preferences</span>
                </div>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 1. Language Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Language</span>
                </label>
                <span className="text-[10px] text-cyan-300 font-medium">
                  {currentLangObj.flag} {currentLangObj.name}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {languages.map((lang) => {
                  const isSelected = selectedLanguage === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang.code as typeof selectedLanguage)}
                      className={`p-2 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400/60 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                          : 'bg-[#071324] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{lang.flag}</span>
                        <div>
                          <span className={`text-xs block font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                            {lang.name}
                          </span>
                          <span className="text-[9px] text-slate-400">{lang.native}</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Currency Selection */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span>Currency</span>
                </label>
                <span className="text-[10px] text-amber-300 font-medium">
                  {currentCurrObj.name} ({currentCurrObj.symbol})
                </span>
              </div>

              <div className="space-y-1.5">
                {currencies.map((curr) => {
                  const isSelected = selectedCurrency === curr.code;
                  return (
                    <button
                      key={curr.code}
                      onClick={() => setSelectedCurrency(curr.code as typeof selectedCurrency)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400/50 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                          : 'bg-[#071324] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center font-mono-num ${
                          isSelected ? 'bg-amber-400 text-slate-950 shadow-sm' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {curr.symbol}
                        </div>
                        <div>
                          <span className={`text-xs font-semibold block ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                            {curr.name}
                          </span>
                          <span className="text-[10px] text-slate-400">{curr.sub}</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Notification Sound Customization & Audio Preview */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Notification Chime</span>
                </label>
                <span className="text-[10px] text-emerald-300 font-medium">
                  Audio Synthesizer
                </span>
              </div>

              {/* Master Push Toggle */}
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-200 block">Alert Sounds</span>
                  <span className="text-[10px] text-slate-400">Play chime on peak alerts & savings</span>
                </div>
                <button
                  onClick={() => {
                    const next = !pushNotifications;
                    setPushNotifications(next);
                    if (next) soundFx.playChime(selectedSound);
                  }}
                  className={`w-10 h-5.5 rounded-full p-0.5 transition-all duration-300 cursor-pointer relative ${
                    pushNotifications 
                      ? 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]' 
                      : 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.4)]'
                  }`}
                >
                  <div
                    className={`w-4.5 h-4.5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                      pushNotifications ? 'translate-x-4.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Sound Selection Options */}
              <div className="space-y-1.5">
                {sounds.map((sound) => {
                  const isSelected = selectedSound === sound.id;
                  return (
                    <div
                      key={sound.id}
                      onClick={() => {
                        setSelectedSound(sound.id as typeof selectedSound);
                        handlePlaySoundPreview(sound.id as typeof selectedSound);
                      }}
                      className={`p-2 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500/15 border-emerald-400/50 shadow-[0_0_8px_rgba(16,185,129,0.25)]'
                          : 'bg-[#071324] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlaySoundPreview(sound.id as typeof selectedSound);
                          }}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 flex items-center justify-center transition-colors cursor-pointer"
                          title="Preview sound"
                        >
                          {sound.id === 'none' ? (
                            <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                          ) : (
                            <Play className="w-3 h-3 fill-current ml-0.5" />
                          )}
                        </button>

                        <div>
                          <span className={`text-xs font-semibold block ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                            {sound.name}
                          </span>
                          <span className="text-[9px] text-slate-400">{sound.desc}</span>
                        </div>
                      </div>

                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mr-1" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2">
              <button
                onClick={handleSaveSettings}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{savedSettingsNotice ? 'Preferences Saved!' : 'Save App Preferences'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
