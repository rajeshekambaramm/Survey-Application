import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getResponseDetails } from "../../services/surveyService";

export default function ResponseDetails() {

    const { surveyId, responseId } = useParams();

    const [response, setResponse] = useState(null);

    useEffect(() => {
        loadResponse();
    }, []);

    const loadResponse = async () => {

        try {

            const data = await getResponseDetails(
                surveyId,
                responseId
            );

            setResponse(data.response);

        } catch (error) {

            console.log(error);

        }

    };

    if (!response) {

        return <h3>Loading...</h3>;

    }

    return (

        <div className="container mt-4">

            <h2>Response Details</h2>

            <hr />

            <p>

                <strong>Submitted:</strong>

                {" "}

                {response.submittedAt}

            </p>

            <hr />

            {

                response.answers.map((item, index) => (

                    <div
                        key={index}
                        className="card mb-3"
                    >

                        <div className="card-body">

                            <h5>

                                {index + 1}. {item.question}

                            </h5>

                            <p>

                                <strong>Answer:</strong>

                                {" "}

                                {item.answer}

                            </p>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}