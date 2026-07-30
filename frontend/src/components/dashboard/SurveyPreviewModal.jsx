import { Modal, Button, Form } from "react-bootstrap";

export default function SurveyPreviewModal({

    show,

    onHide,

    survey

}) {

    if (!survey) return null;

    return (

        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >

            <Modal.Header closeButton>

                <Modal.Title>

                    {survey.title}

                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                <p>

                    {survey.description}

                </p>

                <hr />

                {

                    survey.questions?.length === 0 ?

                        (

                            <p className="text-muted">

                                No questions added.

                            </p>

                        )

                        :

                        survey.questions?.map(

                            (question, index) => (

                                <div
                                    key={question.id || index}
                                    className="mb-4"
                                >

                                    <label
                                        className="fw-bold"
                                    >

                                        {index + 1}.
                                        {" "}
                                        {question.question}

                                    </label>

                                    {

                                        question.type === "text" && (

                                            <Form.Control
                                                type="text"
                                                disabled
                                                placeholder="User answer..."
                                            />

                                        )

                                    }

                                    {

                                        question.type === "radio" && (

                                            question.options?.map(

                                                (option, i) => (

                                                    <Form.Check

                                                        key={i}

                                                        type="radio"

                                                        disabled

                                                        label={option}

                                                    />

                                                )

                                            )

                                        )

                                    }

                                </div>

                            )

                        )

                }

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