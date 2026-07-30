import { Card, Row, Col, Badge, Button } from "react-bootstrap";

import {
    FaQuestionCircle,
    FaUsers,
    FaChartBar,
    FaEye,
    FaLink,
    FaQrcode,
    FaExternalLinkAlt,
    FaUpload,
    FaTimesCircle
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import SurveyPreviewModal from "./SurveyPreviewModal";
import QRCodeModal from "./QRCodeModal";

import {
    getSurvey,
    publishSurvey,
    closeSurvey
} from "../../services/surveyService";

import { copySurveyLink } from "../../utils/copyLink";

import {
    successToast,
    errorToast
} from "../../utils/alerts";

export default function SurveyOverview({ surveys }) {

    const navigate = useNavigate();
    const [showPreview, setShowPreview] = useState(false);

const [previewSurvey, setPreviewSurvey] = useState(null);

const [showQR, setShowQR] = useState(false);

const [selectedSurvey, setSelectedSurvey] = useState(null);

const handlePreview = async (surveyId) => {

    const data = await getSurvey(surveyId);

    setPreviewSurvey(data);

    setShowPreview(true);

};

const handlePublish = async (surveyId) => {

    try {

        await publishSurvey(surveyId);

        successToast("Survey Published");

        window.location.reload();

    }

    catch {

        errorToast("Publish failed");

    }

};

const handleClose = async (surveyId) => {

    try {

        await closeSurvey(surveyId);

        successToast("Survey Closed");

        window.location.reload();

    }

    catch {

        errorToast("Close failed");

    }

};

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

                            <Button
    size="sm"
    variant="secondary"
    className="me-2 mt-2"
    onClick={() =>
        handlePreview(survey.id)
    }
>
    <FaEye className="me-1" />
    Preview
</Button>

<Button
    size="sm"
    variant="dark"
    className="me-2 mt-2"
    onClick={() =>
        copySurveyLink(survey.id)
    }
>
    <FaLink className="me-1" />
    Copy Link
</Button>

<Button
    size="sm"
    variant="dark"
    className="me-2 mt-2"
    onClick={() => {

        setSelectedSurvey(survey);

        setShowQR(true);

    }}
>
    <FaQrcode className="me-1" />
    QR Code
</Button>

<Button
    size="sm"
    variant="success"
    className="me-2 mt-2"
    onClick={() =>
        window.open(
            `/public/survey/${survey.id}`,
            "_blank"
        )
    }
>
    <FaExternalLinkAlt className="me-1" />
    Open
</Button>

<Button
    size="sm"
    variant="primary"
    className="me-2 mt-2"
    disabled={
        survey.status === "published"
    }
    onClick={() =>
        handlePublish(survey.id)
    }
>
    <FaUpload className="me-1" />
    Publish
</Button>

<Button
    size="sm"
    variant="danger"
    className="mt-2"
    disabled={
        survey.status === "closed"
    }
    onClick={() =>
        handleClose(survey.id)
    }
>
    <FaTimesCircle className="me-1" />
    Close
</Button>

                        </Card.Body>

                    </Card>

                </Col>

            ))}
<SurveyPreviewModal
    show={showPreview}
    onHide={() => setShowPreview(false)}
    survey={previewSurvey}
/>

<QRCodeModal
    show={showQR}
    onHide={() => setShowQR(false)}
    surveyId={selectedSurvey?.id}
/>

        </Row>

    );

}