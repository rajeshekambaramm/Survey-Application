from typing import List, Optional
from pydantic import BaseModel


class SurveyCreate(BaseModel):
    title: str
    description: str


class SurveyUpdate(BaseModel):
    title: str
    description: str


class QuestionCreate(BaseModel):
    question: str
    type: str
    options: Optional[List[str]] = []
    
    
class QuestionUpdate(BaseModel):
    question: str
    type: str
    options: Optional[List[str]] = []