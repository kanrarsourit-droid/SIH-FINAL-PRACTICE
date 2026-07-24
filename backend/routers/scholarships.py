from fastapi import APIRouter
from schemas import CollegePredictorRequest
from typing import List, Dict, Any

# --- SCHOLARSHIPS ROUTER ---
scholarships_router = APIRouter(prefix="/scholarships", tags=["Scholarships"])

SCHOLARSHIPS_LIST = [
    {
        "id": "s1",
        "title": "PM Research Fellowship (PMRF) 2026",
        "organization": "Ministry of Education, Govt of India",
        "amount": "₹70,000 - ₹80,000 / month + ₹2 Lakh Grant",
        "eligibility_stream": "Science, Engineering & Tech",
        "deadline": "2026-09-30",
        "country": "India",
        "apply_url": "https://pmrf.in",
        "description": "Direct Ph.D. admissions fellowship for top GATE / CGPA candidates in premier Indian institutes (IITs, IISc, NITs)."
    },
    {
        "id": "s2",
        "title": "Aditya Birla Capital Financial Leadership Scholarship",
        "organization": "Aditya Birla Foundation",
        "amount": "Up to ₹60,000 per annum",
        "eligibility_stream": "Commerce & Finance",
        "deadline": "2026-08-15",
        "country": "India",
        "apply_url": "https://scholarships.gov.in",
        "description": "Merit-cum-means scholarship for undergraduate students pursuing B.Com, BBA, and CA studies."
    },
    {
        "id": "s3",
        "title": "ICMR Junior Research Fellowship in Medical Sciences",
        "organization": "Indian Council of Medical Research",
        "amount": "₹31,000 / month + HRA",
        "eligibility_stream": "Medical & Healthcare",
        "deadline": "2026-10-10",
        "country": "India",
        "apply_url": "https://icmr.nic.in",
        "description": "Fellowship for postgraduate medical, life science, and pharmacology researchers."
    },
    {
        "id": "s4",
        "title": "Inlaks Shivdasani Foundation Abroad Grant",
        "organization": "Inlaks Foundation",
        "amount": "Up to $100,000 (Full Tuition + Living)",
        "eligibility_stream": "Arts, Law, Humanities & Tech",
        "deadline": "2026-11-01",
        "country": "Global (US/UK/Europe)",
        "apply_url": "https://inlaksfoundation.org",
        "description": "Prestigious global scholarship for outstanding Indian students pursuing top international master's degrees."
    }
]

@scholarships_router.get("")
def get_scholarships(stream: str = None, country: str = None):
    results = SCHOLARSHIPS_LIST
    if stream:
        results = [s for s in results if stream.lower() in s["eligibility_stream"].lower() or "all" in s["eligibility_stream"].lower()]
    if country:
        results = [s for s in results if country.lower() in s["country"].lower()]
    return {"count": len(results), "scholarships": results}


# --- COLLEGE PREDICTOR ROUTER ---
colleges_router = APIRouter(prefix="/colleges", tags=["College Predictor"])

@colleges_router.post("/predict")
def predict_colleges(req: CollegePredictorRequest):
    rank = req.score_or_rank
    exam = req.exam_name
    stream = req.preferred_stream

    # Algorithmic prediction logic
    if rank <= 2500:
        tier1_chances = "95% High Probability"
        tier2_chances = "100% Guaranteed"
        colleges = [
            {"name": "Indian Institute of Technology (IIT) Bombay / Delhi / Madras", "chance": "Very High (92%)", "type": "Premier Govt", "location": "Metropolitan"},
            {"name": "Indian Institute of Management (IIM) Ahmedabad / Bangalore", "chance": "Very High (94%)", "type": "Premier Management", "location": "Metropolitan"},
            {"name": "AIIMS New Delhi / PGIMER", "chance": "High (89%)", "type": "Premier Medical", "location": "New Delhi"}
        ]
    elif rank <= 15000:
        tier1_chances = "75% Moderate Probability"
        tier2_chances = "95% High Probability"
        colleges = [
            {"name": "National Institute of Technology (NIT) Trichy / Surathkal", "chance": "High (88%)", "type": "National Govt", "location": "Trichy / Surathkal"},
            {"name": "SRCC Delhi / St. Xavier's College", "chance": "High (85%)", "type": "Top University", "location": "Delhi / Mumbai"},
            {"name": "BITS Pilani / Hyderabad Campus", "chance": "Very High (91%)", "type": "Premier Deemed", "location": "Pilani / Hyd"}
        ]
    else:
        tier1_chances = "50% Reach Probability"
        tier2_chances = "85% Moderate Probability"
        colleges = [
            {"name": "Vellore Institute of Technology (VIT) Vellore", "chance": "High (90%)", "type": "Top Private", "location": "Vellore"},
            {"name": "Manipal Academy of Higher Education (MAHE)", "chance": "High (88%)", "type": "Top Private", "location": "Manipal"},
            {"name": "Thapar Institute of Engineering & Technology", "chance": "High (86%)", "type": "Top Private", "location": "Patiala"}
        ]

    return {
        "exam_name": exam,
        "score_or_rank": rank,
        "preferred_stream": stream,
        "category": req.category,
        "admission_probability": {
            "tier_1_institutes": tier1_chances,
            "tier_2_institutes": tier2_chances
        },
        "predicted_colleges": colleges,
        "recommendations": [
            "Participate actively in JoSAA / CSAB / MCC state counseling rounds.",
            "Keep 2 backup preference choices in complementary branches.",
            "Verify category quota certificate validity prior to documentation verification."
        ]
    }


# --- INTERNSHIPS ROUTER ---
internships_router = APIRouter(prefix="/internships", tags=["Internships"])

INTERNSHIPS_DATA = [
    {
        "id": "i1",
        "title": "AI & Full-Stack Engineering Intern",
        "company": "PathPilot Tech Labs",
        "location": "Remote / Bengaluru",
        "type": "Full-Time Remote",
        "stipend": "₹25,000 / month",
        "stream": "Computer Science & IT",
        "apply_url": "https://careers.pathpilot.ai",
        "posted_date": "2026-07-20"
    },
    {
        "id": "i2",
        "title": "Corporate Finance & Equity Analyst Intern",
        "company": "InvestCorp Advisory",
        "location": "Mumbai, India",
        "type": "On-Site",
        "stipend": "₹20,000 / month",
        "stream": "Commerce & Finance",
        "apply_url": "https://investcorp.com/careers",
        "posted_date": "2026-07-22"
    },
    {
        "id": "i3",
        "title": "Clinical Research Assistant Intern",
        "company": "Apex BioLabs & Healthcare",
        "location": "Hyderabad, India",
        "type": "Hybrid",
        "stipend": "₹18,000 / month",
        "stream": "Medical & Healthcare",
        "apply_url": "https://apexbio.org",
        "posted_date": "2026-07-21"
    }
]

@internships_router.get("")
def list_internships(stream: str = None):
    results = INTERNSHIPS_DATA
    if stream:
        results = [i for i in results if stream.lower() in i["stream"].lower()]
    return {"count": len(results), "internships": results}
