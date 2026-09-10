import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function JobValidation() {
    const navigate = useNavigate();

    const [jobTitle, setJobTitle] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [jobUrl, setJobUrl] = useState("");

    const [result, setResult] = useState(null);

    const validateJob = (e) => {
        e.preventDefault();

        if (!jobTitle.trim()) {
            alert("Please enter job title.");
            return;
        }

        if (!company.trim()) {
            alert("Please enter company name.");
            return;
        }

        if (!description.trim()) {
            alert("Please enter job description.");
            return;
        }

        let score = 0;

        if (jobTitle.trim()) {
            score += 25;
        }

        if (company.trim()) {
            score += 25;
        }

        if (description.trim().length >= 30) {
            score += 25;
        }

        if (jobUrl.trim()) {
            score += 25;
        }

        const validation = {
            jobTitle,
            company,
            description,
            jobUrl,
            score,
            validated: true
        };

        localStorage.setItem(
            "jobValidation",
            JSON.stringify(validation)
        );

        setResult(score);
    };

    if (result !== null) {
        return (
            <div className="min-h-screen bg-slate-100">

                <Navbar />

                <main className="max-w-3xl mx-auto px-4 py-10">

                    <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

                        <div className="text-6xl mb-4">
                            {result >= 75 ? "✅" : "⚠️"}
                        </div>

                        <h1 className="text-3xl font-bold text-slate-900">
                            Job Validation Complete
                        </h1>

                        <p className="text-slate-500 mt-2">
                            The job information has been checked.
                        </p>

                        <div className="my-8">

                            <p className="text-6xl font-bold text-green-600">
                                {result}%
                            </p>

                            <p className="text-slate-500 mt-2">
                                Job Validation Score
                            </p>

                        </div>

                        <div className="bg-green-50 rounded-2xl p-6 text-left mb-8">

                            <p className="font-semibold text-slate-900">
                                Job: {jobTitle}
                            </p>

                            <p className="text-slate-600 mt-2">
                                Company: {company}
                            </p>

                            <p className="font-semibold text-green-700 mt-4">
                                {result >= 75
                                    ? "This opportunity contains sufficient information for further review."
                                    : "Review the job information carefully before applying."
                                }
                            </p>

                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">

                            <button
                                type="button"
                                onClick={() => navigate("/dashboard")}
                                className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold"
                            >
                                ← Dashboard
                            </button>

                            <button
                                type="button"
                                onClick={() => setResult(null)}
                                className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
                            >
                                Validate Another Job
                            </button>

                        </div>

                    </div>

                </main>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <main className="max-w-3xl mx-auto px-4 py-10">

                <div className="bg-white rounded-3xl shadow-lg p-8">

                    <p className="text-green-600 font-semibold">
                        🛡️ Job Validation
                    </p>

                    <h1 className="text-3xl font-bold text-slate-900 mt-2">
                        Validate Job Opportunity
                    </h1>

                    <p className="text-slate-500 mt-2 mb-8">
                        Check the available information before considering a job opportunity.
                    </p>

                    <form
                        onSubmit={validateJob}
                        className="space-y-5"
                    >

                        <div>
                            <label className="block font-semibold mb-2">
                                Job Title *
                            </label>

                            <input
                                type="text"
                                value={jobTitle}
                                onChange={(e) =>
                                    setJobTitle(e.target.value)
                                }
                                placeholder="Example: Data Analyst"
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Company Name *
                            </label>

                            <input
                                type="text"
                                value={company}
                                onChange={(e) =>
                                    setCompany(e.target.value)
                                }
                                placeholder="Example: ABC Technologies"
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Job Description *
                            </label>

                            <textarea
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                placeholder="Paste the job description here..."
                                rows="7"
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-green-500 resize-none"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Job URL
                            </label>

                            <input
                                type="url"
                                value={jobUrl}
                                onChange={(e) =>
                                    setJobUrl(e.target.value)
                                }
                                placeholder="https://company.com/careers/job"
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-green-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold"
                        >
                            🛡️ Validate Job
                        </button>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default JobValidation;