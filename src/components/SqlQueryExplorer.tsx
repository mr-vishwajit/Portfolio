import React, { useState } from 'react';
import { Language } from '../types';
import { Terminal, Play, Copy, Check, Database, Sparkles, Table2, ArrowRight } from 'lucide-react';

interface SqlQueryExplorerProps {
  language: Language;
}

interface QuerySample {
  id: string;
  title: { en: string; hi: string };
  category: string;
  description: { en: string; hi: string };
  sql: string;
  columns: string[];
  sampleData: Record<string, string | number>[];
  insight: { en: string; hi: string };
}

export const SqlQueryExplorer: React.FC<SqlQueryExplorerProps> = ({ language }) => {
  const [activeQueryId, setActiveQueryId] = useState<string>('q1');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasExecuted, setHasExecuted] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const querySamples: QuerySample[] = [
    {
      id: 'q1',
      title: {
        en: 'High-Value Customer Cohorts & Profit Concentration (CTE + JOINs)',
        hi: 'उच्च-मूल्य ग्राहक वर्ग और लाभ एकाग्रता (CTE + JOINs)'
      },
      category: 'SQL / E-Commerce',
      description: {
        en: 'Calculates customer lifetime spend, order count, and classifies clients into priority tiers using common table expressions.',
        hi: 'CTE का उपयोग करके ग्राहकों के कुल खर्च और ऑर्डर की गणना करता है और उन्हें प्राथमिकता स्तर में वर्गीकृत करता है।'
      },
      sql: `WITH CustomerMetrics AS (
  SELECT 
    c.customer_id,
    c.customer_name,
    c.region,
    COUNT(DISTINCT o.order_id) AS total_orders,
    SUM(o.sales_amount) AS total_revenue,
    SUM(o.profit_amount) AS total_profit,
    ROUND(SUM(o.profit_amount) / SUM(o.sales_amount) * 100, 2) AS margin_pct
  FROM customers c
  JOIN orders o ON c.customer_id = o.customer_id
  GROUP BY c.customer_id, c.customer_name, c.region
)
SELECT 
  customer_id,
  customer_name,
  region,
  total_orders,
  CONCAT('$', FORMAT(total_revenue, 2)) AS formatted_revenue,
  CONCAT(margin_pct, '%') AS profit_margin,
  CASE 
    WHEN total_revenue >= 15000 THEN 'Platinum Tier (Top 5%)'
    WHEN total_revenue >= 7500 THEN 'Gold Tier'
    ELSE 'Standard'
  END AS tier_status
FROM CustomerMetrics
ORDER BY total_revenue DESC
LIMIT 5;`,
      columns: ['customer_id', 'customer_name', 'region', 'total_orders', 'formatted_revenue', 'profit_margin', 'tier_status'],
      sampleData: [
        { customer_id: 'CUST-1092', customer_name: 'Apex Global Retail', region: 'North', total_orders: 48, formatted_revenue: '$28,450.00', profit_margin: '34.20%', tier_status: 'Platinum Tier (Top 5%)' },
        { customer_id: 'CUST-0844', customer_name: 'Metro Logistics Corp', region: 'West', total_orders: 39, formatted_revenue: '$19,820.00', profit_margin: '29.80%', tier_status: 'Platinum Tier (Top 5%)' },
        { customer_id: 'CUST-2139', customer_name: 'Summit Health Network', region: 'South', total_orders: 31, formatted_revenue: '$16,400.00', profit_margin: '38.50%', tier_status: 'Platinum Tier (Top 5%)' },
        { customer_id: 'CUST-0412', customer_name: 'Zenith Tech Systems', region: 'East', total_orders: 22, formatted_revenue: '$11,940.00', profit_margin: '24.10%', tier_status: 'Gold Tier' },
        { customer_id: 'CUST-1580', customer_name: 'Horizon Infotech', region: 'North', total_orders: 19, formatted_revenue: '$9,850.00', profit_margin: '27.40%', tier_status: 'Gold Tier' }
      ],
      insight: {
        en: 'The top 3 corporate accounts represent over 41% of regional gross profit, proving high retention priority.',
        hi: 'शीर्ष 3 कॉर्पोरेट खाते क्षेत्रीय सकल लाभ के 41% से अधिक का प्रतिनिधित्व करते हैं, जो उच्च प्राथमिकता को प्रमाणित करते हैं।'
      }
    },
    {
      id: 'q2',
      title: {
        en: 'Month-Over-Month (MoM) Growth using Window Functions',
        hi: 'विंडो फ़ंक्शंस (LAG) द्वारा माह-दर-माह (MoM) राजस्व वृद्धि'
      },
      category: 'SQL / Financial Analytics',
      description: {
        en: 'Uses LAG() analytical window function to track monthly sales variations and percentage variances without self-joins.',
        hi: 'सेल्फ-जॉइन के बिना मासिक बिक्री भिन्नता और प्रतिशत की गणना करने के लिए LAG() विंडो फ़ंक्शन का उपयोग।'
      },
      sql: `SELECT 
  DATE_TRUNC('month', order_date)::DATE AS sales_month,
  COUNT(order_id) AS total_transactions,
  SUM(sales_amount) AS current_month_sales,
  LAG(SUM(sales_amount), 1) OVER (ORDER BY DATE_TRUNC('month', order_date)) AS prev_month_sales,
  ROUND(
    (SUM(sales_amount) - LAG(SUM(sales_amount), 1) OVER (ORDER BY DATE_TRUNC('month', order_date)))
    / LAG(SUM(sales_amount), 1) OVER (ORDER BY DATE_TRUNC('month', order_date)) * 100, 
    2
  ) AS mom_growth_pct
FROM orders
WHERE order_date >= '2024-01-01'
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY sales_month ASC;`,
      columns: ['sales_month', 'total_transactions', 'current_month_sales', 'prev_month_sales', 'mom_growth_pct'],
      sampleData: [
        { sales_month: '2024-01-01', total_transactions: 1420, current_month_sales: '$142,500', prev_month_sales: 'N/A', mom_growth_pct: 'Baseline' },
        { sales_month: '2024-02-01', total_transactions: 1580, current_month_sales: '$161,200', prev_month_sales: '$142,500', mom_growth_pct: '+13.12%' },
        { sales_month: '2024-03-01', total_transactions: 1840, current_month_sales: '$194,800', prev_month_sales: '$161,200', mom_growth_pct: '+20.84%' },
        { sales_month: '2024-04-01', total_transactions: 1710, current_month_sales: '$178,300', prev_month_sales: '$194,800', mom_growth_pct: '-8.47%' },
        { sales_month: '2024-05-01', total_transactions: 2050, current_month_sales: '$224,100', prev_month_sales: '$178,300', mom_growth_pct: '+25.69%' }
      ],
      insight: {
        en: 'Identified seasonal drop in April (-8.47%) followed by a strong promotional recovery in May (+25.69%).',
        hi: 'अप्रैल में मौसमी गिरावट (-8.47%) और उसके बाद मई में मजबूत रिकवरी (+25.69%) दर्ज की गई।'
      }
    },
    {
      id: 'q3',
      title: {
        en: 'Customer Attrition & Contract Risk Segmentation',
        hi: 'ग्राहक चर्न और अनुबंध जोखिम वर्गीकरण'
      },
      category: 'SQL / Retention Analytics',
      description: {
        en: 'Groups subscriber cohorts by contract duration and tech support interaction to isolate high-risk churn patterns.',
        hi: 'उच्च जोखिम वाले चर्न पैटर्न को अलग करने के लिए अनुबंध अवधि और तकनीकी सहायता के आधार पर समूहीकरण।'
      },
      sql: `SELECT 
  contract_type,
  internet_service,
  has_tech_support,
  COUNT(customer_id) AS total_subscribers,
  SUM(CASE WHEN churn_status = 'Yes' THEN 1 ELSE 0 END) AS churned_count,
  ROUND(
    AVG(CASE WHEN churn_status = 'Yes' THEN 1.0 ELSE 0.0 END) * 100, 
    2
  ) AS churn_rate_pct
FROM telco_customers
GROUP BY contract_type, internet_service, has_tech_support
HAVING COUNT(customer_id) > 100
ORDER BY churn_rate_pct DESC;`,
      columns: ['contract_type', 'internet_service', 'has_tech_support', 'total_subscribers', 'churned_count', 'churn_rate_pct'],
      sampleData: [
        { contract_type: 'Month-to-Month', internet_service: 'Fiber Optic', has_tech_support: 'No', total_subscribers: 1840, churned_count: 786, churn_rate_pct: '42.72%' },
        { contract_type: 'Month-to-Month', internet_service: 'DSL', has_tech_support: 'No', total_subscribers: 920, churned_count: 294, churn_rate_pct: '31.96%' },
        { contract_type: 'One Year', internet_service: 'Fiber Optic', has_tech_support: 'Yes', total_subscribers: 850, churned_count: 98, churn_rate_pct: '11.53%' },
        { contract_type: 'Two Year', internet_service: 'Fiber Optic', has_tech_support: 'Yes', total_subscribers: 1120, churned_count: 34, churn_rate_pct: '3.04%' }
      ],
      insight: {
        en: 'Subscribers on Month-to-Month Fiber without tech support have 14x higher churn risk than 2-year subscribers.',
        hi: 'मंथ-टू-मंथ फाइबर ग्राहक बिना तकनीकी सहायता के 2-वर्षीय ग्राहकों की तुलना में 14 गुना अधिक जोखिम में हैं।'
      }
    }
  ];

  const activeQuery = querySamples.find((q) => q.id === activeQueryId) || querySamples[0];

  const handleRunSimulation = () => {
    setIsRunning(true);
    setHasExecuted(false);
    setTimeout(() => {
      setIsRunning(false);
      setHasExecuted(true);
    }, 600);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(activeQuery.sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl">
      
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-teal-950/70 border border-teal-500/30 text-[11px] font-semibold text-teal-300 mb-1.5 font-mono">
            <Terminal className="w-3.5 h-3.5 text-teal-400" />
            <span>{language === 'en' ? 'Interactive SQL Query Simulator' : 'इंटरैक्टिव SQL क्वेरी सिम्युलेटर'}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            {language === 'en' ? 'Live Query Logic & Data Transformation' : 'वास्तविक SQL क्वेरी लॉजिक व डेटा परिणाम'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {language === 'en'
              ? 'Click through sample queries to inspect actual relational logic, window functions, CTEs, and simulated output.'
              : 'रिलेशनल लॉजिक, विंडो फ़ंक्शंस और आउटपुट देखने के लिए नीचे दिए गए क्वेरी सैंपल्स पर क्लिक करें।'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleCopySql}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-950 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (language === 'en' ? 'SQL Copied!' : 'कॉपी हुआ!') : (language === 'en' ? 'Copy SQL' : 'SQL कॉपी')}</span>
          </button>

          <button
            onClick={handleRunSimulation}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 disabled:opacity-50 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? (language === 'en' ? 'Executing...' : 'क्वेरी चल रही है...') : (language === 'en' ? 'Run Query' : 'क्वेरी चलाएं')}</span>
          </button>
        </div>
      </div>

      {/* Query Selector Tabs */}
      <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-none">
        {querySamples.map((q) => (
          <button
            key={q.id}
            onClick={() => {
              setActiveQueryId(q.id);
              setHasExecuted(true);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeQueryId === q.id
                ? 'bg-teal-950 text-teal-300 border border-teal-500/50 shadow-xs'
                : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span className="font-mono text-[10px] text-teal-400 mr-1.5">[{q.category}]</span>
            <span>{q.title[language]}</span>
          </button>
        ))}
      </div>

      {/* SQL Code Block with syntax styling */}
      <div className="relative rounded-xl bg-slate-950 border border-slate-800/90 p-4 font-mono text-xs overflow-x-auto">
        <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 mb-2 border-b border-slate-900 font-sans">
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-slate-300 font-semibold">{activeQuery.title[language]}</span>
          </div>
          <span className="text-[10px] text-teal-400 font-mono">PostgreSQL / ANSI SQL</span>
        </div>

        <pre className="text-teal-300/95 leading-relaxed overflow-x-auto">
          <code>{activeQuery.sql}</code>
        </pre>
      </div>

      {/* Output Table Simulation */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-white flex items-center gap-1.5">
            <Table2 className="w-4 h-4 text-teal-400" />
            <span>{language === 'en' ? 'Simulated Output Table (Sample Records)' : 'आउटपुट परिणाम तालिका (सैंपल रिकॉर्ड्स)'}</span>
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            {language === 'en' ? 'Execution Time: 42ms' : 'निष्पादन समय: 42ms'}
          </span>
        </div>

        {isRunning ? (
          <div className="p-8 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs">
            <div className="w-5 h-5 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
            <span>{language === 'en' ? 'Executing query against sample relational model...' : 'क्वेरी निष्पादित की जा रही है...'}</span>
          </div>
        ) : hasExecuted ? (
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 border-b border-slate-800 text-[11px] text-teal-400 font-mono uppercase tracking-wider">
                <tr>
                  {activeQuery.columns.map((col) => (
                    <th key={col} className="py-2.5 px-3 whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px] text-slate-300">
                {activeQuery.sampleData.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-900/50 transition-colors">
                    {activeQuery.columns.map((col) => (
                      <td key={col} className="py-2 px-3 whitespace-nowrap">
                        {String(row[col])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {/* Business Insight Callout */}
        <div className="p-3 bg-teal-950/30 border border-teal-500/30 rounded-xl text-xs flex items-start gap-2.5 text-teal-200">
          <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-teal-300 block mb-0.5">
              {language === 'en' ? 'Key Data Takeaway / Decision Impact:' : 'मुख्य विश्लेषणात्मक निष्कर्ष:'}
            </span>
            <p className="text-slate-300 leading-relaxed font-sans">
              {activeQuery.insight[language]}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
