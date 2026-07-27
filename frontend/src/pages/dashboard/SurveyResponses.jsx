import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getResponses } from "../../services/responseService";
import EmptyState from "../../components/common/EmptyState";

export default function SurveyResponses() {

    const { surveyId } = useParams();

    const navigate = useNavigate();

    const [responses, setResponses] = useState([]);

    useEffect(() => {
        loadResponses();
    }, []);

    const loadResponses = async () => {

        try {

            const data = await getResponses(surveyId);

            setResponses(data.responses);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container mt-4">

            <h2>Survey Responses</h2>

            <p>Total Responses: {responses.length}</p>

            <hr />

            {
                responses.length === 0 ? (

                    <div className="alert alert-info">

                        <EmptyState

    title="No Responses"

    message="Responses will appear after participants submit this survey."

/>

                    </div>

                ) : (

                    responses.map((response, index) => (

                        <div
                            className="card mb-3"
                            key={response.responseId}
                        >

                            <div className="card-body">

                                <h5>

                                    Response #{index + 1}

                                </h5>

                                <p>

                                    Submitted:
                                    {" "}
                                    {new Date(
                                        response.submittedAt
                                    ).toLocaleString()}

                                </p>

                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        navigate(
                                            `/survey/${surveyId}/responses/${response.responseId}`
                                        )
                                    }
                                >
                                    View Response
                                </button>

                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() =>
                                        navigate(
                                            `/survey/${surveyId}/responses/${response.responseId}`
                                        )
                                    }
                                >
                                    View Details
                                </button>

                            </div>

                        </div>

                    ))

                )
            }

        </div>

    );

}