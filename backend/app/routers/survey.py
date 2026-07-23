from fastapi import APIRouter, Depends

from app.schemas.survey_schema import SurveyCreate
from app.services.survey_service import create_survey
from app.utils.auth import get_current_user

from app.services.survey_service import (
    create_survey,
    get_my_surveys
)


router = APIRouter(
    prefix="/survey",
    tags=["Survey"]
)


@router.post("/")
def create(
    survey: SurveyCreate,
    current_user=Depends(get_current_user)
):
    return create_survey(
        survey,
        current_user
    )
    
    
@router.get("/")
def get_surveys(
    current_user=Depends(get_current_user)
):
    return get_my_surveys(current_user)