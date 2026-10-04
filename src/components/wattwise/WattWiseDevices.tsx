import { useState, type FormEvent } from 'react';
import { 
  Zap, 
  Plus, 
  Wind, 
  Refrigerator, 
  Lightbulb, 
  WashingMachine, 
  Sliders, 
  Power, 
  Search,
  Filter,
  CheckCircle2,
  X
} from 'lucide-react';
import { Appliance } from '../../types';

interface WattWiseDevicesProps {
  appliances: Appliance[];
  onToggleAppliance: (id: string) => void;
  onSelectAppliance: (appliance: Appliance) => void;
  onAddAppliance: (newApp: Appliance) => void;
}

export function WattWiseDevices({
  appliances,
  onToggleAppliance,
  onSelectAppliance,
  onAddAppliance,
}: WattWiseDevicesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states for new appliance
  const [formName, setFormName] = useState('');
  const [formRoom, setFormRoom] = useState('Living Room');
  const [formCategory, setFormCategory] = useState<Appliance['category']>('climate');
  const [formKw, setFormKw] = useState('1.5');

  // Rooms list
  const rooms = ['all', ...Array.from(new Set(appliances.map((a) => a.room)))];

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
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.room.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRoom = selectedRoom === 'all' || a.room === selectedRoom;
    const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
    return matchesSearch && matchesRoom && matchesCategory;
  });

  const handleCreateAppliance = (e: FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const kw = parseFloat(formKw) || 1.0;
    const newApp: Appliance = {
      id: `custom-app-${Date.now()}`,
      name: formName.trim(),
      category: formCategory,
      powerKw: kw,
      nominalKw: kw,
      todayKwh: 0.0,
      percentage: 2,
      status: 'on',
      room: formRoom,
      hourlyUsage: [
        { hour: '12 PM', kw: kw },
        { hour: '2 PM', kw: kw },
      ],
      temperature: formCategory === 'climate' ? 24 : undefined,
      ecoMode: true,
    };

    onAddAppliance(newApp);
    setFormName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Smart Home Appliances</h1>
          <p className="text-xs text-slate-400">Control individual branch circuits, set schedules, and monitor draw</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 text-xs font-bold hover:brightness-110 shadow-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Appliance</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#091528] border border-slate-800 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search appliance or room..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Room Filter Pills (Interactive Segmented Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {rooms.map((room) => (
            <button
              key={room}
              onClick={() => setSelectedRoom(room)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedRoom === room
                  ? 'bg-cyan-950 text-cyan-300 font-semibold border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {room === 'all' ? 'All Rooms' : room}
            </button>
          ))}
        </div>
      </div>

      {/* Appliances Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAppliances.map((app) => {
          const Icon = getCategoryIcon(app.category);
          const isOn = app.status === 'on';

          return (
            <div
              key={app.id}
              className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-4 ${
                isOn
                  ? 'bg-[#091528] border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.06)]'
                  : 'bg-[#091528]/50 border-slate-800/80 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isOn
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">{app.name}</h2>
                    <p className="text-xs text-slate-400">{app.room}</p>
                  </div>
                </div>

                {/* Circuit Toggle */}
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

              {/* Status and Numbers */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800/70 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Status</span>
                  <span className={`font-semibold ${isOn ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {isOn ? 'Active (ON)' : 'Idle (OFF)'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Active Power</span>
                  <span className="font-mono tabular-nums font-bold text-white">
                    {isOn ? `${app.powerKw.toFixed(1)} kW` : '0.0 kW'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Today's Draw</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-300">
                    {app.todayKwh} kWh
                  </span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-xs">
                <span className="text-[11px] text-slate-400">
                  Rating: <span className="font-mono tabular-nums text-slate-300">{app.nominalKw} kW</span>
                </span>

                <button
                  onClick={() => onSelectAppliance(app)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Configure</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Appliance Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#091528] border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Add Smart Appliance</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAppliance} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Appliance Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Induction Cooktop, Heat Pump..."
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Room</label>
                  <select
                    value={formRoom}
                    onChange={(e) => setFormRoom(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Living Room">Living Room</option>
                    <option value="Master Bedroom">Master Bedroom</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Utility Area">Utility Area</option>
                    <option value="Garage">Garage</option>
                    <option value="Bathroom">Bathroom</option>
                    <option value="Home Office">Home Office</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as Appliance['category'])}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="climate">Climate (AC / Heat)</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="lighting">Lighting</option>
                    <option value="laundry">Laundry</option>
                    <option value="utility">Utility / Water</option>
                    <option value="mobility">Mobility / EV</option>
                    <option value="entertainment">Entertainment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Nominal Power (kW)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="10.0"
                  required
                  value={formKw}
                  onChange={(e) => setFormKw(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
                >
                  Add Circuit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
