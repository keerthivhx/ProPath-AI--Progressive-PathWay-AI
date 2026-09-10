import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ProjectUpload() {
    const navigate = useNavigate();

    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [technologies, setTechnologies] = useState("");
    const [github, setGithub] = useState("");
    const [fileName, setFileName] = useState("");

    const [uploaded, setUploaded] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!projectName.trim()) {
            alert("Please enter project name.");
            return;
        }

        if (!description.trim()) {
            alert("Please enter project description.");
            return;
        }

        if (!technologies.trim()) {
            alert("Please enter technologies used.");
            return;
        }

        const projectData = {
            projectName,
            description,
            technologies,
            github,
            fileName,
            uploaded: true,
        };

        localStorage.setItem(
            "projectUpload",
            JSON.stringify(projectData)
        );

        setUploaded(true);
    };

    if (uploaded) {
        return (
            <div className="min-h-screen bg-slate-100">

                <Navbar />

                <main className="max-w-3xl mx-auto px-4 py-10">

                    <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

                        <div className="text-6xl mb-5">
                            ☁️
                        </div>

                        <h1 className="text-3xl font-bold text-slate-900">
                            Project Uploaded Successfully
                        </h1>

                        <p className="text-slate-500 mt-3">
                            Your project has been added to ProPath AI.
                        </p>

                        <div className="bg-blue-50 rounded-2xl p-6 mt-8 text-left">

                            <p className="text-sm text-slate-500">
                                Project Name
                            </p>

                            <p className="font-bold text-slate-900 text-lg">
                                {projectName}
                            </p>

                            <p className="text-sm text-slate-500 mt-4">
                                Technologies
                            </p>

                            <p className="font-semibold text-slate-900">
                                {technologies}
                            </p>

                            {github && (
                                <>
                                    <p className="text-sm text-slate-500 mt-4">
                                        GitHub
                                    </p>

                                    <a
                                        href={github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-semibold text-blue-600 break-all hover:underline"
                                    >
                                        {github}
                                    </a>
                                </>
                            )}

                            {fileName && (
                                <>
                                    <p className="text-sm text-slate-500 mt-4">
                                        Project File
                                    </p>

                                    <p className="font-semibold text-green-600">
                                        ✓ {fileName}
                                    </p>
                                </>
                            )}

                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-8">

                            <button
                                type="button"
                                onClick={() => navigate("/dashboard")}
                                className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold"
                            >
                                ← Dashboard
                            </button>

                            <button
                                type="button"
                                onClick={() => setUploaded(false)}
                                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                            >
                                Upload Another
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

                    <p className="text-blue-600 font-semibold">
                        ☁️ Project Upload
                    </p>

                    <h1 className="text-3xl font-bold text-slate-900 mt-2">
                        Upload Your Project
                    </h1>

                    <p className="text-slate-500 mt-2 mb-8">
                        Seniors can upload their projects and share them with students.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Project Name */}
                        <div>
                            <label className="block font-semibold mb-2">
                                Project Name *
                            </label>

                            <input
                                type="text"
                                value={projectName}
                                onChange={(e) =>
                                    setProjectName(e.target.value)
                                }
                                placeholder="Example: AI Career Guidance System"
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block font-semibold mb-2">
                                Project Description *
                            </label>

                            <textarea
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                placeholder="Describe your project..."
                                rows="5"
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 resize-none"
                            />
                        </div>

                        {/* Technologies */}
                        <div>
                            <label className="block font-semibold mb-2">
                                Technologies Used *
                            </label>

                            <input
                                type="text"
                                value={technologies}
                                onChange={(e) =>
                                    setTechnologies(e.target.value)
                                }
                                placeholder="React, Node.js, MongoDB, Python"
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* GitHub */}
                        <div>
                            <label className="block font-semibold mb-2">
                                GitHub Link
                            </label>

                            <input
                                type="url"
                                value={github}
                                onChange={(e) =>
                                    setGithub(e.target.value)
                                }
                                placeholder="https://github.com/username/project"
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* File */}
                        <div>
                            <label className="block font-semibold mb-2">
                                Project File
                            </label>

                            <input
                                type="file"
                                onChange={(e) => {
                                    if (e.target.files.length > 0) {
                                        setFileName(
                                            e.target.files[0].name
                                        );
                                    } else {
                                        setFileName("");
                                    }
                                }}
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                            />

                            {fileName && (
                                <p className="text-sm text-green-600 mt-2">
                                    ✓ {fileName}
                                </p>
                            )}
                        </div>

                        {/* Upload */}
                        <button
                            type="submit"
                            className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                        >
                            ☁️ Upload Project
                        </button>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default ProjectUpload;