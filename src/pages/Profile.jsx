import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [domain, setDomain] = useState("");

    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");
    const [portfolio, setPortfolio] = useState("");

    const [message, setMessage] = useState("");

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        const savedUser =
            JSON.parse(localStorage.getItem("user")) || {};

        setName(savedUser.name || "");

        const savedDomain =
            localStorage.getItem("recommendedDomain") || "";

        setDomain(savedDomain);

        const savedLinks =
            JSON.parse(
                localStorage.getItem("profileLinks")
            ) || {};

        setLinkedin(savedLinks.linkedin || "");
        setGithub(savedLinks.github || "");
        setPortfolio(savedLinks.portfolio || "");

        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        try {
            const response = await axios.get(
                "http://localhost:5000/api/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.user) {
                setName(
                    response.data.user.name || ""
                );
            }

        } catch (error) {
            console.error(
                "PROFILE LOAD ERROR:",
                error
            );
        }
    };

    const saveProfile = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            alert("Please enter your name.");
            return;
        }

        const profileLinks = {
            linkedin,
            github,
            portfolio
        };

        localStorage.setItem(
            "profileLinks",
            JSON.stringify(profileLinks)
        );

        const savedUser =
            JSON.parse(localStorage.getItem("user")) || {};

        const updatedUser = {
            ...savedUser,
            name
        };

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        const token = localStorage.getItem("token");

        if (token) {
            try {
                await axios.put(
                    "http://localhost:5000/api/profile",
                    {
                        name,
                        branch:
                            savedUser.branch || "",
                        careerGoal:
                            savedUser.careerGoal || ""
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            } catch (error) {
                console.error(
                    "PROFILE SAVE ERROR:",
                    error
                );
            }
        }

        setMessage(
            "Profile updated successfully!"
        );
    };

    return (
        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <main className="max-w-3xl mx-auto px-4 py-10">

                <div className="bg-white rounded-3xl shadow-lg p-8">

                    <div className="text-center mb-8">

                        <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-4xl">
                            👤
                        </div>

                        <h1 className="text-3xl font-bold text-slate-900 mt-4">
                            Profile
                        </h1>

                    </div>

                    {message && (
                        <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6">
                            ✓ {message}
                        </div>
                    )}

                    <form
                        onSubmit={saveProfile}
                        className="space-y-6"
                    >

                        {/* NAME */}

                        <div>

                            <label className="block font-semibold text-slate-800 mb-2">
                                Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                placeholder="Enter your name"
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500"
                            />

                        </div>


                        {/* DOMAIN */}

                        <div>

                            <label className="block font-semibold text-slate-800 mb-2">
                                Domain
                            </label>

                            <div className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50">

                                {domain ? (
                                    <span className="font-semibold text-blue-600">
                                        {domain}
                                    </span>
                                ) : (
                                    <span className="text-slate-400">
                                        Complete Domain Explore first
                                    </span>
                                )}

                            </div>

                        </div>


                        {/* LINKEDIN */}

                        <div>

                            <label className="block font-semibold text-slate-800 mb-2">
                                LinkedIn
                            </label>

                            <input
                                type="url"
                                value={linkedin}
                                onChange={(e) =>
                                    setLinkedin(e.target.value)
                                }
                                placeholder="https://linkedin.com/in/your-profile"
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500"
                            />

                        </div>


                        {/* GITHUB */}

                        <div>

                            <label className="block font-semibold text-slate-800 mb-2">
                                Github
                            </label>

                            <input
                                type="url"
                                value={github}
                                onChange={(e) =>
                                    setGithub(e.target.value)
                                }
                                placeholder="https://github.com/your-username"
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500"
                            />

                        </div>


                        {/* PORTFOLIO */}

                        <div>

                            <label className="block font-semibold text-slate-800 mb-2">
                                Portfolio
                            </label>

                            <input
                                type="url"
                                value={portfolio}
                                onChange={(e) =>
                                    setPortfolio(e.target.value)
                                }
                                placeholder="https://yourportfolio.com"
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500"
                            />

                        </div>


                        {/* SAVE */}

                        <button
                            type="submit"
                            className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition"
                        >
                            💾 Save Profile
                        </button>

                    </form>


                    {/* DASHBOARD */}

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                        className="w-full mt-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold"
                    >
                        ← Back to Dashboard
                    </button>

                </div>

            </main>

        </div>
    );
}

export default Profile;