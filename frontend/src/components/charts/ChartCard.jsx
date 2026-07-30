import { Card } from "react-bootstrap";

export default function ChartCard({

    title,

    children

}) {

    return (

        <Card className="shadow border-0 h-100">

            <Card.Body>

                <h5 className="mb-4">

                    {title}

                </h5>

                {children}

            </Card.Body>

        </Card>

    );

}