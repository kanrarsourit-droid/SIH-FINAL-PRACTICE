import uuid
from fastapi import APIRouter, Depends
from schemas import ChatMessage, AIResponse
from services.gemini_service import gemini_service

router = APIRouter(prefix="/ai", tags=["AI Mentor"])

CHAT_SESSIONS = {}

@router.post("/chat", response_model=AIResponse)
def chat_with_mentor(body: ChatMessage):
    chat_id = body.chat_id or f"chat_{uuid.uuid4().hex[:8]}"
    stream_context = body.stream_context or "Computer Science & IT"
    
    # Store session history
    if chat_id not in CHAT_SESSIONS:
        CHAT_SESSIONS[chat_id] = []
    
    history = CHAT_SESSIONS[chat_id]
    
    # Generate AI mentor advice with strict stream context
    ai_text, followups, is_live, notice = gemini_service.generate_mentorship_response(
        user_message=body.message,
        stream_context=stream_context,
        history=history
    )

    # Append to conversation log
    CHAT_SESSIONS[chat_id].append({"sender": "user", "content": body.message})
    CHAT_SESSIONS[chat_id].append({"sender": "assistant", "content": ai_text})

    return AIResponse(
        response=ai_text,
        stream_context=stream_context,
        chat_id=chat_id,
        suggested_followups=followups,
        is_gemini_live=is_live,
        warning_notice=notice if notice else None
    )

@router.get("/prompts")
def get_suggested_prompts(stream: str = "Computer Science & IT"):
    if "commerce" in stream.lower():
        return {
            "stream": stream,
            "prompts": [
                "What are the top 3 certifications after B.Com / BBA for high-paying finance roles?",
                "How to prepare for CA Foundation exams alongside college studies?",
                "What skills do I need to break into Corporate Financial Analysis?",
                "Explain the career roadmap from Junior Accountant to CFO."
            ]
        }
    elif "medical" in stream.lower():
        return {
            "stream": stream,
            "prompts": [
                "What non-clinical high-paying careers exist for Medical & Biotech graduates?",
                "How should I structure my preparation for USMLE Step 1?",
                "What are the emerging opportunities in Health AI & Clinical Informatics?",
                "Compare MD vs Clinical Research vs Hospital Administration."
            ]
        }
    elif "arts" in stream.lower() or "law" in stream.lower():
        return {
            "stream": stream,
            "prompts": [
                "How to get corporate law internships in Tier 1 law firms?",
                "What are the key career steps to become a Policy Analyst in public think tanks?",
                "How can Humanities graduates transition into high-demand UX Research?",
                "What is the preparation strategy for UPSC Civil Services CSE?"
            ]
        }
    else: # CS / Engineering
        return {
            "stream": stream,
            "prompts": [
                "What is the step-by-step roadmap to become a Senior Full-Stack & AI Engineer?",
                "How to analyze and fix my skill gap for cloud architecture (AWS/GCP)?",
                "What coding interview patterns are most tested at top tech product companies?",
                "How do I structure my GitHub projects to pass initial recruiter ATS screening?"
            ]
        }
