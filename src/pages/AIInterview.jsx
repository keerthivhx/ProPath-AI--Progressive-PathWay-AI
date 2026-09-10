import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const questions = [
    {
        question: "Tell me about yourself.",
        keywords: ["education", "skills", "project", "experience"]
    },
    {
        question: "What is the difference between supervised and unsupervised learning?",
        keywords: ["supervised", "labeled", "unsupervised", "unlabeled"]
    },
    {
        question: "What is SQL and why is it useful?",
        keywords: ["database", "query", "data", "sql"]
    },
    {
        question: "Explain one technical project you have worked on.",
        keywords: ["project", "technology", "built", "result"]
    },
    {
        question: "Why should we hire you?",
        keywords: ["skills", "learn", "team", "contribute"]
    }
];

function AIInterview() {
    const navigate = useNavigate();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState("");
    const [answers, setAnswers] = useState([]);
    const [finished, setFinished] = useState(false);
    const [percentage, setPercentage] = useState(0);

    const question = questions[currentQuestion];

    const evaluateAnswer = (text, keywords) => {
        const lowerText = text.toLowerCase();

        const matched = keywords.filter((keyword) =>
            lowerText.includes(keyword.toLowerCase())
        );

        return matched.length;
    };

    const handleNext = () => {
        if (!answer.trim()) {
            alert("Please enter your answer.");
            return;
        }

        const newAnswers = [
            ...answers,
            answer
        ];

        setAnswers(newAnswers);

        if (currentQuestion === questions.length - 1) {

            let totalScore = 0;

            newAnswers.forEach((userAnswer, index) => {
                totalScore += evaluateAnswer(
                    userAnswer,
                    questions[index].keywords
                );
            });

            const maxScore = questions.reduce(
                (total, item) =>
                    total + item.keywords.length,
                0
            );

            const finalPercentage = Math.min(
                100,
                Math.round(
                    (totalScore / maxScore) * 100
                )
            );

            localStorage.setItem(
                "interviewResult",
                JSON.stringify({
                    percentage: finalPercentage,
                    totalQuestions: questions.length,
                    completed: true,
                    answers: newAnswers
                })
            );

            setPercentage(finalPercentage);
            setFinished(true);

        } else {
            setCurrentQuestion(
                currentQuestion + 1
            );
            setAnswer("");
        }
    };

    const retry = () => {
        setCurrentQuestion(0);
        setAnswer("");
        setAnswers([]);
        setPercentage(0);
        setFinished(false);
    };

    if (finished) {
        return (
            <div className="min-h-screen bg-slate-100">

                <Navbar />

                <main className="max-w-3xl mx-auto px-4 py-10">

                    <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

                        <div className="text-6xl mb-4">
                            {percentage >= 80
                                ? "🎉"
                                : percentage >= 50
                                ? "👍"
                                : "📚"}
                        </div>

                        <h1 className="text-3xl font-bold text-slate-900">
                            AI Interview Complete
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Your interview responses have been evaluated.
                        </p>

                        <div className="my-8">

                            <p className="text-6xl font-bold text-indigo-600">
                                {percentage}%
                            </p>

                            <p className="text-slate-500 mt-2">
                                Interview Performance
                            </p>

                        </div>

                        <div className="bg-indigo-50 rounded-xl p-5 mb-8 text-left">

                            <h2 className="font-bold text-indigo-900 mb-2">
                                💡 Recommendation
                            </h2>

                            <p className="text-indigo-800">

                                {percentage >= 80
                                    ? "Excellent performance. You are ready for more advanced interview practice."
                                    : percentage >= 50
                                    ? "Good start. Review your technical concepts and practice explaining your projects."
                                    : "Keep practicing. Strengthen your technical fundamentals and interview communication."}

                            </p>

                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">

                            <button
                                onClick={retry}
                                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                            >
                                🔄 Retry Interview
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/dashboard")
                                }
                                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold"
                            >
                                ← Dashboard
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

                    <p className="text-indigo-600 font-semibold">
                        🎤 AI Interview
                    </p>

                    <h1 className="text-3xl font-bold text-slate-900 mt-2">
                        Practice Your Interview
                    </h1>

                    <p className="text-slate-500 mt-2 mb-8">
                        Answer the questions as if you are in a real interview.
                    </p>

                    <div className="flex justify-between text-sm text-slate-500 mb-3">

                        <span>
                            Question {currentQuestion + 1} of{" "}
                            {questions.length}
                        </span>

                        <span>
                            {Math.round(
                                ((currentQuestion + 1) /
                                    questions.length) *
                                    100
                            )}
                            %
                        </span>

                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-2 mb-8">

                        <div
                            className="bg-indigo-600 h-2 rounded-full transition-all"
                            style={{
                                width: `${
                                    ((currentQuestion + 1) /
                                        questions.length) *
                                        100
                                }%`
                            }}
                        />

                    </div>

                    <div className="bg-indigo-50 rounded-2xl p-6 mb-6">

                        <p className="text-sm text-indigo-600 font-semibold mb-2">
                            Interview Question
                        </p>

                        <h2 className="text-xl font-bold text-slate-900">
                            {question.question}
                        </h2>

                    </div>

                    <textarea
                        value={answer}
                        onChange={(e) =>
                            setAnswer(e.target.value)
                        }
                        placeholder="Type your answer here..."
                        rows="7"
                        className="w-full px-4 py-4 border border-slate-300 rounded-xl outline-none focus:border-indigo-500 resize-none"
                    />

                    <button
                        onClick={handleNext}
                        className="w-full mt-6 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                    >
                        {currentQuestion === questions.length - 1
                            ? "Finish Interview"
                            : "Next Question →"}
                    </button>

                </div>

            </main>

        </div>
    );
}

export default AIInterview;