import { useState } from 'react';
import Whiteboard from './Whiteboard';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('lessons');

  // Fetch data from localStorage or initialize it
  const content = JSON.parse(localStorage.getItem('content')) || {
    lessons: [],
    assignments: [],
    quizzes: [],
    submissions: [], // Initialize submissions as an empty array
  };

  // State for assignment submission
  const [assignmentSubmission, setAssignmentSubmission] = useState('');

  // State for quiz answers
  const [quizAnswers, setQuizAnswers] = useState({});

  // Handle assignment submission
  const handleAssignmentSubmit = (assignmentId) => {
    if (!assignmentSubmission.trim()) {
      alert('Please write your assignment answer.');
      return;
    }

    // Ensure submissions is an array
    if (!Array.isArray(content.submissions)) {
      content.submissions = [];
    }

    // Save submission to localStorage
    const submission = {
      id: Date.now(),
      assignmentId,
      studentName: 'Student Name', // Replace with actual student name
      answer: assignmentSubmission,
      submittedOn: new Date().toLocaleString(),
      status: 'Submitted',
      score: null, // Score can be updated by the teacher later
    };

    content.submissions.push(submission); // Add the submission to the submissions array
    localStorage.setItem('content', JSON.stringify(content)); // Save updated content back to localStorage

    alert('Assignment submitted successfully!');
    setAssignmentSubmission(''); // Clear the input field
  };

  // Handle quiz submission
  const handleQuizSubmit = (quizId) => {
    const quiz = content.quizzes.find((q) => q.id === quizId);
    if (!quiz) return;

    // Calculate score
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (quizAnswers[quizId]?.[index] === question.answer) {
        score++;
      }
    });

    // Ensure submissions is an array
    if (!Array.isArray(content.submissions)) {
      content.submissions = [];
    }

    // Save quiz result to localStorage
    const quizResult = {
      id: Date.now(),
      quizId,
      studentName: 'Student Name', // Replace with actual student name
      answers: quizAnswers[quizId],
      score,
      submittedOn: new Date().toLocaleString(),
    };

    content.submissions.push(quizResult); // Add the quiz result to the submissions array
    localStorage.setItem('content', JSON.stringify(content)); // Save updated content back to localStorage

    alert(`Quiz submitted! Your score is ${score}/${quiz.questions.length}`);
    setQuizAnswers({}); // Clear quiz answers
  };

  return (
    <div style={styles.container}>
      <h1>Student Dashboard</h1>
      <div style={styles.tabs}>
        <button
          style={activeTab === 'lessons' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('lessons')}
        >
          Lessons
        </button>
        <button
          style={activeTab === 'assignments' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('assignments')}
        >
          Assignments
        </button>
        <button
          style={activeTab === 'quizzes' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('quizzes')}
        >
          Quizzes
        </button>
        <button
          style={activeTab === 'whiteboard' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('whiteboard')}
        >
          Whiteboard
        </button>
      </div>

      <div style={styles.content}>
        {activeTab === 'lessons' && (
          <div>
            <h2>Lessons</h2>
            {content.lessons.length > 0 ? (
              content.lessons.map((lesson) => (
                <div key={lesson.id} style={styles.card}>
                  <h3>{lesson.title}</h3>
                  <p>{lesson.content}</p>
                </div>
              ))
            ) : (
              <p>No lessons available.</p>
            )}
          </div>
        )}

        {activeTab === 'assignments' && (
          <div>
            <h2>Assignments</h2>
            {content.assignments.length > 0 ? (
              content.assignments.map((assignment) => (
                <div key={assignment.id} style={styles.card}>
                  <h3>{assignment.title}</h3>
                  <p>{assignment.description}</p>
                  <p>Due Date: {assignment.dueDate}</p>
                  <textarea
                    placeholder="Write your assignment answer here..."
                    value={assignmentSubmission}
                    onChange={(e) => setAssignmentSubmission(e.target.value)}
                    style={styles.textarea}
                  />
                  <button
                    onClick={() => handleAssignmentSubmit(assignment.id)}
                    style={styles.button}
                  >
                    Submit Assignment
                  </button>
                </div>
              ))
            ) : (
              <p>No assignments available.</p>
            )}
          </div>
        )}

        {activeTab === 'quizzes' && (
          <div>
            <h2>Quizzes</h2>
            {content.quizzes.length > 0 ? (
              content.quizzes.map((quiz) => (
                <div key={quiz.id} style={styles.card}>
                  <h3>{quiz.title}</h3>
                  {quiz.questions.map((question, index) => (
                    <div key={index} style={styles.question}>
                      <p>
                        <strong>Question {index + 1}:</strong> {question.question}
                      </p>
                      {question.options.map((option, i) => (
                        <label key={i} style={styles.option}>
                          <input
                            type="radio"
                            name={`quiz-${quiz.id}-question-${index}`}
                            value={option}
                            onChange={(e) =>
                              setQuizAnswers({
                                ...quizAnswers,
                                [quiz.id]: {
                                  ...quizAnswers[quiz.id],
                                  [index]: e.target.value,
                                },
                              })
                            }
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  ))}
                  <button
                    onClick={() => handleQuizSubmit(quiz.id)}
                    style={styles.button}
                  >
                    Submit Quiz
                  </button>
                </div>
              ))
            ) : (
              <p>No quizzes available.</p>
            )}
          </div>
        )}

        {activeTab === 'whiteboard' && <Whiteboard />}
      </div>
    </div>
  );
};

export default StudentDashboard;

// Styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '1200px',
    margin: '20px auto',
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  tab: {
    padding: '10px 20px',
    margin: '0 5px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  activeTab: {
    padding: '10px 20px',
    margin: '0 5px',
    backgroundColor: '#0056b3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  content: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  card: {
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: '#f1f1f1',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minHeight: '100px',
    resize: 'vertical',
    marginBottom: '10px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  question: {
    marginBottom: '10px',
  },
  option: {
    display: 'block',
    marginBottom: '5px',
  },
};