import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { aiMentorService } from '../services/api';
import { Bot, Send, Sparkles, User, RefreshCw, AlertTriangle, BookOpen, Lightbulb } from 'lucide-react';
import { ChatMessage } from '../types';

export const AIMentorPage: React.FC = () => {
  const { currentStream, user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState<string | undefined>(undefined);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [warningNotice, setWarningNotice] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load stream suggested prompts
  useEffect(() => {
    const fetchPrompts = async () => {
      const data = await aiMentorService.getSuggestedPrompts(currentStream);
      setPrompts(data.prompts || []);
    };
    fetchPrompts();

    // Reset initial welcome message tailored to stream
    setMessages([
      {
        id: 'msg_welcome',
        sender: 'assistant',
        content: `### 👋 Hello ${user?.full_name?.split(' ')[0] || 'Scholar'}!\n\nI am your **PathPilot AI Mentor** specializing in **${currentStream}**.\n\nAsk me anything about career options, skill gap analysis, higher education entrance exams, or project ideas tailored specifically to your field!`,
        stream_context: currentStream,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [currentStream]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      content: query,
      stream_context: currentStream,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const historyLog = messages.map(m => ({ sender: m.sender, content: m.content }));
      const response = await aiMentorService.sendMessage(query, currentStream, chatId, historyLog);

      if (response.chat_id) setChatId(response.chat_id);
      if (response.warning_notice) setWarningNotice(response.warning_notice);

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        content: response.response,
        stream_context: response.stream_context,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      if (response.suggested_followups) {
        setPrompts(response.suggested_followups);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-dark-bg p-4 md:p-6 max-w-6xl mx-auto">
      
      {/* Top Stream Header */}
      <div className="glass-panel p-4 rounded-2xl mb-4 flex items-center justify-between border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400">
            <Bot className="w-5 h-5 animate-pulse-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">PathPilot AI Mentor</h2>
              <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-brand-500/20 text-brand-300 border border-brand-500/30">
                Stream-Isolated
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <BookOpen className="w-3 h-3 text-brand-400" />
              <span>Active Context: <strong className="text-white">{currentStream}</strong></span>
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([]);
            setChatId(undefined);
          }}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Reset Conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Optional Warning Notice Header */}
      {warningNotice && (
        <div className="mb-3 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>{warningNotice}</span>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-md shadow-brand-600/20">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white rounded-tr-none shadow-lg shadow-brand-500/15'
                  : 'glass-panel text-slate-200 rounded-tl-none border border-slate-800/80'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans">
                {msg.content}
              </div>
              <div className={`mt-2 text-[10px] ${msg.sender === 'user' ? 'text-brand-200' : 'text-slate-500'} text-right`}>
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 flex-shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 items-center text-xs text-slate-400">
            <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="glass-panel px-4 py-3 rounded-2xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping"></span>
              <span>Evaluating query within <strong>{currentStream}</strong> framework...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Follow-up Prompts */}
      {prompts.length > 0 && (
        <div className="mb-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0" />
          {prompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-[11px] font-medium text-slate-300 hover:text-white whitespace-nowrap transition-colors flex-shrink-0"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input Field */}
      <div className="glass-panel p-2.5 rounded-2xl flex items-center gap-2 border border-slate-800">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Ask PathPilot AI about ${currentStream} career choices, skills, or entrance exams...`}
          className="flex-1 bg-transparent px-3 text-xs text-white placeholder-slate-500 focus:outline-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputMessage.trim() || isLoading}
          className="p-3 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white transition-all shadow-md shadow-brand-600/30"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
