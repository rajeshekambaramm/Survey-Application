from pydantic import BaseModel

class SurveyCreate(BaseModel):
    title: str
    description: str


class SurveyUpdate(BaseModel):
    title: str
    description: str