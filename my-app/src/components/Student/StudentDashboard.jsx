import { useState } from 'react';
import Whiteboard from './Whiteboard';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('lessons');

  // Fetch data from localStorage
  const content = JSON.parse(localStorage.getItem('content')) || {
    lessons: [],
    assignments: [],
    quizzes: [],
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
            {content?.lessons?.length > 0 ? (
              content.lessons.map((lesson) => (
                <div key={lesson?.id} style={styles.card}>
                  <h3>{lesson?.title}</h3>
                  <p>{lesson?.content}</p>
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
            {content?.assignments?.length > 0 ? (
              content.assignments.map((assignment) => (
                <div key={assignment?.id} style={styles.card}>
                  <h3>{assignment?.title}</h3>
                  <p>{assignment?.description}</p>
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
            {content?.quizzes?.length > 0 ? (
              content.quizzes.map((quiz) => (
                <div key={quiz?.id} style={styles.card}>
                  <h3>{quiz?.title}</h3>
                  <ul>
                    {quiz?.questions?.map((question, index) => (
                      <li key={index}>
                        <p>{question?.question}</p>
                        <ul>
                          {question?.options?.map((option, i) => (
                            <li key={i}>{option}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
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
};