import { useState } from 'react';
import AudioRecorder from './AudioRecorder';

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState('monitorChild');

  // Fetch data from localStorage
  const content = JSON.parse(localStorage.getItem('content')) || {
    submissions: [],
    recordings: [],
  };

  return (
    <div style={styles.container}>
      <h1>Parent Dashboard</h1>
      <div style={styles.tabs}>
        <button
          style={activeTab === 'monitorChild' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('monitorChild')}
        >
          Monitor Child
        </button>
        <button
          style={activeTab === 'recordInstructions' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('recordInstructions')}
        >
          Record Instructions
        </button>
      </div>

      <div style={styles.content}>
        {activeTab === 'monitorChild' && (
          <div>
            <h2>Child's Progress</h2>
            {content?.submissions?.length > 0 ? (
              content.submissions.map((submission) => (
                <div key={submission?.id} style={styles.card}>
                  <h3>{submission?.assignmentTitle}</h3>
                  <p>Status: {submission?.status}</p>
                  <p>Score: {submission?.score}</p>
                </div>
              ))
            ) : (
              <p>No submissions found.</p>
            )}
          </div>
        )}

        {activeTab === 'recordInstructions' && <AudioRecorder />}
      </div>
    </div>
  );
};

export default ParentDashboard;

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