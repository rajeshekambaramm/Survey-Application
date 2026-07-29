import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";

import { getSurveys } from "../../services/surveyService";
import SurveyChart from "../../components/charts/SurveyChart";
import DashboardStats from "../../components/dashboard/DashboardStats";
import RecentSurveys from "../../components/dashboard/RecentSurveys";
import QuickActions from "../../components/dashboard/QuickActions";
import SurveyPieChart from "../../components/dashboard/SurveyPieChart";
import SurveyOverview from "../../components/dashboard/SurveyOverview";

export default function Dashboard() {

    const [surveys, setSurveys] = useState([]);
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
    
    const totalResponses = surveys.reduce(
        (sum, survey) => sum + (survey.responseCount || 0),
        0
    );
    const total = surveys.length;
    const published = surveys.filter(
        s => s.status === "published"
    ).length;
    const draft = surveys.filter(
        s => s.status === "draft"
    ).length;

    return (

        <div>

    <div className="mb-5">

        <h2 className="fw-bold">
            📊 Survey Dashboard
        </h2>

        <p className="text-muted mb-0">
            Welcome back! Manage your surveys from one place.
        </p>

    </div>

    <DashboardStats
    total={total}
    published={published}
    draft={draft}
    responses={totalResponses}
/>
<Row className="mt-4">

    <Col lg={6}>
        <SurveyPieChart
            published={published}
            draft={draft}
        />
    </Col>

    <Col lg={6}>
        <RecentSurveys
            surveys={surveys}
        />
    </Col>

</Row>
    
<hr className="my-5" />

<QuickActions />

<hr className="my-5" />

<h3 className="mb-3">
    Survey Analytics
</h3>
<Card className="shadow border-0">
    <Card.Body>
        <SurveyChart surveys={surveys} />
    </Card.Body>
</Card>

<hr className="my-5" />

<h3 className="mb-4">
    All Surveys
</h3>
<SurveyOverview surveys={surveys} />
        </div>
    );
}
