import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Users, User, ExternalLink, ThumbsUp, MessageSquare, Plus, Save } from 'lucide-react';
import { api } from '../services/api';

// --- INTERNSHIPS PAGE ---
export const InternshipsPage: React.FC = () => {
  const { currentStream } = useAuth();

  const internships = [
    {
      title: "AI & Full-Stack Engineering Intern",
      company: "PathPilot Tech Labs",
      location: "Remote / Bengaluru",
      stipend: "₹25,000 / month",
      stream: "Computer Science & IT",
      url: "https://careers.pathpilot.ai"
    },
    {
      title: "Corporate Finance & Equity Analyst Intern",
      company: "InvestCorp Advisory",
      location: "Mumbai, India",
      stipend: "₹20,000 / month",
      stream: "Commerce & Finance",
      url: "https://investcorp.com"
    },
    {
      title: "Clinical Research Assistant Intern",
      company: "Apex BioLabs & Healthcare",
      location: "Hyderabad, India",
      stipend: "₹18,000 / month",
      stream: "Medical & Healthcare",
      url: "https://apexbio.org"
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Internship Finder</h1>
        <p className="text-xs text-slate-400 mt-1">Verified industry internship opportunities for {currentStream}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {internships.map((i, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-brand-500/40 transition-all flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-brand-500/20 text-brand-300 border border-brand-500/30">
                {i.stream}
              </span>
              <h3 className="text-lg font-bold text-white mt-3">{i.title}</h3>
              <p className="text-xs text-slate-400">{i.company} • {i.location}</p>
              <p className="text-sm font-bold text-emerald-400 mt-3">{i.stipend}</p>
            </div>

            <a
              href={i.url}
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-center text-xs font-bold text-white shadow-md shadow-brand-600/30 flex items-center justify-center gap-2"
            >
              <span>Apply Now</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};


// --- COMMUNITY PAGE ---
export const CommunityPage: React.FC = () => {
  const { currentStream } = useAuth();
  const [discussions, setDiscussions] = useState([
    {
      id: "disc_1",
      author_name: "Priya Nair",
      title: "How to transition from B.Com into Data Analytics and FinTech roles?",
      category: "Commerce & Finance",
      content: "I am currently in my final year of B.Com. I want to build a career at the intersection of Finance and Data Science.",
      upvotes: 42,
      replies: 8
    },
    {
      id: "disc_2",
      author_name: "Rohan Mehta",
      title: "Tips for acing technical system design rounds at Tier 1 Tech Product Companies?",
      category: "Computer Science & IT",
      content: "Preparing for SDE-2 interviews. Looking for recommended resources on Distributed Caching & Microservice rate limiting.",
      upvotes: 68,
      replies: 14
    }
  ]);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Community Forum</h1>
          <p className="text-xs text-slate-400 mt-1">Peer Q&A threads and discussion for {currentStream}</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>New Discussion</span>
        </button>
      </div>

      <div className="space-y-4">
        {discussions.map((d) => (
          <div key={d.id} className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-brand-500/40 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {d.category}
              </span>
              <span className="text-[10px] text-slate-500">By {d.author_name}</span>
            </div>
            <h3 className="text-base font-bold text-white">{d.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{d.content}</p>
            
            <div className="flex items-center gap-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
              <button className="flex items-center gap-1 hover:text-white transition-colors">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{d.upvotes} Upvotes</span>
              </button>
              <button className="flex items-center gap-1 hover:text-white transition-colors">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{d.replies} Replies</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// --- PROFILE PAGE ---
export const ProfilePage: React.FC = () => {
  const { user, currentStream, setStream } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || 'Aarav Sharma');
  const [targetRole, setTargetRole] = useState('AI Architect');
  const [bio, setBio] = useState('Enthusiastic student building context-aware AI applications.');

  const handleSave = () => {
    alert("Profile settings saved successfully!");
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">User Profile</h1>
        <p className="text-xs text-slate-400 mt-1">Manage your academic stream and target career preferences</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
          <img
            src={user?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
            alt="Profile"
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-brand-500/30"
          />
          <div>
            <h2 className="text-xl font-bold text-white">{fullName}</h2>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Academic Stream</label>
            <select
              value={currentStream}
              onChange={(e) => setStream(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
            >
              <option value="Computer Science & IT">Computer Science & IT</option>
              <option value="Commerce & Finance">Commerce & Finance</option>
              <option value="Medical & Healthcare">Medical & Healthcare</option>
              <option value="Law & Public Policy">Law & Public Policy</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Target Career Role</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Bio / Aspirations</label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
          />
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-600/30 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile Preferences</span>
        </button>
      </div>
    </div>
  );
};
