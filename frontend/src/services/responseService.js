import api from "../api/axios";

// Get all responses
export const getResponses = async (surveyId) => {

    const token = localStorage.getItem("token");

    const response = await api.get(
        `/survey/${surveyId}/responses`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// Get one response
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

// Analytics
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