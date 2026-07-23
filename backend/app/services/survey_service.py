from datetime import datetime
from app.database import surveys_collection

from bson import ObjectId

def create_survey(data, current_user):

    survey = {
        "title": data.title,
        "description": data.description,

        "createdBy": str(current_user["_id"]),

        "questions": [],

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

#####