import React, { useState } from 'react';
import { Language } from '../types';
import { personalInfo } from '../data/portfolioData';
import profilePhoto from '../assets/images/profile_photo_1790327770400.jpg';
import { 
  ArrowRight, 
  FileText, 
  MapPin, 
  Linkedin, 
  Mail, 
  Database, 
  BarChart3, 
  Table2, 
  Upload, 
  Sparkles,
  CheckCircle2,
  Phone,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';

interface HeroProps {
  language: Language;
  onOpenResumeModal: () => void;
  photoUrl?: string;
  onUpdatePhoto?: (url: string) => void;
  personalInfoProp?: typeof personalInfo;
}

export const Hero: React.FC<HeroProps> = ({ 
  language, 
  onOpenResumeModal,
  photoUrl,
  onUpdatePhoto,
  personalInfoProp
}) => {
  const info = personalInfoProp || personalInfo;
  const currentPhoto = photoUrl || profilePhoto;
  const [emailCopied, setEmailCopied] = useState<boolean>(false);

  const handleCustomPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (onUpdatePhoto) {
          onUpdatePhoto(base64);
        }
        localStorage.setItem('vishwajit_permanent_photo', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(info.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section id="home" className="relative pt-8 pb-16 sm:pt-12 sm:pb-20 md:py-24 overflow-hidden border-b border-slate-800/60">
      {/* Background ambient data grid glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 20%, rgba(20, 184, 166, 0.15), transparent 60%),
                            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Recruiter Trust & Availability Status Bar */}
        <div className="mb-6 sm:mb-8 p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-semibold text-emerald-300">
              {language === 'en' 
                ? 'Fresher Data Analyst · Immediate Joiner' 
                : 'फ़्रेशर डेटा एनालिस्ट · तत्काल जॉइनिंग हेतु उपलब्ध'}
            </span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span className="text-slate-400 hidden sm:inline">
              {language === 'en' 
                ? 'Open to Full-Time On-site, Hybrid & Remote Roles' 
                : 'ऑन-साइट, हाइब्रिड और रिमोट अवसरों के लिए उपलब्ध'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px] self-start sm:self-auto">
            <span className="text-teal-400 font-semibold">SQL · Power BI · Excel</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Copy - Left 7 columns */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/60 border border-teal-500/40 text-xs font-semibold text-teal-300">
                <Database className="w-3.5 h-3.5 text-teal-400" />
                <span>{language === 'en' ? 'Fresher Data Analyst' : 'डेटा एनालिस्ट (फ़्रेशर)'}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {info.name}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-teal-300">
                {info.title[language]}
              </p>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {info.tagline[language]}
            </p>

            {/* Resume-backed attributes and location */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-300 pt-1">
              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{info.location[language]}</span>
              </span>
              <span className="text-slate-600 hidden sm:inline">·</span>
              
              <button 
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 hover:text-teal-300 transition-colors text-slate-300 cursor-pointer"
                title="Click to copy email address"
              >
                {emailCopied ? <Check className="w-4 h-4 text-emerald-400 shrink-0" /> : <Mail className="w-4 h-4 text-teal-400 shrink-0" />}
                <span className="underline decoration-slate-700 underline-offset-4">{info.email}</span>
                {emailCopied && <span className="text-[10px] text-emerald-400 font-mono font-bold">Copied!</span>}
              </button>

              <span className="text-slate-600 hidden sm:inline">·</span>
              
              <a 
                href={`tel:${info.phone.replace(/\s+/g, '')}`} 
                className="flex items-center gap-1.5 hover:text-teal-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{info.phone}</span>
              </a>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-lg text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors shadow-sm"
              >
                <span>{language === 'en' ? 'View Projects' : 'प्रोजेक्ट्स देखें'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${info.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(info.name)},%20I%20reviewed%20your%20Fresher%20Data%20Analyst%20portfolio`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg text-sm font-medium text-emerald-300 bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-900/50 hover:text-emerald-200 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={onOpenResumeModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-lg text-sm font-medium text-teal-300 bg-teal-950/50 border border-teal-800/80 hover:bg-teal-900/60 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>{language === 'en' ? 'View Resume' : 'रेज़्यूमे देखें'}</span>
              </button>
            </div>

            {/* Quick KPI Stat Counter Strip */}
            <div className="pt-4 grid grid-cols-3 gap-2 text-center border-t border-slate-800/80">
              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <span className="text-lg sm:text-xl font-extrabold text-teal-300 font-mono block">3+</span>
                <span className="text-[11px] text-slate-400">Case Studies</span>
              </div>
              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <span className="text-lg sm:text-xl font-extrabold text-emerald-300 font-mono block">50K+</span>
                <span className="text-[11px] text-slate-400">Records Cleaned</span>
              </div>
              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <span className="text-lg sm:text-xl font-extrabold text-white font-mono block">100%</span>
                <span className="text-[11px] text-slate-400">Factual Integrity</span>
              </div>
            </div>

            {/* Core Tech Stack Badges from resume */}
            <div className="pt-2 space-y-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                {language === 'en' ? 'Core Analytical Tooling' : 'प्रमुख विश्लेषणात्मक उपकरण'}:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { name: 'SQL', icon: Database },
                  { name: 'Power BI', icon: BarChart3 },
                  { name: 'Microsoft Excel', icon: Table2 },
                  { name: 'Google Sheets', icon: Table2 },
                  { name: 'Pivot Tables', icon: BarChart3 },
                  { name: 'Data Cleaning', icon: CheckCircle2 }
                ].map((tool) => (
                  <span
                    key={tool.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 text-slate-200 border border-slate-800 rounded-lg text-xs font-medium"
                  >
                    <tool.icon className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{tool.name}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right 5 columns - Profile Avatar Card with Candidate Photo Slot */}
          <div className="lg:col-span-5 w-full">
            <div className="relative bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
              
              <div className="flex flex-col items-center text-center space-y-4">
                
                {/* Profile Photo / Monogram Container */}
                <div className="relative group">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border-2 border-teal-500/40 p-1 flex items-center justify-center overflow-hidden shadow-inner">
                    <img 
                      src={currentPhoto} 
                      alt={`${info.name} - Fresher Data Analyst`} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  {/* Photo Upload helper slot */}
                  <label 
                    htmlFor="photo-upload"
                    className="absolute bottom-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 text-teal-400 rounded-lg cursor-pointer border border-slate-700 shadow-md transition-colors"
                    title={language === 'en' ? 'Upload / preview profile photo' : 'प्रोफ़ाइल फ़ोटो अपलोड या प्रीव्यू करें'}
                  >
                    <Upload className="w-4 h-4" />
                    <input 
                      id="photo-upload" 
                      type="file" 
                      accept="image/*" 
                      onChange={handleCustomPhotoChange} 
                      className="sr-only" 
                    />
                  </label>
                </div>

                {/* Quick Factual Metrics from Resume */}
                <div className="w-full grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-800 text-left">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    <span className="text-[11px] text-slate-400 block font-mono">
                      {language === 'en' ? 'Experience Level' : 'अनुभव स्तर'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white">
                      {language === 'en' ? 'Fresher (Job-Ready)' : 'फ़्रेशर (जॉब-रेडी)'}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    <span className="text-[11px] text-slate-400 block font-mono">
                      {language === 'en' ? 'Target Role' : 'लक्षित पद'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-teal-300">
                      {language === 'en' ? 'Data / BI Analyst' : 'डेटा / BI एनालिस्ट'}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    <span className="text-[11px] text-slate-400 block font-mono">
                      {language === 'en' ? 'Availability' : 'उपलब्धता'}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-400">
                      {language === 'en' ? 'Immediate Joiner' : 'तत्काल उपलब्ध'}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    <span className="text-[11px] text-slate-400 block font-mono">
                      {language === 'en' ? 'Languages' : 'भाषाएं'}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white">
                      {language === 'en' ? 'English & Hindi' : 'अंग्रेजी व हिन्दी'}
                    </span>
                  </div>
                </div>

                {/* Professional Links */}
                <div className="w-full flex items-center justify-center gap-3 pt-1">
                  <a
                    href={info.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 min-h-[40px] text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2 border border-slate-700"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={`mailto:${info.email}`}
                    className="flex-1 py-2.5 px-3 min-h-[40px] text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2 border border-slate-700"
                  >
                    <Mail className="w-4 h-4 text-teal-400" />
                    <span>Email Me</span>
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
