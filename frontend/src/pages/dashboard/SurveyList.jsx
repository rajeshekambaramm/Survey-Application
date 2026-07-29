import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { getSurveys } from "../../services/surveyService";
import {
    getSurveys,
    deleteSurvey
} from "../../services/surveyService";

import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

import EmptyState from "../../components/common/EmptyState";
import LoadingCard from "../../components/common/LoadingCard";
import SurveyCard from "../../components/dashboard/SurveyCard";


export default function SurveyList() {

    const navigate = useNavigate();

    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest");

    useEffect(() => {
        loadSurveys();
    }, []);

    async function loadSurveys() {
        try {
            const data = await getSurveys();
            console.log("Survey API Response:", data);
            setSurveys(data.surveys || []);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

const handleDelete = async (surveyId) => {

    const confirmDelete = window.confirm(
        "Delete this survey?"
    );

    if (!confirmDelete) return;

    try {

        await deleteSurvey(surveyId);

        loadSurveys();

    } catch (error) {

        console.log(error);

        toast.error("Unable to delete survey.");

    }

};

    const filteredSurveys = surveys
    .filter((survey) => {

        const matchesSearch =
            survey.title
                ?.toLowerCase()
                .includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "all"
                ? true
                : survey.status === statusFilter;

        return matchesSearch && matchesStatus;

    })
    .sort((a, b) => {

        if (sortOrder === "newest") {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }

        return new Date(a.createdAt) - new Date(b.createdAt);

    });

    if (loading) {

    return (

        <div>

            <LoadingCard />
            <LoadingCard />
            <LoadingCard />

        </div>

    );

}

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between mb-3">

                <h2 style={{ color: "red" }}>
    My Surveys - TEST
</h2>

                
                <button className="btn btn-primary"
                    onClick={() => navigate("/create-survey")}
                    >
                    + Create Survey
                </button>

            </div>

            <div className="row mb-3">

    <div className="col-md-4">

        <input
            type="text"
            className="form-control"
            placeholder="Search surveys..."
            value={search}
            onChange={(e) =>
                setSearch(e.target.value)
            }
        />

    </div>

    <div className="col-md-3">

        <select
            className="form-select"
            value={statusFilter}
            onChange={(e) =>
                setStatusFilter(e.target.value)
            }
        >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
        </select>

    </div>

    <div className="col-md-3">

        <select
            className="form-select"
            value={sortOrder}
            onChange={(e) =>
                setSortOrder(e.target.value)
            }
        >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
        </select>

    </div>

</div>

            <div className="mt-4">

    {

        surveys.length === 0 ? (

            <div className="alert alert-info">

                No surveys found

            </div>

        ) : (

            surveys.map((survey) => (

                <SurveyCard
                    key={survey.id}
                    survey={survey}
                />

            ))

        )

    }

</div>
        </div>

    );

}