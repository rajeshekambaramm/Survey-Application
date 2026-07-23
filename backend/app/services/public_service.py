from bson import ObjectId
from app.database import surveys_collection
from datetime import datetime
from app.database import responses_collection


def get_public_survey(survey_id):

    survey = surveys_collection.find_one({
        "_id": ObjectId(survey_id)
    })

    if not survey:
        return {
            "success": False,
            "message": "Survey not found"
        }

    if survey["status"] == "draft":
        return {
            "success": False,
            "message": "Survey is not published"
        }

    if survey["status"] == "closed":
        return {
            "success": False,
            "message": "Survey has been closed"
        }

    return {
        "success": True,
        "survey": {
            "id": str(survey["_id"]),
            "title": survey["title"],
            "description": survey["description"],
            "questions": survey["questions"]
        }
    }
    
def submit_response(survey_id, response_data):

    survey = surveys_collection.find_one({
        "_id": ObjectId(survey_id)
    })

    if not survey:
        return {
            "success": False,
            "message": "Survey not found"
        }

    if survey["status"] != "published":
        return {
            "success": False,
            "message": "Survey is not accepting responses"
        }

    survey_questions = {
        question["id"]: question
        for question in survey["questions"]
    }

    answers = []

    for item in response_data.answers:

        if item.questionId not in survey_questions:
            return {
                "success": False,
                "message": f"Invalid questionId: {item.questionId}"
            }

        question = survey_questions[item.questionId]
        
        if question["type"] == "radio":

            if item.answer not in question["options"]:
                raise HTTPException(
                    status_code=400,
                    detail=f"Invalid answer for '{question['question']}'"
                    )

        answers.append({
            "questionId": item.questionId,
            "question": question["question"],
            "type": question["type"],
            "answer": item.answer
        })

    response_document = {
        "surveyId": str(survey["_id"]),
        "answers": answers,
        "submittedAt": datetime.utcnow()
    }

    result = responses_collection.insert_one(response_document)

    return {
        "success": True,
        "message": "Survey submitted successfully",
        "responseId": str(result.inserted_id)
    }
    
