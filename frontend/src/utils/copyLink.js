import { successToast } from "./alerts";

export function copySurveyLink(surveyId) {

    const url =
        `${window.location.origin}/public/survey/${surveyId}`;

    navigator.clipboard.writeText(url);

    successToast("Survey link copied!");
}