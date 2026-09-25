import React from 'react';
import { Language } from '../types';
import { personalInfo } from '../data/portfolioData';
import { Mail, Phone, Linkedin, ArrowUp, Database } from 'lucide-react';

interface FooterProps {
  language: Language;
  onOpenGuideModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenGuideModal }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span className="text-base font-bold text-white tracking-tight">
                {personalInfo.name}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-teal-400 font-mono text-xs">
                {personalInfo.title[language]}
              </span>
            </div>
            <p className="text-slate-400 max-w-md text-xs sm:text-sm">
              {language === 'en'
                ? 'Fresher Data Analyst specializing in SQL, Power BI, Excel, and Google Sheets for business intelligence and actionable analytics.'
                : 'SQL, Power BI, Excel और Google Sheets में कुशल फ़्रेशर डेटा एनालिस्ट — डेटा-संचालित व्यावसायिक निर्णयों हेतु उपलब्ध।'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-teal-300 transition-colors"
              title="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-blue-300 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
              title={language === 'en' ? 'Back to top' : 'शीर्ष पर जाएं'}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {currentYear} {personalInfo.name}. </span>
            <span>
              {language === 'en'
                ? 'Fresher Data Analyst Portfolio.'
                : 'फ़्रेशर डेटा एनालिस्ट पोर्टफोलियो।'}
            </span>
            {onOpenGuideModal && (
              <>
                <span>·</span>
                <button
                  onClick={onOpenGuideModal}
                  className="text-slate-500 hover:text-slate-400 transition-colors underline cursor-pointer"
                >
                  {language === 'en' ? 'Checklist Guide' : 'चेकलिस्ट गाइड'}
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <span>{personalInfo.location[language]}</span>
            <span>·</span>
            <span>{personalInfo.phone}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
