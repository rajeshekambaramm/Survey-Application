from fastapi import FastAPI
from app.database import db
from app.routers.auth import router as auth_router
from app.routers.survey import router as survey_router
from app.routers.public import router as public_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Survey Application API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(survey_router)
app.include_router(public_router)


@app.get("/")
def home():
    return {
        "message": "Survey Application Backend Running 🚀"
    }


@app.get("/database")
def database_status():
    return {
        "status": "Connected",
        "database": db.name,
        "collections": db.list_collection_names()
    }