import { Card, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SurveyCard({ survey }) {

    const navigate = useNavigate();

    return (

        <Card className="shadow-sm border-0 mb-4">

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

                    <Badge
                        bg={
                            survey.status === "published"
                                ? "success"
                                : "secondary"
                        }
                        className="h-100"
                    >
                        {survey.status}
                    </Badge>

                </div>

                <hr />

                <small className="text-muted">

                    Created:
                    {" "}
                    {survey.createdAt || "-"}

                </small>

                <div className="mt-3">

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
                        className="me-2"
                        onClick={() =>
                            navigate(`/survey/${survey.id}/analytics`)
                        }
                    >
                        Analytics
                    </Button>

                    <Button
                        size="sm"
                        variant="warning"
                        className="me-2"
                    >
                        Edit
                    </Button>

                    <Button
                        size="sm"
                        variant="danger"
                    >
                        Delete
                    </Button>

                </div>

            </Card.Body>

        </Card>

    );

}