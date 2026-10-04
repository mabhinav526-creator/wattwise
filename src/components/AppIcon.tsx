import React from 'react';
import { 
  StickyNote, 
  CloudSun, 
  Settings, 
  Calculator, 
  ShoppingBag, 
  Clock, 
  Image, 
  Activity, 
  Music, 
  Folder, 
  MessageCircle,
  Zap,
  Phone,
  Compass,
  Mail,
  Camera,
  Layers,
  Sparkles
} from 'lucide-react';

export interface AppIconProps {
  name: string;
  systemIconName?: string;
  iconType?: 'image' | 'lucide' | 'gradient';
  iconSrc?: string;
  gradient?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'ios-classic' | 'liquid-glass' | 'dark-titanium' | 'neon-glow';
}

export function AppIcon({
  name,
  systemIconName,
  iconType,
  iconSrc,
  gradient,
  size = 'md',
  variant = 'liquid-glass',
}: AppIconProps) {
  // Apple squircle sizing with calibrated continuous curvature radii
  const sizeClasses = {
    sm: 'w-10 h-10 rounded-[11px]',
    md: 'w-[58px] h-[58px] rounded-[15px]',
    lg: 'w-16 h-16 rounded-[17px]',
    xl: 'w-20 h-20 rounded-[22px]',
  };

  // Glyph sizes matching Apple human interface proportion (approx ~48-52% of icon container)
  const iconGlyphSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  // Custom crafted high-definition vector icons matching iOS 18 Cupertino design language
  const renderCustomCupertinoIcon = () => {
    const s = iconGlyphSizes[size];

    switch (systemIconName) {
      case 'notes':
        return (
          <div className="relative flex flex-col items-center justify-center w-full h-full p-2.5">
            {/* iOS Notes top yellow tab rule */}
            <div className="absolute top-0 left-0 right-0 h-3.5 bg-[#f5c518] border-b border-black/10 flex items-center justify-center">
              <div className="w-6 h-[1.5px] bg-black/20 rounded-full" />
            </div>
            {/* Lined notepad body */}
            <div className="w-full h-full mt-2.5 flex flex-col justify-around py-1 px-1">
              <div className="w-full h-[1.5px] bg-amber-600/30 rounded-full" />
              <div className="w-4/5 h-[1.5px] bg-amber-600/30 rounded-full" />
              <div className="w-full h-[1.5px] bg-amber-600/30 rounded-full" />
              <div className="w-2/3 h-[1.5px] bg-amber-600/30 rounded-full" />
            </div>
            {/* Small subtle pencil accent */}
            <StickyNote className="absolute right-2 bottom-2 w-3.5 h-3.5 text-amber-700/60" />
          </div>
        );

      case 'weather':
        return (
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Radiant glowing sun */}
            <div className="absolute top-2 right-2.5 w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
            {/* Dynamic frosted puffy cloud */}
            <div className="absolute bottom-2.5 left-2.5 right-2 flex items-center">
              <CloudSun className={`${s} text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]`} strokeWidth={2.2} />
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-b from-[#8e8e93] via-[#636366] to-[#3a3a3c]">
            {/* Metallic concentric brushed gear wheels */}
            <div className="absolute inset-2 rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-[#2c2c2e] border border-white/30 shadow-inner" />
              </div>
            </div>
            <Settings className={`${s} text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] animate-[spin_24s_linear_infinite]`} strokeWidth={2} />
          </div>
        );

      case 'calculator':
        return (
          <div className="w-full h-full p-2.5 flex flex-col justify-between bg-[#1c1c1e]">
            <div className="w-full h-3 bg-[#2c2c2e] rounded-sm flex items-center justify-end px-1.5 shadow-inner">
              <span className="text-[7px] font-mono-num font-bold text-amber-400">0</span>
            </div>
            <div className="grid grid-cols-3 gap-1 place-items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#505050] text-[6px] font-bold text-white flex items-center justify-center">+</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#505050] text-[6px] font-bold text-white flex items-center justify-center">-</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff9f0a] text-[6px] font-bold text-white flex items-center justify-center">=</span>
            </div>
            <div className="flex justify-center">
              <Calculator className="w-4 h-4 text-[#ff9f0a]" strokeWidth={2.2} />
            </div>
          </div>
        );

      case 'store':
        return (
          <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-b from-[#007aff] via-[#0062d2] to-[#004bb5]">
            {/* Apple App Store Iconic Trilateral Caliper / Ruler Structure */}
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div className="absolute w-8 h-1.5 bg-white/90 rounded-full rotate-45 shadow-[0_2px_6px_rgba(0,0,0,0.3)]" />
              <div className="absolute w-8 h-1.5 bg-white/90 rounded-full -rotate-45 shadow-[0_2px_6px_rgba(0,0,0,0.3)]" />
              <div className="absolute w-7 h-1.5 bg-white rounded-full translate-y-1 shadow-[0_2px_6px_rgba(0,0,0,0.3)]" />
            </div>
          </div>
        );

      case 'clock':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            {/* Dial background */}
            <div className="w-10 h-10 rounded-full bg-black border border-white/20 relative flex items-center justify-center shadow-inner">
              {/* Dial tick hour dots */}
              <div className="absolute top-1 w-1 h-1 rounded-full bg-white/80" />
              <div className="absolute bottom-1 w-1 h-1 rounded-full bg-white/80" />
              <div className="absolute left-1 w-1 h-1 rounded-full bg-white/80" />
              <div className="absolute right-1 w-1 h-1 rounded-full bg-white/80" />
              {/* Hour & Minute Hands */}
              <div className="absolute top-2 w-[1.8px] h-3 bg-white rounded-full origin-bottom rotate-[45deg]" />
              <div className="absolute top-1 w-[1.4px] h-4 bg-white rounded-full origin-bottom -rotate-[60deg]" />
              {/* Orange sweeping second hand */}
              <div className="absolute top-0.5 w-[1px] h-4.5 bg-[#ff9500] rounded-full origin-bottom rotate-[140deg]" />
              {/* Center orange pivot pin */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff9500] z-10 ring-1 ring-black" />
            </div>
          </div>
        );

      case 'photos':
        return (
          <div className="relative flex items-center justify-center w-full h-full bg-white">
            {/* Apple Photos 8-petal spectrum radial flower */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute w-2.5 h-6 bg-[#ff3b30]/90 rounded-full rotate-0 -translate-y-1 mix-blend-multiply" />
              <div className="absolute w-2.5 h-6 bg-[#ff9500]/90 rounded-full rotate-45 mix-blend-multiply" />
              <div className="absolute w-2.5 h-6 bg-[#ffcc00]/90 rounded-full rotate-90 translate-x-1 mix-blend-multiply" />
              <div className="absolute w-2.5 h-6 bg-[#34c759]/90 rounded-full rotate-[135deg] mix-blend-multiply" />
              <div className="absolute w-2.5 h-6 bg-[#007aff]/90 rounded-full rotate-180 translate-y-1 mix-blend-multiply" />
              <div className="absolute w-2.5 h-6 bg-[#5856d6]/90 rounded-full rotate-[225deg] mix-blend-multiply" />
              <div className="absolute w-2.5 h-6 bg-[#af52de]/90 rounded-full rotate-[270deg] -translate-x-1 mix-blend-multiply" />
              <div className="absolute w-2.5 h-6 bg-[#ff2d55]/90 rounded-full rotate-[315deg] mix-blend-multiply" />
            </div>
          </div>
        );

      case 'health':
        return (
          <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-b from-[#1c1c1e] to-black">
            {/* 3 Activity concentric rings (Move = Pink/Red, Exercise = Green, Stand = Cyan) */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              {/* Outer Ring: Move Red */}
              <div className="absolute inset-0 rounded-full border-[2.5px] border-[#fa114f] shadow-[0_0_8px_rgba(250,17,79,0.6)]" />
              {/* Middle Ring: Exercise Green */}
              <div className="absolute inset-1.5 rounded-full border-[2.5px] border-[#a1ff00] shadow-[0_0_8px_rgba(161,255,0,0.6)]" />
              {/* Inner Ring: Stand Cyan */}
              <div className="absolute inset-3 rounded-full border-[2.5px] border-[#00f0ff] shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
            </div>
          </div>
        );

      case 'music':
        return (
          <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-b from-[#fa2d48] via-[#e61438] to-[#c9002b]">
            <Music className={`${s} text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]`} strokeWidth={2.4} />
          </div>
        );

      case 'files':
        return (
          <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-b from-[#0088ff] to-[#0055dd]">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <Folder className={`${s} text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.35)] fill-white/20`} strokeWidth={2.2} />
              <div className="absolute bottom-1 w-4 h-1 bg-white/40 rounded-full" />
            </div>
          </div>
        );

      case 'phone':
        return (
          <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-b from-[#34c759] via-[#30b753] to-[#248a3d]">
            <Phone className={`${s} text-white fill-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.35)]`} strokeWidth={2.2} />
          </div>
        );

      case 'safari':
        return (
          <div className="relative flex items-center justify-center w-full h-full bg-white">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#007aff] to-[#5ac8fa] relative flex items-center justify-center shadow-inner">
              {/* Compass Compass Rose needles */}
              <div className="absolute w-2 h-7 bg-white rounded-full rotate-45 clip-path-needle shadow-sm flex flex-col justify-between items-center py-0.5">
                <div className="w-1.5 h-3 bg-[#ff3b30] rounded-t-full" />
                <div className="w-1.5 h-3 bg-white rounded-b-full" />
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-white z-10 shadow-sm" />
            </div>
          </div>
        );

      case 'chat':
        return (
          <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-b from-[#34c759] to-[#28a745]">
            <MessageCircle className={`${s} text-white fill-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.35)]`} strokeWidth={2.2} />
          </div>
        );

      case 'camera':
        return (
          <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-b from-[#8e8e93] via-[#636366] to-[#48484a]">
            {/* Camera lens optic */}
            <div className="w-9 h-9 rounded-full bg-[#1c1c1e] border-2 border-white/30 flex items-center justify-center shadow-inner">
              <div className="w-5 h-5 rounded-full bg-[#007aff]/30 border border-cyan-400/40 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-black ring-1 ring-white/30" />
              </div>
              <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-amber-400/90 shadow-[0_0_4px_amber]" />
            </div>
          </div>
        );

      case 'mail':
        return (
          <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-b from-[#007aff] to-[#0051ba]">
            <Mail className={`${s} text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.35)] fill-white/10`} strokeWidth={2.2} />
          </div>
        );

      default:
        return <Zap className={`${s} text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]`} strokeWidth={2.2} />;
    }
  };

  // If WattWise flagship app icon: luxurious multi-layer glass & neon solar fusion
  if (iconType === 'image' && iconSrc) {
    return (
      <div 
        className={`relative ${sizeClasses[size]} overflow-hidden group-hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.6),0_2px_6px_rgba(0,0,0,0.4)] ring-1 ring-white/20`}
      >
        <img
          src={iconSrc}
          alt={name}
          className="w-full h-full object-cover transform scale-[1.02]"
        />
        {/* Apple iOS 18 Specular Glass Bevel Highlight */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/5 to-transparent pointer-events-none rounded-[inherit]" />
        {/* Subtle bottom dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
        {/* High-luster inner border rim */}
        <div className="absolute inset-0 rounded-[inherit] border border-white/25 pointer-events-none" />
      </div>
    );
  }

  // Base background style fallback if not custom rendered
  const hasCustomRenderer = Boolean(systemIconName);

  return (
    <div
      className={`relative ${sizeClasses[size]} overflow-hidden transition-all duration-300 group-hover:scale-105 active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.55),0_2px_6px_rgba(0,0,0,0.3)] ring-1 ring-white/20`}
    >
      {/* Background fill */}
      {hasCustomRenderer ? (
        renderCustomCupertinoIcon()
      ) : (
        <div
          className={`w-full h-full bg-gradient-to-b ${
            gradient || 'from-slate-700 via-slate-800 to-slate-950'
          } flex items-center justify-center`}
        >
          <span className="font-extrabold text-white text-lg font-sans drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            {name.charAt(0)}
          </span>
        </div>
      )}

      {/* iOS 18 Continuous Top Arc Sheen (Apple signature curved glass reflection) */}
      <div className="absolute -top-1/2 left-0 right-0 h-full bg-gradient-to-b from-white/25 via-white/5 to-transparent rounded-[100%] pointer-events-none" />

      {/* Chamfered inner rim border */}
      <div className="absolute inset-0 rounded-[inherit] border border-white/20 pointer-events-none" />
    </div>
  );
}
