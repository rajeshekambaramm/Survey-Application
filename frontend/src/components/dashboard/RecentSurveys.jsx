import { ListGroup, Badge, Card } from "react-bootstrap";

export default function RecentSurveys({ surveys }) {

    return (

        <Card className="shadow border-0">

            <Card.Body>

                <h5 className="mb-3">

                    Recent Surveys

                </h5>

                {

                    surveys.length === 0 ? (

                        <p className="text-muted">

                            No surveys available

                        </p>

                    ) : (

                        <ListGroup variant="flush">

                            {

                                surveys
                                    .slice(0, 5)
                                    .map((survey) => (

                                        <ListGroup.Item
                                            key={survey.id}
                                            className="d-flex justify-content-between align-items-center"
                                        >

                                            <div>

                                                <strong>

                                                    {survey.title}

                                                </strong>

                                                <br />

                                                <small className="text-muted">

                                                    {survey.description}

                                                </small>

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

                                        </ListGroup.Item>

                                    ))

                            }

                        </ListGroup>

                    )

                }

            </Card.Body>

        </Card>

    );

}