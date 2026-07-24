-- ==========================================
-- PATHPILOT AI - POSTGRESQL & SUPABASE SCHEMA
-- Smart India Hackathon Project Database
-- ==========================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. USERS & AUTHENTICATION TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'student',
    provider VARCHAR(50) DEFAULT 'email', -- 'email' or 'google'
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ==========================================
-- 2. USER PROFILES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    phone VARCHAR(50),
    current_stream VARCHAR(100) DEFAULT 'Computer Science & IT', 
    -- e.g. 'Computer Science & IT', 'Commerce & Finance', 'Medical & Healthcare', 'Mechanical & Core Eng', 'Arts & Humanities', 'Law & Public Policy'
    academic_level VARCHAR(100) DEFAULT 'Undergraduate',
    target_role VARCHAR(150) DEFAULT 'AI Engineer',
    target_country VARCHAR(100) DEFAULT 'India',
    bio TEXT,
    location VARCHAR(100),
    preferred_language VARCHAR(50) DEFAULT 'English',
    gpa_or_percentage NUMERIC(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_profile UNIQUE (user_id)
);

CREATE INDEX IF NOT EXISTS idx_profiles_stream ON profiles(current_stream);

-- ==========================================
-- 3. CAREER ASSESSMENTS & MATCHES
-- ==========================================
CREATE TABLE IF NOT EXISTS career_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    stream VARCHAR(100) NOT NULL,
    answers JSONB NOT NULL,
    skill_scores JSONB NOT NULL,
    recommended_careers JSONB NOT NULL,
    ai_insights TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS career_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    match_score INT CHECK (match_score BETWEEN 0 AND 100),
    avg_salary VARCHAR(100),
    growth_rate VARCHAR(50),
    demand_level VARCHAR(50),
    required_skills JSONB,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 4. SKILLS & GAP ANALYZER
-- ==========================================
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    stream VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_name VARCHAR(150) NOT NULL,
    proficiency VARCHAR(50) DEFAULT 'Intermediate', -- 'Beginner', 'Intermediate', 'Advanced'
    is_target_skill BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 5. LEARNING ROADMAPS & COURSES
-- ==========================================
CREATE TABLE IF NOT EXISTS learning_roadmaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    target_role VARCHAR(150) NOT NULL,
    stream VARCHAR(100) NOT NULL,
    nodes JSONB NOT NULL, -- Visual step nodes with progress
    completion_percentage INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    provider VARCHAR(150) NOT NULL,
    url TEXT NOT NULL,
    duration VARCHAR(50),
    rating NUMERIC(3,2),
    level VARCHAR(50),
    stream VARCHAR(100),
    is_free BOOLEAN DEFAULT TRUE,
    price VARCHAR(50) DEFAULT 'Free'
);

-- ==========================================
-- 6. RESUME & ATS ANALYZER
-- ==========================================
CREATE TABLE IF NOT EXISTS resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) DEFAULT 'My Resume',
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS resume_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    overall_score INT CHECK (overall_score BETWEEN 0 AND 100),
    ats_compatibility INT,
    formatting_score INT,
    keyword_score INT,
    action_verbs_score INT,
    strengths JSONB,
    improvements JSONB,
    missing_keywords JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 7. SCHOLARSHIPS, COLLEGES & INTERNSHIPS
-- ==========================================
CREATE TABLE IF NOT EXISTS scholarships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    amount VARCHAR(100) NOT NULL,
    eligibility_stream VARCHAR(100) NOT NULL,
    deadline DATE NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    apply_url TEXT NOT NULL,
    description TEXT,
    requirements JSONB
);

CREATE TABLE IF NOT EXISTS college_predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exam_name VARCHAR(100) NOT NULL, -- e.g. JEE Main, NEET, CAT, CLAT, GATE
    score_or_rank INT NOT NULL,
    category VARCHAR(50) DEFAULT 'General',
    stream VARCHAR(100) NOT NULL,
    predicted_colleges JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS internships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(150) NOT NULL,
    type VARCHAR(50) DEFAULT 'Remote',
    stipend VARCHAR(100),
    stream VARCHAR(100) NOT NULL,
    apply_url TEXT NOT NULL,
    posted_date DATE DEFAULT CURRENT_DATE
);

-- ==========================================
-- 8. AI MENTOR CHAT & CONVERSATIONS
-- ==========================================
CREATE TABLE IF NOT EXISTS chats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) DEFAULT 'New Conversation',
    stream_context VARCHAR(100) NOT NULL DEFAULT 'General',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    sender VARCHAR(20) NOT NULL CHECK (sender IN ('user', 'assistant')),
    content TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ai_conversations_chat ON ai_conversations(chat_id);

-- ==========================================
-- 9. NOTIFICATIONS, ACHIEVEMENTS & SOCIAL
-- ==========================================
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    badge_icon VARCHAR(50) NOT NULL,
    description TEXT,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    credential_url TEXT
);

CREATE TABLE IF NOT EXISTS user_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    repo_url TEXT,
    live_url TEXT,
    tech_stack JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    module_name VARCHAR(100) NOT NULL,
    completed_items INT DEFAULT 0,
    total_items INT DEFAULT 10,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    theme VARCHAR(20) DEFAULT 'dark',
    email_notifications BOOLEAN DEFAULT TRUE,
    ai_tone VARCHAR(50) DEFAULT 'encouraging',
    language VARCHAR(20) DEFAULT 'en',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_type VARCHAR(50) NOT NULL, -- 'career', 'scholarship', 'internship', 'course'
    item_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS forum_discussions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    author_name VARCHAR(150) NOT NULL,
    author_avatar TEXT,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    upvotes INT DEFAULT 0,
    replies_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS forum_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    discussion_id UUID NOT NULL REFERENCES forum_discussions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    author_name VARCHAR(150) NOT NULL,
    author_avatar TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 10. AUTOMATIC UPDATED_AT TRIGGER FUNCTION
-- ==========================================
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
CREATE TRIGGER update_roadmaps_modtime BEFORE UPDATE ON learning_roadmaps FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
CREATE TRIGGER update_resumes_modtime BEFORE UPDATE ON resumes FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
CREATE TRIGGER update_settings_modtime BEFORE UPDATE ON settings FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();

-- ==========================================
-- 11. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own profile" ON profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view their assessments" ON career_assessments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their roadmaps" ON learning_roadmaps FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their resumes" ON resumes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access their AI chats" ON chats FOR ALL USING (auth.uid() = user_id);
