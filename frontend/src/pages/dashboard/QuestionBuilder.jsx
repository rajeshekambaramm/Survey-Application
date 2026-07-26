import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//import { getSurveyById } from "../../services/surveyService";
import QuestionCard from "../../components/survey/QuestionCard";
import QuestionForm from "../../components/survey/QuestionForm";

import {
    getSurveyById,
    addQuestion,
    updateQuestion
} from "../../services/surveyService";


export default function QuestionBuilder() {

    const { surveyId } = useParams();

    const [survey, setSurvey] = useState(null);
    const [showForm, setShowForm] = useState(false);

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

    const handleDelete = (question) => {
        console.log("Delete:", question);
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
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? "Close Form" : "+ Add Question"}
            </button>

            {showForm && (
                <div className="mt-4">
                    <QuestionForm
                        questionData={editingQuestion}
                        onSave={handleSaveQuestion}
                        />
                </div>
            )}

        </div>
    );

}