import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Quizzes.css"; // Import the CSS file

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/quizzes/")
      .then((res) => res.json())
      .then((data) => setQuizzes(data));
  }, []);

  return (
    <div className="quizzes-container">
      <h2 className="quizzes-title">Quizzes</h2>
      <div className="quiz-list">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-item">
            <h3>{quiz.title}</h3>
            <Link to={`/take-quiz/${quiz.id}`} className="take-quiz-link">
              Take Quiz
            </Link>
          </div>
        ))}
      </div>
      <Link to="/create-quiz" className="create-quiz-link">
        Create Quiz
      </Link>
    </div>
  );
};

export default Quizzes;
