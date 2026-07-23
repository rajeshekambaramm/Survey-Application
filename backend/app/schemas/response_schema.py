from typing import List
from pydantic import BaseModel


class Answer(BaseModel):
    questionId: str
    answer: str


class SurveyResponseCreate(BaseModel):
    answers: List[Answer]