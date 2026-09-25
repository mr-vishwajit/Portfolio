import React from 'react';
import { Language } from '../types';
import { personalInfo } from '../data/portfolioData';
import { Database, BarChart3, FileSpreadsheet, CheckCircle2, ShieldCheck, Clock, Lightbulb, Users } from 'lucide-react';

interface AboutProps {
  language: Language;
  personalInfoProp?: typeof personalInfo;
}

export const About: React.FC<AboutProps> = ({ language, personalInfoProp }) => {
  const info = personalInfoProp || personalInfo;
  const iconMap: Record<number, React.ElementType> = {
    0: Database,
    1: BarChart3,
    2: FileSpreadsheet,
    3: CheckCircle2,
  };

  const attributes = [
    {
      icon: Clock,
      title: language === 'en' ? 'Time Management' : 'समय प्रबंधन',
      desc: language === 'en' 
        ? 'Delivering accurate analytical queries and reports within scheduled timelines.'
        : 'तय समय सीमा के भीतर सटीक विश्लेषणात्मक क्वेरी और रिपोर्ट तैयार करना।'
    },
    {
      icon: Lightbulb,
      title: language === 'en' ? 'Analytical Thinking' : 'विश्लेषणात्मक सोच',
      desc: language === 'en'
        ? 'Deconstructing messy datasets into logical entities, filters, and actionable aggregations.'
        : 'जटिल और असंगठित डेटा को तार्किक संस्थाओं, फ़िल्टरों और उपयोगी निष्कर्षों में तोड़ना।'
    },
    {
      icon: Users,
      title: language === 'en' ? 'Collaborative Teamwork' : 'सक्रिय टीम सहयोग',
      desc: language === 'en'
        ? 'Working smoothly alongside operational, educational, and business stakeholders.'
        : 'ऑपरेशनल और व्यावसायिक हितधारकों के साथ सामंजस्य बनाकर कार्य करना।'
    },
    {
      icon: ShieldCheck,
      title: language === 'en' ? 'Data Quality Discipline' : 'डेटा गुणवत्ता अनुशासन',
      desc: language === 'en'
        ? 'Rigorous verification of records, preventing duplicate entries and null discrepancies.'
        : 'रिकॉर्ड्स का कठोर सत्यापन, डुप्लीकेट प्रविष्टियों और त्रुटियों को रोकना।'
    }
  ];

  return (
    <section id="about" className="py-20 border-b border-slate-800/60 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
            <span>{language === 'en' ? 'Professional Profile' : 'व्यावसायिक परिचय'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            {language === 'en' ? 'About Me & Analytical Focus' : 'मेरे बारे में और विश्लेषणात्मक फोकस'}
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-300">
            {language === 'en'
              ? 'Translating operational records, raw CSVs, and relational tables into clear, trustworthy business decisions.'
              : 'परिचालन रिकॉर्ड और रिलेशनल तालिकाओं को स्पष्ट और भरोसेमंद व्यावसायिक निर्णयों में बदलना।'}
          </p>
        </div>

        {/* Two-Column Grid: Summary Narrative & Core Technical Focus Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Summary & Principles */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 bg-slate-900/70 border border-slate-800 rounded-xl space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-teal-400 rounded-sm" />
                <span>{language === 'en' ? 'Executive Summary' : 'संक्षिप्त सारांश'}</span>
              </h3>
              
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {info.summary[language] || info.summary.en}
              </p>

              <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400 space-y-2">
                <p className="font-medium text-slate-300">
                  {language === 'en' ? 'Core Working Tenets:' : 'कार्य करने के मूल सिद्धांत:'}
                </p>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{language === 'en' ? 'Strict Schema Integrity' : 'सख्त डेटा स्कीमा सत्यापन'}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{language === 'en' ? 'Reproducible Query Logic' : 'पुनरुत्पादनीय SQL लॉजिक'}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{language === 'en' ? 'Clutter-Free Visuals' : 'स्पष्ट और सरल विज़ुअल्स'}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{language === 'en' ? 'Timely Decision Support' : 'समय पर सटीक इनसाइट्स'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Candidate Soft Skills and Work Ethics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {attributes.map((attr, idx) => {
                const AttrIcon = attr.icon;
                return (
                  <div 
                    key={idx} 
                    className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-lg space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-teal-400">
                      <AttrIcon className="w-4 h-4" />
                      <h4 className="text-sm font-semibold text-white">{attr.title}</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {attr.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: 4 Core Pillars grounded in Resume */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-base font-semibold text-slate-200 mb-2">
              {language === 'en' ? 'Analytical Competencies' : 'विश्लेषणात्मक क्षमताएं'}
            </h3>

            {personalInfo.coreFocus.map((focus, idx) => {
              const FocusIcon = iconMap[idx] || CheckCircle2;
              return (
                <div 
                  key={idx}
                  className="p-5 bg-slate-900/80 border border-slate-800/90 rounded-xl hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-teal-950/70 border border-teal-500/30 flex items-center justify-center shrink-0 text-teal-400">
                      <FocusIcon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-semibold text-white">
                        {focus.title[language]}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {focus.description[language]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Location & Relocation / Remote Availability note */}
            <div className="p-4 bg-slate-900/30 border border-slate-800/60 rounded-lg text-xs text-slate-400 flex items-center justify-between">
              <span>
                {language === 'en'
                  ? 'Based in Kushinagar, Uttar Pradesh · Open to on-site, hybrid, and remote roles.'
                  : 'कुशीनगर, उत्तर प्रदेश में स्थित · ऑन-साइट, हाइब्रिड और रिमोट अवसरों के लिए उपलब्ध।'}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
