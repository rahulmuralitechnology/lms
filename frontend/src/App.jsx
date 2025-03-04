import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import RegisterTeacher from "./pages/RegisterTeacher";
import Dashboard from "./pages/Dashboard";
import StudentOnboard from "./pages/StudentOnboard";
import ParentOnboard from "./pages/ParentOnboard";
import Assignments from "./pages/Assignments";
import Quizzes from "./pages/Quizzes";
import CreateAssignment from "./pages/CreateAssignment";
import CreateQuiz from "./pages/CreateQuiz";
import TakeQuiz from "./pages/TakeQuiz";
import useAuthStore from "./store/authStore";

function App() {
  const user = useAuthStore();
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={user.user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register-teacher" element={<RegisterTeacher />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={user.user ? <Dashboard /> : <Navigate to="/" />} />

        {/* Teacher Routes */}
        <Route path="/onboard-student" element={user.user?.role === "teacher" ? <StudentOnboard /> : <Navigate to="/dashboard" />} />
        <Route path="/onboard-parent" element={user.user?.role === "teacher" ? <ParentOnboard /> : <Navigate to="/dashboard" />} />
        <Route path="/create-assignment" element={user.user?.role === "teacher" ? <CreateAssignment /> : <Navigate to="/dashboard" />} />
        <Route path="/create-quiz" element={user.user?.role === "teacher" ? <CreateQuiz /> : <Navigate to="/dashboard" />} />

        {/* Student Routes */}
        <Route path="/assignments" element={user.user?.role === "student" ? <Assignments /> : <Navigate to="/dashboard" />} />
        <Route path="/quizzes" element={user.user?.role === "student" ? <Quizzes /> : <Navigate to="/dashboard" />} />
        <Route path="/take-quiz/:quizId" element={user.user?.role === "student" ? <TakeQuiz /> : <Navigate to="/dashboard" />} />

        {/* Parent Routes */}
        <Route path="/assignments" element={user.user?.role === "parent" ? <Assignments /> : <Navigate to="/dashboard" />} />
        <Route path="/quizzes" element={user.user?.role === "parent" ? <Quizzes /> : <Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
