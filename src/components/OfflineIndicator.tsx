import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';
import { Language } from '../types';

interface OfflineIndicatorProps {
  language: Language;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ language }) => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl bg-amber-500/95 backdrop-blur-md px-3.5 py-2 text-xs font-semibold text-slate-950 shadow-xl border border-amber-300 animate-in slide-in-from-bottom-4 duration-300">
      <WifiOff className="w-4 h-4 text-slate-950 animate-pulse" />
      <span>
        {language === 'en'
          ? 'Offline Mode — Cached portfolio data is active'
          : 'ऑफ़लाइन मोड — कैश्ड डेटा सुरक्षित व सक्रिय है'}
      </span>
    </div>
  );
};
