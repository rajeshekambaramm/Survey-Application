import api from "../api/axios";

// Get Published Survey
export const getPublicSurvey = async (surveyId) => {

    const response = await api.get(
        `/public/survey/${surveyId}`
    );

    return response.data;
};

// Submit Survey Response
export const submitSurvey = async (
    surveyId,
    answers
) => {

    const response = await api.post(
        `/public/survey/${surveyId}/submit`,
        {
            answers
        }
    );

    return response.data;
};