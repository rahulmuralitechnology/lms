import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import "./Dashboard.css"; // Import the CSS file

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {user.username}!</h1>
      <p className="dashboard-text">Role:</p>
      <span
        className={`dashboard-role ${
          user.role === "teacher"
            ? "teacher-role"
            : user.role === "student"
            ? "student-role"
            : "parent-role"
        }`}
      >
        {user.role}
      </span>

      {user.role === "teacher" && <p className="dashboard-text">Access your teacher dashboard here.</p>}
      {user.role === "student" && <p className="dashboard-text">View your student assignments here.</p>}
      {user.role === "parent" && <p className="dashboard-text">Monitor your child's progress here.</p>}

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }}
        className="logout-button"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
