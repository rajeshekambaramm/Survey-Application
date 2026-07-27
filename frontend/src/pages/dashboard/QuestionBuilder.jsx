import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//import { getSurveyById } from "../../services/surveyService";
import QuestionCard from "../../components/survey/QuestionCard";
import QuestionForm from "../../components/survey/QuestionForm";
import PreviewModal from "../../components/survey/PreviewModal";

import {
    getSurveyById,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    publishSurvey
} from "../../services/surveyService";


export default function QuestionBuilder() {

    const { surveyId } = useParams();

    const [survey, setSurvey] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);

    useEffect(() => {
        loadSurvey();
    }, []);

    const loadSurvey = async () => {
        try {
            const data = await getSurveyById(surveyId);
            setSurvey(data.survey);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (question) => {
    setEditingQuestion(question);
    setShowForm(true);
};

    const handleDelete = async (question) => {
    const confirmDelete = window.confirm(
        `Delete "${question.question}"?`
    );
    if (!confirmDelete) {
        return;
    }

    try {
        await deleteQuestion(
            surveyId,
            question.id // Replace with _id or questionId if needed
        );
        await loadSurvey();

    } catch (error) {
        console.log(error);
        alert("Unable to delete question.");
    }
};

    const handleSaveQuestion = async (data) => {

    try {

        if (editingQuestion) {

            await updateQuestion(
                surveyId,
                editingQuestion.id,
                data
            );

        } else {

            await addQuestion(
                surveyId,
                data
            );

        }

        await loadSurvey();

        setEditingQuestion(null);

        setShowForm(false);

    } catch (error) {

        console.log(error);

    }

};
const handlePublish = async () => {

    if (!window.confirm("Publish this survey?")) {
        return;
    }

    try {

        const response = await publishSurvey(surveyId);

        console.log("Publish Response:", response);

        alert("Survey published successfully!");

        await loadSurvey();

    }catch (error) {

    console.error(error);

    const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Unable to publish survey.";

    alert(message);

    if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
    }

}

};

    return (
        <div className="container mt-4">

            <h2>{survey?.title}</h2>

            <p>{survey?.description}</p>

            <hr />

            {survey?.questions?.length > 0 ? (

                survey.questions.map((question, index) => (

                    <QuestionCard
                        key={question.id || index}
                        question={question}
                        index={index}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                ))

            ) : (

                <div className="alert alert-info">
                    No questions added yet.
                </div>

            )}

            <button
                className="btn btn-primary mt-3"
                disabled={survey?.status === "published"}
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? "Close Form" : "+ Add Question"}
            </button>

            <button
                className="btn btn-success mt-3 ms-2"
                onClick={() => setShowPreview(true)}
            >
                Preview Survey
            </button>
            <button
                className="btn btn-warning mt-3 ms-2"
                onClick={handlePublish}
            >
                Publish Survey
            </button>

            {showForm && (
                <div className="mt-4">
                    <QuestionForm
                        questionData={editingQuestion}
                        onSave={handleSaveQuestion}
                        />
                </div>
            )}
            <PreviewModal
                show={showPreview}
                onClose={() => setShowPreview(false)}
                survey={survey}
            />
        </div>
    );

}