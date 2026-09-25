import React, { useState } from 'react';
import { Language } from '../types';
import { skillCategories } from '../data/portfolioData';
import { 
  Database, 
  BarChart3, 
  Code2, 
  Briefcase, 
  HeartHandshake, 
  Star, 
  CheckCircle2,
  Filter
} from 'lucide-react';

interface SkillsProps {
  language: Language;
}

export const Skills: React.FC<SkillsProps> = ({ language }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const categoryIcons: Record<number, React.ElementType> = {
    0: Database,
    1: BarChart3,
    2: Code2,
    3: Briefcase,
    4: HeartHandshake,
  };

  const coreTools = [
    { name: 'SQL', desc: language === 'en' ? 'Relational querying, aggregations, conditional filtering' : 'रिलेशनल क्वेरी, एग्रीगेशन और कंडीशनल फ़िल्टरिंग' },
    { name: 'Power BI', desc: language === 'en' ? 'Interactive reporting, KPI cards, visual dashboards' : 'इंटरैक्टिव रिपोर्टिंग, KPI कार्ड्स और विज़ुअल डैशबोर्ड' },
    { name: 'Microsoft Excel', desc: language === 'en' ? 'Formulas, Pivot Tables, summary modeling, lookups' : 'फ़ॉर्मूले, पिवट टेबल, समरी मॉडलिंग और लुकअप्स' },
    { name: 'Google Sheets', desc: language === 'en' ? 'Advanced collaborative spreadsheets, data cleaning' : 'उन्नत सहयोगी स्प्रेडशीट और डेटा क्लीनिंग' },
  ];

  return (
    <section id="skills" className="py-20 border-b border-slate-800/60 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
            <span>{language === 'en' ? '02. Technical & Soft Skills' : '02. तकनीकी और सॉफ्ट स्किल्स'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {language === 'en' ? 'Core Capabilities & Tooling' : 'कौशल और तकनीकी क्षमताएं'}
          </h2>
          <p className="mt-3 text-base text-slate-400">
            {language === 'en'
              ? 'Organized strictly according to resume specifications without fabricated proficiency percentages.'
              : 'बिना किसी मनगढ़ंत प्रतिशत के, सीधे रेज़्यूमे के अनुसार व्यवस्थित कौशल।'}
          </p>
        </div>

        {/* Featured Core Tools Spotlight Bar */}
        <div className="mb-12 p-6 bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-900/60 border border-teal-500/30 rounded-2xl">
          <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-teal-300">
            <Star className="w-4 h-4 text-teal-400 fill-teal-400" />
            <span>{language === 'en' ? 'Primary Focus Technologies' : 'प्रमुख फोकस टूल्स'}</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreTools.map((tool) => (
              <div 
                key={tool.name}
                className="p-4 bg-slate-950/80 border border-teal-500/20 rounded-xl space-y-1 hover:border-teal-500/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-base">{tool.name}</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-teal-950 border border-teal-500/40 text-teal-300">
                    {language === 'en' ? 'Core' : 'मुख्य'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-snug">
                  {tool.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter Controls with compact single-line tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none max-w-full">
          {[
            { id: 'all', label: language === 'en' ? 'All Skills' : 'सभी कौशल' },
            { id: '0', label: language === 'en' ? 'Data & BI' : 'डेटा व BI' },
            { id: '1', label: language === 'en' ? 'Spreadsheets' : 'स्प्रेडशीट्स' },
            { id: '2', label: language === 'en' ? 'Tech & Systems' : 'तकनीकी' },
            { id: '3', label: language === 'en' ? 'Productivity & Office' : 'प्रोडक्टिविटी' },
            { id: '4', label: language === 'en' ? 'Analytical & Soft Skills' : 'सॉफ्ट स्किल्स' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-teal-400 text-slate-950 font-semibold shadow-xs'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories
            .filter((_, idx) => selectedFilter === 'all' || selectedFilter === String(idx))
            .map((cat, idx) => {
              const CategoryIcon = categoryIcons[idx] || CheckCircle2;
              return (
                <div 
                  key={idx}
                  className="p-6 bg-slate-900/60 border border-slate-800/80 rounded-xl hover:border-slate-700/80 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                        <CategoryIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white">
                          {cat.name[language]}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {cat.description[language]}
                        </p>
                      </div>
                    </div>

                    {/* Skill items unboxed list with clean visual separation */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                            skill.isPrimary
                              ? 'bg-slate-900 text-teal-300 border-teal-500/40 shadow-xs'
                              : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {skill.isPrimary ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0" />
                          )}
                          <span>{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-800/60 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>{cat.skills.length} {language === 'en' ? 'competencies' : 'कौशल सूचीबद्ध'}</span>
                    <span className="italic">{language === 'en' ? 'As stated in resume' : 'रेज़्यूमे अनुसार'}</span>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Note on Skill Proficiency */}
        <div className="mt-8 p-4 bg-slate-900/40 border border-slate-800/60 rounded-xl text-xs text-slate-400 flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-300">
              {language === 'en' ? 'Authenticity Disclosure: ' : 'सत्यनिष्ठा प्रकटीकरण: '}
            </span>
            <span>
              {language === 'en'
                ? 'Proficiency percentage bars and numerical mastery levels are intentionally omitted because they were not verified in the original resume. Skills reflect verified coursework and operational tool usage.'
                : 'प्रवीणता प्रतिशत बार और कृत्रिम स्तर जानबूझकर शामिल नहीं किए गए हैं क्योंकि वे मूल रेज़्यूमे में नहीं थे। कौशल केवल प्रामाणिक अध्ययन और टूल्स पर आधारित हैं।'}
            </span>
          </div>
        </div>

        {/* Applied Analytical Toolkit Showcase */}
        <div className="mt-12 p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <h4 className="text-sm sm:text-base font-bold text-white">
                {language === 'en' ? 'Applied Functions & Analytical Operations Toolkit' : 'व्यावहारिक टूल्स व फ़ॉर्मूला टूलकिट'}
              </h4>
            </div>
            <span className="text-[11px] font-mono text-teal-400">
              {language === 'en' ? 'Production-Ready Syntax' : 'प्रोडक्शन-रेडी सिंटैक्स'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/90 space-y-2">
              <span className="font-bold text-teal-300 font-mono block">SQL Relational Mastery</span>
              <ul className="space-y-1 text-slate-300 text-[11px]">
                <li className="flex items-center gap-1.5"><span className="text-teal-400">▸</span> Multi-Table JOINs (INNER, LEFT, FULL)</li>
                <li className="flex items-center gap-1.5"><span className="text-teal-400">▸</span> CTEs (`WITH` clauses) & Subqueries</li>
                <li className="flex items-center gap-1.5"><span className="text-teal-400">▸</span> Window Functions (`LAG()`, `ROW_NUMBER()`, `RANK()`)</li>
                <li className="flex items-center gap-1.5"><span className="text-teal-400">▸</span> Conditional Aggregations (`CASE WHEN`, `HAVING`)</li>
              </ul>
            </div>

            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/90 space-y-2">
              <span className="font-bold text-teal-300 font-mono block">Power BI & DAX Modeling</span>
              <ul className="space-y-1 text-slate-300 text-[11px]">
                <li className="flex items-center gap-1.5"><span className="text-teal-400">▸</span> Star-Schema Fact & Dimension Modeling</li>
                <li className="flex items-center gap-1.5"><span className="text-teal-400">▸</span> DAX Measures (`CALCULATE`, `SUMX`, `DIVIDE`, `DATEADD`)</li>
                <li className="flex items-center gap-1.5"><span className="text-teal-400">▸</span> Interactive Slicers & Custom KPI Tooltips</li>
                <li className="flex items-center gap-1.5"><span className="text-teal-400">▸</span> Power Query Data Transformation & Cleansing</li>
              </ul>
            </div>

            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/90 space-y-2">
              <span className="font-bold text-teal-300 font-mono block">Excel & Advanced Sheets</span>
              <ul className="space-y-1 text-slate-300 text-[11px]">
                <li className="flex items-center gap-1.5"><span className="text-teal-400">▸</span> Advanced Lookups (`XLOOKUP`, `INDEX-MATCH`)</li>
                <li className="flex items-center gap-1.5"><span className="text-teal-400">▸</span> Dynamic Pivot Tables & Cohort Slicers</li>
                <li className="flex items-center gap-1.5"><span className="text-teal-400">▸</span> Data Validation, Duplicates & Null Remediation</li>
                <li className="flex items-center gap-1.5"><span className="text-teal-400">▸</span> Conditional Formatting & Reorder Alert Rules</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
