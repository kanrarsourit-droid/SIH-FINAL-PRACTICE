from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict, Any

# Authentication Schemas
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    current_stream: Optional[str] = "Computer Science & IT"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class GoogleLoginRequest(BaseModel):
    id_token: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]

class UserProfileResponse(BaseModel):
    id: str
    email: str
    full_name: str
    role: str
    current_stream: str
    target_role: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    academic_level: Optional[str] = None
    target_country: Optional[str] = None

# AI Chat Schemas
class ChatMessage(BaseModel):
    message: str
    stream_context: Optional[str] = "Computer Science & IT"
    chat_id: Optional[str] = None
    history: Optional[List[Dict[str, str]]] = []

class AIResponse(BaseModel):
    response: str
    stream_context: str
    chat_id: str
    suggested_followups: List[str]
    is_gemini_live: bool = False
    warning_notice: Optional[str] = None

# Assessment Schemas
class AssessmentSubmission(BaseModel):
    answers: Dict[str, Any]
    stream: str

# Resume Builder & ATS Schemas
class ResumeContent(BaseModel):
    personal_info: Dict[str, str]
    summary: str
    experience: List[Dict[str, Any]]
    education: List[Dict[str, Any]]
    skills: List[str]
    projects: List[Dict[str, Any]]
    certifications: Optional[List[str]] = []

class ATSAnalyzeRequest(BaseModel):
    resume_text: str
    target_role: str
    target_stream: str

# College Predictor Schema
class CollegePredictorRequest(BaseModel):
    exam_name: str
    score_or_rank: int
    category: str = "General"
    preferred_stream: str
    state: Optional[str] = "All India"

# Community Schemas
class DiscussionCreate(BaseModel):
    title: str
    category: str
    content: str

class CommentCreate(BaseModel):
    discussion_id: str
    content: str
