from fastapi import APIRouter
from schemas import ATSAnalyzeRequest, ResumeContent
from services.ats_service import ats_analyzer_service

# --- RESUME ROUTER ---
resume_router = APIRouter(prefix="/resume", tags=["Resume & ATS"])

@resume_router.post("/analyze")
def analyze_resume(req: ATSAnalyzeRequest):
    analysis = ats_analyzer_service.analyze_resume(
        resume_text=req.resume_text,
        target_role=req.target_role,
        target_stream=req.target_stream
    )
    return {
        "status": "success",
        "target_role": req.target_role,
        "target_stream": req.target_stream,
        "analysis": analysis
    }

@resume_router.get("/default-template")
def get_default_template(stream: str = "Computer Science & IT"):
    return {
        "personal_info": {
            "full_name": "Aarav Sharma",
            "email": "aarav.sharma@example.com",
            "phone": "+91 98765 43210",
            "linkedin": "linkedin.com/in/aaravsharma",
            "github": "github.com/aaravsharma",
            "location": "New Delhi, India"
        },
        "summary": "Ambitious and results-driven student seeking high-impact opportunities. Highly skilled in domain frameworks, analytical problem solving, and building scalable production solutions.",
        "experience": [
            {
                "title": "Domain Specialist Intern",
                "company": "NextGen Innovations",
                "period": "Jun 2025 - Aug 2025",
                "description": "Architected and optimized core modules resulting in 35% performance enhancement. Coordinated cross-functional teams."
            }
        ],
        "education": [
            {
                "degree": "Bachelor of Technology / Commerce / Science",
                "institution": "Premier National University",
                "period": "2022 - 2026",
                "cgpa": "8.8 / 10.0"
            }
        ],
        "skills": ["Python / Financial Modeling / Clinical Research", "SQL / Excel", "Git / Communication", "Problem Solving"],
        "projects": [
            {
                "title": "PathPilot Capstone Project",
                "tech": "FastAPI, React, Tailwind, PostgreSQL",
                "description": "Engineered personalized recommendation system for career roadmap planning with context-aware AI."
            }
        ]
    }


# --- INTERVIEW ROUTER ---
interview_router = APIRouter(prefix="/interview", tags=["Interview Prep"])

@interview_router.get("/questions")
def get_interview_questions(stream: str = "Computer Science & IT", target_role: str = "AI Engineer"):
    if "commerce" in stream.lower():
        questions = [
            {"id": 1, "type": "Technical", "question": "Walk me through how a 3-statement financial model links the Balance Sheet, Income Statement, and Cash Flow Statement."},
            {"id": 2, "type": "Behavioral", "question": "Describe a scenario where you identified a financial reporting anomaly during an audit or analysis."},
            {"id": 3, "type": "Strategic", "question": "How do you evaluate working capital efficiency in a fast-growing FinTech company?"}
        ]
    elif "medical" in stream.lower():
        questions = [
            {"id": 1, "type": "Clinical", "question": "What primary ethical and safety considerations guide GCP (Good Clinical Practice) in Phase III clinical trials?"},
            {"id": 2, "type": "Behavioral", "question": "How do you handle high-pressure emergency triage scenarios or diagnostic ambiguity?"},
            {"id": 3, "type": "Technical", "question": "Explain the role of biomarker analytics in personalized oncology treatment pathways."}
        ]
    else:
        questions = [
            {"id": 1, "type": "Technical System Design", "question": "How would you design a rate-limiting middleware for high-concurrency FastAPI microservices handling 10k requests/sec?"},
            {"id": 2, "type": "Coding & Logic", "question": "Explain how Retrieval-Augmented Generation (RAG) prevents hallucination compared to standard LLM prompting."},
            {"id": 3, "type": "Behavioral", "question": "Tell me about a time your production code crashed due to an unhandled edge case and how you fixed it."}
        ]
    
    return {
        "stream": stream,
        "target_role": target_role,
        "questions": questions
    }

@interview_router.post("/evaluate")
def evaluate_answer(user_answer: str, question_id: int):
    return {
        "score": 88,
        "feedback": "Excellent answer! You clearly structured your response with specific domain terminology and concrete methodology.",
        "improvements": "To reach 95%+, quantify your outcomes with metrics (e.g. reduced latency by 40% or improved audit accuracy by 25%).",
        "key_phrases_detected": ["System Architecture", "Optimization", "High Throughput"]
    }
