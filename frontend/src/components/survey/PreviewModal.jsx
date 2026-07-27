import { Modal, Button, Form } from "react-bootstrap";

export default function PreviewModal({
    show,
    onClose,
    survey
}) {

    return (

        <Modal
            show={show}
            onHide={onClose}
            size="lg"
        >

            <Modal.Header closeButton>

                <Modal.Title>

                    Survey Preview

                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                <h3>{survey?.title}</h3>

                <p>{survey?.description}</p>

                <hr />

                {
                    survey?.questions?.map((question, index) => (

                        <div
                            key={question.id || index}
                            className="mb-4"
                        >

                            <h5>

                                {index + 1}. {question.question}

                            </h5>

                            {
                                question.type === "text" ? (

                                    <Form.Control
                                        type="text"
                                        placeholder="Your answer"
                                        disabled
                                    />

                                ) : (

                                    question.options.map((option, i) => (

                                        <Form.Check
                                            key={i}
                                            type="radio"
                                            label={option}
                                            disabled
                                        />

                                    ))

                                )
                            }

                        </div>

                    ))
                }

            </Modal.Body>

            <Modal.Footer>

                <Button
                    variant="secondary"
                    onClick={onClose}
                >
                    Close
                </Button>

            </Modal.Footer>

        </Modal>

    );

}