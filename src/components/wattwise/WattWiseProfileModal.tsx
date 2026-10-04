import { useState } from 'react';
import { X, RotateCcw, ShieldCheck, Zap, Sun, Home, CheckCircle2 } from 'lucide-react';

interface WattWiseProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetData: () => void;
  avatarUrl?: string;
}

export function WattWiseProfileModal({
  isOpen,
  onClose,
  onResetData,
  avatarUrl = '/wattwise-logo.jpg',
}: WattWiseProfileModalProps) {
  if (!isOpen) return null;

  const [householdName, setHouseholdName] = useState('Green Residence');
  const [provider, setProvider] = useState('Tata Power Mumbai (Smart Time-of-Use)');
  const [sanctionedLoad, setSanctionedLoad] = useState('10.0 kW');
  const [solarCapacity, setSolarCapacity] = useState('5.2 kWp');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-[#091528] border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <img
              src={avatarUrl}
              alt="Homeowner avatar"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-xl object-cover border border-cyan-500/40"
              onError={(e) => {
                e.currentTarget.src = '/wattwise-logo.jpg';
              }}
            />
            <div>
              <h2 className="text-base font-bold text-white">Household Grid Profile</h2>
              <p className="text-xs text-slate-400">Smart meter and utility rate configuration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Household Title</label>
            <input
              type="text"
              value={householdName}
              onChange={(e) => setHouseholdName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Utility DISCOM</label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Tata Power Mumbai (Smart Time-of-Use)">Tata Power Mumbai (ToU)</option>
                <option value="BESCOM Smart Grid Tariff">BESCOM Bangalore</option>
                <option value="Adani Electricity Dynamic">Adani Electricity</option>
                <option value="Pacific Gas & Electric (Time-of-Day)">PG&E California</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Sanctioned Service Load</label>
              <input
                type="text"
                value={sanctionedLoad}
                onChange={(e) => setSanctionedLoad(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Rooftop Solar Rating</label>
              <input
                type="text"
                value={solarCapacity}
                onChange={(e) => setSolarCapacity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">AMI Smart Meter ID</label>
              <input
                type="text"
                disabled
                value="WATT-8829-PRO"
                className="w-full px-3 py-2 bg-slate-900/60 border border-slate-800 rounded-xl text-slate-400 font-mono"
              />
            </div>
          </div>

          {/* Reset Demo Data Section */}
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-300 block">Reset Simulation Data</span>
              <span className="text-[11px] text-slate-500">Restore factory baseline energy metrics and appliances.</span>
            </div>
            <button
              type="button"
              onClick={onResetData}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          {savedNotice ? (
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Configuration Saved!
            </span>
          ) : (
            <span className="text-[11px] text-slate-500">WattWise OS v4.2 · Secure Meter Sync</span>
          )}

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
