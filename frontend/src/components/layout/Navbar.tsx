import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Sparkles, Sun, Moon, Bell, User, LogOut, ChevronDown, BookOpen } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, currentStream, setStream, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isPublicPage = ['/', '/about', '/features', '/contact', '/faq', '/login', '/register'].includes(location.pathname);

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/60 bg-dark-bg/80 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 text-white animate-pulse-slow" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-200">
                PathPilot
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-brand-500/20 text-brand-400 border border-brand-500/30 uppercase tracking-widest">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">SIH SaaS Platform</p>
          </div>
        </Link>

        {/* Stream Selector (Active Domain) */}
        {!isPublicPage && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
            <BookOpen className="w-4 h-4 text-brand-400" />
            <span className="text-xs text-slate-400 font-medium">Stream:</span>
            <select
              value={currentStream}
              onChange={(e) => setStream(e.target.value)}
              className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer pr-2"
            >
              <option value="Computer Science & IT" className="bg-slate-900 text-white">Computer Science & IT</option>
              <option value="Commerce & Finance" className="bg-slate-900 text-white">Commerce & Finance</option>
              <option value="Medical & Healthcare" className="bg-slate-900 text-white">Medical & Healthcare</option>
              <option value="Law & Public Policy" className="bg-slate-900 text-white">Law & Public Policy</option>
            </select>
          </div>
        )}

        {/* Public Navigation Links */}
        {isPublicPage && (
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/features" className={`text-sm font-medium transition-colors ${location.pathname === '/features' ? 'text-brand-400 font-semibold' : 'text-slate-300 hover:text-white'}`}>
              Features
            </Link>
            <Link to="/about" className={`text-sm font-medium transition-colors ${location.pathname === '/about' ? 'text-brand-400 font-semibold' : 'text-slate-300 hover:text-white'}`}>
              About Mission
            </Link>
            <Link to="/faq" className={`text-sm font-medium transition-colors ${location.pathname === '/faq' ? 'text-brand-400 font-semibold' : 'text-slate-300 hover:text-white'}`}>
              FAQ
            </Link>
            <Link to="/contact" className={`text-sm font-medium transition-colors ${location.pathname === '/contact' ? 'text-brand-400 font-semibold' : 'text-slate-300 hover:text-white'}`}>
              Contact
            </Link>
          </nav>
        )}

        {/* Right Utility Actions */}
        <div className="flex items-center gap-3">
          
          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all"
            title="Toggle Light / Dark Mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Quick AI Launch */}
          <Link
            to="/ai-mentor"
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-brand-500/20 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            <span>AI Mentor</span>
          </Link>

          {/* User Profile / Auth Actions */}
          {user ? (
            <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
              <Link to="/notifications" className="p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-500 animate-ping"></span>
              </Link>
              <Link to="/dashboard" className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-900/80 transition-colors">
                <img
                  src={user.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                  alt={user.full_name}
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-brand-500/30"
                />
                <span className="hidden lg:inline text-xs font-semibold text-slate-200">{user.full_name.split(' ')[0]}</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors">
                Log In
              </Link>
              <Link to="/register" className="px-4 py-2 text-xs font-semibold rounded-xl bg-brand-600 hover:bg-brand-500 text-white transition-all shadow-md shadow-brand-600/30">
                Get Started
              </Link>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};
