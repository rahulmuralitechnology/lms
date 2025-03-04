import { useState } from 'react';

const CreateAssignment = () => {
  const [assignment, setAssignment] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate inputs
    if (!assignment.title || !assignment.description || !assignment.dueDate) {
      setError('Please fill in all fields.');
      return;
    }

    // Save new assignment
    const content = JSON.parse(localStorage.getItem('content')) || { assignments: [] };
    const newAssignment = { ...assignment, id: Date.now() };
    content.assignments.push(newAssignment);
    localStorage.setItem('content', JSON.stringify(content));

    // Show success message and reset form
    setSuccess('Assignment created successfully!');
    setAssignment({ title: '', description: '', dueDate: '' });
  };

  return (
    <div style={styles.container}>
      <h2>Create Assignment</h2>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>
            Description:
          </label>
          <textarea
            id="description"
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
            style={styles.textarea}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="dueDate" style={styles.label}>
            Due Date:
          </label>
          <input
            type="date"
            id="dueDate"
            value={assignment.dueDate}
            onChange={(e) =>
              setAssignment({ ...assignment, dueDate: e.target.value })
            }
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Create Assignment
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;

// Styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
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
  },
  textarea: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minHeight: '100px',
    resize: 'vertical',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
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