import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))

db = client[os.getenv("DATABASE_NAME")]

users_collection = db["users"]
surveys_collection = db["surveys"]
responses_collection = db["responses"]