import { Bell, Check, Trash2, X, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';
import { NotificationItem } from '../../types';

interface WattWiseNotificationsProps {
  notifications: NotificationItem[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllRead: () => void;
  onDismiss: (id: string) => void;
}

export function WattWiseNotifications({
  notifications,
  isOpen,
  onClose,
  onMarkAllRead,
  onDismiss,
}: WattWiseNotificationsProps) {
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotifIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'recommendation':
      case 'tip':
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="w-full max-w-md bg-[#091528] border-l border-slate-800 h-full flex flex-col shadow-2xl animate-slide-left">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white">Grid Notifications</h2>
            {unreadCount > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950">
                {unreadCount} new
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-2 text-slate-500">
              <Bell className="w-8 h-8 opacity-40" />
              <p className="text-xs">No active notifications</p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                  item.read
                    ? 'bg-slate-900/40 border-slate-800/80 text-slate-400'
                    : 'bg-slate-900/90 border-cyan-500/30 text-white shadow-sm'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                  {getNotifIcon(item.type)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-white">{item.title}</h3>
                    <span className="text-[10px] text-slate-500">{item.timeAgo}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">{item.description}</p>
                </div>

                <button
                  onClick={() => onDismiss(item.id)}
                  title="Dismiss"
                  className="p-1 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span>WattWise Telemetry Daemon</span>
          <span>50 Hz Grid Watcher</span>
        </div>
      </div>
    </div>
  );
}
