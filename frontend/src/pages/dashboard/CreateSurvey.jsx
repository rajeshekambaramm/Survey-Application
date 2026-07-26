import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSurvey } from "../../services/surveyService";

export default function CreateSurvey() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            await createSurvey(formData);

            alert("Survey Created Successfully!");

            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data?.detail ||
                "Failed to create survey."
            );

        }

        setLoading(false);
    };

    return (
        <div className="card shadow">

            <div className="card-body">

                <h2>Create Survey</h2>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            Survey Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Description
                        </label>

                        <textarea
                            name="description"
                            rows="4"
                            className="form-control"
                            value={formData.description}
                            onChange={handleChange}
                        />

                    </div>

                    <button
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Survey"}
                    </button>

                </form>

            </div>

        </div>
    );

}