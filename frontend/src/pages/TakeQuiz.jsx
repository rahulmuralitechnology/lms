import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TakeQuiz.css"; // Import the CSS file

const TakeQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/quizzes/${quizId}/`)
      .then((res) => res.json())
      .then((data) => setQuiz(data));
  }, [quizId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting quiz answers:", answers);
  };

  return (
    <div className="quiz-container">
      {quiz ? (
        <form onSubmit={handleSubmit}>
          <h2 className="quiz-title">{quiz.title}</h2>
          {quiz.questions.map((q) => (
            <div key={q.id} className="question">
              <p>{q.question_text}</p>
              <input
                type="text"
                className="answer-input"
                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                required
              />
            </div>
          ))}
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
};

export default TakeQuiz;
