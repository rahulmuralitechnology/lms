import { useState } from 'react';
import CreateUser from './CreateUser';
import CreateLesson from './CreateLesson';
import CreateAssignment from './CreateAssignment';
import CreateQuiz from './CreateQuiz';
import MonitorStudents from './MonitorStudents';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('createUser');

  return (
    <div style={styles.container}>
      <h1>Teacher Dashboard</h1>
      <div style={styles.tabs}>
        <button
          style={activeTab === 'createUser' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('createUser')}
        >
          Create User
        </button>
        <button
          style={activeTab === 'createLesson' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('createLesson')}
        >
          Create Lesson
        </button>
        <button
          style={activeTab === 'createAssignment' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('createAssignment')}
        >
          Create Assignment
        </button>
        <button
          style={activeTab === 'createQuiz' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('createQuiz')}
        >
          Create Quiz
        </button>
        <button
          style={activeTab === 'monitorStudents' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('monitorStudents')}
        >
          Monitor Students
        </button>
      </div>

      <div style={styles.content}>
        {activeTab === 'createUser' && <CreateUser />}
        {activeTab === 'createLesson' && <CreateLesson />}
        {activeTab === 'createAssignment' && <CreateAssignment />}
        {activeTab === 'createQuiz' && <CreateQuiz />}
        {activeTab === 'monitorStudents' && <MonitorStudents />}
      </div>
    </div>
  );
};

export default TeacherDashboard;

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
};