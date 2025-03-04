import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAssignment.css"; // Import the CSS file

const CreateAssignment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://127.0.0.1:8000/api/assignments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, due_date: dueDate, teacher: 1 }), // Change teacher ID dynamically
    });

    navigate("/assignments");
  };

  return (
    <div className="create-assignment-container">
      <h2 className="create-assignment-title">Create Assignment</h2>
      <form className="create-assignment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="create-assignment-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="create-assignment-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          className="create-assignment-date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button type="submit" className="create-assignment-button">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;
