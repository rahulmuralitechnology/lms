import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentOnboard.css";

const StudentOnboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    teacher: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    const token = localStorage.getItem("token");
    const requestData = {
      user: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      },
      teacher: formData.teacher,
    };
  
    try {
      const response = await fetch("http://localhost:8000/api/users/create-student/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
      if (!response.ok) {
        if (typeof data === "object") {
          // Display field-specific errors
          const errors = Object.values(data).flat().join(" ");
          throw new Error(errors || "Onboarding failed.");
        }
        throw new Error(data.detail || "Onboarding failed.");
      }
  
      setSuccess("Student onboarded successfully!");
      setFormData({ username: "", email: "", password: "", teacher: "" });
  
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="student-onboard-container">
      <div className="student-onboard-box">
        <h2 className="student-onboard-title">Onboard Student</h2>
        {error && <p className="student-onboard-error">{error}</p>}
        {success && <p className="student-onboard-success">{success}</p>}
        <form className="student-onboard-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username (Optional)"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password (Min 6 chars)"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="teacher"
            placeholder="Teacher ID"
            value={formData.teacher}
            onChange={handleChange}
            required
          />
          <button type="submit" className="student-onboard-button" disabled={loading}>
            {loading ? "Onboarding..." : "Onboard Student"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentOnboard;
