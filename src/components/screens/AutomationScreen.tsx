import { useState, type FormEvent } from 'react';
import { 
  AlertTriangle, 
  Snowflake, 
  Lightbulb, 
  Zap, 
  Power, 
  Plus, 
  Check, 
  IndianRupee,
  Clock
} from 'lucide-react';
import { AutomationRule } from '../../types';

interface AutomationScreenProps {
  automations: AutomationRule[];
  onToggleRule: (id: string) => void;
  onAddRule: (rule: AutomationRule) => void;
}

export function AutomationScreen({
  automations,
  onToggleRule,
  onAddRule,
}: AutomationScreenProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTag, setNewTag] = useState('Schedule');

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

  const handleCreateRule = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: AutomationRule = {
      id: `auto-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim() || 'Custom user automation rule triggered by home smart sensor.',
      enabled: true,
      iconName: 'Zap',
      tag: newTag,
      impactKwhEstimate: 2.0,
      impactRupeesEstimate: 120,
    };

    onAddRule(created);
    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
  };

  return (
    <div className="p-4 space-y-4 text-rose-50 pb-6">
      {/* Title Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Automation</h1>
          <p className="text-xs text-rose-300/70">Let your home save energy automatically</p>
        </div>

        <button
          id="automation-add-btn"
          onClick={() => setShowAddModal(true)}
          className="p-2 rounded-xl bg-rose-600/25 hover:bg-rose-600/35 border border-rose-500/40 text-rose-200 transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Rule</span>
        </button>
      </div>

      {/* Summary Impact Pill Bar */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-[#260616] to-[#18040d] border border-rose-500/35 flex items-center justify-between shadow-md">
        <div>
          <span className="text-[10px] text-rose-300/70 block font-medium">Active Automations</span>
          <span className="text-base font-extrabold text-white">
            {activeCount} of {automations.length} Running
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-emerald-400 block font-medium">Estimated Impact</span>
          <span className="text-base font-extrabold font-mono-num text-emerald-300 flex items-center justify-end gap-0.5">
            <IndianRupee className="w-3.5 h-3.5" />
            {totalMonthlySavings}/mo
          </span>
        </div>
      </div>

      {/* Automations List */}
      <div className="space-y-2.5">
        {automations.map((rule) => {
          const Icon = getRuleIcon(rule.iconName);
          const isEnabled = rule.enabled;

          return (
            <div
              key={rule.id}
              id={`rule-card-${rule.id}`}
              className={`p-3.5 rounded-2xl border transition-all ${
                isEnabled
                  ? 'bg-[#1e0512] border-rose-500/35 shadow-[0_4px_16px_rgba(225,29,72,0.15)]'
                  : 'bg-[#12020a] border-rose-950/80 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      isEnabled
                        ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                        : 'bg-[#15030d] border border-rose-950 text-rose-400/40'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xs font-bold text-white">{rule.title}</h2>
                      <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-900/60">
                        {rule.tag}
                      </span>
                    </div>

                    <p className="text-[11px] text-rose-200/80 leading-relaxed">
                      {rule.description}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-[10px] text-emerald-400 font-medium">
                      <span>Saves ≈ {rule.impactKwhEstimate} kWh/day</span>
                      <span>•</span>
                      <span>≈ ₹{rule.impactRupeesEstimate}/mo</span>
                    </div>
                  </div>
                </div>

                {/* Switch button */}
                <button
                  id={`toggle-rule-${rule.id}`}
                  onClick={() => onToggleRule(rule.id)}
                  className={`w-12 h-6.5 rounded-full p-0.5 transition-all duration-300 cursor-pointer shrink-0 relative shadow-sm ${
                    isEnabled 
                      ? 'bg-rose-600 shadow-[0_0_12px_rgba(225,29,72,0.6)]' 
                      : 'bg-[#2a0618] border border-rose-900/50 shadow-inner'
                  }`}
                  aria-label={`Toggle ${rule.title}`}
                >
                  <div
                    className={`w-5.5 h-5.5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                      isEnabled ? 'translate-x-5.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for adding custom rule */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#0a1628] border border-cyan-500/40 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                Create Smart Rule
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Rule Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Geyser Off After 20 Mins"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Trigger Condition & Action
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Turn off bathroom geyser when power draw exceeds 25 minutes."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Category Tag
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Schedule', 'Climate', 'Safety'].map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => setNewTag(tag)}
                      className={`py-1 rounded-lg text-xs font-medium transition-all ${
                        newTag === tag
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
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
                  className="flex-1 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold flex items-center justify-center gap-1 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Automation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
