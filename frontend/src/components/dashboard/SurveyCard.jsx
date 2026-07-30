import { Card, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { FaEye, FaLink, FaExternalLinkAlt } from "react-icons/fa";

import { copySurveyLink } from "../../utils/copyLink";

import { useState } from "react";

import SurveyPreviewModal from "./SurveyPreviewModal";

import { getSurvey } from "../../services/surveyService";

import QRCodeModal from "./QRCodeModal";
import { FaQrcode } from "react-icons/fa";

export default function SurveyCard({ survey, onDelete, onPublish, onClose }) {
    const navigate = useNavigate();
    const [showPreview, setShowPreview] = useState(false);
    const [previewSurvey, setPreviewSurvey] = useState(null);
    const [showQR, setShowQR] = useState(false);
    const handlePreview = async () => {
        const data = await getSurvey(survey.id);

        setPreviewSurvey(data);

        setShowPreview(true);
    };

    return (
        <Card className="shadow-sm border-0 mb-4">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <h4>{survey.title}</h4>
                        <p className="text-muted">{survey.description}</p>
                    </div>
                    <Badge
                        bg={survey.status === "published" ? "success" : "secondary"}
                        className="h-100"
                    >
                        {survey.status}
                    </Badge>
                </div>
                <hr />

                <small className="text-muted">Created: {survey.createdAt || "-"}</small>

                <div className="mt-3">
                    <Button
                        size="sm"
                        className="me-2"
                        onClick={() => navigate(`/survey/${survey.id}/questions`)}
                    >
                        Questions
                    </Button>

                    <Button
                        size="sm"
                        variant="info"
                        className="me-2"
                        onClick={() => navigate(`/survey/${survey.id}/responses`)}
                    >
                        Responses
                    </Button>

                    <Button size="sm" variant="warning" className="me-2">
                        Edit
                    </Button>

                    <Button
                        size="sm"
                        variant="danger"
                        onClick={() => onDelete(survey.id)}
                    >
                        Delete
                    </Button>

                    <Button
                        size="sm"
                        variant="success"
                        className="me-2"
                        onClick={() => {
                            console.log("Analytics clicked");
                            console.log(survey.id);
                            navigate(`/survey/${survey.id}/analytics`);
                        }}
                    >
                        Analytics
                    </Button>

                    <Button
                        variant="secondary"
                        size="sm"
                        className="me-2"
                        onClick={handlePreview}
                    >
                        <FaEye /> Preview
                    </Button>

                    <Button
                        variant="dark"
                        size="sm"
                        className="me-2"
                        onClick={() => copySurveyLink(survey.id)}
                    >
                        <FaLink /> Copy Link
                    </Button>

                    <Button
                        variant="dark"
                        size="sm"
                        className="me-2"
                        onClick={() => setShowQR(true)}
                    >
                        <FaQrcode />
                        {" "}QR Code
                    </Button>

                    <Button
                        variant="success"
                        size="sm"
                        onClick={() => window.open(`/public/survey/${survey.id}`, "_blank")}
                    >
                        <FaExternalLinkAlt /> Open
                    </Button>

                    <SurveyPreviewModal
                        show={showPreview}
                        onHide={() => setShowPreview(false)}
                        survey={previewSurvey}
                    />

                    <Button
                        size="sm"
                        variant="success"
                        className="me-2"
                        onClick={() => onPublish(survey.id)}
                        disabled={survey.status === "published"}
                    >
                        Publish
                    </Button>

                    <Button
                        size="sm"
                        variant="secondary"
                        className="me-2"
                        onClick={() => onClose(survey.id)}
                        disabled={survey.status === "closed"}
                    >
                        Close
                    </Button>
                </div>
                {showQR && (
                    <QRCodeModal
                        show={showQR}
                        onHide={() => setShowQR(false)}
                        surveyId={survey.id}
                    />
                )}
            </Card.Body>
        </Card>

    );
}
