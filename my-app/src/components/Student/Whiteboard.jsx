import { useRef, useState } from 'react';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);

  // Handle mouse down event
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setDrawing(true);
  };

  // Handle mouse move event
  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  // Handle mouse up event
  const stopDrawing = () => {
    setDrawing(false);
  };

  // Clear the canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Save the canvas drawing
  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL(); // Convert canvas to image URL
    const content = JSON.parse(localStorage.getItem('content')) || { whiteboards: [] };
    content.whiteboards.push({ id: Date.now(), dataUrl });
    localStorage.setItem('content', JSON.stringify(content));
    alert('Drawing saved successfully!');
  };

  return (
    <div style={styles.container}>
      <h2>Whiteboard</h2>
      <div style={styles.toolbar}>
        <label htmlFor="color">Color: </label>
        <input
          type="color"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={styles.colorPicker}
        />
        <label htmlFor="brushSize">Brush Size: </label>
        <input
          type="number"
          id="brushSize"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
          min="1"
          max="50"
          style={styles.brushSize}
        />
        <button onClick={clearCanvas} style={styles.button}>
          Clear
        </button>
        <button onClick={saveDrawing} style={styles.button}>
          Save
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={styles.canvas}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

export default Whiteboard;

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
  toolbar: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  colorPicker: {
    width: '50px',
    height: '30px',
    padding: '0',
    border: 'none',
    borderRadius: '4px',
  },
  brushSize: {
    width: '50px',
    height: '30px',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  canvas: {
    border: '1px solid #000',
    backgroundColor: '#fff',
    borderRadius: '4px',
  },
};