from fastapi import APIRouter, Depends

from app.schemas.survey_schema import SurveyCreate
from app.services.survey_service import create_survey
from app.utils.auth import get_current_user

<<<<<<< HEAD
from app.schemas.survey_schema import SurveyCreate, SurveyUpdate

from app.services.survey_service import (
    create_survey,
    get_my_surveys,
    get_survey_by_id,
    update_survey,
    delete_survey
=======
from app.services.survey_service import (
    create_survey,
    get_my_surveys
>>>>>>> 72db17c1166dac18a44dd1ad552f96804d42ce4d
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
<<<<<<< HEAD
    return get_my_surveys(current_user)


@router.get("/{survey_id}")
def get_survey(
    survey_id: str,
    current_user=Depends(get_current_user)
):
    return get_survey_by_id(
        survey_id,
        current_user
    )
    
@router.put("/{survey_id}")
def update(
    survey_id: str,
    survey: SurveyUpdate,
    current_user=Depends(get_current_user)
):
    return update_survey(
        survey_id,
        survey,
        current_user
    )
    
@router.delete("/{survey_id}")
def delete(
    survey_id: str,
    current_user=Depends(get_current_user)
):
    return delete_survey(
        survey_id,
        current_user
    )
=======
    return get_my_surveys(current_user)
>>>>>>> 72db17c1166dac18a44dd1ad552f96804d42ce4d
