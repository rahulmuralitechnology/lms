import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Assignments.css"; // Import the CSS file

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/assignments/")
      .then((res) => res.json())
      .then((data) => setAssignments(data));
  }, []);

  return (
    <div className="assignments-container">
      <h2 className="assignments-title">Assignments</h2>
      {assignments.map((assignment) => (
        <div key={assignment.id} className="assignment-card">
          <h3 className="assignment-title">{assignment.title}</h3>
          <p className="assignment-description">{assignment.description}</p>
          <p className="assignment-due">
            Due: {new Date(assignment.due_date).toLocaleString()}
          </p>
        </div>
      ))}
      <Link to="/create-assignment" className="create-assignment-link">
        Create Assignment
      </Link>
    </div>
  );
};

export default Assignments;
