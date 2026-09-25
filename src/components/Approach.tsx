import React from 'react';
import { Language } from '../types';
import { workflowSteps } from '../data/portfolioData';
import { HelpCircle, Filter, BarChart3, Presentation, ArrowRight } from 'lucide-react';

interface ApproachProps {
  language: Language;
}

export const Approach: React.FC<ApproachProps> = ({ language }) => {
  const stepIcons = [HelpCircle, Filter, BarChart3, Presentation];

  return (
    <section id="approach" className="py-20 border-b border-slate-800/60 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
            <span>{language === 'en' ? '05. Analytical Framework' : '05. कार्यप्रणाली'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            {language === 'en' ? 'Data Analyst Approach: How I Work' : 'डेटा एनालिस्ट दृष्टिकोण: मैं कैसे काम करता हूँ'}
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-300">
            {language === 'en'
              ? 'A disciplined four-step analytical framework focused on accuracy, schema integrity, and clear decision support.'
              : 'सटीकता, डेटा शुद्धता और ठोस व्यावसायिक निर्णयों के लिए एक अनुशासित चार-चरणीय कार्यप्रणाली।'}
          </p>
        </div>

        {/* 4-Step Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {workflowSteps.map((step, idx) => {
            const StepIcon = stepIcons[idx] || HelpCircle;
            return (
              <div
                key={step.step}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all group"
              >
                <div className="space-y-4">
                  {/* Step Header with Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-mono text-teal-400 group-hover:scale-110 transition-transform">
                      {step.step}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-teal-300">
                      <StepIcon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 leading-snug">
                      {step.title[language]}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {step.description[language]}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <span className="text-[10px] uppercase font-mono text-teal-400 block mb-1">
                    {language === 'en' ? 'Key Deliverable:' : 'मुख्य आउटपुट:'}
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    {step.deliverables[language]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
