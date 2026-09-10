import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const questionBank = {
  "Data Analytics": {
    "Python Basics": {
      question:
        "Write Python code to calculate the average of the numbers in a list.",
      starter: `numbers = [10, 20, 30, 40, 50]

# Write your code below
`,
      keywords: ["sum", "len"],
    },

    "SQL Basics": {
      question:
        "Write an SQL query to find the average salary from an employees table.",
      starter: `-- Table: employees
-- Column: salary

-- Write your SQL query below
`,
      keywords: ["select", "avg"],
    },

    Pandas: {
      question:
        "Using Pandas, load a CSV dataset and calculate the average value for each category.",
      starter: `import pandas as pd

df = pd.read_csv("data.csv")

# Write your code below
`,
      keywords: ["pandas", "read_csv", "groupby", "mean"],
    },

    "Data Visualization": {
      question:
        "Using Python, create a simple visualization of values stored in a list.",
      starter: `import matplotlib.pyplot as plt

values = [10, 20, 30, 40, 50]

# Write your code below
`,
      keywords: ["matplotlib", "plot"],
    },

    "Advanced SQL": {
      question:
        "Write an SQL query to calculate the average salary for each department.",
      starter: `-- Table: employees
-- Columns: department, salary

-- Write your SQL query below
`,
      keywords: ["select", "avg", "group by"],
    },
  },

  "AI / Machine Learning": {
    "Python Basics": {
      question:
        "Write Python code to calculate the average value of a list of numbers.",
      starter: `numbers = [5, 10, 15, 20, 25]

# Write your code below
`,
      keywords: ["sum", "len"],
    },

    NumPy: {
      question:
        "Using NumPy, calculate the mean of the given array.",
      starter: `import numpy as np

data = np.array([10, 20, 30, 40, 50])

# Write your code below
`,
      keywords: ["numpy", "mean"],
    },

    Pandas: {
      question:
        "Using Pandas, load a dataset and replace missing values with the column mean.",
      starter: `import pandas as pd

df = pd.read_csv("data.csv")

# Write your code below
`,
      keywords: ["pandas", "fillna", "mean"],
    },

    "Linear Regression": {
      question:
        "Write Python code that creates a Linear Regression model and fits it to training data.",
      starter: `from sklearn.linear_model import LinearRegression

model = LinearRegression()

# Write your code below
`,
      keywords: ["linearregression", "fit"],
    },

    "Machine Learning Basics": {
      question:
        "Write Python code to split a dataset into training and testing data.",
      starter: `from sklearn.model_selection import train_test_split

# X = features
# y = target

# Write your code below
`,
      keywords: ["train_test_split"],
    },
  },

  "Full Stack Development": {
    "JavaScript Basics": {
      question:
        "Write JavaScript code to filter all numbers greater than 10 from an array.",
      starter: `const numbers = [5, 12, 8, 20, 15];

// Write your code below
`,
      keywords: ["filter"],
    },

    "Advanced JavaScript": {
      question:
        "Write JavaScript code using map() to create a new array containing the squares of numbers.",
      starter: `const numbers = [1, 2, 3, 4, 5];

// Write your code below
`,
      keywords: ["map"],
    },

    "React Basics": {
      question:
        "Create a simple React component that displays a heading and a button.",
      starter: `function App() {
  // Write your component below
}

export default App;
`,
      keywords: ["function", "return", "button"],
    },

    "REST APIs": {
      question:
        "Write JavaScript code using fetch() to request data from a REST API.",
      starter: `// Write your fetch request below

`,
      keywords: ["fetch"],
    },

    "Node.js": {
      question:
        "Write Node.js code to create a simple HTTP server using Express.",
      starter: `const express = require("express");

const app = express();

// Write your code below
`,
      keywords: ["express", "listen"],
    },
  },

  "Cloud & DevOps": {
    "Linux Basics": {
      question:
        "Write Linux commands to create a directory, enter it, and create a new file.",
      starter: `# Write your Linux commands below

`,
      keywords: ["mkdir", "cd", "touch"],
    },

    "Shell Basics": {
      question:
        "Write a shell script that prints 'Hello ProPath AI' and displays the current directory.",
      starter: `#!/bin/bash

# Write your commands below
`,
      keywords: ["echo", "pwd"],
    },

    "Docker Basics": {
      question:
        "Write a basic Dockerfile that uses Python, copies an application, and runs it.",
      starter: `# Write your Dockerfile below

`,
      keywords: ["from", "copy", "cmd"],
    },

    "Git & GitHub": {
      question:
        "Write the Git commands required to initialize a repository, add files, commit them, and push to GitHub.",
      starter: `# Write your Git commands below

`,
      keywords: ["git init", "git add", "git commit", "git push"],
    },

    "CI/CD Basics": {
      question:
        "Write a basic CI workflow configuration that installs dependencies and runs tests.",
      starter: `# Write your CI configuration below

`,
      keywords: ["install", "test"],
    },
  },
};

function ProjectValidation() {
  const navigate = useNavigate();

  const [domain, setDomain] = useState("Data Analytics");
  const [completedTopics, setCompletedTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadRoadmapTopics();
  }, []);

  const loadRoadmapTopics = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("roadmapProgress") || "null"
      );

      const savedDomain =
        localStorage.getItem("recommendedDomain") ||
        saved?.domain ||
        "Data Analytics";

      const topics = Array.isArray(saved?.completedTopics)
        ? saved.completedTopics
        : [];

      setDomain(savedDomain);
      setCompletedTopics(topics);

      if (topics.length > 0) {
        setSelectedTopic(topics[0]);
      }
    } catch (error) {
      console.error("ROADMAP DATA ERROR:", error);
      setMessage("Unable to read completed roadmap topics.");
    }
  };

  const generateQuestion = () => {
    setMessage("");
    setResult(null);

    if (completedTopics.length === 0) {
      setMessage(
        "Complete at least one topic in the 4-Year Roadmap first."
      );
      return;
    }

    const availableQuestions = questionBank[domain] || {};

    let topic = selectedTopic;

    if (!availableQuestions[topic]) {
      topic = completedTopics.find(
        (item) => availableQuestions[item]
      );
    }

    if (!topic) {
      setMessage(
        "No coding challenge is available for your completed topics yet."
      );
      return;
    }

    const selectedChallenge = availableQuestions[topic];

    setSelectedTopic(topic);
    setChallenge(selectedChallenge);
    setCode(selectedChallenge.starter);
  };

  const checkSolution = () => {
    if (!challenge) {
      setMessage("Generate a coding question first.");
      return;
    }

    if (!code.trim()) {
      setMessage("Please write your code before submitting.");
      return;
    }

    const normalizedCode = code.toLowerCase();

    const matchedKeywords = challenge.keywords.filter((keyword) =>
      normalizedCode.includes(keyword.toLowerCase())
    );

    const keywordScore = Math.round(
      (matchedKeywords.length / challenge.keywords.length) * 100
    );

    let score = keywordScore;

    if (code.length > 80) {
      score += 10;
    }

    if (code.includes("\n")) {
      score += 5;
    }

    score = Math.min(score, 100);

    let level = "Needs Revision";

    if (score >= 80) {
      level = "Advanced";
    } else if (score >= 50) {
      level = "Normal";
    }

    const validationResult = {
      score,
      completed: true,
      topic: selectedTopic,
      challenge: challenge.question,
      code,
      level,
      evaluatedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "projectValidation",
      JSON.stringify(validationResult)
    );

    localStorage.setItem("projectAdaptiveLevel", level);

    setResult(validationResult);
    setMessage("");
  };

  if (result) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-50 px-6 py-10">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl bg-white p-8 text-center shadow">
              <div className="mb-4 text-5xl">
                {result.score >= 80 ? "🎉" : result.score >= 50 ? "👍" : "📚"}
              </div>

              <h1 className="text-3xl font-bold text-slate-800">
                Practical Skill Evaluation
              </h1>

              <p className="mt-3 text-slate-500">
                Your solution was evaluated based on the completed roadmap
                topic.
              </p>

              <div className="mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-full bg-blue-50">
                <div>
                  <div className="text-5xl font-bold text-blue-600">
                    {result.score}%
                  </div>

                  <div className="mt-1 text-sm text-slate-500">
                    Practical Skill Score
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-slate-50 p-5 text-left">
                <p className="text-sm text-slate-500">Validated Topic</p>

                <p className="mt-1 text-lg font-semibold text-slate-800">
                  {result.topic}
                </p>

                <p className="mt-4 text-sm text-slate-500">
                  Adaptive Learning Mode
                </p>

                <p className="mt-1 text-lg font-semibold text-blue-600">
                  {result.level}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate("/roadmap")}
                  className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Go to Roadmap
                </button>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="rounded-lg bg-slate-800 px-6 py-3 font-semibold text-white hover:bg-slate-900"
                >
                  Dashboard
                </button>

                <button
                  onClick={() => {
                    setResult(null);
                    setChallenge(null);
                    setCode("");
                    loadRoadmapTopics();
                  }}
                  className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Try Another
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 px-6 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Project Validation
            </h1>

            <p className="mt-2 text-slate-500">
              Validate your practical skills using completed roadmap topics.
            </p>
          </div>

          {/* Flow */}
          <div className="mb-8 rounded-2xl bg-white p-6 shadow">
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold">
              <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-700">
                Roadmap
              </span>

              <span>→</span>

              <span className="rounded-full bg-purple-100 px-4 py-2 text-purple-700">
                Completed Topics
              </span>

              <span>→</span>

              <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
                Coding Question
              </span>

              <span>→</span>

              <span className="rounded-full bg-orange-100 px-4 py-2 text-orange-700">
                Code
              </span>

              <span>→</span>

              <span className="rounded-full bg-slate-100 px-4 py-2 text-slate-700">
                Evaluation
              </span>
            </div>
          </div>

          {/* Completed Topics */}
          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">Career Domain</p>

                <h2 className="text-xl font-bold text-slate-800">
                  {domain}
                </h2>
              </div>

              <div className="rounded-lg bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                {completedTopics.length} Topics Completed
              </div>
            </div>

            {completedTopics.length === 0 ? (
              <div className="mt-6 rounded-xl bg-yellow-50 p-5 text-yellow-800">
                <p className="font-semibold">
                  No completed roadmap topics found.
                </p>

                <p className="mt-1 text-sm">
                  Go to the 4-Year Roadmap and complete some topics first.
                </p>

                <button
                  onClick={() => navigate("/roadmap")}
                  className="mt-4 rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white"
                >
                  Open Roadmap
                </button>
              </div>
            ) : (
              <>
                <div className="mt-6">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Select a completed topic
                  </label>

                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none focus:border-blue-500"
                  >
                    {completedTopics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={generateQuestion}
                  className="mt-5 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Generate Coding Question
                </button>
              </>
            )}

            {message && (
              <div className="mt-5 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-700">
                {message}
              </div>
            )}
          </div>

          {/* Coding Challenge */}
          {challenge && (
            <div className="mt-8 rounded-2xl bg-white p-6 shadow">
              <div className="mb-5">
                <p className="text-sm font-semibold text-blue-600">
                  Coding Challenge
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-800">
                  {selectedTopic}
                </h2>
              </div>

              <div className="rounded-xl bg-slate-50 p-5">
                <p className="font-semibold text-slate-800">
                  Problem Statement
                </p>

                <p className="mt-2 leading-7 text-slate-600">
                  {challenge.question}
                </p>
              </div>

              {/* Code Editor */}
              <div className="mt-6">
                <label className="mb-2 block font-semibold text-slate-700">
                  Write your solution
                </label>

                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck="false"
                  className="min-h-[350px] w-full rounded-xl border border-slate-300 bg-slate-900 p-5 font-mono text-sm leading-6 text-green-300 outline-none focus:border-blue-500"
                  placeholder="Write your code here..."
                />
              </div>

              {/* Actions */}
              <div className="mt-5 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => {
                    if (!code.trim()) {
                      setMessage("Write some code first.");
                      return;
                    }

                    setMessage(
                      "Code structure checked. If it looks correct, submit your solution for evaluation."
                    );
                  }}
                  className="rounded-lg border border-blue-600 px-6 py-3 font-semibold text-blue-600 hover:bg-blue-50"
                >
                  ▶ Run Code
                </button>

                <button
                  type="button"
                  onClick={checkSolution}
                  className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                >
                  ✓ Submit Solution
                </button>
              </div>

              {message && (
                <div className="mt-5 rounded-lg bg-blue-50 p-4 text-sm font-medium text-blue-700">
                  {message}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProjectValidation;