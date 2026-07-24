import os
import json
import logging
from typing import List, Dict, Any, Tuple
from config import settings

logger = logging.getLogger("pathpilot-gemini")

class GeminiService:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.is_configured = bool(self.api_key and len(self.api_key) > 5)
        
        if self.is_configured:
            try:
                import google.generativeai as genai
                genai.configure(api_key=self.api_key)
                self.model = genai.GenerativeModel("gemini-1.5-flash")
            except Exception as e:
                logger.error(f"Failed to initialize Gemini SDK: {e}")
                self.is_configured = False

    def generate_mentorship_response(
        self,
        user_message: str,
        stream_context: str,
        history: List[Dict[str, str]] = None
    ) -> Tuple[str, List[str], bool, str]:
        """
        Generates a context-grounded AI mentor response for students.
        Prevents cross-domain hallucination (e.g. Commerce vs Medicine vs CS).
        Returns (response_text, suggested_followups, is_live, notice_message).
        """
        # Format stream-aware system boundary prompt
        system_instruction = f"""
        YOU ARE PATHPILOT AI: A World-Class Personalized Career & Education Advisor for Smart India Hackathon.
        
        CRITICAL STREAM CONTEXT RULES:
        - The current user's academic stream is: "{stream_context}".
        - YOU MUST ANSWER STRICTLY WITHIN THE CONTEXT OF {stream_context.upper()} unless the user specifically requests a comparative stream switch.
        - Example 1: If user's stream is Commerce & Finance, DO NOT suggest Python, Java, or Software Engineering unless specifically asked. Focus on Chartered Accountancy, CFA, Corporate Law, Investment Banking, FinTech, Financial Modeling, Digital Accounting.
        - Example 2: If user's stream is Medical & Healthcare, focus on MBBS, BDS, Nursing, Biotechnology, Pharmacology, Clinical Research, Health Informatics.
        - Example 3: If user's stream is Engineering / Tech, focus on System Architecture, Data Science, AI, Cloud, Cybersecurity.
        - Tone: Encouraging, precise, structured, high-value, actionable with bullet points and bulleted learning pathways.
        - Include relevant top Indian/Global competitive exams, certifications, and realistic salary milestones when relevant.
        """

        if self.is_configured:
            try:
                import google.generativeai as genai
                # Prepare prompt with history
                context_prompt = system_instruction + "\n\n"
                if history:
                    context_prompt += "Previous Conversation Context:\n"
                    for h in history[-4:]: # Last 4 turns
                        role = "Student" if h.get("sender") == "user" else "PathPilot AI"
                        context_prompt += f"{role}: {h.get('content')}\n"
                
                context_prompt += f"\nStudent Question ({stream_context}): {user_message}\n\nPathPilot AI Advice:"
                
                response = self.model.generate_content(context_prompt)
                ai_text = response.text
                
                followups = self._generate_suggested_followups(stream_context, user_message)
                return ai_text, followups, True, ""
            except Exception as e:
                logger.warning(f"Gemini API call failed, falling back to Stream AI Engine: {e}")
                return self._generate_stream_fallback(user_message, stream_context)
        else:
            return self._generate_stream_fallback(user_message, stream_context)

    def _generate_stream_fallback(self, user_msg: str, stream: str) -> Tuple[str, List[str], bool, str]:
        """
        Intelligent stream-aware fallback when Gemini API key is omitted or quota is exceeded.
        Guarantees domain relevance!
        """
        msg_lower = user_msg.lower()
        notice = "Notice: Running on PathPilot Local AI Mentorship Engine. To connect live Gemini API, set GEMINI_API_KEY in backend environment."
        
        if "commerce" in stream.lower() or "finance" in stream.lower() or "ca" in msg_lower or "cfa" in msg_lower:
            ans = f"""### 📊 PathPilot Career & Skill Guidance for **{stream}**

Thank you for your question regarding **{user_msg}**. Here is your tailored roadmap for the **Commerce & Finance Stream**:

#### 🚀 Key Professional Pathways:
1. **Chartered Accountancy (CA / ICAI)**: Core auditing, tax policy, corporate finance.
2. **CFA (Chartered Financial Analyst)**: Global investment management, equity research, portfolio strategies.
3. **Financial Modeling & Valuation Specialist**: High-demand corporate finance role leveraging Excel, Python for Finance, and Bloomberg terminals.
4. **FinTech Product Specialist**: Bridging financial compliance with digital payment innovations.

#### 🎯 Recommended Action Plan for Next 6 Months:
* **Certifications**: Complete NISM Certifications (Series V-A / Series VIII) or ACCA modules.
* **Core Technical Skills**: Advanced Financial Modeling, Tally Prime, SAP FICO, Financial Statement Analysis.
* **Internship Target**: Seek roles in Big 4 firms, investment boutiques, or FinTech startups.

> 💡 *Pro-Tip*: Focus heavily on data analytics applied to accounting. Financial analysts who master Python/R for quantitative modeling command 40% higher starting packages.
"""
            followups = [
                "How to balance CA Foundation prep with college exams?",
                "Top certifications for Investment Banking in India?",
                "Compare CFA vs MBA Finance salary prospects."
            ]

        elif "medical" in stream.lower() or "healthcare" in stream.lower() or "neet" in msg_lower or "doctor" in msg_lower:
            ans = f"""### 🩺 PathPilot Healthcare & Clinical Guide for **{stream}**

Addressing your inquiry: **"{user_msg}"** in the **Healthcare & Medical Sciences Domain**.

#### ⚕️ Top Specializations & Career Paths:
1. **Clinical Medicine (MBBS / Post-Grad MD/MS)**: Primary healthcare, surgery, specialization (Cardiology, Radiology, Oncology).
2. **Allied Health & Biotechnology**: Clinical Research, Genetic Engineering, Molecular Biology.
3. **Health Informatics & MedTech**: Managing hospital data architectures, AI-driven diagnostic assistance.
4. **Pharmaceutical R&D & Regulatory Affairs**: Drug discovery, clinical trials management, FDA/CDSCO compliance.

#### 📈 Key Milestones & Exam Preparation:
* **Competitive Exams**: NEET-UG / NEET-PG, USMLE (for US residency), PLAB (for UK residency).
* **Practical Experience**: Clinical observerships, research paper publications, hospital volunteering.
* **Modern Skill Add-ons**: Telemedicine protocols, EMR software management, Bio-statistics.
"""
            followups = [
                "What are non-clinical high-paying medical careers?",
                "How to prepare for USMLE Step 1 alongside MBBS?",
                "Scope of Biomedical Engineering and Health AI."
            ]

        elif "arts" in stream.lower() or "law" in stream.lower() or "humanities" in stream.lower():
            ans = f"""### ⚖️ PathPilot Humanities, Law & Creative Leadership Guide for **{stream}**

Here is specialized guidance tailored to your inquiry on **"{user_msg}"** for **{stream}**:

#### 🏛️ Top Career Trajectories:
1. **Corporate & Tech Law**: Cyber Law, Intellectual Property (IPR), Corporate M&A (CLAT PG / Judicial Services).
2. **Policy Analysis & Public Administration**: Civil Services (UPSC), Think Tanks, Policy Research.
3. **UX Research & Behavioral Design**: Applying psychology and anthropology to product interface design.
4. **Digital Media & Strategic Communications**: Content Strategy, Brand Consulting, Corporate PR.

#### 💡 Essential Skills & Portfolio Building:
* **Legal / Academic**: Legal Drafting, Moot Court competitions, Policy Position Papers.
* **Digital Tools**: Notion, SPSS/STATA for data analysis, Figma for design research.
"""
            followups = [
                "How to get internships in top think tanks or law firms?",
                "Key preparation tips for Civil Services (UPSC) CSE?",
                "Scope of UX Research for Humanities graduates."
            ]

        else: # Computer Science / Tech Default
            ans = f"""### 💻 PathPilot Technology & Software Engineering Guide for **{stream}**

Here is your strategic roadmap for **"{user_msg}"** within **{stream}**:

#### ⚡ High-Growth Specializations:
1. **Full-Stack & Cloud Architecture**: React, Node.js/FastAPI, AWS, Docker, Kubernetes.
2. **AI & Machine Learning Engineering**: PyTorch, LangChain, RAG Systems, Model Fine-tuning.
3. **Data Engineering & Analytics**: Snowflake, Spark, SQL, dbt, Pipeline Orchestration.
4. **Cybersecurity & DevSecOps**: Zero-Trust architecture, Penetration Testing, Cloud Security.

#### 🛠 Actionable Roadmap:
* **Core Fundamentals**: Data Structures & Algorithms, System Design, Git workflows.
* **Portfolio Focus**: Build 2 production-ready full-stack apps with live deployment.
* **Open Source**: Contribute to active GitHub repositories.
"""
            followups = [
                "What system design concepts are asked in SDE-1 interviews?",
                "How to transition from Web Dev to AI/ML Engineering?",
                "Best open-source programs for university students."
            ]

        return ans, followups, False, notice

    def _generate_suggested_followups(self, stream: str, query: str) -> List[str]:
        if "commerce" in stream.lower():
            return [
                "What skills are required for Financial Analyst roles?",
                "How to land internships at top consulting firms?",
                "Which certifications complement a B.Com degree?"
            ]
        elif "medical" in stream.lower():
            return [
                "What are the best research internship opportunities?",
                "How to prepare for clinical residency entrance exams?",
                "Scope of Healthcare Data Science in India and abroad."
            ]
        else:
            return [
                "What projects should I feature on my resume for target roles?",
                "How to prepare for technical coding rounds?",
                "What key certifications add value in current market?"
            ]

gemini_service = GeminiService()
