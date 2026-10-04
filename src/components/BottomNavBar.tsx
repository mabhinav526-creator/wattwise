import { Home, LineChart, Cpu, User, LayoutGrid } from 'lucide-react';
import { ScreenId } from '../types';

interface BottomNavBarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  unreadCount?: number;
}

export function BottomNavBar({ currentScreen, onNavigate }: BottomNavBarProps) {
  const navItems: { id: ScreenId; label: string; icon: typeof Home }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'insights', label: 'Insights', icon: LineChart },
    { id: 'devices', label: 'Devices', icon: LayoutGrid },
    { id: 'automation', label: 'Automation', icon: Cpu },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav aria-label="Main Navigation" className="border-t border-rose-950/80 bg-[#16040c]/95 backdrop-blur-md px-3 pt-2 pb-5 flex items-center justify-around z-20">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id;
        return (
          <button
            key={item.id}
            id={`nav-btn-${item.id}`}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-200 relative py-1 px-3 rounded-xl cursor-pointer ${
              isActive
                ? 'text-rose-400 font-semibold'
                : 'text-rose-300/50 hover:text-rose-200'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]' : ''}`} />
              {isActive && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_6px_#fb7185]" />
              )}
            </div>
            <span className="text-[11px] tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
