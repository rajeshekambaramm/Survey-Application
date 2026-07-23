from fastapi import APIRouter
#from app.schemas.auth_schema import UserRegister
#from app.services.auth_service import register_user

from app.schemas.auth_schema import UserRegister, UserLogin
from app.services.auth_service import register_user, login_user

from fastapi import Depends
from app.utils.auth import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(user: UserRegister):
    return register_user(user)

@router.post("/login")
def login(user: UserLogin):
    return login_user(user)

@router.get("/me")
def get_profile(current_user=Depends(get_current_user)):
    return {
        "username": current_user["username"],
        "email": current_user["email"]
    }