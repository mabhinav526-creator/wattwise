import { useState, type FormEvent } from 'react';
import { 
  AlertTriangle, 
  Snowflake, 
  Lightbulb, 
  Zap, 
  Power, 
  Plus, 
  Check, 
  Clock, 
  Sparkles,
  ShieldCheck,
  X
} from 'lucide-react';
import { AutomationRule } from '../../types';

interface WattWiseAutomationsProps {
  automations: AutomationRule[];
  onToggleRule: (id: string) => void;
  onAddRule: (rule: AutomationRule) => void;
}

export function WattWiseAutomations({
  automations,
  onToggleRule,
  onAddRule,
}: WattWiseAutomationsProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTag, setNewTag] = useState('Tariff Shift');

  const getRuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'AlertTriangle':
        return AlertTriangle;
      case 'Snowflake':
        return Snowflake;
      case 'Lightbulb':
        return Lightbulb;
      case 'Zap':
        return Zap;
      default:
        return Power;
    }
  };

  const activeCount = automations.filter((a) => a.enabled).length;
  const totalMonthlySavings = automations
    .filter((a) => a.enabled)
    .reduce((sum, a) => sum + a.impactRupeesEstimate, 0);

  const totalKwhSaved = automations
    .filter((a) => a.enabled)
    .reduce((sum, a) => sum + a.impactKwhEstimate, 0);

  const handleCreateRule = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: AutomationRule = {
      id: `auto-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim() || 'Custom user automation rule triggered by smart home power threshold.',
      enabled: true,
      iconName: 'Zap',
      tag: newTag,
      impactKwhEstimate: 2.2,
      impactRupeesEstimate: 140,
    };

    onAddRule(created);
    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with KPI Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Smart Automations Engine</h1>
          <p className="text-xs text-slate-400">Intelligent rules for peak shaving, tariff shifts, and vampire power elimination</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 text-xs font-bold hover:brightness-110 shadow-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Automation Rule</span>
        </button>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#091528] border border-slate-800">
          <span className="text-xs text-slate-400 block">Active Automation Policies</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-white">
              {activeCount}
            </span>
            <span className="text-xs text-slate-400">of {automations.length} enabled</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#091528] border border-emerald-500/30">
          <span className="text-xs text-slate-400 block">Est. Monthly Savings</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-emerald-400">₹</span>
            <span className="text-3xl font-extrabold font-mono tabular-nums text-emerald-400">
              {totalMonthlySavings}
            </span>
            <span className="text-xs text-slate-400">/month</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#091528] border border-cyan-500/30">
          <span className="text-xs text-slate-400 block">Energy Conserved</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-cyan-300">
              {totalKwhSaved.toFixed(1)}
            </span>
            <span className="text-sm font-semibold text-cyan-400">kWh/day</span>
          </div>
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-3">
        {automations.map((rule) => {
          const Icon = getRuleIcon(rule.iconName);

          return (
            <div
              key={rule.id}
              className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                rule.enabled
                  ? 'bg-[#091528] border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.06)]'
                  : 'bg-[#091528]/50 border-slate-800/80 opacity-70'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    rule.enabled
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-white">{rule.title}</h2>
                    <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                      {rule.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 max-w-2xl">{rule.description}</p>
                </div>
              </div>

              {/* Savings and Working Toggle Switch */}
              <div className="flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                <div className="text-left md:text-right">
                  <span className="text-[11px] text-slate-400 block">Target Impact</span>
                  <span className="text-xs font-mono tabular-nums font-bold text-emerald-400">
                    +₹{rule.impactRupeesEstimate}/mo · {rule.impactKwhEstimate} kWh
                  </span>
                </div>

                <button
                  onClick={() => onToggleRule(rule.id)}
                  role="switch"
                  aria-checked={rule.enabled}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    rule.enabled ? 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'bg-slate-800'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      rule.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Rule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#091528] border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Create Automation Policy</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Policy Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Turn off Living AC when bedroom is cool..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Description / Condition</label>
                <textarea
                  rows={3}
                  placeholder="Describe when this rule triggers and what circuits it controls..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Category Tag</label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Tariff Shift">Tariff Shift (Night Saving)</option>
                  <option value="Peak Shaving">Peak Shaving</option>
                  <option value="Climate">Climate Auto-Tune</option>
                  <option value="Geofence">Geofence (Away Mode)</option>
                  <option value="Standby Cut">Standby Vampire Cut</option>
                </select>
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
                  Enable Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
