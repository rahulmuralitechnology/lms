import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ParentOnboard.css"; // Import CSS file

const ParentOnboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    parentName: "",
    parentEmail: "",
    studentId: "",
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
      const response = await fetch("http://localhost:8000/api/users/onboard-parent/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Onboarding failed");

      setSuccess("Parent onboarded successfully!");
      setFormData({ parentName: "", parentEmail: "", studentId: "" });

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="parent-onboard-container">
      <div className="parent-onboard-box">
        <h2 className="parent-onboard-title">Onboard Parent</h2>
        {error && <p className="parent-onboard-error">{error}</p>}
        {success && <p className="parent-onboard-success">{success}</p>}
        <form className="parent-onboard-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="parentName"
            placeholder="Parent Name"
            value={formData.parentName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="parentEmail"
            placeholder="Parent Email"
            value={formData.parentEmail}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={formData.studentId}
            onChange={handleChange}
            required
          />
          <button type="submit" className="parent-onboard-button">
            Onboard Parent
          </button>
        </form>
      </div>
    </div>
  );
};

export default ParentOnboard;
