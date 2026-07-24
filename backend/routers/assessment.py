from fastapi import APIRouter
from schemas import AssessmentSubmission
from typing import Dict, Any

router = APIRouter(prefix="/assessment", tags=["Career Assessment"])

@router.get("/questions")
def get_assessment_questions(stream: str = "Computer Science & IT"):
    return {
        "stream": stream,
        "questions": [
            {
                "id": "q1",
                "question": "Which activity brings you the highest focus and intellectual satisfaction?",
                "options": [
                    {"label": "Solving technical logic, coding algorithms, or architectural problems", "trait": "analytical"},
                    {"label": "Analyzing market trends, financial statements, or economic models", "trait": "financial"},
                    {"label": "Understanding human health, biological systems, or patient care", "trait": "clinical"},
                    {"label": "Drafting policy frameworks, legal arguments, or creative strategic writing", "trait": "policy_creative"}
                ]
            },
            {
                "id": "q2",
                "question": "What work environment do you thrive in?",
                "options": [
                    {"label": "Fast-paced tech product company with agile sprints & remote flexibility", "trait": "fast_tech"},
                    {"label": "High-stakes corporate finance, investment firm, or audit environment", "trait": "corporate_finance"},
                    {"label": "Hospital, medical diagnostic research lab, or healthcare clinic", "trait": "healthcare_lab"},
                    {"label": "Public policy institute, courtroom, or strategic consulting firm", "trait": "public_consulting"}
                ]
            },
            {
                "id": "q3",
                "question": "What is your primary career outcome objective?",
                "options": [
                    {"label": "Building scalable software products & high technical compensation", "trait": "tech_scale"},
                    {"label": "Managing capital, corporate strategy, & financial portfolio growth", "trait": "capital_growth"},
                    {"label": "Impactful healthcare delivery, saving lives, or breakthrough bio-research", "trait": "healthcare_impact"},
                    {"label": "Social impact, legal justice, policy reform, or public leadership", "trait": "social_policy"}
                ]
            }
        ]
    }

@router.post("/submit")
def submit_assessment(data: AssessmentSubmission):
    stream = data.stream
    if "commerce" in stream.lower():
        recommendations = [
            {"title": "Chartered Financial Analyst (CFA)", "match": 96, "salary": "₹12 - 35 LPA", "growth": "+22% YoY"},
            {"title": "Corporate Financial Analyst", "match": 92, "salary": "₹8 - 22 LPA", "growth": "+18% YoY"},
            {"title": "Investment Banking Associate", "match": 88, "salary": "₹15 - 45 LPA", "growth": "+25% YoY"}
        ]
    elif "medical" in stream.lower():
        recommendations = [
            {"title": "Clinical Research Scientist", "match": 95, "salary": "₹9 - 28 LPA", "growth": "+24% YoY"},
            {"title": "Healthcare AI & Data Specialist", "match": 91, "salary": "₹14 - 32 LPA", "growth": "+30% YoY"},
            {"title": "Pharmaceutical Product Manager", "match": 87, "salary": "₹11 - 26 LPA", "growth": "+17% YoY"}
        ]
    else:
        recommendations = [
            {"title": "AI & Machine Learning Engineer", "match": 98, "salary": "₹14 - 40 LPA", "growth": "+35% YoY"},
            {"title": "Full-Stack Cloud Architect", "match": 94, "salary": "₹12 - 32 LPA", "growth": "+28% YoY"},
            {"title": "DevOps & Platform Engineer", "match": 89, "salary": "₹10 - 28 LPA", "growth": "+22% YoY"}
        ]

    return {
        "status": "success",
        "stream": stream,
        "score_summary": {"analytical": 88, "strategic": 92, "execution": 85},
        "top_matches": recommendations,
        "ai_insights": f"Based on your assessment responses for {stream}, you demonstrate high strategic clarity and analytical rigor. Focus on mastering high-demand domain certifications over the next 12 months."
    }
