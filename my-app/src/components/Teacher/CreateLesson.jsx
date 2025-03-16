import { useState } from 'react';

const CreateLesson = () => {
  const [lesson, setLesson] = useState({
    title: '',
    content: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate inputs
    if (!lesson.title || !lesson.content) {
      setError('Please fill in all fields.');
      return;
    }

    // Retrieve content from localStorage or initialize it
    const content = JSON.parse(localStorage.getItem('content')) || { lessons: [] };

    // Ensure `lessons` is an array
    if (!Array.isArray(content.lessons)) {
      content.lessons = [];
    }

    // Save new lesson
    const newLesson = { ...lesson, id: Date.now() };
    content.lessons.push(newLesson); // Add the new lesson to the lessons array
    localStorage.setItem('content', JSON.stringify(content)); // Save updated content back to localStorage

    // Show success message and reset form
    setSuccess('Lesson created successfully!');
    setLesson({ title: '', content: '' });
  };

  return (
    <div style={styles.container}>
      <h2>Create Lesson</h2>
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
            value={lesson.title}
            onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="content" style={styles.label}>
            Content:
          </label>
          <textarea
            id="content"
            value={lesson.content}
            onChange={(e) => setLesson({ ...lesson, content: e.target.value })}
            style={styles.textarea}
          />
        </div>
        <button type="submit" style={styles.button}>
          Create Lesson
        </button>
      </form>
    </div>
  );
};

export default CreateLesson;

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '100%',
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
    minHeight: '150px',
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