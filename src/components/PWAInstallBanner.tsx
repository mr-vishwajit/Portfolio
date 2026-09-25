import React, { useState, useEffect } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../types';
import { Smartphone, Download, X, Sparkles } from 'lucide-react';
import iconSvg from '../../public/icon.svg';

interface PWAInstallBannerProps {
  language: Language;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({ language }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    return sessionStorage.getItem('vishwajit_pwa_banner_dismissed') === 'true';
  });
  const [showIOSModal, setShowIOSModal] = useState(false);

  if (isInstalled || isDismissed) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('vishwajit_pwa_banner_dismissed', 'true');
  };

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }
    if (isInstallable) {
      await install();
    } else {
      setShowIOSModal(true);
    }
  };

  return (
    <>
      <aside aria-label="Install Vishwajit Portfolio App" className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-slate-900/95 backdrop-blur-md border-2 border-teal-500/50 rounded-2xl p-3.5 shadow-2xl shadow-teal-950/60 animate-in slide-in-from-bottom-5 duration-300">
        <div className="flex items-center gap-3">
          
          {/* App Icon */}
          <div className="w-11 h-11 rounded-xl bg-slate-950 border border-teal-500/40 p-1 flex items-center justify-center shrink-0 shadow-inner">
            <img src="/pwa-192x192.png" alt="App Icon" className="w-full h-full object-cover rounded-lg" onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }} />
            <Smartphone className="w-5 h-5 text-teal-400" />
          </div>

          {/* Text details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs text-white truncate">Vishwajit Portfolio</span>
              <span className="px-1.5 py-0.2 rounded bg-teal-950 text-teal-400 border border-teal-500/30 text-[9px] font-mono font-bold">
                APP
              </span>
            </div>
            <p className="text-[11px] text-slate-300 line-clamp-1">
              {language === 'en'
                ? 'Fast offline access & home screen app'
                : 'तेज़ ऑफ़लाइन पहुंच व होम स्क्रीन ऐप'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              {language === 'en' ? 'Install' : 'इंस्टॉल'}
            </button>
            <button
              onClick={handleDismiss}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </aside>

      {/* iOS Modal if opened from banner */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border-2 border-teal-500/40 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">
                {language === 'en' ? 'Add to Home Screen' : 'होम स्क्रीन में जोड़ें'}
              </h3>
              <button
                onClick={() => setShowIOSModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'en'
                ? 'Tap Share (📤) in Safari -> Select "Add to Home Screen" to install.'
                : 'Safari में Share (📤) दबाएं -> "Add to Home Screen" चुनकर इंस्टॉल करें।'}
            </p>
            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs rounded-xl"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};
