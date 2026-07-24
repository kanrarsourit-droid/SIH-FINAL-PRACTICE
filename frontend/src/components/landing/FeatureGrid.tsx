import React, { useState } from 'react';
import { Bot, Compass, BarChart3, Map, ScanText, Video, GraduationCap, School, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FeatureGrid: React.FC = () => {
  const features = [
    {
      icon: Bot,
      title: "Context-Aware AI Mentor",
      description: "Chatbot with stream-isolated intelligence. Answers Commerce questions with CA/CFA advice, and Medical questions with clinical trial insights.",
      link: "/ai-mentor",
      badge: "Gemini 1.5 Powered"
    },
    {
      icon: Compass,
      title: "RIASEC Career Explorer",
      description: "Discover 50+ curated career paths with real-time salary benchmarks, growth projections, and skill requirements.",
      link: "/career-explorer"
    },
    {
      icon: BarChart3,
      title: "Skill Gap Analyzer",
      description: "Benchmark your acquired skills against target role expectations using radar visualizations and priority action plans.",
      link: "/skill-gap"
    },
    {
      icon: Map,
      title: "Learning Roadmap Builder",
      description: "Step-by-step visual node timeline outlining foundational, project, and certification milestones for target careers.",
      link: "/learning-roadmap"
    },
    {
      icon: ScanText,
      title: "ATS Resume Analyzer",
      description: "Instant ATS score calculation checking action verbs, domain keyword density, formatting, and structural improvements.",
      link: "/resume-analyzer",
      badge: "Real-time Scoring"
    },
    {
      icon: Video,
      title: "AI Interview Simulator",
      description: "Stream-specific technical, behavioral, and case study interview questions with instant evaluation and feedback.",
      link: "/interview-prep"
    },
    {
      icon: GraduationCap,
      title: "Scholarship Finder",
      description: "Filterable directory of national and international student scholarships with eligibility matching.",
      link: "/scholarships"
    },
    {
      icon: School,
      title: "College Predictor",
      description: "Input rank or percentile (JEE, NEET, CAT, CLAT) to predict admission probability across Tier 1 & Tier 2 institutes.",
      link: "/college-predictor"
    }
  ];

  return (
    <section className="py-20 bg-slate-950/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built Like a Commercial SaaS Product
          </h2>
          <p className="mt-4 text-slate-400 text-base">
            Every feature is backed by dedicated routes, FastAPI endpoints, and relational PostgreSQL data structures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <Link
                key={idx}
                to={f.link}
                className="glass-panel rounded-2xl p-6 hover:border-brand-500/50 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    {f.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-brand-500/20 text-brand-300 border border-brand-500/30">
                        {f.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {f.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs font-semibold text-brand-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore Feature</span>
                  <span className="ml-1">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const FAQSection: React.FC = () => {
  const faqs = [
    {
      q: "How does PathPilot AI prevent irrelevant answers across streams (e.g. Commerce vs Computer Science)?",
      a: "PathPilot AI enforces a Student Stream Context envelope in FastAPI. System prompts bind Google Gemini to the user's active stream (Commerce, Medical, Law, CS) to eliminate cross-domain hallucinations."
    },
    {
      q: "Does the AI Chatbot call Gemini directly from the React frontend?",
      a: "Never. The API key remains strictly on the FastAPI backend environment. React makes authenticated REST requests to FastAPI, which securely handles Gemini requests."
    },
    {
      q: "Can I use PathPilot AI without a Gemini API Key?",
      a: "Yes! PathPilot includes a context-isolated local fallback AI engine that delivers high-quality, stream-specific responses along with clear developer headers."
    },
    {
      q: "Is the database schema suitable for production deployment?",
      a: "Yes. `database/schema.sql` contains 23 PostgreSQL tables with proper Foreign Keys, Indexes, Auto-updating triggers, and Supabase Row Level Security (RLS) policies."
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 bg-dark-bg border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="mt-2 text-slate-400 text-sm">Everything you need to know about PathPilot AI architecture for SIH.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl overflow-hidden border border-slate-800/80 cursor-pointer"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              <div className="p-5 flex items-center justify-between text-left">
                <span className="text-sm font-semibold text-white">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openIdx === idx ? 'rotate-180 text-brand-400' : ''}`} />
              </div>
              {openIdx === idx && (
                <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
