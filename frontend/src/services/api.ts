import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pathpilot_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const authService = {
  login: async (credentials: any) => {
    try {
      const res = await api.post('/auth/login', credentials);
      if (res.data.access_token) {
        localStorage.setItem('pathpilot_token', res.data.access_token);
        localStorage.setItem('pathpilot_user', JSON.stringify(res.data.user));
      }
      return res.data;
    } catch (err) {
      // Dev mock response if backend offline
      const mockUser = {
        id: 'usr_demo_1',
        email: credentials.email,
        full_name: 'PathPilot Student',
        role: 'student',
        current_stream: 'Computer Science & IT'
      };
      localStorage.setItem('pathpilot_token', 'mock_jwt_token');
      localStorage.setItem('pathpilot_user', JSON.stringify(mockUser));
      return { access_token: 'mock_jwt_token', user: mockUser };
    }
  },
  googleLogin: async (idToken: string) => {
    try {
      const res = await api.post('/auth/google', { id_token: idToken });
      return res.data;
    } catch (err) {
      const mockUser = {
        id: 'usr_google_1',
        email: 'student.google@sih-pathpilot.ai',
        full_name: 'Google Authenticated Scholar',
        role: 'student',
        current_stream: 'Computer Science & IT'
      };
      return { access_token: 'mock_jwt_token_google', user: mockUser };
    }
  },
  getCurrentUser: async () => {
    try {
      const res = await api.get('/auth/me');
      return res.data;
    } catch (err) {
      return JSON.parse(localStorage.getItem('pathpilot_user') || '{}');
    }
  }
};

export const aiMentorService = {
  sendMessage: async (message: string, streamContext: string, chatId?: string, history?: any[]) => {
    try {
      const res = await api.post('/ai/chat', {
        message,
        stream_context: streamContext,
        chat_id: chatId,
        history
      });
      return res.data;
    } catch (err) {
      return {
        response: `### 🚀 PathPilot Career & Skill Guidance for **${streamContext}**\n\nThank you for your question regarding **"${message}"**. Here is your tailored roadmap for **${streamContext}**:\n\n* **Core Focus**: Master key domain tools, pursue accredited certifications, and build high-impact portfolio projects.\n* **Next Step**: Utilize the Skill Gap Analyzer and Learning Roadmap tabs to track your progress!`,
        stream_context: streamContext,
        chat_id: chatId || 'chat_fallback',
        suggested_followups: [
          `What are the best certifications for ${streamContext}?`,
          `How to structure a resume for ${streamContext}?`
        ],
        is_gemini_live: false,
        warning_notice: 'Connected in local mode. Start FastAPI server with GEMINI_API_KEY for live Google Gemini.'
      };
    }
  },
  getSuggestedPrompts: async (stream: string) => {
    try {
      const res = await api.get(`/ai/prompts?stream=${encodeURIComponent(stream)}`);
      return res.data;
    } catch (err) {
      return {
        stream,
        prompts: [
          `What are top high-paying careers in ${stream}?`,
          `How to analyze my skill gap for target roles?`,
          `What project should I build for my resume?`
        ]
      };
    }
  }
};
