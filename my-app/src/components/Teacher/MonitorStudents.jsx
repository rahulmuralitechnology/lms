import { useState, useEffect } from 'react';

const MonitorStudents = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch submissions from localStorage
  useEffect(() => {
    const content = JSON.parse(localStorage.getItem('content')) || { submissions: [] };
    setSubmissions(content?.submissions || []);
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Monitor Students</h2>
      {submissions?.length > 0 ? (
        submissions.map((submission) => (
          <div key={submission?.id} style={styles.card}>
            <h3>{submission?.assignmentTitle}</h3>
            <p>
              <strong>Student:</strong> {submission?.studentName}
            </p>
            <p>
              <strong>Status:</strong> {submission?.status}
            </p>
            <p>
              <strong>Score:</strong> {submission?.score}
            </p>
            <p>
              <strong>Submitted On:</strong> {submission?.submittedOn}
            </p>
          </div>
        ))
      ) : (
        <p>No submissions found.</p>
      )}
    </div>
  );
};

export default MonitorStudents;

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
  card: {
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};