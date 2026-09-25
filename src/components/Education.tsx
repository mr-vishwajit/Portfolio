import React from 'react';
import { Language } from '../types';
import { educationList } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin, BookOpen, AlertCircle, Building } from 'lucide-react';

interface EducationProps {
  language: Language;
}

export const Education: React.FC<EducationProps> = ({ language }) => {
  return (
    <section id="education" className="py-20 border-b border-slate-800/60 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
            <span>{language === 'en' ? '04. Academic & Professional Training' : '04. शैक्षणिक और व्यावसायिक प्रशिक्षण'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            {language === 'en' ? 'Education & Qualifications' : 'शिक्षा एवं योग्यताएं'}
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-300">
            {language === 'en'
              ? 'Foundational computer applications diploma, university degree coursework, and practical business tooling.'
              : 'कंप्यूटर ऍप्लिकेशन्स डिप्लोमा, विश्वविद्यालय डिग्री कोर्सवर्क और व्यावसायिक टूल्स का गहन अध्ययन।'}
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="space-y-8 mb-12">
          {educationList.map((edu, idx) => (
            <div
              key={edu.id}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-slate-700 transition-colors relative"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                
                {/* Left side: Program & Institution */}
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-950/60 border border-teal-500/40 flex items-center justify-center text-teal-400 shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {edu.degree[language]}
                      </h3>
                      <p className="text-sm font-medium text-teal-300 flex items-center gap-1.5 mt-0.5">
                        <Building className="w-3.5 h-3.5" />
                        <span>{edu.institution[language]}</span>
                      </p>
                    </div>
                  </div>

                  {/* Metadata: Location and Timeline */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-teal-400" />
                      <span>{edu.location[language]}</span>
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="flex items-center gap-1.5 text-amber-300 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{edu.timeline[language]}</span>
                    </span>
                  </div>

                  {/* Optional Timeline Note for BCA / Navgurukul */}
                  {edu.timelineNote && (
                    <p className="text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                      {edu.timelineNote[language]}
                    </p>
                  )}
                </div>

                {/* Right side: Detailed Subjects & Coursework */}
                <div className="lg:w-96 space-y-2">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                    <span>{language === 'en' ? 'Curriculum & Subjects Studied:' : 'अध्ययन किए गए विषय:'}</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {edu.subjects[language].map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded text-xs bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Date notation transparency disclaimer */}
        <div className="p-4 bg-slate-900/40 border border-slate-800/70 rounded-xl text-xs text-slate-400 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <span className="font-semibold text-amber-300">
              {language === 'en' ? 'Date Notation Transparency: ' : 'तिथि पारदर्शिता सूचना: '}
            </span>
            {language === 'en'
              ? 'Dates for BCA (IGNOU - 01/2026) and Navgurukul (05/2026) are presented explicitly as listed in the original resume without conjectural date adjustments.'
              : 'BCA (IGNOU - 01/2026) और नवगुरुकुल (05/2026) की तिथियां रेज़्यूमे में उल्लिखित अनुसार जस की तस प्रस्तुत की गई हैं।'}
          </p>
        </div>

      </div>
    </section>
  );
};
