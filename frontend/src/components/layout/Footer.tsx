import React from 'react';
import { Compass, Heart, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
              <Compass className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-white">PathPilot AI</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your Personalized AI Career & Education Advisor built for the Smart India Hackathon (SIH). Empowering students with context-aware mentorship.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Platform Features</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/ai-mentor" className="hover:text-white transition-colors">AI Context Mentor</Link></li>
            <li><Link to="/career-assessment" className="hover:text-white transition-colors">RIASEC Assessment</Link></li>
            <li><Link to="/skill-gap" className="hover:text-white transition-colors">Skill Gap Analyzer</Link></li>
            <li><Link to="/resume-analyzer" className="hover:text-white transition-colors">ATS Resume Engine</Link></li>
          </ul>
        </div>

        {/* Opportunities */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Opportunities</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/scholarships" className="hover:text-white transition-colors">National Scholarships</Link></li>
            <li><Link to="/college-predictor" className="hover:text-white transition-colors">College Predictor</Link></li>
            <li><Link to="/internships" className="hover:text-white transition-colors">Internship Finder</Link></li>
            <li><Link to="/community" className="hover:text-white transition-colors">Peer Forum</Link></li>
          </ul>
        </div>

        {/* SIH Hackathon & Social */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Smart India Hackathon</h4>
          <p className="text-xs text-slate-400 mb-3">Designed and built with production-grade AI & Full-Stack architecture.</p>
          <div className="flex items-center gap-3 text-slate-400">
            <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors"><Github className="w-4 h-4" /></a>
            <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>© 2026 PathPilot AI. All rights reserved.</p>
        <p className="flex items-center gap-1 mt-2 sm:mt-0">
          Built for <span className="text-brand-400 font-semibold">SIH 2026</span>
        </p>
      </div>
    </footer>
  );
};

export const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`glass-panel rounded-2xl p-6 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};
