import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import PublicSurvey from "../pages/public/PublicSurvey";

export default function AppRoutes() {

    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route
                    path="/survey/:id"
                    element={<PublicSurvey />}
                />

            </Routes>

        </BrowserRouter>
    );

}