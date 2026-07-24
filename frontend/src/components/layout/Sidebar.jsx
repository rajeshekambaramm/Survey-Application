import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div
            className="bg-dark text-white p-3"
            style={{ width: "250px", minHeight: "100vh" }}
        >
            <h3>Survey App</h3>

            <hr />

            <ul className="nav flex-column">

                <li className="nav-item">
                    <Link className="nav-link text-white" to="/dashboard">
                        Dashboard
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link text-white" to="/surveys">
                        My Surveys
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link text-white" to="/create-survey">
                        Create Survey
                    </Link>
                </li>

            </ul>
        </div>
    );
}