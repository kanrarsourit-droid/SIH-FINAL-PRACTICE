from fastapi import APIRouter
from schemas import DiscussionCreate, CommentCreate
from typing import List, Dict, Any

# --- COMMUNITY ROUTER ---
community_router = APIRouter(prefix="/community", tags=["Community Forum"])

DISCUSSIONS_STORE = [
    {
        "id": "disc_1",
        "author_name": "Priya Nair",
        "author_avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        "title": "How to transition from B.Com into Data Analytics and FinTech roles?",
        "category": "Commerce & Finance",
        "content": "I am currently in my final year of B.Com. I want to build a career at the intersection of Finance and Data Science. Which tools and certifications should I prioritize first?",
        "upvotes": 42,
        "replies_count": 8,
        "created_at": "2 hours ago"
    },
    {
        "id": "disc_2",
        "author_name": "Rohan Mehta",
        "author_avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        "title": "Tips for acing technical system design rounds at Tier 1 Tech Product Companies?",
        "category": "Technology & CS",
        "content": "Preparing for SDE-2 interviews. Looking for recommended resources on Distributed Caching, Load Balancing, and Microservice rate limiting.",
        "upvotes": 68,
        "replies_count": 14,
        "created_at": "5 hours ago"
    }
]

@community_router.get("/discussions")
def get_discussions(category: str = None):
    results = DISCUSSIONS_STORE
    if category and category != "All":
        results = [d for d in results if category.lower() in d["category"].lower()]
    return {"discussions": results}

@community_router.post("/discussions")
def create_discussion(req: DiscussionCreate):
    new_disc = {
        "id": f"disc_{len(DISCUSSIONS_STORE) + 1}",
        "author_name": "PathPilot Student",
        "author_avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=NewPost",
        "title": req.title,
        "category": req.category,
        "content": req.content,
        "upvotes": 1,
        "replies_count": 0,
        "created_at": "Just now"
    }
    DISCUSSIONS_STORE.insert(0, new_disc)
    return {"status": "success", "discussion": new_disc}


# --- PROFILE ROUTER ---
profile_router = APIRouter(prefix="/profile", tags=["User Profile"])

USER_PROFILE_STORE = {
    "full_name": "Aarav Sharma",
    "email": "aarav.sharma@example.com",
    "current_stream": "Computer Science & IT",
    "academic_level": "Undergraduate (B.Tech 3rd Year)",
    "target_role": "AI Architect",
    "target_country": "India",
    "phone": "+91 98765 43210",
    "location": "New Delhi, India",
    "bio": "Enthusiastic computer science student passionate about building context-aware AI systems and scalable cloud backend microservices.",
    "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
}

@profile_router.get("")
def get_profile():
    return USER_PROFILE_STORE

@profile_router.put("")
def update_profile(data: Dict[str, Any]):
    USER_PROFILE_STORE.update(data)
    return {"status": "success", "profile": USER_PROFILE_STORE}


# --- SETTINGS ROUTER ---
settings_router = APIRouter(prefix="/settings", tags=["Settings"])

USER_SETTINGS = {
    "theme": "dark",
    "email_notifications": True,
    "ai_tone": "encouraging",
    "language": "en"
}

@settings_router.get("")
def get_settings():
    return USER_SETTINGS

@settings_router.put("")
def update_settings(data: Dict[str, Any]):
    USER_SETTINGS.update(data)
    return {"status": "success", "settings": USER_SETTINGS}


# --- ADMIN ROUTER ---
admin_router = APIRouter(prefix="/admin", tags=["Admin Panel"])

@admin_router.get("/stats")
def get_admin_stats():
    return {
        "platform_metrics": {
            "total_students": 14250,
            "active_ai_sessions": 3840,
            "career_assessments_completed": 9210,
            "resumes_analyzed": 5120,
            "scholarship_matches": 12400
        },
        "stream_distribution": [
            {"stream": "Computer Science & IT", "percentage": 42},
            {"stream": "Commerce & Finance", "percentage": 28},
            {"stream": "Medical & Healthcare", "percentage": 18},
            {"stream": "Arts, Law & Humanities", "percentage": 12}
        ],
        "recent_activity": [
            {"user": "Rahul S.", "action": "Completed Skill Gap Analysis", "timestamp": "2 mins ago"},
            {"user": "Ananya P.", "action": "Generated Learning Roadmap for CFA", "timestamp": "5 mins ago"},
            {"user": "Vikas M.", "action": "Analyzed Resume with ATS Engine", "timestamp": "12 mins ago"}
        ]
    }
