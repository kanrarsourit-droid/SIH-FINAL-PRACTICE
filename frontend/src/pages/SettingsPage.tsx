import React, { useState } from 'react';
import { Settings, ShieldCheck, Bell, Mail, HelpCircle, CheckCircle2, Moon, Sun, Lock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { FAQSection } from '../components/landing/FeatureGrid';

// --- SETTINGS PAGE ---
export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Application Settings</h1>
        <p className="text-xs text-slate-400 mt-1">Configure theme preferences and notifications</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between py-4 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white">Interface Theme</h3>
            <p className="text-xs text-slate-400">Toggle between Dark Mode and Light Mode</p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-white flex items-center gap-2"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white">Email Digest & Alerts</h3>
            <p className="text-xs text-slate-400">Receive weekly skill gap summaries and new scholarship alerts</p>
          </div>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="w-5 h-5 accent-brand-600 rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};


// --- NOTIFICATIONS PAGE ---
export const NotificationsPage: React.FC = () => {
  const notifications = [
    { title: "Skill Gap Analysis Updated", time: "10 mins ago", type: "success", msg: "Your readiness score for AI Engineer reached 88%." },
    { title: "New PMRF Scholarship Matching", time: "2 hours ago", type: "info", msg: "PM Research Fellowship deadline updated for September 2026." },
    { title: "ATS Resume Report Ready", time: "1 day ago", type: "purple", msg: "ATS format scan completed with score 92/100." }
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Notifications</h1>
        <p className="text-xs text-slate-400 mt-1">Real-time alerts and career roadmap updates</p>
      </div>

      <div className="space-y-4">
        {notifications.map((n, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Bell className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-white">{n.title}</h3>
                <span className="text-[10px] text-slate-500">{n.time}</span>
              </div>
              <p className="text-xs text-slate-300">{n.msg}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// --- ADMIN DASHBOARD PAGE ---
export const AdminPage: React.FC = () => {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Platform Administration</h1>
        <p className="text-xs text-slate-400 mt-1">SIH Hackathon system metrics and active API status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Total Registered Scholars</span>
          <h3 className="text-2xl font-bold text-white mt-2">14,250</h3>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Active AI Chat Sessions</span>
          <h3 className="text-2xl font-bold text-brand-400 mt-2">3,840</h3>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Assessments Completed</span>
          <h3 className="text-2xl font-bold text-purple-400 mt-2">9,210</h3>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">ATS Scans Executed</span>
          <h3 className="text-2xl font-bold text-pink-400 mt-2">5,120</h3>
        </div>
      </div>
    </div>
  );
};


// --- CONTACT PAGE ---
export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-white">Contact & Support</h1>
        <p className="text-xs text-slate-400 mt-1">Smart India Hackathon Team Inquiry Form</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-slate-800">
        {!submitted ? (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
              <input type="text" required placeholder="Aarav Sharma" className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
              <input type="email" required placeholder="student@sih-pathpilot.ai" className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
              <textarea rows={4} required placeholder="Enter message..." className="w-full p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500" />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs">
              Send Message
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Message Sent Successfully</h3>
            <p className="text-xs text-slate-300">Thank you for reaching out. The SIH team will respond shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
};


// --- FAQ PAGE ---
export const FAQPage: React.FC = () => {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <FAQSection />
    </div>
  );
};
