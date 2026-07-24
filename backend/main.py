from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging

from config import settings
from routers.auth import router as auth_router
from routers.ai_mentor import router as ai_mentor_router
from routers.assessment import router as assessment_router
from routers.careers import careers_router, skills_router, roadmap_router
from routers.resume import resume_router, interview_router
from routers.scholarships import scholarships_router, colleges_router, internships_router
from routers.community import community_router, profile_router, settings_router, admin_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("pathpilot-main")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="Production-ready backend API for PathPilot AI (Smart India Hackathon Project)"
)

# Configure CORS so React Frontend can communicate seamlessly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled Exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred.", "error_summary": str(exc)}
    )

# Mount all Routers under /api/v1
api_prefix = settings.API_V1_STR
app.include_router(auth_router, prefix=api_prefix)
app.include_router(ai_mentor_router, prefix=api_prefix)
app.include_router(assessment_router, prefix=api_prefix)
app.include_router(careers_router, prefix=api_prefix)
app.include_router(skills_router, prefix=api_prefix)
app.include_router(roadmap_router, prefix=api_prefix)
app.include_router(resume_router, prefix=api_prefix)
app.include_router(interview_router, prefix=api_prefix)
app.include_router(scholarships_router, prefix=api_prefix)
app.include_router(colleges_router, prefix=api_prefix)
app.include_router(internships_router, prefix=api_prefix)
app.include_router(community_router, prefix=api_prefix)
app.include_router(profile_router, prefix=api_prefix)
app.include_router(settings_router, prefix=api_prefix)
app.include_router(admin_router, prefix=api_prefix)

@app.get("/")
def root():
    return {
        "status": "online",
        "platform": "PathPilot AI - Smart India Hackathon",
        "tagline": "Your Personalized AI Career & Education Advisor",
        "docs_url": "/docs",
        "api_v1": settings.API_V1_STR,
        "gemini_api_configured": bool(settings.GEMINI_API_KEY)
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "PathPilot FastAPI"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
