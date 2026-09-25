import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { personalInfo as defaultPersonalInfo } from './data/portfolioData';
import profilePhotoDefault from './assets/images/profile_photo_1790327770400.jpg';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Approach } from './components/Approach';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { PlaceholdersGuideModal } from './components/PlaceholdersGuideModal';
import { AdminCustomizerModal } from './components/AdminCustomizerModal';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Permanent Persistent Photo State
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    return localStorage.getItem('vishwajit_permanent_photo') || profilePhotoDefault;
  });

  // Permanent Persistent Personal Information State
  const [personalInfoState, setPersonalInfoState] = useState(() => {
    const saved = localStorage.getItem('vishwajit_permanent_personal_info');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved personal info', e);
      }
    }
    return defaultPersonalInfo;
  });

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleUpdatePhoto = (newPhotoUrl: string) => {
    setPhotoUrl(newPhotoUrl);
    localStorage.setItem('vishwajit_permanent_photo', newPhotoUrl);
  };

  const handleUpdatePersonalInfo = (newInfo: typeof defaultPersonalInfo) => {
    setPersonalInfoState(newInfo);
    localStorage.setItem('vishwajit_permanent_personal_info', JSON.stringify(newInfo));
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500/20 selection:text-teal-300">
      
      {/* 4-Tab Streamlined Navigation Bar + 3-Dot Key Protected Customizer */}
      <Navbar
        language={language}
        onToggleLanguage={toggleLanguage}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onOpenAdminModal={() => setAdminModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-x-hidden">
        <Hero
          language={language}
          onOpenResumeModal={() => setResumeModalOpen(true)}
          photoUrl={photoUrl}
          onUpdatePhoto={handleUpdatePhoto}
          personalInfoProp={personalInfoState}
        />

        <Projects language={language} />

        <Skills language={language} />

        <About language={language} personalInfoProp={personalInfoState} />

        <Experience language={language} />

        <Education language={language} />

        <Approach language={language} />

        <Contact language={language} personalInfoProp={personalInfoState} />
      </main>

      {/* Footer */}
      <Footer 
        language={language} 
        onOpenGuideModal={() => setGuideModalOpen(true)} 
      />

      {/* Resume Digital Sheet & PDF Print Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        language={language}
        photoUrl={photoUrl}
        personalInfoProp={personalInfoState}
      />

      {/* Placeholders / Customization Checklist Guide */}
      <PlaceholdersGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
        language={language}
      />

      {/* 3-Dot Key Protected Website Master Customizer & Photo Manager */}
      <AdminCustomizerModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        language={language}
        onUpdatePhoto={handleUpdatePhoto}
        currentPhotoUrl={photoUrl}
        onUpdatePersonalInfo={handleUpdatePersonalInfo}
        currentPersonalInfo={personalInfoState}
      />

    </div>
  );
}

