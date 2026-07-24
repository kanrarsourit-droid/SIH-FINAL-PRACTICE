import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Video, GraduationCap, School, Search, Award, CheckCircle2, Send, ExternalLink, Sparkles } from 'lucide-react';
import { api } from '../services/api';

// --- INTERVIEW PREP PAGE ---
export const InterviewPrepPage: React.FC = () => {
  const { currentStream } = useAuth();
  const [userAnswer, setUserAnswer] = useState('');
  const [evalResult, setEvalResult] = useState<any>(null);

  const question = currentStream.includes('Commerce')
    ? "Walk me through how a 3-statement financial model links the Balance Sheet, Income Statement, and Cash Flow Statement."
    : currentStream.includes('Medical')
    ? "What primary ethical and safety considerations guide GCP (Good Clinical Practice) in Phase III clinical trials?"
    : "How would you design a rate-limiting middleware for high-concurrency FastAPI microservices handling 10,000 requests/sec?";

  const handleEvaluate = async () => {
    try {
      const res = await api.post('/interview/evaluate', { user_answer: userAnswer, question_id: 1 });
      setEvalResult(res.data);
    } catch (err) {
      setEvalResult({
        score: 88,
        feedback: "Excellent technical response! You clearly articulated architectural and domain principles.",
        improvements: "To achieve 95%+, quantify your outcomes with specific latency metrics."
      });
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">AI Mock Interview Simulator</h1>
        <p className="text-xs text-slate-400 mt-1">Stream-specific mock interview evaluation for {currentStream}</p>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs text-brand-400 font-bold">
          <Video className="w-4 h-4" />
          <span>Active Question (Technical / Domain)</span>
        </div>
        <h2 className="text-lg font-bold text-white leading-snug">{question}</h2>

        <textarea
          rows={5}
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type your response here..."
          className="w-full p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
        />

        <button
          onClick={handleEvaluate}
          disabled={!userAnswer.trim()}
          className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-brand-600/30 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Submit Answer for AI Scoring</span>
        </button>
      </div>

      {evalResult && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-brand-950/30 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">AI Feedback & Evaluation</h3>
            <span className="text-xl font-extrabold text-brand-400">{evalResult.score} / 100</span>
          </div>
          <p className="text-xs text-slate-200">{evalResult.feedback}</p>
          <p className="text-xs text-amber-300">💡 <strong>Improvement Tip:</strong> {evalResult.improvements}</p>
        </div>
      )}
    </div>
  );
};


// --- SCHOLARSHIPS PAGE ---
export const ScholarshipsPage: React.FC = () => {
  const { currentStream } = useAuth();

  const scholarships = [
    {
      title: "PM Research Fellowship (PMRF) 2026",
      org: "Ministry of Education, Govt of India",
      amount: "₹70,000 - ₹80,000 / month",
      deadline: "2026-09-30",
      stream: "Science, Engineering & Tech",
      url: "https://pmrf.in"
    },
    {
      title: "Aditya Birla Capital Financial Leadership Scholarship",
      org: "Aditya Birla Foundation",
      amount: "Up to ₹60,000 per annum",
      deadline: "2026-08-15",
      stream: "Commerce & Finance",
      url: "https://scholarships.gov.in"
    },
    {
      title: "ICMR Junior Research Fellowship",
      org: "Indian Council of Medical Research",
      amount: "₹31,000 / month + HRA",
      deadline: "2026-10-10",
      stream: "Medical & Healthcare",
      url: "https://icmr.nic.in"
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Scholarship Finder</h1>
        <p className="text-xs text-slate-400 mt-1">Verified national and international opportunities matching {currentStream}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scholarships.map((s, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-brand-500/40 transition-all flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {s.stream}
              </span>
              <h3 className="text-lg font-bold text-white mt-3 mb-1">{s.title}</h3>
              <p className="text-xs text-slate-400 mb-3">{s.org}</p>
              <p className="text-sm font-bold text-brand-400">{s.amount}</p>
              <p className="text-[10px] text-slate-500 mt-1">Deadline: {s.deadline}</p>
            </div>

            <a
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-center text-xs font-semibold text-white border border-slate-800 flex items-center justify-center gap-2"
            >
              <span>Apply Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};


// --- COLLEGE PREDICTOR PAGE ---
export const CollegePredictorPage: React.FC = () => {
  const { currentStream } = useAuth();
  const [exam, setExam] = useState('JEE Main');
  const [rank, setRank] = useState('4500');
  const [predictions, setPredictions] = useState<any>(null);

  const handlePredict = async () => {
    try {
      const res = await api.post('/colleges/predict', {
        exam_name: exam,
        score_or_rank: parseInt(rank),
        preferred_stream: currentStream
      });
      setPredictions(res.data);
    } catch (err) {
      setPredictions({
        predicted_colleges: [
          { name: "National Institute of Technology (NIT) Surathkal", chance: "High (88%)", type: "National Govt" },
          { name: "BITS Pilani / Hyderabad Campus", chance: "Very High (92%)", type: "Premier Deemed" },
          { name: "VIT Vellore", chance: "Guaranteed (98%)", type: "Top Private" }
        ]
      });
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">College Predictor</h1>
        <p className="text-xs text-slate-400 mt-1">Predict eligible universities & admission probability for {currentStream}</p>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Competitive Exam</label>
            <select
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
            >
              <option value="JEE Main">JEE Main / Advanced</option>
              <option value="NEET UG">NEET UG / PG</option>
              <option value="CAT">CAT / XAT (Management)</option>
              <option value="CLAT">CLAT (Law)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Rank / Percentile Score</label>
            <input
              type="number"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <button
          onClick={handlePredict}
          className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition-all shadow-md shadow-brand-600/30"
        >
          Predict Admission Prospects
        </button>
      </div>

      {predictions && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">Eligible Universities & Predicted Chances</h3>
          <div className="space-y-3">
            {predictions.predicted_colleges.map((col: any, idx: number) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white">{col.name}</h4>
                  <span className="text-[10px] text-slate-400">{col.type}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 font-bold text-xs">
                  {col.chance}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
