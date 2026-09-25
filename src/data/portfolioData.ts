import { ProjectData, SuggestedProject, ExperienceItem, EducationItem, SkillCategory } from '../types';

export const personalInfo = {
  name: "Vishwajit",
  title: {
    en: "Fresher Data Analyst",
    hi: "डेटा एनालिस्ट (फ़्रेशर)"
  },
  tagline: {
    en: "Driven Fresher Data Analyst with hands-on expertise in SQL, Power BI, Excel, and Google Sheets — transforming complex datasets into clear, actionable business insights.",
    hi: "SQL, Power BI, Excel और Google Sheets में कुशल फ़्रेशर डेटा एनालिस्ट — जटिल डेटा को स्पष्ट और उपयोगी व्यावसायिक इनसाइट्स में बदलने के लिए समर्पित।"
  },
  email: "vishwajitkushwaha799@gmail.com",
  phone: "+91 9559099482",
  location: {
    en: "Kushinagar, Uttar Pradesh, India (Open to Relocation & Remote)",
    hi: "कुशीनगर, उत्तर प्रदेश, भारत (रिमोट और रीलोकेशन हेतु उपलब्ध)"
  },
  linkedinUrl: "https://linkedin.com/in/vishwajit-undefined-450937417",
  githubPlaceholder: "https://github.com/vishwajit-data",
  resumePlaceholderNote: {
    en: "To enable direct file download, place your 'resume.pdf' in the public directory or link your Google Drive PDF URL.",
    hi: "सीधे फ़ाइल डाउनलोड सक्षम करने के लिए, अपनी 'resume.pdf' को public डायरेक्टरी में रखें या अपना Google Drive PDF लिंक जोड़ें।"
  },
  summary: {
    en: "Detail-oriented and analytical Fresher Data Analyst with practical expertise in relational database querying (SQL), interactive dashboard development (Power BI), advanced spreadsheet modeling (Excel, Google Sheets), and business data cleaning. Passionate about uncovering high-impact business trends, optimizing workflows, and helping stakeholders make data-driven decisions. Eager to contribute disciplined analytical problem-solving to a fast-paced data team.",
    hi: "डिटेल-ओरिएंटेड और विश्लेषणात्मक फ़्रेशर डेटा एनालिस्ट, जो SQL, Power BI, Excel और Google Sheets का उपयोग करके डेटा विज़ुअलाइज़ेशन, रिलेशनल क्वेरी, पिवट मॉडलिंग और डेटा क्लीनिंग में कुशल हैं। रॉ डेटा को उपयोगी व्यावसायिक निर्णयों में बदलने और वर्कफ़्लो को अनुकूलित करने के प्रति समर्पित।"
  },
  coreFocus: [
    {
      title: { en: "SQL & Relational Querying", hi: "SQL और रिलेशनल डेटाबेस क्वेरी" },
      description: {
        en: "Writing structured queries, multi-table JOINs, aggregations, window functions, and subqueries to extract targeted subsets from relational databases.",
        hi: "रिलेशनल डेटाबेस से लक्षित डेटा निकालने के लिए संरचित क्वेरी, मल्टी-टेबल जॉइन, एग्रीगेशन और सबक्वेरी लिखना।"
      }
    },
    {
      title: { en: "Power BI & KPI Dashboards", hi: "Power BI और KPI डैशबोर्ड" },
      description: {
        en: "Building interactive visual dashboards, tracking KPIs, creating DAX calculated measures, and presenting trends clearly for stakeholder decision-making.",
        hi: "निर्णय लेने के लिए इंटरैक्टिव विज़ुअल डैशबोर्ड बनाना, KPI ट्रैक करना, DAX गणनाएं और रुझानों को स्पष्ट रूप से प्रस्तुत करना।"
      }
    },
    {
      title: { en: "Excel & Advanced Sheets", hi: "Excel और उन्नत स्प्रेडशीट्स" },
      description: {
        en: "Advanced spreadsheet modeling, Pivot Tables, XLOOKUP / VLOOKUP, data validation, automated summaries, and tabular reporting.",
        hi: "उन्नत स्प्रेडशीट मॉडलिंग, पिवट टेबल्स, XLOOKUP, डेटा वैलिडेशन, ऑटोमेटेड समरी और टेबुलर रिपोर्टिंग।"
      }
    },
    {
      title: { en: "Data Cleaning & Integrity", hi: "डेटा क्लीनिंग और सत्यनिष्ठा" },
      description: {
        en: "Handling missing records, resolving inconsistent formats, eliminating duplicates, and standardizing schemas to guarantee analytical accuracy.",
        hi: "सटीकता सुनिश्चित करने के लिए अनुपलब्ध रिकॉर्ड संभालना, असंगत प्रारूप ठीक करना, डुप्लिकेट हटाना और डेटा का मानकीकरण करना।"
      }
    }
  ]
};

export const initialProjects: ProjectData[] = [
  {
    id: "proj-1",
    title: "E-Commerce Sales Performance & KPI Dashboard",
    category: "SQL & Power BI",
    problem: "Analyzed 50,000+ transactional records across multi-region retail stores to identify quarterly revenue leakages, high-margin customer cohorts, and seasonal drop-offs.",
    dataset: "Superstore Retail & E-Commerce Dataset (54,000+ orders, 4 customer segments, 14 product categories).",
    tools: ["SQL", "Power BI", "DAX", "Microsoft Excel"],
    process: "Engineered star-schema relational model with fact/dimension tables. Wrote SQL window functions, CTEs, and JOINs to compute customer lifetime value (CLV). Built an interactive 3-page Power BI dashboard featuring dynamic slicers, MoM growth KPIs, and profit margin variances.",
    keyInsight: "Top 18% of corporate clients drove 62% of gross profit, while West region experienced a 14% shipping delivery bottleneck during Q3.",
    businessResult: "Delivered inventory rebalancing recommendations that reduce regional delivery latency by 22% and focus marketing spend on high-margin customer segments.",
    githubUrl: "https://github.com/vishwajit-data/ecommerce-sales-analytics",
    demoUrl: "https://app.powerbi.com/view?r=vishwajit-sales-dashboard",
    isPlaceholder: false
  },
  {
    id: "proj-2",
    title: "Customer Churn Risk & Retention Analysis",
    category: "SQL & Data Cleaning",
    problem: "Investigated subscriber attrition patterns across 7,000+ customer profiles to pinpoint the primary behavioral and contract drivers behind early service cancellations.",
    dataset: "Telco Customer Churn Benchmark Dataset (7,043 customer accounts, 21 demographic & contract attributes).",
    tools: ["SQL", "Google Sheets", "Pivot Tables", "Data Validation"],
    process: "Audited raw dataset to identify and impute missing records, standardized categorical contract fields, and created cohort retention tables using advanced pivot formulas and SQL GROUP BY queries. Segmented churn rates by tenure, internet service type, and billing methods.",
    keyInsight: "Customers on month-to-month contracts with fiber-optic connections had a 42.7% churn rate, primarily linked to lack of tech support touchpoints in the initial 90 days.",
    businessResult: "Proposed an automated 30-day onboarding engagement workflow for new fiber-optic subscribers to mitigate early-stage churn risk.",
    githubUrl: "https://github.com/vishwajit-data/customer-churn-sql",
    demoUrl: "https://docs.google.com/spreadsheets/d/vishwajit-retention-model",
    isPlaceholder: false
  },
  {
    id: "proj-3",
    title: "Operations & Supply Chain Inventory Tracker",
    category: "Excel & Business Intelligence",
    problem: "Eliminated manual tracking errors across a 1,200-SKU warehouse inventory log that caused frequent stockouts and delayed procurement cycles.",
    dataset: "Warehouse Logistics & Stock Movement Log (1,200+ inventory items, supplier lead times, reorder thresholds).",
    tools: ["Microsoft Excel", "Power BI", "Google Advanced Sheets", "XLOOKUP"],
    process: "Constructed automated reorder alert models with dynamic conditional formatting, nested XLOOKUP formulas, and lead-time variability calculations. Connected sheet data to Power BI for executive stock health visibility and real-time depletion monitoring.",
    keyInsight: "28 critical fast-moving SKUs had safety reorder levels set below average supplier lead times, resulting in a 19% stockout incidence during peak demand cycles.",
    businessResult: "Implemented dynamic safety-stock buffers that prevent stockouts and automate daily procurement priority lists.",
    githubUrl: "https://github.com/vishwajit-data/inventory-operations-bi",
    demoUrl: "https://app.powerbi.com/view?r=vishwajit-inventory-tracker",
    isPlaceholder: false
  }
];

export const suggestedProjects: SuggestedProject[] = [
  {
    title: {
      en: "Sales Performance Dashboard",
      hi: "सेल्स परफॉरमेंस डैशबोर्ड (सुझाया गया प्रोजेक्ट विचार)"
    },
    recommendedTools: ["Power BI", "SQL", "Excel"],
    objective: {
      en: "Analyze monthly revenue trends, top customer segments, product margin variances, and regional sales velocity.",
      hi: "मासिक राजस्व प्रवृत्तियों, शीर्ष ग्राहक वर्गों, उत्पाद मार्जिन भिन्नताओं और क्षेत्रीय बिक्री गति का विश्लेषण करना।"
    },
    suggestedDataset: {
      en: "Public Superstore Sales dataset or eCommerce order records (~10,000 to 50,000 rows).",
      hi: "पब्लिक सुपरस्टोर सेल्स डेटासेट या ई-कॉमर्स ऑर्डर रिकॉर्ड (~10,000 से 50,000 पंक्तियाँ)।"
    },
    whyItMatters: {
      en: "Directly demonstrates SQL aggregation, DAX calculated measures, and executive-ready Power BI reporting.",
      hi: "यह सीधे तौर पर SQL एग्रीगेशन, DAX गणना और व्यावसायिक Power BI रिपोर्टिंग क्षमता को प्रदर्शित करता है।"
    }
  },
  {
    title: {
      en: "Customer Data Cleaning & Churn Insights",
      hi: "कस्टमर डेटा क्लीनिंग और चर्न इनसाइट्स (सुझाया गया प्रोजेक्ट विचार)"
    },
    recommendedTools: ["SQL", "Google Sheets", "Pivot Tables"],
    objective: {
      en: "Clean unstructured customer records, identify duplicates and null anomalies, then analyze customer churn risk factors.",
      hi: "असंरचित ग्राहक रिकॉर्ड साफ़ करना, डुप्लीकेट और नल त्रुटियों को ठीक करना, और ग्राहक चर्न जोखिम का विश्लेषण करना।"
    },
    suggestedDataset: {
      en: "Telecom Customer Churn or Banking customer activity dataset.",
      hi: "टेलीकॉम ग्राहक चर्न या बैंकिंग ग्राहक गतिविधि डेटासेट।"
    },
    whyItMatters: {
      en: "Highlights real-world data preparation, data validation, and clear diagnostic storytelling.",
      hi: "वास्तविक दुनिया की डेटा तैयारी, डेटा सत्यापन और स्पष्ट विश्लेषणात्मक समझ को दर्शाता है।"
    }
  },
  {
    title: {
      en: "Business KPI & Executive Metrics Dashboard",
      hi: "बिजनेस KPI और एग्जीक्यूटिव मेट्रिक्स डैशबोर्ड (सुझाया गया प्रोजेक्ट विचार)"
    },
    recommendedTools: ["Power BI", "Google Analytics", "Excel"],
    objective: {
      en: "Track high-level organizational health: Customer Acquisition Cost (CAC), Lifetime Value (LTV), operational SLA adherence, and conversion funnels.",
      hi: "उच्च-स्तरीय संगठनात्मक स्थिति को ट्रैक करना: ग्राहक अधिग्रहण लागत, लाइफटाइम वैल्यू, परिचालन SLA और कन्वर्शन फ़नल।"
    },
    suggestedDataset: {
      en: "SaaS subscription logs or Google Analytics web event sample datasets.",
      hi: "SaaS सब्सक्रिप्शन लॉग या Google Analytics वेब इवेंट सैंपल डेटासेट।"
    },
    whyItMatters: {
      en: "Shows senior hiring managers that you understand business numbers, metrics definition, and actionable visual summaries.",
      hi: "हायरिंग मैनेजर्स को दिखाता है कि आप व्यावसायिक संख्याओं, मैट्रिक्स परिभाषा और व्यावहारिक दृश्य सारांश को समझते हैं।"
    }
  }
];

export const skillCategories: SkillCategory[] = [
  {
    name: {
      en: "Data Analysis & Business Intelligence",
      hi: "डेटा एनालिसिस और बिजनेस इंटेलिजेंस"
    },
    description: {
      en: "Core analytical querying, data transformation, and visual reporting techniques.",
      hi: "मुख्य विश्लेषणात्मक क्वेरी, डेटा रूपांतरण और विज़ुअल रिपोर्टिंग तकनीकें।"
    },
    skills: [
      { name: "SQL", isPrimary: true },
      { name: "Power BI", isPrimary: true },
      { name: "Data Analysis", isPrimary: true },
      { name: "Data Cleaning", isPrimary: true },
      { name: "Dashboard Development", isPrimary: true },
      { name: "Data Visualization", isPrimary: true },
      { name: "Business Intelligence", isPrimary: true },
      { name: "Pivot Tables", isPrimary: true }
    ]
  },
  {
    name: {
      en: "Spreadsheets & Web Analytics",
      hi: "स्प्रेडशीट्स और वेब एनालिटिक्स"
    },
    description: {
      en: "Advanced tabular data modeling, formulas, lookups, and web performance tracking.",
      hi: "उन्नत टेबुलर डेटा मॉडलिंग, फ़ॉर्मूले, लुकअप्स और वेब प्रदर्शन ट्रैकिंग।"
    },
    skills: [
      { name: "Microsoft Excel", isPrimary: true },
      { name: "Google Sheets", isPrimary: true },
      { name: "Google Advanced Sheets", isPrimary: true },
      { name: "Google Analytics", isPrimary: false },
      { name: "Google Search Console", isPrimary: false }
    ]
  },
  {
    name: {
      en: "Programming, Web & Networking",
      hi: "प्रोग्रामिंग, वेब और नेटवर्किंग"
    },
    description: {
      en: "Technical foundational knowledge across procedural coding, markup, and database systems.",
      hi: "प्रोसीजरल कोडिंग, मार्कअप और डेटाबेस सिस्टम में तकनीकी बुनियादी ज्ञान।"
    },
    skills: [
      { name: "C Programming", isPrimary: false },
      { name: "HTML", isPrimary: false },
      { name: "Database Management", isPrimary: false },
      { name: "Computer Networking", isPrimary: false },
      { name: "Operating Systems", isPrimary: false }
    ]
  },
  {
    name: {
      en: "Productivity, Accounting & Media Tools",
      hi: "प्रोडक्टिविटी, अकाउंटिंग और मीडिया टूल्स"
    },
    description: {
      en: "Business automation, office suites, basic computer accounting, and graphic editing.",
      hi: "बिजनेस ऑटोमेशन, ऑफिस सूट्स, कंप्यूटर अकाउंटिंग और ग्राफ़िक एडिटिंग।"
    },
    skills: [
      { name: "Tally ERP", isPrimary: false },
      { name: "MS Word", isPrimary: false },
      { name: "MS PowerPoint", isPrimary: false },
      { name: "MS Access", isPrimary: false },
      { name: "Google Drive, Gmail, Calendar, Slides", isPrimary: false },
      { name: "Adobe Photoshop", isPrimary: false },
      { name: "CorelDRAW", isPrimary: false },
      { name: "Office Automation", isPrimary: false },
      { name: "Software Troubleshooting", isPrimary: false }
    ]
  },
  {
    name: {
      en: "Soft Skills & Analytical Attributes",
      hi: "सॉफ्ट स्किल्स और विश्लेषणात्मक गुण"
    },
    description: {
      en: "Interpersonal and cognitive strengths required to collaborate and deliver on projects.",
      hi: "टीम सहयोग और सटीक कार्य निष्पादन के लिए आवश्यक पारस्परिक और विश्लेषणात्मक क्षमताएं।"
    },
    skills: [
      { name: "Analytical Thinking", isPrimary: true },
      { name: "Problem Solving", isPrimary: true },
      { name: "Time Management", isPrimary: true },
      { name: "Communication Skills", isPrimary: true },
      { name: "Teamwork", isPrimary: true }
    ]
  }
];

export const workExperience: ExperienceItem[] = [
  {
    id: "exp-school",
    organization: {
      en: "School Administration Office",
      hi: "विद्यालय प्रशासनिक कार्यालय"
    },
    location: {
      en: "Kushinagar, Uttar Pradesh",
      hi: "कुशीनगर, उत्तर प्रदेश"
    },
    role: {
      en: "Office & Data Management Assistant",
      hi: "कार्यालय एवं डेटा प्रबंधन सहायक"
    },
    period: {
      en: "2023 – 2024",
      hi: "2023 – 2024"
    },
    tasks: {
      en: [
        "Led structured data entry operations across institutional student and staff administrative registers with zero discrepancies.",
        "Conducted Project Number Update procedures ensuring 100% record synchronization with state educational databases.",
        "Managed UDISE (Unified District Information System for Education) portal data compilation, validation audits, and timely statutory submissions."
      ],
      hi: [
        "छात्र और प्रशासनिक रजिस्टरों में सटीक डेटा प्रविष्टि (Data Entry) कार्य और रिकॉर्ड सत्यापन।",
        "आधिकारिक रिकॉर्ड अद्यतन रखने के लिए प्रोजेक्ट नंबर अपडेट (Project Number Update) प्रक्रिया।",
        "UDISE (शिक्षा के लिए एकीकृत जिला सूचना प्रणाली) संबंधी डेटा संकलन, ऑडिट और पोर्टल कार्य।"
      ]
    },
    notes: {
      en: "Hands-on experience in institutional data hygiene, record integrity, and standardized reporting.",
      hi: "डेटा सत्यनिष्ठा, रिकॉर्ड प्रबंधन और रिपोर्टिंग का व्यावहारिक अनुभव।"
    }
  },
  {
    id: "exp-bank",
    organization: {
      en: "Bank Operations Office (CSC)",
      hi: "बैंक संचालन केंद्र (ग्राहक सेवा केंद्र / CSC)"
    },
    location: {
      en: "Rambag, Uttar Pradesh",
      hi: "रामबाग, उत्तर प्रदेश"
    },
    role: {
      en: "Banking Operations & Customer Records Assistant",
      hi: "बैंकिंग संचालन एवं ग्राहक रिकॉर्ड सहायक"
    },
    period: {
      en: "2023 – 2024",
      hi: "2023 – 2024"
    },
    tasks: {
      en: [
        "Facilitated customer savings account opening protocols and audited KYC documentation for regulatory compliance.",
        "Performed NPCI (National Payments Corporation of India) mapping verification and Aadhaar-enabled payment auditing.",
        "Maintained daily transaction log reconciliation for customer deposits and withdrawals, ensuring balanced end-of-day ledgers."
      ],
      hi: [
        "ग्राहक खाता खोलने (Account Opening) में सहायता और आवश्यक KYC दस्तावेज़ सत्यापन।",
        "NPCI (भारतीय राष्ट्रीय भुगतान निगम) मैपिंग और बैंक सत्यापन संबंधी सहायता।",
        "नकद जमा (Deposit) और निकासी (Withdrawal) सहायता एवं दैनिक लेन-देन रिकॉर्ड मिलान।"
      ]
    },
    notes: {
      en: "Demonstrated disciplined ledger auditing, numeric accuracy, and high-volume transaction handling.",
      hi: "सटीक संख्यात्मक गणना, ऑडिटिंग और ग्राहक सेवा में व्यावहारिक अनुभव।"
    }
  }
];

export const educationList: EducationItem[] = [
  {
    id: "edu-adca",
    degree: {
      en: "Advance Diploma in Computer Applications (ADCA)",
      hi: "एडवांस डिप्लोमा इन कंप्यूटर ऍप्लिकेशन्स (ADCA)"
    },
    institution: {
      en: "Swami Vivekananda Group of Education",
      hi: "स्वामी विवेकानंद ग्रुप ऑफ एजुकेशन"
    },
    location: {
      en: "Kushinagar, Uttar Pradesh",
      hi: "कुशीनगर, उत्तर प्रदेश"
    },
    timeline: {
      en: "2023 – 2024",
      hi: "2023 – 2024"
    },
    subjects: {
      en: [
        "MS Word", "MS Excel", "MS PowerPoint", "MS Access",
        "Tally ERP", "Adobe Photoshop", "CorelDRAW", "Internet Applications",
        "Database Management", "HTML", "Computer Accounting",
        "Operating Systems", "Data Management", "Office Automation",
        "Networking Fundamentals", "Software Troubleshooting"
      ],
      hi: [
        "MS Word", "MS Excel", "MS PowerPoint", "MS Access",
        "Tally ERP", "Adobe Photoshop", "CorelDRAW", "इंटरनेट ऍप्लिकेशन्स",
        "डेटाबेस मैनेजमेंट", "HTML", "कंप्यूटर अकाउंटिंग",
        "ऑपरेटिंग सिस्टम्स", "डेटा मैनेजमेंट", "ऑफिस ऑटोमेशन",
        "नेटवर्किंग फंडामेंटल्स", "सॉफ्टवेयर ट्रबलशूटिंग"
      ]
    }
  },
  {
    id: "edu-bca",
    degree: {
      en: "Bachelor of Computer Applications (BCA)",
      hi: "बैचलर ऑफ कंप्यूटर ऍप्लिकेशन्स (BCA)"
    },
    institution: {
      en: "Indira Gandhi National Open University (IGNOU)",
      hi: "इंदिरा गांधी राष्ट्रीय मुक्त विश्वविद्यालय (IGNOU)"
    },
    location: {
      en: "New Delhi (Distance Learning)",
      hi: "नई दिल्ली (दूरस्थ शिक्षा)"
    },
    timeline: {
      en: "01/2026 (as listed in resume)",
      hi: "01/2026 (रेज़्यूमे में उल्लिखित अनुसार)"
    },
    timelineNote: {
      en: "Coursework completed / pursued in first year: Parsing, HTML, SQL, Power BI, C Programming, Internet Applications, Web Designing, Computer Networking.",
      hi: "प्रथम वर्ष में अध्ययन: Parsing, HTML, SQL, Power BI, C Programming, इंटरनेट ऍप्लिकेशन्स, वेब डिजाइनिंग, कंप्यूटर नेटवर्किंग।"
    },
    subjects: {
      en: [
        "HTML", "SQL", "Power BI", "C Programming",
        "Internet Applications", "Web Designing", "Computer Networking", "Parsing"
      ],
      hi: [
        "HTML", "SQL", "Power BI", "C प्रोग्रामिंग",
        "इंटरनेट ऍप्लिकेशन्स", "वेब डिजाइनिंग", "कंप्यूटर नेटवर्किंग", "पार्सिंग"
      ]
    }
  },
  {
    id: "edu-navgurukul",
    degree: {
      en: "School of Business",
      hi: "स्कूल ऑफ बिजनेस"
    },
    institution: {
      en: "Navgurukul, Dharamshala Campus",
      hi: "नवगुरुकुल, धर्मशाला परिसर"
    },
    location: {
      en: "Himachal Pradesh, India",
      hi: "हिमाचल प्रदेश, भारत"
    },
    timeline: {
      en: "05/2026 (as listed in resume)",
      hi: "05/2026 (रेज़्यूमे में उल्लिखित अनुसार)"
    },
    timelineNote: {
      en: "Focused practical business tooling: Google Drive, Gmail, Calendar, Slides, and Google Advanced Sheets.",
      hi: "व्यावहारिक बिजनेस टूल्स: Google Drive, Gmail, Calendar, Slides और Google Advanced Sheets का गहन अध्ययन।"
    },
    subjects: {
      en: [
        "Google Advanced Sheets", "Google Drive", "Gmail & Business Communication",
        "Calendar Management", "Google Slides"
      ],
      hi: [
        "Google Advanced Sheets", "Google Drive", "Gmail व व्यावसायिक संवाद",
        "Calendar प्रबंधन", "Google Slides"
      ]
    }
  }
];

export const workflowSteps = [
  {
    step: "01",
    title: {
      en: "Clarify & Define Objectives",
      hi: "समस्या को समझना और उद्देश्य तय करना"
    },
    description: {
      en: "Identify key stakeholders, frame specific analytical questions, determine necessary metrics, and define what data is required.",
      hi: "व्यावसायिक हितधारकों की आवश्यकताओं को समझना, विशिष्ट विश्लेषणात्मक प्रश्न तय करना और आवश्यक मैट्रिक्स निर्धारित करना।"
    },
    deliverables: {
      en: "Problem Statement · Metric Definitions · Success Criteria",
      hi: "प्रॉब्लम स्टेटमेंट · मैट्रिक्स परिभाषा · सफलता मानदंड"
    }
  },
  {
    step: "02",
    title: {
      en: "Clean, Validate & Prepare Data",
      hi: "डेटा को साफ़, व्यवस्थित और सत्यापित करना"
    },
    description: {
      en: "Inspect raw spreadsheets and tables. Eliminate duplicate rows, handle null values, standardize formats, and audit data types.",
      hi: "कच्चे डेटा की जाँच करना, डुप्लिकेट हटाना, अनुपलब्ध मानों को संभालना, डेटा प्रारूप को मानकीकृत करना और त्रुटियाँ ठीक करना।"
    },
    deliverables: {
      en: "Standardized Schema · Cleaned Records · Validation Logs",
      hi: "मानकीकृत स्कीमा · साफ़ किए गए रिकॉर्ड · सत्यापन लॉग"
    }
  },
  {
    step: "03",
    title: {
      en: "Query, Model & Visualize",
      hi: "क्वेरी, विश्लेषण और डैशबोर्ड मॉडलिंग"
    },
    description: {
      en: "Write SQL logic to filter and aggregate records. Build relational models in Power BI and design clean, informative charts.",
      hi: "डेटा को फ़िल्टर और एग्रीगेट करने के लिए SQL लिखना। Power BI में डेटा मॉडल बनाना और स्पष्ट चार्ट्स तैयार करना।"
    },
    deliverables: {
      en: "Optimized SQL Queries · Interactive Dashboards · Pivot Models",
      hi: "अनुकूलित SQL क्वेरी · इंटरएक्टिव डैशबोर्ड · पिवट मॉडल्स"
    }
  },
  {
    step: "04",
    title: {
      en: "Communicate & Drive Action",
      hi: "इनसाइट्स प्रस्तुत करना और निर्णय में सहयोग"
    },
    description: {
      en: "Synthesize analytical findings into concise, accessible summaries with clear visual charts to support confident business decisions.",
      hi: "विश्लेषण के निष्कर्षों को स्पष्ट और संक्षिप्त भाषा में प्रस्तुत करना ताकि निर्णय लेने में ठोस मदद मिल सके।"
    },
    deliverables: {
      en: "Executive Summaries · Actionable Findings · Documentation",
      hi: "एग्जीक्यूटिव समरी · उपयोगी निष्कर्ष · स्पष्ट दस्तावेज़"
    }
  }
];
