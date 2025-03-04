import { useState } from 'react';

const CreateQuiz = () => {
  const [quiz, setQuiz] = useState({
    title: '',
    questions: [],
  });
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    answer: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddQuestion = () => {
    if (
      !newQuestion.question ||
      newQuestion.options.some((option) => !option) ||
      !newQuestion.answer
    ) {
      setError('Please fill in all fields for the question.');
      return;
    }

    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: [...prevQuiz.questions, newQuestion],
    }));
    setNewQuestion({
      question: '',
      options: ['', '', '', ''],
      answer: '',
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!quiz.title || quiz.questions.length === 0) {
      setError('Please add a title and at least one question.');
      return;
    }

    // Save new quiz
    const content = JSON.parse(localStorage.getItem('content')) || { quizzes: [] };
    const newQuiz = { ...quiz, id: Date.now() };
    content.quizzes.push(newQuiz);
    localStorage.setItem('content', JSON.stringify(content));

    // Show success message and reset form
    setSuccess('Quiz created successfully!');
    setQuiz({ title: '', questions: [] });
  };

  return (
    <div style={styles.container}>
      <h2>Create Quiz</h2>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>
            Quiz Title:
          </label>
          <input
            type="text"
            id="title"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="question" style={styles.label}>
            Question:
          </label>
          <input
            type="text"
            id="question"
            value={newQuestion.question}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, question: e.target.value })
            }
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Options:</label>
          {newQuestion.options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => {
                const updatedOptions = [...newQuestion.options];
                updatedOptions[index] = e.target.value;
                setNewQuestion({ ...newQuestion, options: updatedOptions });
              }}
              style={styles.input}
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="answer" style={styles.label}>
            Correct Answer:
          </label>
          <input
            type="text"
            id="answer"
            value={newQuestion.answer}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, answer: e.target.value })
            }
            style={styles.input}
            placeholder="Enter the correct option"
          />
        </div>

        <button
          type="button"
          onClick={handleAddQuestion}
          style={styles.addButton}
        >
          Add Question
        </button>

        <div style={styles.questionsList}>
          <h3>Questions Added:</h3>
          {quiz.questions.map((q, index) => (
            <div key={index} style={styles.questionCard}>
              <p>
                <strong>Question {index + 1}:</strong> {q.question}
              </p>
              <p>
                <strong>Options:</strong> {q.options.join(', ')}
              </p>
              <p>
                <strong>Correct Answer:</strong> {q.answer}
              </p>
            </div>
          ))}
        </div>

        <button type="submit" style={styles.button}>
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;

// Styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '20px auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  addButton: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  questionsList: {
    marginBottom: '20px',
  },
  questionCard: {
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  success: {
    color: 'green',
    marginBottom: '10px',
  },
};