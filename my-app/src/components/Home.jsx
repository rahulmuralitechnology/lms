import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Learning Management System</h1>
      <p style={styles.description}>
        Manage your lessons, assignments, and quizzes with ease. Whether you're a teacher, student, or parent, this platform is designed to help you succeed.
      </p>

      {user ? (
        <div style={styles.dashboardLinks}>
          <h2>Go to Your Dashboard</h2>
          {user.type === 'teacher' && (
            <Link to="/teacher" style={styles.link}>
              Teacher Dashboard
            </Link>
          )}
          {user.type === 'student' && (
            <Link to="/student" style={styles.link}>
              Student Dashboard
            </Link>
          )}
          {user.type === 'parent' && (
            <Link to="/parent" style={styles.link}>
              Parent Dashboard
            </Link>
          )}
        </div>
      ) : (
        <div style={styles.authLinks}>
          <h2>Get Started</h2>
          <Link to="/login" style={styles.link}>
            Login
          </Link>
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;

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
    maxWidth: '800px',
    margin: '20px auto',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#007bff',
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    color: '#555',
  },
  dashboardLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  authLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  link: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
};