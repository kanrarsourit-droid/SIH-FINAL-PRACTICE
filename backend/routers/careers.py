from fastapi import APIRouter
from typing import List, Dict, Any

# --- CAREERS ROUTER ---
careers_router = APIRouter(prefix="/careers", tags=["Careers"])

CAREERS_DATA = [
    {
        "id": "c1",
        "title": "AI & Machine Learning Engineer",
        "category": "Technology & AI",
        "stream": "Computer Science & IT",
        "match_score": 98,
        "avg_salary": "₹15 - 45 LPA",
        "growth_rate": "+38% YoY",
        "demand_level": "Very High",
        "description": "Designs and deploys artificial intelligence systems, LLM fine-tuning, RAG pipelines, and neural networks.",
        "skills": ["Python", "PyTorch", "FastAPI", "Transformers", "Docker", "Vector DBs"]
    },
    {
        "id": "c2",
        "title": "Chartered Financial Analyst (CFA)",
        "category": "Finance & Investment",
        "stream": "Commerce & Finance",
        "match_score": 96,
        "avg_salary": "₹14 - 38 LPA",
        "growth_rate": "+24% YoY",
        "demand_level": "High",
        "description": "Manages investment portfolios, equity valuation, financial risk modeling, and asset management.",
        "skills": ["Financial Modeling", "Portfolio Management", "Equity Research", "Valuation", "Excel", "Bloomberg"]
    },
    {
        "id": "c3",
        "title": "Clinical Research Scientist",
        "category": "Healthcare & Biotech",
        "stream": "Medical & Healthcare",
        "match_score": 94,
        "avg_salary": "₹10 - 28 LPA",
        "growth_rate": "+26% YoY",
        "demand_level": "High",
        "description": "Leads clinical trials, pharmaceutical evaluation, drug safety protocols, and healthcare data analysis.",
        "skills": ["Clinical Trials", "Bio-statistics", "Pharmacology", "Regulatory Compliance", "GCP", "Medical Writing"]
    },
    {
        "id": "c4",
        "title": "Corporate Law & Compliance Counsel",
        "category": "Legal & Public Policy",
        "stream": "Law & Public Policy",
        "match_score": 93,
        "avg_salary": "₹12 - 32 LPA",
        "growth_rate": "+20% YoY",
        "demand_level": "High",
        "description": "Advises corporations on legal compliance, mergers & acquisitions, intellectual property, and contract drafting.",
        "skills": ["Legal Drafting", "IPR", "Contract Negotiation", "Corporate Law", "Arbitration", "Due Diligence"]
    }
]

@careers_router.get("")
def list_careers(stream: str = None, query: str = None):
    results = CAREERS_DATA
    if stream:
        results = [c for c in results if stream.lower() in c["stream"].lower()]
    if query:
        q = query.lower()
        results = [c for c in results if q in c["title"].lower() or q in c["description"].lower()]
    return {"count": len(results), "careers": results}

@careers_router.get("/{career_id}")
def get_career_detail(career_id: str):
    career = next((c for c in CAREERS_DATA if c["id"] == career_id), CAREERS_DATA[0])
    return career


# --- SKILLS ROUTER ---
skills_router = APIRouter(prefix="/skills", tags=["Skill Gap"])

@skills_router.get("/analyze")
def analyze_skill_gap(target_role: str = "AI Engineer", stream: str = "Computer Science & IT"):
    return {
        "target_role": target_role,
        "stream": stream,
        "overall_readiness": 72,
        "skill_matrix": [
            {"skill": "Core Fundamentals", "acquired": 85, "required": 90, "gap": "Low"},
            {"skill": "Domain Technologies", "acquired": 65, "required": 85, "gap": "Medium"},
            {"skill": "Practical Projects", "acquired": 70, "required": 90, "gap": "Medium"},
            {"skill": "Certifications & Industry Standard", "acquired": 40, "required": 80, "gap": "High"},
            {"skill": "Problem Solving & System Architecture", "acquired": 68, "required": 85, "gap": "Medium"}
        ],
        "priority_actions": [
            "Complete 1 certified industry project in target stream.",
            "Attain 1 professional credential (e.g. AWS Certified / NISM Series / Clinical GCP).",
            "Refine resume with quantifiable achievement metrics."
        ]
    }


# --- ROADMAP ROUTER ---
roadmap_router = APIRouter(prefix="/roadmap", tags=["Learning Roadmap"])

@roadmap_router.get("/my")
def get_user_roadmap(target_role: str = "AI Engineer", stream: str = "Computer Science & IT"):
    return {
        "title": f"PathPilot Accelerated Roadmap: {target_role}",
        "target_role": target_role,
        "stream": stream,
        "total_nodes": 4,
        "completed_nodes": 1,
        "progress_percentage": 25,
        "nodes": [
            {
                "step": 1,
                "title": "Phase 1: Foundations & Core Mastery",
                "status": "completed",
                "duration": "4 Weeks",
                "topics": ["Core Domain Principles", "Syntax & Tooling Setup", "Data Handling Fundamentals"],
                "resources": ["Coursera Fundamentals", "Official Docs Guide"]
            },
            {
                "step": 2,
                "title": "Phase 2: Applied Projects & Frameworks",
                "status": "in_progress",
                "duration": "6 Weeks",
                "topics": ["Building End-to-End Projects", "REST APIs / Financial Modeling / Clinical Data"],
                "resources": ["PathPilot Practice Modules", "GitHub Repositories"]
            },
            {
                "step": 3,
                "title": "Phase 3: Industry Certification & Portfolio",
                "status": "pending",
                "duration": "4 Weeks",
                "topics": ["Professional Certification Exam", "Production Deployment / Regulatory Review"],
                "resources": ["Official Exam Prep", "Portfolio Reviewer"]
            },
            {
                "step": 4,
                "title": "Phase 4: Interview Prep & Career Launch",
                "status": "pending",
                "duration": "2 Weeks",
                "topics": ["Mock Interviews", "ATS Resume Optimization", "Job Application Strategy"],
                "resources": ["PathPilot AI Interview Simulator"]
            }
        ]
    }
