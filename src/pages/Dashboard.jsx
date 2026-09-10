import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: "",
        domain: "",
        linkedin: "",
        github: "",
        portfolio: ""
    });

    const [progress, setProgress] = useState({
        roadmap: 0,
        interview: 0,
        project: 0,
        overall: 0
    });

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = () => {
        // -----------------------------
        // PROFILE DATA
        // -----------------------------
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        const profileLinks = JSON.parse(
            localStorage.getItem("profileLinks") || "{}"
        );

        const recommendedDomain =
            localStorage.getItem("recommendedDomain") || "";

        setProfile({
            name: user.name || "",
            domain: recommendedDomain || user.domain || "",
            linkedin: profileLinks.linkedin || "",
            github: profileLinks.github || "",
            portfolio: profileLinks.portfolio || ""
        });

        // -----------------------------
        // ROADMAP PROGRESS
        // -----------------------------
        let roadmapProgress = 0;

        const roadmapData = JSON.parse(
            localStorage.getItem("roadmapProgress") || "null"
        );

        if (roadmapData) {
            if (typeof roadmapData === "number") {
                roadmapProgress = roadmapData;
            } else if (typeof roadmapData.percentage === "number") {
                roadmapProgress = roadmapData.percentage;
            } else if (typeof roadmapData.progress === "number") {
                roadmapProgress = roadmapData.progress;
            }
        }

        // If roadmap data is stored as completed topics
        // Roadmap stores completed topics
if (
    roadmapData &&
    Array.isArray(roadmapData.completedTopics)
) {
    const completedCount = roadmapData.completedTopics.length;

    // Each domain currently contains 32 roadmap topics
    const totalTopics = 32;

    roadmapProgress = Math.round(
        (completedCount / totalTopics) * 100
    );
}

        // -----------------------------
        // AI INTERVIEW PROGRESS
        // -----------------------------
        let interviewProgress = 0;

        const interviewData = JSON.parse(
            localStorage.getItem("interviewResult") || "null"
        );

        if (interviewData) {
            if (typeof interviewData.percentage === "number") {
                interviewProgress = interviewData.percentage;
            } else if (
                typeof interviewData.score === "number" &&
                typeof interviewData.totalQuestions === "number" &&
                interviewData.totalQuestions > 0
            ) {
                interviewProgress = Math.round(
                    (interviewData.score / interviewData.totalQuestions) * 100
                );
            }
        }

        // -----------------------------
        // PROJECT VALIDATION PROGRESS
        // -----------------------------
        let projectProgress = 0;

        const projectData = JSON.parse(
            localStorage.getItem("projectValidation") || "null"
        );

        if (projectData && typeof projectData.score === "number") {
            projectProgress = projectData.score;
        }

        // Keep values between 0 and 100
        roadmapProgress = Math.max(0, Math.min(100, roadmapProgress));
        interviewProgress = Math.max(0, Math.min(100, interviewProgress));
        projectProgress = Math.max(0, Math.min(100, projectProgress));

        // -----------------------------
        // OVERALL PROGRESS
        // -----------------------------
        const overallProgress = Math.round(
            (roadmapProgress + interviewProgress + projectProgress) / 3
        );

        setProgress({
            roadmap: roadmapProgress,
            interview: interviewProgress,
            project: projectProgress,
            overall: overallProgress
        });
    };

   useEffect(() => {
    const handleFocus = () => {
        loadDashboardData();
    };

    const handleStorage = () => {
        loadDashboardData();
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("storage", handleStorage);

    return () => {
        window.removeEventListener("focus", handleFocus);
        window.removeEventListener("storage", handleStorage);
    };
}, []);

    // Pie chart using CSS conic-gradient
    const roadmapAngle = progress.roadmap * 1.2;
    const interviewAngle =
        progress.roadmap * 1.2 + progress.interview * 1.2;

    const pieStyle = {
        background: `conic-gradient(
            #2563eb 0deg ${roadmapAngle}deg,
            #9333ea ${roadmapAngle}deg ${interviewAngle}deg,
            #16a34a ${interviewAngle}deg ${interviewAngle + progress.project * 1.2}deg,
            #e2e8f0 ${interviewAngle + progress.project * 1.2}deg 360deg
        )`
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 py-8">

                {/* ---------------- PROFILE ---------------- */}
                <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>
                            <p className="text-blue-600 font-semibold">
                                🎓 Profile
                            </p>

                            <h1 className="text-3xl font-bold text-slate-900 mt-1">
                                {profile.name || "Student"}
                            </h1>

                            <p className="text-slate-500 mt-1">
                                {profile.domain || "Engineering Student"}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold"
                        >
                            ✏️ Edit Profile
                        </button>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

                        <div className="bg-slate-50 rounded-2xl p-4">
                            <p className="text-sm text-slate-500">
                                LinkedIn
                            </p>

                            {profile.linkedin ? (
                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 font-semibold break-all"
                                >
                                    View Profile
                                </a>
                            ) : (
                                <p className="text-slate-400">
                                    Not added
                                </p>
                            )}
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-4">
                            <p className="text-sm text-slate-500">
                                Github
                            </p>

                            {profile.github ? (
                                <a
                                    href={profile.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 font-semibold break-all"
                                >
                                    View Github
                                </a>
                            ) : (
                                <p className="text-slate-400">
                                    Not added
                                </p>
                            )}
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-4">
                            <p className="text-sm text-slate-500">
                                Portfolio
                            </p>

                            {profile.portfolio ? (
                                <a
                                    href={profile.portfolio}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 font-semibold break-all"
                                >
                                    View Portfolio
                                </a>
                            ) : (
                                <p className="text-slate-400">
                                    Not added
                                </p>
                            )}
                        </div>

                    </div>
                </div>

                {/* ---------------- THREE MAIN BUTTONS ---------------- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    {/* 4 YEAR ROADMAP */}
                    <div className="bg-white rounded-3xl shadow-lg p-6">
                        <div className="text-4xl mb-4">
                            🗺️
                        </div>

                        <h2 className="text-xl font-bold text-slate-900">
                            4 Year Roadmap
                        </h2>

                        <p className="text-slate-500 mt-2 mb-5">
                            Follow your personalized semester-wise
                            engineering career roadmap.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/roadmap")}
                            className="w-full px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                        >
                            View Roadmap →
                        </button>
                    </div>

                    {/* AI INTERVIEW */}
                    <div className="bg-white rounded-3xl shadow-lg p-6">
                        <div className="text-4xl mb-4">
                            🎤
                        </div>

                        <h2 className="text-xl font-bold text-slate-900">
                            AI Interview
                        </h2>

                        <p className="text-slate-500 mt-2 mb-5">
                            Validate your technical knowledge through
                            AI-style interview questions.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/ai-interview")}
                            className="w-full px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                        >
                            Start Interview →
                        </button>
                    </div>

                    {/* PROJECT */}
                    <div className="bg-white rounded-3xl shadow-lg p-6">
                        <div className="text-4xl mb-4">
                            🛠️
                        </div>

                        <h2 className="text-xl font-bold text-slate-900">
                            Project
                        </h2>

                        <p className="text-slate-500 mt-2 mb-5">
                            Validate your practical skills using
                            project evidence.
                        </p>

                        <button
    type="button"
    onClick={() => navigate("/project-validation")}
    className="w-full px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
>
    Validate Skills →
</button>
                    </div>

                </div>

                {/* ---------------- PROGRESS ---------------- */}
                <div className="bg-white rounded-3xl shadow-lg p-6">

                    <div className="mb-6">
                        <p className="text-blue-600 font-semibold">
                            📊 Progress
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 mt-1">
                            Your ProPath Progress
                        </h2>

                        <p className="text-slate-500 mt-1">
                            Track your roadmap, interview and practical
                            project progress.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-10">

                        {/* PIE CHART */}
                        <div className="relative w-64 h-64">

                            <div
                                className="w-full h-full rounded-full"
                                style={pieStyle}
                            ></div>

                            {/* Center */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white rounded-full w-36 h-36 flex flex-col items-center justify-center shadow-inner">

                                    <span className="text-4xl font-bold text-slate-900">
                                        {progress.overall}%
                                    </span>

                                    <span className="text-sm text-slate-500">
                                        Overall
                                    </span>

                                </div>
                            </div>

                        </div>

                        {/* LEGEND */}
                        <div className="w-full max-w-sm space-y-4">

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-blue-600"></div>

                                    <div>
                                        <p className="font-semibold text-slate-900">
                                            4-Year Roadmap
                                        </p>

                                        <p className="text-sm text-slate-500">
                                            Learning progress
                                        </p>
                                    </div>
                                </div>

                                <span className="font-bold text-blue-600">
                                    {progress.roadmap}%
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-purple-600"></div>

                                    <div>
                                        <p className="font-semibold text-slate-900">
                                            AI Interview
                                        </p>

                                        <p className="text-sm text-slate-500">
                                            Knowledge validation
                                        </p>
                                    </div>
                                </div>

                                <span className="font-bold text-purple-600">
                                    {progress.interview}%
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-green-600"></div>

                                    <div>
                                        <p className="font-semibold text-slate-900">
                                            Project
                                        </p>

                                        <p className="text-sm text-slate-500">
                                            Practical skills
                                        </p>
                                    </div>
                                </div>

                                <span className="font-bold text-green-600">
                                    {progress.project}%
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
}

export default Dashboard;