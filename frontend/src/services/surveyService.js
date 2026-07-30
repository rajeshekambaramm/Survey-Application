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

// Delete Question
export const deleteQuestion = async (
    surveyId,
    questionId
) => {

    const token = localStorage.getItem("token");

    const response = await api.delete(
        `/survey/${surveyId}/question/${questionId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// Publish Survey
export const publishSurvey = async (surveyId) => {

    const token = localStorage.getItem("token");

    const response = await api.patch(
        `/survey/${surveyId}/publish`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// Close Survey
export const closeSurvey = async (surveyId) => {

    const token = localStorage.getItem("token");

    const response = await api.patch(
        `/survey/${surveyId}/close`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};

// Get Response Details

export const getResponseDetails = async (
    surveyId,
    responseId
) => {

    const token = localStorage.getItem("token");

    const response = await api.get(

        `/survey/${surveyId}/responses/${responseId}`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};


// Get Survey Analytics Details

export const getSurveyAnalytics = async (
    surveyId
) => {

    const token = localStorage.getItem("token");

    const response = await api.get(

        `/survey/${surveyId}/analytics`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};

// Delete Survey
export const deleteSurvey = async (surveyId) => {

    const token = localStorage.getItem("token");

    const response = await api.delete(
        `/survey/${surveyId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// Update Survey
export const updateSurvey = async (
    surveyId,
    surveyData
) => {

    const token = localStorage.getItem("token");

    const response = await api.put(
        `/survey/${surveyId}`,
        surveyData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// Get Survey Analytics
export const getAnalytics = async (surveyId) => {

    const token = localStorage.getItem("token");

    const response = await api.get(
        `/survey/${surveyId}/analytics`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// Dashboard Analytics
export const getDashboardAnalytics = async () => {

    const token = localStorage.getItem("token");

    const response = await api.get(
        "/survey/analytics/dashboard",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};

//
export async function getSurvey(surveyId) {

    const response = await api.get(

        `/survey/${surveyId}`

    );

    return response.data;

}

