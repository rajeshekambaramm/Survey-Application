import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import {
    FaQuestionCircle,
    FaUsers,
    FaChartBar
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SurveyOverview({ surveys }) {

    const navigate = useNavigate();

    if (surveys.length === 0) {

        return (

            <Card>

                <Card.Body>
                    No surveys available.
                </Card.Body>

            </Card>

        );

    }

    return (

        <Row>

            {surveys.map((survey) => (

                <Col
                    lg={6}
                    className="mb-4"
                    key={survey.id}
                >

                    <Card className="shadow border-0 h-100">

                        <Card.Body>

                            <div className="d-flex justify-content-between">

                                <div>

                                    <h4>{survey.title}</h4>

                                    <p className="text-muted">
                                        {survey.description}
                                    </p>

                                </div>

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

                            <Row className="mt-3">

                                <Col md={4}>
                                    <FaQuestionCircle />{" "}
                                    Questions: {survey.questions?.length || 0}
                                </Col>

                                <Col md={4}>
                                    <FaUsers />{" "}
                                    Responses: {survey.responseCount || 0}
                                </Col>

                                <Col md={4}>
                                    Created:{" "}
                                    {survey.createdAt
                                        ? new Date(survey.createdAt).toLocaleDateString()
                                        : "-"}
                                </Col>

                            </Row>

                            <hr />

                            <Button
                                size="sm"
                                className="me-2"
                                onClick={() =>
                                    navigate(`/survey/${survey.id}/questions`)
                                }
                            >
                                Questions
                            </Button>

                            <Button
                                size="sm"
                                variant="info"
                                className="me-2"
                                onClick={() =>
                                    navigate(`/survey/${survey.id}/responses`)
                                }
                            >
                                Responses
                            </Button>

                            <Button
                                size="sm"
                                variant="success"
                                onClick={() =>
                                    navigate(`/survey/${survey.id}/analytics`)
                                }
                            >
                                <FaChartBar className="me-1" />
                                Analytics
                            </Button>

                        </Card.Body>

                    </Card>

                </Col>

            ))}

        </Row>

    );

}