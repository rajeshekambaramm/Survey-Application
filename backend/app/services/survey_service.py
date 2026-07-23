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