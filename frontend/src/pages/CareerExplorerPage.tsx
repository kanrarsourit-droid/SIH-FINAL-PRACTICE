import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Compass, Search, Filter, BarChart3, Map, CheckCircle, Clock, ExternalLink, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// --- CAREER EXPLORER PAGE ---
export const CareerExplorerPage: React.FC = () => {
  const { currentStream } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const careers = [
    {
      title: "AI & Machine Learning Engineer",
      stream: "Computer Science & IT",
      salary: "₹15 - 45 LPA",
      growth: "+38% YoY",
      skills: ["Python", "PyTorch", "FastAPI", "Transformers", "Docker"],
      description: "Designs and deploys artificial intelligence systems, fine-tunes LLMs, and builds automated neural pipelines."
    },
    {
      title: "Chartered Financial Analyst (CFA)",
      stream: "Commerce & Finance",
      salary: "₹14 - 38 LPA",
      growth: "+24% YoY",
      skills: ["Financial Modeling", "Valuation", "Equity Research", "Portfolio Management"],
      description: "Leads capital management, equity valuation, asset allocation strategies, and corporate risk assessment."
    },
    {
      title: "Clinical Research Scientist",
      stream: "Medical & Healthcare",
      salary: "₹10 - 28 LPA",
      growth: "+26% YoY",
      skills: ["Clinical Trials", "Bio-statistics", "Pharmacology", "GCP Compliance"],
      description: "Directs pharmaceutical evaluation, clinical safety trials, health informatics, and biomarker research."
    },
    {
      title: "Corporate Law Counsel",
      stream: "Law & Public Policy",
      salary: "₹12 - 32 LPA",
      growth: "+20% YoY",
      skills: ["Legal Drafting", "IPR", "Contract Negotiation", "Corporate M&A"],
      description: "Advises corporate entities on regulatory compliance, intellectual property protection, and contractual governance."
    }
  ];

  const filtered = careers.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.stream.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Career Explorer</h1>
          <p className="text-xs text-slate-400 mt-1">Discover 50+ curated high-demand careers across academic streams</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search careers or skills..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((c, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-brand-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  {c.stream}
                </span>
                <span className="text-xs font-semibold text-emerald-400">{c.growth}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{c.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{c.description}</p>
              
              <div className="flex flex-wrap gap-1.5 mb-4">
                {c.skills.map((s, sIdx) => (
                  <span key={sIdx} className="px-2 py-0.5 text-[10px] rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Average Package</span>
                <strong className="text-white font-bold">{c.salary}</strong>
              </div>
              <a href="/skill-gap" className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-brand-400 font-semibold text-xs transition-colors">
                Analyze Skill Gap →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// --- SKILL GAP PAGE ---
export const SkillGapPage: React.FC = () => {
  const { currentStream } = useAuth();

  const radarData = [
    { subject: 'Core Logic', A: 85, B: 90, fullMark: 100 },
    { subject: 'Domain Tools', A: 65, B: 85, fullMark: 100 },
    { subject: 'Projects', A: 70, B: 90, fullMark: 100 },
    { subject: 'Certifications', A: 40, B: 80, fullMark: 100 },
    { subject: 'System Design', A: 68, B: 85, fullMark: 100 },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Skill Gap Analyzer</h1>
        <p className="text-xs text-slate-400 mt-1">Benchmark your current skill matrix against target industry expectations for {currentStream}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Radar Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col items-center justify-center">
          <h3 className="text-sm font-bold text-white mb-4">Competency Benchmark Radar</h3>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Radar name="Acquired Skills" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
                <Radar name="Target Expectation" dataKey="B" stroke="#ec4899" fill="#ec4899" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 text-xs mt-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-brand-500 inline-block"></span>
              <span className="text-slate-300">Your Current Level</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-pink-500 inline-block"></span>
              <span className="text-slate-300">Target Level</span>
            </div>
          </div>
        </div>

        {/* Action Plan */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">Recommended Skill Actions</h3>
          
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between text-brand-400 font-bold">
              <span>1. Attain Domain Certification</span>
              <span>Priority: High</span>
            </div>
            <p className="text-slate-300">Your certification score is 40%. Complete 1 accredited credential (AWS / NISM / GCP Clinical).</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between text-purple-400 font-bold">
              <span>2. Build Production Portfolio Project</span>
              <span>Priority: Medium</span>
            </div>
            <p className="text-slate-300">Publish 1 full end-to-end repository with deployment documentation and live URL demo.</p>
          </div>
        </div>

      </div>
    </div>
  );
};


// --- LEARNING ROADMAP PAGE ---
export const LearningRoadmapPage: React.FC = () => {
  const { currentStream } = useAuth();

  const nodes = [
    { step: "Phase 1", title: "Foundations & Core Principles", status: "Completed", desc: "Master basic syntax, financial accounting principles, or clinical cell biology." },
    { step: "Phase 2", title: "Applied Tooling & Frameworks", status: "In Progress", desc: "FastAPI REST microservices, Financial Statement Analysis, or GCP Clinical protocols." },
    { step: "Phase 3", title: "Professional Certification", status: "Pending", desc: "Pass official stream examination or deploy production RAG pipelines." },
    { step: "Phase 4", title: "ATS Resume & Interview Launch", status: "Pending", desc: "Mock AI technical interviews and career applications." }
  ];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Interactive Learning Roadmap</h1>
        <p className="text-xs text-slate-400 mt-1">Structured milestone timeline for {currentStream}</p>
      </div>

      <div className="relative border-l-2 border-brand-500/40 pl-6 ml-4 space-y-8">
        {nodes.map((n, idx) => (
          <div key={idx} className="relative group">
            <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 ${n.status === 'Completed' ? 'bg-emerald-500 border-emerald-400' : n.status === 'In Progress' ? 'bg-brand-500 border-brand-400 animate-ping' : 'bg-slate-800 border-slate-700'}`} />
            
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-brand-500/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">{n.step}</span>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${n.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300' : n.status === 'In Progress' ? 'bg-brand-500/20 text-brand-300' : 'bg-slate-800 text-slate-400'}`}>
                  {n.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{n.title}</h3>
              <p className="text-xs text-slate-400">{n.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
