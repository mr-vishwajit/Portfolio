import React, { useState } from 'react';
import { Language } from '../types';
import { personalInfo, workExperience, educationList, skillCategories } from '../data/portfolioData';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  AlertCircle, 
  MapPin, 
  Mail, 
  Phone, 
  Linkedin, 
  FileText 
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  photoUrl?: string;
  personalInfoProp?: typeof personalInfo;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ 
  isOpen, 
  onClose, 
  language,
  photoUrl,
  personalInfoProp
}) => {
  const [copied, setCopied] = useState(false);
  const info = personalInfoProp || personalInfo;
  const currentPhoto = photoUrl || '/profile.png';

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
${info.name.toUpperCase()}
${info.title.en}
Email: ${info.email} | Phone: ${info.phone}
Location: ${info.location.en}
LinkedIn: ${info.linkedinUrl}
GitHub: https://github.com/vishwajit-data

PROFESSIONAL SUMMARY
${info.summary.en}

FEATURED PROJECTS
1. E-Commerce Sales Performance & KPI Dashboard
Tools: SQL, Power BI, DAX, Excel
Outcome: Star-schema relational model, dynamic CLV metrics, identified high-margin cohorts driving 62% profit.

2. Customer Churn Risk & Retention Analysis
Tools: SQL, Google Sheets, Pivot Tables, Data Validation
Outcome: Cleaned 7,000+ accounts, detected 42.7% month-to-month fiber churn pattern, created mitigation model.

3. Operations & Supply Chain Inventory Tracker
Tools: Microsoft Excel, Power BI, Advanced Sheets, XLOOKUP
Outcome: Automated reorder point alerts across 1,200 SKUs, preventing 19% stockout incidence.

TECHNICAL SKILLS
SQL (Relational Queries, Joins, Aggregations, Window Functions), Power BI (Dashboards, DAX, Data Modeling), Microsoft Excel (Pivot Tables, XLOOKUP, Modeling), Google Sheets & Advanced Sheets, Data Cleaning & Schema Validation, Web Analytics (Google Analytics, Search Console).

EDUCATION & QUALIFICATIONS
1. Advance Diploma in Computer Applications (ADCA), 2023 - 2024
Swami Vivekananda Group of Education, Kushinagar
Coursework: Database Management, SQL, Excel, Office Automation, Networking.

2. Bachelor of Computer Applications (BCA) - IGNOU
Coursework: SQL, Power BI, HTML, C Programming, Internet Applications, Computer Networking.

3. School of Business, Navgurukul Dharamshala Campus
Tools: Google Advanced Sheets, Google Drive, Business Communication.

OPERATIONAL EXPERIENCE
1. School Administration Office, Kushinagar, UP (2023 - 2024)
Role: Office & Data Management Assistant - Register data entry, Project Number Updates, UDISE statutory portal maintenance.

2. Bank Operations Office (CSC), Rambag, UP (2023 - 2024)
Role: Banking Operations & Records Assistant - Customer account opening, KYC documentation audit, NPCI mapping, daily ledger reconciliation.

LANGUAGES
English (Professional Working Proficiency), Hindi (Native / Fluent)
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/85 backdrop-blur-sm overflow-hidden">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden my-auto">
        
        {/* Top Header - Fixed */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-slate-800 bg-slate-950 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-teal-950 border border-teal-500/40 flex items-center justify-center text-teal-400 shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                {language === 'en' ? 'Vishwajit — Fresher Data Analyst Resume' : 'विश्वजीत — फ़्रेशर डेटा एनालिस्ट रेज़्यूमे'}
              </h3>
              <p className="text-[11px] sm:text-xs text-teal-400 font-mono">
                {language === 'en' ? 'Verified Credentials · Ready for Download & Print' : 'सत्यापित विवरण · डाउनलोड व प्रिंट हेतु तैयार'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors cursor-pointer"
              title="Print or Save directly as PDF using your browser"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">{language === 'en' ? 'Print / Save PDF' : 'प्रिंट / सेव PDF'}</span>
            </button>

            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? (language === 'en' ? 'Copied' : 'कॉपी हुआ') : (language === 'en' ? 'Copy Text' : 'कॉपी')}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formatted Clean Digital Resume Sheet - Scrollable with custom scrollbar */}
        <div className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto overscroll-contain space-y-6 text-slate-200 text-sm">
          
          {/* Header block */}
          <div className="border-b border-slate-800 pb-4 space-y-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <img 
                src={currentPhoto} 
                alt={`${info.name} - Fresher Data Analyst`} 
                referrerPolicy="no-referrer"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-teal-500/40 shrink-0 shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-2">
                  <h1 className="text-lg sm:text-2xl font-black tracking-tight text-white uppercase">
                    {info.name}
                  </h1>
                  <span className="text-teal-400 font-semibold text-xs sm:text-sm font-mono">
                    {info.title[language]}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-2.5 sm:gap-x-3 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{info.email}</span>
                  </span>
                  <span className="hidden sm:inline">·</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{info.phone}</span>
                  </span>
                  <span className="hidden sm:inline">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{info.location[language]}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">
              {language === 'en' ? 'Professional Summary' : 'व्यावसायिक सारांश'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {personalInfo.summary[language]}
            </p>
          </div>

          {/* Featured Projects Highlight */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">
              {language === 'en' ? 'Key Data Analytics Projects' : 'प्रमुख डेटा एनालिटिक्स प्रोजेक्ट्स'}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg space-y-1">
                <div className="font-bold text-white flex flex-col sm:flex-row sm:items-center justify-between">
                  <span>E-Commerce Sales Performance & KPI Dashboard</span>
                  <span className="text-teal-400 font-mono text-[11px]">SQL · Power BI · DAX · Excel</span>
                </div>
                <p className="text-slate-300 text-xs">Star-schema relational model, dynamic CLV metrics, multi-regional sales analysis identifying 62% profit concentration in top customer cohorts.</p>
              </div>

              <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg space-y-1">
                <div className="font-bold text-white flex flex-col sm:flex-row sm:items-center justify-between">
                  <span>Customer Churn Risk & Retention Analytics</span>
                  <span className="text-teal-400 font-mono text-[11px]">SQL · Google Sheets · Pivot Modeling</span>
                </div>
                <p className="text-slate-300 text-xs">Conducted data cleaning & cohort retention analysis on 7,000+ accounts, identifying 42.7% early churn risk pattern and mitigation strategy.</p>
              </div>

              <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg space-y-1">
                <div className="font-bold text-white flex flex-col sm:flex-row sm:items-center justify-between">
                  <span>Operations & Supply Chain Inventory Tracker</span>
                  <span className="text-teal-400 font-mono text-[11px]">Excel · Power BI · Advanced Sheets</span>
                </div>
                <p className="text-slate-300 text-xs">Automated safety reorder formulas with nested XLOOKUP across 1,200 SKUs, preventing stockout bottlenecks during peak demand.</p>
              </div>
            </div>
          </div>

          {/* Technical & Soft Skills */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">
              {language === 'en' ? 'Technical & Soft Skills' : 'तकनीकी और सॉफ्ट स्किल्स'}
            </h4>
            <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg space-y-2 text-xs">
              <div>
                <span className="font-semibold text-white">Technical Tooling: </span>
                <span className="text-slate-300">
                  SQL, Power BI, Microsoft Excel, Google Sheets, Google Advanced Sheets, Data Analysis, Data Cleaning, Pivot Tables, Google Analytics, Google Search Console, MS Word, MS PowerPoint, Tally ERP, C Programming, HTML, Adobe Photoshop, Computer Networking
                </span>
              </div>
              <div>
                <span className="font-semibold text-white">Core Competencies: </span>
                <span className="text-slate-300">
                  Analytical Thinking, Problem Solving, Time Management, Schema Integrity, Communication, Team Collaboration
                </span>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">
              {language === 'en' ? 'Education & Qualifications' : 'शिक्षा एवं योग्यताएं'}
            </h4>
            <div className="space-y-2.5">
              {educationList.map((edu) => (
                <div key={edu.id} className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                    <span className="font-bold text-white">{edu.degree[language]}</span>
                    <span className="text-teal-300 font-mono">{edu.timeline[language]}</span>
                  </div>
                  <div className="text-xs text-slate-300">{edu.institution[language]} · {edu.location[language]}</div>
                  <div className="text-[11px] text-slate-400">
                    <span className="font-medium text-slate-300">Subjects / Coursework: </span>
                    {edu.subjects[language].join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">
              {language === 'en' ? 'Operational Experience' : 'कार्य अनुभव'}
            </h4>
            <div className="space-y-2.5">
              {workExperience.map((exp) => (
                <div key={exp.id} className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                    <span className="font-bold text-white">{exp.organization[language]}</span>
                    <span className="text-teal-300 font-mono">{exp.period[language]}</span>
                  </div>
                  <div className="text-xs text-slate-300">{exp.role[language]} · {exp.location[language]}</div>
                  <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-0.5 pt-1">
                    {exp.tasks[language].map((task, tIdx) => (
                      <li key={tIdx}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer - Fixed */}
        <div className="p-3.5 sm:p-4 border-t border-slate-800 bg-slate-950 shrink-0 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            {language === 'en' ? 'Press ESC or click close to exit' : 'बाहर निकलने के लिए बंद करें दबाएं'}
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors cursor-pointer"
            >
              {language === 'en' ? 'Export as PDF' : 'PDF एक्सपोर्ट करें'}
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              {language === 'en' ? 'Close' : 'बंद करें'}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
