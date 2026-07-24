import jwt
import datetime
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from schemas import UserRegister, UserLogin, GoogleLoginRequest, Token, UserProfileResponse
from config import settings

router = APIRouter(prefix="/auth", tags=["Authentication"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login", auto_error=False)

# In-memory mock database store for seamless dev/testing if DB connection string isn't live
MOCK_USERS_DB = {}

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.ALGORITHM)
    return encoded_jwt

@router.post("/register", response_model=Token)
def register(user_in: UserRegister):
    if user_in.email in MOCK_USERS_DB:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_id = f"usr_{len(MOCK_USERS_DB) + 1001}"
    user_data = {
        "id": user_id,
        "email": user_in.email,
        "full_name": user_in.full_name,
        "role": "student",
        "current_stream": user_in.current_stream or "Computer Science & IT",
        "avatar_url": f"https://api.dicebear.com/7.x/avataaars/svg?seed={user_in.email}",
        "password": user_in.password
    }
    MOCK_USERS_DB[user_in.email] = user_data
    
    token = create_access_token({"sub": user_id, "email": user_in.email})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {k: v for k, v in user_data.items() if k != "password"}
    }

@router.post("/login", response_model=Token)
def login(credentials: UserLogin):
    user = MOCK_USERS_DB.get(credentials.email)
    
    # Auto-create demo user if logging in for test convenience
    if not user:
        user_id = f"usr_demo_{credentials.email.split('@')[0]}"
        user = {
            "id": user_id,
            "email": credentials.email,
            "full_name": credentials.email.split('@')[0].capitalize() + " Student",
            "role": "student",
            "current_stream": "Computer Science & IT",
            "avatar_url": f"https://api.dicebear.com/7.x/avataaars/svg?seed={credentials.email}",
            "password": credentials.password
        }
        MOCK_USERS_DB[credentials.email] = user

    token = create_access_token({"sub": user["id"], "email": user["email"]})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {k: v for k, v in user.items() if k != "password"}
    }

@router.post("/google", response_model=Token)
def google_login(req: GoogleLoginRequest):
    # Simulated Google OAuth token verify
    email = "google_user@sih-pathpilot.ai"
    user = MOCK_USERS_DB.get(email)
    if not user:
        user_id = "usr_google_1"
        user = {
            "id": user_id,
            "email": email,
            "full_name": "Google Authenticated Student",
            "role": "student",
            "current_stream": "Computer Science & IT",
            "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=GoogleUser",
            "password": ""
        }
        MOCK_USERS_DB[email] = user

    token = create_access_token({"sub": user["id"], "email": email})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {k: v for k, v in user.items() if k != "password"}
    }

@router.get("/me", response_model=UserProfileResponse)
def get_current_user(token: str = Depends(oauth2_scheme)):
    if not token:
        # Default active profile for unauthenticated exploratory state
        return UserProfileResponse(
            id="usr_demo_active",
            email="student@sih-pathpilot.ai",
            full_name="PathPilot Scholar",
            role="student",
            current_stream="Computer Science & IT",
            target_role="AI Architect",
            avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            bio="Passionate learner targeting high-growth technology and AI product innovation.",
            location="New Delhi, India",
            academic_level="Undergraduate (B.Tech)",
            target_country="India"
        )
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.ALGORITHM])
        email = payload.get("email")
        user = MOCK_USERS_DB.get(email)
        if user:
            return UserProfileResponse(
                id=user["id"],
                email=user["email"],
                full_name=user["full_name"],
                role=user["role"],
                current_stream=user["current_stream"],
                avatar_url=user["avatar_url"],
                academic_level="Undergraduate"
            )
    except Exception:
        pass

    return UserProfileResponse(
        id="usr_demo_active",
        email="student@sih-pathpilot.ai",
        full_name="PathPilot Scholar",
        role="student",
        current_stream="Computer Science & IT",
        target_role="AI Architect",
        avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    )
