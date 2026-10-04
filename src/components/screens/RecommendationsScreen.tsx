import { useState, type FormEvent } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  Leaf, 
  PowerOff, 
  Droplet, 
  Home, 
  CheckCircle2, 
  ChevronRight, 
  ChevronDown,
  Send,
  HelpCircle,
  IndianRupee,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EnergyRecommendation, ScreenId } from '../../types';

interface RecommendationsScreenProps {
  recommendations: EnergyRecommendation[];
  onApplyRecommendation: (id: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

export function RecommendationsScreen({
  recommendations,
  onApplyRecommendation,
  onNavigate,
}: RecommendationsScreenProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [userQuery, setUserQuery] = useState('');
  const [advisorReplies, setAdvisorReplies] = useState<{ query: string; answer: string }[]>([
    {
      query: 'How can I save ₹500 more this month?',
      answer: 'By keeping your AC at 24°C with Eco Mode and setting water heater heating 30 mins earlier, you will save approximately ₹560/month with zero comfort loss.',
    },
  ]);

  const handleApply = (id: string) => {
    onApplyRecommendation(id);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#10b981', '#38bdf8'],
    });
  };

  const handleAskAdvisor = (e: FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const q = userQuery.trim();
    let reply = 'Based on your 12.6 kWh daily profile, switching your AC to 24°C and cutting the 80W standby entertainment console will trim approximately 18% off your upcoming bill.';
    
    if (q.toLowerCase().includes('ac') || q.toLowerCase().includes('cool')) {
      reply = 'Your AC currently consumes 33% (4.2 kW peak) of your home energy. Raising target temp from 22°C to 24°C saves 12-15% instantly without reducing room airflow.';
    } else if (q.toLowerCase().includes('bill') || q.toLowerCase().includes('cost')) {
      reply = 'At current tariff rates (₹13/kWh), your projected monthly bill is ₹1,638. Applying all 4 active recommendations will bring this down to ~₹1,218/month.';
    } else if (q.toLowerCase().includes('heater') || q.toLowerCase().includes('geyser')) {
      reply = 'The bathroom geyser draws 1.8 kW. Running it for 25 minutes during off-peak morning hours (before 7 AM) saves ~₹140/month compared to daytime heating.';
    }

    setAdvisorReplies((prev) => [...prev, { query: q, answer: reply }]);
    setUserQuery('');
  };

  const featured = recommendations.find((r) => r.id === 'rec-1') || recommendations[0];
  const otherRecs = recommendations.filter((r) => r.id !== featured.id);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'standby':
        return PowerOff;
      case 'schedule':
        return Droplet;
      case 'efficiency':
        return Home;
      default:
        return Leaf;
    }
  };

  return (
    <div className="p-4 space-y-4 text-white pb-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Smart Suggestions
        </span>
        <div className="w-12" />
      </div>

      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Recommendations</h1>
        <p className="text-xs text-slate-400">Save energy. Save money.</p>
      </div>

      {/* Featured Big Suggestion Card matching mockup */}
      <div className={`p-4 rounded-3xl border transition-all ${
        featured.applied
          ? 'bg-emerald-950/30 border-emerald-500/40 shadow-[0_4px_24px_rgba(16,185,129,0.15)]'
          : 'bg-gradient-to-br from-[#0c223c] via-[#09182f] to-[#061222] border-cyan-500/40 shadow-[0_8px_30px_rgba(6,182,212,0.2)]'
      }`}>
        <div className="flex items-start gap-3">
          {/* Glowing Green Leaf in Speech Bubble Icon */}
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Leaf className="w-6 h-6" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                Smart Suggestion
              </span>
              <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-500/30">
                Save up to 20%
              </span>
            </div>

            <p className="text-xs text-white font-medium mt-1 leading-snug">
              You can save up to 20% more on your monthly bill by adjusting your AC schedule during peak tariff hours.
            </p>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-emerald-400 font-bold">
                <IndianRupee className="w-3.5 h-3.5" />
                <span>Save ≈ ₹{featured.potentialSavingsRupees}/mo</span>
              </div>

              {featured.applied ? (
                <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-xs border border-emerald-500/40">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Applied</span>
                </div>
              ) : (
                <button
                  id="rec-featured-apply-btn"
                  onClick={() => handleApply(featured.id)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer active:scale-95"
                >
                  <span>Apply Now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Other Recommendations List */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
          Other Recommendations
        </h2>

        <div className="space-y-2">
          {otherRecs.map((rec) => {
            const Icon = getCategoryIcon(rec.category);
            const isExpanded = expandedId === rec.id;

            return (
              <div
                key={rec.id}
                id={`rec-item-${rec.id}`}
                className="rounded-2xl bg-[#091527] hover:bg-[#0c1c34] border border-slate-800/90 transition-all overflow-hidden"
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? null : rec.id)}
                  className="p-3.5 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-white">{rec.title}</h3>
                      <span className="text-[10px] text-emerald-400 font-medium">
                        Save ≈ ₹{rec.potentialSavingsRupees}/mo ({rec.potentialSavingsPercent}%)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {rec.applied && (
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        Active
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-800/70 text-xs text-slate-300 space-y-2.5">
                    <p className="leading-relaxed">{rec.description}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-400">
                        Tag: <span className="text-cyan-300 font-semibold">{rec.impactTag}</span>
                      </span>

                      {!rec.applied ? (
                        <button
                          onClick={() => handleApply(rec.id)}
                          className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Zap className="w-3 h-3" />
                          <span>Enable Automation</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Savings plan enabled</span>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive AI Energy Advisor Chat Box */}
      <div className="p-3.5 rounded-3xl bg-[#0a1628] border border-cyan-500/30 shadow-lg space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Ask WattWise Energy Advisor</h3>
            <span className="text-[10px] text-slate-400">Grounded in your actual meter & appliance telemetry</span>
          </div>
        </div>

        {/* Advisor Q&A Feed */}
        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
          {advisorReplies.map((item, i) => (
            <div key={i} className="space-y-1 text-xs">
              <div className="p-2 rounded-xl bg-slate-900/90 text-cyan-300 font-medium ml-4 text-right">
                {item.query}
              </div>
              <div className="p-2.5 rounded-xl bg-[#0c1e34] border border-cyan-500/20 text-slate-200 leading-relaxed mr-4">
                {item.answer}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Question Chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {['Cut bill under ₹1500', 'Best AC temp for sleep', 'Heater off-peak savings'].map((q) => (
            <button
              key={q}
              onClick={() => setUserQuery(q)}
              className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 hover:text-cyan-300 border border-slate-800 shrink-0 cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleAskAdvisor} className="flex gap-2">
          <input
            type="text"
            placeholder="Ask about your energy usage..."
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer"
            aria-label="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
