import React, { useState, useEffect } from 'react';
import { Language, ProjectData } from '../types';
import { initialProjects, suggestedProjects } from '../data/portfolioData';
import { ProjectDetailModal } from './ProjectDetailModal';
import { SqlQueryExplorer } from './SqlQueryExplorer';
import { 
  FolderGit2, 
  ExternalLink, 
  Edit3, 
  Save, 
  RotateCcw, 
  AlertCircle, 
  Lightbulb, 
  Check, 
  Database, 
  BarChart, 
  TrendingUp, 
  FileCode,
  Tag,
  Search
} from 'lucide-react';

interface ProjectsProps {
  language: Language;
}

export const Projects: React.FC<ProjectsProps> = ({ language }) => {
  const [projects, setProjects] = useState<ProjectData[]>(() => {
    const saved = localStorage.getItem('vishwajit_portfolio_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved projects', e);
      }
    }
    return initialProjects;
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProjectData | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [saveToast, setSaveToast] = useState(false);
  const [detailProject, setDetailProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    localStorage.setItem('vishwajit_portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  const startEditing = (project: ProjectData) => {
    setEditingId(project.id);
    setFormData({ ...project });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setFormData(null);
  };

  const handleFieldChange = (field: keyof ProjectData, value: any) => {
    if (formData) {
      setFormData({
        ...formData,
        [field]: value
      });
    }
  };

  const saveEditing = () => {
    if (formData && editingId) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...formData, isPlaceholder: false }
            : p
        )
      );
      setEditingId(null);
      setFormData(null);
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
    }
  };

  const resetAllProjects = () => {
    if (window.confirm(language === 'en' ? 'Reset all project cards to default placeholders?' : 'क्या आप सभी प्रोजेक्ट कार्ड्स को डिफ़ॉल्ट प्लेसहोल्डर्स पर रीसेट करना चाहते हैं?')) {
      setProjects(initialProjects);
      localStorage.removeItem('vishwajit_portfolio_projects');
    }
  };

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="projects" className="py-20 border-b border-slate-800/60 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
              <span>{language === 'en' ? '01. Portfolio Projects' : '01. पोर्टफोलियो प्रोजेक्ट्स'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              {language === 'en' ? 'Featured Data Analytics Projects' : 'विशेष डेटा एनालिटिक्स प्रोजेक्ट्स'}
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-300">
              {language === 'en'
                ? 'End-to-end analytical case studies showcasing SQL relational queries, Power BI interactive dashboards, and business decision impact.'
                : 'SQL रिलेशनल क्वेरी, Power BI इंटरैक्टिव डैशबोर्ड और ठोस व्यावसायिक इनसाइट्स प्रदर्शित करने वाले पूर्ण विश्लेषणात्मक प्रोजेक्ट्स।'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={resetAllProjects}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors cursor-pointer"
              title="Reset cards back to default state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Reset Defaults' : 'डिफ़ॉल्ट रीसेट करें'}</span>
            </button>
          </div>
        </div>

        {saveToast && (
          <div className="mb-6 p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{language === 'en' ? 'Project card updated and saved locally in your browser!' : 'प्रोजेक्ट कार्ड अपडेट हो गया और ब्राउज़र में सुरक्षित हो गया!'}</span>
          </div>
        )}

        {/* 3 Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {projects.map((proj, index) => {
            const isEditing = editingId === proj.id;

            return (
              <div
                key={proj.id}
                className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all relative overflow-hidden group shadow-lg"
              >
                {/* Top status banner */}
                <div className="mb-4 flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <span className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider font-mono">
                    {`Project 0${index + 1} · ${proj.category}`}
                  </span>
                  
                  <span className="inline-flex items-center gap-1 text-[11px] text-teal-300 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/40">
                    <Check className="w-3 h-3 text-teal-400" />
                    <span>{language === 'en' ? 'Featured Case Study' : 'विशेष केस स्टडी'}</span>
                  </span>
                </div>

                {/* Edit Form Mode vs Display Mode */}
                {isEditing && formData ? (
                  <div className="space-y-3 text-xs text-slate-300 flex-1">
                    <div>
                      <label className="block text-[11px] font-semibold text-teal-300 mb-1">
                        {language === 'en' ? 'Project Title' : 'प्रोजेक्ट शीर्षक'}
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleFieldChange('title', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-xs focus:border-teal-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-teal-300 mb-1">
                        {language === 'en' ? 'Tools (comma separated)' : 'उपकरण (अल्पविराम से अलग)'}
                      </label>
                      <input
                        type="text"
                        value={formData.tools.join(', ')}
                        onChange={(e) => handleFieldChange('tools', e.target.value.split(',').map(s => s.trim()))}
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-xs focus:border-teal-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-teal-300 mb-1">
                        {language === 'en' ? 'Problem Statement' : 'समस्या विवरण'}
                      </label>
                      <textarea
                        rows={2}
                        value={formData.problem}
                        onChange={(e) => handleFieldChange('problem', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-xs focus:border-teal-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-teal-300 mb-1">
                        {language === 'en' ? 'Dataset & Scope' : 'डेटासेट स्रोत व आकार'}
                      </label>
                      <input
                        type="text"
                        value={formData.dataset}
                        onChange={(e) => handleFieldChange('dataset', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-xs focus:border-teal-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-teal-300 mb-1">
                        {language === 'en' ? 'Methodology / Query Process' : 'विश्लेषण व क्वेरी प्रक्रिया'}
                      </label>
                      <textarea
                        rows={2}
                        value={formData.process}
                        onChange={(e) => handleFieldChange('process', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-xs focus:border-teal-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-teal-300 mb-1">
                        {language === 'en' ? 'Key Analytical Insight' : 'मुख्य इनसाइट'}
                      </label>
                      <input
                        type="text"
                        value={formData.keyInsight}
                        onChange={(e) => handleFieldChange('keyInsight', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-xs focus:border-teal-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-teal-300 mb-1">
                        {language === 'en' ? 'Business Outcome / Result' : 'परिणाम व प्रभाव'}
                      </label>
                      <input
                        type="text"
                        value={formData.businessResult}
                        onChange={(e) => handleFieldChange('businessResult', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-xs focus:border-teal-400 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-teal-300 mb-1">GitHub URL</label>
                        <input
                          type="text"
                          value={formData.githubUrl}
                          onChange={(e) => handleFieldChange('githubUrl', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-xs focus:border-teal-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-teal-300 mb-1">Live Demo / Dashboard URL</label>
                        <input
                          type="text"
                          value={formData.demoUrl}
                          onChange={(e) => handleFieldChange('demoUrl', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-xs focus:border-teal-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                      <button
                        onClick={cancelEditing}
                        className="px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 rounded transition-colors"
                      >
                        {language === 'en' ? 'Cancel' : 'रद्द करें'}
                      </button>
                      <button
                        onClick={saveEditing}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded transition-colors"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Save Card' : 'सहेजें'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 flex-1">
                    
                    {/* Project Title */}
                    <div>
                      <h3 className="text-lg font-bold text-white leading-snug group-hover:text-teal-300 transition-colors">
                        {proj.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {proj.tools.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-950 text-slate-300 border border-slate-800"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Detailed Fields */}
                    <div className="space-y-2.5 text-xs text-slate-300">
                      
                      <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/80">
                        <span className="font-semibold text-teal-400 block mb-0.5">
                          {language === 'en' ? 'Business Problem:' : 'समस्या विवरण:'}
                        </span>
                        <p className="text-slate-300 leading-relaxed font-normal">
                          {proj.problem}
                        </p>
                      </div>

                      <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/80">
                        <span className="font-semibold text-teal-400 block mb-0.5">
                          {language === 'en' ? 'Dataset & Scope:' : 'डेटासेट:'}
                        </span>
                        <p className="text-slate-400 leading-relaxed">
                          {proj.dataset}
                        </p>
                      </div>

                      <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/80">
                        <span className="font-semibold text-teal-400 block mb-0.5">
                          {language === 'en' ? 'Analytical Process:' : 'विश्लेषण प्रक्रिया:'}
                        </span>
                        <p className="text-slate-400 leading-relaxed">
                          {proj.process}
                        </p>
                      </div>

                      <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/80">
                        <span className="font-semibold text-teal-400 block mb-0.5">
                          {language === 'en' ? 'Key Finding / Insight:' : 'मुख्य इनसाइट:'}
                        </span>
                        <p className="text-teal-200 leading-relaxed font-medium">
                          {proj.keyInsight}
                        </p>
                      </div>

                      <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/80">
                        <span className="font-semibold text-teal-400 block mb-0.5">
                          {language === 'en' ? 'Result / Business Action:' : 'परिणाम व प्रभाव:'}
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {proj.businessResult}
                        </p>
                      </div>

                    </div>

                    {/* Interactive Deep-Dive Inspection Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => setDetailProject(proj)}
                        className="w-full py-2 px-3 bg-teal-950/50 hover:bg-teal-900/60 text-teal-300 hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-teal-800/60 shadow-xs cursor-pointer"
                      >
                        <Search className="w-3.5 h-3.5 text-teal-400" />
                        <span>{language === 'en' ? 'Inspect Analysis, SQL & Metrics' : 'विश्लेषण, SQL व मेट्रिक्स देखें'}</span>
                      </button>
                    </div>

                    {/* Links & Affordances */}
                    <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 min-w-[120px] py-2 px-3 bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg text-xs font-medium border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <FolderGit2 className="w-3.5 h-3.5 text-teal-400" />
                          <span>Code Repo</span>
                        </a>

                        <a
                          href={proj.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 min-w-[120px] py-2 px-3 bg-teal-950/40 hover:bg-teal-900/50 text-teal-300 hover:text-teal-200 rounded-lg text-xs font-semibold border border-teal-800/50 hover:border-teal-700 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Dashboard</span>
                        </a>
                      </div>

                      <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                        <button
                          onClick={() => handleCopyLink(proj.githubUrl, proj.id)}
                          className="hover:text-teal-300 transition-colors cursor-pointer"
                        >
                          {copiedId === proj.id ? '✓ Link Copied' : 'Copy Repo Link'}
                        </button>

                        <button
                          onClick={() => startEditing(proj)}
                          className="text-slate-400 hover:text-teal-300 transition-colors flex items-center gap-1 cursor-pointer"
                          title="Edit card details locally"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>{language === 'en' ? 'Edit Details' : 'संपादित करें'}</span>
                        </button>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Interactive SQL Query Simulator Section */}
        <div className="mb-16">
          <SqlQueryExplorer language={language} />
        </div>

        {/* Industry Analytical Frameworks Section */}
        <div className="mt-16 pt-12 border-t border-slate-800/80">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
              <Lightbulb className="w-3.5 h-3.5 text-teal-400" />
              <span>{language === 'en' ? 'Industry Problem-Solving Frameworks' : 'उद्योग विश्लेषणात्मक फ्रेमवर्क'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {language === 'en' 
                ? 'Core Analytical Use Cases & Solutions' 
                : 'प्रमुख विश्लेषणात्मक उपयोग मामले व समाधान'}
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              {language === 'en'
                ? 'Standard enterprise data challenges Vishwajit is equipped to tackle using SQL data modeling, Power BI visualization, and spreadsheet automation.'
                : 'मानक व्यावसायिक डेटा चुनौतियाँ जिन्हें विश्वजीत SQL डेटा मॉडलिंग, Power BI विज़ुअलाइज़ेशन और स्प्रेडशीट ऑटोमेशन द्वारा हल करने में सक्षम हैं।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suggestedProjects.map((idea, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-teal-400 uppercase tracking-wider font-semibold">
                    {`Framework 0${idx + 1}`}
                  </span>
                  <span className="text-[10px] text-teal-300 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/40">
                    {language === 'en' ? 'Industry Standard' : 'उद्योग मानक'}
                  </span>
                </div>

                <h4 className="text-base font-semibold text-white">
                  {idea.title[language]}
                </h4>

                <div className="flex flex-wrap gap-1.5">
                  {idea.recommendedTools.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-teal-300 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-400 block font-medium">
                      {language === 'en' ? 'Objective:' : 'उद्देश्य:'}
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {idea.objective[language]}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">
                      {language === 'en' ? 'Suggested Dataset:' : 'सुझाया गया डेटासेट:'}
                    </span>
                    <p className="text-slate-400 leading-relaxed">
                      {idea.suggestedDataset[language]}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">
                      {language === 'en' ? 'Why Hiring Managers Value This:' : 'यह क्यों महत्वपूर्ण है:'}
                    </span>
                    <p className="text-teal-300/90 leading-relaxed">
                      {idea.whyItMatters[language]}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Deep-Dive Project Modal */}
      <ProjectDetailModal
        project={detailProject}
        isOpen={Boolean(detailProject)}
        onClose={() => setDetailProject(null)}
        language={language}
      />
    </section>
  );
};
