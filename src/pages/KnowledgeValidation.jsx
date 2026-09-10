import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const questions = [
  {
    question: "Which Python library is mainly used for data analysis?",
    options: ["NumPy", "Pandas", "Flask", "Django"],
    answer: "Pandas",
  },
  {
    question: "Which programming language is commonly used for Data Analytics?",
    options: ["Python", "HTML", "CSS", "XML"],
    answer: "Python",
  },
  {
    question: "Which SQL command is used to retrieve data from a database?",
    options: ["INSERT", "UPDATE", "DELETE", "SELECT"],
    answer: "SELECT",
  },
  {
    question: "Which tool is commonly used for Business Intelligence?",
    options: ["Power BI", "Git", "VS Code", "Node.js"],
    answer: "Power BI",
  },
  {
    question: "What does EDA stand for?",
    options: [
      "Electronic Data Application",
      "Exploratory Data Analysis",
      "Extended Data Algorithm",
      "External Database Access",
    ],
    answer: "Exploratory Data Analysis",
  },
];

function KnowledgeValidation() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState("");

  const [score, setScore] = useState(0);

  const [finished, setFinished] =
    useState(false);

  const question = questions[currentQuestion];

  // ---------------------------------------------
  // NEXT QUESTION
  // ---------------------------------------------

  const handleNext = () => {
    if (!selectedAnswer) {
      alert("Please select an answer.");
      return;
    }

    let newScore = score;

    if (selectedAnswer === question.answer) {
      newScore = score + 1;
      setScore(newScore);
    }

    // -------------------------------------------
    // QUIZ FINISHED
    // -------------------------------------------

    if (
      currentQuestion ===
      questions.length - 1
    ) {
      const percentage = Math.round(
        (newScore / questions.length) * 100
      );

      // Determine adaptive level
      let adaptiveLevel = "normal";

      if (percentage < 50) {
        adaptiveLevel = "revision";
      } else if (percentage < 80) {
        adaptiveLevel = "normal";
      } else {
        adaptiveLevel = "advanced";
      }

      // Save knowledge validation result
      localStorage.setItem(
        "knowledgeValidation",
        JSON.stringify({
          score: newScore,
          total: questions.length,
          percentage: percentage,
          completed: true,
        })
      );

      // Save adaptive level
      localStorage.setItem(
        "adaptiveLevel",
        adaptiveLevel
      );

      setFinished(true);

      return;
    }

    // Move to next question
    setCurrentQuestion(
      currentQuestion + 1
    );

    setSelectedAnswer("");
  };

  // ---------------------------------------------
  // RETRY QUIZ
  // ---------------------------------------------

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setFinished(false);
  };

  // ---------------------------------------------
  // RESULT SCREEN
  // ---------------------------------------------

  if (finished) {
    const finalPercentage = Math.round(
      (score / questions.length) * 100
    );

    let level = "normal";

    if (finalPercentage < 50) {
      level = "revision";
    } else if (finalPercentage < 80) {
      level = "normal";
    } else {
      level = "advanced";
    }

    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">

            <div className="text-5xl mb-4">
              {level === "revision"
                ? "🔄"
                : level === "normal"
                ? "📚"
                : "🚀"}
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Knowledge Validation Complete
            </h1>

            <p className="text-slate-500 mt-3">
              Your knowledge assessment has
              been completed.
            </p>

            {/* SCORE */}
            <div className="mt-6">
              <p className="text-slate-500">
                Your Score
              </p>

              <p className="text-5xl font-bold text-blue-600 mt-2">
                {finalPercentage}%
              </p>

              <p className="text-slate-600 mt-2">
                {score} / {questions.length}{" "}
                correct
              </p>
            </div>

            {/* ADAPTIVE LEVEL */}
            <div className="mt-6 p-5 rounded-xl bg-slate-50">

              {level === "revision" && (
                <>
                  <h2 className="text-xl font-bold text-orange-600">
                    🔄 Revision Mode
                  </h2>

                  <p className="text-slate-600 mt-2">
                    Focus on foundation concepts
                    and revise important topics.
                  </p>
                </>
              )}

              {level === "normal" && (
                <>
                  <h2 className="text-xl font-bold text-blue-600">
                    📚 Standard Learning Mode
                  </h2>

                  <p className="text-slate-600 mt-2">
                    Continue following your
                    standard learning roadmap.
                  </p>
                </>
              )}

              {level === "advanced" && (
                <>
                  <h2 className="text-xl font-bold text-green-600">
                    🚀 Advanced Learning Mode
                  </h2>

                  <p className="text-slate-600 mt-2">
                    Excellent! You can move toward
                    advanced topics.
                  </p>
                </>
              )}

            </div>

            {/* BUTTONS */}
            <div className="flex flex-col gap-3 mt-6">

              <button
                type="button"
                onClick={() =>
                  navigate("/roadmap")
                }
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                🚀 View Adaptive Roadmap
              </button>

              <button
                type="button"
                onClick={handleRetry}
                className="w-full bg-slate-200 text-slate-800 py-3 rounded-xl font-semibold hover:bg-slate-300 transition"
              >
                🔄 Retake Quiz
              </button>

            </div>

          </div>
        </div>
      </>
    );
  }

  // ---------------------------------------------
  // QUIZ SCREEN
  // ---------------------------------------------

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 p-6">

        <div className="max-w-3xl mx-auto">

          {/* HEADER */}
          <div className="mb-6">

            <h1 className="text-3xl font-bold text-slate-900">
              🧠 Knowledge Validation
            </h1>

            <p className="text-slate-600 mt-2">
              Test your knowledge and help
              ProPath AI adapt your roadmap.
            </p>

          </div>

          {/* PROGRESS */}
          <div className="bg-white rounded-2xl shadow-md p-5 mb-6">

            <div className="flex justify-between mb-2">

              <span className="text-sm font-medium text-slate-600">
                Question{" "}
                {currentQuestion + 1} of{" "}
                {questions.length}
              </span>

              <span className="text-sm font-medium text-blue-600">
                {Math.round(
                  ((currentQuestion + 1) /
                    questions.length) *
                    100
                )}
                %
              </span>

            </div>

            <div className="w-full bg-slate-200 rounded-full h-2">

              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{
                  width: `${
                    ((currentQuestion + 1) /
                      questions.length) *
                    100
                  }%`,
                }}
              />

            </div>

          </div>

          {/* QUESTION */}
          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-xl font-bold text-slate-800 mb-6">
              {question.question}
            </h2>

            {/* OPTIONS */}
            <div className="space-y-3">

              {question.options.map(
                (option) => {

                  const selected =
                    selectedAnswer === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setSelectedAnswer(
                          option
                        )
                      }
                      className={`w-full text-left p-4 rounded-xl border-2 transition ${
                        selected
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">

                        <span
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selected
                              ? "border-blue-600"
                              : "border-slate-400"
                          }`}
                        >
                          {selected && (
                            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                          )}
                        </span>

                        <span className="font-medium">
                          {option}
                        </span>

                      </div>
                    </button>
                  );
                }
              )}

            </div>

            {/* NEXT BUTTON */}
            <button
              type="button"
              onClick={handleNext}
              className="w-full mt-6 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              {currentQuestion ===
              questions.length - 1
                ? "Finish Validation"
                : "Next Question →"}
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default KnowledgeValidation;