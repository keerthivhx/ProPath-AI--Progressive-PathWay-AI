import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function DomainResult() {
  const navigate = useNavigate();

  const [result, setResult] = useState(null);

  useEffect(() => {

    const answers = JSON.parse(
      localStorage.getItem("domainAnswers") || "[]"
    );

    const yesCount = answers.filter(
      (answer) => answer === true
    ).length;

    let recommendation;

    if (yesCount >= 8) {
      recommendation = {
        domain: "Data Analytics",
        match: 90,
        description:
          "You show strong interest in data, statistics, visualization and business problem solving.",
        roadmap: "/roadmap"
      };
    } else if (yesCount >= 6) {
      recommendation = {
        domain: "AI / Machine Learning",
        match: 80,
        description:
          "Your responses indicate strong interest in artificial intelligence, programming and machine learning.",
        roadmap: "/roadmap"
      };
    } else if (yesCount >= 4) {
      recommendation = {
        domain: "Full Stack Development",
        match: 70,
        description:
          "You show interest in application development, programming and building web systems.",
        roadmap: "/roadmap"
      };
    } else {
      recommendation = {
        domain: "Cloud & DevOps",
        match: 60,
        description:
          "You may enjoy infrastructure, deployment, cloud technologies and software operations.",
        roadmap: "/roadmap"
      };
    }

    localStorage.setItem(
      "recommendedDomain",
      recommendation.domain
    );

    localStorage.setItem(
      "domainResult",
      JSON.stringify(recommendation)
    );

    setResult(recommendation);

  }, []);


  if (!result) {
    return (
      <div className="min-h-screen bg-slate-50">

        <Navbar />

        <div className="text-center py-20">
          Analyzing your responses...
        </div>

      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-10">

        <div className="bg-white border rounded-2xl shadow-sm p-8 text-center">

          <div className="text-5xl">
            🎯
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mt-4">
            Your Recommended Career Domain
          </h1>

          <div className="mt-8">

            <h2 className="text-4xl font-bold text-blue-600">
              {result.domain}
            </h2>

            <p className="text-2xl font-bold text-slate-800 mt-3">
              {result.match}% Match
            </p>

          </div>


          <div className="bg-blue-50 rounded-xl p-6 mt-8 text-left">

            <h3 className="font-bold text-blue-900">
              🤖 Why this domain?
            </h3>

            <p className="text-blue-800 mt-2">
              {result.description}
            </p>

          </div>


          <div className="mt-8 text-left">

            <h3 className="font-bold text-slate-900">
              🚀 Your ProPath
            </h3>

            <p className="text-slate-600 mt-2">
              Your recommended domain will be used to guide your
              learning roadmap and future validation activities.
            </p>

          </div>


          <div className="flex flex-wrap justify-center gap-4 mt-8">

            <button
              onClick={() => navigate("/roadmap")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700"
            >
              📚 View My Roadmap
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800"
            >
              👤 Update Profile
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-slate-200 text-slate-800 px-6 py-3 rounded-lg font-bold hover:bg-slate-300"
            >
              ← Dashboard
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default DomainResult;