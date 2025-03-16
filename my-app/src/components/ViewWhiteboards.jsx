import { useEffect, useState } from 'react';

const ViewWhiteboards = () => {
  const [whiteboards, setWhiteboards] = useState([]);

  useEffect(() => {
    // Retrieve saved whiteboard drawings from localStorage
    const content = JSON.parse(localStorage.getItem('content')) || { whiteboards: [] };
    setWhiteboards(content?.whiteboards || []);
  }, []);

  return (
    <div style={styles.container}>
      <h2>Saved Whiteboard Drawings</h2>
      {whiteboards?.length > 0 ? (
        whiteboards.map((whiteboard) => (
          <div key={whiteboard?.id} style={styles.whiteboardCard}>
            <img
              src={whiteboard?.dataUrl}
              alt={`Whiteboard Drawing ${whiteboard?.id}`}
              style={styles.whiteboardImage}
            />
            <p>Drawing ID: {whiteboard?.id}</p>
          </div>
        ))
      ) : (
        <p>No whiteboard drawings found.</p>
      )}
    </div>
  );
};

export default ViewWhiteboards;

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '20px auto',
  },
  whiteboardCard: {
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  whiteboardImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
};