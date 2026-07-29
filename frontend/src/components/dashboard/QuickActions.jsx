import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {

    const navigate = useNavigate();

    return (

        <Card className="shadow border-0">

            <Card.Body>

                <h4 className="mb-4">

                    Quick Actions

                </h4>

                <div className="d-flex flex-wrap gap-3">

                    <Button
                        onClick={() =>
                            navigate("/create-survey")
                        }
                    >
                        Create Survey
                    </Button>

                    <Button
                        variant="success"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        My Surveys
                    </Button>

                </div>

            </Card.Body>

        </Card>

    );

}