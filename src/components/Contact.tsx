import React, { useState } from 'react';
import { Language } from '../types';
import { personalInfo } from '../data/portfolioData';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Send, 
  Copy, 
  Check, 
  AlertCircle,
  Clock,
  Sparkles,
  MessageSquare
} from 'lucide-react';

interface ContactProps {
  language: Language;
  personalInfoProp?: typeof personalInfo;
}

export const Contact: React.FC<ContactProps> = ({ language, personalInfoProp }) => {
  const info = personalInfoProp || personalInfo;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'copied'>('idle');

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) {
      errs.name = language === 'en' ? 'Name is required' : 'नाम आवश्यक है';
    }
    if (!email.trim()) {
      errs.email = language === 'en' ? 'Email is required' : 'ईमेल आवश्यक है';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = language === 'en' ? 'Enter a valid email address' : 'मान्य ईमेल पता दर्ज करें';
    }
    if (!message.trim()) {
      errs.message = language === 'en' ? 'Message is required' : 'संदेश आवश्यक है';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Construct mailto link
    const mailSubject = encodeURIComponent(subject.trim() || `Inquiry from Portfolio - ${name}`);
    const mailBody = encodeURIComponent(`Hi Vishwajit,\n\n${message}\n\nFrom: ${name} (${email})`);
    
    // Trigger mailto intent
    window.location.href = `mailto:${personalInfo.email}?subject=${mailSubject}&body=${mailBody}`;
    
    setStatus('success');
  };

  const handleCopyMessage = () => {
    if (!validate()) return;
    const fullText = `Subject: ${subject || 'Inquiry'}\nFrom: ${name} (${email})\n\nMessage:\n${message}`;
    navigator.clipboard.writeText(fullText);
    setStatus('copied');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section id="contact" className="py-20 border-b border-slate-800/60 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
            <span>{language === 'en' ? '06. Get In Touch' : '06. संपर्क करें'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            {language === 'en' ? 'Contact Vishwajit' : 'विश्वजीत से संपर्क करें'}
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-300">
            {language === 'en'
              ? 'Available for Fresher Data Analyst, Junior Analyst, and Business Intelligence opportunities.'
              : 'फ़्रेशर डेटा एनालिस्ट, जूनियर एनालिस्ट और बिजनेस इंटेलिजेंस भूमिकाओं के लिए उपलब्ध।'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Contact Details & Links */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4 sm:space-y-5">
              <h3 className="text-lg font-semibold text-white">
                {language === 'en' ? 'Direct Contact Information' : 'सीधी संपर्क जानकारी'}
              </h3>

              {/* Email */}
              <a
                href={`mailto:${info.email}`}
                className="flex items-start gap-3 p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl hover:border-teal-500/50 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-teal-950/80 flex items-center justify-center text-teal-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Email Address</span>
                  <span className="text-sm font-semibold text-white group-hover:text-teal-300 transition-colors break-all">
                    {info.email}
                  </span>
                </div>
              </a>

              {/* Phone & WhatsApp */}
              <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-teal-950/80 flex items-center justify-center text-teal-400 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block">Phone / Mobile</span>
                      <span className="text-sm font-semibold text-white">
                        {info.phone}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`tel:${info.phone.replace(/\s+/g, '')}`}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs rounded-lg transition-colors font-medium border border-slate-700"
                  >
                    Call
                  </a>
                </div>

                {/* Direct WhatsApp CTA */}
                <a
                  href={`https://wa.me/${info.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(info.name)},%20I%20would%20like%20to%20discuss%20a%20Data%20Analyst%20opportunity`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/40 rounded-lg text-xs font-semibold text-emerald-300 hover:text-emerald-200 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'en' ? 'Chat Directly on WhatsApp' : 'व्हाट्सएप पर सीधा संदेश भेजें'}</span>
                </a>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl">
                <div className="w-9 h-9 rounded-lg bg-teal-950/80 flex items-center justify-center text-teal-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Location & Mobility</span>
                  <span className="text-sm font-semibold text-white">
                    {info.location[language] || info.location.en}
                  </span>
                </div>
              </div>

              {/* LinkedIn Link */}
              <a
                href={info.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-950/80 flex items-center justify-center text-blue-400 shrink-0">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">LinkedIn Profile</span>
                  <span className="text-sm font-semibold text-blue-300 group-hover:underline">
                    {info.linkedinUrl.replace('https://', '')}
                  </span>
                </div>
              </a>

              {/* GitHub Link */}
              <a
                href={info.githubPlaceholder || "https://github.com/vishwajit-data"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl hover:border-teal-500/50 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">GitHub Profile</span>
                  <span className="text-sm font-semibold text-teal-300 group-hover:underline">
                    {(info.githubPlaceholder || "https://github.com/vishwajit-data").replace('https://', '')}
                  </span>
                </div>
              </a>

            </div>

            {/* Availability Badge */}
            <div className="p-4 bg-teal-950/40 border border-teal-500/30 rounded-xl text-xs text-teal-300 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="font-medium">
                {language === 'en'
                  ? 'Immediate Joiner · Actively interviewing for full-time Fresher Data Analyst & BI roles.'
                  : 'तत्काल उपलब्ध · फ़्रेशर डेटा एनालिस्ट और BI भूमिकाओं हेतु सक्रिय रूप से उपलब्ध।'}
              </span>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-slate-900/70 border border-slate-800 rounded-2xl">
              
              <div className="mb-6 space-y-1">
                <h3 className="text-lg font-semibold text-white">
                  {language === 'en' ? 'Send a Message' : 'संदेश भेजें'}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'en'
                    ? 'Fill out the details below to launch your email client directly or copy your message.'
                    : 'अपना ईमेल क्लाइंट खोलने या संदेश कॉपी करने के लिए नीचे विवरण भरें।'}
                </p>
              </div>

              {/* Confirmation States */}
              {status === 'success' && (
                <div className="mb-6 p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-200 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-emerald-300">
                      {language === 'en' ? 'Email Client Prepared!' : 'ईमेल क्लाइंट तैयार है!'}
                    </p>
                    <p className="mt-0.5">
                      {language === 'en'
                        ? 'Your message was transferred into your default email app directed to vishwajitkushwaha799@gmail.com. You can also click "Copy Message" below if preferred.'
                        : 'आपका संदेश vishwajitkushwaha799@gmail.com के लिए आपके ईमेल ऐप में तैयार कर दिया गया है।'}
                    </p>
                  </div>
                </div>
              )}

              {status === 'copied' && (
                <div className="mb-6 p-4 bg-teal-950/60 border border-teal-500/40 rounded-xl text-xs text-teal-200 flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-400" />
                  <span>
                    {language === 'en' ? 'Message copied to clipboard!' : 'संदेश क्लिपबोर्ड पर कॉपी हो गया!'}
                  </span>
                </div>
              )}

              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {language === 'en' ? 'Your Name *' : 'आपका नाम *'}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={language === 'en' ? 'e.g. John Doe / HR Manager' : 'उदा. राहुल शर्मा / एचआर'}
                      className={`w-full bg-slate-950 border ${errors.name ? 'border-rose-500' : 'border-slate-800'} rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-400 transition-colors`}
                    />
                    {errors.name && <p className="mt-1 text-[11px] text-rose-400">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {language === 'en' ? 'Your Email *' : 'आपका ईमेल *'}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hr@company.com"
                      className={`w-full bg-slate-950 border ${errors.email ? 'border-rose-500' : 'border-slate-800'} rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-400 transition-colors`}
                    />
                    {errors.email && <p className="mt-1 text-[11px] text-rose-400">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {language === 'en' ? 'Subject' : 'विषय'}
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={language === 'en' ? 'Data Analyst Role Discussion' : 'डेटा एनालिस्ट पद हेतु चर्चा'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {language === 'en' ? 'Message *' : 'संदेश *'}
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={language === 'en' ? 'Type your opportunity or inquiry details here...' : 'अपने अवसर या पूछताछ का विवरण यहाँ लिखें...'}
                    className={`w-full bg-slate-950 border ${errors.message ? 'border-rose-500' : 'border-slate-800'} rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-400 transition-colors`}
                  />
                  {errors.message && <p className="mt-1 text-[11px] text-rose-400">{errors.message}</p>}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-400 hover:bg-teal-300 text-slate-950 rounded-lg text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{language === 'en' ? 'Send via Email Client' : 'ईमेल से भेजें'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-medium transition-colors border border-slate-700 cursor-pointer"
                  >
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>{language === 'en' ? 'Copy Text' : 'संदेश कॉपी करें'}</span>
                  </button>
                </div>

                <div className="pt-3 text-[11px] text-slate-500 flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>
                    {language === 'en'
                      ? 'Note: Client-side portfolio does not simulate false database storage. Submitting opens your native mail client.'
                      : 'सूचना: यह फॉर्म सुरक्षित रूप से आपके डिवाइस का ईमेल ऐप खोलता है।'}
                  </span>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
