import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    createSurvey,
    updateSurvey,
    getSurveyById
} from "../../services/surveyService";
import { toast } from "react-toastify";
import { successToast } from "../../utils/alerts";

export default function CreateSurvey() {

    const navigate = useNavigate();
    
    const { surveyId } = useParams();
    const isEdit = !!surveyId;

    useEffect(() => {

    if (!isEdit) return;

    loadSurvey();

}, []);

const loadSurvey = async () => {

    try {

        const data = await getSurveyById(surveyId);

        setFormData({
            title: data.survey.title,
            description: data.survey.description
        });

    } catch (error) {

        console.log(error);

    }

};

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

    if (isEdit) {

        await updateSurvey(
            surveyId,
            formData
        );

        toast.success("Survey Updated Successfully!");

    } else {

        await createSurvey(formData);

        toast.success("Survey Created Successfully!");
    }

    navigate("/dashboard");

} catch (err) {

    setError(
        err.response?.data?.detail ||
        (isEdit
            ? "Failed to update survey."
            : "Failed to create survey.")
    );

}

        setLoading(false);
    };

    return (
        <div className="card shadow">

            <div className="card-body">

                <h2>
                    {isEdit
                    ? "Edit Survey"
                    : "Create Survey"}
                </h2>

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

    {

        loading ? (

            <>

                <span
                    className="spinner-border spinner-border-sm me-2"
                />

                {

                    isEdit

                        ? "Updating..."

                        : "Creating..."

                }

            </>

        ) : (

            isEdit

                ? "Update Survey"

                : "Create Survey"

        )

    }

</button>

                </form>

            </div>

        </div>
    );

}