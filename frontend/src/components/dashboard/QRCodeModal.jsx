import { Modal, Button } from "react-bootstrap";
import QRCode from "react-qr-code";

export default function QRCodeModal({

    show,

    onHide,

    surveyId

}) {

    const url =
        `${window.location.origin}/public/survey/${surveyId}`;

    return (

        <Modal
            show={show}
            onHide={onHide}
            centered
        >

            <Modal.Header closeButton>

                <Modal.Title>

                    Survey QR Code

                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="text-center">

                <QRCode
                    value={url}
                    size={220}
                />

                <p className="mt-3 small">

                    {url}

                </p>

            </Modal.Body>

            <Modal.Footer>

                <Button
                    variant="secondary"
                    onClick={onHide}
                >

                    Close

                </Button>

            </Modal.Footer>

        </Modal>

    );

}