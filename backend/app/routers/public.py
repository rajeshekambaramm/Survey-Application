from fastapi import APIRouter

from app.services.public_service import get_public_survey
from app.schemas.response_schema import SurveyResponseCreate
from app.services.public_service import (
    get_public_survey,
    submit_response
)

router = APIRouter(
    prefix="/public",
    tags=["Public Survey"]
)


@router.get("/survey/{survey_id}")
def public_survey(survey_id: str):
    return get_public_survey(survey_id)


@router.post("/survey/{survey_id}/submit")
def submit(
    survey_id: str,
    response: SurveyResponseCreate
):
    return submit_response(
        survey_id,
        response
    )