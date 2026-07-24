import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  Compass,
  Bot,
  BrainCircuit,
  BarChart3,
  Map,
  ScanText,
  Video,
  GraduationCap,
  School,
  Briefcase,
  TrendingUp,
  Award,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

// --- DASHBOARD PAGE ---
export const DashboardPage: React.FC = () => {
  const { user, currentStream } = useAuth();

  const progressData = [
    { month: 'Jan', progress: 40 },
    { month: 'Feb', progress: 55 },
    { month: 'Mar', progress: 68 },
    { month: 'Apr', progress: 75 },
    { month: 'May', progress: 88 },
    { month: 'Jun', progress: 94 },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl bg-gradient-to-r from-brand-900/40 via-indigo-900/30 to-purple-900/30 border border-brand-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 uppercase tracking-wider">
            Active Stream: {currentStream}
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white mt-3">
            Welcome back, {user?.full_name?.split(' ')[0] || 'Scholar'}!
          </h1>
          <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-xl">
            Your personalized AI career engine is active. Track your skill readiness, complete resume ATS checks, and consult your dedicated mentor.
          </p>
        </div>

        <Link
          to="/ai-mentor"
          className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-xl shadow-brand-600/30 flex items-center gap-2 transition-all hover:scale-105"
        >
          <Bot className="w-4 h-4" />
          <span>Ask AI Mentor</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Career Readiness</span>
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400"><TrendingUp className="w-4 h-4" /></div>
          </div>
          <h3 className="text-2xl font-bold text-white mt-2">88%</h3>
          <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
            <span>+12% from last month</span>
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">ATS Resume Score</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400"><ScanText className="w-4 h-4" /></div>
          </div>
          <h3 className="text-2xl font-bold text-white mt-2">92 / 100</h3>
          <p className="text-[10px] text-purple-300 mt-1">Format & Keywords Verified</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Roadmap Progress</span>
            <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400"><Map className="w-4 h-4" /></div>
          </div>
          <h3 className="text-2xl font-bold text-white mt-2">3 / 4 Nodes</h3>
          <p className="text-[10px] text-slate-400 mt-1">Phase 3 in progress</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Matched Scholarships</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400"><GraduationCap className="w-4 h-4" /></div>
          </div>
          <h3 className="text-2xl font-bold text-white mt-2">4 Eligible</h3>
          <p className="text-[10px] text-emerald-400 mt-1">Up to ₹80,000 / month</p>
        </div>
      </div>

      {/* Analytics Chart & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="glass-panel p-6 rounded-3xl lg:col-span-2 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-white">Skill Mastery Trajectory</h3>
              <p className="text-xs text-slate-400">Monthly progression across target competencies</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="progress" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorProgress)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Tools */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">Quick SaaS Tools</h3>

          <Link to="/skill-gap" className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 transition-all border border-slate-800 group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400"><BarChart3 className="w-4 h-4" /></div>
              <span className="text-xs font-semibold text-slate-200">Skill Gap Analyzer</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          </Link>

          <Link to="/resume-analyzer" className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 transition-all border border-slate-800 group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400"><ScanText className="w-4 h-4" /></div>
              <span className="text-xs font-semibold text-slate-200">ATS Resume Checker</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          </Link>

          <Link to="/interview-prep" className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 transition-all border border-slate-800 group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400"><Video className="w-4 h-4" /></div>
              <span className="text-xs font-semibold text-slate-200">AI Mock Interview</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          </Link>
        </div>

      </div>

    </div>
  );
};


// --- CAREER ASSESSMENT PAGE ---
export const CareerAssessmentPage: React.FC = () => {
  const { currentStream } = useAuth();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);

  const questions = [
    {
      id: "q1",
      question: `In your study of ${currentStream}, which aspect gives you the most satisfaction?`,
      options: [
        "Architecting complex logical solutions & analytical models",
        "Strategic decision making & financial optimization",
        "Practical application, clinical diagnostics, or public research",
        "Creative design, policy drafting, & leadership communication"
      ]
    },
    {
      id: "q2",
      question: "Which work environment aligns best with your target career goals?",
      options: [
        "Fast-scaling technology product firm with modern cloud stacks",
        "High-stakes investment firm, corporate finance, or audit advisory",
        "Hospital, medical diagnostic center, or bio-science laboratory",
        "Think tank, court of law, or strategic management consultancy"
      ]
    }
  ];

  const handleSelect = (option: string) => {
    setAnswers(prev => ({ ...prev, [questions[step].id]: option }));
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate results
      setResult({
        primaryMatch: currentStream.includes('Commerce') ? 'Chartered Financial Analyst (CFA)' : currentStream.includes('Medical') ? 'Clinical Research Scientist' : 'AI & Full-Stack Architect',
        matchScore: 96,
        avgSalary: '₹14 - 38 LPA',
        summary: `Your assessment reveals an exceptional aptitude for strategic execution within ${currentStream}. Focus on building verifiable project credentials.`
      });
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-white">Career Aptitude Assessment</h1>
        <p className="text-xs text-slate-400 mt-1">Interactive RIASEC assessment tailored for {currentStream}</p>
      </div>

      {!result ? (
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Question {step + 1} of {questions.length}</span>
            <span>Stream: {currentStream}</span>
          </div>

          <h2 className="text-lg font-bold text-white">{questions[step].question}</h2>

          <div className="space-y-3">
            {questions[step].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(opt)}
                className="w-full p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-brand-500/50 text-left text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-between"
              >
                <span>{opt}</span>
                <CheckCircle2 className="w-4 h-4 text-slate-600 group-hover:text-brand-400" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-white">Top Match: {result.primaryMatch}</h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto">{result.summary}</p>

          <div className="flex items-center justify-center gap-6 text-xs py-4 border-y border-slate-800">
            <div>
              <span className="text-slate-400 block">Match Score</span>
              <strong className="text-brand-400 text-lg font-bold">{result.matchScore}%</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Average Starting Salary</span>
              <strong className="text-white text-lg font-bold">{result.avgSalary}</strong>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Link to="/learning-roadmap" className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs">
              View Learning Roadmap
            </Link>
            <button onClick={() => { setStep(0); setResult(null); }} className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold">
              Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
