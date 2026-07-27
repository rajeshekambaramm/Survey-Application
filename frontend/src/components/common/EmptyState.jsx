import { FaInbox } from "react-icons/fa";

export default function EmptyState({
    title,
    message,
    buttonText,
    onClick
}) {
    return (
        <div
            className="text-center py-5"
        >
            <FaInbox
                size={70}
                className="text-secondary mb-3"
            />

            <h3>{title}</h3>

            <p className="text-muted">
                {message}
            </p>

            {buttonText && (

                <button
                    className="btn btn-primary"
                    onClick={onClick}
                >
                    {buttonText}
                </button>

            )}
        </div>
    );
}