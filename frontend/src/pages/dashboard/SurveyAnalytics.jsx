import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getSurveyAnalytics } from "../../services/surveyService";

export default function SurveyAnalytics() {

    const { surveyId } = useParams();

    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {

        try {

            const data = await getSurveyAnalytics(surveyId);

            setAnalytics(data);

        } catch (error) {

            console.log(error);

        }

    };

    if (!analytics) {

        return <h3>Loading...</h3>;

    }

    return (

        <div className="container mt-4">

            <h2>Survey Analytics</h2>

            <hr />

            <h5>

                Total Responses :

                {" "}

                {analytics.totalResponses}

            </h5>

            <hr />

            {

                analytics.analytics.map((question, index) => (

                    <div
                        key={index}
                        className="card mb-3"
                    >

                        <div className="card-header">

                            <strong>

                                {question.question}

                            </strong>

                        </div>

                        <div className="card-body">

                            {

                                Object.entries(question.options).map(

                                    ([option, count]) => (

                                        <div
                                            key={option}
                                            className="d-flex justify-content-between mb-2"
                                        >

                                            <span>

                                                {option}

                                            </span>

                                            <span>

                                                {count}

                                            </span>

                                        </div>

                                    )

                                )

                            }

                        </div>

                    </div>

                ))

            }

        </div>

    );

}