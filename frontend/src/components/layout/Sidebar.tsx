import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Bot,
  BrainCircuit,
  Compass,
  BarChart3,
  Map,
  FileText,
  ScanText,
  Video,
  GraduationCap,
  School,
  Briefcase,
  Users,
  User,
  Settings,
  ShieldCheck,
  Bell
} from 'lucide-react';

const navigationItems = [
  { group: 'Core Platform', items: [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'AI Mentor', path: '/ai-mentor', icon: Bot, badge: 'Live Context' },
    { label: 'Career Assessment', path: '/career-assessment', icon: BrainCircuit },
    { label: 'Career Explorer', path: '/career-explorer', icon: Compass },
  ]},
  { group: 'Skills & Growth', items: [
    { label: 'Skill Gap Analyzer', path: '/skill-gap', icon: BarChart3 },
    { label: 'Learning Roadmap', path: '/learning-roadmap', icon: Map },
    { label: 'Resume Builder', path: '/resume-builder', icon: FileText },
    { label: 'Resume Analyzer', path: '/resume-analyzer', icon: ScanText, badge: 'ATS Engine' },
    { label: 'Interview Prep', path: '/interview-prep', icon: Video },
  ]},
  { group: 'Opportunities', items: [
    { label: 'Scholarships', path: '/scholarships', icon: GraduationCap },
    { label: 'College Predictor', path: '/college-predictor', icon: School },
    { label: 'Internships', path: '/internships', icon: Briefcase },
  ]},
  { group: 'Account & Community', items: [
    { label: 'Community Forum', path: '/community', icon: Users },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
    { label: 'Admin Dashboard', path: '/admin', icon: ShieldCheck },
  ]}
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 flex-shrink-0 hidden md:block bg-dark-bg/90 border-r border-slate-800/80 p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {navigationItems.map((section, idx) => (
          <div key={idx}>
            <h3 className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              {section.group}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                        isActive
                          ? 'bg-gradient-to-r from-brand-600/30 to-indigo-600/20 text-brand-300 border border-brand-500/30 shadow-md shadow-brand-500/10'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900/60 border border-transparent'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded-md bg-brand-500/20 text-brand-300 border border-brand-500/30">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
