import React from 'react';
import { Language } from '../types';
import { workExperience } from '../data/portfolioData';
import { Building2, Landmark, MapPin, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

interface ExperienceProps {
  language: Language;
}

export const Experience: React.FC<ExperienceProps> = ({ language }) => {
  const iconMap: Record<string, React.ElementType> = {
    'exp-school': Building2,
    'exp-bank': Landmark,
  };

  return (
    <section id="experience" className="py-20 border-b border-slate-800/60 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
            <span>{language === 'en' ? '03. Operational Experience' : '03. कार्य अनुभव'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            {language === 'en' ? 'Operational & Office Experience' : 'कार्यालय और परिचालन अनुभव'}
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-300">
            {language === 'en'
              ? 'Real-world data entry, record maintenance, portal management, and customer banking facilitation.'
              : 'डेटा प्रविष्टि, रिकॉर्ड रखरखाव, पोर्टल प्रबंधन और ग्राहक बैंकिंग सहायता का व्यावहारिक अनुभव।'}
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {workExperience.map((exp) => {
            const ExpIcon = iconMap[exp.id] || Building2;
            return (
              <div
                key={exp.id}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div className="space-y-6">
                  
                  {/* Top Bar with Icon & Organization */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 shrink-0">
                        <ExpIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                          {exp.organization[language]}
                        </h3>
                        <p className="text-sm font-medium text-teal-300">
                          {exp.role[language]}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Metadata: Location and Date */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400 py-2 border-y border-slate-800/80">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-teal-400" />
                      <span>{exp.location[language]}</span>
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="flex items-center gap-1.5 text-teal-300 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-teal-400" />
                      <span>{exp.period[language]}</span>
                    </span>
                  </div>

                  {/* Tasks strictly from resume */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                      {language === 'en' ? 'Core Operational Tasks:' : 'मुख्य कार्य व जिम्मेदारियां:'}
                    </span>
                    <ul className="space-y-2.5">
                      {exp.tasks[language].map((task, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Footer Note regarding strict fidelity */}
                <div className="mt-8 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 italic">
                  {exp.notes?.[language]}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
