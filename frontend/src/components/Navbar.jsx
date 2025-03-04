import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  const user = useAuthStore();

  return (
    <nav className="navbar">
      <h1 className="navbar-title">
        <Link to="/">EduApp</Link>
      </h1>
      <ul className="navbar-menu">
        {user.user ? (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

            {/* Teacher Options */}
            {user.user.role === "teacher" && (
              <>
                <li>
                  <Link to="/onboard-student">Onboard Student</Link>
                </li>
                <li>
                  <Link to="/onboard-parent">Onboard Parent</Link>
                </li>
                <li>
                  <Link to="/create-assignment">Create Assignment</Link>
                </li>
                <li>
                  <Link to="/create-quiz">Create Quiz</Link>
                </li>
              </>
            )}

            {/* Student Options */}
            {user.user.role === "student" && (
              <>
                <li>
                  <Link to="/assignments">Take Assignment</Link>
                </li>
                <li>
                  <Link to="/quizzes">Take Quiz</Link>
                </li>
              </>
            )}

            {/* Parent Options */}
            {user.user.role === "parent" && (
              <>
                <li>
                  <Link to="/assignments">Monitor Assignments</Link>
                </li>
                <li>
                  <Link to="/quizzes">Monitor Quizzes</Link>
                </li>
              </>
            )}

            <li>
              <button
                onClick={() => useAuthStore.setState(null)}
                className="navbar-button"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register-teacher">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
