import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSurveys } from "../../services/surveyService";


export default function SurveyList() {

    const navigate = useNavigate();

    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSurveys();
    }, []);

    async function loadSurveys() {
        try {
            const data = await getSurveys();
            console.log("Survey API Response:", data);
            setSurveys(data.surveys || []);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }


    if (loading)

        return <h3>Loading...</h3>;

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between mb-3">

                <h2 style={{ color: "red" }}>
    My Surveys - TEST
</h2>

                
                <button className="btn btn-primary"
                    onClick={() => navigate("/create-survey")}
                    >
                    + Create Survey
                </button>

                </div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>Title</th>

                        <th>Status</th>

                        <th>Created</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {surveys.length === 0 ? (

                        <tr>

                            <td
                                colSpan="4"
                                className="text-center"
                            >

                                No surveys found

                            </td>

                        </tr>

                    ) : (

                        surveys.map((survey) => (

                            <tr key={survey.id}>

                                <td>{survey.title}</td>

                                <td>{survey.status}</td>

                                <td>{survey.createdAt}</td>

                                <td>

    <button
        className="btn btn-primary btn-sm me-2"
        onClick={() =>
            navigate(`/survey/${survey.id}/questions`)
        }
    >
        Questions
    </button>
    
    <button
    className="btn btn-info btn-sm me-2"
    onClick={() =>
        navigate(`/survey/${survey.id}/responses`)
    }
>
    Responses
</button>

    <button
        className="btn btn-warning btn-sm me-2"
    >
        Edit
    </button>

    <button
        className="btn btn-danger btn-sm"
    >
        Delete
    </button>

</td>
                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}