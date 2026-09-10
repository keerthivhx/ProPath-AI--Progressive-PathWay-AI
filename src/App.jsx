import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DomainExplorer from "./pages/DomainExplorer";
import DomainResult from "./pages/DomainResult";
import Profile from "./pages/Profile";
import Roadmap from "./pages/Roadmap";
import KnowledgeValidation from "./pages/KnowledgeValidation";
import ProjectValidation from "./pages/ProjectValidation";
import AIInterview from "./pages/AIInterview";
import SeniorProjects from "./pages/SeniorProjects";
import Portfolio from "./pages/Portfolio";
import ProjectUpload from "./pages/ProjectUpload";
import JobValidation from "./pages/JobValidation";


function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}


function App() {
    return (
        <Routes>

            {/* ================= PUBLIC PAGES ================= */}

            <Route
                path="/"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />


            {/* ================= PROTECTED PAGES ================= */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/domain-explorer"
                element={
                    <ProtectedRoute>
                        <DomainExplorer />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/domain-result"
                element={
                    <ProtectedRoute>
                        <DomainResult />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/roadmap"
                element={
                    <ProtectedRoute>
                        <Roadmap />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/knowledge-validation"
                element={
                    <ProtectedRoute>
                        <KnowledgeValidation />
                    </ProtectedRoute>
                }
            />

            {/* ================= PROJECT VALIDATION ================= */}

            <Route
                path="/project-validation"
                element={
                    <ProtectedRoute>
                        <ProjectValidation />
                    </ProtectedRoute>
                }
            />

            {/* ================= AI INTERVIEW ================= */}

            <Route
                path="/ai-interview"
                element={
                    <ProtectedRoute>
                        <AIInterview />
                    </ProtectedRoute>
                }
            />

            {/* ================= SENIOR PROJECTS ================= */}

            <Route
                path="/senior-projects"
                element={
                    <ProtectedRoute>
                        <SeniorProjects />
                    </ProtectedRoute>
                }
            />

            {/* ================= PORTFOLIO ================= */}

            <Route
                path="/portfolio"
                element={
                    <ProtectedRoute>
                        <Portfolio />
                    </ProtectedRoute>
                }
            />

            {/* ================= PROJECT UPLOAD ================= */}

            <Route
                path="/project-upload"
                element={
                    <ProtectedRoute>
                        <ProjectUpload />
                    </ProtectedRoute>
                }
            />

            {/* ================= JOB VALIDATION ================= */}

            <Route
                path="/job-validation"
                element={
                    <ProtectedRoute>
                        <JobValidation />
                    </ProtectedRoute>
                }
            />

            {/* ================= FALLBACK ================= */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/dashboard"
                        replace
                    />
                }
            />

        </Routes>
    );
}


export default App;