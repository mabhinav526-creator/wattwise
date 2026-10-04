export type ScreenId =
  | 'welcome'
  | 'home'
  | 'insights'
  | 'automation'
  | 'recommendations'
  | 'devices'
  | 'appliance-detail'
  | 'impact'
  | 'notifications'
  | 'profile'
  | 'live-monitoring';

export type TimeRange = 'day' | 'week' | 'month' | 'year';

export interface HourlyPoint {
  hour: string;
  kw: number;
  highlight?: boolean;
}

export interface Appliance {
  id: string;
  name: string;
  category: 'climate' | 'kitchen' | 'lighting' | 'laundry' | 'utility' | 'entertainment' | 'mobility';
  powerKw: number; // active wattage in kW
  nominalKw: number; // peak wattage when on
  todayKwh: number;
  percentage: number;
  status: 'on' | 'off';
  room: string;
  hourlyUsage: HourlyPoint[];
  // Specific device settings
  temperature?: number;
  ecoMode?: boolean;
  fanSpeed?: 'Low' | 'Med' | 'High' | 'Auto';
  mode?: 'Cool' | 'Heat' | 'Fan' | 'Dry';
}

export interface AutomationRule {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  iconName: string;
  tag: string;
  impactKwhEstimate: number;
  impactRupeesEstimate: number;
}

export interface EnergyRecommendation {
  id: string;
  title: string;
  description: string;
  potentialSavingsRupees: number;
  potentialSavingsPercent: number;
  category: 'smart' | 'standby' | 'schedule' | 'efficiency';
  applied: boolean;
  impactTag: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  type: 'alert' | 'success' | 'tip' | 'recommendation';
  read: boolean;
}

export interface LiveTelemetry {
  voltage: number; // e.g. 230 V
  current: number; // e.g. 7.8 A
  frequency: number; // e.g. 50.0 Hz
  temperature: number; // e.g. 32 °C
  powerFactor: number;
  gridStatus: 'normal' | 'peak' | 'off-peak';
}
