import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    getPublicSurvey,
    submitSurvey
} from "../../services/publicSurveyService";

export default function PublicSurvey() {

    const { surveyId } = useParams();

    const [survey, setSurvey] = useState(null);

    const [answers, setAnswers] = useState({});

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        loadSurvey();
    }, []);

    const loadSurvey = async () => {

        try {

            const data = await getPublicSurvey(
                surveyId
            );

            setSurvey(data.survey);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (
        questionId,
        value
    ) => {

        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));

    };

    const handleSubmit = async () => {

        try {

            const formattedAnswers =
                survey.questions.map(q => ({
                    questionId: q.id,
                    question: q.question,
                    answer: answers[q.id] || ""
                }));

            await submitSurvey(
                surveyId,
                formattedAnswers
            );

            setSubmitted(true);

        } catch (error) {

            console.log(error);

            alert("Unable to submit survey.");

        }

    };

    if (submitted) {

        return (

            <div className="container mt-5">

                <div className="alert alert-success">

                    <h3>Thank You!</h3>

                    <p>Your response has been recorded.</p>

                </div>

            </div>

        );

    }

    return (

        <div className="container mt-5">

            <h2>{survey?.title}</h2>

            <p>{survey?.description}</p>

            <hr />

            {
                survey?.questions?.map((question, index) => (

                    <div
                        key={question.id}
                        className="mb-4"
                    >

                        <h5>

                            {index + 1}. {question.question}

                        </h5>

                        {
                            question.type === "text" ? (

                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                        handleChange(
                                            question.id,
                                            e.target.value
                                        )
                                    }
                                />

                            ) : (

                                question.options.map(option => (

                                    <div
                                        className="form-check"
                                        key={option}
                                    >

                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name={question.id}
                                            value={option}
                                            onChange={(e) =>
                                                handleChange(
                                                    question.id,
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <label className="form-check-label">

                                            {option}

                                        </label>

                                    </div>

                                ))

                            )
                        }

                    </div>

                ))
            }

            <button
                className="btn btn-primary"
                onClick={handleSubmit}
            >
                Submit Survey
            </button>

        </div>

    );

}