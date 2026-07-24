from app.database import users_collection
from app.utils.password import hash_password

from app.utils.password import verify_password
from app.utils.jwt_handler import create_access_token


from bson import ObjectId

def register_user(user):

    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    if existing_user:
        return {
            "success": False,
            "message": "Email already exists"
        }

    new_user = {
        "username": user.username,
        "email": user.email,
        "password": hash_password(user.password)
    }

    users_collection.insert_one(new_user)

    return {
        "success": True,
        "message": "User registered successfully"
    }
    



def login_user(user):

    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    if not existing_user:
        return {
            "success": False,
            "message": "Invalid email or password"
        }

    if not verify_password(
        user.password,
        existing_user["password"]
    ):
        return {
            "success": False,
            "message": "Invalid email or password"
        }

    token = create_access_token(
        {
            "sub": str(existing_user["_id"]),
            "email": existing_user["email"]
        }
    )

    return {
        "success": True,
        "message": "Login successful",
        "access_token": token,
        "token_type": "bearer"

    }
    

