import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        {user && user.type === 'teacher' && (
          <Link to="/teacher" style={styles.link}>
            Teacher Dashboard
          </Link>
        )}
        {user && user.type === 'student' && (
          <Link to="/student" style={styles.link}>
            Student Dashboard
          </Link>
        )}
        {user && user.type === 'parent' && (
          <Link to="/parent" style={styles.link}>
            Parent Dashboard
          </Link>
        )}
      </div>
      <div style={styles.right}>
        {user ? (
          <button onClick={logout} style={styles.button}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// Styles
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  left: {
    display: 'flex',
    gap: '20px',
  },
  right: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
  },
  button: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};