import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

export default function Dashboard() {
    return (
        <div className="d-flex">

            <Sidebar />

            <div className="flex-grow-1">

                <Navbar />

                <div className="container mt-4">

                    <h2>Welcome to Survey Dashboard</h2>

                    <p>
                        You are successfully logged in.
                    </p>

                </div>

            </div>

        </div>
    );
}