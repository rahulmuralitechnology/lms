import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterTeacher.css"; // Import CSS file

const RegisterTeacher = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    teacherName: "",
    teacherEmail: "",
    subject: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8000/api/users/register-teacher/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Registration failed");

      setSuccess("Teacher registered successfully!");
      setFormData({ teacherName: "", teacherEmail: "", subject: "" });

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-teacher-container">
      <div className="register-teacher-box">
        <h2 className="register-teacher-title">Register Teacher</h2>
        {error && <p className="register-teacher-error">{error}</p>}
        {success && <p className="register-teacher-success">{success}</p>}
        <form className="register-teacher-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="teacherName"
            placeholder="Teacher Name"
            value={formData.teacherName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="teacherEmail"
            placeholder="Teacher Email"
            value={formData.teacherEmail}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <button type="submit" className="register-teacher-button">
            Register Teacher
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterTeacher;
