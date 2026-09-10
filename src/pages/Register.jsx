import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState("");
  const [careerGoal, setCareerGoal] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          branch,
          careerGoal
        }
      );

      alert("Registration successful!");

      navigate("/login");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center text-white mb-8">

          <div className="text-5xl mb-3">
            🚀
          </div>

          <h1 className="text-4xl font-bold">
            ProPath AI
          </h1>

          <p className="text-blue-200 mt-2">
            Start building your engineering career
          </p>

        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">

          <h2 className="text-2xl font-bold text-slate-800">
            Create Account 🎓
          </h2>

          <p className="text-slate-500 mt-1 mb-6">
            Create your personalized ProPath AI profile.
          </p>

          <form onSubmit={handleRegister}>

            {/* Name */}
            <div className="mb-4">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            {/* Email */}
            <div className="mb-4">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            {/* Password */}
            <div className="mb-4">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            {/* Branch */}
            <div className="mb-4">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Engineering Branch
              </label>

              <input
                type="text"
                placeholder="Example: AIML"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            {/* Career Goal */}
            <div className="mb-6">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Career Goal
              </label>

              <input
                type="text"
                placeholder="Example: Data Analyst"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            {/* Register */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              🚀 Create Account
            </button>

          </form>

          {/* Login */}
          <div className="text-center mt-6">

            <p className="text-slate-500">
              Already have an account?
            </p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold mt-1 hover:underline"
            >
              Login here
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;