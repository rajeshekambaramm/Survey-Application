import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PublicSurvey from "../pages/public/PublicSurvey";
import Profile from "../pages/dashboard/Profile";
import Analytics from "../pages/dashboard/Analytics";
import Dashboard from "../pages/dashboard/Dashboard";
import CreateSurvey from "../pages/dashboard/CreateSurvey";
import QuestionBuilder from "../pages/dashboard/QuestionBuilder";
import SurveyResponses from "../pages/dashboard/SurveyResponses";
import ResponseDetails from "../pages/dashboard/ResponseDetails";

import DashboardLayout from "../components/layout/DashboardLayout";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/survey/:id" element={<PublicSurvey />} />

                {/* Protected Routes */}
<Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <DashboardLayout>
                <Dashboard />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>

<Route
    path="/create-survey"
    element={
        <ProtectedRoute>
            <DashboardLayout>
                <CreateSurvey />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>

<Route
    path="/edit-survey/:surveyId"
    element={
        <ProtectedRoute>
            <DashboardLayout>
                <CreateSurvey />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>

<Route
    path="/survey/:surveyId/questions"
    element={
        <ProtectedRoute>
            <DashboardLayout>
                <QuestionBuilder />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>
<Route
    path="/public/survey/:surveyId"
    element={<PublicSurvey />}
/>

<Route
    path="/survey/:surveyId/responses"
    element={
        <ProtectedRoute>
            <DashboardLayout>
                <SurveyResponses />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>

<Route
    path="/survey/:surveyId/responses/:responseId"
    element={
        <ProtectedRoute>
            <DashboardLayout>
                <ResponseDetails />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>


<Route
    path="/profile"
    element={
        <ProtectedRoute>
            <DashboardLayout>
                <Profile />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>

<Route
    path="/survey/:surveyId/analytics"
    element={
        <ProtectedRoute>
            <DashboardLayout>
                <Analytics />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>

<Route
    path="/analytics"
    element={
        <ProtectedRoute>
            <DashboardLayout>
                <Analytics />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>

            </Routes>
        </BrowserRouter>
    );
}