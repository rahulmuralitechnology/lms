import { useState, useRef } from 'react';

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (e) => {
        audioChunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        audioChunks.current = []; // Reset chunks
      };

      mediaRecorder.current.start();
      setRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Error accessing microphone. Please ensure you have granted permission.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  // Save recording to localStorage
  const saveRecording = () => {
    if (!audioUrl) {
      alert('No recording to save.');
      return;
    }

    // Convert audio URL to base64
    fetch(audioUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64Data = reader.result;
          const content = JSON.parse(localStorage.getItem('content')) || { recordings: [] };
          content.recordings.push({ id: Date.now(), data: base64Data });
          localStorage.setItem('content', JSON.stringify(content));
          alert('Recording saved successfully!');
        };
      });
  };

  return (
    <div style={styles.container}>
      <h2>Record Instructions</h2>
      <div style={styles.controls}>
        <button
          onClick={recording ? stopRecording : startRecording}
          style={styles.button}
        >
          {recording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <button
          onClick={saveRecording}
          style={styles.button}
          disabled={!audioUrl}
        >
          Save Recording
        </button>
      </div>
      {audioUrl && (
        <div style={styles.audioPlayer}>
          <audio controls src={audioUrl} style={styles.audio} />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  controls: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  audioPlayer: {
    width: '100%',
    maxWidth: '400px',
  },
  audio: {
    width: '100%',
  },
};