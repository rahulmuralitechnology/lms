import { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface WhiteboardProps {
  onSave?: (dataUrl: string) => void;
}

export function Whiteboard({ onSave }: WhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    setContext(ctx);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    
    setIsDrawing(true);
    const rect = canvasRef.current!.getBoundingClientRect();
    context.beginPath();
    context.moveTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    context.lineTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    context.stroke();
  };

  const stopDrawing = () => {
    if (!context) return;
    setIsDrawing(false);
    context.closePath();
  };

  const clear = () => {
    if (!context || !canvasRef.current) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const save = () => {
    if (!canvasRef.current || !onSave) return;
    const dataUrl = canvasRef.current.toDataURL();
    onSave(dataUrl);
  };

  return (
    <Card className="p-4">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="border border-border rounded-md mb-4 touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <div className="flex gap-2">
        <Button variant="outline" onClick={clear}>
          Clear
        </Button>
        {onSave && (
          <Button onClick={save}>
            Save
          </Button>
        )}
      </div>
    </Card>
  );
}
