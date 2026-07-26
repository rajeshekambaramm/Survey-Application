export default function QuestionCard({
    question,
    index,
    onEdit,
    onDelete
}) {

    return (

        <div className="card mb-3 shadow-sm">
            <div className="card-body">
                <h5>
                    Question {index + 1}
                </h5>

                <p>
                    <strong>Question:</strong>
                    {" "}
                    {question.question}
                </p>

                <p>
                    <strong>Type:</strong>
                    {" "}
                    {question.type}
                </p>

                {question.type === "radio" && (
                    <>
                        <strong>Options:</strong>

                        <ul>
                            {question.options.map((option, i) => (
                                <li key={i}>
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(question)}
                >
                    Edit
                </button>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(question)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}