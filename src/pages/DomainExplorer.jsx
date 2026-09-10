import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function DomainExplorer() {
  const navigate = useNavigate();

  const questions = [
    "Do you enjoy working with data and finding patterns?",
    "Do you enjoy building machine learning models?",
    "Do you enjoy creating websites and applications?",
    "Do you enjoy working with databases and SQL?",
    "Do you enjoy mathematics and statistics?",
    "Do you enjoy solving programming problems?",
    "Do you enjoy creating dashboards and visualizations?",
    "Do you enjoy working with AI technologies?",
    "Do you enjoy designing user-friendly applications?",
    "Do you enjoy analyzing business problems?"
  ];

  const [answers, setAnswers] = useState(
    Array(questions.length).fill(null)
  );

  const handleAnswer = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const submitAssessment = () => {
    if (answers.includes(null)) {
      alert("Please answer all questions.");
      return;
    }

    localStorage.setItem(
      "domainAnswers",
      JSON.stringify(answers)
    );

    navigate("/domain-result");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-slate-900">
            🎯 Career Domain Explorer
          </h1>

          <p className="text-slate-600 mt-2">
            Answer the questions to discover a suitable engineering
            career domain.
          </p>

        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6">

          <h2 className="font-bold text-blue-900">
            🤖 AI Career Assessment
          </h2>

          <p className="text-blue-800 text-sm mt-1">
            Your responses will be analyzed to recommend a career
            direction and personalized learning path.
          </p>

        </div>

        <div className="space-y-5">

          {questions.map((question, index) => (

            <div
              key={index}
              className="bg-white border rounded-2xl p-6 shadow-sm"
            >

              <p className="font-semibold text-slate-900">
                {index + 1}. {question}
              </p>

              <div className="flex gap-4 mt-5">

                <button
                  type="button"
                  onClick={() => handleAnswer(index, true)}
                  className={`px-6 py-2.5 rounded-lg font-semibold ${
                    answers[index] === true
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Yes
                </button>

                <button
                  type="button"
                  onClick={() => handleAnswer(index, false)}
                  className={`px-6 py-2.5 rounded-lg font-semibold ${
                    answers[index] === false
                      ? "bg-red-500 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  No
                </button>

              </div>

            </div>

          ))}

        </div>

        <button
          type="button"
          onClick={submitAssessment}
          className="w-full mt-8 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700"
        >
          🔍 Analyze My Career Domain
        </button>

      </main>

    </div>
  );
}

export default DomainExplorer;