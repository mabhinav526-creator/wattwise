import { useState, type FormEvent } from 'react';
import { 
  Wind, 
  Refrigerator, 
  Lightbulb, 
  WashingMachine, 
  Flame, 
  Tv, 
  Car, 
  Plus, 
  Zap,
  ChevronRight,
  Power,
  Search
} from 'lucide-react';
import { Appliance, ScreenId } from '../../types';

interface DevicesScreenProps {
  appliances: Appliance[];
  onToggleAppliance: (id: string) => void;
  onSelectAppliance: (appliance: Appliance) => void;
  onNavigate: (screen: ScreenId) => void;
  onAddAppliance: (appliance: Appliance) => void;
}

export function DevicesScreen({
  appliances,
  onToggleAppliance,
  onSelectAppliance,
  onNavigate,
  onAddAppliance,
}: DevicesScreenProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'standby'>('all');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRoom, setNewRoom] = useState('Living Room');
  const [newKw, setNewKw] = useState('1.5');
  const [newCategory, setNewCategory] = useState<Appliance['category']>('climate');

  const getDeviceIcon = (category: Appliance['category']) => {
    switch (category) {
      case 'climate':
        return Wind;
      case 'kitchen':
        return Refrigerator;
      case 'lighting':
        return Lightbulb;
      case 'laundry':
        return WashingMachine;
      case 'utility':
        return Flame;
      case 'entertainment':
        return Tv;
      case 'mobility':
        return Car;
      default:
        return Zap;
    }
  };

  const filteredAppliances = appliances.filter((a) => {
    if (filter === 'active' && a.status !== 'on') return false;
    if (filter === 'standby' && a.status !== 'off') return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.room.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const activeCount = appliances.filter((a) => a.status === 'on').length;
  const activeKw = appliances
    .filter((a) => a.status === 'on')
    .reduce((sum, a) => sum + a.powerKw, 0);

  const handleCreateDevice = (e: FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const kw = parseFloat(newKw) || 1.0;
    const created: Appliance = {
      id: `dev-${Date.now()}`,
      name: newName.trim(),
      category: newCategory,
      powerKw: kw,
      nominalKw: kw,
      todayKwh: +(kw * 0.8).toFixed(1),
      percentage: 10,
      status: 'off',
      room: newRoom,
      hourlyUsage: [
        { hour: '8 AM', kw: kw * 0.5 },
        { hour: '12 PM', kw },
        { hour: '6 PM', kw },
      ],
    };

    onAddAppliance(created);
    setNewName('');
    setShowAddModal(false);
  };

  return (
    <div className="p-4 space-y-4 text-rose-50 pb-6">
      {/* Title Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Devices</h1>
          <p className="text-xs text-rose-300/70">Control your appliances</p>
        </div>

        <button
          id="devices-add-btn"
          onClick={() => setShowAddModal(true)}
          className="p-2 rounded-xl bg-rose-600/25 hover:bg-rose-600/35 border border-rose-500/40 text-rose-200 transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Device</span>
        </button>
      </div>

      {/* Active Power Summary Bar */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#260616] to-[#18040d] border border-rose-500/35 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300">
            <Power className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-white">
              {activeCount} of {appliances.length} Devices Active
            </span>
            <span className="text-[10px] text-rose-300/70 block">
              Total Real-Time Load: <span className="text-rose-300 font-mono-num font-bold">{activeKw.toFixed(1)} kW</span>
            </span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('live-monitoring')}
          className="px-2.5 py-1 rounded-lg bg-[#18040d] border border-rose-900/60 text-[11px] font-semibold text-rose-300 hover:text-white transition-colors cursor-pointer"
        >
          Grid View →
        </button>
      </div>

      {/* Search & Filter Tabs */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-rose-400/50 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search appliance or room..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#18040d] border border-rose-950 text-xs text-white placeholder:text-rose-400/40 focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="grid grid-cols-3 p-1 rounded-xl bg-[#18040d] border border-rose-950 text-xs">
          {(['all', 'active', 'standby'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`py-1 rounded-lg font-semibold capitalize transition-all cursor-pointer ${
                filter === t
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-rose-300/50 hover:text-rose-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Appliances List */}
      <div className="space-y-2.5">
        {filteredAppliances.map((appliance) => {
          const Icon = getDeviceIcon(appliance.category);
          const isOn = appliance.status === 'on';

          return (
            <div
              key={appliance.id}
              id={`device-row-${appliance.id}`}
              className={`p-3.5 rounded-2xl border transition-all ${
                isOn
                  ? 'bg-[#1e0512] border-rose-500/35 shadow-[0_4px_16px_rgba(225,29,72,0.15)]'
                  : 'bg-[#12020a] border-rose-950/80 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between">
                {/* Left Clickable Area for deep dive */}
                <div
                  onClick={() => onSelectAppliance(appliance)}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      isOn
                        ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                        : 'bg-[#15030d] border border-rose-950 text-rose-400/40'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="text-xs font-bold text-white hover:text-rose-300 transition-colors">
                        {appliance.name}
                      </h2>
                      {appliance.temperature && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 font-mono-num border border-rose-900/60">
                          {appliance.temperature}°C
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-rose-300/70 block mt-0.5">
                      {appliance.room} • {isOn ? `${appliance.powerKw} kW` : 'Standby (0.0 kW)'}
                    </span>
                  </div>
                </div>

                {/* Right Switch Button */}
                <div className="flex items-center gap-2.5">
                  <button
                    id={`device-toggle-${appliance.id}`}
                    onClick={() => onToggleAppliance(appliance.id)}
                    className={`w-12 h-6.5 rounded-full p-0.5 transition-all duration-300 cursor-pointer relative shadow-sm ${
                      isOn 
                        ? 'bg-rose-600 shadow-[0_0_12px_rgba(225,29,72,0.6)]' 
                        : 'bg-[#2a0618] border border-rose-900/50 shadow-inner'
                    }`}
                    aria-label={`Toggle ${appliance.name}`}
                  >
                    <div
                      className={`w-5.5 h-5.5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                        isOn ? 'translate-x-5.5' : 'translate-x-0'
                      }`}
                    />
                  </button>

                  <button
                    onClick={() => onSelectAppliance(appliance)}
                    className="text-rose-400/60 hover:text-rose-200 p-1 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#0a1628] border border-cyan-500/40 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                Add Smart Appliance
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDevice} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Appliance Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Microwave / Heat Pump"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Room Location
                  </label>
                  <input
                    type="text"
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Rated Load (kW)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={newKw}
                    onChange={(e) => setNewKw(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as Appliance['category'])}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="climate">Climate & HVAC</option>
                  <option value="kitchen">Kitchen & Refrigeration</option>
                  <option value="lighting">Lighting Circuit</option>
                  <option value="laundry">Laundry</option>
                  <option value="utility">Water & Utility</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="mobility">EV & Battery</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold"
                >
                  Connect Device
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
