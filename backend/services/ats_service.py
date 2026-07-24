import re
from typing import Dict, Any, List

class ATSAnalyzerService:
    ACTION_VERBS = {
        "developed", "built", "designed", "engineered", "implemented", "architected",
        "optimized", "managed", "led", "spearheaded", "increased", "decreased",
        "improved", "analyzed", "forecasted", "formulated", "secured", "resolved"
    }

    STREAM_KEYWORDS = {
        "Computer Science & IT": [
            "python", "react", "typescript", "fastapi", "postgresql", "docker", "aws", 
            "system design", "rest api", "git", "ci/cd", "agile", "unit testing", "data structures"
        ],
        "Commerce & Finance": [
            "financial modeling", "tally", "excel", "auditing", "taxation", "accounting", 
            "cfa", "ca", "valuation", "balance sheet", "nism", "sap fico", "costing", "cash flow"
        ],
        "Medical & Healthcare": [
            "clinical research", "pharmacology", "patient care", "diagnostics", "emr", 
            "anatomy", "physiology", "pathology", "medical drafting", "telemedicine", "bio-statistics"
        ],
        "Law & Public Policy": [
            "legal drafting", "moot court", "ipr", "corporate law", "compliance", 
            "policy analysis", "constitutional law", "litigation", "contract negotiation"
        ]
    }

    def analyze_resume(self, resume_text: str, target_role: str, target_stream: str) -> Dict[str, Any]:
        text_lower = resume_text.lower()
        words = re.findall(r'\b\w+\b', text_lower)
        word_count = len(words)

        # 1. Action Verbs Score (0-100)
        found_verbs = [w for w in set(words) if w in self.ACTION_VERBS]
        action_verb_score = min(100, int((len(found_verbs) / 6) * 100))

        # 2. Keyword Match Score (0-100)
        target_keywords = self.STREAM_KEYWORDS.get(target_stream, self.STREAM_KEYWORDS["Computer Science & IT"])
        matched_keywords = [kw for kw in target_keywords if kw in text_lower]
        missing_keywords = [kw for kw in target_keywords if kw not in text_lower]
        keyword_score = int((len(matched_keywords) / max(1, len(target_keywords))) * 100)

        # 3. Formatting & Section Check
        has_contact = bool(re.search(r'[\w\.-]+@[\w\.-]+', resume_text)) or bool(re.search(r'\+?\d[\d -]{8,}\d', resume_text))
        has_education = "education" in text_lower or "university" in text_lower or "college" in text_lower
        has_experience = "experience" in text_lower or "project" in text_lower or "internship" in text_lower
        has_skills = "skill" in text_lower or "technologies" in text_lower

        format_check_count = sum([has_contact, has_education, has_experience, has_skills])
        formatting_score = int((format_check_count / 4) * 100)

        # 4. Overall Weighted Score
        ats_compatibility = int((keyword_score * 0.4) + (action_verb_score * 0.3) + (formatting_score * 0.3))
        overall_score = min(98, max(45, ats_compatibility))

        # Strengths & Improvements
        strengths = []
        improvements = []

        if has_contact:
            strengths.append("Clear contact information detected (Email/Phone).")
        else:
            improvements.append("Add clear header contact information (Email, Phone, LinkedIn).")

        if len(found_verbs) >= 4:
            strengths.append(f"Strong action verb usage ({', '.join(found_verbs[:4])}).")
        else:
            improvements.append("Incorporate more high-impact action verbs (e.g. Architected, Optimized, Spearheaded).")

        if keyword_score >= 60:
            strengths.append(f"High relevance to target stream ({target_stream}).")
        else:
            improvements.append(f"Include key domain skills: {', '.join(missing_keywords[:4])}.")

        if word_count < 150:
            improvements.append("Resume content is sparse. Expand on project descriptions and quantifiable outcomes.")

        return {
            "overall_score": overall_score,
            "ats_compatibility": ats_compatibility,
            "formatting_score": formatting_score,
            "keyword_score": keyword_score,
            "action_verbs_score": action_verb_score,
            "word_count": word_count,
            "matched_keywords": matched_keywords,
            "missing_keywords": missing_keywords,
            "strengths": strengths,
            "improvements": improvements
        }

ats_analyzer_service = ATSAnalyzerService()
