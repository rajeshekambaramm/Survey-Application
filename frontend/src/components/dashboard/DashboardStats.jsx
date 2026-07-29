import { Row, Col, Card } from "react-bootstrap";

export default function DashboardStats({
    total,
    published,
    draft,
    responses
}) {

    const stats = [
        {
            title: "Total Surveys",
            value: total,
            color: "primary"
        },
        {
            title: "Published",
            value: published,
            color: "success"
        },
        {
            title: "Draft",
            value: draft,
            color: "secondary"
        },
        {
            title: "Responses",
            value: responses,
            color: "warning"
        }
    ];

    return (

        <Row>

            {stats.map((item) => (

                <Col
                    md={3}
                    key={item.title}
                >

                    <Card
                        bg={item.color}
                        text="white"
                        className="shadow border-0 mb-3 h-100"
                    >

                        <Card.Body>

                            <Card.Title>

                                {item.title}

                            </Card.Title>

                            <h1>

                                {item.value}

                            </h1>

                        </Card.Body>

                    </Card>

                </Col>

            ))}

        </Row>

    );

}