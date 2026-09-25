import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { 
  FileText, 
  Menu, 
  X, 
  Globe, 
  FolderGit2, 
  Sparkles, 
  Briefcase, 
  Mail, 
  Check,
  Smartphone
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  onOpenResumeModal: () => void;
  onOpenAdminModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  onOpenResumeModal,
  onOpenAdminModal
}) => {
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [keyError, setKeyError] = useState('');
  const [isKeySuccess, setIsKeySuccess] = useState(false);

  // Lock body scroll when 3-line popup is open so homepage doesn't scroll
  useEffect(() => {
    if (menuDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuDrawerOpen]);

  // 4 clean navigation items with icons for the stacked vertical list
  const navLinks = [
    { href: '#projects', label: language === 'en' ? 'Projects' : 'प्रोजेक्ट्स', icon: FolderGit2 },
    { href: '#skills', label: language === 'en' ? 'Skills' : 'कौशल', icon: Sparkles },
    { href: '#experience', label: language === 'en' ? 'Experience & Education' : 'अनुभव व शिक्षा', icon: Briefcase },
    { href: '#contact', label: language === 'en' ? 'Contact' : 'संपर्क', icon: Mail },
  ];

  const handleNavClick = (href: string) => {
    setMenuDrawerOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyInput.trim() === 'Ravi@123') {
      setIsKeySuccess(true);
      setKeyError('');
      sessionStorage.setItem('vishwajit_admin_auth', 'true');
      setTimeout(() => {
        setIsKeySuccess(false);
        setKeyInput('');
        setMenuDrawerOpen(false);
        onOpenAdminModal();
      }, 400);
    } else {
      setKeyError(language === 'en' ? 'Incorrect key!' : 'गलत कुंजी!');
    }
  };

  const isSessionAdmin = typeof window !== 'undefined' && sessionStorage.getItem('vishwajit_admin_auth') === 'true';

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Zone 1: Single text element wordmark */}
          <a 
            href="#home" 
            className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2 group hover:text-teal-400 transition-colors shrink-0"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 group-hover:scale-125 transition-transform" />
            <span className="font-extrabold tracking-tight">Vishwajit</span>
            <span className="text-teal-400 font-mono text-xs hidden sm:inline px-2 py-0.5 rounded bg-teal-950/60 border border-teal-500/30">
              {language === 'en' ? 'Fresher Data Analyst' : 'डेटा एनालिस्ट (फ़्रेशर)'}
            </span>
          </a>

          {/* Zone 2: 4 clean, focused text navigation links on desktop */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-teal-400 transition-colors whitespace-nowrap py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-400 hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary actions (Install App CTA, Language toggle, Resume CTA, 3-Line Menu Toggle) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Direct PWA Install App Button */}
            <div className="hidden xs:block">
              <PWAInstallButton language={language} variant="navbar" />
            </div>

            {/* Language Toggle */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 min-h-[38px] text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors whitespace-nowrap cursor-pointer"
              aria-label="Toggle Language Hindi English"
            >
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-semibold">{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Resume Modal trigger CTA */}
            <button
              onClick={onOpenResumeModal}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 min-h-[38px] text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors shadow-sm whitespace-nowrap cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Resume' : 'रेज़्यूमे'}</span>
            </button>

            {/* 3-Line Menu Button with distinct active color and clear close feedback */}
            <button
              onClick={() => {
                setMenuDrawerOpen(!menuDrawerOpen);
                setKeyError('');
              }}
              className={`px-3 py-1.5 min-h-[38px] flex items-center justify-center gap-1.5 rounded-lg transition-all cursor-pointer shadow-md ${
                menuDrawerOpen
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold border-2 border-amber-300 shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700'
              }`}
              aria-label={menuDrawerOpen ? 'Close Menu' : 'Open 3-Line Menu'}
              title={menuDrawerOpen ? (language === 'en' ? 'Close Menu' : 'मेनू बंद करें') : (language === 'en' ? 'Menu (3-Line)' : 'मेनू (3-लाइन)')}
            >
              {menuDrawerOpen ? (
                <>
                  <X className="w-4 h-4 stroke-[2.5]" />
                  <span className="text-xs font-bold">{language === 'en' ? 'Close' : 'बंद करें'}</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4" />
                  <span className="text-xs font-semibold">{language === 'en' ? 'Menu' : 'मेनू'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full Backdrop Overlay that locks background interactions & prevents homepage scroll */}
      {menuDrawerOpen && (
        <div 
          className="fixed inset-0 top-16 z-40 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-in fade-in"
          onClick={() => setMenuDrawerOpen(false)}
        >
          {/* Distinct Floating Popup Menu Container */}
          <div 
            className="max-w-xl mx-auto m-3 sm:m-6 bg-slate-900 border-2 border-teal-500/40 rounded-2xl shadow-2xl shadow-teal-950/50 p-4 sm:p-6 space-y-4 animate-in zoom-in-95 duration-150 overflow-y-auto max-h-[calc(100vh-6rem)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Header of the 3-Line Popup */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-xs font-bold text-teal-300 uppercase tracking-wider font-mono">
                  {language === 'en' ? '3-Line Menu Active' : '3-लाइन मेनू सक्रिय'}
                </span>
              </div>
              
              <button
                onClick={() => setMenuDrawerOpen(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{language === 'en' ? 'Close' : 'बंद करें'}</span>
              </button>
            </div>

            {/* Install App CTA inside 3-Line menu */}
            <div>
              <PWAInstallButton language={language} variant="drawer" />
            </div>

            {/* Vertical Stacked Navigation Options (ऊपर-नीचे) */}
            <div className="space-y-2">
              <div className="px-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {language === 'en' ? 'Navigation Options' : 'नेविगेशन विकल्प'}
              </div>
              
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="w-full text-left py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-slate-950 hover:bg-slate-800/90 border border-slate-800 hover:border-teal-500/50 transition-all flex items-center justify-between group cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400 group-hover:border-teal-500/40 shrink-0 transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span>{link.label}</span>
                      </div>
                      <span className="text-slate-500 group-hover:text-teal-400 text-sm transition-colors font-bold">→</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Resume CTA inside 3-Line popup */}
            <div className="pt-1">
              <button
                onClick={() => {
                  setMenuDrawerOpen(false);
                  onOpenResumeModal();
                }}
                className="w-full py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-semibold text-teal-300 bg-teal-950/60 border border-teal-800/80 hover:bg-teal-900/70 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <FileText className="w-4 h-4 text-teal-400" />
                <span>{language === 'en' ? 'View & Download Resume' : 'रेज़्यूमे देखें व डाउनलोड करें'}</span>
              </button>
            </div>

            {/* VERY BOTTOM: Discreet Key input */}
            <div className="pt-3 border-t border-slate-800/80">
              {isSessionAdmin ? (
                <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{language === 'en' ? 'Session Active' : 'सत्र सक्रिय'}</span>
                  </span>
                  <button
                    onClick={() => {
                      setMenuDrawerOpen(false);
                      onOpenAdminModal();
                    }}
                    className="px-3.5 py-1.5 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    {language === 'en' ? 'Open Customizer' : 'कस्टमाइज़र खोलें'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleKeySubmit} className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="password"
                        value={keyInput}
                        onChange={(e) => {
                          setKeyInput(e.target.value);
                          setKeyError('');
                        }}
                        placeholder="Enter key"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:border-teal-400 focus:outline-none font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer border border-slate-700 shrink-0"
                    >
                      <span>{isKeySuccess ? '✓' : (language === 'en' ? 'Enter' : 'दर्ज')}</span>
                    </button>
                  </div>

                  {keyError && (
                    <p className="text-[11px] text-rose-400">
                      {keyError}
                    </p>
                  )}
                </form>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
