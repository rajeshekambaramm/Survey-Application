import uuid
from datetime import datetime
from app.database import surveys_collection
from app.database import responses_collection
from collections import Counter

from bson import ObjectId

def create_survey(data, current_user):

    survey = {
    "title": data.title,
    "description": data.description,

    "createdBy": str(current_user["_id"]),

    "questions": [],

    "status": "draft",

    "createdAt": datetime.utcnow(),
    "updatedAt": datetime.utcnow()
}

    result = surveys_collection.insert_one(survey)

    return {
        "success": True,
        "message": "Survey created successfully",
        "survey_id": str(result.inserted_id)
    }
    

def get_my_surveys(current_user):

    surveys = surveys_collection.find(
        {
            "createdBy": str(current_user["_id"])
        }
    )

    survey_list = []

    for survey in surveys:

        survey_list.append({
            "id": str(survey["_id"]),
            "title": survey["title"],
            "description": survey["description"],
            "questions": len(survey["questions"]),
            "createdAt": survey["createdAt"]
        })

    return survey_list

def get_survey_by_id(survey_id, current_user):

    survey = surveys_collection.find_one({
        "_id": ObjectId(survey_id),
        "createdBy": str(current_user["_id"])
    })

    if not survey:
        return {
            "success": False,
            "message": "Survey not found"
        }

    return {
        "success": True,
        "survey": {
            "id": str(survey["_id"]),
            "title": survey["title"],
            "description": survey["description"],
            "questions": survey["questions"],
            "createdBy": survey["createdBy"],
            "createdAt": survey["createdAt"],
            "updatedAt": survey["updatedAt"]
        }
    }


def update_survey(survey_id, data, current_user):

    survey = surveys_collection.find_one({
        "_id": ObjectId(survey_id),
        "createdBy": str(current_user["_id"])
    })

    if not survey:
        return {
            "success": False,
            "message": "Survey not found"
        }

    surveys_collection.update_one(
        {
            "_id": ObjectId(survey_id)
        },
        {
            "$set": {
                "title": data.title,
                "description": data.description,
                "updatedAt": datetime.utcnow()
            }
        }
    )

    return {
        "success": True,
        "message": "Survey updated successfully"
    }
    
    
def delete_survey(survey_id, current_user):

    result = surveys_collection.delete_one({
        "_id": ObjectId(survey_id),
        "createdBy": str(current_user["_id"])
    })

    if result.deleted_count == 0:
        return {
            "success": False,
            "message": "Survey not found"
        }

    return {
        "success": True,
        "message": "Survey deleted successfully"
    }



def add_question(survey_id, question_data, current_user):

    survey = surveys_collection.find_one({
        "_id": ObjectId(survey_id),
        "createdBy": str(current_user["_id"])
    })

    if not survey:
        return {
            "success": False,
            "message": "Survey not found"
        }

    # Validation
    if question_data.type == "text" and question_data.options:
        return {
            "success": False,
            "message": "Text questions cannot have options."
        }

    if question_data.type == "radio":
        if len(question_data.options) < 2:
            return {
                "success": False,
                "message": "Radio questions must have at least two options."
            }

    question = {
        "id": str(uuid.uuid4()),
        "question": question_data.question,
        "type": question_data.type,
        "options": question_data.options if question_data.type == "radio" else []
    }

    surveys_collection.update_one(
        {"_id": ObjectId(survey_id)},
        {
            "$push": {
                "questions": question
            },
            "$set": {
                "updatedAt": datetime.utcnow()
            }
        }
    )

    return {
        "success": True,
        "message": "Question added successfully",
        "question": question
    }
    

def get_questions(survey_id, current_user):

    survey = surveys_collection.find_one({
        "_id": ObjectId(survey_id),
        "createdBy": str(current_user["_id"])
    })

    if not survey:
        return {
            "success": False,
            "message": "Survey not found"
        }

    return {
        "success": True,
        "surveyId": str(survey["_id"]),
        "questions": survey["questions"]
    }
    
def update_question(
    survey_id,
    question_id,
    data,
    current_user
):

    survey = surveys_collection.find_one({
        "_id": ObjectId(survey_id),
        "createdBy": str(current_user["_id"])
    })

    if not survey:
        return {
            "success": False,
            "message": "Survey not found"
        }

    updated = False

    for question in survey["questions"]:

        if question["id"] == question_id:

            question["question"] = data.question
            question["type"] = data.type
            question["options"] = (
                data.options
                if data.type == "radio"
                else []
            )

            updated = True
            break

    if not updated:
        return {
            "success": False,
            "message": "Question not found"
        }

    surveys_collection.update_one(
        {"_id": ObjectId(survey_id)},
        {
            "$set": {
                "questions": survey["questions"],
                "updatedAt": datetime.utcnow()
            }
        }
    )

    return {
        "success": True,
        "message": "Question updated successfully"
    }
    

def delete_question(
    survey_id,
    question_id,
    current_user
):

    survey = surveys_collection.find_one({
        "_id": ObjectId(survey_id),
        "createdBy": str(current_user["_id"])
    })

    if not survey:
        return {
            "success": False,
            "message": "Survey not found"
        }

    questions = [
        q for q in survey["questions"]
        if q["id"] != question_id
    ]

    if len(questions) == len(survey["questions"]):
        return {
            "success": False,
            "message": "Question not found"
        }

    surveys_collection.update_one(
        {"_id": ObjectId(survey_id)},
        {
            "$set": {
                "questions": questions,
                "updatedAt": datetime.utcnow()
            }
        }
    )

    return {
        "success": True,
        "message": "Question deleted successfully"
    }
    
def publish_survey(survey_id, current_user):

    result = surveys_collection.update_one(
        {
            "_id": ObjectId(survey_id),
            "createdBy": str(current_user["_id"])
        },
        {
            "$set": {
                "status": "published",
                "updatedAt": datetime.utcnow()
            }
        }
    )

    if result.matched_count == 0:
        return {
            "success": False,
            "message": "Survey not found"
        }

    return {
        "success": True,
        "message": "Survey published successfully"
    }


def close_survey(survey_id, current_user):

    result = surveys_collection.update_one(
        {
            "_id": ObjectId(survey_id),
            "createdBy": str(current_user["_id"])
        },
        {
            "$set": {
                "status": "closed",
                "updatedAt": datetime.utcnow()
            }
        }
    )

    if result.matched_count == 0:
        return {
            "success": False,
            "message": "Survey not found"
        }

    return {
        "success": True,
        "message": "Survey closed successfully"
    }
    
def get_survey_responses(survey_id, current_user):

    survey = surveys_collection.find_one({
        "_id": ObjectId(survey_id),
        "createdBy": str(current_user["_id"])
    })

    if not survey:
        return {
            "success": False,
            "message": "Survey not found"
        }

    responses = responses_collection.find({
        "surveyId": survey_id
    })

    response_list = []

    for response in responses:

        response_list.append({
            "responseId": str(response["_id"]),
            "submittedAt": response["submittedAt"],
            "totalAnswers": len(response["answers"])
        })

    return {
        "success": True,
        "totalResponses": len(response_list),
        "responses": response_list
    }
    
def get_response_details(
    survey_id,
    response_id,
    current_user
):

    survey = surveys_collection.find_one({
        "_id": ObjectId(survey_id),
        "createdBy": str(current_user["_id"])
    })

    if not survey:
        return {
            "success": False,
            "message": "Survey not found"
        }

    response = responses_collection.find_one({
        "_id": ObjectId(response_id),
        "surveyId": survey_id
    })

    if not response:
        return {
            "success": False,
            "message": "Response not found"
        }

    return {
        "success": True,
        "response": {
            "responseId": str(response["_id"]),
            "submittedAt": response["submittedAt"],
            "answers": response["answers"]
        }
    }
    

def get_survey_analytics(survey_id, current_user):

    survey = surveys_collection.find_one({
        "_id": ObjectId(survey_id),
        "createdBy": str(current_user["_id"])
    })

    if not survey:
        return {
            "success": False,
            "message": "Survey not found"
        }

    responses = list(
        responses_collection.find({
            "surveyId": survey_id
        })
    )

    analytics = []

    for question in survey["questions"]:

        if question["type"] != "radio":
            continue

        counter = Counter()

        for response in responses:

            for answer in response["answers"]:

                if answer["questionId"] == question["id"]:
                    counter[answer["answer"]] += 1

        analytics.append({
            "question": question["question"],
            "options": dict(counter)
        })

    return {
        "success": True,
        "totalResponses": len(responses),
        "analytics": analytics
    }