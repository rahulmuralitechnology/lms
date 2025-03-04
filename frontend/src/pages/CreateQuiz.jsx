import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateQuiz.css"; // Import the CSS file

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://127.0.0.1:8000/api/quizzes/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, teacher: 1 }), // Change dynamically
    });

    navigate("/quizzes");
  };

  return (
    <div className="create-quiz-container">
      <h2 className="create-quiz-title">Create Quiz</h2>
      <form className="create-quiz-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="create-quiz-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="create-quiz-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit" className="create-quiz-button">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
