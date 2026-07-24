import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Bot, GraduationCap, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export const CinematicHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-hero-pattern opacity-70 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top SIH Hackathon Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold mb-8 shadow-lg shadow-brand-500/10"
        >
          <Sparkles className="w-4 h-4 text-brand-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Smart India Hackathon Production SaaS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-ping"></span>
        </motion.div>

        {/* Main Cinematic Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]"
        >
          Your Personalized <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            AI Career & Education
          </span> Advisor
        </motion.h1>

        {/* Tagline & Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
        >
          PathPilot AI empowers students across <strong className="text-white">Computer Science, Commerce, Medicine, and Law</strong> with context-isolated AI mentorship, skill gap analytics, ATS resume scoring, and college prediction.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/ai-mentor"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-brand-500/25 flex items-center justify-center gap-3 transition-all hover:scale-105 group"
          >
            <Bot className="w-5 h-5" />
            <span>Launch AI Mentor</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/career-assessment"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-base flex items-center justify-center gap-2 transition-all hover:border-slate-500"
          >
            <Compass className="w-5 h-5 text-brand-400" />
            <span>Take Career Quiz</span>
          </Link>
        </motion.div>

        {/* Live Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div className="glass-panel p-4 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-white">99.4%</h3>
            <p className="text-xs text-slate-400 mt-1">Domain Context Accuracy</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-brand-400">50+</h3>
            <p className="text-xs text-slate-400 mt-1">Curated Career Paths</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-purple-400">100%</h3>
            <p className="text-xs text-slate-400 mt-1">ATS Resume Scoring</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-pink-400">FastAPI</h3>
            <p className="text-xs text-slate-400 mt-1">Secure AI Middleware</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
