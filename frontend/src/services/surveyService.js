import api from "../api/axios";

// Get all surveys
export const getSurveys = async () => {
    const token = localStorage.getItem("token");

    const response = await api.get("/survey", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

// Create survey
export const createSurvey = async (surveyData) => {
    const token = localStorage.getItem("token");

    const response = await api.post(
        "/survey",
        surveyData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

//

export const getSurveyById = async (surveyId) => {

    const token = localStorage.getItem("token");

    const response = await api.get(
        `/survey/${surveyId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// Add Question
export const addQuestion = async (surveyId, questionData) => {

    const token = localStorage.getItem("token");

    const response = await api.post(
        `/survey/${surveyId}/question`,
        questionData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// Update Question
export const updateQuestion = async (
    surveyId,
    questionId,
    questionData
) => {

    const token = localStorage.getItem("token");

    const response = await api.put(
        `/survey/${surveyId}/question/${questionId}`,
        questionData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};