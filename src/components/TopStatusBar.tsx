import { Wifi, Battery } from 'lucide-react';

interface TopStatusBarProps {
  light?: boolean;
}

export function TopStatusBar({ light = false }: TopStatusBarProps) {
  return (
    <div className={`flex items-center justify-between px-6 pt-3 pb-2 select-none text-xs font-medium tracking-tight ${light ? 'text-white' : 'text-rose-200/90'}`}>
      <span className="font-semibold tracking-normal text-[13px]">9:41</span>
      
      {/* Dynamic Island Pill */}
      <div className="w-24 h-4 bg-[#18040d] rounded-full mx-auto flex items-center justify-center gap-1.5 px-2 border border-rose-900/50 shadow-inner">
        <div className="w-1.5 h-1.5 rounded-full bg-black/60" />
        <div className="w-2 h-2 rounded-full bg-[#2a0717] border border-rose-500/40 animate-pulse" />
      </div>

      <div className="flex items-center gap-1.5">
        {/* Cellular bars */}
        <div className="flex items-end gap-[1.5px] h-2.5">
          <div className="w-[2.5px] h-1 bg-current rounded-xs" />
          <div className="w-[2.5px] h-1.5 bg-current rounded-xs" />
          <div className="w-[2.5px] h-2 bg-current rounded-xs" />
          <div className="w-[2.5px] h-2.5 bg-current rounded-xs" />
        </div>
        <Wifi className="w-3.5 h-3.5 ml-0.5" />
        <div className="flex items-center gap-0.5 ml-0.5">
          <Battery className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
