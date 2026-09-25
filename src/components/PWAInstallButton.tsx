import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../types';
import { Download, Smartphone, Apple, CheckCircle2, X, Sparkles, ArrowRight } from 'lucide-react';

interface PWAInstallButtonProps {
  language: Language;
  variant?: 'navbar' | 'hero' | 'drawer' | 'compact';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  language,
  variant = 'navbar'
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // If already running in standalone app mode
  if (isInstalled) {
    if (variant === 'drawer') {
      return (
        <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{language === 'en' ? 'App Installed & Active' : 'ऐप इंस्टॉल और सक्रिय है'}</span>
        </div>
      );
    }
    return null;
  }

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }
    if (isInstallable) {
      setIsInstalling(true);
      await install();
      setIsInstalling(false);
    } else {
      // If browser doesn't trigger prompt yet (e.g. standard Chrome before delay or desktop), show instructions
      setShowIOSGuide(true);
    }
  };

  return (
    <>
      {/* Button Render according to variant */}
      {variant === 'navbar' && (
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 rounded-lg transition-all shadow-md shadow-teal-500/20 whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          title={language === 'en' ? 'Install Portfolio App' : 'पोर्टफोलियो ऐप इंस्टॉल करें'}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Install App' : 'ऐप इंस्टॉल'}</span>
        </button>
      )}

      {variant === 'hero' && (
        <button
          onClick={handleInstallClick}
          className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-300 text-slate-950 font-bold text-xs sm:text-sm hover:opacity-95 transition-all shadow-lg shadow-teal-500/25 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <Smartphone className="w-4 h-4 shrink-0" />
          <span>{language === 'en' ? 'Install Mobile / Desktop App' : 'मोबाइल / डेस्कटॉप ऐप इंस्टॉल करें'}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950/20 font-mono font-semibold">PWA</span>
        </button>
      )}

      {variant === 'drawer' && (
        <button
          onClick={handleInstallClick}
          className="w-full py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-teal-500/20"
        >
          <Smartphone className="w-4 h-4" />
          <span>{language === 'en' ? 'Install App on Phone / PC' : 'फ़ोन / कंप्यूटर में ऐप इंस्टॉल करें'}</span>
        </button>
      )}

      {variant === 'compact' && (
        <button
          onClick={handleInstallClick}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-950/80 border border-teal-500/40 text-teal-300 hover:text-white hover:bg-teal-900 text-xs font-semibold transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-teal-400" />
          <span>{language === 'en' ? 'Install App' : 'ऐप जोड़ें'}</span>
        </button>
      )}

      {/* iOS / General Installation Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="w-full max-w-md rounded-2xl bg-slate-900 border-2 border-teal-500/40 p-5 sm:p-6 shadow-2xl shadow-teal-950/50 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-500/40 flex items-center justify-center text-teal-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {language === 'en' ? 'Install Vishwajit App' : 'विश्वजीत पोर्टफोलियो ऐप इंस्टॉल करें'}
                  </h3>
                  <span className="text-[11px] text-teal-400 font-mono">
                    {isIOS ? 'iPhone / iPad (Safari)' : 'Android / Chrome / Edge'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Instruction Steps */}
            {isIOS ? (
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <p className="text-slate-400 text-xs leading-relaxed">
                  {language === 'en'
                    ? 'Follow these 2 simple steps to install the app on your Apple home screen with fast offline access:'
                    : 'अपने iPhone या iPad में ऐप को होम स्क्रीन पर जोड़ने के लिए नीचे दिए गए 2 आसान स्टेप्स फॉलो करें:'}
                </p>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <div>
                      <p className="font-semibold text-white">
                        {language === 'en' ? 'Tap the "Share" icon' : 'Safari टूलबार में "Share" (📤) बटन दबाएं'}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {language === 'en' ? 'Located at the bottom of Safari browser toolbar.' : 'यह सफ़ारी ब्राउज़र के नीचे टूलबार में होता है।'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 pt-1.5 border-t border-slate-800/80">
                    <span className="w-5 h-5 rounded-full bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <div>
                      <p className="font-semibold text-white">
                        {language === 'en' ? 'Select "Add to Home Screen"' : '"Add to Home Screen" (➕) चुनें'}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {language === 'en' ? 'Scroll down the options list and tap "Add".' : 'लिस्ट में नीचे स्क्रॉल करके "Add" पर टैप करें।'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <p className="text-slate-400 text-xs leading-relaxed">
                  {language === 'en'
                    ? 'To install this application on your Android, Windows, or Mac device:'
                    : 'इस एप्लिकेशन को अपने Android, Windows, या Mac में इंस्टॉल करने के लिए:'}
                </p>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
                    <span className="font-semibold text-white">
                      {language === 'en' ? '1-Click Desktop & Android App' : '1-क्लिक डेस्कटॉप व मोबाइल ऐप'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {language === 'en'
                      ? 'Tap "Install" in your browser address bar (or browser menu ⋮ -> Install app / Add to Home Screen).'
                      : 'ब्राउज़र एड्रेस बार में "Install" आइकॉन दबाएं या मेनू ⋮ में "Install App" / "Add to Home Screen" चुनें।'}
                  </p>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 px-4 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                {language === 'en' ? 'Got it!' : 'समझ गया!'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
