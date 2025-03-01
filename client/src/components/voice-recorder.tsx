import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Mic, Square, Loader2 } from "lucide-react";

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
}

export function VoiceRecorder({ onRecordingComplete }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      setIsPreparing(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      
      mediaRecorder.current.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(chunks.current, { type: "audio/webm" });
        onRecordingComplete(audioBlob);
        chunks.current = [];
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording:", err);
    } finally {
      setIsPreparing(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  if (isPreparing) {
    return (
      <Button disabled className="w-full">
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        Preparing...
      </Button>
    );
  }

  return (
    <Button
      variant={isRecording ? "destructive" : "default"}
      onClick={isRecording ? stopRecording : startRecording}
      className="w-full"
    >
      {isRecording ? (
        <>
          <Square className="h-4 w-4 mr-2" />
          Stop Recording
        </>
      ) : (
        <>
          <Mic className="h-4 w-4 mr-2" />
          Start Recording
        </>
      )}
    </Button>
  );
}
