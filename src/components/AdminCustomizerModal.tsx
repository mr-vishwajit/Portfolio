import React, { useState, useEffect } from 'react';
import { Language, ProjectData } from '../types';
import { 
  personalInfo as defaultPersonalInfo, 
  initialProjects, 
  skillCategories, 
  workExperience, 
  educationList, 
  suggestedProjects 
} from '../data/portfolioData';
import profilePhotoDefault from '../assets/images/profile_photo_1790327770400.jpg';
import { 
  X, 
  Lock, 
  Unlock, 
  Key, 
  Camera, 
  Upload, 
  User, 
  FolderGit2, 
  Save, 
  RotateCcw, 
  Check, 
  AlertCircle, 
  Download, 
  FileUp, 
  Phone, 
  Mail, 
  MapPin, 
  Linkedin, 
  Github, 
  Plus, 
  Trash2, 
  Edit3, 
  FileCode, 
  Sparkles,
  Layers,
  Code
} from 'lucide-react';

interface AdminCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onUpdatePhoto: (newPhotoUrl: string) => void;
  currentPhotoUrl: string;
  onUpdatePersonalInfo: (info: typeof defaultPersonalInfo) => void;
  currentPersonalInfo: typeof defaultPersonalInfo;
  projects?: ProjectData[];
  onUpdateProjects?: (projects: ProjectData[]) => void;
}

export const AdminCustomizerModal: React.FC<AdminCustomizerModalProps> = ({
  isOpen,
  onClose,
  language,
  onUpdatePhoto,
  currentPhotoUrl,
  onUpdatePersonalInfo,
  currentPersonalInfo,
  projects: projectsProp,
  onUpdateProjects
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('vishwajit_admin_auth') === 'true';
  });
  const [keyInput, setKeyInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  
  // Active Tab
  const [activeTab, setActiveTab] = useState<'photo' | 'personal' | 'projects' | 'deploy'>('photo');
  
  // Local Form States
  const [photoPreview, setPhotoPreview] = useState<string>(currentPhotoUrl);
  const [photoUrlInput, setPhotoUrlInput] = useState<string>('');
  const [formData, setFormData] = useState(currentPersonalInfo);
  
  // Projects state
  const [projectsList, setProjectsList] = useState<ProjectData[]>(() => {
    const saved = localStorage.getItem('vishwajit_portfolio_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved projects', e);
      }
    }
    return projectsProp || initialProjects;
  });

  const [selectedProjectId, setSelectedProjectId] = useState<string>(projectsList[0]?.id || '1');
  
  // Toast notifications
  const [saveSuccessToast, setSaveSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    setPhotoPreview(currentPhotoUrl);
    setFormData(currentPersonalInfo);
  }, [currentPhotoUrl, currentPersonalInfo, isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyInput.trim() === 'Ravi@123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('vishwajit_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError(language === 'en' ? 'Incorrect Key! Access Denied.' : 'गलत कुंजी! पहुंच अस्वीकृत।');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('vishwajit_admin_auth');
    setKeyInput('');
  };

  // 1. Photo Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPhotoPreview(base64String);
        onUpdatePhoto(base64String);
        localStorage.setItem('vishwajit_permanent_photo', base64String);
        showToast(language === 'en' ? 'Photo updated & saved permanently!' : 'फ़ोटो सफलतापूर्वक हमेशा के लिए सुरक्षित हो गई!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyPhotoUrl = () => {
    if (photoUrlInput.trim()) {
      setPhotoPreview(photoUrlInput.trim());
      onUpdatePhoto(photoUrlInput.trim());
      localStorage.setItem('vishwajit_permanent_photo', photoUrlInput.trim());
      setPhotoUrlInput('');
      showToast(language === 'en' ? 'Photo URL applied & saved permanently!' : 'फ़ोटो URL लागू व सुरक्षित हो गया!');
    }
  };

  const handleResetToDefaultPhoto = () => {
    setPhotoPreview(profilePhotoDefault);
    onUpdatePhoto(profilePhotoDefault);
    localStorage.setItem('vishwajit_permanent_photo', profilePhotoDefault);
    showToast(language === 'en' ? 'Reset to original studio photo!' : 'ओरिजिनल स्टूडियो फ़ोटो पर रीसेट किया गया!');
  };

  // 2. Personal Info Handlers
  const handleSavePersonalInfo = () => {
    onUpdatePersonalInfo(formData);
    localStorage.setItem('vishwajit_permanent_personal_info', JSON.stringify(formData));
    showToast(language === 'en' ? 'Personal information saved permanently!' : 'व्यक्तिगत जानकारी हमेशा के लिए सुरक्षित हो गई!');
  };

  // 3. Project Handlers
  const handleUpdateProjectField = (id: string, field: keyof ProjectData, value: any) => {
    const updated = projectsList.map((p) => (p.id === id ? { ...p, [field]: value } : p));
    setProjectsList(updated);
  };

  const handleSaveAllProjects = () => {
    localStorage.setItem('vishwajit_portfolio_projects', JSON.stringify(projectsList));
    if (onUpdateProjects) {
      onUpdateProjects(projectsList);
    }
    showToast(language === 'en' ? 'All projects saved permanently!' : 'सभी प्रोजेक्ट्स हमेशा के लिए सुरक्षित हो गए!');
  };

  const handleAddNewProject = () => {
    const newId = String(Date.now());
    const newProject: ProjectData = {
      id: newId,
      title: 'New Data Analytics Case Study',
      category: 'SQL & Power BI',
      problem: 'Analyze operational data to identify trends and improve business decision-making.',
      dataset: '10,000+ transactional records with multiple relational entities.',
      tools: ['SQL', 'Power BI', 'Excel'],
      process: 'Extracted data using SQL JOINs, built DAX measures, and created interactive dashboards.',
      keyInsight: 'Identified key patterns improving operational efficiency by 15%.',
      businessResult: 'Enabled stakeholders to make faster, data-backed decisions.',
      githubUrl: 'https://github.com/vishwajit-data',
      demoUrl: 'https://app.powerbi.com',
      isPlaceholder: false
    };

    const updated = [...projectsList, newProject];
    setProjectsList(updated);
    setSelectedProjectId(newId);
    localStorage.setItem('vishwajit_portfolio_projects', JSON.stringify(updated));
    if (onUpdateProjects) onUpdateProjects(updated);
    showToast(language === 'en' ? 'New project added!' : 'नया प्रोजेक्ट सफलतापूर्वक जोड़ा गया!');
  };

  const handleDeleteProject = (id: string) => {
    if (projectsList.length <= 1) {
      alert(language === 'en' ? 'You must keep at least 1 project.' : 'कम से कम 1 प्रोजेक्ट होना अनिवार्य है।');
      return;
    }
    if (window.confirm(language === 'en' ? 'Delete this project?' : 'क्या आप इस प्रोजेक्ट को हटाना चाहते हैं?')) {
      const filtered = projectsList.filter((p) => p.id !== id);
      setProjectsList(filtered);
      setSelectedProjectId(filtered[0].id);
      localStorage.setItem('vishwajit_portfolio_projects', JSON.stringify(filtered));
      if (onUpdateProjects) onUpdateProjects(filtered);
      showToast(language === 'en' ? 'Project removed!' : 'प्रोजेक्ट हटा दिया गया!');
    }
  };

  // 4. Deploy & Backup Handlers
  const handleExportBackupJson = () => {
    const backupData = {
      photo: localStorage.getItem('vishwajit_permanent_photo') || currentPhotoUrl,
      personalInfo: formData,
      projects: projectsList,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vishwajit-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(language === 'en' ? 'Backup JSON downloaded successfully!' : 'बैकअप JSON फ़ाइल डाउनलोड हो गई!');
  };

  const handleImportBackupJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          if (imported.photo) {
            setPhotoPreview(imported.photo);
            onUpdatePhoto(imported.photo);
            localStorage.setItem('vishwajit_permanent_photo', imported.photo);
          }
          if (imported.personalInfo) {
            setFormData(imported.personalInfo);
            onUpdatePersonalInfo(imported.personalInfo);
            localStorage.setItem('vishwajit_permanent_personal_info', JSON.stringify(imported.personalInfo));
          }
          if (imported.projects && Array.isArray(imported.projects)) {
            setProjectsList(imported.projects);
            localStorage.setItem('vishwajit_portfolio_projects', JSON.stringify(imported.projects));
            if (onUpdateProjects) onUpdateProjects(imported.projects);
          }
          showToast(language === 'en' ? 'Configuration restored successfully!' : 'कॉन्फ़िगरेशन सफलतापूर्वक रीस्टोर हो गया!');
        } catch (err) {
          alert('Invalid backup JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Generate and Download Static portfolioData.ts for GitHub Repository
  const handleDownloadStaticSourceCode = () => {
    const codeContent = `// Static Production Data for Vishwajit - Fresher Data Analyst Portfolio
import { ProjectData, SuggestedProject, ExperienceItem, EducationItem, SkillCategory } from '../types';

export const personalInfo = ${JSON.stringify(formData, null, 2)};

export const initialProjects: ProjectData[] = ${JSON.stringify(projectsList, null, 2)};

export const suggestedProjects: SuggestedProject[] = ${JSON.stringify(suggestedProjects, null, 2)};

export const workExperience: ExperienceItem[] = ${JSON.stringify(workExperience, null, 2)};

export const educationList: EducationItem[] = ${JSON.stringify(educationList, null, 2)};

export const skillCategories: SkillCategory[] = ${JSON.stringify(skillCategories, null, 2)};
`;

    const blob = new Blob([codeContent], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolioData.ts';
    a.click();
    URL.revokeObjectURL(url);
    showToast(language === 'en' ? 'Downloaded portfolioData.ts! You can replace it in your GitHub repo.' : 'portfolioData.ts डाउनलोड हो गया! आप इसे अपने GitHub रिपॉजिटरी में बदल सकते हैं।');
  };

  const handleResetEntireWebsite = () => {
    if (window.confirm(language === 'en' ? 'Reset all customized data back to factory defaults?' : 'क्या आप पूरी वेबसाइट को मूल डिफ़ॉल्ट स्थिति पर रीसेट करना चाहते हैं?')) {
      localStorage.removeItem('vishwajit_permanent_photo');
      localStorage.removeItem('vishwajit_permanent_personal_info');
      localStorage.removeItem('vishwajit_portfolio_projects');
      setPhotoPreview(profilePhotoDefault);
      onUpdatePhoto(profilePhotoDefault);
      setFormData(defaultPersonalInfo);
      onUpdatePersonalInfo(defaultPersonalInfo);
      setProjectsList(initialProjects);
      if (onUpdateProjects) onUpdateProjects(initialProjects);
      showToast(language === 'en' ? 'All settings reset to defaults!' : 'सभी सेटिंग्स डिफ़ॉल्ट पर रीसेट हो गईं!');
    }
  };

  const showToast = (msg: string) => {
    setSaveSuccessToast(msg);
    setTimeout(() => setSaveSuccessToast(null), 3500);
  };

  const currentSelectedProject = projectsList.find((p) => p.id === selectedProjectId) || projectsList[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-hidden">
      <div className="relative w-full max-w-4xl max-h-[94dvh] sm:max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-950 border border-teal-500/40 flex items-center justify-center text-teal-400 shrink-0">
              {isAuthenticated ? <Unlock className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-amber-400" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-teal-400 font-semibold uppercase tracking-wider">
                  {isAuthenticated ? 'Master Customizer' : 'Key Verification'}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-[11px] text-slate-400">Permanent & GitHub Ready</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                {language === 'en' ? 'Website Customizer & Manager' : 'वेबसाइट कस्टमाइज़र व मैनेजर'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                title="Lock session"
              >
                {language === 'en' ? 'Lock' : 'लॉगआउट'}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Save Toast */}
        {saveSuccessToast && (
          <div className="bg-emerald-950/90 border-b border-emerald-500/40 px-4 py-2.5 text-emerald-300 text-xs flex items-center gap-2 shrink-0 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{saveSuccessToast}</span>
          </div>
        )}

        {/* Unauthenticated Security Key Screen */}
        {!isAuthenticated ? (
          <div className="p-6 sm:p-12 flex-1 overflow-y-auto flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-teal-400 shadow-inner">
              <Key className="w-7 h-7" />
            </div>

            <div className="max-w-md space-y-1">
              <h4 className="text-base sm:text-lg font-bold text-white">
                {language === 'en' ? 'Enter Key' : 'कुंजी दर्ज करें'}
              </h4>
            </div>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-3">
              <div>
                <input
                  type="password"
                  value={keyInput}
                  onChange={(e) => {
                    setKeyInput(e.target.value);
                    setAuthError('');
                  }}
                  placeholder="Enter key"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm text-center font-mono tracking-widest focus:border-teal-400 focus:outline-none shadow-inner"
                  autoFocus
                />
                {authError && (
                  <p className="text-xs text-rose-400 mt-2 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{authError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{language === 'en' ? 'Enter' : 'दर्ज करें'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Master Customizer Panel */
          <>
            {/* Customizer Sub-tabs */}
            <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 pt-3 border-b border-slate-800 bg-slate-950/70 overflow-x-auto scrollbar-none shrink-0">
              {[
                { id: 'photo', label: language === 'en' ? 'Profile Photo' : 'प्रोफ़ाइल फ़ोटो', icon: Camera },
                { id: 'personal', label: language === 'en' ? 'Personal & Contact' : 'व्यक्तिगत विवरण', icon: User },
                { id: 'projects', label: language === 'en' ? 'Projects & Case Studies' : 'प्रोजेक्ट्स', icon: FolderGit2 },
                { id: 'deploy', label: language === 'en' ? 'GitHub & Backup' : 'गिटहब व बैकअप', icon: Code },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                      activeTab === tab.id
                        ? 'border-teal-400 text-teal-300'
                        : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Scrollable Form Body */}
            <div className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto overscroll-contain space-y-6 text-slate-200 text-xs sm:text-sm">
              
              {/* TAB 1: Profile Photo Customizer */}
              {activeTab === 'photo' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-slate-950/80 rounded-2xl border border-slate-800">
                    
                    {/* Live Preview Avatar */}
                    <div className="relative">
                      <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-slate-900 border-2 border-teal-500/50 p-1 flex items-center justify-center overflow-hidden shadow-lg shrink-0">
                        <img
                          src={photoPreview}
                          alt="Profile Preview"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] shadow-sm">
                        Live
                      </span>
                    </div>

                    {/* Action Upload Controls */}
                    <div className="flex-1 space-y-3 text-center sm:text-left">
                      <h4 className="text-base font-bold text-white">
                        {language === 'en' ? 'Update & Store Profile Photo' : 'फ़ोटो अपडेट व सुरक्षित करें'}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {language === 'en'
                          ? 'Upload a photo from your device or paste a web URL. It stays permanently saved in your browser and automatically updates the Hero avatar and Resume sheet.'
                          : 'डिवाइस से फ़ोटो चुनें या डायरेक्ट वेब URL डालें। यह हमेशा के लिए सुरक्षित हो जाएगी।'}
                      </p>

                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
                        <label className="inline-flex items-center gap-2 px-4 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold rounded-xl text-xs cursor-pointer transition-colors shadow-sm">
                          <Upload className="w-4 h-4" />
                          <span>{language === 'en' ? 'Upload from Device' : 'डिवाइस से फ़ोटो चुनें'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="sr-only"
                          />
                        </label>

                        <button
                          onClick={handleResetToDefaultPhoto}
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs transition-colors border border-slate-700 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{language === 'en' ? 'Reset to Default Photo' : 'मूल फ़ोटो पर रीसेट'}</span>
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Alternative Direct Image URL Option */}
                  <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
                    <span className="font-semibold text-teal-300 text-xs block">
                      {language === 'en' ? 'Or Paste Direct Image Web Link (URL):' : 'या डायरेक्ट इमेज वेब लिंक (URL) डालें:'}
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={photoUrlInput}
                        onChange={(e) => setPhotoUrlInput(e.target.value)}
                        placeholder="https://example.com/my-photo.jpg"
                        className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-teal-400 focus:outline-none"
                      />
                      <button
                        onClick={handleApplyPhotoUrl}
                        className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold rounded-lg border border-slate-700 transition-colors cursor-pointer"
                      >
                        {language === 'en' ? 'Apply URL' : 'लागू करें'}
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: Personal & Contact Info Customizer */}
              {activeTab === 'personal' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-teal-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:border-teal-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-teal-300 mb-1">Job Title (English)</label>
                      <input
                        type="text"
                        value={formData.title.en}
                        onChange={(e) => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:border-teal-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-teal-300 mb-1">Job Title (Hindi)</label>
                      <input
                        type="text"
                        value={formData.title.hi}
                        onChange={(e) => setFormData({ ...formData, title: { ...formData.title, hi: e.target.value } })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:border-teal-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-teal-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:border-teal-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-teal-300 mb-1">Phone / WhatsApp Number</label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:border-teal-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-teal-300 mb-1">Location & Mobility</label>
                      <input
                        type="text"
                        value={formData.location.en}
                        onChange={(e) => setFormData({ ...formData, location: { ...formData.location, en: e.target.value } })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:border-teal-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-teal-300 mb-1">LinkedIn Profile URL</label>
                      <input
                        type="url"
                        value={formData.linkedinUrl}
                        onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:border-teal-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-teal-300 mb-1">GitHub Profile URL</label>
                      <input
                        type="url"
                        value={formData.githubPlaceholder}
                        onChange={(e) => setFormData({ ...formData, githubPlaceholder: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:border-teal-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-teal-300 mb-1">Tagline / Hero Headline (English)</label>
                    <textarea
                      rows={2}
                      value={formData.tagline.en}
                      onChange={(e) => setFormData({ ...formData, tagline: { ...formData.tagline, en: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:border-teal-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-teal-300 mb-1">Executive Summary (English)</label>
                    <textarea
                      rows={3}
                      value={formData.summary.en}
                      onChange={(e) => setFormData({ ...formData, summary: { ...formData.summary, en: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:border-teal-400 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleSavePersonalInfo}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-md cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{language === 'en' ? 'Save Personal Info Permanently' : 'व्यक्तिगत जानकारी सहेजें'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: Projects & Case Studies Manager */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  
                  {/* Top Project Selector & Add Button */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                      {projectsList.map((proj, idx) => (
                        <button
                          key={proj.id}
                          onClick={() => setSelectedProjectId(proj.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
                            selectedProjectId === proj.id
                              ? 'bg-teal-400 text-slate-950 shadow-sm'
                              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                          }`}
                        >
                          <span>{idx + 1}. {proj.title.slice(0, 20)}...</span>
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={handleAddNewProject}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Add Project' : 'नया जोड़ें'}</span>
                      </button>

                      {projectsList.length > 1 && (
                        <button
                          onClick={() => handleDeleteProject(selectedProjectId)}
                          className="p-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/80 rounded-lg transition-colors cursor-pointer"
                          title="Delete current project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Active Selected Project Form */}
                  {currentSelectedProject && (
                    <div className="space-y-4 p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-teal-300 mb-1">Project Title</label>
                          <input
                            type="text"
                            value={currentSelectedProject.title}
                            onChange={(e) => handleUpdateProjectField(currentSelectedProject.id, 'title', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-teal-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-teal-300 mb-1">Category / Tools Badge</label>
                          <input
                            type="text"
                            value={currentSelectedProject.category}
                            onChange={(e) => handleUpdateProjectField(currentSelectedProject.id, 'category', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-teal-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-teal-300 mb-1">GitHub Repo URL</label>
                          <input
                            type="url"
                            value={currentSelectedProject.githubUrl || ''}
                            onChange={(e) => handleUpdateProjectField(currentSelectedProject.id, 'githubUrl', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-teal-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-teal-300 mb-1">Live Power BI / Dashboard URL</label>
                          <input
                            type="url"
                            value={currentSelectedProject.demoUrl || ''}
                            onChange={(e) => handleUpdateProjectField(currentSelectedProject.id, 'demoUrl', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-teal-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-teal-300 mb-1">Problem Statement</label>
                        <textarea
                          rows={2}
                          value={currentSelectedProject.problem}
                          onChange={(e) => handleUpdateProjectField(currentSelectedProject.id, 'problem', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-teal-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-teal-300 mb-1">Dataset Description</label>
                        <input
                          type="text"
                          value={currentSelectedProject.dataset}
                          onChange={(e) => handleUpdateProjectField(currentSelectedProject.id, 'dataset', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-teal-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-teal-300 mb-1">Key Insight & Findings</label>
                        <textarea
                          rows={2}
                          value={currentSelectedProject.keyInsight}
                          onChange={(e) => handleUpdateProjectField(currentSelectedProject.id, 'keyInsight', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-teal-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-teal-300 mb-1">Business Result & ROI</label>
                        <input
                          type="text"
                          value={currentSelectedProject.businessResult}
                          onChange={(e) => handleUpdateProjectField(currentSelectedProject.id, 'businessResult', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-teal-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-teal-300 mb-1">Process Steps Taken</label>
                        <textarea
                          rows={2}
                          value={currentSelectedProject.process}
                          onChange={(e) => handleUpdateProjectField(currentSelectedProject.id, 'process', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-teal-400 focus:outline-none"
                        />
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={handleSaveAllProjects}
                          className="inline-flex items-center gap-2 px-5 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-md cursor-pointer"
                        >
                          <Save className="w-4 h-4" />
                          <span>{language === 'en' ? 'Save Projects Permanently' : 'प्रोजेक्ट्स सहेजें'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 4: GitHub Ready & Backup Manager */}
              {activeTab === 'deploy' && (
                <div className="space-y-5">
                  
                  {/* Download Static TS file for GitHub */}
                  <div className="p-5 bg-teal-950/30 rounded-xl border border-teal-500/40 space-y-3">
                    <div className="flex items-center gap-2">
                      <Code className="w-5 h-5 text-teal-400" />
                      <h4 className="font-bold text-white text-sm">
                        {language === 'en' ? 'GitHub Deployment: Download portfolioData.ts' : 'गिटहब डिप्लॉय: portfolioData.ts डाउनलोड करें'}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {language === 'en'
                        ? 'Download your complete customized portfolio data as a pure TypeScript file. You can simply replace "src/data/portfolioData.ts" in your GitHub repository and deploy on Vercel or GitHub Pages forever without any risk of data loss.'
                        : 'अपने कस्टमाइज़ किए गए पूरे डेटा को "portfolioData.ts" फ़ाइल के रूप में डाउनलोड करें। इसे अपनी GitHub रिपॉजिटरी में डालकर हमेशा के लिए डिप्लॉय कर सकते हैं।'}
                    </p>
                    <button
                      onClick={handleDownloadStaticSourceCode}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Download portfolioData.ts' : 'portfolioData.ts डाउनलोड करें'}</span>
                    </button>
                  </div>

                  {/* JSON Backup */}
                  <div className="p-5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <Download className="w-4 h-4 text-teal-400" />
                      <span>{language === 'en' ? 'Export 1-Click JSON Backup' : '1-क्लिक बैकअप JSON डाउनलोड करें'}</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {language === 'en'
                        ? 'Download a snapshot JSON backup of your customized profile photo, contact details, and project records.'
                        : 'अपनी कस्टमाइज़ की गई फ़ोटो, प्रोफ़ाइल और प्रोजेक्ट्स का 1-क्लिक बैकअप JSON फ़ाइल डाउनलोड करें।'}
                    </p>
                    <button
                      onClick={handleExportBackupJson}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 font-semibold rounded-lg text-xs border border-slate-700 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Download JSON Backup' : 'बैकअप JSON डाउनलोड करें'}</span>
                    </button>
                  </div>

                  {/* Restore from JSON */}
                  <div className="p-5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <FileUp className="w-4 h-4 text-teal-400" />
                      <span>{language === 'en' ? 'Restore from Backup JSON' : 'बैकअप फ़ाइल से रीस्टोर करें'}</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {language === 'en'
                        ? 'Upload a previously exported JSON backup to instantly restore your entire website configuration.'
                        : 'पहले डाउनलोड की गई बैकअप JSON फ़ाइल अपलोड करके तुरंत पूरी वेबसाइट सेटिंग्स वापस पाएं।'}
                    </p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 font-semibold rounded-lg text-xs border border-slate-700 transition-colors cursor-pointer">
                      <FileUp className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Upload Backup JSON' : 'बैकअप JSON फ़ाइल चुनें'}</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportBackupJson}
                        className="sr-only"
                      />
                    </label>
                  </div>

                  {/* Factory Reset */}
                  <div className="p-5 bg-rose-950/20 rounded-xl border border-rose-900/40 space-y-3">
                    <h4 className="font-bold text-rose-300 text-sm flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-rose-400" />
                      <span>{language === 'en' ? 'Factory Reset All Data' : 'पूरी वेबसाइट को रीसेट करें'}</span>
                    </h4>
                    <p className="text-xs text-rose-200/80 leading-relaxed">
                      {language === 'en'
                        ? 'Clear all custom localStorage data and restore Vishwajit original presets.'
                        : 'सभी स्थानीय बदलाव साफ़ करें और मूल डिफ़ॉल्ट डेटा व ओरिजिनल फ़ोटो पर वापस लौटें।'}
                    </p>
                    <button
                      onClick={handleResetEntireWebsite}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-rose-900/60 hover:bg-rose-800 text-rose-100 font-semibold rounded-lg text-xs transition-colors border border-rose-700 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Reset Everything to Default' : 'सभी कुछ रीसेट करें'}</span>
                    </button>
                  </div>

                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-3.5 sm:p-4 border-t border-slate-800 bg-slate-950 shrink-0 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>All changes persist automatically in browser localStorage</span>
              </span>

              <button
                onClick={onClose}
                className="px-4 py-1.5 font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors cursor-pointer"
              >
                {language === 'en' ? 'Done & Close' : 'पूर्ण व बंद करें'}
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
