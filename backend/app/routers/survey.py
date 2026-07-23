from fastapi import APIRouter, Depends

from app.schemas.survey_schema import SurveyCreate
from app.services.survey_service import create_survey
from app.utils.auth import get_current_user

from app.schemas.survey_schema import (
    SurveyCreate,
    SurveyUpdate,
    QuestionCreate,
    QuestionUpdate
)

from app.services.survey_service import (
    create_survey,
    get_my_surveys,
    get_survey_by_id,
    update_survey,
    delete_survey,
    add_question,
    get_questions,
    update_question,
    delete_question,
    publish_survey,
    close_survey,
    get_survey_responses,
    get_response_details,
    get_survey_analytics
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
    return get_my_surveys(current_user)


@router.post("/{survey_id}/question")
def create_question(
    survey_id: str,
    question: QuestionCreate,
    current_user=Depends(get_current_user)
):
    return add_question(
        survey_id,
        question,
        current_user
    )
    
@router.get("/{survey_id}/questions")
def questions(
    survey_id: str,
    current_user=Depends(get_current_user)
):
    return get_questions(
        survey_id,
        current_user
    )

@router.put("/{survey_id}/question/{question_id}")
def update_question_route(
    survey_id: str,
    question_id: str,
    question: QuestionUpdate,
    current_user=Depends(get_current_user)
):
    return update_question(
        survey_id,
        question_id,
        question,
        current_user
    )
    
@router.delete("/{survey_id}/question/{question_id}")
def delete_question_route(
    survey_id: str,
    question_id: str,
    current_user=Depends(get_current_user)
):
    return delete_question(
        survey_id,
        question_id,
        current_user
    )
    
@router.delete("/{survey_id}/question/{question_id}")
def delete_question_route(
    survey_id: str,
    question_id: str,
    current_user=Depends(get_current_user)
):
    return delete_question(
        survey_id,
        question_id,
        current_user
    )
    
@router.patch("/{survey_id}/publish")
def publish(
    survey_id: str,
    current_user=Depends(get_current_user)
):
    return publish_survey(
        survey_id,
        current_user
    )


@router.patch("/{survey_id}/close")
def close(
    survey_id: str,
    current_user=Depends(get_current_user)
):
    return close_survey(
        survey_id,
        current_user
    )


@router.get("/{survey_id}/responses")
def get_responses(
    survey_id: str,
    current_user=Depends(get_current_user)
):
    return get_survey_responses(
        survey_id,
        current_user
    )
    
@router.get("/{survey_id}/responses/{response_id}")
def response_details(
    survey_id: str,
    response_id: str,
    current_user=Depends(get_current_user)
):
    return get_response_details(
        survey_id,
        response_id,
        current_user
    )
    
@router.get("/{survey_id}/analytics")
def analytics(
    survey_id: str,
    current_user=Depends(get_current_user)
):
    return get_survey_analytics(
        survey_id,
        current_user
    )