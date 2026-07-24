export interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  current_stream: string;
  target_role?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  academic_level?: string;
  target_country?: string;
}

export interface CareerItem {
  id: string;
  title: string;
  category: string;
  stream: string;
  match_score: number;
  avg_salary: string;
  growth_rate: string;
  demand_level: string;
  description: string;
  skills: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  stream_context?: string;
  timestamp: string;
}

export interface AIResponse {
  response: string;
  stream_context: string;
  chat_id: string;
  suggested_followups: string[];
  is_gemini_live: boolean;
  warning_notice?: string;
}

export interface Scholarship {
  id: string;
  title: string;
  organization: string;
  amount: string;
  eligibility_stream: string;
  deadline: string;
  country: string;
  apply_url: string;
  description: string;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  stipend: string;
  stream: string;
  apply_url: string;
  posted_date: string;
}

export interface Discussion {
  id: string;
  author_name: string;
  author_avatar: string;
  title: string;
  category: string;
  content: string;
  upvotes: number;
  replies_count: number;
  created_at: string;
}
