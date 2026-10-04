import { useState } from 'react';
import { 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Sparkles, 
  Trash2, 
  CheckCheck,
  Volume2
} from 'lucide-react';
import { NotificationItem, ScreenId } from '../../types';
import { soundFx } from '../../utils/sound';

interface NotificationsScreenProps {
  notifications: NotificationItem[];
  onNavigate: (screen: ScreenId) => void;
  onMarkAllRead: () => void;
  onDismissNotification: (id: string) => void;
}

export function NotificationsScreen({
  notifications,
  onNavigate,
  onMarkAllRead,
  onDismissNotification,
}: NotificationsScreenProps) {
  const [filter, setFilter] = useState<'all' | 'alerts' | 'recommendations'>('all');

  const filteredNotifs = notifications.filter((item) => {
    if (filter === 'alerts') return item.type === 'alert';
    if (filter === 'recommendations') return item.type === 'recommendation' || item.type === 'tip';
    return true;
  });

  const getNotifIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'alert':
        return {
          icon: AlertTriangle,
          bg: 'bg-red-500/20 text-red-400 border-red-500/40',
        };
      case 'success':
        return {
          icon: CheckCircle2,
          bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
        };
      case 'recommendation':
        return {
          icon: Sparkles,
          bg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
        };
      case 'tip':
      default:
        return {
          icon: Info,
          bg: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
        };
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
          Activity Center
        </span>
        <div className="w-12" />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Notifications</h1>
          <p className="text-xs text-slate-400">Stay updated with alerts and tips</p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => soundFx.playChime('futuristic')}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors flex items-center gap-1 text-[11px] font-medium cursor-pointer"
            title="Play alert chime"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chime</span>
          </button>

          {notifications.length > 0 && (
            <button
              onClick={onMarkAllRead}
              className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark read</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs matching mockup */}
      <div className="grid grid-cols-3 p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
        {(['all', 'alerts', 'recommendations'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`py-1.5 rounded-lg font-semibold capitalize transition-all cursor-pointer ${
              filter === t
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5">
        {filteredNotifs.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs">
            No notifications in this category.
          </div>
        ) : (
          filteredNotifs.map((item) => {
            const { icon: Icon, bg } = getNotifIcon(item.type);

            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  item.read
                    ? 'bg-[#081324] border-slate-800/80 opacity-80'
                    : 'bg-[#0b1b34] border-cyan-500/30 shadow-[0_4px_16px_rgba(6,182,212,0.1)]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${bg}`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xs font-bold text-white">{item.title}</h2>
                        {!item.read && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">{item.timeAgo}</span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-snug">
                      {item.description}
                    </p>

                    <div className="pt-1 flex items-center justify-between">
                      {item.type === 'alert' && (
                        <button
                          onClick={() => onNavigate('insights')}
                          className="text-[11px] font-semibold text-cyan-400 hover:underline"
                        >
                          Review usage trend →
                        </button>
                      )}
                      {item.type === 'recommendation' && (
                        <button
                          onClick={() => onNavigate('recommendations')}
                          className="text-[11px] font-semibold text-cyan-400 hover:underline"
                        >
                          View recommendation →
                        </button>
                      )}
                      {item.type === 'tip' && <div />}

                      <button
                        onClick={() => onDismissNotification(item.id)}
                        className="text-slate-500 hover:text-red-400 p-1"
                        title="Dismiss"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
