import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const navItems = [
        {
            name: "Dashboard",
            path: "/dashboard"
        },
        {
            name: "Project Upload",
            path: "/project-upload"
        },
        {
            name: "Profile",
            path: "/profile"
        },
        {
            name: "Job Validation",
            path: "/job-validation"
        }
    ];

    return (
        <nav className="bg-slate-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4">

                <div className="flex flex-wrap items-center justify-between gap-4">

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="text-xl font-bold"
                    >
                        🚀 ProPath AI
                    </button>

                    <div className="flex flex-wrap items-center gap-2">

                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                type="button"
                                onClick={() => navigate(item.path)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                                    location.pathname === item.path
                                        ? "bg-blue-600 text-white"
                                        : "text-slate-200 hover:bg-slate-700"
                                }`}
                            >
                                {item.name}
                            </button>
                        ))}

                        <button
                            type="button"
                            onClick={logout}
                            className="px-3 py-2 rounded-lg text-sm font-semibold bg-red-500 hover:bg-red-600"
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;