import React from 'react';
import { Language } from '../types';
import { X, CheckSquare, Sparkles, FolderGit2, Calendar, FileText, UserCheck, ExternalLink } from 'lucide-react';

interface PlaceholdersGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const PlaceholdersGuideModal: React.FC<PlaceholdersGuideModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  if (!isOpen) return null;

  const checklistItems = [
    {
      icon: FolderGit2,
      title: language === 'en' ? '1. Portfolio Project Details' : '1. पोर्टफोलियो प्रोजेक्ट विवरण',
      where: language === 'en' ? 'Section: Projects (Cards 1, 2, and 3)' : 'सेक्शन: प्रोजेक्ट्स (कार्ड 1, 2, और 3)',
      status: language === 'en' ? 'Needs Your Real Projects' : 'आपके वास्तविक प्रोजेक्ट्स की आवश्यकता है',
      details: language === 'en'
        ? 'Click "Edit This Project Card" on the 3 cards in the Projects section. Replace the bracketed fields with your actual analyses: Project Title, Business Problem, Dataset used, SQL/Power BI process, Major Insight, and GitHub / Live Demo links.'
        : 'प्रोजेक्ट्स सेक्शन में 3 कार्ड्स पर "इस कार्ड को संपादित करें" पर क्लिक करें। अपने वास्तविक प्रोजेक्ट के अनुसार शीर्षक, समस्या, डेटासेट, प्रक्रिया, इनसाइट्स और गिटहब लिंक भरें।'
    },
    {
      icon: Calendar,
      title: language === 'en' ? '2. Work Experience Employment Dates' : '2. कार्य अनुभव की तिथियां',
      where: language === 'en' ? 'Section: Work Experience' : 'सेक्शन: कार्य अनुभव',
      status: language === 'en' ? 'Needs Service Dates' : 'सेवा तिथियां जोड़ने की आवश्यकता है',
      details: language === 'en'
        ? 'In the School Office (Kushinagar) and Bank Office CSC (Rambag) experience cards, replace "[Add Employment Period / काम की अवधि जोड़ें]" with your actual duration of work (e.g. "Jun 2023 – Nov 2023").'
        : 'स्कूल ऑफिस और बैंक ऑफिस (सीएससी) अनुभव कार्ड में "[काम की अवधि जोड़ें]" की जगह अपनी वास्तविक कार्य अवधि (उदा. "जून 2023 – नवम्बर 2023") लिखें।'
    },
    {
      icon: ExternalLink,
      title: language === 'en' ? '3. GitHub Profile URL' : '3. गिटहब प्रोफ़ाइल लिंक',
      where: language === 'en' ? 'Section: Contact & Project Links' : 'सेक्शन: संपर्क व प्रोजेक्ट लिंक्स',
      status: language === 'en' ? 'Needs Your GitHub Link' : 'गिटहब लिंक आवश्यक है',
      details: language === 'en'
        ? 'Replace "[Add your GitHub profile link / अपना GitHub प्रोफ़ाइल लिंक जोड़ें]" in the Contact section with your actual URL (e.g. https://github.com/your-username).'
        : 'संपर्क सेक्शन में "[अपना GitHub लिंक जोड़ें]" की जगह अपना वास्तविक गिटहब लिंक (उदा. https://github.com/your-username) डालें।'
    },
    {
      icon: FileText,
      title: language === 'en' ? '4. Resume Download PDF' : '4. रेज़्यूमे डाउनलोड PDF फ़ाइल',
      where: language === 'en' ? 'Header & Hero CTA: "Download Resume"' : 'हेडर व हीरो CTA: "रेज़्यूमे डाउनलोड"',
      status: language === 'en' ? 'Add PDF file or Drive Link' : 'PDF फ़ाइल या ड्राइव लिंक जोड़ें',
      details: language === 'en'
        ? 'To let employers download your PDF resume directly, place your compiled PDF named "resume.pdf" in the project\'s "/public" folder. In the meantime, you or recruiters can use the "Print / Save PDF" button inside the Resume modal.'
        : 'नियोक्ताओं को सीधे PDF डाउनलोड की सुविधा देने के लिए, अपनी संकलित PDF फ़ाइल को "/public/resume.pdf" के रूप में रखें या गूगल ड्राइव लिंक जोड़ें। तब तक आप रेज़्यूमे मोडल में "प्रिंट / सेव PDF" से इसे सेव कर सकते हैं।'
    },
    {
      icon: UserCheck,
      title: language === 'en' ? '5. Optional Profile Photo' : '5. ऐच्छिक प्रोफ़ाइल फ़ोटो',
      where: language === 'en' ? 'Section: Hero Avatar Box' : 'सेक्शन: हीरो अवतार बॉक्स',
      status: language === 'en' ? 'Optional Upload' : 'ऐच्छिक अपलोड',
      details: language === 'en'
        ? 'Per your instructions, no fake AI-generated portrait has been placed. You can click the camera/upload icon in the hero avatar card to preview your real professional headshot.'
        : 'आपके निर्देशानुसार, कोई नकली AI चेहरा नहीं बनाया गया है। आप हीरो अवतार बॉक्स में कैमरा/अपलोड बटन पर क्लिक करके अपनी वास्तविक पेशेवर फोटो जोड़ सकते हैं।'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm overflow-hidden">
      <div className="relative w-full max-w-3xl max-h-[92dvh] sm:max-h-[88vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden my-auto">
        
        {/* Modal Header - Fixed */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-slate-800 bg-slate-950 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-teal-950/80 border border-teal-500/40 flex items-center justify-center text-teal-400 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {language === 'en' ? 'Portfolio Customization Checklist' : 'पोर्टफोलियो कस्टमाइज़ेशन चेकलिस्ट'}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">
                {language === 'en' ? 'Quick tips to personalize your live portfolio' : 'पोर्टफोलियो को निजीकृत करने हेतु सुझाव'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list - Scrollable */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto overscroll-contain space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/80 p-3 sm:p-3.5 rounded-xl border border-slate-800">
            {language === 'en'
              ? 'Your portfolio is pre-configured with 3 professional Data Analyst projects, verified coursework, and operational experience. Review these optional customization items below:'
              : 'आपका पोर्टफोलियो 3 प्रामाणिक डेटा एनालिटिक्स प्रोजेक्ट्स, कोर्सवर्क और कार्य अनुभव के साथ सुसज्जित है। नीचे दिए गए ऐच्छिक कस्टमाइज़ेशन आइटम देखें:'}
          </p>

          <div className="space-y-3 pt-1">
            {checklistItems.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1.5 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-md bg-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                        <ItemIcon className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {item.title}
                      </h4>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono text-teal-300 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/40 shrink-0">
                      {item.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-teal-400 font-mono">
                    {item.where}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.details}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="p-3.5 sm:p-4 border-t border-slate-800 bg-slate-950 shrink-0 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors cursor-pointer"
          >
            {language === 'en' ? 'Close' : 'बंद करें'}
          </button>
        </div>

      </div>
    </div>
  );
};
