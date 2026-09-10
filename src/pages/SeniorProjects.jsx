import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function SeniorProjects() {
  const navigate = useNavigate();

  const projects = [
    {
      title: "AI-Based Student Performance Prediction",
      domain: "Artificial Intelligence",
      description:
        "Machine learning system that predicts student academic performance using historical academic data.",
      technologies: "Python, Pandas, Scikit-learn, Flask",
      skills: "Machine Learning, Data Analysis, Python",
      github: "https://github.com/"
    },
    {
      title: "Sales Analytics Dashboard",
      domain: "Data Analytics",
      description:
        "Interactive dashboard for analyzing sales, revenue, customer trends and business performance.",
      technologies: "Python, SQL, Power BI, Excel",
      skills: "SQL, Data Visualization, Business Analytics",
      github: "https://github.com/"
    },
    {
      title: "Smart Healthcare Prediction System",
      domain: "Machine Learning",
      description:
        "ML-based application that analyzes healthcare data and predicts possible health outcomes.",
      technologies: "Python, NumPy, Pandas, Scikit-learn",
      skills: "Machine Learning, Data Processing, Classification",
      github: "https://github.com/"
    },
    {
      title: "College Management System",
      domain: "Full Stack Development",
      description:
        "Web application for managing students, courses, attendance and academic information.",
      technologies: "React, Node.js, Express, MongoDB",
      skills: "React, REST API, MongoDB, Web Development",
      github: "https://github.com/"
    },
    {
      title: "Sentiment Analysis Application",
      domain: "NLP",
      description:
        "Natural language processing application that classifies text into positive, negative and neutral sentiment.",
      technologies: "Python, NLP, NLTK, Scikit-learn",
      skills: "NLP, Text Processing, Machine Learning",
      github: "https://github.com/"
    },
    {
      title: "Face Recognition Attendance System",
      domain: "Computer Vision",
      description:
        "Computer vision application that automatically records attendance using face recognition.",
      technologies: "Python, OpenCV, TensorFlow",
      skills: "Computer Vision, Deep Learning, Python",
      github: "https://github.com/"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-slate-900">
            🧑‍💻 Senior Project Hub
          </h1>

          <p className="text-slate-600 mt-2">
            Explore projects created by senior students and get
            inspiration for your own projects.
          </p>

        </div>


        {/* INFO */}

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">

          <h2 className="text-xl font-bold text-blue-900">
            💡 Learn From Senior Projects
          </h2>

          <p className="text-blue-800 mt-2">
            Explore project ideas, technologies and skills used by
            senior students. Use these projects as inspiration while
            building your own practical skills.
          </p>

        </div>


        {/* PROJECTS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {projects.map((project, index) => (

            <div
              key={index}
              className="bg-white border rounded-2xl shadow-sm p-6 hover:shadow-md transition"
            >

              <div className="flex items-center justify-between mb-4">

                <span className="text-3xl">
                  🧑‍💻
                </span>

                <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {project.domain}
                </span>

              </div>


              <h2 className="text-xl font-bold text-slate-900">
                {project.title}
              </h2>


              <p className="text-slate-600 mt-3 text-sm leading-6">
                {project.description}
              </p>


              <div className="mt-5">

                <p className="text-sm font-semibold text-slate-700">
                  🛠️ Technologies
                </p>

                <p className="text-sm text-slate-600 mt-1">
                  {project.technologies}
                </p>

              </div>


              <div className="mt-4">

                <p className="text-sm font-semibold text-slate-700">
                  🎯 Skills
                </p>

                <p className="text-sm text-slate-600 mt-1">
                  {project.skills}
                </p>

              </div>


              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="block text-center mt-6 bg-slate-900 text-white py-2.5 rounded-lg font-semibold hover:bg-slate-800"
              >
                🔗 View GitHub
              </a>

            </div>

          ))}

        </div>


        {/* BOTTOM ACTIONS */}

        <div className="flex flex-wrap gap-4 mt-8">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800"
          >
            ← Dashboard
          </button>

          <button
            onClick={() => navigate("/project-validation")}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600"
          >
            🛠️ Validate My Project →
          </button>

        </div>

      </main>

    </div>
  );
}

export default SeniorProjects;