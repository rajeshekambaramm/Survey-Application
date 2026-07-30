import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FaClipboardList, FaCheckCircle, FaFileAlt, FaUsers } from "react-icons/fa";

import { getDashboardAnalytics } from "../../services/surveyService";

import StatusPieChart from "../../components/charts/StatusPieChart";
import ChartCard from "../../components/charts/ChartCard";
import SurveyBarChart from "../../components/charts/SurveyBarChart";
import ResponseLineChart from "../../components/charts/ResponseLineChart";

export default function Analytics() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        loadAnalytics();

    }, []);

    const loadAnalytics = async () => {

        try {

            const data = await getDashboardAnalytics();

            setStats(data);

        } catch (error) {

            console.log(error);

        }

    };

    if (!stats) {

        return <h3>Loading Analytics...</h3>;

    }

    return (

        <div>

            <h2 className="mb-4">
                Dashboard Analytics
            </h2>

         {/* ===== Statistics Cards ===== */}
        
            <Row>

                <Col md={3}>

                    <Card
                        bg="primary"
                        text="white"
                        className="shadow mb-4"
                    >

                        <Card.Body>

                            <FaClipboardList size={30} />

                            <h5 className="mt-3">

                                Total Surveys

                            </h5>

                            <h2>

                                {stats.totalSurveys}

                            </h2>

                        </Card.Body>

                    </Card>

                </Col>

                <Col md={3}>

                    <Card
                        bg="success"
                        text="white"
                        className="shadow mb-4"
                    >

                        <Card.Body>

                            <FaCheckCircle size={30} />

                            <h5 className="mt-3">

                                Published

                            </h5>

                            <h2>

                                {stats.published}

                            </h2>

                        </Card.Body>

                    </Card>

                </Col>

                <Col md={3}>

                    <Card
                        bg="secondary"
                        text="white"
                        className="shadow mb-4"
                    >

                        <Card.Body>

                            <FaFileAlt size={30} />

                            <h5 className="mt-3">

                                Draft

                            </h5>

                            <h2>

                                {stats.draft}

                            </h2>

                        </Card.Body>

                    </Card>

                </Col>

                <Col md={3}>

                    <Card
                        bg="warning"
                        text="dark"
                        className="shadow mb-4"
                    >

                        <Card.Body>

                            <FaUsers size={30} />

                            <h5 className="mt-3">

                                Responses

                            </h5>

                            <h2>

                                {stats.totalResponses}

                            </h2>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

            {/*===== Pie Chart  ===== */}

            <Row className="mt-4">

    <Col lg={6} className="mb-4">

        <ChartCard title="Survey Status">

            <StatusPieChart
                published={stats.published}
                draft={stats.draft}
            />

        </ChartCard>

    </Col>
                {/*===== Bar Chart  ===== */}
    <Col lg={6} className="mb-4">

        <ChartCard title="Survey Overview">

            <SurveyBarChart
                total={stats.totalSurveys}
                published={stats.published}
                draft={stats.draft}
                responses={stats.totalResponses}
            />

        </ChartCard>

    </Col>

</Row>

               {/*===== Line Chart  ===== */}
<Row>

    <Col>

        <ChartCard title="Response Trend">

            <ResponseLineChart
                trend={stats.trend}
            />

        </ChartCard>

    </Col>

</Row>

        </div>

    );

}