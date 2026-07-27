import { useEffect, useState } from "react";


import { Row, Col, Card, Badge, Button } from "react-bootstrap";
import {
    FaPoll,
    FaCheckCircle,
    FaFileAlt,
    FaQuestionCircle,
    FaUsers,
    FaChartBar
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


import { getSurveys } from "../../services/surveyService";
import SurveyChart from "../../components/charts/SurveyChart";

export default function Dashboard() {

    const [surveys, setSurveys] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const data = await getSurveys();
            setSurveys(data.surveys || []);
        } catch (error) {
            console.log(error);
        }
    };

    const total = surveys.length;
    const published = surveys.filter(
        s => s.status === "published"
    ).length;
    const draft = surveys.filter(
        s => s.status === "draft"
    ).length;

    return (

        <div>

    <h2 className="mb-1">
        Survey Dashboard
    </h2>

    <p className="text-muted mb-4">
        Welcome back 👋
    </p>

    <Row className="mb-4">

        <Col md={4}>
            <Card bg="primary" text="white"  className="shadow border-0 h-100 dashboard-card">
                <Card.Body>

                    <FaPoll size={28} />

                    <h5 className="mt-3">
                        <Card.Title>

    <i className="bi bi-clipboard-data me-2"></i>

    Total Surveys

</Card.Title>
                    </h5>

                    <h2>{total}</h2>

                </Card.Body>
            </Card>
        </Col>

        <Col md={4}>
            <Card bg="success" text="white"  className="shadow border-0 h-100 dashboard-card">
                <Card.Body>

                    <FaCheckCircle size={28} />

                    <h5 className="mt-3">
                        <Card.Title>

    <i className="bi bi-check-circle me-2"></i>

    Published

</Card.Title>
                    </h5>

                    <h2>{published}</h2>

                </Card.Body>
            </Card>
        </Col>

        <Col md={4}>
            <Card bg="secondary" text="white"  className="shadow border-0 h-100 dashboard-card">
                <Card.Body>

                    <FaFileAlt size={28} />

                    <h5 className="mt-3">
                        <Card.Title>

    <i className="bi bi-pencil-square me-2"></i>

    Draft

</Card.Title>
                    </h5>

                    <h2>{draft}</h2>

                </Card.Body>
            </Card>
        </Col>

    </Row>
    <hr className="my-5" />

<Card className="shadow">

    <Card.Body>

        <h4 className="mb-4">

            <i className="bi bi-clock-history me-2"></i>

            Recent Surveys

        </h4>

        {

            surveys.length === 0 ?

            (

                <p>No surveys found.</p>

            )

            :

            surveys.slice(0,5).map((survey)=>(

                <div
                    key={survey.id}
                    className="d-flex justify-content-between border-bottom py-3"
                >

                    <div>

                        <strong>

                            {survey.title}

                        </strong>

                        <br/>

                        <small>

                            {survey.description}

                        </small>

                    </div>

                    <span
                        className={
                            survey.status==="published"

                            ?

                            "badge bg-success"

                            :

                            "badge bg-secondary"
                        }
                    >

                        {survey.status}

                    </span>

                </div>

            ))

        }

    </Card.Body>

</Card>

    <h3 className="mb-3">
        Recent Surveys
    </h3>

    <hr className="my-5" />

<h3 className="mb-3">
    Survey Analytics
</h3>

<Card
    className="shadow border-0 h-100 dashboard-card">

    <Card.Body>

        <SurveyChart
            surveys={surveys}
        />

    </Card.Body>

</Card>

    {
        surveys.length === 0 ? (

            <Card>

                <Card.Body>

                    No surveys available.

                </Card.Body>

            </Card>

        ) : (

            surveys.map((survey) => (

                <Card
                    key={survey.id}
                    className="shadow border-0 h-100 dashboard-card"
                >

                    <Card.Body>

                        <div className="d-flex justify-content-between">

                            <div>

                                <h4>

                                    {survey.title}

                                </h4>

                                <p className="text-muted">

                                    {survey.description}

                                </p>

                            </div>

                            <div>

                                <Badge
                                    bg={
                                        survey.status === "published"
                                            ? "success"
                                            : "secondary"
                                    }
                                >
                                    {survey.status}
                                </Badge>

                            </div>

                        </div>

                        <Row className="mt-3">

                            <Col md={4}>

                                <FaQuestionCircle />

                                {" "}

                                Questions:

                                {" "}

                                {survey.questions?.length || 0}

                            </Col>

                            <Col md={4}>

                                <FaUsers />

                                {" "}

                                Responses:

                                {" "}

                                {survey.responseCount || 0}

                            </Col>

                            <Col md={4}>

                                Created:

                                {" "}

                                {survey.createdAt || "-"}

                            </Col>

                        </Row>

                        <hr />

                        <Button
                            size="sm"
                            className="me-2"
                            onClick={() =>
                                navigate(
                                    `/survey/${survey.id}/questions`
                                )
                            }
                        >
                            Questions
                        </Button>

                        <Button
                            size="sm"
                            variant="info"
                            className="me-2"
                            onClick={() =>
                                navigate(
                                    `/survey/${survey.id}/responses`
                                )
                            }
                        >
                            Responses
                        </Button>

                        <Button
                            size="sm"
                            variant="success"
                            onClick={() =>
                                navigate(
                                    `/survey/${survey.id}/analytics`
                                )
                            }
                        >
                            <FaChartBar />

                            {" "}

                            Analytics
                        </Button>

                    </Card.Body>

                </Card>

            ))

        )
    }

</div>

    );
}