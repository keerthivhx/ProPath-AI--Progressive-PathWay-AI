import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Portfolio() {
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [profileLinks, setProfileLinks] = useState({});
    const [domain, setDomain] = useState("Data Analytics");
    const [project, setProject] = useState(null);
    const [roadmapProgress, setRoadmapProgress] = useState(0);
    const [knowledgeScore, setKnowledgeScore] = useState(0);
    const [practicalScore, setPracticalScore] = useState(0);
    const [interviewScore, setInterviewScore] = useState(0);

    useEffect(() => {
        loadPortfolioData();
    }, []);

    const loadPortfolioData = () => {
        try {
            // User
            const savedUser = JSON.parse(
                localStorage.getItem("user") || "{}"
            );

            setUser(savedUser);

            // Profile Links
            const savedLinks = JSON.parse(
                localStorage.getItem("profileLinks") || "{}"
            );

            setProfileLinks(savedLinks);

            // Domain
            const savedDomain =
                localStorage.getItem("recommendedDomain") ||
                "Data Analytics";

            setDomain(savedDomain);

            // Project Upload
            const savedProject = JSON.parse(
                localStorage.getItem("projectUpload") || "null"
            );

            setProject(savedProject);

            // Roadmap
            const savedRoadmap = JSON.parse(
                localStorage.getItem("roadmapProgress") || "null"
            );

            if (
                savedRoadmap &&
                Array.isArray(savedRoadmap.completedTopics)
            ) {
                const completed =
                    savedRoadmap.completedTopics.length;

                const totalTopics = 32;

                const percentage = Math.round(
                    (completed / totalTopics) * 100
                );

                setRoadmapProgress(
                    Math.min(percentage, 100)
                );
            }

            // Knowledge Validation
            const knowledge = JSON.parse(
                localStorage.getItem("knowledgeValidation") || "null"
            );

            if (knowledge) {
                setKnowledgeScore(
                    Number(knowledge.percentage || 0)
                );
            }

            // Project Validation
            const practical = JSON.parse(
                localStorage.getItem("projectValidation") || "null"
            );

            if (practical) {
                setPracticalScore(
                    Number(practical.score || 0)
                );
            }

            // AI Interview
            const interview = JSON.parse(
                localStorage.getItem("interviewResult") || "null"
            );

            if (interview) {
                let score = Number(
                    interview.percentage || 0
                );

                if (
                    !score &&
                    interview.totalQuestions
                ) {
                    score = Math.round(
                        (Number(interview.score || 0) /
                            Number(interview.totalQuestions)) *
                            100
                    );
                }

                setInterviewScore(
                    Math.min(score, 100)
                );
            }
        } catch (error) {
            console.error(
                "PORTFOLIO DATA ERROR:",
                error
            );
        }
    };

    const studentName =
        user?.name ||
        user?.username ||
        "ProPath AI Student";

    const github =
        profileLinks?.github ||
        user?.github ||
        project?.github ||
        "";

    const linkedin =
        profileLinks?.linkedin ||
        user?.linkedin ||
        "";

    const overallScore = Math.round(
        (roadmapProgress +
            knowledgeScore +
            practicalScore +
            interviewScore) /
            4
    );

    return (
        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <main className="max-w-6xl mx-auto px-4 py-10">

                {/* Header */}
                <div className="bg-white rounded-3xl shadow-lg p-8">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                        <div>

                            <p className="text-blue-600 font-semibold">
                                🚀 ProPath AI Portfolio
                            </p>

                            <h1 className="text-4xl font-bold text-slate-900 mt-2">
                                {studentName}
                            </h1>

                            <p className="text-lg text-slate-500 mt-2">
                                {domain}
                            </p>

                        </div>

                        <div className="text-center">

                            <div className="w-28 h-28 rounded-full bg-blue-50 flex items-center justify-center">

                                <div>

                                    <p className="text-3xl font-bold text-blue-600">
                                        {overallScore}%
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Overall
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Profile */}
                <section className="mt-8">

                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        👤 Profile
                    </h2>

                    <div className="bg-white rounded-2xl shadow p-6">

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <p className="text-sm text-slate-500">
                                    Name
                                </p>

                                <p className="font-semibold text-slate-900 mt-1">
                                    {studentName}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Career Domain
                                </p>

                                <p className="font-semibold text-slate-900 mt-1">
                                    {domain}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    LinkedIn
                                </p>

                                {linkedin ? (
                                    <a
                                        href={linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-semibold text-blue-600 hover:underline break-all"
                                    >
                                        View LinkedIn
                                    </a>
                                ) : (
                                    <p className="text-slate-400 mt-1">
                                        Not added
                                    </p>
                                )}
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    GitHub
                                </p>

                                {github ? (
                                    <a
                                        href={github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-semibold text-blue-600 hover:underline break-all"
                                    >
                                        View GitHub
                                    </a>
                                ) : (
                                    <p className="text-slate-400 mt-1">
                                        Not added
                                    </p>
                                )}
                            </div>

                        </div>

                    </div>

                </section>

                {/* Skills and Scores */}
                <section className="mt-8">

                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        📊 Skills & Validation
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

                        {/* Roadmap */}
                        <div className="bg-white rounded-2xl shadow p-6">

                            <div className="text-3xl">
                                🗺️
                            </div>

                            <p className="text-sm text-slate-500 mt-4">
                                4-Year Roadmap
                            </p>

                            <p className="text-3xl font-bold text-blue-600 mt-1">
                                {roadmapProgress}%
                            </p>

                        </div>

                        {/* Knowledge */}
                        <div className="bg-white rounded-2xl shadow p-6">

                            <div className="text-3xl">
                                🧠
                            </div>

                            <p className="text-sm text-slate-500 mt-4">
                                Knowledge Validation
                            </p>

                            <p className="text-3xl font-bold text-purple-600 mt-1">
                                {knowledgeScore}%
                            </p>

                        </div>

                        {/* Practical */}
                        <div className="bg-white rounded-2xl shadow p-6">

                            <div className="text-3xl">
                                💻
                            </div>

                            <p className="text-sm text-slate-500 mt-4">
                                Practical Skill
                            </p>

                            <p className="text-3xl font-bold text-green-600 mt-1">
                                {practicalScore}%
                            </p>

                        </div>

                        {/* Interview */}
                        <div className="bg-white rounded-2xl shadow p-6">

                            <div className="text-3xl">
                                🎤
                            </div>

                            <p className="text-sm text-slate-500 mt-4">
                                AI Interview
                            </p>

                            <p className="text-3xl font-bold text-orange-600 mt-1">
                                {interviewScore}%
                            </p>

                        </div>

                    </div>

                </section>

                {/* Project */}
                <section className="mt-8">

                    <div className="flex items-center justify-between mb-4">

                        <h2 className="text-2xl font-bold text-slate-900">
                            💻 Projects
                        </h2>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/project-upload")
                            }
                            className="rounded-xl bg-blue-600 px-5 py-2.5 text-white font-semibold hover:bg-blue-700"
                        >
                            + Add Project
                        </button>

                    </div>

                    {!project ? (

                        <div className="bg-white rounded-2xl shadow p-8 text-center">

                            <div className="text-5xl">
                                📁
                            </div>

                            <p className="font-semibold text-slate-700 mt-3">
                                No project uploaded yet.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/project-upload")
                                }
                                className="mt-5 rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700"
                            >
                                Upload Project
                            </button>

                        </div>

                    ) : (

                        <div className="bg-white rounded-2xl shadow p-6">

                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                                <div>

                                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                        Project
                                    </span>

                                    <h3 className="text-2xl font-bold text-slate-900 mt-3">
                                        {project.projectName}
                                    </h3>

                                </div>

                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold hover:bg-slate-800 text-center"
                                    >
                                        🔗 GitHub
                                    </a>
                                )}

                            </div>

                            <div className="mt-5">

                                <p className="text-sm text-slate-500">
                                    Description
                                </p>

                                <p className="text-slate-700 mt-1 leading-7">
                                    {project.description}
                                </p>

                            </div>

                            <div className="mt-5">

                                <p className="text-sm text-slate-500">
                                    Technologies
                                </p>

                                <p className="font-semibold text-slate-800 mt-1">
                                    {project.technologies}
                                </p>

                            </div>

                            {project.fileName && (
                                <div className="mt-5">

                                    <p className="text-sm text-slate-500">
                                        Project Evidence
                                    </p>

                                    <p className="text-green-600 font-semibold mt-1">
                                        📎 {project.fileName}
                                    </p>

                                </div>
                            )}

                        </div>

                    )}

                </section>

                {/* Career Links */}
                <section className="mt-8">

                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        🔗 Professional Links
                    </h2>

                    <div className="bg-white rounded-2xl shadow p-6 flex flex-wrap gap-4">

                        {github && (
                            <a
                                href={github}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-xl bg-slate-900 px-6 py-3 text-white font-semibold hover:bg-slate-800"
                            >
                                GitHub
                            </a>
                        )}

                        {linkedin && (
                            <a
                                href={linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700"
                            >
                                LinkedIn
                            </a>
                        )}

                        {!github && !linkedin && (
                            <p className="text-slate-400">
                                Add your GitHub and LinkedIn links in your profile.
                            </p>
                        )}

                    </div>

                </section>

                {/* Bottom */}
                <div className="mt-8 flex flex-wrap gap-4">

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="rounded-xl bg-slate-900 px-6 py-3 text-white font-semibold hover:bg-slate-800"
                    >
                        ← Dashboard
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/roadmap")}
                        className="rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700"
                    >
                        View Roadmap
                    </button>

                </div>

            </main>

        </div>
    );
}

export default Portfolio;