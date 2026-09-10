import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { getAdaptiveLevel } from "../utils/adaptiveEngine";


const roadmapData = {
  "Data Analytics": {
    year1: [
      "Python Basics",
      "Programming Fundamentals",
      "Statistics Basics",
      "Mathematics for Data Science",
      "Git & GitHub",
      "SQL Basics",
      "Excel Fundamentals",
      "Data Types & Structures",
    ],
    year2: [
      "Advanced Python",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "SQL Queries",
      "Joins & Subqueries",
      "Power BI",
    ],
    year3: [
      "Advanced SQL",
      "Tableau",
      "Data Cleaning",
      "Exploratory Data Analysis",
      "Data Visualization",
      "Business Intelligence",
      "Statistics for Analytics",
      "Analytics Projects",
    ],
    year4: [
      "Advanced Power BI",
      "Advanced Tableau",
      "Real World Data Projects",
      "Portfolio Development",
      "Resume Preparation",
      "Interview Preparation",
      "Mock Interviews",
      "Placement Preparation",
    ],
  },

  "AI / Machine Learning": {
    year1: [
      "Python Basics",
      "Programming Fundamentals",
      "Mathematics",
      "Statistics",
      "Git & GitHub",
      "Data Structures",
      "Problem Solving",
      "Python Projects",
    ],
    year2: [
      "NumPy",
      "Pandas",
      "Data Visualization",
      "Machine Learning Basics",
      "Linear Regression",
      "Logistic Regression",
      "Decision Trees",
      "Model Evaluation",
    ],
    year3: [
      "Random Forest",
      "SVM",
      "KNN",
      "Clustering",
      "Feature Engineering",
      "Deep Learning",
      "Neural Networks",
      "ML Projects",
    ],
    year4: [
      "NLP",
      "Computer Vision",
      "Generative AI",
      "LLMs",
      "RAG",
      "AI Projects",
      "Portfolio Development",
      "AI Interview Preparation",
    ],
  },

  "Full Stack Development": {
    year1: [
      "Programming Fundamentals",
      "Python Basics",
      "JavaScript Basics",
      "HTML",
      "CSS",
      "Git & GitHub",
      "Problem Solving",
      "Basic Projects",
    ],
    year2: [
      "Advanced JavaScript",
      "React Basics",
      "React Components",
      "Node.js",
      "Express.js",
      "REST APIs",
      "MongoDB",
      "MySQL",
    ],
    year3: [
      "Advanced React",
      "Authentication",
      "JWT",
      "API Integration",
      "State Management",
      "Backend Architecture",
      "Full Stack Projects",
      "Deployment",
    ],
    year4: [
      "Cloud Deployment",
      "Docker",
      "System Design",
      "Testing",
      "Performance Optimization",
      "Portfolio Development",
      "Interview Preparation",
      "Placement Preparation",
    ],
  },

  "Cloud & DevOps": {
    year1: [
      "Programming Basics",
      "Linux Basics",
      "Git & GitHub",
      "Computer Networks",
      "Operating Systems",
      "Python Basics",
      "Shell Basics",
      "Problem Solving",
    ],
    year2: [
      "AWS Basics",
      "Cloud Computing",
      "EC2",
      "S3",
      "IAM",
      "Docker Basics",
      "CI/CD Basics",
      "Linux Administration",
    ],
    year3: [
      "Advanced Docker",
      "Kubernetes",
      "Jenkins",
      "GitHub Actions",
      "Terraform",
      "Cloud Security",
      "Monitoring",
      "DevOps Projects",
    ],
    year4: [
      "AWS Advanced",
      "Cloud Architecture",
      "Microservices",
      "Infrastructure as Code",
      "DevSecOps",
      "Cloud Projects",
      "Portfolio Development",
      "Interview Preparation",
    ],
  },
};


function Roadmap() {
  const navigate = useNavigate();

  const [recommendedDomain, setRecommendedDomain] = useState(
    localStorage.getItem("recommendedDomain") || "Data Analytics"
  );

  const [completedTopics, setCompletedTopics] = useState([]);

  const [loading, setLoading] = useState(true);

  const [adaptiveLevel, setAdaptiveLevel] = useState(
    localStorage.getItem("adaptiveLevel") || "normal"
  );

  const [adaptiveScore, setAdaptiveScore] = useState(0);

  const token = localStorage.getItem("token");

  const selectedRoadmap =
    roadmapData[recommendedDomain] ||
    roadmapData["Data Analytics"];

  const allTopics = [
    ...selectedRoadmap.year1,
    ...selectedRoadmap.year2,
    ...selectedRoadmap.year3,
    ...selectedRoadmap.year4,
  ];


  // --------------------------------------------------
  // LOAD ROADMAP
  // --------------------------------------------------

  const loadRoadmap = async () => {
    const currentToken = localStorage.getItem("token");

    // If user is not logged in, use localStorage
    if (!currentToken) {
      const saved = JSON.parse(
        localStorage.getItem("roadmapProgress") || "null"
      );

      if (saved) {
        setRecommendedDomain(
          saved.domain || "Data Analytics"
        );

        setCompletedTopics(
          Array.isArray(saved.completedTopics)
            ? saved.completedTopics
            : []
        );
      }

      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/api/roadmap",
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
          timeout: 5000,
        }
      );

      const data = response.data;

      const domain =
        data.domain || "Data Analytics";

      const topics =
        Array.isArray(data.completedTopics)
          ? data.completedTopics
          : [];

      setRecommendedDomain(domain);
      setCompletedTopics(topics);

      localStorage.setItem(
        "roadmapProgress",
        JSON.stringify({
          domain,
          completedTopics: topics,
        })
      );
    } catch (error) {
      console.error(
        "ROADMAP API ERROR:",
        error
      );

      // Backend unavailable → use localStorage
      const saved = JSON.parse(
        localStorage.getItem("roadmapProgress") || "null"
      );

      if (saved) {
        setRecommendedDomain(
          saved.domain || "Data Analytics"
        );

        setCompletedTopics(
          Array.isArray(saved.completedTopics)
            ? saved.completedTopics
            : []
        );
      }
    } finally {
      setLoading(false);
    }
  };


  // --------------------------------------------------
  // LOAD PAGE
  // --------------------------------------------------

  useEffect(() => {
    const startPage = async () => {
      try {
        await loadRoadmap();
      } catch (error) {
        console.error(
          "ROADMAP PAGE ERROR:",
          error
        );

        setLoading(false);
      }
    };

    startPage();
  }, []);


  // --------------------------------------------------
  // ADAPTIVE SCORE
  // --------------------------------------------------

  useEffect(() => {
    const adaptive = getAdaptiveLevel();

    setAdaptiveScore(adaptive.score);
    setAdaptiveLevel(adaptive.level);
  }, [completedTopics, recommendedDomain]);


  // --------------------------------------------------
  // TOGGLE TOPIC
  // --------------------------------------------------

  const toggleTopic = async (topic) => {
    let updatedTopics;

    if (completedTopics.includes(topic)) {
      updatedTopics = completedTopics.filter(
        (item) => item !== topic
      );
    } else {
      updatedTopics = [
        ...completedTopics,
        topic,
      ];
    }

    setCompletedTopics(updatedTopics);

    const progressData = {
      domain: recommendedDomain,
      completedTopics: updatedTopics,
    };

    localStorage.setItem(
      "roadmapProgress",
      JSON.stringify(progressData)
    );

    // Save to backend if logged in
    if (token) {
      try {
        await axios.put(
          "http://localhost:5000/api/roadmap",
          progressData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error(
          "ROADMAP SAVE ERROR:",
          error
        );
      }
    }
  };


  // --------------------------------------------------
  // YEAR PROGRESS
  // --------------------------------------------------

  const getYearProgress = (topics) => {
    if (!topics.length) return 0;

    const completed = topics.filter(
      (topic) =>
        completedTopics.includes(topic)
    ).length;

    return Math.round(
      (completed / topics.length) * 100
    );
  };


  // --------------------------------------------------
  // ADAPTIVE RECOMMENDED TOPICS
  // --------------------------------------------------

  const getRecommendedTopics = () => {
    const incompleteTopics = allTopics.filter(
      (topic) =>
        !completedTopics.includes(topic)
    );

    if (incompleteTopics.length === 0) {
      return [];
    }

    // Revision → foundation / next incomplete topics
    if (adaptiveLevel === "revision") {
      return incompleteTopics.slice(0, 5);
    }

    // Advanced → later / advanced topics
    if (adaptiveLevel === "advanced") {
      return incompleteTopics.slice(-5);
    }

    // Normal → standard next topics
    return incompleteTopics.slice(0, 5);
  };


  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-slate-600">
            Loading your roadmap...
          </p>
        </div>
      </>
    );
  }


  // --------------------------------------------------
  // RENDER YEAR
  // --------------------------------------------------

  const renderYear = (
    year,
    title,
    topics
  ) => {
    const progress =
      getYearProgress(topics);

    return (
      <div
        key={year}
        className="bg-white rounded-2xl shadow-md p-6 mb-6"
      >

        <div className="flex justify-between items-center mb-3">

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {title}
            </h2>

            <p className="text-sm text-slate-500">
              {
                topics.filter((topic) =>
                  completedTopics.includes(topic)
                ).length
              }{" "}
              / {topics.length} completed
            </p>
          </div>

          <span className="font-bold text-blue-600">
            {progress}%
          </span>

        </div>


        <div className="w-full bg-slate-200 rounded-full h-2 mb-5">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {topics.map((topic) => {
            const completed =
              completedTopics.includes(topic);

            return (
              <button
                key={topic}
                type="button"
                onClick={() =>
                  toggleTopic(topic)
                }
                className={`text-left p-4 rounded-xl border transition ${
                  completed
                    ? "bg-green-50 border-green-300 text-green-700"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-400"
                }`}
              >

                <div className="flex items-center gap-3">

                  <span className="text-xl">
                    {completed
                      ? "✅"
                      : "⬜"}
                  </span>

                  <span className="font-medium">
                    {topic}
                  </span>

                </div>

              </button>
            );
          })}

        </div>

      </div>
    );
  };


  const recommendedTopics =
    getRecommendedTopics();


  // --------------------------------------------------
  // MAIN UI
  // --------------------------------------------------

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 p-6">

        <div className="max-w-6xl mx-auto">

          {/* HEADER */}

          <div className="mb-6">

            <h1 className="text-3xl font-bold text-slate-900">
              🚀 4-Year Adaptive Roadmap
            </h1>

            <p className="text-slate-600 mt-2">
              Career Domain:{" "}
              <span className="font-semibold text-blue-600">
                {recommendedDomain}
              </span>
            </p>

          </div>


          {/* ADAPTIVE SCORE */}

          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  🧠 Adaptive Score
                </h2>

                <p className="text-slate-500 mt-1">
                  Based on knowledge validation,
                  project validation and roadmap
                  progress.
                </p>

              </div>

              <div className="text-4xl font-bold text-blue-600">
                {adaptiveScore}%
              </div>

            </div>

          </div>


          {/* ADAPTIVE LEARNING */}

          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

            {adaptiveLevel === "revision" && (
              <>
                <h2 className="text-xl font-bold text-orange-600">
                  🔄 Revision Mode
                </h2>

                <p className="text-slate-600 mt-2">
                  Your current score suggests
                  focusing on foundation concepts
                  and revising incomplete topics.
                </p>
              </>
            )}


            {adaptiveLevel === "normal" && (
              <>
                <h2 className="text-xl font-bold text-blue-600">
                  📚 Standard Learning Mode
                </h2>

                <p className="text-slate-600 mt-2">
                  Continue following your
                  personalized roadmap at the
                  standard learning pace.
                </p>
              </>
            )}


            {adaptiveLevel === "advanced" && (
              <>
                <h2 className="text-xl font-bold text-green-600">
                  🚀 Advanced Learning Mode
                </h2>

                <p className="text-slate-600 mt-2">
                  Great progress! You can move
                  toward advanced and later-stage
                  topics.
                </p>
              </>
            )}

          </div>


          {/* RECOMMENDED TOPICS */}

          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

            <h2 className="text-xl font-bold text-slate-800">
              🎯 Recommended Topics
            </h2>

            <p className="text-slate-500 mt-1 mb-4">
              Topics recommended based on your
              current adaptive level.
            </p>


            {recommendedTopics.length === 0 ? (

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700">
                🎉 You have completed all
                roadmap topics!
              </div>

            ) : (

              <div className="space-y-3">

                {recommendedTopics.map(
                  (topic, index) => (
                    <div
                      key={topic}
                      className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200"
                    >

                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold">
                        {index + 1}
                      </span>

                      <span className="font-medium text-slate-700">
                        {topic}
                      </span>

                    </div>
                  )
                )}

              </div>

            )}

          </div>


          {/* ROADMAP */}

          {renderYear(
            1,
            "Year 1 — Foundation",
            selectedRoadmap.year1
          )}

          {renderYear(
            2,
            "Year 2 — Core Skills",
            selectedRoadmap.year2
          )}

          {renderYear(
            3,
            "Year 3 — Advanced Skills",
            selectedRoadmap.year3
          )}

          {renderYear(
            4,
            "Year 4 — Career Preparation",
            selectedRoadmap.year4
          )}


          {/* ACTION BUTTONS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pb-8">

            <button
              type="button"
              onClick={() =>
                navigate("/knowledge-validation")
              }
              className="bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              🧠 Knowledge Validation
            </button>


            <button
              type="button"
              onClick={() =>
                navigate("/project-validation")
              }
              className="bg-purple-600 text-white py-4 rounded-xl font-semibold hover:bg-purple-700 transition"
            >
              🛠️ Project Validation
            </button>


            <button
              type="button"
              onClick={() =>
                navigate("/dashboard")
              }
              className="bg-slate-800 text-white py-4 rounded-xl font-semibold hover:bg-slate-900 transition"
            >
              📊 Dashboard
            </button>

          </div>

        </div>

      </div>
    </>
  );
}


export default Roadmap;